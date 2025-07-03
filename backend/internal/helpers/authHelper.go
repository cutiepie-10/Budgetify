package helpers

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/x509"
	"encoding/pem"
	"fmt"
	"log/slog"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type SignedClaims struct {
	First_Name string `json:"first_name" validate:"required ,alpha"`
	Last_Name  string `json:"last_name" validate:"required ,alpha"`
	Email      string `json:"email" validate:"required ,email"`
	UserID     string `json:"user_id" validate:"required,mongodb"`
	jwt.RegisteredClaims
}
type ErrParsingClaims string

func (e ErrParsingClaims) Error() string {
	return fmt.Sprintf(string(e))
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
	email *string, uId string) (string, string, error) {
	secret_key, err := getSecretKey()
	if err != nil {
		slog.Error("error while fetching the secret_key", slog.String("error", err.Error()))
		return "", "", err
	}
	token, err := jwt.NewWithClaims(jwt.SigningMethodES256, SignedClaims{
		First_Name: *first_name,
		Last_Name:  *last_name,
		Email:      *email,
		UserID:     uId,
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
		UserID:     uId,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * time.Duration(96))),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}).SignedString(secret_key)
	if err != nil {
		slog.Error("could generate the refresh token", slog.String("error:", err.Error()))
		return "", "", err
	}
	return token, refresh_token, nil
}
func getSecretKey() (secretKey *ecdsa.PrivateKey, err error) {
	key := os.Getenv("SECRET_KEY")
	if key == "" {
		ok := generateSecretKey()
		if !ok {
			slog.Error("could not generate secret key")
			return nil, err
		}
		key = os.Getenv("SECRET_KEY")
	}
	secretPem, _ := pem.Decode([]byte(key))
	secretKey, err = x509.ParseECPrivateKey(secretPem.Bytes)
	if err != nil {
		slog.Error("could not parse the key", slog.String("error:", err.Error()))
		return nil, err
	}
	return secretKey, nil
}
func getPublicKey() (*ecdsa.PublicKey, error) {
	secretKey, err := getSecretKey()
	if err != nil {
		return nil, err
	}
	return &secretKey.PublicKey, err
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
func VerifyPassword(hashedPassword string, password string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		return err
	}
	return nil
}
func ValidateToken(token string) (SignedClaims, error) {
	claims, err := getClaims(token)
	if err != nil {
		slog.Error("could not get claims", slog.String("error:", err.Error()))
		return claims, err
	}
	return claims, err
}
func getClaims(token string) (SignedClaims, error) {
	tokenString, err := jwt.ParseWithClaims(token, &SignedClaims{}, func(token *jwt.Token) (interface{}, error) {
		return getPublicKey()
	})
	if err != nil {
		slog.Error("error parsing the token", slog.String("error:", err.Error()))
		return SignedClaims{}, err
	} else if claims, ok := tokenString.Claims.(*SignedClaims); ok {
		return *claims, nil
	} else {
		slog.Error("error getting claims from the token provided")
		var err ErrParsingClaims = "error parsing the claims"
		return SignedClaims{}, err
	}
}
