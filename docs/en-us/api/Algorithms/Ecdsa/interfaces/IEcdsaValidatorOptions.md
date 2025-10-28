[Documents for @litert/jwt](../../../index.md) / [Algorithms/Ecdsa](../index.md) / IEcdsaValidatorOptions

# Interface: IEcdsaValidatorOptions

Defined in: [src/lib/Algorithms/Ecdsa.ts:160](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L160)

The options for creating an ECDSA signature validator for JWT.

## Properties

### checkAlgClaim?

> `optional` **checkAlgClaim**: `boolean`

Defined in: [src/lib/Algorithms/Ecdsa.ts:183](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L183)

Whether to check the `alg` claim in the JWT header if it is present.

#### Default

```ts
true
```

***

### customName?

> `optional` **customName**: `string`

Defined in: [src/lib/Algorithms/Ecdsa.ts:167](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L167)

A custom name for this validator.

#### Default

```ts
'EcdsaJwaVerifier'
```

***

### publicKey

> **publicKey**: `string` \| `KeyObject`

Defined in: [src/lib/Algorithms/Ecdsa.ts:176](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L176)

The public key to use for ECDSA signature verification.
If a string is provided, it must be a PEM encoded EC public key.

The digest algorithm and JWA will be inferred from the key, no need to
specify them manually.
