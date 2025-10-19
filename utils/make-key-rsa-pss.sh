#!/usr/bin/env bash
SCRIPT_ROOT=$(cd $(dirname $0); pwd)

# Generate key pair, for PS256 JWA
openssl genpkey \
    -algorithm RSA \
    -out "${SCRIPT_ROOT}/rsa-pss-private-key.pem" \
    -pkeyopt rsa_keygen_bits:2048 \
    -pkeyopt rsa_padding_mode:pss \
    -pkeyopt rsa_pss_saltlen:32 \
    -pkeyopt rsa_pss_keygen_md:sha256 \
    -pkeyopt rsa_pss_mgf1_md:sha256
