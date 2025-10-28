[Documents for @litert/jwt](../../../index.md) / [ManagedApis/Verifier](../index.md) / IJwtVerifierOptions

# Interface: IJwtVerifierOptions\<T\>

Defined in: [src/lib/ManagedApis/Verifier.ts:25](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Verifier.ts#L25)

The options for JWT verifier.

## Type Parameters

### T

`T` *extends* [`IJwtValidator`](../../../Types/interfaces/IJwtValidator.md) \| [`IJwtAsyncValidator`](../../../Types/interfaces/IJwtAsyncValidator.md)

## Properties

### validators

> **validators**: `T`[]

Defined in: [src/lib/ManagedApis/Verifier.ts:39](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Verifier.ts#L39)

The list of validators to be used during verification.

Each validator will be executed in the order they are provided,
once a validator fails, the verification process will stop.

When the verification fails, the `error.context.validator` will be
set to the name of the validator that failed.

If empty, an exception will be thrown during the construction of
the verifier.
