package handlers

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"time"

	"budgify.com/backend/internal/models"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func (handler *Handler) HandleAddCategory(ctx *gin.Context) {
	c, cancelFunc := context.WithTimeout(context.TODO(), time.Second*5)
	defer cancelFunc()
	categoryColl := handler.Database.Collection("category")
	var newCategory models.Category
	if err := ctx.ShouldBindWith(&newCategory, binding.JSON); err != nil {
		slog.Error("error binding the request body", slog.String("error", err.Error()))
		ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
			"status": "could not bind the request body",
			"error":  err.Error(),
		})
		return
	}
	res, err := categoryColl.CountDocuments(c, bson.D{{"name", *newCategory.Name}})
	if err != nil {
		if res != 0 {
			slog.Error("already in the database")
			ctx.IndentedJSON(http.StatusFound, gin.H{
				"status": "found this name in the collection",
				"name":   *&newCategory.Name,
			})
			return
		}
		slog.Error("could not connect with database", slog.String("error", err.Error()))
		ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
			"status": "error while validation of category",
			"error":  err.Error(),
		})
		return
	}
	newCategory.ID = primitive.NewObjectID()
	newCategory.CategoryID = newCategory.ID.Hex()
	newCategory.CreatedAt, _ = time.Parse(time.RFC822, time.Now().Format(time.RFC822))
	newCategory.UpdatedAt, _ = time.Parse(time.RFC822, time.Now().Format(time.RFC822))
	result, err := categoryColl.InsertOne(c, newCategory)
	if err != nil {
		slog.Error("error inserting the new category", slog.String("error", err.Error()))
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{
			"status": "insertion error",
			"error":  err.Error(),
		})
		return
	}
	if result.InsertedID != newCategory.ID {
		slog.Error("error inserting the new category the id of the result and category id mismatched", slog.String("error", err.Error()))
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{
			"status": "insertion error",
		})
		return
	}
	slog.Info("successfully added category", slog.String("category", *newCategory.Name))
	ctx.IndentedJSON(http.StatusAccepted, gin.H{
		"status":      "accepted",
		"category_id": newCategory.CategoryID,
	})
}
func (handler *Handler) HandleUpdateCategory(ctx *gin.Context) {
	c, cancelFunc := context.WithTimeout(context.TODO(), time.Second*5)
	defer cancelFunc()
	categoryColl := handler.Database.Collection("category")
	var given models.Category
	if err := ctx.ShouldBindWith(&given, binding.JSON); err != nil {
		slog.Error("error binding the request body", slog.String("error", err.Error()))
		ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
			"status": "could not bind the request body",
			"error":  err.Error(),
		})
		return
	}
	given.UpdatedAt, _ = time.Parse(time.RFC822, time.Now().Format(time.RFC822))
	id, _ := primitive.ObjectIDFromHex(given.CategoryID)
	filter := bson.D{{"_id", id}}
	update := bson.D{{"$set", bson.D{{"name", given.Name}, {"alloted", given.Alloted}, {"spent", given.Spent}, {"bills", given.Bills}, {"updated_at", given.UpdatedAt}}}}
	res, err := categoryColl.UpdateOne(c, filter, update)
	if err != nil {
		slog.Error(fmt.Sprintf("error updating the category %v", *given.Name), slog.String("error:", err.Error()))
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{
			"status": "updation error",
			"error":  err.Error(),
		})
		return
	}
	slog.Info("Modified Documents", slog.Int64("count:", res.MatchedCount))
	if res.ModifiedCount != 1 {
		slog.Error("error updating the category")
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{
			"status": "update error",
			"error":  "could not update only 1 document",
		})
		return
	}
	slog.Info("updated the category successfully", slog.String("catgeory", given.CategoryID))
	ctx.IndentedJSON(http.StatusAccepted, gin.H{
		"status": "updated successfully",
	})
}
func (handler *Handler) HandleDeleteCategory(ctx *gin.Context) {

}
func (handler *Handler) GetAllCategories(ctx *gin.Context) {
	c, cancelFunc := context.WithTimeout(context.TODO(), time.Second*5)
	defer cancelFunc()
	categoryColl := handler.Database.Collection("category")
	opts := options.Find().SetSort(bson.D{{"updated_at", -1}})
	res, err := categoryColl.Find(c, bson.D{{}}, opts)
	if err != nil {
		slog.Error("could not get all the category", slog.String("error:", err.Error()))
		ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	var cat []models.Category
	if err = res.All(context.TODO(), &cat); err != nil {
		slog.Error("error in getting the categories", slog.String("error:", err.Error()))
		ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
			"status": "could not get the categories",
			"error":  err.Error(),
		})
		return
	}
	ctx.IndentedJSON(http.StatusOK, cat)
}
func (handler *Handler) GetCategoryById(ctx *gin.Context) {

}
