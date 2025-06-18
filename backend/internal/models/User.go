package models

import "time"

type User struct {
	FirstName string    `validate:"alpha,required" bson:"first_name" json:"first_name"`
	LastName  string    `validate:"alpha" bson:"last_name" json:"last_name"`
	Email     string    `validate:"email,required" bson:"email" json:"email"`
	Password  string    `validate:"required" bson:"password" json:"password"`
	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}
