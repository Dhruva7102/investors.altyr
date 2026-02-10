/*
Package proxy provides a rate-limit proxy middleware using the github.com/juju/ratelimit lib.

Sample backend extra config

	...
	"extra_config": {
		...
		"plugin/auth-custom":{
			"auth": true / false / "admin" / ["admin", "user"],
		},
		...
	},
	...
*/
package authCustom

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/auth0-community/go-auth0"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
	"github.com/luraproject/lura/v2/config"
	"github.com/luraproject/lura/v2/logging"
	"github.com/luraproject/lura/v2/proxy"
	ginlura "github.com/luraproject/lura/v2/router/gin"
	"github.com/nicksnyder/go-i18n/v2/i18n"
	"golang.org/x/text/language"
	"gopkg.in/square/go-jose.v2/jwt"
)

// Namespace is the key to use to store and access the custom config data for the proxy
const Namespace = "plugin/auth-custom"

// Config is the custom config struct containing the params for the auth
type Config struct {
	ThirdParty bool
	Auth       bool
	UserType   []string
	Permission string
}

// Claims represents public claim values (as specified in RFC 7519).
type Claims struct {
	Issuer          string                 `json:"iss,omitempty"`
	Subject         string                 `json:"sub,omitempty"`
	Audience        []string               `json:"aud,omitempty"`
	Expiry          int64                  `json:"exp,omitempty"`
	NotBefore       int64                  `json:"nbf,omitempty"`
	IssuedAt        int64                  `json:"iat,omitempty"`
	ID              string                 `json:"jti,omitempty"`
	UserType        string                 `json:"userType,omitempty"`
	MultiLogin      string                 `json:"multiLogin,omitempty"`
	ImmediateRevoke string                 `json:"immediateRevoke,omitempty"`
	MetaData        map[string]interface{} `json:"metaData,omitempty"`
	RefershToken    string                 `json:"refershToken,omitempty"`
	AccessTTL       time.Duration          `json:"accessTTL,omitempty"`  // eg, time in second, minute, hour(like 1m, 1s, 1h30m) or optional for default
	RefreshTTL      time.Duration          `json:"refreshTTL,omitempty"` // eg, time in second, minute, hour(like 1m, 1s, 1h30m) or optional for default
}

// HandlerFactory adds a auth middleware wrapping the internal factory
func HandlerFactory(hf ginlura.HandlerFactory, logger logging.Logger) ginlura.HandlerFactory {
	// Initialize i18n
	bundle := i18n.NewBundle(language.Make(getEnv("DEFAULT_LANGUAGE", "en")))
	bundle.RegisterUnmarshalFunc("json", json.Unmarshal)
	for _, lang := range strings.Split(getEnv("LANGUAGES", "en"), ",") {
		// bundle.LoadMessageFile(fmt.Sprintf("locales/%v.json", lang))
		bundle.MustLoadMessageFile(fmt.Sprintf("locales/%v.json", lang))
	}
	// Run JWT server
	if GlobalConfig.Enabled {
		go RunJWTService(logger, bundle)
	}
	return TokenSignatureValidator(hf, logger, bundle)
}

