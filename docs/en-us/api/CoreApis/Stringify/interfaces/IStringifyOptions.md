[Documents for @litert/jwt](../../../index.md) / [CoreApis/Stringify](../index.md) / IStringifyOptions

# Interface: IStringifyOptions

Defined in: [src/lib/CoreApis/Stringify.ts:23](https://github.com/litert/jwt.js/blob/master/src/lib/CoreApis/Stringify.ts#L23)

The options for API `stringify`.

## Properties

### header?

> `optional` **header**: `Partial`\<[`IJwtHeader`](../../../Types/interfaces/IJwtHeader.md)\>

Defined in: [src/lib/CoreApis/Stringify.ts:32](https://github.com/litert/jwt.js/blob/master/src/lib/CoreApis/Stringify.ts#L32)

The JWT header to use.

The `typ` (type) and `alg` (algorithm) claims will be set
automatically according to the provided signer. And they are not
allowed to be overridden.

***

### payload

> **payload**: [`IJwtPayload`](../../../Types/interfaces/IJwtPayload.md)

Defined in: [src/lib/CoreApis/Stringify.ts:40](https://github.com/litert/jwt.js/blob/master/src/lib/CoreApis/Stringify.ts#L40)

The JWT payload to use.

Only the user provided claims will be included in the JWT.
No default claims will be set.

***

### signer

> **signer**: [`IJwaSigner`](../../../Types/interfaces/IJwaSigner.md)

Defined in: [src/lib/CoreApis/Stringify.ts:45](https://github.com/litert/jwt.js/blob/master/src/lib/CoreApis/Stringify.ts#L45)

The signer to use for signing the JWT.
