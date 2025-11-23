[Documents for @litert/jwt](../../../index.md) / [Algorithms/Mldsa](../index.md) / MldsaJwaVerifier

# Class: MldsaJwaVerifier

Defined in: [src/lib/Algorithms/Mldsa.ts:181](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L181)

The signature validator using ML-DSA algorithm, for JWT.

## Example

```ts
import * as LibJWT from '@litert/jwt';
const verifier = new LibJWT.MldsaJwaVerifier({
  publicKey: '-----BEGIN PUBLIC KEY-----\n...',
});
const result = await LibJWT.parse({
  token: '...',
  verifier: verifier,
});
console.log(result);
```

## Implements

- [`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md)

## Constructors

### Constructor

> **new MldsaJwaVerifier**(`opts`): `MldsaJwaVerifier`

Defined in: [src/lib/Algorithms/Mldsa.ts:207](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L207)

#### Parameters

##### opts

[`IMldsaValidatorOptions`](../interfaces/IMldsaValidatorOptions.md)

#### Returns

`MldsaJwaVerifier`

## Properties

### checkAlgClaim

> **checkAlgClaim**: `boolean`

Defined in: [src/lib/Algorithms/Mldsa.ts:200](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L200)

Whether to check the `alg` claim in the JWT header if it is present.

***

### digestType

> `readonly` **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md) = `cL.EDigestType.AUTO`

Defined in: [src/lib/Algorithms/Mldsa.ts:205](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L205)

The digest type to use for verification.

***

### family

> `readonly` **family**: [`ESigningAlgoFamily`](../../../Constants/enumerations/ESigningAlgoFamily.md) = `cL.ESigningAlgoFamily.MLDSA`

Defined in: [src/lib/Algorithms/Mldsa.ts:188](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L188)

The signing algorithm family.

***

### jwa

> `readonly` **jwa**: [`ESigningJwa`](../../../Constants/enumerations/ESigningJwa.md)

Defined in: [src/lib/Algorithms/Mldsa.ts:193](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L193)

The JWA algorithm name.

***

### name

> `readonly` **name**: `string`

Defined in: [src/lib/Algorithms/Mldsa.ts:183](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L183)

The name of the validator.

When using with the JwtVerifier class, this name can be used to identify
which validator failed.

#### Implementation of

[`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md).[`name`](../../../Types/interfaces/IJwtValidator.md#name)

## Methods

### validate()

> **validate**(`data`): `void`

Defined in: [src/lib/Algorithms/Mldsa.ts:219](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Mldsa.ts#L219)

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
