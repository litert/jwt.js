[Documents for @litert/jwt](../../../index.md) / [Validators/Subject](../index.md) / JwtSubjectValidator

# Class: JwtSubjectValidator

Defined in: [src/lib/Validators/Subject.ts:71](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/Subject.ts#L71)

The validator to check if the `sub` claim is allowed.

## Example

```ts
import * as LibJwt from '@litert/jwt';
const info = LibJwt.parse(token);

const validator = new LibJwt.JwtSubjectValidator({
    allowlist: [
        'trusted-subject',
        /^https://trusted\.domain/.+$/,
        (sub: string) => sub.endsWith('@trusted.com'),
    ],
});

validator.validate(info);
```

## Implements

- [`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md)

## Constructors

### Constructor

> **new JwtSubjectValidator**(`opts`): `JwtSubjectValidator`

Defined in: [src/lib/Validators/Subject.ts:81](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/Subject.ts#L81)

#### Parameters

##### opts

[`ISubjectValidationOptions`](../interfaces/ISubjectValidationOptions.md)

#### Returns

`JwtSubjectValidator`

## Properties

### name

> `readonly` **name**: `string`

Defined in: [src/lib/Validators/Subject.ts:73](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/Subject.ts#L73)

The name of the validator.

When using with the JwtVerifier class, this name can be used to identify
which validator failed.

#### Implementation of

[`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md).[`name`](../../../Types/interfaces/IJwtValidator.md#name)

## Methods

### validate()

> **validate**(`parsed`): `void`

Defined in: [src/lib/Validators/Subject.ts:99](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/Subject.ts#L99)

Validate the provided parse result of a JWT, checking if the JWT is valid.

#### Parameters

##### parsed

[`IJwtParseResult`](../../../Types/interfaces/IJwtParseResult.md)

#### Returns

`void`

#### Throws

If validation failed or an error occurred inside.

#### Implementation of

[`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md).[`validate`](../../../Types/interfaces/IJwtValidator.md#validate)
