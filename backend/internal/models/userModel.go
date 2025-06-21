package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID           primitive.ObjectID `bson:"_id, omitempty" json:"uid"`
	FirstName    *string            `validate:"alpha,required" bson:"first_name" json:"first_name"`
	LastName     *string            `validate:"alpha" bson:"last_name" json:"last_name"`
	Phone        *string            `validate:"required" bson:"phone" json:"phone"`
	Email        *string            `validate:"email,required" bson:"email" json:"email"`
	Password     *string            `validate:"required" bson:"password" json:"password"`
	Token        *string            `bson:"token" json:"token"`
	RefreshToken *string            `bson:"refresh_token" json:"refresh_token"`
	CreatedAt    time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt    time.Time          `bson:"updated_at" json:"updated_at"`
}
