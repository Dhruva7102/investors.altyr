/*
Package proxy provides a rate-limit proxy middleware using the github.com/juju/ratelimit lib.

Sample backend extra config

	...
	"extra_config": {
		...
		"plugin/auth-keyclock":{
			"auth": true / false,
			"thirdParty": true / false,
			"realm": "master", // realm to validate
			"permission": "res:user#scope:read" // permission to validate {RESOURCE}#{SCOPE}
		},
		...
	},
	...
*/
package authKeyclock

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"math"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-jose/go-jose/v3/jwt"
	auth0 "github.com/krakend/go-auth0/v2"
	jose "github.com/krakend/krakend-jose/v2"
	"github.com/luraproject/lura/v2/config"
	"github.com/luraproject/lura/v2/logging"
	"github.com/luraproject/lura/v2/proxy"
	ginlura "github.com/luraproject/lura/v2/router/gin"
	"github.com/nicksnyder/go-i18n/v2/i18n"
	"golang.org/x/text/language"
)

// Namespace is the key to use to store and access the custom config data for the proxy
const Namespace = "plugin/auth-keyclock"

// Config is the custom config struct containing the params for the auth
type Config struct {
	ThirdParty bool
	Auth       bool
	Realm      string
	Permission string
}

// curl -X GET "http://localhost:8081/v1/health" -H "api-key: a55d173b.d356f337608bf721b4c432bde40a5e"

// HandlerFactory adds a auth middleware wrapping the internal factory
func HandlerFactory(hf ginlura.HandlerFactory, logger logging.Logger) ginlura.HandlerFactory {
	// Initialize i18n
	bundle := i18n.NewBundle(language.Make(getEnv("DEFAULT_LANGUAGE", "en")))
	bundle.RegisterUnmarshalFunc("json", json.Unmarshal)
	for _, lang := range strings.Split(getEnv("LANGUAGES", "en"), ",") {
		// bundle.LoadMessageFile(fmt.Sprintf("locales/%v.json", lang))
		bundle.MustLoadMessageFile(fmt.Sprintf("locales/%v.json", lang))
	}
	return TokenSignatureValidator(hf, logger, bundle)
}

