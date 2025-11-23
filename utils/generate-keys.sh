#!/usr/bin/env bash
SCRIPT_ROOT=$(cd $(dirname $0); pwd)
cd $SCRIPT_ROOT/..

OUT_DIR=test-data
rm -rf $OUT_DIR
mkdir $OUT_DIR

# Generate key for RSA algorithms using PSS padding

for alg in 256-2048 384-3072 512-4096; do

    IFS='-' read digest_length rsa_key_size <<< "$alg"

    echo "Generating RSA key pair for PS${digest_length} with key size ${rsa_key_size} bits..."

    for key_tag in ok err; do

        # Generate the private key in PEM format, using PKCS#8 standard
        openssl genpkey -algorithm RSA-PSS \
            -pkeyopt rsa_keygen_bits:${rsa_key_size} \
            -pkeyopt rsa_pss_keygen_md:sha${digest_length} \
            -pkeyopt rsa_pss_keygen_mgf1_md:sha${digest_length} \
            -pkeyopt rsa_pss_keygen_saltlen:$((digest_length / 8)) \
            -out $OUT_DIR/${key_tag}-PS${digest_length}.p8.pem

        # Extract the public key from the private key, in PEM format
        openssl rsa -in $OUT_DIR/${key_tag}-PS${digest_length}.p8.pem -pubout -out $OUT_DIR/${key_tag}-PS${digest_length}.pub.pem

        # Extract the public key from the private key, in DER format
        openssl rsa -in $OUT_DIR/${key_tag}-PS${digest_length}.p8.pem -pubout -out $OUT_DIR/${key_tag}-PS${digest_length}.pub.der -outform DER

        # Convert the private key to DER format
        openssl pkcs8 -nocrypt -inform PEM -in $OUT_DIR/${key_tag}-PS${digest_length}.p8.pem -outform DER -out $OUT_DIR/${key_tag}-PS${digest_length}.p8.der
    done
done

# Generate key for RSA algorithms

for alg in 256-2048 384-3072 512-4096; do

    IFS='-' read digest_length rsa_key_size <<< "$alg"

    echo "Generating RSA key pair for RS${digest_length} with key size ${rsa_key_size} bits..."

    for key_tag in ok err; do

        # Generate the private key in PEM format, using PKCS#1 standard
        openssl genrsa -traditional -out $OUT_DIR/${key_tag}-RS${digest_length}.p1.pem ${rsa_key_size}

        # Extract the public key from the private key, in PEM format
        openssl rsa -in $OUT_DIR/${key_tag}-RS${digest_length}.p1.pem -pubout -out $OUT_DIR/${key_tag}-RS${digest_length}.pub.pem

        # Extract the public key from the private key, in DER format
        openssl rsa -in $OUT_DIR/${key_tag}-RS${digest_length}.p1.pem -pubout -out $OUT_DIR/${key_tag}-RS${digest_length}.pub.der -outform DER

        # Convert the private key to DER format
        openssl rsa -in $OUT_DIR/${key_tag}-RS${digest_length}.p1.pem -outform DER -out $OUT_DIR/${key_tag}-RS${digest_length}.p1.der

        # Convert the private key to PKCS#8 format in PEM
        openssl pkcs8 -topk8 -inform PEM -outform PEM -in $OUT_DIR/${key_tag}-RS${digest_length}.p1.pem -out $OUT_DIR/${key_tag}-RS${digest_length}.p8.pem -nocrypt

        # Convert the private key to PKCS#8 format in DER
        openssl pkcs8 -topk8 -inform PEM -outform DER -in $OUT_DIR/${key_tag}-RS${digest_length}.p1.pem -out $OUT_DIR/${key_tag}-RS${digest_length}.p8.der -nocrypt

    done
done

# Generate key for ECDSA algorithms
for curve in 256-prime256v1 256K-secp256k1 384-secp384r1 512-secp521r1; do

    IFS='-' read digest_length curve_name <<< "$curve"

    echo "Generating EC key pair for ES${digest_length} with curve ${curve_name}..."

    for key_tag in ok err; do

        # Generate the private key in PEM format
        openssl ecparam -name ${curve_name} -genkey -noout -out $OUT_DIR/${key_tag}-ES${digest_length}.p1.pem

        # Extract the public key from the private key, in PEM format
        openssl ec -in $OUT_DIR/${key_tag}-ES${digest_length}.p1.pem -pubout -out $OUT_DIR/${key_tag}-ES${digest_length}.pub.pem

        # Extract the public key from the private key, in DER format
        openssl ec -in $OUT_DIR/${key_tag}-ES${digest_length}.p1.pem -pubout -out $OUT_DIR/${key_tag}-ES${digest_length}.pub.der -outform DER

        # Convert the private key to DER format
        openssl ec -in $OUT_DIR/${key_tag}-ES${digest_length}.p1.pem -outform DER -out $OUT_DIR/${key_tag}-ES${digest_length}.p1.der

        # Convert the private key to PKCS#8 format in PEM
        openssl pkcs8 -topk8 -inform PEM -outform PEM -in $OUT_DIR/${key_tag}-ES${digest_length}.p1.pem -out $OUT_DIR/${key_tag}-ES${digest_length}.p8.pem -nocrypt

        # Convert the private key to PKCS#8 format in DER
        openssl pkcs8 -topk8 -inform PEM -outform DER -in $OUT_DIR/${key_tag}-ES${digest_length}.p1.pem -out $OUT_DIR/${key_tag}-ES${digest_length}.p8.der -nocrypt

    done
done

# Generate ECDSA key with unknown curve
openssl ecparam -name c2pnb368w1 -genkey -noout -out $OUT_DIR/ES-unk.p1.pem

openssl ec -in $OUT_DIR/ES-unk.p1.pem -pubout -out $OUT_DIR/ES-unk.pub.pem

# Generate x25519 key pair

openssl genpkey -algorithm X25519 -out $OUT_DIR/ok-x25519.p8.pem

openssl pkey -in $OUT_DIR/ok-x25519.p8.pem -pubout -out $OUT_DIR/ok-x25519.pub.pem

# Generate 1024-bit RSA key pair for testing unsupported key size
openssl genrsa -traditional -out $OUT_DIR/RSA-1024.p1.pem 1024

openssl rsa -in $OUT_DIR/RSA-1024.p1.pem -pubout -out $OUT_DIR/RSA-1024.pub.pem

for curve in ed25519 ed448; do

    echo "Generating EdDSA key pair for ${curve}..."

    for key_tag in ok err; do

        # Generate the private key in PEM format
        openssl genpkey -algorithm ${curve} -out $OUT_DIR/${key_tag}-${curve}.p8.pem

        # Extract the public key from the private key, in PEM format
        openssl pkey -in $OUT_DIR/${key_tag}-${curve}.p8.pem -pubout -out $OUT_DIR/${key_tag}-${curve}.pub.pem

        # Extract the public key from the private key, in DER format
        openssl pkey -in $OUT_DIR/${key_tag}-${curve}.p8.pem -pubout -out $OUT_DIR/${key_tag}-${curve}.pub.der -outform DER

        # Convert the private key to DER format
        openssl pkey -in $OUT_DIR/${key_tag}-${curve}.p8.pem -outform DER -out $OUT_DIR/${key_tag}-${curve}.p8.der

    done
done

node $SCRIPT_ROOT/generate-mldsa-keys.js
