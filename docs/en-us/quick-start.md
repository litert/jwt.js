# Quick Start

The `@litert/jwt` library provides two kinds of APIs for signing and verifying JWTs: core APIs and managed APIs.

## Installation

You can install the library via npm:

```sh
npm install @litert/jwt --save
```

## Core APIs

The core APIs are designed for quick and easy usage. They provide a straightforward way to sign and verify JWTs without requiring extensive configuration.

### Signing a JWT

The `stringify()` API is one of the core APIs provided by this library, which is used to sign and generate a JWT string directly.

```ts
import * as JWT from '@litert/jwt';

const signer = new JWT.HmacJwaSigner({
    // example secret, don't use such a weak secret in production
    key: 'hello-world',
    digestType: JWT.EDigestType.SHA256,
});

const jwt = JWT.stringify({
    signer,
    payload: { foo: 'bar' },
});

console.log(jwt);
```

See the [example code](https://github.com/litert/jwt.js/blob/master/src/examples/quick-start-stringify.ts).

### Parsing a JWT

To parse (not verify) a JWT string, you can use the `parse()` API.

The `parse()` API decodes and checks the structure of a JWT string only, without
any other validation or verification, and finally returning its header, payload,
and signature.

```ts
import * as JWT from '@litert/jwt';

const jwtInfo = JWT.parse('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIifQ.QU8SAZfLfKPRp6_vPGyepPtmeotqcn4qezKfSGgrbGw');

console.info(`Header: ${JSON.stringify(jwtInfo.header)}`);
console.info(`Payload: ${JSON.stringify(jwtInfo.payload)}`);

// To verify the signature and content, use a JWA verifier:

const verifier = new JWT.HmacJwaVerifier({
    // example secret, don't use such a weak secret in production
    key: 'hello-world',
    digestType: JWT.EDigestType.SHA256,
});

try {

    verifier.validate(jwtInfo);

    console.info('The JWT is valid.');
}
catch (err) {

    console.error('The JWT is invalid.', err);
}
```

See the [example code](https://github.com/litert/jwt.js/blob/master/src/examples/quick-start-parse.ts).

## Managed APIs

The managed APIs provide complete control flow for signing and verifying JWTs,
allowing you to customize the process with various options and validators.

### Signing a JWT

To sign a JWT using the managed API, you can create a `JwtBuilder` class:

```ts
import * as Jwt from '@litert/jwt';

const signer = new Jwt.HmacJwaSigner({
    key: 'hello-world',
    digestType: Jwt.EDigestType.SHA256,
});

const builder = new Jwt.JwtBuilder({ signer });

const token = builder
    .setIssuer('my-issuer')
    .setSubject('my-subject')
    .setAudience('my-audience')
    .setExpiration(Math.floor(Date.now() / 1000) + 3600) // 1 hour from now
    .setNotBefore(Math.floor(Date.now() / 1000)) // valid from now
    .setIssuedAt(Math.floor(Date.now() / 1000)) // issued at now
    .setJwtId('unique-jwt-id-12345')
    .setPayloadClaim('custom-claim', 'custom-value')
    .build();

console.log('Generated JWT:', token);
```

See the [example code](https://github.com/litert/jwt.js/blob/master/src/examples/quick-start-builder.ts).

### Verifying a JWT

To verify a JWT using the managed API, you can create a `JwtVerifier` instance:

```ts
import * as Jwt from '@litert/jwt';

const hmacVerifier = new Jwt.HmacJwaVerifier({
    key: 'hello-world',
    digestType: Jwt.EDigestType.SHA256,
});

const verifier = new Jwt.JwtVerifier({
    validators: [
        new Jwt.JwtIssuerValidator({ allowlist: ['my-issuer'] }),
        new Jwt.JwtAudienceValidator({ allowlist: ['my-audience'] }),
        new Jwt.JwtTimeValidityValidator(),
        hmacVerifier,
    ],
});

try {

    const result = verifier.verify(token);

    console.log('JWT is valid');
    console.log('Header:', result.header);
    console.log('Payload:', result.payload);
}
catch (err) {

    console.error('JWT is invalid:', err);
}
```

See the [example code](https://github.com/litert/jwt.js/blob/master/src/examples/quick-start-verifier.ts).
