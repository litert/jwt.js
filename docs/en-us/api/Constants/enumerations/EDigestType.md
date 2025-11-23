[Documents for @litert/jwt](../../index.md) / [Constants](../index.md) / EDigestType

# Enumeration: EDigestType

Defined in: [src/lib/Constants.ts:358](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L358)

The digest algorithms supported by the library.

## Enumeration Members

### AUTO

> **AUTO**: `"auto"`

Defined in: [src/lib/Constants.ts:388](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L388)

Automatically select the digest algorithm based on the key and algorithm.

#### Since

v0.1.2

***

### SHA256

> **SHA256**: `"sha256"`

Defined in: [src/lib/Constants.ts:363](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L363)

SHA-2 256 bits digest algorithm.

***

### SHA384

> **SHA384**: `"sha384"`

Defined in: [src/lib/Constants.ts:368](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L368)

SHA-2 384 bits digest algorithm.

***

### SHA512

> **SHA512**: `"sha512"`

Defined in: [src/lib/Constants.ts:373](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L373)

SHA-2 512 bits digest algorithm.

***

### SHAKE256

> **SHAKE256**: `"shake256"`

Defined in: [src/lib/Constants.ts:381](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L381)

SHAKE-256 digest algorithm.

NOTE: This digest algorithm is only for Ed448 in EdDSA signing,
don't use it for other purposes.
