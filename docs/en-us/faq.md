# FAQ

## Why this library?

Simple.

## What are the requirements about keys for different algorithms?

Here are the key requirements for different algorithms supported by this library:

JWA Algorithm | Key Type               | Key Format           | Key Size (recommended)
--------------|------------------------|----------------------|------------
`HS256`       | Symmetric Key          | String or Buffer     | 256 bits (32 bytes) or longer
`HS384`       | Symmetric Key          | String or Buffer     | 384 bits (48 bytes) or longer
`HS512`       | Symmetric Key          | String or Buffer     | 512 bits (64 bytes) or longer
`RS256`       | RSA Public/Private Key | PEM or DER encoded PKCS#1 or PKCS#8, **without hardcoded PSS padding options** | 2048 bits or larger
`RS384`       | RSA Public/Private Key | PEM or DER encoded PKCS#1 or PKCS#8, **without hardcoded PSS padding options** | 2048 bits or larger
`RS512`       | RSA Public/Private Key | PEM or DER encoded PKCS#1 or PKCS#8, **without hardcoded PSS padding options** | 2048 bits or larger
`PS256`       | RSA Public/Private Key | PEM or DER encoded PKCS#1 or PKCS#8 | 2048 bits or larger
`PS384`       | RSA Public/Private Key | PEM or DER encoded PKCS#1 or PKCS#8 | 2048 bits or larger
`PS512`       | RSA Public/Private Key | PEM or DER encoded PKCS#1 or PKCS#8 | 2048 bits or larger
`ES256`       | EC Public/Private Key  | PEM or DER encoded SEC1 or PKCS#8, using `P-256` curve (`prime256v1`, 256 bits) | N/A
`ES384`       | EC Public/Private Key  | PEM or DER encoded SEC1 or PKCS#8, using `P-384` curve (`secp384r1`, 384 bits) | N/A
`ES512`       | EC Public/Private Key  | PEM or DER encoded SEC1 or PKCS#8, using `P-521` curve (`secp521r1`, 521 bits) | N/A
`ES256K`      | EC Public/Private Key  | PEM or DER encoded SEC1 or PKCS#8, using `secp256k1` curve (256 bits) | N/A
`EdDSA`      | EdDSA Public/Private Key | PEM or DER encoded PKCS#8, only `Ed25519` or `Ed448` are supported | N/A
`ML-DSA-44`  | ML-DSA Public/Private Key | PEM or DER encoded PKCS#8, using `ML-DSA-44` | N/A
`ML-DSA-65`  | ML-DSA Public/Private Key | PEM or DER encoded PKCS#8, using `ML-DSA-65` | N/A
`ML-DSA-87`  | ML-DSA Public/Private Key | PEM or DER encoded PKCS#8, using `ML-DSA-87` | N/A

## How to use RSA-PSS with this library?

Before using RSA-PSS (.e.g `PS255`), you need to understand that RSA-PSS is a signature scheme.

To use RSA-PSS, some extra parameters (like salt length) need to be set during
both signing and verification.

> Don't worry, this library will handle this automatically.

There are two ways to use RSA-PSS:

- Use a normal RSA key pair, and explicitly specify using RSA-PSS padding.
- Use a RSA-PSS key pair, which is specifically generated for RSA-PSS,
    with RSA-PSS padding parameters embedded in the key structure.

    > In ASN.1 notation, there are two kinds of RSA keys:
    > - RSAPublicKey / RSAPrivateKey: for PKCS#1 v1.5 signatures, using OID `1.2.840.113549.1.1.1`
    > - RSAPSSPublicKey / RSAPSSPrivateKey: for RSA-PSS signatures, using OID `1.2.840.113549.1.1.10`

So, you could either use a normal RSA key pair with RSA-PSS padding parameters
specified, or use a RSA-PSS key pair directly.

In this library, both ways are supported:

- If you're using a normal RSA key pair, you can set `usePssPadding` to `true`
  in the `RsaJwtSigner` or `RsaJwaVerifier` constructor options.

- If you're using a RSA-PSS key pair, you can just use it directly without
  setting `usePssPadding`, as the library will detect the key type automatically.

    > Note: You can not use a RSA-PSS key pair with PKCS#1 v1.5 padding.
    > If you try to use a RSA-PSS key pair but setting `usePssPadding` to `false`,
    > an error will be thrown.

## Why separate the decoding and verification steps?

In this library, the decoding and verification steps of `JWT` are separated into
`parse()` and signature verifier classes, unlike some other libraries that
use a single function to both decode and verify a `JWT`.

Before talking about the reasons for this design choice, it's important to
understand that this library provides low-level API (core API) and high-level API
(managed API). The core API is designed for users who need to have full
control over the JWT processing, while the managed API is for users who want
a simpler interface with sensible defaults.

