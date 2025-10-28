[Documents for @litert/jwt](../../../index.md) / [CoreApis/Parse](../index.md) / parse

# Function: parse()

> **parse**(`jwt`): [`IJwtParseResult`](../../../Types/interfaces/IJwtParseResult.md)

Defined in: [src/lib/CoreApis/Parse.ts:49](https://github.com/litert/jwt.js/blob/master/src/lib/CoreApis/Parse.ts#L49)

The function to decode a JWT string into its components.

This function is one of the core APIs for JWT operations, and also a low-level
API for parsing JWTs. It does decode JWTs into components, without doing any
other operations like validating the JWT token claims, verifying the signature,

The only validation it will do is to check the basic format of the JWT string,
and the `typ` claim in the header if they are present.

## Parameters

### jwt

`string`

The JWT string to parse.

## Returns

[`IJwtParseResult`](../../../Types/interfaces/IJwtParseResult.md)

The parsed JWT components.

## Example

```ts
import * as LibJWT from '@litert/jwt';
const info = LibJWT.parse(token); // Signature is not verified here.
console.log(info.header);
console.log(info.payload);
const verifier = new LibJWT.RsaJwaVerifier({
   publicKey: '-----BEGIN PUBLIC KEY-----\n...',
   digestType: LibJWT.EDigestType.SHA256,
});
if (!verifier.verify(info)) {
   throw new Error('Invalid signature.');
}
```
