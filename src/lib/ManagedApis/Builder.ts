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

/* eslint-disable max-lines */

import type * as dL from '../Types';
import type * as uT from '@litert/utils-ts-types';
import * as cL from '../Constants';
import { stringify } from '../CoreApis/Stringify';

/**
 * The options for creating a JWT builder.
 */
export interface IJwtBuilderOptions {

    /**
     * The signer to use to sign the JWT tokens.
     */
    signer: dL.IJwaSigner;

    /**
     * Initial header claims to include in every new generated token.
     *
     * If a function is provided, it will be called to get the initial header
     * claims for the builder.
     *
     * > For `alg` and `typ` claims, they will be ignored, and automatically
     * > set according to the signer used.
     *
     * @default {}
     */
    header?: dL.IJwtHeaderInput;

    /**
     * Initial payload claims to include in every new generated token.
     *
     * If a function is provided, it will be called to get the initial payload
     * claims for the builder.
     *
     * @default {}
     */
    payload?: dL.IJwtPayload;
}

const STANDARD_HEADER_CLAIMS = Object.values(cL.EStdHeaderClaim).reduce(
    (acc, cur) => {
        acc[cur] = true;
        return acc;
    },
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
    {} as uT.IDict<boolean>,
);

/**
 * The type of options for setting header claims.
 */
export interface ISetHeaderClaimOptions {

    /**
     * Whether should add the claim name to the `crit` header claim.
     *
     * @default false
     */
    critical?: boolean;

    /**
     * Whether to skip type validation for the claim value, allowing setting any value.
     *
     * @default false
     */
    skipValidation?: boolean;
}

/**
 * The type of options for setting payload claims.
 */
export interface ISetPayloadClaimOptions {

    /**
     * Whether to skip type validation for the claim value, allowing setting any value.
     *
     * @default false
     */
    skipValidation?: boolean;
}

/**
 * The builder class to help building JWT tokens step by step.
 */
export class JwtBuilder {

    private readonly _signer: dL.IJwaSigner;

    private readonly _headers: dL.IJwtHeaderInput;

    private readonly _payload: dL.IJwtPayload;

    public constructor(opts: IJwtBuilderOptions) {

        this._signer = opts.signer;

        this._headers = opts.header ?? {};
        this._payload = opts.payload ?? {};
    }

    /**
     * Set the value of a header claim, overriding any existing value.
     *
     * The claims defined in the JWT specification have specific types, so
     * they will be type-checked before setting. You can skip the type validation
     * by setting `skipValidation` option to `true`.
     *
     * > For `alg` and `typ` claims, they will be ignored, and automatically
     * > set according to the signer used.
     * > And `crit` claim cannot be set directly, use `critical` parameter to
     * > mark a claim as critical.
     *
     * @param name      The name of the header claim.
     * @param value     The value of the header claim.
     * @param opts      The options for setting the header claim.
     *
     * @returns  The builder itself for chaining.
     */
    public setHeaderClaim(name: string, value: uT.IJsonSafeValue, opts?: ISetHeaderClaimOptions): this {

        switch (name) {
            case cL.EStdHeaderClaim.ALGORITHM:
            case cL.EStdHeaderClaim.TYPE:

                return this; // Ignore setting `alg` and `typ`

            case cL.EStdHeaderClaim.CONTENT_TYPE:
            case cL.EStdHeaderClaim.KEY_ID:
            case cL.EStdHeaderClaim.JWK_URL:
            case cL.EStdHeaderClaim.X509_CERT_URL:
            case cL.EStdHeaderClaim.X509_CERT_THUMBPRINT_SHA1:
            case cL.EStdHeaderClaim.X509_CERT_THUMBPRINT_SHA256:

                if (opts?.skipValidation) {
                    break;
                }

                if (typeof value !== 'string' || !value) {

                    throw new TypeError(`The header claim "${name}" must be a non-empty string.`);
                }

                break;

            case cL.EStdHeaderClaim.JWK:

                if (opts?.skipValidation) {
                    break;
                }

                if (typeof value !== 'object' || value === null || Array.isArray(value)) {

                    throw new TypeError(`The header claim "${name}" must be an object.`);
                }

                break;

            case cL.EStdHeaderClaim.X509_CERT_CHAIN:

                if (opts?.skipValidation) {
                    break;
                }

                if (!Array.isArray(value) || !value.length || value.some((x) => typeof x !== 'string' || !x)) {

                    throw new TypeError(`The header claim "${name}" must be a string array.`);
                }

                break;

            case cL.EStdHeaderClaim.CRITICAL_CLAIMS:

                throw new Error('The "crit" header claim cannot be set directly.');

            default:
                // No specific type check for custom header claims
        }

        this._headers[name] = value;

        if (opts?.critical && !STANDARD_HEADER_CLAIMS[name]) {

            const crit = this._headers[cL.EStdHeaderClaim.CRITICAL_CLAIMS] ??= [];

            if (!crit.includes(name)) {

                crit.push(name);
            }
        }

        return this;
    }

