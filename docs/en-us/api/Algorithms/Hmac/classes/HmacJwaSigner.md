[Documents for @litert/jwt](../../../index.md) / [Algorithms/Hmac](../index.md) / HmacJwaSigner

# Class: HmacJwaSigner

Defined in: [src/lib/Algorithms/Hmac.ts:87](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L87)

The HMAC JWT signer implementation.

## Example

```ts
import * as LibJWT from '@litert/jwt';
const signer = new LibJWT.HmacJwaSigner({
  'key': 'the-secret-key',
  'digestType': LibJWT.EDigestType.SHA256,
});
const token = await LibJWT.stringify({
   'payload': { foo: 'bar' },
   'signer': signer,
});
console.log(token);
```

## Implements

- [`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md)

## Constructors

### Constructor

> **new HmacJwaSigner**(`opts`): `HmacJwaSigner`

Defined in: [src/lib/Algorithms/Hmac.ts:99](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L99)

#### Parameters

##### opts

[`IHmacSignerOptions`](../interfaces/IHmacSignerOptions.md)

#### Returns

`HmacJwaSigner`

## Properties

### digestType

> `readonly` **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md)

Defined in: [src/lib/Algorithms/Hmac.ts:93](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L93)

The digest type to use for signing.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`digestType`](../../../Types/interfaces/IJwaSigner.md#digesttype)

***

### family

> `readonly` **family**: [`ESigningAlgoFamily`](../../../Constants/enumerations/ESigningAlgoFamily.md) = `cL.ESigningAlgoFamily.HMAC`

Defined in: [src/lib/Algorithms/Hmac.ts:89](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L89)

The signing algorithm family.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`family`](../../../Types/interfaces/IJwaSigner.md#family)

***

### jwa

> `readonly` **jwa**: [`ESigningJwa`](../../../Constants/enumerations/ESigningJwa.md)

Defined in: [src/lib/Algorithms/Hmac.ts:91](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L91)

The signing algorithm to use, for the `alg` claim in the JWT header.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`jwa`](../../../Types/interfaces/IJwaSigner.md#jwa)

***

### keyId?

> `readonly` `optional` **keyId**: `string` \| `null`

Defined in: [src/lib/Algorithms/Hmac.ts:95](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L95)

The key ID to use in the JWT header.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`keyId`](../../../Types/interfaces/IJwaSigner.md#keyid)

## Methods

### sign()

> **sign**(`content`): `Buffer`

Defined in: [src/lib/Algorithms/Hmac.ts:109](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L109)

Sign the provided data and return the signature.

#### Parameters

##### content

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`Buffer`

The signature.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`sign`](../../../Types/interfaces/IJwaSigner.md#sign)
