[Documents for @litert/jwt](../../index.md) / [Types](../index.md) / IJwtDecodeResult

# Interface: IJwtDecodeResult

Defined in: src/lib/Types.ts:344

The result of decoding a JWT token, could be passed to `verify()` to verify the JWT.

## Properties

### header

> **header**: [`IJwtHeader`](IJwtHeader.md)

Defined in: src/lib/Types.ts:349

The decoded header of the JWT.

***

### payload

> **payload**: [`IJwtPayload`](IJwtPayload.md)

Defined in: src/lib/Types.ts:354

The decoded payload of the JWT.

***

### sig

> **sig**: `Buffer`

Defined in: src/lib/Types.ts:364

The signature of the JWT.

***

### signPayload

> **signPayload**: `string`

Defined in: src/lib/Types.ts:359

The content to be signed, which is the base64url-encoded header and payload.
