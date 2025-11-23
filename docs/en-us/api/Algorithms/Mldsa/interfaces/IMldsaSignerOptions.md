[Documents for @litert/jwt](../../../index.md) / [Algorithms/Mldsa](../index.md) / IMldsaSignerOptions

# Interface: IMldsaSignerOptions

Defined in: [src/lib/Algorithms/Mldsa.ts:26](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L26)

The options for creating an ML-DSA JWT signer.

## Properties

### keyId?

> `optional` **keyId**: `string` \| `null`

Defined in: [src/lib/Algorithms/Mldsa.ts:43](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L43)

The key ID to use in the JWT header.

> When using `stringify` API, it will not automatically set the `kid`
> claim in the JWT header even if this value is provided here. You need
> to set it manually in the `header` option of the `stringify` API.

#### Optional

***

### privateKey

> **privateKey**: `string` \| `KeyObject`

Defined in: [src/lib/Algorithms/Mldsa.ts:32](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L32)

The private key to use for signing.
If a string is provided, it must be a PEM encoded ML-DSA private key.
