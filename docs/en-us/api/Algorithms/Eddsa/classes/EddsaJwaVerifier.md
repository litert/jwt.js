[Documents for @litert/jwt](../../../index.md) / [Algorithms/Eddsa](../index.md) / EddsaJwaVerifier

# Class: EddsaJwaVerifier

Defined in: [src/lib/Algorithms/Eddsa.ts:183](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Eddsa.ts#L183)

The EdDSA signature validator implementation for JWT.

This validator class checks if the signature is valid.
It neither parses the JWT, nor validates the JWT token claims.

## Example

```ts
import * as LibJWT from '@litert/jwt';
const validator = new LibJWT.EddsaJwaVerifier({
   publicKey: '-----BEGIN PUBLIC KEY-----\n...',
});
const info = LibJWT.parse(token); // Signature is not verified here.
console.log(info.header);
console.log(info.payload);
if (!validator.validate(info)) {
   throw new Error('Invalid signature.');
}
```

## Implements

- [`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md)

## Constructors

### Constructor

> **new EddsaJwaVerifier**(`opts`): `EddsaJwaVerifier`

Defined in: [src/lib/Algorithms/Eddsa.ts:209](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Eddsa.ts#L209)

#### Parameters

##### opts

[`IEddsaValidatorOptions`](../interfaces/IEddsaValidatorOptions.md)

#### Returns

`EddsaJwaVerifier`

## Properties

### checkAlgClaim

> **checkAlgClaim**: `boolean`

Defined in: [src/lib/Algorithms/Eddsa.ts:202](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Eddsa.ts#L202)

Whether to check the `alg` claim in the JWT header if it is present.

***

### digestType

> `readonly` **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md)

Defined in: [src/lib/Algorithms/Eddsa.ts:207](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Eddsa.ts#L207)

The digest type to use for verification.

***

### family

> `readonly` **family**: [`ESigningAlgoFamily`](../../../Constants/enumerations/ESigningAlgoFamily.md) = `cL.ESigningAlgoFamily.EDDSA`

Defined in: [src/lib/Algorithms/Eddsa.ts:190](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Eddsa.ts#L190)

The signing algorithm family.

***

### jwa

> `readonly` **jwa**: [`ESigningJwa`](../../../Constants/enumerations/ESigningJwa.md) = `cL.ESigningJwa.EDDSA`

Defined in: [src/lib/Algorithms/Eddsa.ts:195](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Eddsa.ts#L195)

The JWA algorithm name.

***

### name

> `readonly` **name**: `string`

Defined in: [src/lib/Algorithms/Eddsa.ts:185](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Eddsa.ts#L185)

The name of the validator.

When using with the JwtVerifier class, this name can be used to identify
which validator failed.

#### Implementation of

[`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md).[`name`](../../../Types/interfaces/IJwtValidator.md#name)

## Methods

### validate()

> **validate**(`data`): `void`

Defined in: [src/lib/Algorithms/Eddsa.ts:221](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Eddsa.ts#L221)

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
