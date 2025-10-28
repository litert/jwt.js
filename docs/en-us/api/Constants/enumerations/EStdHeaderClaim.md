[Documents for @litert/jwt](../../index.md) / [Constants](../index.md) / EStdHeaderClaim

# Enumeration: EStdHeaderClaim

Defined in: [src/lib/Constants.ts:22](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L22)

The header claims defined by the JWT specification.

## Link

https://datatracker.ietf.org/doc/html/rfc7519#section-5

## Enumeration Members

### ALGORITHM

> **ALGORITHM**: `"alg"`

Defined in: [src/lib/Constants.ts:29](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L29)

The algorithm used for signing the JWT.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.1

***

### CONTENT\_TYPE

> **CONTENT\_TYPE**: `"cty"`

Defined in: [src/lib/Constants.ts:43](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L43)

The content type of the JWT payload.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.10

***

### CRITICAL\_CLAIMS

> **CRITICAL\_CLAIMS**: `"crit"`

Defined in: [src/lib/Constants.ts:105](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L105)

Indicates that the header contains critical claims that must be
understood and processed.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.11

***

### JWK

> **JWK**: `"jwk"`

Defined in: [src/lib/Constants.ts:66](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L66)

The JSON Web Key (JWK) that contains the public key used to verify
the JWT signature.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.3

***

### JWK\_URL

> **JWK\_URL**: `"jku"`

Defined in: [src/lib/Constants.ts:58](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L58)

The URL of the JSON Web Key Set (JWKS) document that contains the
public key used to verify the JWT signature.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.2

***

### KEY\_ID

> **KEY\_ID**: `"kid"`

Defined in: [src/lib/Constants.ts:50](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L50)

The key ID used to sign the JWT.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.4

***

### TYPE

> **TYPE**: `"typ"`

Defined in: [src/lib/Constants.ts:36](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L36)

The type of the token.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.9

***

### X509\_CERT\_CHAIN

> **X509\_CERT\_CHAIN**: `"x5c"`

Defined in: [src/lib/Constants.ts:81](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L81)

The X.509 certificate chain used to verify the JWT signature.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.6

***

### X509\_CERT\_THUMBPRINT\_SHA1

> **X509\_CERT\_THUMBPRINT\_SHA1**: `"x5t"`

Defined in: [src/lib/Constants.ts:89](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L89)

The X.509 certificate thumbprint. (SHA-1 hash of the DER-encoded
certificate)

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.7

***

### X509\_CERT\_THUMBPRINT\_SHA256

> **X509\_CERT\_THUMBPRINT\_SHA256**: `"x5t#S256"`

Defined in: [src/lib/Constants.ts:97](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L97)

The X.509 certificate SHA-256 thumbprint. (SHA-256 hash of the DER-encoded
certificate)

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.8

***

### X509\_CERT\_URL

> **X509\_CERT\_URL**: `"x5u"`

Defined in: [src/lib/Constants.ts:74](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L74)

The X.509 URL pointing to the certificate or certificate chain
used to verify the JWT signature.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.5
