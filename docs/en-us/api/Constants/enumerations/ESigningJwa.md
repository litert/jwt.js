[Documents for @litert/jwt](../../index.md) / [Constants](../index.md) / ESigningJwa

# Enumeration: ESigningJwa

Defined in: [src/lib/Constants.ts:228](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L228)

The JWA algorithms for signing JWTs, using in the `alg` claim.

## Enumeration Members

### EDDSA

> **EDDSA**: `"EdDSA"`

Defined in: [src/lib/Constants.ts:302](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L302)

EdDSA (Edwards-curve Digital Signature Algorithm) using curves like
`Ed25519`, `Ed448`.

***

### ES256

> **ES256**: `"ES256"`

Defined in: [src/lib/Constants.ts:279](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L279)

ECDSA using `P-256` (also known as `secp256r1`) curve and SHA-256 digest
algorithm.

***

### ES256K

> **ES256K**: `"ES256K"`

Defined in: [src/lib/Constants.ts:284](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L284)

ECDSA using `secp256k1` curve and SHA-256 digest algorithm.

***

### ES384

> **ES384**: `"ES384"`

Defined in: [src/lib/Constants.ts:290](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L290)

ECDSA using `P-384` (also known as `secp384r1`) curve and SHA-384 digest
algorithm.

***

### ES512

> **ES512**: `"ES512"`

Defined in: [src/lib/Constants.ts:296](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L296)

ECDSA using `P-521` (also known as `secp521r1`) curve and SHA-512 digest
algorithm.

***

### HS256

> **HS256**: `"HS256"`

Defined in: [src/lib/Constants.ts:263](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L263)

HMAC using SHA-256 hash algorithm.

***

### HS384

> **HS384**: `"HS384"`

Defined in: [src/lib/Constants.ts:268](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L268)

HMAC using SHA-384 hash algorithm.

***

### HS512

> **HS512**: `"HS512"`

Defined in: [src/lib/Constants.ts:273](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L273)

HMAC using SHA-512 hash algorithm.

***

### MLDSA44

> **MLDSA44**: `"ML-DSA-44"`

Defined in: [src/lib/Constants.ts:316](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L316)

**`Experimental`**

ML-DSA-44

> The support for ML-DSA is experimental and may change in future releases.

#### Link

https://www.ietf.org/archive/id/draft-ietf-cose-dilithium-04.htm

#### Since

v0.1.2

#### Requires

Node.js v24.6.0

***

### MLDSA65

> **MLDSA65**: `"ML-DSA-65"`

Defined in: [src/lib/Constants.ts:330](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L330)

**`Experimental`**

ML-DSA-65

> The support for ML-DSA is experimental and may change in future releases.

#### Link

https://www.ietf.org/archive/id/draft-ietf-cose-dilithium-04.html

#### Since

v0.1.2

#### Requires

Node.js v24.6.0

***

### MLDSA87

> **MLDSA87**: `"ML-DSA-87"`

Defined in: [src/lib/Constants.ts:344](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L344)

**`Experimental`**

ML-DSA-87

> The support for ML-DSA is experimental and may change in future releases.

#### Link

https://www.ietf.org/archive/id/draft-ietf-cose-dilithium-04.html

#### Since

v0.1.2

#### Requires

Node.js v24.6.0

***

### PS256

> **PS256**: `"PS256"`

Defined in: [src/lib/Constants.ts:248](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L248)

RSASSA-PSS using SHA-256 hash algorithm.

***

### PS384

> **PS384**: `"PS384"`

Defined in: [src/lib/Constants.ts:253](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L253)

RSASSA-PSS using SHA-384 hash algorithm.

***

### PS512

> **PS512**: `"PS512"`

Defined in: [src/lib/Constants.ts:258](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L258)

RSASSA-PSS using SHA-512 hash algorithm.

***

### RS256

> **RS256**: `"RS256"`

Defined in: [src/lib/Constants.ts:233](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L233)

RSASSA-PKCS1-v1_5 using SHA-256 hash algorithm.

***

### RS384

> **RS384**: `"RS384"`

Defined in: [src/lib/Constants.ts:238](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L238)

RSASSA-PKCS1-v1_5 using SHA-384 hash algorithm.

***

### RS512

> **RS512**: `"RS512"`

Defined in: [src/lib/Constants.ts:243](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L243)

RSASSA-PKCS1-v1_5 using SHA-512 hash algorithm.
