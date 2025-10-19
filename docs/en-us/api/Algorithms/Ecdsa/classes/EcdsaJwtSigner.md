[Documents for @litert/jwt](../../../index.md) / [Algorithms/Ecdsa](../index.md) / EcdsaJwtSigner

# Class: EcdsaJwtSigner

Defined in: src/lib/Algorithms/Ecdsa.ts:136

The ECDSA JWT signer implementation.

## Implements

- [`IJwtSigner`](../../../Types/interfaces/IJwtSigner.md)

## Constructors

### Constructor

> **new EcdsaJwtSigner**(`opts`): `EcdsaJwtSigner`

Defined in: src/lib/Algorithms/Ecdsa.ts:148

#### Parameters

##### opts

[`IEcdsaSignerOptions`](../interfaces/IEcdsaSignerOptions.md)

#### Returns

`EcdsaJwtSigner`

## Properties

### digestType

> `readonly` **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md)

Defined in: src/lib/Algorithms/Ecdsa.ts:144

***

### family

> `readonly` **family**: [`ESigningAlgoFamily`](../../../Constants/enumerations/ESigningAlgoFamily.md) = `cL.ESigningAlgoFamily.ECDSA`

Defined in: src/lib/Algorithms/Ecdsa.ts:138

The signing algorithm family.

#### Implementation of

[`IJwtSigner`](../../../Types/interfaces/IJwtSigner.md).[`family`](../../../Types/interfaces/IJwtSigner.md#family)

***

### jwa

> `readonly` **jwa**: [`ESigningJwa`](../../../Constants/enumerations/ESigningJwa.md)

Defined in: src/lib/Algorithms/Ecdsa.ts:140

The signing algorithm to use, for the `alg` claim in the JWT header.

#### Implementation of

[`IJwtSigner`](../../../Types/interfaces/IJwtSigner.md).[`jwa`](../../../Types/interfaces/IJwtSigner.md#jwa)

***

### keyId?

> `readonly` `optional` **keyId**: `string` \| `null`

Defined in: src/lib/Algorithms/Ecdsa.ts:142

The key ID to use in the JWT header.

#### Implementation of

[`IJwtSigner`](../../../Types/interfaces/IJwtSigner.md).[`keyId`](../../../Types/interfaces/IJwtSigner.md#keyid)

## Methods

### sign()

> **sign**(`content`): `Buffer`

Defined in: src/lib/Algorithms/Ecdsa.ts:160

Sign the provided data and return the signature.

#### Parameters

##### content

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`Buffer`

The signature.

#### Implementation of

[`IJwtSigner`](../../../Types/interfaces/IJwtSigner.md).[`sign`](../../../Types/interfaces/IJwtSigner.md#sign)
