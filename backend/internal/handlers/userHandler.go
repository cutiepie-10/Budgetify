package handlers

import (
	"log/slog"
	"net/http"
	"time"

	"budgify.com/backend/internal/helpers"
	"budgify.com/backend/internal/models"
	"github.com/gin-gonic/gin"
)

func (handler *Handler) HandleRegisteration(ctx *gin.Context) {
	var user models.User
	user.CreatedAt, _ = time.Parse(time.RFC822, time.Now().Format(time.RFC822))
	user.UpdatedAt, _ = time.Parse(time.RFC822, time.Now().Format(time.RFC822))
	if err := ctx.ShouldBindJSON(&user); err != nil {
		slog.Error("could not bind json properly", slog.String("error:", err.Error()))
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	psswd, err := helpers.HashPassword(*user.Password)
	if err != nil {
		slog.Error("could not hash password", slog.String("error", err.Error()))
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error:could not hash password:": err.Error()})
		return
	}
	user.Password = &psswd
	token, refresh_token, err := helpers.GenerateToken(user.FirstName, user.LastName, user.Email)
	user.Token, user.RefreshToken = &token, &refresh_token
	if err != nil {
		slog.Error("could not generate the tokens", slog.String("error:", err.Error()))
		ctx.IndentedJSON(http.StatusInternalServerError, gin.H{"status": "internal server error"})
		return
	}
	ctx.IndentedJSON(http.StatusAccepted,
		gin.H{"status": "registered",
			"token":         token,
			"refresh_token": refresh_token})
	slog.Info("new user added,", slog.Any("added user:", user))
}
func (handler *Handler) HandleLogin(ctx *gin.Context) {
	var user models.User
	if err := ctx.ShouldBindJSON(&user); err != nil {
		slog.Error("could not bind json properly", slog.String("error:", err.Error()))
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
}
