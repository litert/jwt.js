[Documents for @litert/jwt](../../../index.md) / [Algorithms/Hmac](../index.md) / IHmacValidatorOptions

# Interface: IHmacValidatorOptions

Defined in: [src/lib/Algorithms/Hmac.ts:131](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L131)

The options for creating an HMAC signature validator for JWT.

## Properties

### checkAlgClaim?

> `optional` **checkAlgClaim**: `boolean`

Defined in: [src/lib/Algorithms/Hmac.ts:160](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L160)

Whether to check the `alg` claim in the JWT header if it is present.

#### Default

```ts
true
```

***

### customName?

> `optional` **customName**: `string`

Defined in: [src/lib/Algorithms/Hmac.ts:138](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L138)

A custom name for this validator.

#### Default

```ts
'HmacJwaVerifier'
```

***

### digestType

> **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md)

Defined in: [src/lib/Algorithms/Hmac.ts:153](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L153)

The digest type to use for HMAC signature verification.

***

### key

> **key**: `string` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [src/lib/Algorithms/Hmac.ts:148](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L148)

The secret key to use for HMAC signature verification.
If a string is provided, it will be treated as a UTF-8 encoded string.

#### Recommended

Use at least 256-bit (32 bytes) key for HMAC-SHA256,
             384-bit (48 bytes) key for HMAC-SHA384, and
             512-bit (64 bytes) key for HMAC-SHA512.
