package main

import (
	"budgify.com/backend/internal/config"
	"budgify.com/backend/internal/database"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	cfg := config.LoadEnv()
	user := &database.User{
		ConnectionURI: cfg.ConnectionURI,
		Passwd:        cfg.Psswd,
	}
	client := database.ConnectWithMongoDb(user)
	router.Run(cfg.Port)
}
