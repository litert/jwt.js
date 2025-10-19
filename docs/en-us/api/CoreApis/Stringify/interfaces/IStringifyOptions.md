[Documents for @litert/jwt](../../../index.md) / [CoreApis/Stringify](../index.md) / IStringifyOptions

# Interface: IStringifyOptions

Defined in: src/lib/CoreApis/Stringify.ts:22

The options for API `stringify`.

## Properties

### header?

> `optional` **header**: `Partial`\<[`IJwtHeader`](../../../Types/interfaces/IJwtHeader.md)\>

Defined in: src/lib/CoreApis/Stringify.ts:31

The JWT header to use.

The `typ` (type) and `alg` (algorithm) claims will be set
automatically according to the provided signer. And they are not
allowed to be overridden.

***

### payload

> **payload**: [`IJwtPayload`](../../../Types/interfaces/IJwtPayload.md)

Defined in: src/lib/CoreApis/Stringify.ts:39

The JWT payload to use.

Only the user provided claims will be included in the JWT.
No default claims will be set.

***

### signer

> **signer**: [`IJwtSigner`](../../../Types/interfaces/IJwtSigner.md)

Defined in: src/lib/CoreApis/Stringify.ts:44

The signer to use for signing the JWT.
