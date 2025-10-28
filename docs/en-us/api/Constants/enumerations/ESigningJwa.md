[Documents for @litert/jwt](../../index.md) / [Constants](../index.md) / ESigningJwa

# Enumeration: ESigningJwa

Defined in: [src/lib/Constants.ts:214](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L214)

The JWA algorithms for signing JWTs, using in the `alg` claim.

## Enumeration Members

### EDDSA

> **EDDSA**: `"EdDSA"`

Defined in: [src/lib/Constants.ts:288](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L288)

EdDSA (Edwards-curve Digital Signature Algorithm) using curves like
`Ed25519`, `Ed448`.

***

### ES256

> **ES256**: `"ES256"`

Defined in: [src/lib/Constants.ts:265](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L265)

ECDSA using `P-256` (also known as `secp256r1`) curve and SHA-256 digest
algorithm.

***

### ES256K

> **ES256K**: `"ES256K"`

Defined in: [src/lib/Constants.ts:270](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L270)

ECDSA using `secp256k1` curve and SHA-256 digest algorithm.

***

### ES384

> **ES384**: `"ES384"`

Defined in: [src/lib/Constants.ts:276](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L276)

ECDSA using `P-384` (also known as `secp384r1`) curve and SHA-384 digest
algorithm.

***

### ES512

> **ES512**: `"ES512"`

Defined in: [src/lib/Constants.ts:282](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L282)

ECDSA using `P-521` (also known as `secp521r1`) curve and SHA-512 digest
algorithm.

***

### HS256

> **HS256**: `"HS256"`

Defined in: [src/lib/Constants.ts:249](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L249)

HMAC using SHA-256 hash algorithm.

***

### HS384

> **HS384**: `"HS384"`

Defined in: [src/lib/Constants.ts:254](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L254)

HMAC using SHA-384 hash algorithm.

***

### HS512

> **HS512**: `"HS512"`

Defined in: [src/lib/Constants.ts:259](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L259)

HMAC using SHA-512 hash algorithm.

***

### PS256

> **PS256**: `"PS256"`

Defined in: [src/lib/Constants.ts:234](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L234)

RSASSA-PSS using SHA-256 hash algorithm.

***

### PS384

> **PS384**: `"PS384"`

Defined in: [src/lib/Constants.ts:239](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L239)

RSASSA-PSS using SHA-384 hash algorithm.

***

### PS512

> **PS512**: `"PS512"`

Defined in: [src/lib/Constants.ts:244](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L244)

RSASSA-PSS using SHA-512 hash algorithm.

***

### RS256

> **RS256**: `"RS256"`

Defined in: [src/lib/Constants.ts:219](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L219)

RSASSA-PKCS1-v1_5 using SHA-256 hash algorithm.

***

### RS384

> **RS384**: `"RS384"`

Defined in: [src/lib/Constants.ts:224](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L224)

RSASSA-PKCS1-v1_5 using SHA-384 hash algorithm.

***

### RS512

> **RS512**: `"RS512"`

Defined in: [src/lib/Constants.ts:229](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L229)

RSASSA-PKCS1-v1_5 using SHA-512 hash algorithm.
