#!/usr/bin/env bash
SCRIPT_ROOT=$(cd $(dirname $0); pwd)
cd $SCRIPT_ROOT/..

rm -rf debug
mkdir debug

# Generate key for RSA algorithms

for alg in 256-2048 384-3072 512-4096; do

    IFS='-' read digest_length rsa_key_size <<< "$alg"

    echo "Generating RSA key pair for RS${digest_length} with key size ${rsa_key_size} bits..."

    for key_tag in ok err; do

        # Generate the private key in PEM format, using PKCS#1 standard
        openssl genrsa -traditional -out debug/${key_tag}-RS${digest_length}.p1.pem ${rsa_key_size}
        
        # Extract the public key from the private key, in PEM format
        openssl rsa -in debug/${key_tag}-RS${digest_length}.p1.pem -pubout -out debug/${key_tag}-RS${digest_length}.pub.pem

        # Extract the public key from the private key, in DER format
        openssl rsa -in debug/${key_tag}-RS${digest_length}.p1.pem -pubout -out debug/${key_tag}-RS${digest_length}.pub.der -outform DER
        
        # Convert the private key to DER format
        openssl rsa -in debug/${key_tag}-RS${digest_length}.p1.pem -outform DER -out debug/${key_tag}-RS${digest_length}.p1.der
        
        # Convert the private key to PKCS#8 format in PEM
        openssl pkcs8 -topk8 -inform PEM -outform PEM -in debug/${key_tag}-RS${digest_length}.p1.pem -out debug/${key_tag}-RS${digest_length}.p8.pem -nocrypt
        
        # Convert the private key to PKCS#8 format in DER
        openssl pkcs8 -topk8 -inform PEM -outform DER -in debug/${key_tag}-RS${digest_length}.p1.pem -out debug/${key_tag}-RS${digest_length}.p8.der -nocrypt

    done
done

# Generate key for ECDSA algorithms
for curve in 256-prime256v1 256K-secp256k1 384-secp384r1 512-secp521r1; do

    IFS='-' read digest_length curve_name <<< "$curve"

    echo "Generating EC key pair for ES${digest_length} with curve ${curve_name}..."
    
    for key_tag in ok err; do

        # Generate the private key in PEM format
        openssl ecparam -name ${curve_name} -genkey -noout -out debug/${key_tag}-ES${digest_length}.p1.pem
        
        # Extract the public key from the private key, in PEM format
        openssl ec -in debug/${key_tag}-ES${digest_length}.p1.pem -pubout -out debug/${key_tag}-ES${digest_length}.pub.pem

        # Extract the public key from the private key, in DER format
        openssl ec -in debug/${key_tag}-ES${digest_length}.p1.pem -pubout -out debug/${key_tag}-ES${digest_length}.pub.der -outform DER
        
        # Convert the private key to DER format
        openssl ec -in debug/${key_tag}-ES${digest_length}.p1.pem -outform DER -out debug/${key_tag}-ES${digest_length}.p1.der
        
        # Convert the private key to PKCS#8 format in PEM
        openssl pkcs8 -topk8 -inform PEM -outform PEM -in debug/${key_tag}-ES${digest_length}.p1.pem -out debug/${key_tag}-ES${digest_length}.p8.pem -nocrypt
        
        # Convert the private key to PKCS#8 format in DER
        openssl pkcs8 -topk8 -inform PEM -outform DER -in debug/${key_tag}-ES${digest_length}.p1.pem -out debug/${key_tag}-ES${digest_length}.p8.der -nocrypt

    done
done

for curve in ed25519 ed448; do

    echo "Generating EdDSA key pair for ${curve}..."

    for key_tag in ok err; do

        # Generate the private key in PEM format
        openssl genpkey -algorithm ${curve} -out debug/${key_tag}-${curve}.p8.pem
        
        # Extract the public key from the private key, in PEM format
        openssl pkey -in debug/${key_tag}-${curve}.p8.pem -pubout -out debug/${key_tag}-${curve}.pub.pem

        # Extract the public key from the private key, in DER format
        openssl pkey -in debug/${key_tag}-${curve}.p8.pem -pubout -out debug/${key_tag}-${curve}.pub.der -outform DER

        # Convert the private key to DER format
        openssl pkey -in debug/${key_tag}-${curve}.p8.pem -outform DER -out debug/${key_tag}-${curve}.p8.der

    done
done