So, actually, if you wanna use a single function to decode and verify a `JWT`,
you can use the managed API, which provides such functionality out of the box.

Now, coming back to the reasons for separating the decoding and verification
steps in the core API:

The `parse()` API is designed to decode a `JWT` without signature verification.
This allows users to inspect the contents of the `JWT` (header and claims)
before deciding whether to verify its signature.

This is particularly useful when:

- Customizable Flow Control

    For example, users may need to:
    - fetch the appropriate verification key based on the `kid` claim (or `x5u` claim)
    - use correct algorithm for verification based on the `alg` claim
    - quick check `exp` and `nbf` claims before signature verification

    If only one function is provided to decode and verify a `JWT`,
    many hooks would be needed to achieve the same level of customization.

- Testable

    Separating decoding and verification makes it easier to write unit tests
    for each step independently.

## How to use .der encoded keys with this library?

The .der file is a binary file that contains the key data in DER (Distinguished Encoding Rules) format. Actually, the .pem file is just a base64-encoded representation of the DER data, with additional header and footer lines, which called envelope.

The real difference between .der and .pem files, is that the envelope in .pem files
helps to identify the key type and format, but .der files lack this information.

That's why, when using .der encoded keys with this library, you need to explicitly specify the key type and format, so that the library can correctly parse and use the key.

In this library, when you provide a .der encoded key (as a Buffer or Uint8Array), you need to use `createPrivateKey()` or `createPublicKey()` functions from `node:crypto` module
to create a `KeyObject`, and specify the `type` and `format` options accordingly.

For example, if you have a DER-encoded PKCS#8 private key and a DER-encoded SPKI public key, you can do it like this:

```ts
import * as NodeCrypto from 'node:crypto';
import * as JWT from '@litert/jwt';

const signer = new JWT.RsaJwaSigner({
    'privateKey': NodeCrypto.createPrivateKey({
        'key': derEncodedPrivateKey,
        'format': 'der',
        'type': 'pkcs8',
    }),
    'digestType': JWT.EDigestType.SHA256,
});

const verifier = new JWT.RsaJwaVerifier({
    'publicKey': NodeCrypto.createPublicKey({
        'key': derEncodedPublicKey,
        'format': 'der',
        'type': 'spki',
    }),
    'digestType': JWT.EDigestType.SHA256,
});
```

## How to use ML-DSA algorithms with this library?

ML-DSA (Multi-Layered Digital Signature Algorithm) is a post-quantum signature algorithm that provides enhanced security against quantum attacks.
This library supports ML-DSA algorithms `ML-DSA-44`, `ML-DSA-65`, and `ML-DSA-87` for signing and verifying JWTs.

> Click to see more details about ML-DSA: [ML-DSA on IETF](https://www.ietf.org/archive/id/draft-salter-lamps-cms-ml-dsa-00.html).

To use ML-DSA algorithms with this library, you need to generate an ML-DSA key pair first.

```sh
# Using OpenSSL with ML-DSA support, generate an ML-DSA-44 key pair
openssl genpkey -algorithm ML-DSA-44 -out ml-dsa-private-key.pem
openssl pkey -in ml-dsa-private-key.pem -pubout -out ml-dsa-public-key.pem
```

> Of course you can also use `node:crypto` module to generate ML-DSA key pairs programmatically, here is an example:
>
> ```ts
> import * as NodeCrypto from 'node:crypto';
> const { privateKey, publicKey } = crypto.generateKeyPairSync('ml-dsa-44', {
>     publicKeyEncoding: {
>         type: 'spki',
>         format: 'pem'
>     },
>     privateKeyEncoding: {
>         type: 'pkcs8',
>         format: 'pem'
>     }
> });
> ```
>
> Here you got `privateKey` and `publicKey` in PEM format.

After generating key pairs, you can use `MldsaJwaSigner` class to sign and verify JWTs:

```ts
import * as LibJwt from '@litert/jwt';
import * as NodeFS from 'node:fs';

const signer = new LibJwt.MldsaJwaSigner({
    'privateKey': NodeFS.readFileSync('ml-dsa-44.pem', 'utf-8'),
    'keyId': 'my-key-id'
});

const token = LibJwt.stringify({
    'header': {
        'alg': signer.jwa,
        'kid': signer.keyId ?? undefined
    },
    'payload': {
        'sub': '1234567890',
        'name': 'John Doe',
        'iat': 1516239022
    },
    'signer': signer
});

console.log(`Token: ${token}`);
```

Or decode and verify the JWT using `MldsaJwaVerifier` class:

```ts
import * as LibJwt from '@litert/jwt';
import * as NodeFS from 'node:fs';

const verifier = new LibJwt.MldsaJwaVerifier({
    'publicKey': NodeFS.readFileSync('ml-dsa-44.pub', 'utf-8')
});

const result = LibJwt.parse(token);

verifier.validate(result);

console.log(result);
```
