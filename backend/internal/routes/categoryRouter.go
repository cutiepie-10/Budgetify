package router

import (
	"budgify.com/backend/internal/handlers"
	"github.com/gin-gonic/gin"
)

func CategoryRouter(handler *handlers.Handler, router *gin.RouterGroup) {
	router.POST("category/add", handler.HandleAddCategory)
	router.GET("category/:id", handler.GetCategoryById)
	router.GET("category/", handler.GetAllCategories)
	router.DELETE("category/:id", handler.HandleDeleteCategory)
	router.PUT("category/", handler.HandleUpdateCategory)
}
