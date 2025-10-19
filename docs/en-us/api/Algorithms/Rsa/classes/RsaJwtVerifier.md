[Documents for @litert/jwt](../../../index.md) / [Algorithms/Rsa](../index.md) / RsaJwtVerifier

# Class: RsaJwtVerifier

Defined in: src/lib/Algorithms/Rsa.ts:212

The RSA signature verifier implementation for JWT.

This verifier class checks if the signature is valid.
It neither parses the JWT, nor validates the JWT token claims.

## Implements

- [`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md)

## Constructors

### Constructor

> **new RsaJwtVerifier**(`opts`): `RsaJwtVerifier`

Defined in: src/lib/Algorithms/Rsa.ts:233

#### Parameters

##### opts

[`IRsaVerifierOptions`](../interfaces/IRsaVerifierOptions.md)

#### Returns

`RsaJwtVerifier`

## Properties

### checkAlgClaim

> **checkAlgClaim**: `boolean`

Defined in: src/lib/Algorithms/Rsa.ts:222

Whether to check the `alg` claim in the JWT header if it is present.

***

### family

> `readonly` **family**: [`ESigningAlgoFamily`](../../../Constants/enumerations/ESigningAlgoFamily.md) = `cL.ESigningAlgoFamily.RSA`

Defined in: src/lib/Algorithms/Rsa.ts:217

The signing algorithm family.

***

### jwa

> `readonly` **jwa**: [`ESigningJwa`](../../../Constants/enumerations/ESigningJwa.md)

Defined in: src/lib/Algorithms/Rsa.ts:227

The JWA algorithm name.

## Methods

### validate()

> **validate**(`data`): `boolean`

Defined in: src/lib/Algorithms/Rsa.ts:245

Validate the provided parse result of a JWT, checking if the JWT is valid.

#### Parameters

##### data

[`IJwtParseResult`](../../../Types/interfaces/IJwtParseResult.md)

#### Returns

`boolean`

Whether the JWT passed the validation.

#### Implementation of

[`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md).[`validate`](../../../Types/interfaces/IJwtValidator.md#validate)
