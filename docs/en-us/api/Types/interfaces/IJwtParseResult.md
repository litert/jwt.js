[Documents for @litert/jwt](../../index.md) / [Types](../index.md) / IJwtParseResult

# Interface: IJwtParseResult

Defined in: src/lib/Types.ts:399

The type of the result returned by `parse` API.

## Properties

### header

> **header**: [`IJwtHeader`](IJwtHeader.md)

Defined in: src/lib/Types.ts:404

The decoded header of the JWT.

***

### payload

> **payload**: [`IJwtPayload`](IJwtPayload.md)

Defined in: src/lib/Types.ts:409

The decoded payload of the JWT.

***

### signature

> **signature**: `Buffer`

Defined in: src/lib/Types.ts:419

The signature of the JWT.

***

### signedContent

> **signedContent**: `string`

Defined in: src/lib/Types.ts:414

The content to be signed, which is the base64url-encoded header and payload.
