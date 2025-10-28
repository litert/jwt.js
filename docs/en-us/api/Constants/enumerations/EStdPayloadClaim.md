[Documents for @litert/jwt](../../index.md) / [Constants](../index.md) / EStdPayloadClaim

# Enumeration: EStdPayloadClaim

Defined in: [src/lib/Constants.ts:115](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L115)

The payload claims defined by the JWT specification.

## Link

https://datatracker.ietf.org/doc/html/rfc7519#section-4.1

## Enumeration Members

### AUDIENCE

> **AUDIENCE**: `"aud"`

Defined in: [src/lib/Constants.ts:136](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L136)

The audience for which the JWT is intended.

#### Link

https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.3

***

### EXPIRATION\_TIME

> **EXPIRATION\_TIME**: `"exp"`

Defined in: [src/lib/Constants.ts:143](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L143)

The expiration time of the JWT (as a Unix timestamp).

#### Link

https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4

***

### ISSUED\_AT

> **ISSUED\_AT**: `"iat"`

Defined in: [src/lib/Constants.ts:158](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L158)

The time at which the JWT was issued (as a Unix timestamp).

#### Link

https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.6

***

### ISSUER

> **ISSUER**: `"iss"`

Defined in: [src/lib/Constants.ts:122](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L122)

The issuer of the JWT.

#### Link

https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.1

***

### JWT\_ID

> **JWT\_ID**: `"jti"`

Defined in: [src/lib/Constants.ts:165](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L165)

The unique identifier for the JWT.

#### Link

https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.7

***

### NOT\_BEFORE

> **NOT\_BEFORE**: `"nbf"`

Defined in: [src/lib/Constants.ts:151](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L151)

The time before which the JWT must not be accepted for processing
(as a Unix timestamp).

#### Link

https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.5

***

### SUBJECT

> **SUBJECT**: `"sub"`

Defined in: [src/lib/Constants.ts:129](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L129)

The subject of the JWT.

#### Link

https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.2
