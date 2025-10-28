[Documents for @litert/jwt](../../../index.md) / [Algorithms/Eddsa](../index.md) / EddsaJwaSigner

# Class: EddsaJwaSigner

Defined in: [src/lib/Algorithms/Eddsa.ts:101](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Eddsa.ts#L101)

The signer using EdDSA algorithm, for JWT.

## Example

```ts
import * as LibJWT from '@litert/jwt';
const signer = new LibJWT.EddsaJwaSigner({
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

> **new EddsaJwaSigner**(`opts`): `EddsaJwaSigner`

Defined in: [src/lib/Algorithms/Eddsa.ts:113](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Eddsa.ts#L113)

#### Parameters

##### opts

[`IEddsaSignerOptions`](../interfaces/IEddsaSignerOptions.md)

#### Returns

`EddsaJwaSigner`

## Properties

### digestType

> `readonly` **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md)

Defined in: [src/lib/Algorithms/Eddsa.ts:109](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Eddsa.ts#L109)

The digest type to use for signing.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`digestType`](../../../Types/interfaces/IJwaSigner.md#digesttype)

***

### family

> `readonly` **family**: [`ESigningAlgoFamily`](../../../Constants/enumerations/ESigningAlgoFamily.md) = `cL.ESigningAlgoFamily.EDDSA`

Defined in: [src/lib/Algorithms/Eddsa.ts:103](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Eddsa.ts#L103)

The signing algorithm family.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`family`](../../../Types/interfaces/IJwaSigner.md#family)

***

### jwa

> `readonly` **jwa**: [`ESigningJwa`](../../../Constants/enumerations/ESigningJwa.md) = `cL.ESigningJwa.EDDSA`

Defined in: [src/lib/Algorithms/Eddsa.ts:105](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Eddsa.ts#L105)

The signing algorithm to use, for the `alg` claim in the JWT header.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`jwa`](../../../Types/interfaces/IJwaSigner.md#jwa)

***

### keyId?

> `readonly` `optional` **keyId**: `string` \| `null`

Defined in: [src/lib/Algorithms/Eddsa.ts:107](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Eddsa.ts#L107)

The key ID to use in the JWT header.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`keyId`](../../../Types/interfaces/IJwaSigner.md#keyid)

## Methods

### sign()

> **sign**(`content`): `Buffer`

Defined in: [src/lib/Algorithms/Eddsa.ts:120](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Eddsa.ts#L120)

Sign the provided data and return the signature.

#### Parameters

##### content

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`Buffer`

The signature.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`sign`](../../../Types/interfaces/IJwaSigner.md#sign)
