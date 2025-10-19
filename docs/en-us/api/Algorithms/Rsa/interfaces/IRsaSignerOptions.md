[Documents for @litert/jwt](../../../index.md) / [Algorithms/Rsa](../index.md) / IRsaSignerOptions

# Interface: IRsaSignerOptions

Defined in: src/lib/Algorithms/Rsa.ts:25

The options for creating an RSA JWT signer.

## Properties

### digestType

> **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md)

Defined in: src/lib/Algorithms/Rsa.ts:46

The digest type to use for signing.

***

### keyId?

> `optional` **keyId**: `string` \| `null`

Defined in: src/lib/Algorithms/Rsa.ts:41

The key ID to use in the JWT header.

> When using `stringify` API, it will not automatically set the `kid`
> claim in the JWT header even if this value is provided here. You need
> to set it manually in the `header` option of the `stringify` API.

#### Optional

***

### privateKey

> **privateKey**: `string` \| `KeyObject`

Defined in: src/lib/Algorithms/Rsa.ts:30

The private key to use for signing.
