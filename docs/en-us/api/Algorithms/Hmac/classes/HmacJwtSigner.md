[Documents for @litert/jwt](../../../index.md) / [Algorithms/Hmac](../index.md) / HmacJwtSigner

# Class: HmacJwtSigner

Defined in: src/lib/Algorithms/Hmac.ts:68

The HMAC JWT signer implementation.

## Implements

- [`IJwtSigner`](../../../Types/interfaces/IJwtSigner.md)

## Constructors

### Constructor

> **new HmacJwtSigner**(`opts`): `HmacJwtSigner`

Defined in: src/lib/Algorithms/Hmac.ts:80

#### Parameters

##### opts

[`IHmacSignerOptions`](../interfaces/IHmacSignerOptions.md)

#### Returns

`HmacJwtSigner`

## Properties

### digestType

> `readonly` **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md)

Defined in: src/lib/Algorithms/Hmac.ts:76

***

### family

> `readonly` **family**: [`ESigningAlgoFamily`](../../../Constants/enumerations/ESigningAlgoFamily.md) = `cL.ESigningAlgoFamily.HMAC`

Defined in: src/lib/Algorithms/Hmac.ts:70

The signing algorithm family.

#### Implementation of

[`IJwtSigner`](../../../Types/interfaces/IJwtSigner.md).[`family`](../../../Types/interfaces/IJwtSigner.md#family)

***

### jwa

> `readonly` **jwa**: [`ESigningJwa`](../../../Constants/enumerations/ESigningJwa.md)

Defined in: src/lib/Algorithms/Hmac.ts:72

The signing algorithm to use, for the `alg` claim in the JWT header.

#### Implementation of

[`IJwtSigner`](../../../Types/interfaces/IJwtSigner.md).[`jwa`](../../../Types/interfaces/IJwtSigner.md#jwa)

***

### keyId?

> `readonly` `optional` **keyId**: `string` \| `null`

Defined in: src/lib/Algorithms/Hmac.ts:74

The key ID to use in the JWT header.

#### Implementation of

[`IJwtSigner`](../../../Types/interfaces/IJwtSigner.md).[`keyId`](../../../Types/interfaces/IJwtSigner.md#keyid)

## Methods

### sign()

> **sign**(`content`): `Buffer`

Defined in: src/lib/Algorithms/Hmac.ts:91

Sign the provided data and return the signature.

#### Parameters

##### content

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`Buffer`

The signature.

#### Implementation of

[`IJwtSigner`](../../../Types/interfaces/IJwtSigner.md).[`sign`](../../../Types/interfaces/IJwtSigner.md#sign)
