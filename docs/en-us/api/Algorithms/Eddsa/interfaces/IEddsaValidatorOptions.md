[Documents for @litert/jwt](../../../index.md) / [Algorithms/Eddsa](../index.md) / IEddsaValidatorOptions

# Interface: IEddsaValidatorOptions

Defined in: [src/lib/Algorithms/Eddsa.ts:140](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Eddsa.ts#L140)

The options for creating an EdDSA signature validator for JWT.

## Properties

### checkAlgClaim?

> `optional` **checkAlgClaim**: `boolean`

Defined in: [src/lib/Algorithms/Eddsa.ts:160](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Eddsa.ts#L160)

Whether to check the `alg` claim in the JWT header if it is present.

#### Default

```ts
true
```

***

### customName?

> `optional` **customName**: `string`

Defined in: [src/lib/Algorithms/Eddsa.ts:147](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Eddsa.ts#L147)

A custom name for this validator.

#### Default

```ts
'EddsaJwaVerifier'
```

***

### publicKey

> **publicKey**: `string` \| `KeyObject`

Defined in: [src/lib/Algorithms/Eddsa.ts:153](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Eddsa.ts#L153)

The public key to use for EdDSA signature verification.
If a string is provided, it must be a PEM encoded ED public key.
