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

import type * as cL from './Constants';
import type * as uT from '@litert/utils-ts-types';

/**
 * The structure of JWT Header.
 */
export interface IJwtHeader {

    /**
     * The "alg" (algorithm) Header Parameter identifies the cryptographic
     * algorithm used to secure the JWS.  The JWS Signature value is not
     * valid if the "alg" value does not represent a supported algorithm or
     * if there is not a key for use with that algorithm associated with the
     * party that digitally signed or MACed the content.  "alg" values
     * should either be registered in the IANA "JSON Web Signature and
     * Encryption Algorithms" registry established by JWA or be a value
     * that contains a Collision-Resistant Name.  The "alg" value is a case-
     * sensitive ASCII string containing a StringOrURI value.  This Header
     * Parameter MUST be present and MUST be understood and processed by
     * implementations.
     *
     * A list of defined "alg" values for this use can be found in the IANA
     * "JSON Web Signature and Encryption Algorithms" registry established
     * by JWA; the initial contents of this registry are the values
     * defined in Section 3.1 of JWA.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.1
     * @required
     */
    'alg': `${'HS' | 'RS' | 'PS' | 'ES'}${'256' | '384' | '512'}` | 'EdDSA' | 'ES256K';

    /**
     * The "typ" (type) Header Parameter defined by JWS and JWE is used
     * by JWT applications to declare the media type IANA.MediaTypes of
     * this complete JWT.  This is intended for use by the JWT application
     * when values that are not JWTs could also be present in an application
     * data structure that can contain a JWT object; the application can use
     * this value to disambiguate among the different kinds of objects that
     * might be present.  It will typically not be used by applications when
     * it is already known that the object is a JWT.  This parameter is
     * ignored by JWT implementations; any processing of this parameter is
     * performed by the JWT application.  If present, it is RECOMMENDED that
     * its value be "JWT" to indicate that this object is a JWT.  While
     * media type names are not case sensitive, it is RECOMMENDED that "JWT"
     * always be spelled using uppercase characters for compatibility with
     * legacy implementations.  Use of this Header Parameter is OPTIONAL.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.9
     * @recommended
     * @optional
     */
    'typ'?: 'JWT';

    /**
     * The "jku" (JWK Set URL) Header Parameter is a URI [RFC3986] that
     * refers to a resource for a set of JSON-encoded public keys, one of
     * which corresponds to the key used to digitally sign the JWS.  The
     * keys MUST be encoded as a JWK Set [JWK].  The protocol used to
     * acquire the resource MUST provide integrity protection; an HTTP GET
     * request to retrieve the JWK Set MUST use Transport Layer Security
     * (TLS) [RFC2818] [RFC5246]; and the identity of the server MUST be
     * validated, as per Section 6 of RFC 6125 [RFC6125].  Also, see
     * Section 8 on TLS requirements.  Use of this Header Parameter is
     * OPTIONAL.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.2
     * @optional
     */
    'jku'?: string;

    /**
     * The "jwk" (JSON Web Key) Header Parameter is the public key that
     * corresponds to the key used to digitally sign the JWS.  This key is
     * represented as a JSON Web Key [JWK].  Use of this Header Parameter is
     * OPTIONAL.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.3
     * @optional
     */
    'jwk'?: string;

    /**
     * The "cty" (content type) Header Parameter defined by [JWS] and [JWE]
     * is used by this specification to convey structural information about
     * the JWT.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-5.2
     * @optional
     */
    'cty'?: 'JWT';

    /**
     * The "x5t" (X.509 certificate SHA-1 thumbprint) Header Parameter is a
     * base64url-encoded SHA-1 thumbprint (a.k.a. digest) of the DER
     * encoding of the X.509 certificate [RFC5280] corresponding to the key
     * used to digitally sign the JWS.  Note that certificate thumbprints
     * are also sometimes known as certificate fingerprints.  Use of this
     * Header Parameter is OPTIONAL.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.7
     * @optional
     */
    'x5t'?: string;

    /**
     * The "x5t#S256" (X.509 certificate SHA-256 thumbprint) Header
     * Parameter is a base64url-encoded SHA-256 thumbprint (a.k.a. digest)
     * of the DER encoding of the X.509 certificate [RFC5280] corresponding
     * to the key used to digitally sign the JWS.  Note that certificate
     * thumbprints are also sometimes known as certificate fingerprints.
     * Use of this Header Parameter is OPTIONAL.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.8
     * @optional
     */
    ['x5t#S256']?: string;

