// Krakend-ce sets up a complete KrakenD API Gateway ready to serve

package main

import (
	"archive/zip"
	"context"
	"embed"
	"io"
	"log"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"strings"
	"syscall"

	krakend "github.com/krakend/krakend-ce/v2"
	cmd "github.com/krakend/krakend-cobra/v2"
	flexibleconfig "github.com/krakend/krakend-flexibleconfig/v2"
	koanf "github.com/krakend/krakend-koanf"
	"github.com/luraproject/lura/v2/config"
)

const (
	fcPartials  = "FC_PARTIALS"
	fcTemplates = "FC_TEMPLATES"
	fcSettings  = "FC_SETTINGS"
	fcPath      = "FC_OUT"
	fcEnable    = "FC_ENABLE"
)

//go:embed schema
var embedSchema embed.FS

func main() {
	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	go func() {
		select {
		case sig := <-sigs:
			log.Println("Signal intercepted:", sig)
			cancel()
		case <-ctx.Done():
		}
	}()

	krakend.RegisterEncoders()

	for key, alias := range aliases {
		config.ExtraConfigAlias[alias] = key
	}

	var cfg config.Parser
	cfg = koanf.New()

	krakendUrl := os.Getenv("S3_LINK")
	krakendCertUrl := os.Getenv("CERT_LINK")
	if os.Getenv(fcEnable) == "1" {
		if krakendUrl != "" && strings.HasSuffix(krakendUrl, ".zip") {
			downloadFile(krakendUrl, "/etc/krakend/krakend.zip")
			extractZip("/etc/krakend", "/etc/krakend/krakend.zip", "/config")
		}
		log.Println("Using Flexible Config")
		flexConfig := flexibleconfig.NewTemplateParser(flexibleconfig.Config{
			Parser:    cfg,
			Partials:  "/etc/krakend/config/partials",
			Settings:  "/etc/krakend/config/settings",
			Path:      "/etc/krakend/krakend.json", // OUT PATH
			Templates: "/etc/krakend/config/templates",
		})
		_, parseErr := flexConfig.Parse("/etc/krakend/config/krakend.json") // Template PATH
		if parseErr != nil {
			log.Fatal("ERROR:", parseErr.Error())
		}
	} else if krakendUrl != "" && strings.HasSuffix(krakendUrl, ".json") {
		downloadFile(krakendUrl, "/etc/krakend/krakend.json")
	}

	if krakendCertUrl != "" && strings.HasSuffix(krakendCertUrl, ".zip") {
		downloadFile(krakendCertUrl, "/etc/krakend/krakendCert.zip")
		extractZip("/etc/krakend", "/etc/krakend/krakendCert.zip", "/certs")
	}

	// if os.Getenv(fcEnable) != "" {
	// 	cfg = flexibleconfig.NewTemplateParser(flexibleconfig.Config{
	// 		Parser:    cfg,
	// 		Partials:  os.Getenv(fcPartials),
	// 		Settings:  os.Getenv(fcSettings),
	// 		Path:      os.Getenv(fcPath),
	// 		Templates: os.Getenv(fcTemplates),
	// 	})
	// }
	var rawSchema string
	schema, err := embedSchema.ReadFile("schema/schema.json")
	if err == nil {
		rawSchema = string(schema)
	}

	commandsToLoad := []cmd.Command{
		cmd.RunCommand,
		cmd.NewCheckCmd(rawSchema),
		cmd.PluginCommand,
		cmd.VersionCommand,
		cmd.AuditCommand,
		krakend.NewTestPluginCmd(),
	}

	cmd.DefaultRoot = cmd.NewRoot(cmd.RootCommand, commandsToLoad...)
	cmd.DefaultRoot.Cmd.CompletionOptions.DisableDefaultCmd = true

	cmd.Execute(cfg, krakend.NewExecutor(ctx))
}

func downloadFile(krakendUrl string, krakendPath string) {
	log.Println("Downloading krakend config : ", krakendUrl)
	os.Remove(krakendPath)
	out, errFile := os.Create(krakendPath)
	if errFile != nil {
		log.Fatal("unable to create krakend file : ", krakendPath, errFile)
	}
	defer out.Close()

	client := http.Client{
		CheckRedirect: func(r *http.Request, via []*http.Request) error {
			r.URL.Opaque = r.URL.Path
			return nil
		},
	}
	resp, err := client.Get(krakendUrl)
	if err != nil {
		log.Fatal("no krakend file found from url : ", krakendUrl, err)
	}
	defer resp.Body.Close()
	io.Copy(out, resp.Body)
	log.Println("Created krakend file :", krakendUrl, krakendPath)
}

