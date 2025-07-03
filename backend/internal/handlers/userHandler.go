package handlers

import (
	"context"
	"log/slog"
	"net/http"
	"time"

	"budgify.com/backend/internal/helpers"
	"budgify.com/backend/internal/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (handler *Handler) HandleRegisteration(ctx *gin.Context) {
	userCollection := handler.Database.Collection("user")
	var user models.User
	user.CreatedAt, _ = time.Parse(time.RFC822, time.Now().Format(time.RFC822))
	user.UpdatedAt, _ = time.Parse(time.RFC822, time.Now().Format(time.RFC822))
	if err := ctx.ShouldBindJSON(&user); err != nil {
		slog.Error("could not bind json properly", slog.String("error:", err.Error()))
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	count, err := userCollection.CountDocuments(context.TODO(), bson.D{{"email", user.Email}})
	if count != 0 {
		slog.Error("user is not unique", slog.String("user email", *user.Email))
		ctx.JSON(http.StatusConflict, gin.H{
			"status": "already registered with this email",
			"email":  *user.Email,
		})
		return
	}
	psswd, err := helpers.HashPassword(*user.Password)
	if err != nil {
		slog.Error("could not hash password", slog.String("error", err.Error()))
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error:could not hash password:": err.Error()})
		return
	}
	user.Password = &psswd

	user.ID = primitive.NewObjectID()
	user.UserID = user.ID.Hex()

	token, refresh_token, err := helpers.GenerateToken(user.FirstName, user.LastName, user.Email, user.UserID)
	user.Token, user.RefreshToken = &token, &refresh_token
	if err != nil {
		slog.Error("could not generate the tokens", slog.String("error:", err.Error()))
		ctx.IndentedJSON(http.StatusInternalServerError, gin.H{"status": "internal server error"})
		return
	}
	res, inserterr := userCollection.InsertOne(context.TODO(), user)
	if inserterr != nil {
		slog.Error("error while inserting new user", slog.String("error", inserterr.Error()))
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": "insertion error",
			"error":  inserterr.Error(),
		})
		return
	}
	if res.InsertedID != user.ID {
		slog.Error("result of the inserted id and user id mismatched")
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": "insertion error",
		})
		return
	}
	ctx.IndentedJSON(http.StatusAccepted,
		gin.H{"status": "registered",
			"token":         token,
			"refresh_token": refresh_token})
	slog.Info("new user added,", slog.Any("added user:", user))
}
func (handler *Handler) HandleLogin(ctx *gin.Context) {
	var given models.User
	if err := ctx.ShouldBindJSON(&given); err != nil {
		slog.Error("could not bind json properly", slog.String("error:", err.Error()))
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c, cancelFunc := context.WithTimeout(context.TODO(), 5*time.Second)
	userCollection := handler.Database.Collection("user")
	defer cancelFunc()
	var found models.User
	res := userCollection.FindOne(c, bson.D{{"email", *given.Email}})
	if res.Err() != nil {
		slog.Error("could not find the user", slog.String("error", res.Err().Error()))
		ctx.IndentedJSON(http.StatusNotFound, gin.H{
			"status": "user not found",
			"error":  res.Err(),
		})
		return
	}
	err := res.Decode(&found)
	if err != nil {
		slog.Error("error while binding during login request", slog.String("error", err.Error()))
		ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
			"error":  err.Error(),
			"status": "internal server error",
		})
		return
	}
	err = helpers.VerifyPassword(*found.Password, *given.Password)
	if err != nil {
		slog.Info("password did not match", slog.String("error", err.Error()))
		ctx.IndentedJSON(http.StatusNotAcceptable, gin.H{
			"error":  "wrong password",
			"status": "declined",
		})
		return
	}
	token, refresh_token, _ := helpers.GenerateToken(found.FirstName, found.LastName, found.Email, found.UserID)
	filter := bson.D{{"_id", found.ID}}
	found.UpdatedAt, _ = time.Parse(time.RFC822, time.Now().Format(time.RFC822))
	update := bson.D{{"$set", bson.D{{"token", token}, {"refresh_token", refresh_token}, {"updated_at", found.UpdatedAt}}}}
	_, err = userCollection.UpdateOne(c, filter, update)
	if err != nil {
		slog.Error("error updating the user", slog.String("error:", err.Error()))
		ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	ctx.IndentedJSON(http.StatusAccepted, gin.H{
		"status":        "accepted",
		"token":         token,
		"refresh_token": refresh_token,
		"first_name":    *found.FirstName,
		"last_name":     *found.LastName,
	})
}
func (handler *Handler) HandleUpdateUser(ctx *gin.Context) {

}
func (handler *Handler) HandleDeleteUser(ctx *gin.Context) {

}
func (handler *Handler) GetUserById(ctx *gin.Context) {

}
