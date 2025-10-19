[Documents for @litert/jwt](../../index.md) / [Constants](../index.md) / ESigningJwa

# Enumeration: ESigningJwa

Defined in: src/lib/Constants.ts:63

The JWA algorithms for signing JWTs, using in the `alg` field.

## Enumeration Members

### EDDSA

> **EDDSA**: `"EdDSA"`

Defined in: src/lib/Constants.ts:137

EdDSA (Edwards-curve Digital Signature Algorithm) using curves like
`Ed25519`, `Ed448`.

***

### ES256

> **ES256**: `"ES256"`

Defined in: src/lib/Constants.ts:114

ECDSA using `P-256` (also known as `secp256r1`) curve and SHA-256 digest
algorithm.

***

### ES256K

> **ES256K**: `"ES256K"`

Defined in: src/lib/Constants.ts:119

ECDSA using `secp256k1` curve and SHA-256 digest algorithm.

***

### ES384

> **ES384**: `"ES384"`

Defined in: src/lib/Constants.ts:125

ECDSA using `P-384` (also known as `secp384r1`) curve and SHA-384 digest
algorithm.

***

### ES512

> **ES512**: `"ES512"`

Defined in: src/lib/Constants.ts:131

ECDSA using `P-521` (also known as `secp521r1`) curve and SHA-512 digest
algorithm.

***

### HS256

> **HS256**: `"HS256"`

Defined in: src/lib/Constants.ts:98

HMAC using SHA-256 hash algorithm.

***

### HS384

> **HS384**: `"HS384"`

Defined in: src/lib/Constants.ts:103

HMAC using SHA-384 hash algorithm.

***

### HS512

> **HS512**: `"HS512"`

Defined in: src/lib/Constants.ts:108

HMAC using SHA-512 hash algorithm.

***

### PS256

> **PS256**: `"PS256"`

Defined in: src/lib/Constants.ts:83

RSASSA-PSS using SHA-256 hash algorithm.

***

### PS384

> **PS384**: `"PS384"`

Defined in: src/lib/Constants.ts:88

RSASSA-PSS using SHA-384 hash algorithm.

***

### PS512

> **PS512**: `"PS512"`

Defined in: src/lib/Constants.ts:93

RSASSA-PSS using SHA-512 hash algorithm.

***

### RS256

> **RS256**: `"RS256"`

Defined in: src/lib/Constants.ts:68

RSASSA-PKCS1-v1_5 using SHA-256 hash algorithm.

***

### RS384

> **RS384**: `"RS384"`

Defined in: src/lib/Constants.ts:73

RSASSA-PKCS1-v1_5 using SHA-384 hash algorithm.

***

### RS512

> **RS512**: `"RS512"`

Defined in: src/lib/Constants.ts:78

RSASSA-PKCS1-v1_5 using SHA-512 hash algorithm.
