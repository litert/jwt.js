[Documents for @litert/jwt](../../../index.md) / [Algorithms/Ecdsa](../index.md) / IEcdsaSignerOptions

# Interface: IEcdsaSignerOptions

Defined in: [src/lib/Algorithms/Ecdsa.ts:26](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L26)

The options for creating an ECDSA JWT signer.

## Properties

### keyId?

> `optional` **keyId**: `string` \| `null`

Defined in: [src/lib/Algorithms/Ecdsa.ts:47](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L47)

The key ID to use in the JWT header.

> When using `stringify` API, it will not automatically set the `kid`
> claim in the JWT header even if this value is provided here. You need
> to set it manually in the `header` option of the `stringify` API.

#### Optional

***

### privateKey

> **privateKey**: `string` \| `KeyObject`

Defined in: [src/lib/Algorithms/Ecdsa.ts:36](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L36)

The private key to use for signing.
If a string is provided, it must be a PEM encoded EC private key,
both PKCS#8 and SEC1 formats are supported.

The digest algorithm and JWA will be inferred from the key, no need to
specify them manually.
