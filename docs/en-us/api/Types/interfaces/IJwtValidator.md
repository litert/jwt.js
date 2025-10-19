[Documents for @litert/jwt](../../index.md) / [Types](../index.md) / IJwtValidator

# Interface: IJwtValidator

Defined in: src/lib/Types.ts:428

The type of the validator objects that validate the JWTs, after parsing.

The validator is not only verifying the signature, but also could do other
checks on the payload, such as expiration, audience, issuer, etc.

## Methods

### validate()

> **validate**(`parseResult`): `boolean`

Defined in: src/lib/Types.ts:437

Validate the provided parse result of a JWT, checking if the JWT is valid.

#### Parameters

##### parseResult

[`IJwtParseResult`](IJwtParseResult.md)

The result returned by `parse` API.

#### Returns

`boolean`

Whether the JWT passed the validation.
