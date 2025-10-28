[Documents for @litert/jwt](../../../index.md) / [Algorithms/Rsa](../index.md) / RsaJwaVerifier

# Class: RsaJwaVerifier

Defined in: [src/lib/Algorithms/Rsa.ts:294](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L294)

The RSA signature validator implementation for JWT.

This validator class checks if the signature is valid.
It neither parses the JWT, nor validates the JWT token claims.

## Example

```ts
import * as LibJWT from '@litert/jwt';
const validator = new LibJWT.RsaJwaVerifier({
   publicKey: '-----BEGIN PUBLIC KEY-----\n...',
   digestType: LibJWT.EDigestType.SHA256,
});
const info = LibJWT.parse(token); // Signature is not verified here.
const isValid = validator.validate(info);
console.log(isValid);
```

## Implements

- [`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md)

## Constructors

### Constructor

> **new RsaJwaVerifier**(`opts`): `RsaJwaVerifier`

Defined in: [src/lib/Algorithms/Rsa.ts:320](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L320)

#### Parameters

##### opts

[`IRsaValidatorOptions`](../interfaces/IRsaValidatorOptions.md)

#### Returns

`RsaJwaVerifier`

## Properties

### checkAlgClaim

> **checkAlgClaim**: `boolean`

Defined in: [src/lib/Algorithms/Rsa.ts:306](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L306)

Whether to check the `alg` claim in the JWT header if it is present.

***

### digestType

> `readonly` **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md)

Defined in: [src/lib/Algorithms/Rsa.ts:316](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L316)

The digest type to use for verification.

***

### family

> `readonly` **family**: [`ESigningAlgoFamily`](../../../Constants/enumerations/ESigningAlgoFamily.md) = `cL.ESigningAlgoFamily.RSA`

Defined in: [src/lib/Algorithms/Rsa.ts:301](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L301)

The signing algorithm family.

***

### jwa

> `readonly` **jwa**: [`ESigningJwa`](../../../Constants/enumerations/ESigningJwa.md)

Defined in: [src/lib/Algorithms/Rsa.ts:311](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L311)

The JWA algorithm name.

***

### name

> `readonly` **name**: `string`

Defined in: [src/lib/Algorithms/Rsa.ts:296](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L296)

The name of the validator.

When using with the JwtVerifier class, this name can be used to identify
which validator failed.

#### Implementation of

[`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md).[`name`](../../../Types/interfaces/IJwtValidator.md#name)

## Methods

### validate()

> **validate**(`data`): `void`

Defined in: [src/lib/Algorithms/Rsa.ts:338](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Rsa.ts#L338)

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
