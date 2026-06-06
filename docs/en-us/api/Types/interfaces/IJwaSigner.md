[Documents for @litert/jwt](../../index.md) / [Types](../index.md) / IJwaSigner

# Interface: IJwaSigner

Defined in: [src/lib/Types.ts:357](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L357)

The type of the signer objects used in `stringify` API, to sign the JWTs.

## Properties

### digestType

> `readonly` **digestType**: [`EDigestType`](../../Constants/enumerations/EDigestType.md)

Defined in: [src/lib/Types.ts:376](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L376)

The digest type to use for signing.

***

### family

> `readonly` **family**: [`ESigningAlgoFamily`](../../Constants/enumerations/ESigningAlgoFamily.md)

Defined in: [src/lib/Types.ts:361](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L361)

The signing algorithm family.

***

### jwa

> `readonly` **jwa**: [`ESigningJwa`](../../Constants/enumerations/ESigningJwa.md)

Defined in: [src/lib/Types.ts:371](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L371)

The signing algorithm to use, for the `alg` claim in the JWT header.

***

### keyId?

> `readonly` `optional` **keyId?**: `string` \| `null`

Defined in: [src/lib/Types.ts:366](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L366)

The key ID to use in the JWT header.

## Methods

### sign()

> **sign**(`data`): `Buffer`

Defined in: [src/lib/Types.ts:385](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L385)

Sign the provided data and return the signature.

#### Parameters

##### data

`string` \| `Buffer`\<`ArrayBufferLike`\>

The data to sign.

#### Returns

`Buffer`

The signature.
