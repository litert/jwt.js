[Documents for @litert/jwt](../../../index.md) / [Algorithms/Hmac](../index.md) / IHmacSignerOptions

# Interface: IHmacSignerOptions

Defined in: [src/lib/Algorithms/Hmac.ts:25](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L25)

The options for creating an HMAC JWT signer.

## Properties

### digestType

> **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md)

Defined in: [src/lib/Algorithms/Hmac.ts:40](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L40)

The digest type to use for signing.

***

### key

> **key**: `string` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [src/lib/Algorithms/Hmac.ts:35](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L35)

The secret key to use for signing.
If a string is provided, it will be treated as a UTF-8 encoded string.

#### Recommended

Use at least 256-bit (32 bytes) key for HMAC-SHA256,
             384-bit (48 bytes) key for HMAC-SHA384, and
             512-bit (64 bytes) key for HMAC-SHA512.

***

### keyId?

> `optional` **keyId**: `string` \| `null`

Defined in: [src/lib/Algorithms/Hmac.ts:51](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L51)

The key ID to use in the JWT header.

> When using `stringify` API, it will not automatically set the `kid`
> claim in the JWT header even if this value is provided here. You need
> to set it manually in the `header` option of the `stringify` API.

#### Optional
