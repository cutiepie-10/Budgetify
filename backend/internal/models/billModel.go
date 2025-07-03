package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Bill struct {
	ID         primitive.ObjectID `bson:"_id,omitempty" json:"_id" `
	BillID     string             `bson:"bill_id,omitempty" json:"bill_id"`
	Name       *string            `bson:"name" json:"name" validate:"required,aplha"`
	CreatedAt  time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt  time.Time          `bson:"updated_at" json:"updated_at"`
	CategoryID *string            `bson:"category_id" json:"parent_id" validate:"required"`
	Amount     *float64           `bson:"amount" json:"amount" validate:"numeric,required"`
	In         bool               `bson:"in" json:"in" validate:"boolean,required"`
}
