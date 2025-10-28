[Documents for @litert/jwt](../../../index.md) / [ManagedApis/Verifier](../index.md) / JwtAsyncVerifier

# Class: JwtAsyncVerifier

Defined in: [src/lib/ManagedApis/Verifier.ts:167](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Verifier.ts#L167)

The asynchronous verifier class to help verifying JWT token step by step,
and returning the information and verification result of the JWT token.

## Extends

- `AbstractJwtVerifier`\<[`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md) \| [`IJwtAsyncValidator`](../../../Types/interfaces/IJwtAsyncValidator.md)\>

## Constructors

### Constructor

> **new JwtAsyncVerifier**(`opts`): `JwtAsyncVerifier`

Defined in: [src/lib/ManagedApis/Verifier.ts:46](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Verifier.ts#L46)

#### Parameters

##### opts

[`IJwtVerifierOptions`](../interfaces/IJwtVerifierOptions.md)\<[`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md) \| [`IJwtAsyncValidator`](../../../Types/interfaces/IJwtAsyncValidator.md)\>

#### Returns

`JwtAsyncVerifier`

#### Inherited from

AbstractJwtVerifier\<dL.IJwtValidator \| dL.IJwtAsyncValidator\>.constructor

## Properties

### \_validators

> `protected` `readonly` **\_validators**: ([`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md) \| [`IJwtAsyncValidator`](../../../Types/interfaces/IJwtAsyncValidator.md))[]

Defined in: [src/lib/ManagedApis/Verifier.ts:44](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Verifier.ts#L44)

#### Inherited from

`AbstractJwtVerifier._validators`

## Methods

### verify()

> **verify**(`jwt`): `Promise`\<[`IJwtParseResult`](../../../Types/interfaces/IJwtParseResult.md)\>

Defined in: [src/lib/ManagedApis/Verifier.ts:197](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Verifier.ts#L197)

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

`Promise`\<[`IJwtParseResult`](../../../Types/interfaces/IJwtParseResult.md)\>

Result of the verification.

#### Example

```ts
import { JwtAsyncVerifier, HmacJwaVerifier, JwtIssuerValidator } from '@litert/jwt';

const verifier = new JwtAsyncVerifier({
    validators: [
        new HmacJwaVerifier({ key: 'test', digestType: EDigestType.SHA256 }),
        new JwtIssuerValidator({ allowlist: ['test'] }),
    ],
});

const result = await verifier.verify(token);
```
