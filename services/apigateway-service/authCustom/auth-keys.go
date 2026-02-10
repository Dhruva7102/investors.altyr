package authCustom

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
	"errors"
	"fmt"
	"os"

	"github.com/luraproject/lura/v2/logging"
	"gopkg.in/square/go-jose.v2"
)

// LoadKeys convert byte array to JSONWebKey
func LoadKeys(PrivateKey string, PublicKey string, logger logging.Logger) (interface{}, interface{}, error) {
	var privateKey, publicKey []byte
	bitSize := 1024

	// check private key files
	if _, err := os.Stat(PrivateKey); os.IsNotExist(err) {
		logger.Debug(LogPrefix, "Generating key files")
		//generate private kwy file
		privateKey, publicKey, err = generateKey(bitSize)
		if err != nil {
			return nil, nil, errors.New("Generating key file : " + err.Error())
		}

		_ = writeKeyToFile(privateKey, PrivateKey, logger)
		_ = writeKeyToFile(publicKey, PublicKey, logger)
	} else {
		// get private key from file
		privateKey, err = os.ReadFile(PrivateKey)
		if err != nil {
			return nil, nil, errors.New("Reading key file : " + err.Error())
		}

		// check public key files
		if _, err := os.Stat(PublicKey); os.IsNotExist(err) {
			// generate public key from private key
			publicKey, err = generatePublicKey(privateKey)
			if err != nil {
				return nil, nil, errors.New("Generating pub key file : " + err.Error())
			}
			_ = writeKeyToFile(publicKey, PublicKey, logger)
		} else {
			// get public key from file
			publicKey, err = os.ReadFile(PublicKey)
			if err != nil {
				return nil, nil, errors.New("Reading pub file : " + err.Error())
			}
		}
	}

	//convert private pem to jwk
	jwkPrvKey, err := loadPrivateKey(privateKey)
	if err != nil {
		return nil, nil, errors.New("JWK generation : " + err.Error())
	}
	//convert public pem to jwk
	jwkPubKey, err := loadPublicKey(publicKey)
	if err != nil {
		return nil, nil, errors.New("JWK pub generation : " + err.Error())
	}
	return jwkPrvKey, jwkPubKey, nil
}

// loadJSONWebKey convert byte array to JSONWebKey
func loadJSONWebKey(json []byte, pub bool) (*jose.JSONWebKey, error) {
	var jwk jose.JSONWebKey
	err := jwk.UnmarshalJSON(json)
	if err != nil {
		return nil, err
	}
	if !jwk.Valid() {
		return nil, errors.New("invalid JWK key")
	}
	if jwk.IsPublic() != pub {
		return nil, errors.New("priv/pub JWK key mismatch")
	}
	return &jwk, nil
}

// loadPublicKey loads a public key from PEM/DER/JWK-encoded data.
func loadPublicKey(data []byte) (interface{}, error) {
	input := data

	block, _ := pem.Decode(data)
	if block != nil {
		input = block.Bytes
	}

	// Try to load SubjectPublicKeyInfo
	pub, err0 := x509.ParsePKIXPublicKey(input)
	if err0 == nil {
		return pub, nil
	}

	cert, err1 := x509.ParseCertificate(input)
	if err1 == nil {
		return cert.PublicKey, nil
	}

	jwk, err2 := loadJSONWebKey(data, true)
	if err2 == nil {
		return jwk, nil
	}

	return nil, fmt.Errorf("square/go-jose: parse error, got '%s', '%s' and '%s'", err0, err1, err2)
}

// loadPrivateKey loads a private key from PEM/DER/JWK-encoded data.
func loadPrivateKey(data []byte) (interface{}, error) {
	input := data

	block, _ := pem.Decode(data)
	if block != nil {
		input = block.Bytes
	}

	var priv interface{}
	priv, err0 := x509.ParsePKCS1PrivateKey(input)
	if err0 == nil {
		return priv, nil
	}

	priv, err1 := x509.ParsePKCS8PrivateKey(input)
	if err1 == nil {
		return priv, nil
	}

	priv, err2 := x509.ParseECPrivateKey(input)
	if err2 == nil {
		return priv, nil
	}

	jwk, err3 := loadJSONWebKey(input, false)
	if err3 == nil {
		return jwk, nil
	}

	return nil, fmt.Errorf("square/go-jose: parse error, got '%s', '%s', '%s' and '%s'", err0, err1, err2, err3)
}

// generateKey creates a RSA Private Key and public key of specified byte size
func generateKey(bitSize int) ([]byte, []byte, error) {
	// Private Key generation
	privateKey, err := rsa.GenerateKey(rand.Reader, bitSize)
	if err != nil {
		return nil, nil, err
	}

	// Validate Private Key
	err = privateKey.Validate()
	if err != nil {
		return nil, nil, err
	}

	// Get ASN.1 DER format
	privDER := x509.MarshalPKCS1PrivateKey(privateKey)

	// pem.Block
	privBlock := pem.Block{
		Type:    "RSA PRIVATE KEY",
		Headers: nil,
		Bytes:   privDER,
	}
	// Private key in PEM format
	privatePEM := pem.EncodeToMemory(&privBlock)

	//Get ASN.1 DER format
	pubDER, err := x509.MarshalPKIXPublicKey(&privateKey.PublicKey)
	if err != nil {
		return nil, nil, err
	}

	//generate public key
	var pubBlock = pem.Block{
		Type:  "PUBLIC KEY",
		Bytes: pubDER,
	}

	// Private key in PEM format
	publicPEM := pem.EncodeToMemory(&pubBlock)

	return privatePEM, publicPEM, nil
}

// generatePublicKey take a rsa.PublicKey and return bytes suitable for writing to .pub file
func generatePublicKey(privatePEM []byte) ([]byte, error) {
	privBlock, _ := pem.Decode(privatePEM)
	privateKey, err0 := x509.ParsePKCS1PrivateKey(privBlock.Bytes)
	if err0 != nil {
		return nil, err0
	}

	//Get ASN.1 DER format
	pubDER, err := x509.MarshalPKIXPublicKey(&privateKey.PublicKey)
	if err != nil {
		return nil, err
	}

	//generate public key
	var pubBlock = pem.Block{
		Type:  "PUBLIC KEY",
		Bytes: pubDER,
	}

	// Private key in PEM format
	publicPEM := pem.EncodeToMemory(&pubBlock)

	return publicPEM, nil
}

// writePemToFile writes keys to a file
func writeKeyToFile(keyBytes []byte, saveFileTo string, logger logging.Logger) error {
	err := os.WriteFile(saveFileTo, keyBytes, 0600)
	if err != nil {
		logger.Error(LogPrefix, "Writing key file : ", saveFileTo, err)
		return err
	}

	logger.Debug(LogPrefix, "Key saved to: ", saveFileTo)
	return nil
}
