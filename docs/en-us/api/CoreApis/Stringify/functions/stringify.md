[Documents for @litert/jwt](../../../index.md) / [CoreApis/Stringify](../index.md) / stringify

# Function: stringify()

> **stringify**(`options`): `string`

Defined in: src/lib/CoreApis/Stringify.ts:63

Encode the provided JWT data into a signed JWT string.

This function is one of the core APIs for JWT operations, and also a low-level
API for signing JWTs. It does encode JWTs by provided header and payload,
without doing any other operations like setting default claims in the payload,
validating the payload claims, etc.

The only default operations it will do is to set the `typ` and `alg` claims
in the JWT header according to the provided signer, and sign the JWT using
the provided signer.

## Parameters

### options

[`IStringifyOptions`](../interfaces/IStringifyOptions.md)

The options to use for stringification of the JWT.

## Returns

`string`

The signed JWT string.
