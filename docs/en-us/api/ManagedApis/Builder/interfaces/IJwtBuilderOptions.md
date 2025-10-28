[Documents for @litert/jwt](../../../index.md) / [ManagedApis/Builder](../index.md) / IJwtBuilderOptions

# Interface: IJwtBuilderOptions

Defined in: [src/lib/ManagedApis/Builder.ts:27](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L27)

The options for creating a JWT builder.

## Properties

### header?

> `optional` **header**: `Partial`\<[`IJwtHeader`](../../../Types/interfaces/IJwtHeader.md)\>

Defined in: [src/lib/ManagedApis/Builder.ts:45](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L45)

Initial header claims to include in every new generated token.

If a function is provided, it will be called to get the initial header
claims for the builder.

> For `alg` and `typ` claims, they will be ignored, and automatically
> set according to the signer used.

#### Default

```ts
{}
```

***

### payload?

> `optional` **payload**: [`IJwtPayload`](../../../Types/interfaces/IJwtPayload.md)

Defined in: [src/lib/ManagedApis/Builder.ts:55](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L55)

Initial payload claims to include in every new generated token.

If a function is provided, it will be called to get the initial payload
claims for the builder.

#### Default

```ts
{}
```

***

### signer

> **signer**: [`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md)

Defined in: [src/lib/ManagedApis/Builder.ts:32](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L32)

The signer to use to sign the JWT tokens.
