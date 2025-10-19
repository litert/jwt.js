[Documents for @litert/jwt](../../../index.md) / [Algorithms/Rsa](../index.md) / IRsaVerifierOptions

# Interface: IRsaVerifierOptions

Defined in: src/lib/Algorithms/Rsa.ts:186

The options for creating an RSA signature verifier for JWT.

## Properties

### checkAlgClaim?

> `optional` **checkAlgClaim**: `boolean`

Defined in: src/lib/Algorithms/Rsa.ts:198

Whether to check the `alg` claim in the JWT header if it is present.

#### Default

```ts
true
```

***

### digestType

> **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md)

Defined in: src/lib/Algorithms/Rsa.ts:203

The digest type to use for RSA signature verification.

***

### publicKey

> **publicKey**: `string` \| `KeyObject`

Defined in: src/lib/Algorithms/Rsa.ts:191

The public key to use for RSA signature verification.