    /**
     * Set the value of a payload claim, overriding any existing value.
     *
     * The claims defined in the JWT specification have specific types, so
     * they will be type-checked before setting by default. You can skip
     * the type validation by setting `skipValidation` option to `true`.
     *
     * @param name      The name of the payload claim.
     * @param value     The value of the payload claim.
     * @param opts      The options for setting the payload claim.
     *
     * @returns       The builder itself for chaining.
     */
    public setPayloadClaim(name: string, value: uT.IJsonSafeValue, opts?: ISetPayloadClaimOptions): this {

        if (true !== opts?.skipValidation) {

            switch (name) {
                case cL.EStdPayloadClaim.EXPIRATION_TIME:
                case cL.EStdPayloadClaim.NOT_BEFORE:
                case cL.EStdPayloadClaim.ISSUED_AT:

                    if (typeof value !== 'number' || !Number.isSafeInteger(value)) {

                        throw new TypeError(`The payload claim "${name}" must be an integer.`);
                    }

                    break;
                case cL.EStdPayloadClaim.ISSUER:
                case cL.EStdPayloadClaim.SUBJECT:
                case cL.EStdPayloadClaim.JWT_ID:

                    if (typeof value !== 'string' || !value) {

                        throw new TypeError(`The payload claim "${name}" must be a non-empty string.`);
                    }

                    break;

                case cL.EStdPayloadClaim.AUDIENCE:

                    if (typeof value !== 'string' && !(
                        Array.isArray(value) &&
                        value.length > 0 &&
                        value.every((x) => typeof x === 'string' && x)
                    )) {

                        throw new TypeError(`The payload claim "${name}" must be a non-empty string or an array of non-empty strings.`);
                    }

                    break;
                default:
                    // No specific type check for custom payload claims
            }
        }

        this._payload[name] = value;
        return this;
    }

    /**
     * Set the Key ID (`kid`) header claim.
     *
     * @param kid The Key ID.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.4
     *
     * @returns The builder itself for chaining.
     */
    public setKeyId(kid: string): this {

        return this.setHeaderClaim(cL.EStdHeaderClaim.KEY_ID, kid);
    }

    /**
     * Set the Content Type (`cty`) header claim.
     *
     * @param cty  The Content Type.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.10
     *
     * @returns The builder itself for chaining.
     */
    public setContentType(cty: string): this {

        return this.setHeaderClaim(cL.EStdHeaderClaim.CONTENT_TYPE, cty);
    }

    /**
     * Set the X.509 Certificate Chain (`x5c`) header claim.
     *
     * @param chain  The X.509 Certificate Chain.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.6
     *
     * @returns The builder itself for chaining.
     */
    public setX509CertChain(chain: string[]): this {

        return this.setHeaderClaim(cL.EStdHeaderClaim.X509_CERT_CHAIN, chain);
    }

    /**
     * Set the X.509 Certificate (SHA-1) Thumbprint (`x5t`) header claim.
     *
     * @param th  The X.509 Certificate Thumbprint.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.7
     *
     * @returns The builder itself for chaining.
     */
    public setX509CertThumbprintSha1(th: string): this {

        return this.setHeaderClaim(cL.EStdHeaderClaim.X509_CERT_THUMBPRINT_SHA1, th);
    }

    /**
     * Set the X.509 Certificate SHA-256 Thumbprint (`x5t#S256`) header claim.
     *
     * @param th  The X.509 Certificate SHA-256 Thumbprint.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.8
     *
     * @returns The builder itself for chaining.
     */
    public setX509CertThumbprintSha256(th: string): this {

        return this.setHeaderClaim(cL.EStdHeaderClaim.X509_CERT_THUMBPRINT_SHA256, th);
    }