    /**
     * The "x5c" (X.509 certificate chain) Header Parameter contains the
     * X.509 public key certificate or certificate chain [RFC5280]
     * corresponding to the key used to digitally sign the JWS.  The
     * certificate or certificate chain is represented as a JSON array of
     * certificate value strings.  Each string in the array is a
     * base64-encoded (Section 4 of [RFC4648] -- not base64url-encoded) DER
     * [ITU.X690.2008] PKIX certificate value.  The certificate containing
     * the public key corresponding to the key used to digitally sign the
     * JWS MUST be the first certificate.  This MAY be followed by
     * additional certificates, with each subsequent certificate being the
     * one used to certify the previous one.  The recipient MUST validate
     * the certificate chain according to RFC 5280 [RFC5280] and consider
     * the certificate or certificate chain to be invalid if any validation
     * failure occurs.  Use of this Header Parameter is OPTIONAL.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.6
     * @optional
     */
    'x5c'?: string[];

    /**
     * The "x5u" (X.509 URL) Header Parameter is a URI [RFC3986] that refers
     * to a resource for the X.509 public key certificate or certificate
     * chain [RFC5280] corresponding to the key used to digitally sign the
     * JWS.  The identified resource MUST provide a representation of the
     * certificate or certificate chain that conforms to RFC 5280 [RFC5280]
     * in PEM-encoded form, with each certificate delimited as specified in
     * Section 6.1 of RFC 4945 [RFC4945].  The certificate containing the
     * public key corresponding to the key used to digitally sign the JWS
     * MUST be the first certificate.  This MAY be followed by additional
     * certificates, with each subsequent certificate being the one used to
     * certify the previous one.  The protocol used to acquire the resource
     * MUST provide integrity protection; an HTTP GET request to retrieve
     * the certificate MUST use TLS [RFC2818] [RFC5246]; and the identity of
     * the server MUST be validated, as per Section 6 of RFC 6125 [RFC6125].
     * Also, see Section 8 on TLS requirements.  Use of this Header
     * Parameter is OPTIONAL.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.5
     * @optional
     */
    'x5u'?: string;

    /**
     * The "kid" (key ID) Header Parameter is a hint indicating which key
     * was used to secure the JWS.  This parameter allows originators to
     * explicitly signal a change of key to recipients.  The structure of
     * the "kid" value is unspecified.  Its value MUST be a case-sensitive
     * string.  Use of this Header Parameter is OPTIONAL.
     *
     * When used with a JWK, the "kid" value is used to match a JWK "kid"
     * parameter value.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.4
     * @optional
     */
    'kid'?: string;

    /**
     * The "crit" (critical) Header Parameter indicates that extensions to
     * this specification and/or [JWA] are being used that MUST be
     * understood and processed.  Its value is an array listing the Header
     * Parameter names present in the JOSE Header that use those extensions.
     * If any of the listed extension Header Parameters are not understood
     * and supported by the recipient, then the JWS is invalid.  Producers
     * MUST NOT include Header Parameter names defined by this specification
     * or [JWA] for use with JWS, duplicate names, or names that do not
     * occur as Header Parameter names within the JOSE Header in the "crit"
     * list.  Producers MUST NOT use the empty list "[]" as the "crit"
     * value.  Recipients MAY consider the JWS to be invalid if the critical
     * list contains any Header Parameter names defined by this
     * specification or [JWA] for use with JWS or if any other constraints
     * on its use are violated.  When used, this Header Parameter MUST be
     * integrity protected; therefore, it MUST occur only within the JWS
     * Protected Header.  Use of this Header Parameter is OPTIONAL.  This
     * Header Parameter MUST be understood and processed by implementations.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.11
     * @optional
     */
    'crit'?: string[];

    /**
     * Other claims.
     */
    [key: string]: uT.IJsonSafeValue | undefined;
}

/**
 * The input structure of JWT Header for API accepting user-provided headers.
 */
export type IJwtHeaderInput = Partial<IJwtHeader>;

/**
 * The structure of JWT Payload.
 */
export interface IJwtPayload {

    /**
     * The "jti" (JWT ID) claim provides a unique identifier for the JWT.
     * The identifier value MUST be assigned in a manner that ensures that
     * there is a negligible probability that the same value will be
     * accidentally assigned to a different data object; if the application
     * uses multiple issuers, collisions MUST be prevented among values
     * produced by different issuers as well.  The "jti" claim can be used
     * to prevent the JWT from being replayed.  The "jti" value is a case-
     * sensitive string.  Use of this claim is OPTIONAL.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.7
     * @type string
     * @recommended if you need to prevent replay or control its usage and validity by extra ways
     */
    'jti'?: string;

    /**
     * The "iss" (issuer) claim identifies the principal that issued the
     * JWT.  The processing of this claim is generally application specific.
     * The "iss" value is a case-sensitive string containing a StringOrURI
     * value.  Use of this claim is OPTIONAL.
     *
     * @type string
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.1
     * @optional
     */
    'iss'?: string;

