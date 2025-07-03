package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Category struct {
	ID         primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	CategoryID string             `bson:"category_id" json:"category_id"`
	Name       *string            `bson:"name" json:"name" validate:"alphanum, required"`
	Alloted    *float64           `bson:"alloted" json:"alloted" validate:"numeric,required"`
	Spent      *float64           `bson:"spent" json:"spent" validate:"numeric,required,gte=0"`
	Bills      []string           `bson:"bills" json:"bills" validate:"required"`
	CreatedAt  time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt  time.Time          `bson:"updated_at" json:"updated_at"`
}