    /**
     * Set the X.509 Certificate URL (`x5u`) header claim.
     *
     * @param url  The X.509 Certificate URL.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.5
     *
     * @returns The builder itself for chaining.
     */
    public setX509CertUrl(url: string): this {

        return this.setHeaderClaim(cL.EStdHeaderClaim.X509_CERT_URL, url);
    }

    /**
     * Set the JWK URL (`jku`) header claim.
     *
     * @param url  The JWK URL.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.2
     *
     * @returns The builder itself for chaining.
     */
    public setJwkUrl(url: string): this {

        return this.setHeaderClaim(cL.EStdHeaderClaim.JWK_URL, url);
    }

    /**
     * Set the JWK (`jwk`) header claim.
     *
     * @param jwk  The JWK.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.3
     *
     * @returns The builder itself for chaining.
     */
    public setJwk(jwk: uT.IJsonSafeValue): this {

        return this.setHeaderClaim(cL.EStdHeaderClaim.JWK, jwk);
    }

    /**
     * Set the expiration time (`exp`) payload claim.
     *
     * @param exp  The expiration time (unix timestamp in seconds or Date object).
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4
     *
     * @returns The builder itself for chaining.
     */
    public setExpiration(exp: number | Date): this {

        return this.setPayloadClaim(
            cL.EStdPayloadClaim.EXPIRATION_TIME,
            exp instanceof Date ? Math.floor(exp.getTime() / 1000) : exp
        );
    }

    /**
     * Set the expiration time to a duration from now, in seconds.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4
     *
     * @param deltaSeconds  The duration in seconds from now when the token should expire.
     *
     * @returns The builder itself for chaining.
     */
    public expiresIn(deltaSeconds: number): this {

        return this.setPayloadClaim(
            cL.EStdPayloadClaim.EXPIRATION_TIME,
            Math.floor(Date.now() / 1000) + deltaSeconds
        );
    }

    /**
     * Set the not before (`nbf`) payload claim.
     *
     * @param nbf  The not before time (unix timestamp in seconds or Date object).
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.5
     *
     * @returns The builder itself for chaining.
     */
    public setNotBefore(nbf: number | Date): this {

        return this.setPayloadClaim(
            cL.EStdPayloadClaim.NOT_BEFORE,
            nbf instanceof Date ? Math.floor(nbf.getTime() / 1000) : nbf
        );
    }

    /**
     * Set the issued at (`iat`) payload claim.
     *
     * @param iat  The issued at time (unix timestamp in seconds or Date object).
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.1
     *
     * @returns The builder itself for chaining.
     */
    public setIssuedAt(iat: number | Date): this {

        return this.setPayloadClaim(
            cL.EStdPayloadClaim.ISSUED_AT,
            iat instanceof Date ? Math.floor(iat.getTime() / 1000) : iat
        );
    }

    /**
     * Set the JWT ID (`jti`) payload claim.
     *
     * @param jti  The JWT ID.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.7
     *
     * @returns The builder itself for chaining.
     */
    public setJwtId(jti: string): this {

        return this.setPayloadClaim(cL.EStdPayloadClaim.JWT_ID, jti);
    }

    /**
     * Set the issuer (`iss`) payload claim.
     *
     * @param iss  The issuer.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.1
     *
     * @returns The builder itself for chaining.
     */
    public setIssuer(iss: string): this {

        return this.setPayloadClaim(cL.EStdPayloadClaim.ISSUER, iss);
    }

    /**
     * Set the subject (`sub`) payload claim.
     *
     * @param sub  The subject.
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.2
     *
     * @returns The builder itself for chaining.
     */
    public setSubject(sub: string): this {

        return this.setPayloadClaim(cL.EStdPayloadClaim.SUBJECT, sub);
    }

    /**
     * Set the audience (`aud`) payload claim.
     *
     * @param aud  The audience (string or string array).
     *
     * @link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.3
     *
     * @returns The builder itself for chaining.
     */
    public setAudience(aud: string | string[]): this {

        return this.setPayloadClaim(cL.EStdPayloadClaim.AUDIENCE, aud);
    }

    /**
     * Sign and build the JWT string.
     *
     * @returns The signed JWT string.
     */
    public build(): string {

        return stringify({
            'header': this._headers,
            'payload': this._payload,
            'signer': this._signer,
        });
    }
}
