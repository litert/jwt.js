[Documents for @litert/jwt](../../../index.md) / [Algorithms/Hmac](../index.md) / IHmacSignerOptions

# Interface: IHmacSignerOptions

Defined in: src/lib/Algorithms/Hmac.ts:25

The options for creating an HMAC JWT signer.

## Properties

### digestType

> **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md)

Defined in: src/lib/Algorithms/Hmac.ts:35

The digest type to use for signing.

***

### key

> **key**: `string` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: src/lib/Algorithms/Hmac.ts:30

The secret key to use for signing.

***

### keyId?

> `optional` **keyId**: `string` \| `null`

Defined in: src/lib/Algorithms/Hmac.ts:46

The key ID to use in the JWT header.

> When using `stringify` API, it will not automatically set the `kid`
> claim in the JWT header even if this value is provided here. You need
> to set it manually in the `header` option of the `stringify` API.

#### Optional
