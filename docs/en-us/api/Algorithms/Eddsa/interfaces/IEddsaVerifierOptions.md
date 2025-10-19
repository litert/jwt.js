[Documents for @litert/jwt](../../../index.md) / [Algorithms/Eddsa](../index.md) / IEddsaVerifierOptions

# Interface: IEddsaVerifierOptions

Defined in: src/lib/Algorithms/Eddsa.ts:155

The options for creating an EDDSA signature verifier for JWT.

## Properties

### checkAlgClaim?

> `optional` **checkAlgClaim**: `boolean`

Defined in: src/lib/Algorithms/Eddsa.ts:167

Whether to check the `alg` claim in the JWT header if it is present.

#### Default

```ts
true
```

***

### publicKey

> **publicKey**: `string` \| `KeyObject`

Defined in: src/lib/Algorithms/Eddsa.ts:160

The public key to use for EDDSA signature verification.
