[Documents for @litert/jwt](../../../index.md) / [Algorithms/Eddsa](../index.md) / EddsaJwtSigner

# Class: EddsaJwtSigner

Defined in: src/lib/Algorithms/Eddsa.ts:123

The EDDSA JWT signer implementation.

## Implements

- [`IJwtSigner`](../../../Types/interfaces/IJwtSigner.md)

## Constructors

### Constructor

> **new EddsaJwtSigner**(`opts`): `EddsaJwtSigner`

Defined in: src/lib/Algorithms/Eddsa.ts:135

#### Parameters

##### opts

[`IEddsaSignerOptions`](../interfaces/IEddsaSignerOptions.md)

#### Returns

`EddsaJwtSigner`

## Properties

### digestType

> `readonly` **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md)

Defined in: src/lib/Algorithms/Eddsa.ts:131

***

### family

> `readonly` **family**: [`ESigningAlgoFamily`](../../../Constants/enumerations/ESigningAlgoFamily.md) = `cL.ESigningAlgoFamily.EDDSA`

Defined in: src/lib/Algorithms/Eddsa.ts:125

The signing algorithm family.

#### Implementation of

[`IJwtSigner`](../../../Types/interfaces/IJwtSigner.md).[`family`](../../../Types/interfaces/IJwtSigner.md#family)

***

### jwa

> `readonly` **jwa**: [`ESigningJwa`](../../../Constants/enumerations/ESigningJwa.md)

Defined in: src/lib/Algorithms/Eddsa.ts:127

The signing algorithm to use, for the `alg` claim in the JWT header.

#### Implementation of

[`IJwtSigner`](../../../Types/interfaces/IJwtSigner.md).[`jwa`](../../../Types/interfaces/IJwtSigner.md#jwa)

***

### keyId?

> `readonly` `optional` **keyId**: `string` \| `null`

Defined in: src/lib/Algorithms/Eddsa.ts:129

The key ID to use in the JWT header.

#### Implementation of

[`IJwtSigner`](../../../Types/interfaces/IJwtSigner.md).[`keyId`](../../../Types/interfaces/IJwtSigner.md#keyid)

## Methods

### sign()

> **sign**(`content`): `Buffer`

Defined in: src/lib/Algorithms/Eddsa.ts:142

Sign the provided data and return the signature.

#### Parameters

##### content

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`Buffer`

The signature.

#### Implementation of

[`IJwtSigner`](../../../Types/interfaces/IJwtSigner.md).[`sign`](../../../Types/interfaces/IJwtSigner.md#sign)
