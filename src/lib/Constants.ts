/**
 * Copyright 2025 Angus.Fenying <fenying@litert.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The header claims defined by the JWT specification.
 *
 * @link https://datatracker.ietf.org/doc/html/rfc7519#section-5
 */
export enum EStdHeaderClaim {

    /**
     * The algorithm used for signing the JWT.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.1
     */
    ALGORITHM = 'alg',

    /**
     * The type of the token.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.9
     */
    TYPE = 'typ',

    /**
     * The content type of the JWT payload.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.10
     */
    CONTENT_TYPE = 'cty',

    /**
     * The key ID used to sign the JWT.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.4
     */
    KEY_ID = 'kid',

    /**
     * The URL of the JSON Web Key Set (JWKS) document that contains the
     * public key used to verify the JWT signature.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.2
     */
    JWK_URL = 'jku',

    /**
     * The JSON Web Key (JWK) that contains the public key used to verify
     * the JWT signature.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.3
     */
    JWK = 'jwk',

    /**
     * The X.509 URL pointing to the certificate or certificate chain
     * used to verify the JWT signature.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.5
     */
    X509_CERT_URL = 'x5u',

    /**
     * The X.509 certificate chain used to verify the JWT signature.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.6
     */
    X509_CERT_CHAIN = 'x5c',

    /**
     * The X.509 certificate thumbprint. (SHA-1 hash of the DER-encoded
     * certificate)
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.7
     */
    X509_CERT_THUMBPRINT_SHA1 = 'x5t',

    /**
     * The X.509 certificate SHA-256 thumbprint. (SHA-256 hash of the DER-encoded
     * certificate)
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.8
     */
    X509_CERT_THUMBPRINT_SHA256 = 'x5t#S256',

    /**
     * Indicates that the header contains critical claims that must be
     * understood and processed.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.11
     */
    CRITICAL_CLAIMS = 'crit',
}

export const STANDARD_HEADER_CLAIMS = Object.values(EStdHeaderClaim) as readonly string[];

/**
 * The payload claims defined by the JWT specification.
 *
 * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1
 */
export enum EStdPayloadClaim {

    /**
     * The issuer of the JWT.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.1
     */
    ISSUER = 'iss',

    /**
     * The subject of the JWT.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.2
     */
    SUBJECT = 'sub',

    /**
     * The audience for which the JWT is intended.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.3
     */
    AUDIENCE = 'aud',

    /**
     * The expiration time of the JWT (as a Unix timestamp).
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4
     */
    EXPIRATION_TIME = 'exp',

    /**
     * The time before which the JWT must not be accepted for processing
     * (as a Unix timestamp).
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.5
     */
    NOT_BEFORE = 'nbf',

    /**
     * The time at which the JWT was issued (as a Unix timestamp).
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.6
     */
    ISSUED_AT = 'iat',

    /**
     * The unique identifier for the JWT.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.7
     */
    JWT_ID = 'jti',
}

/**
 * The families of the signing algorithms supported by the library.
 */
export enum ESigningAlgoFamily {

    /**
     * Use the RSA algorithm for signing.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7518#section-3.3
     * @link https://datatracker.ietf.org/doc/html/rfc7518#section-3.5
     */
    RSA,

    /**
     * Use the HMAC-SHA2 algorithm for signing.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7518#section-3.2
     */
    HMAC,

    /**
     * Use the ECDSA algorithm for signing.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7518#section-3.4
     */
    ECDSA,

    /**
     * Use the EdDSA algorithm for signing.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc8037#section-3.1
     * @link https://datatracker.ietf.org/doc/html/rfc8037#appendix-A.4
     */
    EDDSA,

    /**
     * @link https://datatracker.ietf.org/doc/html/draft-chen-sm2-sm3-algorithms-04#section-3.1.1
     *
     * @todo Not implemented yet.
     */
    // SM2
}

/**
 * The JWA algorithms for signing JWTs, using in the `alg` claim.
 */
export enum ESigningJwa {

    /**
     * RSASSA-PKCS1-v1_5 using SHA-256 hash algorithm.
     */
    RS256 = 'RS256',

    /**
     * RSASSA-PKCS1-v1_5 using SHA-384 hash algorithm.
     */
    RS384 = 'RS384',

    /**
     * RSASSA-PKCS1-v1_5 using SHA-512 hash algorithm.
     */
    RS512 = 'RS512',

    /**
     * RSASSA-PSS using SHA-256 hash algorithm.
     */
    PS256 = 'PS256',

    /**
     * RSASSA-PSS using SHA-384 hash algorithm.
     */
    PS384 = 'PS384',

    /**
     * RSASSA-PSS using SHA-512 hash algorithm.
     */
    PS512 = 'PS512',

    /**
     * HMAC using SHA-256 hash algorithm.
     */
    HS256 = 'HS256',

    /**
     * HMAC using SHA-384 hash algorithm.
     */
    HS384 = 'HS384',

    /**
     * HMAC using SHA-512 hash algorithm.
     */
    HS512 = 'HS512',

    /**
     * ECDSA using `P-256` (also known as `secp256r1`) curve and SHA-256 digest
     * algorithm.
     */
    ES256 = 'ES256',

    /**
     * ECDSA using `secp256k1` curve and SHA-256 digest algorithm.
     */
    ES256K = 'ES256K',

    /**
     * ECDSA using `P-384` (also known as `secp384r1`) curve and SHA-384 digest
     * algorithm.
     */
    ES384 = 'ES384',

    /**
     * ECDSA using `P-521` (also known as `secp521r1`) curve and SHA-512 digest
     * algorithm.
     */
    ES512 = 'ES512',

    /**
     * EdDSA (Edwards-curve Digital Signature Algorithm) using curves like
     * `Ed25519`, `Ed448`.
     */
    EDDSA = 'EdDSA',

    /**
     * SM2 signature algorithm with SM3 hash algorithm.
     *
     * @link https://datatracker.ietf.org/doc/html/draft-chen-sm2-sm3-algorithms-04#section-3.1.1
     * @todo Not implemented yet.
     */
    // SM2SM3 = 'SM2SM3',
}

/**
 * The digest algorithms supported by the library.
 */
export enum EDigestType {

    /**
     * SHA-2 256 bits digest algorithm.
     */
    SHA256 = 'sha256',

    /**
     * SHA-2 384 bits digest algorithm.
     */
    SHA384 = 'sha384',

    /**
     * SHA-2 512 bits digest algorithm.
     */
    SHA512 = 'sha512',

    /**
     * SHAKE-256 digest algorithm.
     *
     * NOTE: This digest algorithm is only for Ed448 in EdDSA signing,
     * don't use it for other purposes.
     */
    SHAKE256 = 'shake256',
}
