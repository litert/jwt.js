[Documents for @litert/jwt](../../index.md) / [Types](../index.md) / IJwtParseResult

# Interface: IJwtParseResult

Defined in: [src/lib/Types.ts:391](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L391)

The type of the result returned by `parse` API.

## Properties

### header

> **header**: [`IJwtHeader`](IJwtHeader.md)

Defined in: [src/lib/Types.ts:396](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L396)

The decoded header of the JWT.

***

### payload

> **payload**: [`IJwtPayload`](IJwtPayload.md)

Defined in: [src/lib/Types.ts:401](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L401)

The decoded payload of the JWT.

***

### signature

> **signature**: `Buffer`

Defined in: [src/lib/Types.ts:411](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L411)

The signature of the JWT.

***

### signedContent

> **signedContent**: `string`

Defined in: [src/lib/Types.ts:406](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L406)

The content to be signed, which is the base64url-encoded header and payload.
