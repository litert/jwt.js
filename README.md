# LiteRT/JWT

[![Strict TypeScript Checked](https://badgen.net/badge/icon/typescript?icon=typescript&label "Strict TypeScript Checked")](https://www.typescriptlang.org)
[![npm version](https://img.shields.io/npm/v/@litert/jwt.svg?colorB=brightgreen)](https://www.npmjs.com/package/@litert/jwt "Stable Version")
[![License](https://img.shields.io/npm/l/@litert/jwt.svg?maxAge=2592000?style=plastic)](https://github.com/litert/jwt/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/litert/jwt.js.svg)](https://github.com/litert/jwt.js/issues)
[![GitHub Releases](https://img.shields.io/github/release/litert/jwt.js.svg)](https://github.com/litert/jwt.js/releases "Stable Release")

The JWT (JSON Web Token) implementation library written in TypeScript, for Node.js.

> By now, this library only supports JWT with JWS (JSON Web Signature).

## Installation

```sh
npm i @litert/jwt --save
```

## Features

- ✔️ All mainly signing JWA algorithms are supported。

    RSA       | HMAC      | ECDSA      | EdDSA       | ML-DAS
    :--------:|:---------:|:----------:|:-----------:|:---------:
    ![RS256](https://badgen.net/badge/alg/RS256?color=green) | ![HS256](https://badgen.net/badge/alg/HS256?color=green) | ![ES256](https://badgen.net/badge/alg/ES256?color=green)  | ![Ed25519](https://badgen.net/badge/curve/Ed25519?color=green) | ![ML-DSA-44](https://badgen.net/badge/alg/ML-DSA-44?color=green)
    ![RS384](https://badgen.net/badge/alg/RS384?color=green) | ![HS384](https://badgen.net/badge/alg/HS384?color=green) | ![ES384](https://badgen.net/badge/alg/ES384?color=green)  | ![Ed448](https://badgen.net/badge/curve/Ed448?color=green) | ![ML-DSA-65](https://badgen.net/badge/alg/ML-DSA-65?color=green)
    ![RS512](https://badgen.net/badge/alg/RS512?color=green) | ![HS512](https://badgen.net/badge/alg/HS512?color=green) | ![ES512](https://badgen.net/badge/alg/ES512?color=green)  | | ![ML-DSA-87](https://badgen.net/badge/alg/ML-DSA-87?color=green)
    ![PS256](https://badgen.net/badge/alg/PS256?color=green) |           | ![ES256K](https://badgen.net/badge/alg/ES256K?color=green) |
    ![PS384](https://badgen.net/badge/alg/PS384?color=green) |
    ![PS512](https://badgen.net/badge/alg/PS512?color=green) |

    > ML-DSA only supported in Node.js v24.6.0 or newer.

- ✔️ Signing and verifying JWTs

    There are two kinds of APIs for signing and verifying JWTs:

    - Core APIs

        - [`function stringify()`](./src/examples/quick-start-stringify.ts)

            Sign and generate a JWT string directly.

        - [`function parse()`](./src/examples/quick-start-parse.ts)

            Parse a JWT string, without verifying it.

    - Managed APIs

        - [`class JwtBuilder`](./src/examples/quick-start-builder.ts)

            A builder class for signing and generating JWTs, providing rich methods to customize the JWT contents.

        - [`class JwtVerifier`](./src/examples/quick-start-verifier.ts)

            A verifier class for parsing and verifying JWTs.

## Requirements

- Node.js v18.x (Or newer)
- TypeScript v5.1.x (Or newer)

## Documents

- [en-US](https://litert.org/projects/jwt.js/)

    - [Quick Start](https://litert.org/projects/jwt.js/guides/quick-start.html)
    - [FAQ](https://litert.org/projects/jwt.js/guides/faq.html)
    - [API Reference](https://litert.org/projects/jwt.js/api/)

## License

This library is published under [Apache-2.0](./LICENSE) license.
