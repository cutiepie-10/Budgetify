package helpers

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/x509"
	"encoding/pem"
	"log/slog"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type SignedClaims struct {
	First_Name string
	Last_Name  string
	Email      string
	jwt.RegisteredClaims
}

func HashPassword(pass string) (string, error) {
	psswd, err := bcrypt.GenerateFromPassword([]byte(pass), 10)
	if err != nil {
		slog.Error("could not generate password")
		return "", err
	}
	return string(psswd), nil
}

func GenerateToken(first_name *string, last_name *string,
	email *string) (string, string, error) {
	key := os.Getenv("SECRET_KEY")
	if key == "" {
		ok := generateSecretKey()
		if !ok {
			slog.Error("could not generate secret key")
		}
		key = os.Getenv("SECRET_KEY")
		slog.Info("key", slog.String("key:", key))
	}
	var secret_key *ecdsa.PrivateKey
	secret_Pem, _ := pem.Decode([]byte(key))
	secret_key, _ = x509.ParseECPrivateKey(secret_Pem.Bytes)
	slog.Info("fetched secret_key", slog.Any("secret key:", secret_key))
	token, err := jwt.NewWithClaims(jwt.SigningMethodES256, SignedClaims{
		First_Name: *first_name,
		Last_Name:  *last_name,
		Email:      *email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * time.Duration(24))),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}).SignedString(secret_key)
	if err != nil {
		slog.Error("could generate the token", slog.String("error:", err.Error()))
		return "", "", err
	}
	refresh_token, err := jwt.NewWithClaims(jwt.SigningMethodES256, SignedClaims{
		First_Name: *first_name,
		Last_Name:  *last_name,
		Email:      *email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * time.Duration(24))),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}).SignedString(secret_key)
	if err != nil {
		slog.Error("could generate the refresh token", slog.String("error:", err.Error()))
		return "", "", err
	}
	return token, refresh_token, nil
}
func generateSecretKey() (ok bool) {
	key, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	if err != nil {
		slog.Error("could not create a secret key", slog.String("error:", err.Error()))
		return false
	}
	slog.Info("generated key", slog.Any("key:", key))
	keyBytes, _ := x509.MarshalECPrivateKey(key)
	keyPem := pem.EncodeToMemory(&pem.Block{Bytes: keyBytes, Type: "ECDSA Private Key"})
	os.Setenv("SECRET_KEY", string(keyPem))
	return true
}
