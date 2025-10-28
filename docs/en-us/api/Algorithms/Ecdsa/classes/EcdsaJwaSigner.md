[Documents for @litert/jwt](../../../index.md) / [Algorithms/Ecdsa](../index.md) / EcdsaJwaSigner

# Class: EcdsaJwaSigner

Defined in: [src/lib/Algorithms/Ecdsa.ts:118](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L118)

The signer using ECDSA algorithm, for JWT.

## Example

```ts
import * as LibJWT from '@litert/jwt';
const signer = new LibJWT.EcdsaJwaSigner({
 privateKey: '-----BEGIN PRIVATE KEY-----\n...',
});
const token = await LibJWT.stringify({
  payload: { foo: 'bar' },
  signer: signer,
});
console.log(token);
```

## Implements

- [`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md)

## Constructors

### Constructor

> **new EcdsaJwaSigner**(`opts`): `EcdsaJwaSigner`

Defined in: [src/lib/Algorithms/Ecdsa.ts:130](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L130)

#### Parameters

##### opts

[`IEcdsaSignerOptions`](../interfaces/IEcdsaSignerOptions.md)

#### Returns

`EcdsaJwaSigner`

## Properties

### digestType

> `readonly` **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md)

Defined in: [src/lib/Algorithms/Ecdsa.ts:126](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L126)

The digest type to use for signing.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`digestType`](../../../Types/interfaces/IJwaSigner.md#digesttype)

***

### family

> `readonly` **family**: [`ESigningAlgoFamily`](../../../Constants/enumerations/ESigningAlgoFamily.md) = `cL.ESigningAlgoFamily.ECDSA`

Defined in: [src/lib/Algorithms/Ecdsa.ts:120](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L120)

The signing algorithm family.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`family`](../../../Types/interfaces/IJwaSigner.md#family)

***

### jwa

> `readonly` **jwa**: [`ESigningJwa`](../../../Constants/enumerations/ESigningJwa.md)

Defined in: [src/lib/Algorithms/Ecdsa.ts:122](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L122)

The signing algorithm to use, for the `alg` claim in the JWT header.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`jwa`](../../../Types/interfaces/IJwaSigner.md#jwa)

***

### keyId?

> `readonly` `optional` **keyId**: `string` \| `null`

Defined in: [src/lib/Algorithms/Ecdsa.ts:124](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L124)

The key ID to use in the JWT header.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`keyId`](../../../Types/interfaces/IJwaSigner.md#keyid)

## Methods

### sign()

> **sign**(`content`): `Buffer`

Defined in: [src/lib/Algorithms/Ecdsa.ts:142](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L142)

Sign the provided data and return the signature.

#### Parameters

##### content

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`Buffer`

The signature.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`sign`](../../../Types/interfaces/IJwaSigner.md#sign)
