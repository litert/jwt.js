[Documents for @litert/jwt](../../../index.md) / [Algorithms/Rsa](../index.md) / RsaJwaSigner

# Class: RsaJwaSigner

Defined in: [src/lib/Algorithms/Rsa.ts:193](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L193)

The RSA JWT signer implementation, for both RSASSA-PKCS1-v1_5 (RS256, ...)
and RSASSA-PSS (PS256, ...).

## Example

Signing with RSASSA-PKCS1-v1_5:

```ts
import * as LibJWT from '@litert/jwt';
const signer = new LibJWT.RsaJwaSigner({
    // NOTE: Don't use a RSA key with PSS padding parameters here.
    'privateKey': '-----BEGIN PRIVATE KEY-----\n...',
    'digestType': LibJWT.EDigestType.SHA256,
});
// ...
```

Signing with RSASSA-PSS:

```ts
import * as LibJWT from '@litert/jwt';
const signer = new LibJWT.RsaJwaSigner({
    'privateKey': '-----BEGIN PRIVATE KEY-----\n...',
    'digestType': LibJWT.EDigestType.SHA256,
    // NOTE: if your key is generated as RSA-PSS key, the usePssPadding
    // option can be omitted or set to null.
    'usePssPadding': true,
});
// ...
```

## Implements

- [`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md)

## Constructors

### Constructor

> **new RsaJwaSigner**(`opts`): `RsaJwaSigner`

Defined in: [src/lib/Algorithms/Rsa.ts:205](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L205)

#### Parameters

##### opts

[`IRsaSignerOptions`](../interfaces/IRsaSignerOptions.md)

#### Returns

`RsaJwaSigner`

## Properties

### digestType

> `readonly` **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md)

Defined in: [src/lib/Algorithms/Rsa.ts:201](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L201)

The digest type to use for signing.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`digestType`](../../../Types/interfaces/IJwaSigner.md#digesttype)

***

### family

> `readonly` **family**: [`ESigningAlgoFamily`](../../../Constants/enumerations/ESigningAlgoFamily.md) = `cL.ESigningAlgoFamily.RSA`

Defined in: [src/lib/Algorithms/Rsa.ts:195](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L195)

The signing algorithm family.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`family`](../../../Types/interfaces/IJwaSigner.md#family)

***

### jwa

> `readonly` **jwa**: [`ESigningJwa`](../../../Constants/enumerations/ESigningJwa.md)

Defined in: [src/lib/Algorithms/Rsa.ts:197](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L197)

The signing algorithm to use, for the `alg` claim in the JWT header.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`jwa`](../../../Types/interfaces/IJwaSigner.md#jwa)

***

### keyId?

> `readonly` `optional` **keyId**: `string` \| `null`

Defined in: [src/lib/Algorithms/Rsa.ts:199](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L199)

The key ID to use in the JWT header.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`keyId`](../../../Types/interfaces/IJwaSigner.md#keyid)

## Methods

### sign()

> **sign**(`content`): `Buffer`

Defined in: [src/lib/Algorithms/Rsa.ts:218](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L218)

Sign the provided data and return the signature.

#### Parameters

##### content

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`Buffer`

The signature.

#### Implementation of

[`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md).[`sign`](../../../Types/interfaces/IJwaSigner.md#sign)