func TokenSignatureValidator(hf ginlura.HandlerFactory, logger logging.Logger, bundle *i18n.Bundle) ginlura.HandlerFactory {
	return func(cfg *config.EndpointConfig, prxy proxy.Proxy) gin.HandlerFunc {
		logPrefix := "[ENDPOINT: " + cfg.Endpoint + "][Auth-Custom]"

		handler := hf(cfg, prxy)
		if !GlobalConfig.Enabled {
			logger.Info(logPrefix, "Custom Auth disabled globally")
			return handler
		}
		logger.Info(logPrefix, "cfg.ExtraConfig: ", cfg.ExtraConfig)
		endpointConfig, err := ConfigGetter(cfg.ExtraConfig)
		if err != nil {
			if err != ErrNoExtraCfg {
				logger.Error(logPrefix, err)
			}
			logger.Info(logPrefix, "Custom Auth disabled for this endpoint")
			return handler
		}

		apiKeyValidator := os.Getenv("API_KEY_VALIDATOR")
		if !endpointConfig.Auth && (apiKeyValidator == "" || !endpointConfig.ThirdParty) {
			logger.Info(logPrefix, "Custom Auth disabled for this endpoint")
			return handler
		}
		logger.Debug(logPrefix, "Custom Auth auth enabled")
		if apiKeyValidator != "" && endpointConfig.ThirdParty {
			logger.Debug(logPrefix, "ApiKey auth enabled")
		}

		return func(c *gin.Context) {
			lanHeader := c.Request.Header.Get(getEnv("LANGUAGE_HEADER_FIELD", "language"))
			localizer := i18n.NewLocalizer(bundle, lanHeader)

			tokenHeader := c.Request.Header.Get("authorization")
			logger.Debug(logPrefix, "auth header: ", tokenHeader)

			apiKey := c.Request.Header.Get("api-key")
			logger.Debug(logPrefix, "auth header apiKey: ", apiKey)
			if len(tokenHeader) == 0 {
				if endpointConfig.ThirdParty && apiKey != "" {
					permissionArr := strings.Split(endpointConfig.Permission, "#")
					resourceArr := strings.Split(permissionArr[0], ":")
					scopeArr := strings.Split(permissionArr[1], ":")
					reqRouteAPI, _ := http.NewRequest(http.MethodGet, apiKeyValidator, nil)
					reqRouteAPI.Header.Add("Authorization", c.Request.Header.Get("Authorization"))
					reqRouteAPI.Header.Add("api-key", apiKey)
					reqRouteAPI.Header.Add("resource", resourceArr[1])
					reqRouteAPI.Header.Add("scope", scopeArr[1])

					client := &http.Client{}
					resp, err := client.Do(reqRouteAPI)
					if err != nil {
						logger.Error(logPrefix, "error in api key validate api:", err)
					}
					defer resp.Body.Close()
					body, _ := ioutil.ReadAll(resp.Body)

					if resp.StatusCode == 200 {
						var response map[string]interface{}
						json.Unmarshal(body, &response)
						if response["message"] == "Success" {
							newAuthHeader := map[string]interface{}{
								"type":          "api-key",
								"userId":        response["data"].(map[string]interface{})["tenantId"],
								"userType":      "api-key",
								"metaData":      response["data"].(map[string]interface{}),
								"authCompleted": true,
							}
							newAuthHeaderString, _ := json.Marshal(newAuthHeader)
							c.Request.Header.Set("Authorization", string(newAuthHeaderString))

							handler(c)
							return
						}
					}
				}
				logger.Error(logPrefix, "Unable to get the token:")
				messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
					DefaultMessage: &i18n.Message{
						ID: "404",
					},
				})
				retObj := map[string]interface{}{
					"message": messageStr,
				}
				c.AbortWithStatusJSON(http.StatusBadRequest, retObj)
				return
			}

			tokenData := strings.Fields(tokenHeader)
			if len(tokenData) != 2 {
				logger.Error(logPrefix, "invalid token not basic or bearer included")
				messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
					DefaultMessage: &i18n.Message{
						ID: "404",
					},
				})
				retObj := map[string]interface{}{
					"message": messageStr,
				}
				c.AbortWithStatusJSON(http.StatusBadRequest, retObj)
				return
			}
			tokenString := tokenData[1]

			if strings.ToUpper(tokenData[0]) == "BASIC" && stringInArray("basic", endpointConfig.UserType) && GlobalConfig.BasicAuth {
				basicCreds, err := base64.StdEncoding.DecodeString(tokenString)
				if err != nil {
					logger.Error(logPrefix, "Unable to decode basic token:", err.Error())
					messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
						DefaultMessage: &i18n.Message{
							ID: "401",
						},
					})
					retObj := map[string]interface{}{
						"message": messageStr,
					}
					c.AbortWithStatusJSON(http.StatusUnauthorized, retObj)
					return
				}
				credsArr := strings.Split(string(basicCreds), ":")
				if len(credsArr) > 1 && (os.Getenv("BASIC_AUTH_"+credsArr[0]) == credsArr[1] || GlobalConfig.BasicAuthCreds[credsArr[0]] == credsArr[1]) {
					// if authConfig.BasicAuthCreds[credsArr[0]] == credsArr[1] {
					newAuthHeader := map[string]interface{}{
						"type":          "Basic",
						"userId":        "",
						"userType":      "",
						"metaData":      map[string]interface{}{},
						"authCompleted": true,
					}
					newAuthHeaderString, _ := json.Marshal(newAuthHeader)

					c.Request.Header.Set("Authorization", string(newAuthHeaderString))

					handler(c)
					return
				}
				logger.Error(logPrefix, "Unable to find user :", credsArr[0])
				messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
					DefaultMessage: &i18n.Message{
						ID: "401",
					},
				})
				retObj := map[string]interface{}{
					"message": messageStr,
				}
				c.AbortWithStatusJSON(http.StatusUnauthorized, retObj)
				return
			} else if strings.ToUpper(tokenData[0]) == "BEARER" {
				claim, err := DecodeToken(tokenString)
				if err != nil {
					logger.Error(logPrefix, "Unable to decode bearer token:", err.Error())
					messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
						DefaultMessage: &i18n.Message{
							ID: "401",
						},
					})
					retObj := map[string]interface{}{
						"message": messageStr,
					}
					c.AbortWithStatusJSON(http.StatusUnauthorized, retObj)
					return
				}

				if len(endpointConfig.UserType) > 0 && !stringInArray(claim.UserType, endpointConfig.UserType) {
					logger.Error(logPrefix, "Auth not matched with route auth : ", claim.UserType, endpointConfig.UserType)
					messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
						DefaultMessage: &i18n.Message{
							ID: "401",
						},
					})
					retObj := map[string]interface{}{
						"message": messageStr,
					}
					c.AbortWithStatusJSON(http.StatusUnauthorized, retObj)
					return
				}

				if claim.ImmediateRevoke == "true" && GlobalConfig.RedisEnable {
					_, errRedis := RedisClient.Get(fmt.Sprintf("AUTH_%s_%s_%s", claim.UserType, claim.ID, claim.RefershToken)).Result()
					// fmt.Printf("%s\n", redisData)
					if errRedis != nil {
						if errRedis == redis.Nil {
							logger.Error(logPrefix, "no data in redis get : ", errRedis, fmt.Sprintf("AUTH_%s_%s_%s", claim.UserType, claim.ID, claim.RefershToken))
							messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
								DefaultMessage: &i18n.Message{
									ID: "401",
								},
							})
							retObj := map[string]interface{}{
								"message": messageStr,
							}
							c.AbortWithStatusJSON(http.StatusUnauthorized, retObj)
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

				if claim.Expiry < time.Now().Unix() {
					logger.Error(logPrefix, "Token Expired :", claim.Expiry)
					messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
						DefaultMessage: &i18n.Message{
							ID: "406",
						},
					})
					retObj := map[string]interface{}{
						"message": messageStr,
					}
					c.AbortWithStatusJSON(http.StatusNotAcceptable, retObj)
					return
				}

				newAuthHeader := map[string]interface{}{
					"type":          "Bearer",
					"userId":        claim.ID,
					"userType":      claim.UserType,
					"metaData":      claim.MetaData,
					"authCompleted": true,
				}
				newAuthHeaderString, _ := json.Marshal(newAuthHeader)

				c.Request.Header.Set("Authorization", string(newAuthHeaderString))

				handler(c)
				return
			} else {
				logger.Error(logPrefix, "Invalid token type : ", tokenData[0])
				messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
					DefaultMessage: &i18n.Message{
						ID: "401",
					},
				})
				retObj := map[string]interface{}{
					"message": messageStr,
				}
				c.AbortWithStatusJSON(http.StatusUnauthorized, retObj)
				return
			}
		}
	}
}

