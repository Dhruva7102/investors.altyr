package authCustom

import (
	"crypto/rand"
	"encoding/json"
	"fmt"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
	"github.com/luraproject/lura/v2/logging"

	cors "github.com/rs/cors/wrapper/gin"
	"gopkg.in/square/go-jose.v2"
	"gopkg.in/square/go-jose.v2/jwt"

	"github.com/nicksnyder/go-i18n/v2/i18n"
)

// PostData - for data of generating tokens
type PostData struct {
	UserID          string                 `form:"userId" json:"userId" xml:"userId" binding:"required"`
	UserType        string                 `form:"userType" json:"userType" xml:"userType" binding:"required"`
	MultiLogin      string                 `form:"multiLogin" json:"multiLogin" xml:"multiLogin" binding:"required"`
	AllowedMax      string                 `form:"allowedMax" json:"allowedMax" xml:"allowedMax"` // eg, max allowed devices, optional for no limit
	ImmediateRevoke string                 `form:"immediateRevoke" json:"immediateRevoke" xml:"immediateRevoke" binding:"required"`
	MetaData        map[string]interface{} `form:"metaData" json:"metaData" xml:"metaData" binding:"required"`
	AccessTTL       string                 `form:"accessTTL" json:"accessTTL" xml:"accessTTL"`    // eg, time in second, minute, hour(like 1m, 1s, 1h30m) or optional for default
	RefreshTTL      string                 `form:"refreshTTL" json:"refreshTTL" xml:"refreshTTL"` // eg, time in second, minute, hour(like 1m, 1s, 1h30m) or optional for default
}

// DelData - for data of generating tokens
type DelData struct {
	UserID       string `form:"userId" json:"userId" xml:"userId" binding:"required"`
	UserType     string `form:"userType" json:"userType" xml:"userType" binding:"required"`
	RefershToken string `form:"refreshToken" json:"refreshToken" xml:"refreshToken" binding:"required"`
	Time         string `form:"time" json:"time" xml:"time"` // eg, time in second, minute, hour(like 1m, 1s, 1h30m) or 0 for permanent
}

