[Documents for @litert/jwt](../../../index.md) / [ManagedApis/Builder](../index.md) / ISetHeaderClaimOptions

# Interface: ISetHeaderClaimOptions

Defined in: [src/lib/ManagedApis/Builder.ts:70](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L70)

The type of options for setting header claims.

## Properties

### critical?

> `optional` **critical**: `boolean`

Defined in: [src/lib/ManagedApis/Builder.ts:77](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L77)

Whether should add the claim name to the `crit` header claim.

#### Default

```ts
false
```

***

### skipValidation?

> `optional` **skipValidation**: `boolean`

Defined in: [src/lib/ManagedApis/Builder.ts:84](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L84)

Whether to skip type validation for the claim value, allowing setting any value.

#### Default

```ts
false
```
