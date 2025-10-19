[Documents for @litert/jwt](../../../index.md) / [Algorithms/Ecdsa](../index.md) / IEcdsaVerifierOptions

# Interface: IEcdsaVerifierOptions

Defined in: src/lib/Algorithms/Ecdsa.ts:171

The options for creating an ECDSA signature verifier for JWT.

## Properties

### checkAlgClaim?

> `optional` **checkAlgClaim**: `boolean`

Defined in: src/lib/Algorithms/Ecdsa.ts:183

Whether to check the `alg` claim in the JWT header if it is present.

#### Default

```ts
true
```

***

### publicKey

> **publicKey**: `string` \| `KeyObject`

Defined in: src/lib/Algorithms/Ecdsa.ts:176

The public key to use for ECDSA signature verification.
