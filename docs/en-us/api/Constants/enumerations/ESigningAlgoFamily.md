[Documents for @litert/jwt](../../index.md) / [Constants](../index.md) / ESigningAlgoFamily

# Enumeration: ESigningAlgoFamily

Defined in: src/lib/Constants.ts:20

The families of the signing algorithms supported by the library.

## Enumeration Members

### ECDSA

> **ECDSA**: `2`

Defined in: src/lib/Constants.ts:42

Use the ECDSA algorithm for signing.

#### See

https://datatracker.ietf.org/doc/html/rfc7518#section-3.4

***

### EDDSA

> **EDDSA**: `3`

Defined in: src/lib/Constants.ts:50

Use the EdDSA algorithm for signing.

#### See

 - https://datatracker.ietf.org/doc/html/rfc8037#section-3.1
 - https://datatracker.ietf.org/doc/html/rfc8037#appendix-A.4

***

### HMAC

> **HMAC**: `1`

Defined in: src/lib/Constants.ts:35

Use the HMAC-SHA2 algorithm for signing.

#### See

https://datatracker.ietf.org/doc/html/rfc7518#section-3.2

***

### RSA

> **RSA**: `0`

Defined in: src/lib/Constants.ts:28

Use the RSA algorithm for signing.

#### See

 - https://datatracker.ietf.org/doc/html/rfc7518#section-3.3
 - https://datatracker.ietf.org/doc/html/rfc7518#section-3.5
