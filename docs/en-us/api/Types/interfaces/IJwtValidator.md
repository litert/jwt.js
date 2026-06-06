[Documents for @litert/jwt](../../index.md) / [Types](../index.md) / IJwtValidator

# Interface: IJwtValidator

Defined in: [src/lib/Types.ts:420](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L420)

The type of the validator objects that validate the JWTs, after parsing.

The validator is not only verifying the signature, but also could do other
checks on the payload, such as expiration, audience, issuer, etc.

## Properties

### name

> `readonly` **name**: `string`

Defined in: [src/lib/Types.ts:428](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L428)

The name of the validator.

When using with the JwtVerifier class, this name can be used to identify
which validator failed.

## Methods

### validate()

> **validate**(`parseResult`): `void`

Defined in: [src/lib/Types.ts:437](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L437)

Validate the provided parse result of a JWT, checking if the JWT is valid.

#### Parameters

##### parseResult

[`IJwtParseResult`](IJwtParseResult.md)

The result returned by `parse` API.

#### Returns

`void`

#### Throws

If validation failed or an error occurred inside.