// ZeroCfg is the zero value for the Config struct
var ZeroCfg = Config{}

var (
	ErrNoExtraCfg    = errors.New("no extra config")
	ErrWrongExtraCfg = errors.New("wrong extra config")
)

// ConfigGetter parses the extra config for the rate adapter and returns
// a ZeroCfg and an error if something goes wrong.
func ConfigGetter(e config.ExtraConfig) (Config, error) {
	v, ok := e[Namespace]
	if !ok {
		return ZeroCfg, ErrNoExtraCfg
	}
	tmp, ok := v.(map[string]interface{})
	if !ok {
		return ZeroCfg, ErrWrongExtraCfg
	}
	cfg := Config{}
	if v, ok := tmp["thirdParty"]; ok {
		switch val := v.(type) {
		case bool:
			cfg.ThirdParty = bool(val)
		default:
			cfg.ThirdParty = false
		}
	}
	if v, ok := tmp["auth"]; ok {
		switch val := v.(type) {
		case bool:
			cfg.Auth = bool(val)
		case []interface{}:
			for _, v := range val {
				cfg.UserType = append(cfg.UserType, v.(string))
			}
			cfg.Auth = true
		case []string:
			cfg.UserType = val
			cfg.Auth = true
		case string:
			cfg.UserType = []string{val}
			cfg.Auth = true
			if val == "false" {
				cfg.Auth = false
			}
		default:
			cfg.Auth = false
		}
	}
	if v, ok := tmp["permission"]; ok {
		switch val := v.(type) {
		case string:
			cfg.Permission = val
		default:
			cfg.Permission = ""
		}
	}
	return cfg, nil
}

