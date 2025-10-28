[Documents for @litert/jwt](../../../index.md) / [ManagedApis/Verifier](../index.md) / JwtVerifier

# Class: JwtVerifier

Defined in: [src/lib/ManagedApis/Verifier.ts:80](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Verifier.ts#L80)

The verifier class to help verifying JWT token step by step, and returning
the information and verification result of the JWT token.

## Extends

- `AbstractJwtVerifier`\<[`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md)\>

## Constructors

### Constructor

> **new JwtVerifier**(`opts`): `JwtVerifier`

Defined in: [src/lib/ManagedApis/Verifier.ts:46](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Verifier.ts#L46)

#### Parameters

##### opts

[`IJwtVerifierOptions`](../interfaces/IJwtVerifierOptions.md)\<[`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md)\>

#### Returns

`JwtVerifier`

#### Inherited from

`AbstractJwtVerifier<dL.IJwtValidator>.constructor`

## Properties

### \_validators

> `protected` `readonly` **\_validators**: [`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md)[]

Defined in: [src/lib/ManagedApis/Verifier.ts:44](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Verifier.ts#L44)

#### Inherited from

`AbstractJwtVerifier._validators`

## Methods

### verify()

> **verify**(`jwt`): [`IJwtParseResult`](../../../Types/interfaces/IJwtParseResult.md)

Defined in: [src/lib/ManagedApis/Verifier.ts:110](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Verifier.ts#L110)

Parse and validate the given JWT token, with the configured list of
validators, one by one, in order.

If fails, an exception will be thrown, indicating which validator
failed in the context.

If it fails during parsing, the `error.context.validator` will be
an empty string, but the `error.origin` will be set to the original error.

#### Parameters

##### jwt

`string`

The JWT token to be verified.

#### Returns

[`IJwtParseResult`](../../../Types/interfaces/IJwtParseResult.md)

Result of the verification.

#### Example

```ts
import { JwtVerifier, HmacJwaVerifier, JwtIssuerValidator } from '@litert/jwt';

const verifier = new JwtVerifier({
    validators: [
        new HmacJwaVerifier({ key: 'test', digestType: EDigestType.SHA256 }),
        new JwtIssuerValidator({ allowlist: ['test'] }),
    ],
});

const result = verifier.verify(token);
```
