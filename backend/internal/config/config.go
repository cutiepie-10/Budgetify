package config

import (
	"log"

	"github.com/ilyakaznacheev/cleanenv"
	"github.com/joho/godotenv"
)

type Config struct {
	ConnectionURI string `yaml:"connectionuri" env:"CONNECTION_URI" env-required:"true"`
	Psswd         string `yaml:"password" env:"PASSWD" env-required:"true"`
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
		log.Default().Fatalln("Cannot load environmental variables correctly")
	}
	return &cfg
}
