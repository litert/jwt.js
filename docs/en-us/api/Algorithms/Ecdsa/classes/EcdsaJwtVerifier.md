[Documents for @litert/jwt](../../../index.md) / [Algorithms/Ecdsa](../index.md) / EcdsaJwtVerifier

# Class: EcdsaJwtVerifier

Defined in: src/lib/Algorithms/Ecdsa.ts:192

The ECDSA signature verifier implementation for JWT.

This verifier class checks if the signature is valid.
It neither parses the JWT, nor validates the JWT token claims.

## Implements

- [`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md)

## Constructors

### Constructor

> **new EcdsaJwtVerifier**(`opts`): `EcdsaJwtVerifier`

Defined in: src/lib/Algorithms/Ecdsa.ts:213

#### Parameters

##### opts

[`IEcdsaVerifierOptions`](../interfaces/IEcdsaVerifierOptions.md)

#### Returns

`EcdsaJwtVerifier`

## Properties

### checkAlgClaim

> **checkAlgClaim**: `boolean`

Defined in: src/lib/Algorithms/Ecdsa.ts:202

Whether to check the `alg` claim in the JWT header if it is present.

***

### family

> `readonly` **family**: [`ESigningAlgoFamily`](../../../Constants/enumerations/ESigningAlgoFamily.md) = `cL.ESigningAlgoFamily.ECDSA`

Defined in: src/lib/Algorithms/Ecdsa.ts:197

The signing algorithm family.

***

### jwa

> `readonly` **jwa**: [`ESigningJwa`](../../../Constants/enumerations/ESigningJwa.md)

Defined in: src/lib/Algorithms/Ecdsa.ts:207

The JWA algorithm name.

## Methods

### validate()

> **validate**(`data`): `boolean`

Defined in: src/lib/Algorithms/Ecdsa.ts:229

Validate the provided parse result of a JWT, checking if the JWT is valid.

#### Parameters

##### data

[`IJwtParseResult`](../../../Types/interfaces/IJwtParseResult.md)

#### Returns

`boolean`

Whether the JWT passed the validation.

#### Implementation of

[`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md).[`validate`](../../../Types/interfaces/IJwtValidator.md#validate)
