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

func (handler *Handler) GetAllBills(ctx *gin.Context) {
	c, cancelFunc := context.WithTimeout(context.TODO(), 5*time.Second)
	defer cancelFunc()
	billColl := handler.Database.Collection("bills")
	var bills []models.Bill
	sort := bson.D{{"updated_at", -1}}
	opts := options.Find().SetSort(sort)
	res, err := billColl.Find(c, bson.D{}, opts)
	if err != nil {
		slog.Error("error while getting all the bills", slog.String("error:", err.Error()))
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{
			"status": "could not match the given id",
			"error":  err.Error(),
		})
		return
	}
	if err = res.All(context.TODO(), &bills); err != nil {
		slog.Error("error while binding the bills", slog.String("error:", err.Error()))
		ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
			"status": "error while binding the bills",
			"error":  err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, bills)
}
func (handler *Handler) GetBillsByParentId(ctx *gin.Context) {
	c, cancelFunc := context.WithTimeout(context.TODO(), 5*time.Second)
	defer cancelFunc()
	billColl := handler.Database.Collection("bills")
	var bills []models.Bill
	parentId := ctx.Param("id")
	filter := bson.D{{"category_id", parentId}}
	sort := bson.D{{"updated_at", -1}}
	opts := options.Find().SetSort(sort)
	res, err := billColl.Find(c, filter, opts)
	if err != nil {
		slog.Error("could not get a match with the parentId", slog.String("error:", err.Error()))
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{
			"status": "could not match the given id",
			"error":  err.Error(),
		})
		return
	}
	if err = res.All(context.TODO(), &bills); err != nil {
		slog.Error(fmt.Sprintf("error while binding the bills of the category:%v", parentId), slog.String("error:", err.Error()))
		ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
			"status": "error while binding the bills",
			"error":  err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, bills)
}
func (handler *Handler) HandleAddBill(ctx *gin.Context) {
	c, cancelFunc := context.WithTimeout(context.TODO(), time.Second*5)
	defer cancelFunc()
	billColl := handler.Database.Collection("bills")
	var newBill models.Bill
	if err := ctx.ShouldBindWith(&newBill, binding.JSON); err != nil {
		slog.Error("error binding the request body", slog.String("error", err.Error()))
		ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
			"status": "could not bind the request body",
			"error":  err.Error(),
		})
		return
	}
	res, err := billColl.CountDocuments(c, bson.D{{"name", newBill.Name}})
	if res != 0 {
		if err != nil {
			slog.Error("could not connect with database", slog.String("error", err.Error()))
			ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
				"status": "error while validation of category",
				"error":  err.Error(),
			})
			return
		}

		slog.Error("already in the database")
		ctx.IndentedJSON(http.StatusFound, gin.H{
			"status": "found this name in the collection",
			"name":   newBill.Name,
		})
		return
	}
	newBill.ID = primitive.NewObjectID()
	newBill.BillID = newBill.ID.Hex()
	newBill.CreatedAt, _ = time.Parse(time.RFC822, time.Now().Format(time.RFC822))
	newBill.UpdatedAt, _ = time.Parse(time.RFC822, time.Now().Format(time.RFC822))
	result, err := billColl.InsertOne(c, newBill)
	if err != nil {
		slog.Error("error inserting a new bill", slog.String("error", err.Error()))
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{
			"status": "insertion error",
			"error":  err.Error(),
		})
		return
	}
	if result.InsertedID != newBill.ID {
		slog.Error("error inserting the new category the id of the result and category id mismatched", slog.String("error", err.Error()))
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{
			"status": "insertion error",
		})
		return
	}
	slog.Info("successfully added category", slog.String("category", *newBill.Name))
	ctx.IndentedJSON(http.StatusAccepted, gin.H{
		"status":  "accepted",
		"bill_id": newBill.BillID,
	})
}
func (handler *Handler) HandleDeleteBill(ctx *gin.Context) {

}
func (handler *Handler) HandleUpdateBill(ctx *gin.Context) {
	c, cancelFunc := context.WithTimeout(context.TODO(), time.Second*5)
	defer cancelFunc()
	billColl := handler.Database.Collection("bills")
	var given models.Bill
	if err := ctx.ShouldBindWith(&given, binding.JSON); err != nil {
		slog.Error("error binding the request body", slog.String("error", err.Error()))
		ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
			"status": "could not bind the request body",
			"error":  err.Error(),
		})
		return
	}
	given.UpdatedAt, _ = time.Parse(time.RFC822, time.Now().Format(time.RFC822))
	id, _ := primitive.ObjectIDFromHex(given.BillID)
	filter := bson.D{{"_id", id}}
	update := bson.D{{"$set", bson.D{{"name", given.Name}, {"amount", given.Amount}, {"category_id", given.CategoryID}, {"updated_at", given.UpdatedAt}}}}
	res, err := billColl.UpdateOne(c, filter, update)
	if err != nil {
		slog.Error(fmt.Sprintf("error updating the category %v", *given.Name), slog.String("error:", err.Error()))
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{
			"status": "updation error",
			"error":  err.Error(),
		})
		return
	}
	slog.Info("Modified Documents", slog.Int64("count:", res.ModifiedCount))
	if res.ModifiedCount != 1 {
		slog.Error("error updating the category")
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{
			"status": "update error",
			"error":  "could not update only 1 document",
		})
		return
	}
	slog.Info("updated the bill successfully", slog.String("bill", given.BillID))
	ctx.IndentedJSON(http.StatusAccepted, gin.H{
		"status": "updated successfully",
	})
}
