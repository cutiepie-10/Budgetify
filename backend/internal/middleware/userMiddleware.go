package middleware

import (
	"context"
	"log/slog"
	"net/http"
	"strings"

	"budgify.com/backend/internal/handlers"
	"budgify.com/backend/internal/helpers"
	"budgify.com/backend/internal/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

type header struct {
	token string `header:"Authorization"`
}

func VerifyUser(handler *handlers.Handler) func(*gin.Context) {
	return func(ctx *gin.Context) {
		var authHeader header
		token := ctx.GetHeader("Authorization")
		token = strings.ReplaceAll(token, "Bearer ", "")
		if err := ctx.ShouldBindHeader(&authHeader); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"status":  "interval server error",
				"message": "could not bind authorization header",
			})
			ctx.Abort()
			return
		}
		slog.Info("given authorization token", slog.String("token:", token))
		claims, err := helpers.ValidateToken(token)
		if err != nil {
			slog.Error("error getting claims", err.Error())
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"status": "error getting claims",
				"error":  err.Error(),
			})
			ctx.Abort()
			return
		}
		userCollection := handler.Database.Collection("user")
		var result models.User
		if err = userCollection.FindOne(context.TODO(), bson.D{{"email", claims.Email}}).Decode(&result); err != nil {
			slog.Error("could not find the email", slog.String("error:", err.Error()))
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"status": "error",
				"error":  err.Error(),
			})
			ctx.Abort()
			return
		}
		ctx.JSON(http.StatusAccepted, gin.H{
			"status": "user is found",
		})
		ctx.Next()
	}
}
