[Documents for @litert/jwt](../../../index.md) / [Algorithms/Hmac](../index.md) / IHmacVerifierOptions

# Interface: IHmacVerifierOptions

Defined in: src/lib/Algorithms/Hmac.ts:105

The options for creating an HMAC signature verifier for JWT.

## Properties

### digestType

> **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md)

Defined in: src/lib/Algorithms/Hmac.ts:115

The digest type to use for HMAC signature verification.

***

### key

> **key**: `string` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: src/lib/Algorithms/Hmac.ts:110

The secret key to use for HMAC signature verification.
