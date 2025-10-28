[Documents for @litert/jwt](../../../index.md) / [Algorithms/Rsa](../index.md) / IRsaValidatorOptions

# Interface: IRsaValidatorOptions

Defined in: [src/lib/Algorithms/Rsa.ts:237](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L237)

The options for creating an RSA signature validator for JWT.

## Properties

### checkAlgClaim?

> `optional` **checkAlgClaim**: `boolean`

Defined in: [src/lib/Algorithms/Rsa.ts:256](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L256)

Whether to check the `alg` claim in the JWT header if it is present.

#### Default

```ts
true
```

***

### customName?

> `optional` **customName**: `string`

Defined in: [src/lib/Algorithms/Rsa.ts:244](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L244)

A custom name for this validator.

#### Default

```ts
'RsaJwaVerifier'
```

***

### digestType

> **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md)

Defined in: [src/lib/Algorithms/Rsa.ts:261](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L261)

The digest type to use for RSA signature verification.

***

### publicKey

> **publicKey**: `string` \| `KeyObject`

Defined in: [src/lib/Algorithms/Rsa.ts:249](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L249)

The public key to use for RSA signature verification.

***

### usePssPadding?

> `optional` **usePssPadding**: `boolean` \| `null`

Defined in: [src/lib/Algorithms/Rsa.ts:273](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L273)

Whether to use RSA-PSS padding for verification.

Set to `null` to use the default padding scheme based on the key type.

If a RSA-PSS key is provided, but this option is set to `false`, an error
will be thrown.

#### Default

```ts
null
```