func TokenSignatureValidator(hf ginlura.HandlerFactory, logger logging.Logger, bundle *i18n.Bundle) ginlura.HandlerFactory {
	return func(cfg *config.EndpointConfig, prxy proxy.Proxy) gin.HandlerFunc {
		logPrefix := "[ENDPOINT: " + cfg.Endpoint + "][Auth-Keyclock]"

		handler := hf(cfg, prxy)
		logger.Info(logPrefix, "cfg.ExtraConfig: ", cfg.ExtraConfig)
		endpointConfig, err := ConfigGetter(cfg.ExtraConfig)
		if err != nil {
			if err != ErrNoExtraCfg {
				logger.Error(logPrefix, err)
			}
			logger.Info(logPrefix, "Keyclock disabled for this endpoint")
			return handler
		}
		// apiKeyValidator := "http://localhost:8002/v1/api-key-manager/validate"
		apiKeyValidator := os.Getenv("API_KEY_VALIDATOR")
		if !endpointConfig.Auth && (apiKeyValidator == "" || !endpointConfig.ThirdParty) {
			logger.Info(logPrefix, "Keyclock disabled for this endpoint")
			return handler
		}
		logger.Debug(logPrefix, "Keyclock auth enabled")
		if apiKeyValidator != "" && endpointConfig.ThirdParty {
			logger.Debug(logPrefix, "ApiKey auth enabled")
		}

		var validator *auth0.JWTValidator
		// var validator *auth0.JWTValidator
		keycloakJwkUrl := os.Getenv("KEYCLOAK_JWK_URL")
		if keycloakJwkUrl != "" {

			suffix := "/protocol/openid-connect/certs"
			if !strings.HasSuffix(keycloakJwkUrl, suffix) {
				logger.Fatal(logPrefix, "unexpected JWK URL format")
				return handler
			}
			issuer := strings.TrimSuffix(keycloakJwkUrl, suffix)

			valCfg := jose.SignatureConfig{
				Alg:            "RS256",
				AuthHeaderName: "Authorization",
				URI:            keycloakJwkUrl,
				CacheEnabled:   true,
				CacheDuration:  3600,
				Issuer:         issuer,
				Audience:       []string{"account"},
				CookieKey:      "access_token",
			}
			validator, err = jose.NewValidator(&valCfg, FromCookie, FromHeader)
			if err != nil {
				logger.Fatal(logPrefix, "Unable to create the validator:", err.Error())
			}
		}

		return func(c *gin.Context) {
			lanHeader := c.Request.Header.Get(getEnv("LANGUAGE_HEADER_FIELD", "language"))
			if lanHeader == "" {
				lanHeader = "en"
			}
			localizer := i18n.NewLocalizer(bundle, lanHeader)

			apiKey := c.Request.Header.Get("api-key")
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
							"type":             "api-key",
							"realmNameOfToken": "master",
							"userId":           "",
							// "userId":           response["data"].(map[string]interface{})["tenantId"].(string), // for 3 rd party api key
							"clientId":      response["data"].(map[string]interface{})["tenantId"].(string) + "_api-client",
							"token":         apiKey,
							"authCompleted": true,
						}
						newAuthHeaderString, _ := json.Marshal(newAuthHeader)
						c.Request.Header.Set("Authorization", string(newAuthHeaderString))
						c.Request.Header.Set("RealmName", response["data"].(map[string]interface{})["tenantId"].(string))
						handler(c)
						return
					}
				}
				logger.Error(logPrefix, "Unable to get the token:", err)
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

			token, err := auth0.FromHeader(c.Request)
			if err != nil {
				logger.Error(logPrefix, "Failed to parse token:", err)
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

			claims := map[string]interface{}{}
			if validator != nil {
				// logger.Debug(logPrefix, "Keycloak JWK URL found, using JWTValidator")

				// Step 1: Validate the token
				tkn, err := validator.ValidateRequest(c.Request)
				if err != nil {
					logger.Error(logPrefix, "Token validation failed:", err)
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

				// Step 2: Get the claims
				err = validator.Claims(c.Request, tkn, &claims) // should be pass tkn or token?, should we pass claims? as it is empty
				if err != nil {
					logger.Error(logPrefix, "Failed to parse token claims:", err)
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

			} else {
				// logger.Debug(logPrefix, "No Keycloak JWK URL found, using UnsafeClaimsWithoutVerification")
				err = token.UnsafeClaimsWithoutVerification(&claims)
				if err != nil {
					logger.Error(logPrefix, "Token sent by client is invalid:", err)
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

			i, decim := math.Modf(claims["exp"].(float64))
			tm := time.Unix(int64(i), int64(decim*(1e9)))

			if time.Now().Unix() > tm.Unix() {
				messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
					DefaultMessage: &i18n.Message{
						ID: "406",
					},
				})
				retObj := map[string]interface{}{
					"message": messageStr,
				}
				logger.Error(logPrefix, "token expired:", tm)
				c.AbortWithStatusJSON(http.StatusNotAcceptable, retObj)
				return
			}

			if claims["iss"] == "" {
				logger.Error(logPrefix, "Token sent by client is invalid: empty issuer")
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

			issuerparts := strings.Split(claims["iss"].(string), "/")
			realmName := issuerparts[len(issuerparts)-1]

			if endpointConfig.Realm != "" {
				if endpointConfig.Realm != realmName {
					messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
						DefaultMessage: &i18n.Message{
							ID: "401",
						},
					})
					retObj := map[string]interface{}{
						"message": messageStr,
					}
					logger.Error(logPrefix, "realm not match : ", endpointConfig.Realm, realmName)
					c.AbortWithStatusJSON(http.StatusUnauthorized, retObj)
					return
				}
			}

			if endpointConfig.Permission != "" {
				// logger.Debug(logPrefix, "Permission check enabled for endpoint:", endpointConfig.Permission)
				apiURL := claims["iss"].(string) + "/protocol/openid-connect/token"

				data := url.Values{}
				data.Set("grant_type", "urn:ietf:params:oauth:grant-type:uma-ticket")
				data.Set("audience", claims["azp"].(string))
				data.Set("response_include_resource_name", "true")
				data.Set("response_mode", "decision")
				data.Set("permission", endpointConfig.Permission)

				reqRouteAPI, _ := http.NewRequest(http.MethodPost, apiURL, strings.NewReader(data.Encode()))

				reqRouteAPI.Header.Set("Content-Type", "application/x-www-form-urlencoded")
				reqRouteAPI.Header.Add("Content-Length", strconv.Itoa(len(data.Encode())))
				reqRouteAPI.Header.Add("Authorization", c.Request.Header.Get("Authorization"))
				client := &http.Client{}
				resp, err := client.Do(reqRouteAPI)
				if err != nil {
					logger.Error(logPrefix, "error in open id api", err)
				}
				defer resp.Body.Close()
				body, _ := ioutil.ReadAll(resp.Body)

				var response map[string]interface{}
				json.Unmarshal(body, &response)

				if response["error"] != nil {
					// return error
					messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
						DefaultMessage: &i18n.Message{
							ID: "401",
						},
					})
					statusCode := http.StatusUnauthorized
					if response["error"].(string) == "invalid_scope" || response["error"].(string) == "invalid_resource" {
						// return error
						messageStr = localizer.MustLocalize(&i18n.LocalizeConfig{
							DefaultMessage: &i18n.Message{
								ID: "403",
							},
						})
						statusCode = http.StatusForbidden
					}
					retObj := map[string]interface{}{
						"message": messageStr,
					}

					logger.Error(logPrefix, "permission error:", response["error"])
					c.AbortWithStatusJSON(statusCode, retObj)
					return
				}

				if response["result"] == nil || !response["result"].(bool) {
					messageStr := localizer.MustLocalize(&i18n.LocalizeConfig{
						DefaultMessage: &i18n.Message{
							ID: "403",
						},
					})
					retObj := map[string]interface{}{
						"message": messageStr,
					}

					logger.Error(logPrefix, "permission result error:", endpointConfig.Permission)
					c.AbortWithStatusJSON(http.StatusForbidden, retObj)
					return
				}

			}

			if realmName != "master" {
				c.Request.Header.Set("RealmName", string(realmName))
			} else {
				reamNameHeader := c.Request.Header.Get("RealmName")
				if reamNameHeader == "" {
					c.Request.Header.Set("RealmName", string(realmName))
				}
			}

			newAuthHeader := map[string]interface{}{
				"realmNameOfToken": realmName,
				"userId":           claims["sub"].(string),
				"clientId":         claims["azp"].(string),
				"token":            c.Request.Header.Get("Authorization"),
				"authCompleted":    true,
				"type":             "keycloak",
				"metaData":         claims,
			}
			newAuthHeaderString, _ := json.Marshal(newAuthHeader)
			c.Request.Header.Set("Authorization", string(newAuthHeaderString))

			handler(c)
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
		default:
			cfg.Auth = false
		}
	}
	if v, ok := tmp["realm"]; ok {
		switch val := v.(type) {
		case string:
			cfg.Realm = val
		default:
			cfg.Realm = ""
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

// FromCookie extracts the token from a cookie
func FromCookie(key string) func(r *http.Request) (*jwt.JSONWebToken, error) {
	if key == "" {
		key = "access_token"
	}
	return func(r *http.Request) (*jwt.JSONWebToken, error) {
		cookie, err := r.Cookie(key)
		if err != nil {
			return nil, err
		}
		tok := strings.TrimPrefix(cookie.Value, "Bearer ")
		return jwt.ParseSigned(tok)
	}
}

// FromHeader extracts the token from a header
func FromHeader(key string) func(r *http.Request) (*jwt.JSONWebToken, error) {
	if key == "" {
		key = "Authorization"
	}
	return func(r *http.Request) (*jwt.JSONWebToken, error) {
		token := r.Header.Get(key)
		if token == "" {
			return nil, fmt.Errorf("no token found in header %s", key)
		}
		tok := strings.TrimPrefix(token, "Bearer ")
		return jwt.ParseSigned(tok)
	}
}

// Simple helper function to read an environment or return a default value
func getEnv(key string, defaultVal string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}

	return defaultVal
}
