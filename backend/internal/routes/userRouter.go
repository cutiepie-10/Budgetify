package router

import (
	"budgify.com/backend/internal/handlers"
	"github.com/gin-gonic/gin"
)

func UserRouter(handler *handlers.Handler, router *gin.Engine) {
	router.POST("/user/register/", handler.HandleRegisteration)
	router.POST("user/login", handler.HandleLogin)
}
