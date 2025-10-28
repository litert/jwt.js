[Documents for @litert/jwt](../../../index.md) / [Validators/Audience](../index.md) / JwtAudienceValidator

# Class: JwtAudienceValidator

Defined in: [src/lib/Validators/Audience.ts:71](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/Audience.ts#L71)

The validator to check if the `aud` claim is allowed.

## Example

```ts
import * as LibJwt from '@litert/jwt';
const info = LibJwt.parse(token);

const validator = new LibJwt.JwtAudienceValidator({
    allowlist: [
        'trusted-audience',
        /^https://trusted\.domain/.+$/,
        (aud: string) => aud.endsWith('@trusted.com'),
    ],
});

validator.validate(info);
```

## Implements

- [`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md)

## Constructors

### Constructor

> **new JwtAudienceValidator**(`opts`): `JwtAudienceValidator`

Defined in: [src/lib/Validators/Audience.ts:81](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/Audience.ts#L81)

#### Parameters

##### opts

[`IAudienceValidationOptions`](../interfaces/IAudienceValidationOptions.md)

#### Returns

`JwtAudienceValidator`

## Properties

### name

> `readonly` **name**: `string`

Defined in: [src/lib/Validators/Audience.ts:73](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/Audience.ts#L73)

The name of the validator.

When using with the JwtVerifier class, this name can be used to identify
which validator failed.

#### Implementation of

[`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md).[`name`](../../../Types/interfaces/IJwtValidator.md#name)

## Methods

### validate()

> **validate**(`parsed`): `void`

Defined in: [src/lib/Validators/Audience.ts:99](https://github.com/litert/jwt.js/blob/master/src/lib/Validators/Audience.ts#L99)

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