func FromHeader(key string) func(r *http.Request) (*jwt.JSONWebToken, error) {
	if key == "" {
		key = "Authorization"
	}
	return func(r *http.Request) (*jwt.JSONWebToken, error) {
		token, err := auth0.FromHeader(r)
		if err != nil {
			return nil, auth0.ErrTokenNotFound
		}
		return token, nil
	}
}

// DecodeToken secret string
func DecodeToken(tokenString string) (Claims, error) {
	var claim Claims
	errDefault := errors.New("invalid token")
	tok, err := jwt.ParseSignedAndEncrypted(tokenString)
	if err != nil {
		return claim, errDefault
	}

	nested, err := tok.Decrypt(GlobalConfig.JwkPrvKey)
	if err != nil {
		return claim, errDefault
	}

	if err := nested.Claims(GlobalConfig.JwkPubKey, &claim); err != nil {
		return claim, errDefault
	}
	return claim, nil
}

// Auth secret string
// validate token for every request
func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.Request.Header.Get("authorization")
		if tokenString == "" {
			c.AbortWithError(401, errors.New("NO AUTHORIZATION"))
			c.JSON(401, gin.H{"message": errors.New("NO AUTHORIZATION").Error()})
			return
		}

		tok, err := jwt.ParseSignedAndEncrypted(tokenString)
		if err != nil {
			c.AbortWithError(401, err)
			c.JSON(401, gin.H{"message": err.Error()})
			return
		}

		nested, err := tok.Decrypt(GlobalConfig.JwkPrvKey)
		if err != nil {
			c.AbortWithError(401, err)
			c.JSON(401, gin.H{"message": err.Error()})
			return
		}

		out := jwt.Claims{}
		if err := nested.Claims(GlobalConfig.JwkPubKey, &out); err != nil {
			c.AbortWithError(401, err)
			c.JSON(401, gin.H{"message": err.Error()})
			return
		}

		validateErr := out.Validate(jwt.Expected{
			Time: time.Now(),
		})
		if validateErr != nil {
			c.AbortWithError(401, validateErr)
			c.JSON(401, gin.H{"message": validateErr.Error()})
			return
		}
	}
}

func stringInArray(str string, list []string) bool {
	for _, v := range list {
		if strings.EqualFold(v, str) {
			return true
		}
	}
	return false
}
