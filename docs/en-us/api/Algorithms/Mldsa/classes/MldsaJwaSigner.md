[Documents for @litert/jwt](../../../index.md) / [Algorithms/Mldsa](../index.md) / MldsaJwaSigner

# Class: MldsaJwaSigner

Defined in: [src/lib/Algorithms/Mldsa.ts:103](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L103)

The signer using ML-DSA algorithm, for JWT.

## Example

```ts
import * as LibJWT from '@litert/jwt';
const signer = new LibJWT.MldsaJwaSigner({
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

> **new MldsaJwaSigner**(`opts`): `MldsaJwaSigner`

Defined in: [src/lib/Algorithms/Mldsa.ts:115](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L115)

#### Parameters

##### opts

[`IMldsaSignerOptions`](../interfaces/IMldsaSignerOptions.md)

#### Returns

`MldsaJwaSigner`

## Properties

### digestType

> `readonly` **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md) = `cL.EDigestType.AUTO`

Defined in: [src/lib/Algorithms/Mldsa.ts:111](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L111)

The digest type to use for signing.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`digestType`](../../../Types/interfaces/IJwaSigner.md#digesttype)

***

### family

> `readonly` **family**: [`ESigningAlgoFamily`](../../../Constants/enumerations/ESigningAlgoFamily.md) = `cL.ESigningAlgoFamily.MLDSA`

Defined in: [src/lib/Algorithms/Mldsa.ts:105](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L105)

The signing algorithm family.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`family`](../../../Types/interfaces/IJwaSigner.md#family)

***

### jwa

> `readonly` **jwa**: [`ESigningJwa`](../../../Constants/enumerations/ESigningJwa.md)

Defined in: [src/lib/Algorithms/Mldsa.ts:107](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L107)

The signing algorithm to use, for the `alg` claim in the JWT header.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`jwa`](../../../Types/interfaces/IJwaSigner.md#jwa)

***

### keyId?

> `readonly` `optional` **keyId**: `string` \| `null`

Defined in: [src/lib/Algorithms/Mldsa.ts:109](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L109)

The key ID to use in the JWT header.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`keyId`](../../../Types/interfaces/IJwaSigner.md#keyid)

## Methods

### sign()

> **sign**(`content`): `Buffer`

Defined in: [src/lib/Algorithms/Mldsa.ts:122](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L122)

Sign the provided data and return the signature.

#### Parameters

##### content

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`Buffer`

The signature.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`sign`](../../../Types/interfaces/IJwaSigner.md#sign)
