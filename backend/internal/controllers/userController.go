package controllers

import (
	"budgify.com/backend/internal/handlers"
	"budgify.com/backend/internal/models"
)

func AddNewUser(handler *handlers.Handler, user models.User) error {
	userCollection := handler.Client.Database("budgetify")
}
