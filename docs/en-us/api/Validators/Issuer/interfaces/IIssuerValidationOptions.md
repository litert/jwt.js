[Documents for @litert/jwt](../../../index.md) / [Validators/Issuer](../index.md) / IIssuerValidationOptions

# Interface: IIssuerValidationOptions

Defined in: [src/lib/Validators/Issuer.ts:25](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/Issuer.ts#L25)

The options for `JwtIssuerValidator`.

## Properties

### allowlist

> **allowlist**: (`string` \| `RegExp` \| (`iss`) => `boolean`)[]

Defined in: [src/lib/Validators/Issuer.ts:35](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/Issuer.ts#L35)

The allowlist of issuers, the elements can be:

- A string: the `iss` claim must be exactly the same as this string.
- A RegExp: the `iss` claim must match this regular expression.
- A function: the function will be called with the `iss` claim as the only
  argument, and should return true if the issuer is allowed, or false otherwise.

***

### claimRequired?

> `optional` **claimRequired**: `boolean`

Defined in: [src/lib/Validators/Issuer.ts:42](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/Issuer.ts#L42)

Whether the `iss` claim is required.

#### Default

```ts
true
```

***

### customName?

> `optional` **customName**: `string`

Defined in: [src/lib/Validators/Issuer.ts:49](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/Issuer.ts#L49)

A custom name for this validator.

#### Default

```ts
'JwtIssuerValidator'
```
