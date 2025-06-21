package config

import (
	"crypto/tls"
	"crypto/x509"
	"log"
	"log/slog"
	"os"
	"time"

	"github.com/ilyakaznacheev/cleanenv"
	"github.com/joho/godotenv"
)

type Config struct {
	ConnectionURI string `yaml:"connectionuri" env:"CONNECTION_URI" env-required:"true"`
	Psswd         string `yaml:"password" env:"PASSWORD" env-required:"true"`
	Port          string `yaml:"port" env:"PORT" env-default:"8080"`
}

func LoadEnv() *Config {
	err := godotenv.Load()
	if err != nil {
		log.Default().Panicln("Could Get a .env file, Error", err)
	}
	var cfg Config
	err = cleanenv.ReadEnv(&cfg)
	if err != nil {
		log.Default().Fatalln("Cannot load environmental variables correctly", err.Error())
	}
	return &cfg
}
func GetTLSConfig() (*tls.Config, error) {
	caFile := os.Getenv("CA_FILEPATH")
	certFile := os.Getenv("CERT_FILEPATH")
	caBlock, _ := os.ReadFile(caFile)
	keyFile := os.Getenv("KEY_FILEPATH")
	caCertPool := x509.NewCertPool()
	if ok := caCertPool.AppendCertsFromPEM(caBlock); !ok {
		slog.Error("could not load the certificate file")
		return nil, nil
	}
	cert, err := tls.LoadX509KeyPair(certFile, keyFile)
	if err != nil {
		return nil, err
	}
	tlsConfig := &tls.Config{
		RootCAs:            caCertPool,
		Certificates:       []tls.Certificate{cert},
		InsecureSkipVerify: true,
		Time: func() time.Time {
			return time.Now()
		},
		MinVersion: tls.VersionTLS12,
	}
	return tlsConfig, nil
}
