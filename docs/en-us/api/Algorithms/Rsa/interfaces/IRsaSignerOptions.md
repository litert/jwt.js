[Documents for @litert/jwt](../../../index.md) / [Algorithms/Rsa](../index.md) / IRsaSignerOptions

# Interface: IRsaSignerOptions

Defined in: [src/lib/Algorithms/Rsa.ts:26](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L26)

The options for creating an RSA JWT signer.

## Properties

### digestType

> **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md)

Defined in: [src/lib/Algorithms/Rsa.ts:47](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L47)

The digest type to use for signing.

***

### keyId?

> `optional` **keyId**: `string` \| `null`

Defined in: [src/lib/Algorithms/Rsa.ts:42](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L42)

The key ID to use in the JWT header.

> When using `stringify` API, it will not automatically set the `kid`
> claim in the JWT header even if this value is provided here. You need
> to set it manually in the `header` option of the `stringify` API.

#### Optional

***

### privateKey

> **privateKey**: `string` \| `KeyObject`

Defined in: [src/lib/Algorithms/Rsa.ts:31](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L31)

The private key to use for signing.

***

### usePssPadding?

> `optional` **usePssPadding**: `boolean` \| `null`

Defined in: [src/lib/Algorithms/Rsa.ts:59](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L59)

Whether to use RSA-PSS padding for signing.

Set to `null` to use the default padding scheme based on the key type.

If a RSA-PSS key is provided, but this option is set to `false`, an error
will be thrown.

#### Default

```ts
null
```
