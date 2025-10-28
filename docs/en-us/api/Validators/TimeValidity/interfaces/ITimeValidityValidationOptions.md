[Documents for @litert/jwt](../../../index.md) / [Validators/TimeValidity](../index.md) / ITimeValidityValidationOptions

# Interface: ITimeValidityValidationOptions

Defined in: [src/lib/Validators/TimeValidity.ts:41](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/TimeValidity.ts#L41)

The options for the time validity validator.

## Properties

### claims?

> `optional` **claims**: `Partial`\<`Record`\<[`EXPIRATION_TIME`](../../../Constants/enumerations/EStdPayloadClaim.md#expiration_time) \| [`NOT_BEFORE`](../../../Constants/enumerations/EStdPayloadClaim.md#not_before), `IClaimOptions`\>\>

Defined in: [src/lib/Validators/TimeValidity.ts:55](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/TimeValidity.ts#L55)

The strategy to use for the claims supported by this validator.

The "nbf" claim is not checked by default.

***

### customName?

> `optional` **customName**: `string`

Defined in: [src/lib/Validators/TimeValidity.ts:48](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/TimeValidity.ts#L48)

A custom name for this validator.

#### Default

```ts
'JwtTimeValidityValidator'
```
