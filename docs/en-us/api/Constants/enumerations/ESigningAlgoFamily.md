[Documents for @litert/jwt](../../index.md) / [Constants](../index.md) / ESigningAlgoFamily

# Enumeration: ESigningAlgoFamily

Defined in: [src/lib/Constants.ts:171](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L171)

The families of the signing algorithms supported by the library.

## Enumeration Members

### ECDSA

> **ECDSA**: `2`

Defined in: [src/lib/Constants.ts:193](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L193)

Use the ECDSA algorithm for signing.

#### Link

https://datatracker.ietf.org/doc/html/rfc7518#section-3.4

***

### EDDSA

> **EDDSA**: `3`

Defined in: [src/lib/Constants.ts:201](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L201)

Use the EdDSA algorithm for signing.

#### Link

https://datatracker.ietf.org/doc/html/rfc8037#section-3.1

#### Link

https://datatracker.ietf.org/doc/html/rfc8037#appendix-A.4

***

### HMAC

> **HMAC**: `1`

Defined in: [src/lib/Constants.ts:186](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L186)

Use the HMAC-SHA2 algorithm for signing.

#### Link

https://datatracker.ietf.org/doc/html/rfc7518#section-3.2

***

### MLDSA

> **MLDSA**: `4`

Defined in: [src/lib/Constants.ts:215](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L215)

**`Experimental`**

Use the ML-DSA algorithm for signing.

> The support for ML-DSA is experimental and may change in future releases.

#### Link

https://www.ietf.org/archive/id/draft-ietf-cose-dilithium-04.html

#### Since

v0.1.2

#### Requires

Node.js v24.6.0

***

### RSA

> **RSA**: `0`

Defined in: [src/lib/Constants.ts:179](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L179)

Use the RSA algorithm for signing.

#### Link

https://datatracker.ietf.org/doc/html/rfc7518#section-3.3

#### Link

https://datatracker.ietf.org/doc/html/rfc7518#section-3.5
