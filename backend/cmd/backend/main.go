package main

import (
	"fmt"
	"log"
	"log/slog"

	"budgify.com/backend/internal/config"
	"budgify.com/backend/internal/database"
	"budgify.com/backend/internal/handlers"
	"budgify.com/backend/internal/middleware"
	routes "budgify.com/backend/internal/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	cfg := config.LoadEnv()
	user := &database.User{
		ConnectionURI: cfg.ConnectionURI,
		Passwd:        cfg.Psswd,
	}
	slog.Info("Got the basic user info", slog.String("User URI", user.ConnectionURI), slog.String("User Psswd", user.Passwd))
	database, err := database.ConnectWithMongoDb(user)
	if err != nil {

	}
	handler := &handlers.Handler{
		Database: database,
	}
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowCredentials: true,
		AllowHeaders:     []string{"Content-Type", "Authorization", "Origin"},
	}))

	authorized := router.Group("/auth")
	authorized.Use(middleware.VerifyUser(handler))
	routes.UserRouter(handler, router, authorized)
	routes.CategoryRouter(handler, authorized)
	routes.BillRouter(handler, authorized)
	quit := make(chan int)
	go (func() {
		router.Run(fmt.Sprintf("localhost:%v", cfg.Port))
		quit <- 1
	})()

	log.Println("The server has started on:", cfg.Port)
	<-quit
}
