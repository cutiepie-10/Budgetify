package handlers

import (
	"go.mongodb.org/mongo-driver/mongo"
)

type Handler struct {
	Database *mongo.Database
}
