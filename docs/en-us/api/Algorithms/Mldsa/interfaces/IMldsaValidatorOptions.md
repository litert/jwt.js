[Documents for @litert/jwt](../../../index.md) / [Algorithms/Mldsa](../index.md) / IMldsaValidatorOptions

# Interface: IMldsaValidatorOptions

Defined in: [src/lib/Algorithms/Mldsa.ts:142](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L142)

The options for creating an ML-DSA signature validator for JWT.

## Properties

### checkAlgClaim?

> `optional` **checkAlgClaim**: `boolean`

Defined in: [src/lib/Algorithms/Mldsa.ts:162](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L162)

Whether to check the `alg` claim in the JWT header if it is present.

#### Default

```ts
true
```

***

### customName?

> `optional` **customName**: `string`

Defined in: [src/lib/Algorithms/Mldsa.ts:149](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L149)

A custom name for this validator.

#### Default

```ts
'MldsaJwaVerifier'
```

***

### publicKey

> **publicKey**: `string` \| `KeyObject`

Defined in: [src/lib/Algorithms/Mldsa.ts:155](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L155)

The public key to use for ML-DSA signature verification.
If a string is provided, it must be a PEM encoded ML-DSA public key.
