[Documents for @litert/jwt](../../../index.md) / [Validators/Audience](../index.md) / IAudienceValidationOptions

# Interface: IAudienceValidationOptions

Defined in: [src/lib/Validators/Audience.ts:25](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/Audience.ts#L25)

The options for `JwtAudienceValidator`.

## Properties

### allowlist

> **allowlist**: (`string` \| `RegExp` \| (`v`) => `boolean`)[]

Defined in: [src/lib/Validators/Audience.ts:35](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/Audience.ts#L35)

The allowlist of audiences, the elements can be:

- A string: the `aud` claim must be exactly the same as this string.
- A RegExp: the `aud` claim must match this regular expression.
- A function: the function will be called with the `aud` claim as the only
  argument, and should return true if the audience is allowed, or false otherwise.

***

### claimRequired?

> `optional` **claimRequired**: `boolean`

Defined in: [src/lib/Validators/Audience.ts:42](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/Audience.ts#L42)

Whether the `aud` claim is required.

#### Default

```ts
true
```

***

### customName?

> `optional` **customName**: `string`

Defined in: [src/lib/Validators/Audience.ts:49](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/Audience.ts#L49)

A custom name for this validator.

#### Default

```ts
'JwtAudienceValidator'
```
