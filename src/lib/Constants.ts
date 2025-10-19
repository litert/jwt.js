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
 * The families of the signing algorithms supported by the library.
 */
export enum ESigningAlgoFamily {

    /**
     * Use the RSA algorithm for signing.
     *
     * @see https://datatracker.ietf.org/doc/html/rfc7518#section-3.3
     * @see https://datatracker.ietf.org/doc/html/rfc7518#section-3.5
     */
    RSA,

    /**
     * Use the HMAC-SHA2 algorithm for signing.
     *
     * @see https://datatracker.ietf.org/doc/html/rfc7518#section-3.2
     */
    HMAC,

    /**
     * Use the ECDSA algorithm for signing.
     *
     * @see https://datatracker.ietf.org/doc/html/rfc7518#section-3.4
     */
    ECDSA,

    /**
     * Use the EdDSA algorithm for signing.
     *
     * @see https://datatracker.ietf.org/doc/html/rfc8037#section-3.1
     * @see https://datatracker.ietf.org/doc/html/rfc8037#appendix-A.4
     */
    EDDSA,

    /**
     * @see https://datatracker.ietf.org/doc/html/draft-chen-sm2-sm3-algorithms-04#section-3.1.1
     *
     * @todo Not implemented yet.
     */
    // SM2
}

/**
 * The JWA algorithms for signing JWTs, using in the `alg` field.
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
     */
    SHAKE256 = 'shake256',
}
