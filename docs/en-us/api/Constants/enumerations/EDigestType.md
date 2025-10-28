[Documents for @litert/jwt](../../index.md) / [Constants](../index.md) / EDigestType

# Enumeration: EDigestType

Defined in: [src/lib/Constants.ts:302](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L302)

The digest algorithms supported by the library.

## Enumeration Members

### SHA256

> **SHA256**: `"sha256"`

Defined in: [src/lib/Constants.ts:307](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L307)

SHA-2 256 bits digest algorithm.

***

### SHA384

> **SHA384**: `"sha384"`

Defined in: [src/lib/Constants.ts:312](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L312)

SHA-2 384 bits digest algorithm.

***

### SHA512

> **SHA512**: `"sha512"`

Defined in: [src/lib/Constants.ts:317](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L317)

SHA-2 512 bits digest algorithm.

***

### SHAKE256

> **SHAKE256**: `"shake256"`

Defined in: [src/lib/Constants.ts:325](https://github.com/litert/jwt.js/blob/master/src/lib/Constants.ts#L325)

SHAKE-256 digest algorithm.

NOTE: This digest algorithm is only for Ed448 in EdDSA signing,
don't use it for other purposes.
