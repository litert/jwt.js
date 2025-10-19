[Documents for @litert/jwt](../../../index.md) / [Algorithms/Eddsa](../index.md) / EddsaJwtVerifier

# Class: EddsaJwtVerifier

Defined in: src/lib/Algorithms/Eddsa.ts:176

The EDDSA signature verifier implementation for JWT.

This verifier class checks if the signature is valid.
It neither parses the JWT, nor validates the JWT token claims.

## Implements

- [`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md)

## Constructors

### Constructor

> **new EddsaJwtVerifier**(`opts`): `EddsaJwtVerifier`

Defined in: src/lib/Algorithms/Eddsa.ts:197

#### Parameters

##### opts

[`IEddsaVerifierOptions`](../interfaces/IEddsaVerifierOptions.md)

#### Returns

`EddsaJwtVerifier`

## Properties

### checkAlgClaim

> **checkAlgClaim**: `boolean`

Defined in: src/lib/Algorithms/Eddsa.ts:193

Whether to check the `alg` claim in the JWT header if it is present.

***

### digestType

> `readonly` **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md)

Defined in: src/lib/Algorithms/Eddsa.ts:195

***

### family

> `readonly` **family**: [`ESigningAlgoFamily`](../../../Constants/enumerations/ESigningAlgoFamily.md) = `cL.ESigningAlgoFamily.EDDSA`

Defined in: src/lib/Algorithms/Eddsa.ts:181

The signing algorithm family.

***

### jwa

> `readonly` **jwa**: [`ESigningJwa`](../../../Constants/enumerations/ESigningJwa.md)

Defined in: src/lib/Algorithms/Eddsa.ts:186

The JWA algorithm name.

## Methods

### validate()

> **validate**(`data`): `boolean`

Defined in: src/lib/Algorithms/Eddsa.ts:208

Validate the provided parse result of a JWT, checking if the JWT is valid.

#### Parameters

##### data

[`IJwtParseResult`](../../../Types/interfaces/IJwtParseResult.md)

#### Returns

`boolean`

Whether the JWT passed the validation.

#### Implementation of

[`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md).[`validate`](../../../Types/interfaces/IJwtValidator.md#validate)
