package database

import (
	"context"
	"log"
	"log/slog"
	"strings"
	"time"

	"budgify.com/backend/internal/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type User struct {
	ConnectionURI string
	Passwd        string
}

func ConnectWithMongoDb(user *User) (*mongo.Client, error) {
	tlsConfig, err := config.GetTLSConfig()
	if err != nil || tlsConfig == nil {
		slog.Error("could not get tls config for the mongoDB server", slog.String("error:", err.Error()))
	}
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	log.Println(strings.Replace(user.ConnectionURI, "<db_password>", user.Passwd, 1))
	opts := options.Client().ApplyURI(strings.Replace(user.ConnectionURI, "<db_password>", user.Passwd, 1)).
		SetServerAPIOptions(serverAPI).SetTLSConfig(tlsConfig).SetTimeout(5 * time.Second)
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		log.Panicln(err)
	}
	var result bson.M
	if err := client.Database("admin").RunCommand(context.TODO(), bson.D{{"ping", "1"}}).Decode(&result); err != nil {
		log.Panicln("Could not connect with mongoDB server", err)
		return nil, err
	}
	log.Println("Pinged your deployment. You are successfully connected to MongDB!", result)
	return client, nil
}
