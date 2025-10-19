[Documents for @litert/jwt](../../../index.md) / [CoreApis/Parse](../index.md) / parse

# Function: parse()

> **parse**(`jwt`): [`IJwtParseResult`](../../../Types/interfaces/IJwtParseResult.md)

Defined in: src/lib/CoreApis/Parse.ts:42

The function to decode a JWT string into its components.

This function is one of the core APIs for JWT operations, and also a low-level
API for parsing JWTs. It does decode JWTs into components, without doing any
other operations like validating the JWT token claims, verifying the signature,

The only validation it will do is to check the basic format of the JWT string,
and the `typ` and `alg` claims in the header if they are present.

## Parameters

### jwt

`string`

The JWT string to parse.

## Returns

[`IJwtParseResult`](../../../Types/interfaces/IJwtParseResult.md)

The parsed JWT components.
