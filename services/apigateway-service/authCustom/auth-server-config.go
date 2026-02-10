/*
Package proxy provides a rate-limit proxy middleware using the github.com/juju/ratelimit lib.

Sample backend extra config

	for global configuration
	...
	"extra_config": {
		...
		"plugin/auth-server": {
			"allowOrigins": [
				"*"
			],
			"keyName": "id_rsa",
			"jwtIssuer": "http://shoppd.net/",
			"jwtPort": 8090,
			"jwtEndpoint": "accessKeys",
			"accessTTL": "180h",
			"refreshTTL": "360h",
			"basicAuth": true,
			"basicAuthCreds": {
				"test": "test"
			}
		},
		...
	},
	...
	for backend
	...
	"extra_config": {
		...
		"plugin/auth-server":{
			"auth": true / false / "admin" / ["admin", "user"],
		},
		...
	},
	...
*/
package authCustom

import (
	"encoding/json"
	"errors"
	"os"
	"strconv"
	"time"

	"github.com/go-redis/redis"
	"github.com/luraproject/lura/v2/config"
	"github.com/luraproject/lura/v2/logging"
)

// Namespace is the key to use to store and access the custom config data for the proxy
const NamespaceServer = "plugin/auth-server"

const LogPrefix = "[CONFIG: Auth-Server]"

// Config is the custom config struct containing the params for the auth
type ServerConfig struct {
	Enabled        bool                   `json:"enabled"`
	RedisEnable    bool                   `json:"redisEnable"`
	AllowOrigins   []string               `json:"allowOrigins"`
	KeyName        string                 `json:"keyName"`     // key name
	PrivateKey     string                 `json:"privateKey"`  // private key path
	PublicKey      string                 `json:"publicKey"`   // public key path
	JwtIssuer      string                 `json:"jwtIssuer"`   // issuer
	JwtPort        int                    `json:"jwtPort"`     // jwt port to run jwt server
	JwtEndpoint    string                 `json:"jwtEndpoint"` // Endpoint for generating tokens
	AccessTTL      time.Duration          `json:"accessTTL"`   // ttl for access token
	RefreshTTL     time.Duration          `json:"refreshTTL"`  // ttl for refresh token
	BasicAuth      bool                   `json:"basicAuth"`
	BasicAuthCreds map[string]interface{} `json:"basicAuthCreds"`
	JwkPrvKey      interface{}
	JwkPubKey      interface{}
}

// GlobalConfig is the global value for the Config struct
var GlobalConfig = ServerConfig{}

// RedisClient - redis global connection
var RedisClient *redis.Client

var (
	ErrNoExtraCfgServer    = errors.New("no extra config for custom auth server")
	ErrWrongExtraCfgServer = errors.New("wrong extra config for custom auth server")
)

// ConfigGetter parses the extra config for the rate adapter and returns
// a ZeroCfg and an error if something goes wrong.
func ConfigGetterServer(logger logging.Logger, e config.ExtraConfig) (ServerConfig, error) {
	v, ok := e[NamespaceServer]
	if !ok {
		return GlobalConfig, ErrNoExtraCfgServer
	}
	tmp, ok := v.(map[string]interface{})
	if !ok {
		return GlobalConfig, ErrWrongExtraCfgServer
	}
	authConfigParse := PraseAuthConfig{
		AllowOrigins:   []string{"http://localhost", "http://localhost:8080"},
		KeyName:        "id_rsa",
		JwtIssuer:      "http://example.com/",
		JwtPort:        8090,
		JwtEndpoint:    "accessKeys",
		AccessTTL:      "180h",
		RefreshTTL:     "360h",
		BasicAuth:      false,
		BasicAuthCreds: map[string]interface{}{},
	}
	configData, _ := json.Marshal(tmp)
	err := json.Unmarshal(configData, &authConfigParse)
	if err != nil {
		return GlobalConfig, err
	}

	GlobalConfig = authConfigParse.normalize()

	jwkPrvKey, jwkPubKey, err := LoadKeys(GlobalConfig.PrivateKey, GlobalConfig.PublicKey, logger)
	if err != nil {
		return GlobalConfig, err
	}
	GlobalConfig.JwkPrvKey = jwkPrvKey
	GlobalConfig.JwkPubKey = jwkPubKey
	GlobalConfig.Enabled = true

	ConnectRedis(logger)
	// defer CloseRedisClient(logger)

	return GlobalConfig, nil
}

// PraseAuthConfig - for data of Auth config
type PraseAuthConfig struct {
	AllowOrigins   []string               `json:"allowOrigins"`
	KeyName        string                 `json:"keyName"`     // key name
	JwtIssuer      string                 `json:"jwtIssuer"`   // issuer
	JwtPort        int                    `json:"jwtPort"`     // jwt port to run jwt server
	JwtEndpoint    string                 `json:"jwtEndpoint"` // Endpoint for generating tokens
	AccessTTL      string                 `json:"accessTTL"`   // ttl for access token
	RefreshTTL     string                 `json:"refreshTTL"`  // ttl for refresh token
	BasicAuth      bool                   `json:"basicAuth"`
	BasicAuthCreds map[string]interface{} `json:"basicAuthCreds"`
}

func (p *PraseAuthConfig) normalize() ServerConfig {
	cfg := ServerConfig{
		AllowOrigins:   p.AllowOrigins,
		PrivateKey:     "./certs/" + p.KeyName,
		PublicKey:      "./certs/" + p.KeyName + ".pub",
		JwtIssuer:      p.JwtIssuer,
		JwtPort:        p.JwtPort,
		JwtEndpoint:    p.JwtEndpoint,
		AccessTTL:      parseDuration(p.AccessTTL),
		RefreshTTL:     parseDuration(p.RefreshTTL),
		BasicAuth:      p.BasicAuth,
		BasicAuthCreds: p.BasicAuthCreds,
	}
	return cfg
}

func parseDuration(v string) time.Duration {
	d, err := time.ParseDuration(v)
	if err != nil {
		return 0
	}
	return d
}

// ConnectRedis - connect to redis
func ConnectRedis(logger logging.Logger) error {
	redisOption := &redis.Options{
		Addr:         getEnv("REDIS_URL", ""),
		Password:     getEnv("REDIS_PASS", ""),   // no password set
		DB:           getEnvAsInt("REDIS_DB", 0), // use default DB
		PoolSize:     1000,                       // pool size
		MinIdleConns: 50,                         // idle connections
		DialTimeout:  10 * time.Second,           // dial timeout
		ReadTimeout:  10 * time.Second,           // read timeout
		PoolTimeout:  20 * time.Second,           // pool timeout
	}
	if redisOption.Addr != "" {
		RedisClient = redis.NewClient(redisOption)
		pong, err := RedisClient.Ping().Result()
		if err != nil {
			return err
		}
		GlobalConfig.RedisEnable = true
		logger.Debug(LogPrefix, "redis connected : ", pong)
	} else {
		logger.Debug(LogPrefix, "redis not provided ")
	}
	return nil
}

// CloseRedisClient closes the global Redis client
func CloseRedisClient(logger logging.Logger) {
	err := RedisClient.Close()
	if err != nil {
		logger.Error(LogPrefix, "Could not close Redis client: %v", err)
	}
}

// Simple helper function to read an environment or return a default value
func getEnv(key string, defaultVal string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}

	return defaultVal
}

// Simple helper function to read an environment variable into integer or return a default value
func getEnvAsInt(name string, defaultVal int) int {
	valueStr := getEnv(name, "")
	if value, err := strconv.Atoi(valueStr); err == nil {
		return value
	}

	return defaultVal
}
