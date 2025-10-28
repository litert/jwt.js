[Documents for @litert/jwt](../../index.md) / [Types](../index.md) / IJwtAsyncValidator

# Interface: IJwtAsyncValidator

Defined in: [src/lib/Types.ts:438](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L438)

The type of the asynchronous validator objects that validate the JWTs, after parsing.

The validator is not only verifying the signature, but also could do other
checks on the payload, such as expiration, audience, issuer, etc.

## Properties

### name

> `readonly` **name**: `string`

Defined in: [src/lib/Types.ts:440](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L440)

## Methods

### validate()

> **validate**(`parseResult`): `Promise`\<`void`\>

Defined in: [src/lib/Types.ts:449](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L449)

Validate the provided parse result of a JWT, checking if the JWT is valid.

#### Parameters

##### parseResult

[`IJwtParseResult`](IJwtParseResult.md)

The result returned by `parse` API.

#### Returns

`Promise`\<`void`\>

#### Throws

If validation failed or an error occurred inside.
