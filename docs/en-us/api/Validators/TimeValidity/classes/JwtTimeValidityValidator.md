[Documents for @litert/jwt](../../../index.md) / [Validators/TimeValidity](../index.md) / JwtTimeValidityValidator

# Class: JwtTimeValidityValidator

Defined in: [src/lib/Validators/TimeValidity.ts:72](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/TimeValidity.ts#L72)

The JWT time validity validator.

## Example

```ts
import * as LibJWT from '@litert/jwt';
const info = LibJWT.parse(token);
if (!new LibJWT.JwtTimeValidityValidator().validate(info)) {
   throw new Error('Out of the token time validity period.');
}
```

## Implements

- [`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md)

## Constructors

### Constructor

> **new JwtTimeValidityValidator**(`opts?`): `JwtTimeValidityValidator`

Defined in: [src/lib/Validators/TimeValidity.ts:81](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/TimeValidity.ts#L81)

#### Parameters

##### opts?

[`ITimeValidityValidationOptions`](../interfaces/ITimeValidityValidationOptions.md)

#### Returns

`JwtTimeValidityValidator`

## Properties

### name

> `readonly` **name**: `string`

Defined in: [src/lib/Validators/TimeValidity.ts:74](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/TimeValidity.ts#L74)

The name of the validator.

When using with the JwtVerifier class, this name can be used to identify
which validator failed.

#### Implementation of

[`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md).[`name`](../../../Types/interfaces/IJwtValidator.md#name)

## Methods

### validate()

> **validate**(`info`): `void`

Defined in: [src/lib/Validators/TimeValidity.ts:104](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/TimeValidity.ts#L104)

Validates the time validity of a JWT token.

#### Parameters

##### info

[`IJwtParseResult`](../../../Types/interfaces/IJwtParseResult.md)

The JWT token information returned by `parse()` function.

#### Returns

`void`

#### Throws

If the JWT is not valid in terms of time validity.

#### Implementation of

[`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md).[`validate`](../../../Types/interfaces/IJwtValidator.md#validate)
