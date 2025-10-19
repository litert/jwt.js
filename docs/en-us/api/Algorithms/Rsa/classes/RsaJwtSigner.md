[Documents for @litert/jwt](../../../index.md) / [Algorithms/Rsa](../index.md) / RsaJwtSigner

# Class: RsaJwtSigner

Defined in: src/lib/Algorithms/Rsa.ts:155

The RSA JWT signer implementation.

## Implements

- [`IJwtSigner`](../../../Types/interfaces/IJwtSigner.md)

## Constructors

### Constructor

> **new RsaJwtSigner**(`opts`): `RsaJwtSigner`

Defined in: src/lib/Algorithms/Rsa.ts:167

#### Parameters

##### opts

[`IRsaSignerOptions`](../interfaces/IRsaSignerOptions.md)

#### Returns

`RsaJwtSigner`

## Properties

### digestType

> `readonly` **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md)

Defined in: src/lib/Algorithms/Rsa.ts:163

***

### family

> `readonly` **family**: [`ESigningAlgoFamily`](../../../Constants/enumerations/ESigningAlgoFamily.md) = `cL.ESigningAlgoFamily.RSA`

Defined in: src/lib/Algorithms/Rsa.ts:157

The signing algorithm family.

#### Implementation of

[`IJwtSigner`](../../../Types/interfaces/IJwtSigner.md).[`family`](../../../Types/interfaces/IJwtSigner.md#family)

***

### jwa

> `readonly` **jwa**: [`ESigningJwa`](../../../Constants/enumerations/ESigningJwa.md)

Defined in: src/lib/Algorithms/Rsa.ts:159

The signing algorithm to use, for the `alg` claim in the JWT header.

#### Implementation of

[`IJwtSigner`](../../../Types/interfaces/IJwtSigner.md).[`jwa`](../../../Types/interfaces/IJwtSigner.md#jwa)

***

### keyId?

> `readonly` `optional` **keyId**: `string` \| `null`

Defined in: src/lib/Algorithms/Rsa.ts:161

The key ID to use in the JWT header.

#### Implementation of

[`IJwtSigner`](../../../Types/interfaces/IJwtSigner.md).[`keyId`](../../../Types/interfaces/IJwtSigner.md#keyid)

## Methods

### sign()

> **sign**(`content`): `Buffer`

Defined in: src/lib/Algorithms/Rsa.ts:175

Sign the provided data and return the signature.

#### Parameters

##### content

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`Buffer`

The signature.

#### Implementation of

[`IJwtSigner`](../../../Types/interfaces/IJwtSigner.md).[`sign`](../../../Types/interfaces/IJwtSigner.md#sign)