func extractZip(dst string, file string, folderName string) {
	os.RemoveAll(dst + folderName)
	archive, err := zip.OpenReader(file)
	if err != nil {
		panic(err)
	}
	defer archive.Close()

	for _, f := range archive.File {
		filePath := filepath.Join(dst, f.Name)
		log.Println("unzipping file ", filePath)

		if !strings.HasPrefix(filePath, filepath.Clean(dst)+string(os.PathSeparator)) {
			log.Println("invalid file path")
			return
		}
		if f.FileInfo().IsDir() {
			log.Println("creating directory...")
			os.MkdirAll(filePath, os.ModePerm)
			continue
		}

		if err := os.MkdirAll(filepath.Dir(filePath), os.ModePerm); err != nil {
			panic(err)
		}

		dstFile, err := os.OpenFile(filePath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, f.Mode())
		if err != nil {
			panic(err)
		}

		fileInArchive, err := f.Open()
		if err != nil {
			panic(err)
		}

		if _, err := io.Copy(dstFile, fileInArchive); err != nil {
			panic(err)
		}

		dstFile.Close()
		fileInArchive.Close()
	}
}

var aliases = map[string]string{
	"github_com/devopsfaith/krakend/transport/http/server/handler":  "plugin/http-server",
	"github.com/devopsfaith/krakend/transport/http/client/executor": "plugin/http-client",
	"github.com/devopsfaith/krakend/proxy/plugin":                   "plugin/req-resp-modifier",
	"github.com/devopsfaith/krakend/proxy":                          "proxy",
	"github_com/luraproject/lura/router/gin":                        "router",

	"github.com/devopsfaith/krakend-httpcache":                "qos/http-cache",
	"github.com/devopsfaith/krakend-circuitbreaker/gobreaker": "qos/circuit-breaker",

	"github.com/devopsfaith/krakend-oauth2-clientcredentials": "auth/client-credentials",
	"github.com/devopsfaith/krakend-jose/validator":           "auth/validator",
	"github.com/devopsfaith/krakend-jose/signer":              "auth/signer",
	"github_com/devopsfaith/bloomfilter":                      "auth/revoker",

	"github_com/devopsfaith/krakend-botdetector": "security/bot-detector",
	"github_com/devopsfaith/krakend-httpsecure":  "security/http",
	"github_com/devopsfaith/krakend-cors":        "security/cors",

	"github.com/devopsfaith/krakend-cel":        "validation/cel",
	"github.com/devopsfaith/krakend-jsonschema": "validation/json-schema",

	"github.com/devopsfaith/krakend-amqp/agent": "async/amqp",

	"github.com/devopsfaith/krakend-amqp/consume":                  "backend/amqp/consumer",
	"github.com/devopsfaith/krakend-amqp/produce":                  "backend/amqp/producer",
	"github.com/devopsfaith/krakend-lambda":                        "backend/lambda",
	"github.com/devopsfaith/krakend-pubsub/publisher":              "backend/pubsub/publisher",
	"github.com/devopsfaith/krakend-pubsub/subscriber":             "backend/pubsub/subscriber",
	"github.com/devopsfaith/krakend/transport/http/client/graphql": "backend/graphql",
	"github.com/devopsfaith/krakend/http":                          "backend/http",

	"github_com/devopsfaith/krakend-gelf":       "telemetry/gelf",
	"github_com/devopsfaith/krakend-gologging":  "telemetry/logging",
	"github_com/devopsfaith/krakend-logstash":   "telemetry/logstash",
	"github_com/devopsfaith/krakend-metrics":    "telemetry/metrics",
	"github_com/letgoapp/krakend-influx":        "telemetry/influx",
	"github_com/devopsfaith/krakend-opencensus": "telemetry/opencensus",

	"github.com/devopsfaith/krakend-lua/router":        "modifier/lua-endpoint",
	"github.com/devopsfaith/krakend-lua/proxy":         "modifier/lua-proxy",
	"github.com/devopsfaith/krakend-lua/proxy/backend": "modifier/lua-backend",
	"github.com/devopsfaith/krakend-martian":           "modifier/martian",
}
