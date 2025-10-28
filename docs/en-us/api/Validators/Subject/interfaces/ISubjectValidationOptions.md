[Documents for @litert/jwt](../../../index.md) / [Validators/Subject](../index.md) / ISubjectValidationOptions

# Interface: ISubjectValidationOptions

Defined in: [src/lib/Validators/Subject.ts:25](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/Subject.ts#L25)

The options for `JwtSubjectValidator`.

## Properties

### allowlist

> **allowlist**: (`string` \| `RegExp` \| (`v`) => `boolean`)[]

Defined in: [src/lib/Validators/Subject.ts:35](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/Subject.ts#L35)

The allowlist of subjects, the elements can be:

- A string: the `sub` claim must be exactly the same as this string.
- A RegExp: the `sub` claim must match this regular expression.
- A function: the function will be called with the `sub` claim as the only
  argument, and should return true if the subject is allowed, or false otherwise.

***

### claimRequired?

> `optional` **claimRequired**: `boolean`

Defined in: [src/lib/Validators/Subject.ts:42](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/Subject.ts#L42)

Whether the `sub` claim is required.

#### Default

```ts
true
```

***

### customName?

> `optional` **customName**: `string`

Defined in: [src/lib/Validators/Subject.ts:49](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/Subject.ts#L49)

A custom name for this validator.

#### Default

```ts
'JwtSubjectValidator'
```
