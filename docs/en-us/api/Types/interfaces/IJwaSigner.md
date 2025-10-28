[Documents for @litert/jwt](../../index.md) / [Types](../index.md) / IJwaSigner

# Interface: IJwaSigner

Defined in: [src/lib/Types.ts:349](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L349)

The type of the signer objects used in `stringify` API, to sign the JWTs.

## Properties

### digestType

> `readonly` **digestType**: [`EDigestType`](../../Constants/enumerations/EDigestType.md)

Defined in: [src/lib/Types.ts:368](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L368)

The digest type to use for signing.

***

### family

> `readonly` **family**: [`ESigningAlgoFamily`](../../Constants/enumerations/ESigningAlgoFamily.md)

Defined in: [src/lib/Types.ts:353](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L353)

The signing algorithm family.

***

### jwa

> `readonly` **jwa**: [`ESigningJwa`](../../Constants/enumerations/ESigningJwa.md)

Defined in: [src/lib/Types.ts:363](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L363)

The signing algorithm to use, for the `alg` claim in the JWT header.

***

### keyId?

> `readonly` `optional` **keyId**: `string` \| `null`

Defined in: [src/lib/Types.ts:358](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L358)

The key ID to use in the JWT header.

## Methods

### sign()

> **sign**(`data`): `Buffer`

Defined in: [src/lib/Types.ts:377](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L377)

Sign the provided data and return the signature.

#### Parameters

##### data

The data to sign.

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`Buffer`

The signature.
