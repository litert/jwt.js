[Documents for @litert/jwt](../../../index.md) / [Algorithms/Hmac](../index.md) / HmacJwaVerifier

# Class: HmacJwaVerifier

Defined in: [src/lib/Algorithms/Hmac.ts:198](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L198)

The HMAC signature validator implementation for JWT.

This validator class checks if the signature is valid.
It neither parses the JWT, nor validates the JWT token claims.

## Example

```ts
import * as LibJWT from '@litert/jwt';
const validator = new LibJWT.HmacJwaVerifier({
   key: 'the-secret-key',
   digestType: LibJWT.EDigestType.SHA256,
});
const info = LibJWT.parse(token); // Signature is not verified here.
if (!validator.validate(info)) {
   throw new Error('Invalid signature.');
}
```

## Implements

- [`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md)

## Constructors

### Constructor

> **new HmacJwaVerifier**(`opts`): `HmacJwaVerifier`

Defined in: [src/lib/Algorithms/Hmac.ts:224](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L224)

#### Parameters

##### opts

[`IHmacValidatorOptions`](../interfaces/IHmacValidatorOptions.md)

#### Returns

`HmacJwaVerifier`

## Properties

### checkAlgClaim

> **checkAlgClaim**: `boolean`

Defined in: [src/lib/Algorithms/Hmac.ts:220](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L220)

Whether to check the `alg` claim in the JWT header if it is present.

***

### digestType

> `readonly` **digestType**: [`EDigestType`](../../../Constants/enumerations/EDigestType.md)

Defined in: [src/lib/Algorithms/Hmac.ts:215](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L215)

The digest type to use for verification.

***

### family

> `readonly` **family**: [`ESigningAlgoFamily`](../../../Constants/enumerations/ESigningAlgoFamily.md) = `cL.ESigningAlgoFamily.HMAC`

Defined in: [src/lib/Algorithms/Hmac.ts:205](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L205)

The signing algorithm family.

***

### jwa

> `readonly` **jwa**: [`ESigningJwa`](../../../Constants/enumerations/ESigningJwa.md)

Defined in: [src/lib/Algorithms/Hmac.ts:210](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L210)

The JWA algorithm name.

***

### name

> `readonly` **name**: `string`

Defined in: [src/lib/Algorithms/Hmac.ts:200](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L200)

The name of the validator.

When using with the JwtVerifier class, this name can be used to identify
which validator failed.

#### Implementation of

[`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md).[`name`](../../../Types/interfaces/IJwtValidator.md#name)

## Methods

### validate()

> **validate**(`data`): `void`

Defined in: [src/lib/Algorithms/Hmac.ts:235](https://github.com/litert/jwt.js/blob/master/src/lib/Algorithms/Hmac.ts#L235)

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
