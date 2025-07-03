package router

import (
	"budgify.com/backend/internal/handlers"
	"github.com/gin-gonic/gin"
)

func UserRouter(handler *handlers.Handler, router *gin.Engine, auth *gin.RouterGroup) {
	router.POST("/user/register/", handler.HandleRegisteration)
	router.POST("user/login/", handler.HandleLogin)
	auth.GET("user/profile/:id", handler.GetUserById)
	auth.PUT("user/profile/:id", handler.HandleUpdateUser)
	auth.DELETE("user/:id", handler.HandleDeleteUser)
}
