[Documents for @litert/jwt](../../index.md) / [Types](../index.md) / IJwtParseResult

# Interface: IJwtParseResult

Defined in: [src/lib/Types.ts:383](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L383)

The type of the result returned by `parse` API.

## Properties

### header

> **header**: [`IJwtHeader`](IJwtHeader.md)

Defined in: [src/lib/Types.ts:388](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L388)

The decoded header of the JWT.

***

### payload

> **payload**: [`IJwtPayload`](IJwtPayload.md)

Defined in: [src/lib/Types.ts:393](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L393)

The decoded payload of the JWT.

***

### signature

> **signature**: `Buffer`

Defined in: [src/lib/Types.ts:403](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L403)

The signature of the JWT.

***

### signedContent

> **signedContent**: `string`

Defined in: [src/lib/Types.ts:398](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L398)

The content to be signed, which is the base64url-encoded header and payload.