// RunJWTService sets up and runs a dummy http service with a single endpoint ready to create signed JWT
// issued for the received resource id
func RunJWTService(logger logging.Logger, bundle *i18n.Bundle) {
	logPrefix := "[SERVER][Auth-Custom]"
	engine := gin.Default()

	enc, err := jose.NewEncrypter(
		jose.A128GCM,
		jose.Recipient{Algorithm: jose.RSA_OAEP, Key: GlobalConfig.JwkPubKey},
		(&jose.EncrypterOptions{}).WithType("JWT").WithContentType("JWT"),
	)
	if err != nil {
		logger.Fatal(logPrefix, err.Error())
	}

	rsaSigner, err := jose.NewSigner(jose.SigningKey{Algorithm: jose.RS256, Key: GlobalConfig.JwkPrvKey}, nil)
	if err != nil {
		logger.Fatal(logPrefix, "failed to create signer:"+err.Error())
	}

	engine.POST(GlobalConfig.JwtEndpoint, func(c *gin.Context) {
		logger.Info(logPrefix, " POST Access Keys API call.")
		lang := c.GetHeader(getEnv("LANGUAGE_HEADER_FIELD", "language"))
		localizer := i18n.NewLocalizer(bundle, lang)

		var userData PostData
		if err := c.ShouldBindJSON(&userData); err != nil {
			logger.Error(logPrefix, "error in bind data to struct : ", err)
			messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
				DefaultMessage: &i18n.Message{
					ID: "400",
				},
			})
			c.AbortWithStatusJSON(400, gin.H{"message": messageStr})
			return
		}

		b := make([]byte, 16)
		_, errRefresh := rand.Read(b)
		if errRefresh != nil {
			logger.Error(logPrefix, "error in refresh token generation : ", errRefresh)
			messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
				DefaultMessage: &i18n.Message{
					ID: "500",
				},
			})
			c.AbortWithStatusJSON(500, gin.H{"message": messageStr})
			return
		}
		refreshToken := fmt.Sprintf("%x-%x-%x-%x-%x", b[0:4], b[4:6], b[6:8], b[8:10], b[10:])

		AccessTTL := GlobalConfig.AccessTTL
		RefreshTTL := GlobalConfig.RefreshTTL

		if userData.AccessTTL != "" {
			AccessTTLNew, errAccessTTL := time.ParseDuration(userData.AccessTTL)
			if errAccessTTL == nil {
				AccessTTL = AccessTTLNew
			}
		}

		if userData.RefreshTTL != "" {
			RefreshTTLNew, errRefreshTTL := time.ParseDuration(userData.RefreshTTL)
			if errRefreshTTL == nil {
				RefreshTTL = RefreshTTLNew
			}
		}

		accessClaims := Claims{
			Subject:         "Access Token",
			Issuer:          GlobalConfig.JwtIssuer,
			NotBefore:       time.Now().Unix(),
			IssuedAt:        time.Now().Unix(),
			Expiry:          time.Now().Add(AccessTTL).Unix(),
			Audience:        jwt.Audience{},
			ID:              userData.UserID,
			UserType:        userData.UserType,
			MultiLogin:      userData.MultiLogin,
			ImmediateRevoke: userData.ImmediateRevoke,
			MetaData:        userData.MetaData,
			RefershToken:    refreshToken,
			AccessTTL:       AccessTTL,
			RefreshTTL:      RefreshTTL,
		}
		accessToken, err := jwt.SignedAndEncrypted(rsaSigner, enc).Claims(accessClaims).CompactSerialize()

		if err != nil {
			logger.Error(logPrefix, "error in signed and encrypt token : ", err)
			messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
				DefaultMessage: &i18n.Message{
					ID: "500",
				},
			})
			c.AbortWithStatusJSON(500, gin.H{"message": messageStr})
			return
		}
		if userData.MultiLogin == "false" && GlobalConfig.RedisEnable {
			resultKeys := RedisClient.Keys(fmt.Sprintf("AUTH_%s_%s_*", userData.UserType, userData.UserID))
			for _, element := range resultKeys.Val() {
				// element is the element from someSlice for where we are
				RedisClient.Del(element)
			}
		}

		if userData.AllowedMax != "" && GlobalConfig.RedisEnable {
			resultKeys := RedisClient.Keys(fmt.Sprintf("AUTH_%s_%s_*", userData.UserType, userData.UserID))

			type keyValArray struct {
				Key  string
				time int64
			}

			var keyArr []keyValArray

			for _, element := range resultKeys.Val() {
				strCmd := RedisClient.Get(element)
				elementVal, _ := strCmd.Int64()
				keyArrDummy := keyValArray{
					Key:  element,
					time: elementVal,
				}
				keyArr = append(keyArr, keyArrDummy)
			}

			sort.Slice(keyArr[:], func(i, j int) bool {
				return keyArr[i].time < keyArr[j].time
			})

			allowedMax, _ := strconv.ParseInt(userData.AllowedMax, 10, 0)
			if allowedMax > 0 && len(keyArr) >= int(allowedMax) {
				for keyIndex := 0; keyIndex < (len(keyArr) + 1 - int(allowedMax)); keyIndex++ {
					RedisClient.Del(keyArr[keyIndex].Key)
				}
			}
		}

		if userData.ImmediateRevoke == "true" && GlobalConfig.RedisEnable {
			_, errRedis := RedisClient.Set(fmt.Sprintf("AUTH_%s_%s_%s", userData.UserType, userData.UserID, refreshToken), time.Now().Unix(), RefreshTTL).Result()
			if errRedis != nil {
				logger.Error(logPrefix, "Error in set redis key : ", errRedis)
				messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
					DefaultMessage: &i18n.Message{
						ID: "500",
					},
				})
				c.AbortWithStatusJSON(500, gin.H{"message": messageStr})
				return
			}
		}

		messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
			DefaultMessage: &i18n.Message{
				ID: "200",
			},
		})
		c.JSON(200, gin.H{
			"message": messageStr,
			"data": map[string]interface{}{
				"accessToken":    "Bearer " + accessToken,
				"refreshToken":   refreshToken,
				"accessExpireAt": time.Unix(accessClaims.Expiry, 0).UTC().Unix(),
			},
		})
	})

	engine.GET("validate", func(c *gin.Context) {
		lang := c.GetHeader(getEnv("LANGUAGE_HEADER_FIELD", "language"))
		localizer := i18n.NewLocalizer(bundle, lang)

		tokenString := c.GetHeader("Authorization")
		tokenData := strings.Fields(tokenString)
		if len(tokenData) > 1 {
			if strings.ToUpper(tokenData[0]) == "BASIC" {
				messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
					DefaultMessage: &i18n.Message{
						ID: "405",
					},
				})
				c.AbortWithStatusJSON(405, gin.H{"message": messageStr})
				return
			}
			tokenString = tokenData[1]
		}
		if tokenString == "" {
			messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
				DefaultMessage: &i18n.Message{
					ID: "404",
				},
			})
			c.AbortWithStatusJSON(404, gin.H{"message": messageStr})
			return
		}
		claim, err := DecodeToken(tokenString)
		if err != nil {
			logger.Error(logPrefix, "error in decode token : ", err)
			messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
				DefaultMessage: &i18n.Message{
					ID: "401",
				},
			})
			c.AbortWithStatusJSON(401, gin.H{"message": messageStr})
			return
		}

		if claim.Expiry < time.Now().Unix() {
			messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
				DefaultMessage: &i18n.Message{
					ID: "406",
				},
			})
			c.AbortWithStatusJSON(406, gin.H{"message": messageStr})
			return
		}

		if claim.ImmediateRevoke == "true" && GlobalConfig.RedisEnable {
			_, errRedis := RedisClient.Get(fmt.Sprintf("AUTH_%s_%s_%s", claim.UserType, claim.ID, claim.RefershToken)).Result()
			// fmt.Println("redisData : ", redisData, errRedis)
			if errRedis != nil {
				if errRedis == redis.Nil {
					logger.Error(logPrefix, "no data in redis get : ", errRedis, fmt.Sprintf("AUTH_%s_%s_%s", claim.UserType, claim.ID, claim.RefershToken))
					messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
						DefaultMessage: &i18n.Message{
							ID: "401",
						},
					})
					c.AbortWithStatusJSON(401, gin.H{"message": messageStr})
					return
				}
				logger.Error(logPrefix, "err in redis get : ", errRedis, fmt.Sprintf("AUTH_%s_%s_%s", claim.UserType, claim.ID, claim.RefershToken))
				messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
					DefaultMessage: &i18n.Message{
						ID: "500",
					},
				})
				c.AbortWithStatusJSON(500, gin.H{"message": messageStr})
				return
			}
		}

		response := map[string]interface{}{
			"type":          "Bearer",
			"userId":        claim.ID,
			"userType":      claim.UserType,
			"metaData":      claim.MetaData,
			"authCompleted": true,
		}
		messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
			DefaultMessage: &i18n.Message{
				ID: "200",
			},
		})
		c.JSON(200, gin.H{
			"message": messageStr,
			"data":    response,
		})
	})

	engine.GET(GlobalConfig.JwtEndpoint, func(c *gin.Context) {
		lang := c.GetHeader(getEnv("LANGUAGE_HEADER_FIELD", "language"))
		localizer := i18n.NewLocalizer(bundle, lang)

		tokenString := c.GetHeader("Authorization")
		tokenData := strings.Fields(tokenString)
		if len(tokenData) > 1 {
			if strings.ToUpper(tokenData[0]) == "BASIC" {
				messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
					DefaultMessage: &i18n.Message{
						ID: "405",
					},
				})
				c.AbortWithStatusJSON(405, gin.H{"message": messageStr})
				return
			}
			tokenString = tokenData[1]
		}
		if tokenString == "" {
			messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
				DefaultMessage: &i18n.Message{
					ID: "404",
				},
			})
			c.AbortWithStatusJSON(404, gin.H{"message": messageStr})
			return
		}

		refreshString := c.GetHeader("Refreshtoken")
		if refreshString == "" {
			messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
				DefaultMessage: &i18n.Message{
					ID: "404",
				},
			})
			c.AbortWithStatusJSON(404, gin.H{"message": messageStr})
			return
		}

		logger.Debug(logPrefix, "got access token : ", tokenString)
		logger.Debug(logPrefix, "got refresh token : ", refreshString)

		claim, err := DecodeToken(tokenString)
		if err != nil {
			logger.Error(logPrefix, "error in decode token : ", err)
			messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
				DefaultMessage: &i18n.Message{
					ID: "401",
				},
			})
			c.AbortWithStatusJSON(401, gin.H{"message": messageStr})
			return
		}
		claimStr, _ := json.Marshal(claim)
		logger.Debug(logPrefix, "claim data : %s, %s, %s\n", string(claimStr), GlobalConfig.AccessTTL, GlobalConfig.RefreshTTL)

		if refreshString != claim.RefershToken {
			messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
				DefaultMessage: &i18n.Message{
					ID: "417",
				},
			})
			c.AbortWithStatusJSON(417, gin.H{"message": messageStr})
			return
		}

		if claim.Expiry > time.Now().Unix() {
			messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
				DefaultMessage: &i18n.Message{
					ID: "407",
				},
			})
			c.AbortWithStatusJSON(407, gin.H{"message": messageStr})
			return
		}

		if claim.ImmediateRevoke == "true" && GlobalConfig.RedisEnable {
			_, errRedis := RedisClient.Get(fmt.Sprintf("AUTH_%s_%s_%s", claim.UserType, claim.ID, claim.RefershToken)).Result()
			if errRedis != nil {
				messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
					DefaultMessage: &i18n.Message{
						ID: "401",
					},
				})
				c.AbortWithStatusJSON(401, gin.H{"message": messageStr})
				return
			}
		}

		claim.NotBefore = time.Now().Unix()
		claim.IssuedAt = time.Now().Unix()
		claim.Expiry = time.Now().Add(claim.AccessTTL).Unix()

		accessToken, err := jwt.SignedAndEncrypted(rsaSigner, enc).Claims(claim).CompactSerialize()
		if err != nil {
			logger.Error(logPrefix, "error in signed and encrypt token : ", err)
			messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
				DefaultMessage: &i18n.Message{
					ID: "500",
				},
			})
			c.AbortWithStatusJSON(500, gin.H{"message": messageStr})
			return
		}

		if claim.ImmediateRevoke == "true" && GlobalConfig.RedisEnable {
			logger.Error(logPrefix, "error in set redis key : ")
			_, errRedisNew := RedisClient.Set(fmt.Sprintf("AUTH_%s_%s_%s", claim.UserType, claim.ID, claim.RefershToken), time.Now().Unix(), claim.RefreshTTL).Result()
			if errRedisNew != nil {
				logger.Error(logPrefix, "error in set redis key : ", errRedisNew)
				messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
					DefaultMessage: &i18n.Message{
						ID: "500",
					},
				})
				c.AbortWithStatusJSON(500, gin.H{"message": messageStr})
				return
			}
		}

		response := map[string]interface{}{
			"accessToken":    "Bearer " + accessToken,
			"accessExpireAt": time.Unix(claim.Expiry, 0).UTC().Unix(),
			"userData": map[string]interface{}{
				"type":     "Bearer",
				"userId":   claim.ID,
				"userType": claim.UserType,
				"metaData": claim.MetaData,
			},
		}
		respStr, _ := json.Marshal(response)
		logger.Debug(logPrefix, "response: %s\n", string(respStr))

		messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
			DefaultMessage: &i18n.Message{
				ID: "200",
			},
		})
		c.JSON(200, gin.H{
			"message": messageStr,
			"data":    response,
		})
	})

	engine.DELETE(GlobalConfig.JwtEndpoint, func(c *gin.Context) {
		lang := c.GetHeader(getEnv("LANGUAGE_HEADER_FIELD", "language"))
		localizer := i18n.NewLocalizer(bundle, lang)

		var userData DelData
		if err := c.ShouldBindJSON(&userData); err != nil {
			logger.Error(logPrefix, "error in bind data to struct : ", err)
			messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
				DefaultMessage: &i18n.Message{
					ID: "400",
				},
			})
			c.AbortWithStatusJSON(400, gin.H{"message": messageStr})
			return
		}
		var resultKeys *redis.StringSliceCmd
		if GlobalConfig.RedisEnable {
			resultKeys = RedisClient.Keys(fmt.Sprintf("AUTH_%s_%s_%s", userData.UserType, userData.UserID, userData.RefershToken))

			if len(resultKeys.Val()) == 0 {
				messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
					DefaultMessage: &i18n.Message{
						ID: "404",
					},
				})
				c.AbortWithStatusJSON(404, gin.H{"message": messageStr})
				return
			}
		}

		if userData.Time != "" && userData.RefershToken != "*" && GlobalConfig.RedisEnable {
			blackListTTL, blackListTTLErr := time.ParseDuration(userData.Time)
			if blackListTTLErr != nil {
				logger.Error(logPrefix, "error in blacklist TTL : ", blackListTTLErr)
				messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
					DefaultMessage: &i18n.Message{
						ID: "500",
					},
				})
				c.AbortWithStatusJSON(500, gin.H{"message": messageStr})
				return
			}
			_, errRedis := RedisClient.Set(fmt.Sprintf("RES_%s_%s_%s", userData.UserType, userData.UserID, userData.RefershToken), userData.UserID, blackListTTL).Result()
			if errRedis != nil {
				logger.Error(logPrefix, "error in set redis key : ", errRedis)
				messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
					DefaultMessage: &i18n.Message{
						ID: "500",
					},
				})
				c.AbortWithStatusJSON(500, gin.H{"message": messageStr})
				return
			}
		}

		if GlobalConfig.RedisEnable {
			for _, element := range resultKeys.Val() {
				// element is the element from someSlice for where we are
				RedisClient.Del(element)
			}
		}

		messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
			DefaultMessage: &i18n.Message{
				ID: "200",
			},
		})
		c.JSON(200, gin.H{"message": messageStr})
	})

	if GlobalConfig.RedisEnable {
		go startSub(logger)
	}

	engine.Use(cors.New(cors.Options{
		AllowedOrigins:   GlobalConfig.AllowOrigins,
		AllowedMethods:   []string{"POST", "GET", "DELETE"},
		AllowedHeaders:   []string{"Origin", "Authorization", "RefershToken"},
		ExposedHeaders:   []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           int(time.Duration(12 * time.Hour).Seconds()),
	}))

	logger.Debug(logPrefix, "Server is running on : ", GlobalConfig.JwtPort)
	logger.Fatal(engine.Run(fmt.Sprintf(":%d", GlobalConfig.JwtPort)))
}

func startSub(logger logging.Logger) {
	redisOption := &redis.Options{
		Addr:     getEnv("REDIS_URL", ""),
		Password: getEnv("REDIS_PASS", ""),   // no password set
		DB:       getEnvAsInt("REDIS_DB", 0), // use default DB
	}
	subscriberClient := redis.NewClient(redisOption)
	subscriber := subscriberClient.PSubscribe("__keyevent@" + strconv.Itoa(redisOption.DB) + "__:expired")

	_, err1 := subscriber.Receive()
	if err1 != nil {
		logger.Error(LogPrefix, "error in redis subscribe : ", err1)
		// panic(err1)
	}
	ch := subscriber.Channel()

	// Consume messages.
	for msg := range ch {
		if strings.Contains(msg.Channel, "expired") && strings.Contains(msg.Payload, "RES_") {
			_, errRedis := RedisClient.Set(strings.ReplaceAll(msg.Payload, "RES_", "AUTH_"), "", GlobalConfig.RefreshTTL).Result()
			if errRedis != nil {
				logger.Error(LogPrefix, "Error While setting key in redis : ", errRedis)
			}
		}
	}
}