    /**
     * The "aud" (audience) claim identifies the recipients that the JWT is
     * intended for.  Each principal intended to process the JWT MUST
     * identify itself with a value in the audience claim.  If the principal
     * processing the claim does not identify itself with a value in the
     * "aud" claim when this claim is present, then the JWT MUST be
     * rejected.  In the general case, the "aud" value is an array of case-
     * sensitive strings, each containing a StringOrURI value.  In the
     * special case when the JWT has one audience, the "aud" value MAY be a
     * single case-sensitive string containing a StringOrURI value.  The
     * interpretation of audience values is generally application specific.
     * Use of this claim is OPTIONAL.
     *
     * @type string | string[]
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.3
     * @optional
     */
    'aud'?: string | string[];

    /**
     * The "sub" (subject) claim identifies the principal that is the
     * subject of the JWT.  The claims in a JWT are normally statements
     * about the subject.  The subject value MUST either be scoped to be
     * locally unique in the context of the issuer or be globally unique.
     * The processing of this claim is generally application specific.  The
     * "sub" value is a case-sensitive string containing a StringOrURI
     * value.  Use of this claim is OPTIONAL.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.2
     * @optional
     */
    'sub'?: string;

    /**
     * The "iat" (issued at) claim identifies the time at which the JWT was
     * issued.  This claim can be used to determine the age of the JWT.  Its
     * value MUST be a number containing a NumericDate value.  Use of this
     * claim is OPTIONAL.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.6
     * @optional
     * @type uint32 (unix timestamp)
     * @unit seconds
     */
    'iat'?: number;

    /**
     * The "exp" (expiration time) claim identifies the expiration time on
     * or after which the JWT MUST NOT be accepted for processing.  The
     * processing of the "exp" claim requires that the current date/time
     * MUST be before the expiration date/time listed in the "exp" claim.
     * Implementers MAY provide for some small leeway, usually no more than
     * a few minutes, to account for clock skew.  Its value MUST be a number
     * containing a NumericDate value.  Use of this claim is OPTIONAL.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4
     * @optional
     * @recommended Any token should have an expiration date.
     * @type uint32 (unix timestamp)
     * @unit seconds
     */
    'exp'?: number;

    /**
     * The "nbf" (not before) claim identifies the time before which the JWT
     * MUST NOT be accepted for processing.  The processing of the "nbf"
     * claim requires that the current date/time MUST be after or equal to
     * the not-before date/time listed in the "nbf" claim.  Implementers MAY
     * provide for some small leeway, usually no more than a few minutes, to
     * account for clock skew.  Its value MUST be a number containing a
     * NumericDate value.  Use of this claim is OPTIONAL.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.5
     * @optional
     * @type uint32 (unix timestamp)
     * @unit seconds
     */
    'nbf'?: number;

    /**
     * Other claims.
     */
    [key: string]: uT.IJsonSafeValue | undefined;
}

/**
 * The type of the signer objects used in `stringify` API, to sign the JWTs.
 */
export interface IJwaSigner {
    /**
     * The signing algorithm family.
     */
    readonly family: cL.ESigningAlgoFamily;

    /**
     * The key ID to use in the JWT header.
     */
    readonly keyId?: string | null;

    /**
     * The signing algorithm to use, for the `alg` claim in the JWT header.
     */
    readonly jwa: cL.ESigningJwa;

    /**
     * The digest type to use for signing.
     */
    readonly digestType: cL.EDigestType;

    /**
     * Sign the provided data and return the signature.
     *
     * @param data   The data to sign.
     *
     * @returns  The signature.
     */
    sign(data: Buffer | string): Buffer;
}

/**
 * The type of the result returned by `parse` API.
 */
export interface IJwtParseResult {

    /**
     * The decoded header of the JWT.
     */
    header: IJwtHeader;

    /**
     * The decoded payload of the JWT.
     */
    payload: IJwtPayload;

    /**
     * The content to be signed, which is the base64url-encoded header and payload.
     */
    signedContent: string;

    /**
     * The signature of the JWT.
     */
    signature: Buffer;
}

/**
 * The type of the validator objects that validate the JWTs, after parsing.
 *
 * The validator is not only verifying the signature, but also could do other
 * checks on the payload, such as expiration, audience, issuer, etc.
 */
export interface IJwtValidator {

    /**
     * The name of the validator.
     *
     * When using with the JwtVerifier class, this name can be used to identify
     * which validator failed.
     */
    readonly name: string;

    /**
     * Validate the provided parse result of a JWT, checking if the JWT is valid.
     *
     * @param parseResult  The result returned by `parse` API.
     *
     * @throws  If validation failed or an error occurred inside.
     */
    validate(parseResult: IJwtParseResult): void;
}

/**
 * The type of the asynchronous validator objects that validate the JWTs, after parsing.
 *
 * The validator is not only verifying the signature, but also could do other
 * checks on the payload, such as expiration, audience, issuer, etc.
 */
export interface IJwtAsyncValidator {

    readonly name: string;

    /**
     * Validate the provided parse result of a JWT, checking if the JWT is valid.
     *
     * @param parseResult  The result returned by `parse` API.
     *
     * @throws  If validation failed or an error occurred inside.
     */
    validate(parseResult: IJwtParseResult): Promise<void>;
}
