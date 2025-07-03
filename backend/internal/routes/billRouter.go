package router

import (
	"budgify.com/backend/internal/handlers"
	"github.com/gin-gonic/gin"
)

func BillRouter(handler *handlers.Handler, router *gin.RouterGroup) {
	router.GET("bill/:id", handler.GetBillsByParentId)
	router.GET("bill", handler.GetAllBills)
	router.POST("bill/", handler.HandleAddBill)
	router.PUT("bill/:id", handler.HandleUpdateBill)
	router.DELETE("bill/:id", handler.HandleDeleteBill)
}
