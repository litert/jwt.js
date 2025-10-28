[Documents for @litert/jwt](../../../index.md) / [Algorithms/Ecdsa](../index.md) / EcdsaJwaVerifier

# Class: EcdsaJwaVerifier

Defined in: [src/lib/Algorithms/Ecdsa.ts:205](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L205)

The ECDSA signature validator implementation for JWT.

This validator class checks if the signature is valid.
It neither parses the JWT, nor validates the JWT token claims.

## Example

```ts
import * as LibJWT from '@litert/jwt';
const validator = new LibJWT.EcdsaJwaVerifier({
   publicKey: '-----BEGIN PUBLIC KEY-----\n...',
});
const info = LibJWT.parse(token); // Signature is not verified here.
const isValid = validator.validate(info);
if (!isValid) {
   throw new Error('Invalid signature');
}
```

## Implements

- [`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md)

## Constructors

### Constructor

> **new EcdsaJwaVerifier**(`opts`): `EcdsaJwaVerifier`

Defined in: [src/lib/Algorithms/Ecdsa.ts:231](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L231)

#### Parameters

##### opts

[`IEcdsaValidatorOptions`](../interfaces/IEcdsaValidatorOptions.md)

#### Returns

`EcdsaJwaVerifier`

## Properties

### checkAlgClaim

> **checkAlgClaim**: `boolean`

Defined in: [src/lib/Algorithms/Ecdsa.ts:217](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L217)

Whether to check the `alg` claim in the JWT header if it is present.

***

### digestType

> `readonly` **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md)

Defined in: [src/lib/Algorithms/Ecdsa.ts:227](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L227)

The digest type to use for verification.

***

### family

> `readonly` **family**: [`ESigningAlgoFamily`](../../../Constants/enumerations/ESigningAlgoFamily.md) = `cL.ESigningAlgoFamily.ECDSA`

Defined in: [src/lib/Algorithms/Ecdsa.ts:212](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L212)

The signing algorithm family.

***

### jwa

> `readonly` **jwa**: [`ESigningJwa`](../../../Constants/enumerations/ESigningJwa.md)

Defined in: [src/lib/Algorithms/Ecdsa.ts:222](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L222)

The JWA algorithm name.

***

### name

> `readonly` **name**: `string`

Defined in: [src/lib/Algorithms/Ecdsa.ts:207](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L207)

The name of the validator.

When using with the JwtVerifier class, this name can be used to identify
which validator failed.

#### Implementation of

[`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md).[`name`](../../../Types/interfaces/IJwtValidator.md#name)

## Methods

### validate()

> **validate**(`data`): `void`

Defined in: [src/lib/Algorithms/Ecdsa.ts:249](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Ecdsa.ts#L249)

Validate the provided parse result of a JWT, checking if the JWT is valid.

#### Parameters

##### data

[`IJwtParseResult`](../../../Types/interfaces/IJwtParseResult.md)

#### Returns

`void`

#### Throws

If validation failed or an error occurred inside.

#### Implementation of

[`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md).[`validate`](../../../Types/interfaces/IJwtValidator.md#validate)
