[Documents for @litert/jwt](../../index.md) / [Types](../index.md) / IJwtSigner

# Interface: IJwtSigner

Defined in: src/lib/Types.ts:370

The type of the signer objects used in `stringify` API, to sign the JWTs.

## Properties

### family

> `readonly` **family**: [`ESigningAlgoFamily`](../../Constants/enumerations/ESigningAlgoFamily.md)

Defined in: src/lib/Types.ts:374

The signing algorithm family.

***

### jwa

> `readonly` **jwa**: [`ESigningJwa`](../../Constants/enumerations/ESigningJwa.md)

Defined in: src/lib/Types.ts:384

The signing algorithm to use, for the `alg` claim in the JWT header.

***

### keyId?

> `readonly` `optional` **keyId**: `string` \| `null`

Defined in: src/lib/Types.ts:379

The key ID to use in the JWT header.

## Methods

### sign()

> **sign**(`data`): `Buffer`

Defined in: src/lib/Types.ts:393

Sign the provided data and return the signature.

#### Parameters

##### data

`Buffer`

The data to sign.

#### Returns

`Buffer`

The signature.
