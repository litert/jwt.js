[Documents for @litert/jwt](../../../index.md) / [Algorithms/Hmac](../index.md) / HmacJwtVerifier

# Class: HmacJwtVerifier

Defined in: src/lib/Algorithms/Hmac.ts:124

The HMAC signature verifier implementation for JWT.

This verifier class checks if the signature is valid.
It neither parses the JWT, nor validates the JWT token claims.

## Implements

- [`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md)

## Constructors

### Constructor

> **new HmacJwtVerifier**(`opts`): `HmacJwtVerifier`

Defined in: src/lib/Algorithms/Hmac.ts:140

#### Parameters

##### opts

[`IHmacVerifierOptions`](../interfaces/IHmacVerifierOptions.md)

#### Returns

`HmacJwtVerifier`

## Properties

### family

> `readonly` **family**: [`ESigningAlgoFamily`](../../../Constants/enumerations/ESigningAlgoFamily.md) = `cL.ESigningAlgoFamily.HMAC`

Defined in: src/lib/Algorithms/Hmac.ts:129

The signing algorithm family.

***

### jwa

> `readonly` **jwa**: [`ESigningJwa`](../../../Constants/enumerations/ESigningJwa.md)

Defined in: src/lib/Algorithms/Hmac.ts:134

The JWA algorithm name.

## Methods

### validate()

> **validate**(`data`): `boolean`

Defined in: src/lib/Algorithms/Hmac.ts:150

Validate the provided parse result of a JWT, checking if the JWT is valid.

#### Parameters

##### data

[`IJwtParseResult`](../../../Types/interfaces/IJwtParseResult.md)

#### Returns

`boolean`

Whether the JWT passed the validation.

#### Implementation of

[`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md).[`validate`](../../../Types/interfaces/IJwtValidator.md#validate)
