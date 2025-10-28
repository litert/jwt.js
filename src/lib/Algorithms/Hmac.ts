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

import * as NodeCrypto from 'node:crypto';
import * as cL from '../Constants';
import * as eL from '../Errors';
import type * as dL from '../Types';

/**
 * The options for creating an HMAC JWT signer.
 */
export interface IHmacSignerOptions {

    /**
     * The secret key to use for signing.
     * If a string is provided, it will be treated as a UTF-8 encoded string.
     *
     * @recommended Use at least 256-bit (32 bytes) key for HMAC-SHA256,
     *              384-bit (48 bytes) key for HMAC-SHA384, and
     *              512-bit (64 bytes) key for HMAC-SHA512.
     */
    'key': string | Buffer;

    /**
     * The digest type to use for signing.
     */
    'digestType': cL.EDigestType;

    /**
     * The key ID to use in the JWT header.
     *
     * > When using `stringify` API, it will not automatically set the `kid`
     * > claim in the JWT header even if this value is provided here. You need
     * > to set it manually in the `header` option of the `stringify` API.
     *
     * @optional
     */
    'keyId'?: string | null;
}

function parseJwaFromDigestType(digestType: cL.EDigestType): cL.ESigningJwa {

    switch (digestType) {
        case cL.EDigestType.SHA256:
            return cL.ESigningJwa.HS256;
        case cL.EDigestType.SHA384:
            return cL.ESigningJwa.HS384;
        case cL.EDigestType.SHA512:
            return cL.ESigningJwa.HS512;
        default:
            throw new eL.E_INVALID_SETTINGS(eL.EErrorCode.UNKNOWN_DIGEST_TYPE, {
                'digestType': digestType,
            });
    }
}

/**
 * The HMAC JWT signer implementation.
 *
 * @example
 * ```ts
 * import * as LibJWT from '@litert/jwt';
 * const signer = new LibJWT.HmacJwaSigner({
 *   'key': 'the-secret-key',
 *   'digestType': LibJWT.EDigestType.SHA256,
 * });
 * const token = await LibJWT.stringify({
 *    'payload': { foo: 'bar' },
 *    'signer': signer,
 * });
 * console.log(token);
 * ```
 */
export class HmacJwaSigner implements dL.IJwaSigner {

    public readonly family: cL.ESigningAlgoFamily = cL.ESigningAlgoFamily.HMAC;

    public readonly jwa: cL.ESigningJwa;

    public readonly digestType: cL.EDigestType;

    public readonly keyId?: string | null;

    private readonly _key: Buffer;

    public constructor(opts: IHmacSignerOptions) {

        this.keyId = opts.keyId;
        this.digestType = opts.digestType;

        this._key = prepareKey(opts.key);

        this.jwa = parseJwaFromDigestType(this.digestType);
    }

    public sign(content: Buffer | string): Buffer {

        // This line does not throw any error because the key and digestType
        // are already validated in the constructor.
        const hmac = NodeCrypto.createHmac(this.digestType, this._key);

        try {

            return hmac.update(content).digest();
        }
        catch (e) {

            throw new eL.E_SIGN_FAILED(eL.EErrorCode.SIGN_FAILED, {
                'digestType': this.digestType,
            }, e);
        }
    }
}

/**
 * The options for creating an HMAC signature validator for JWT.
 */
export interface IHmacValidatorOptions {

    /**
     * A custom name for this validator.
     *
     * @default 'HmacJwaVerifier'
     */
    'customName'?: string;

    /**
     * The secret key to use for HMAC signature verification.
     * If a string is provided, it will be treated as a UTF-8 encoded string.
     *
     * @recommended Use at least 256-bit (32 bytes) key for HMAC-SHA256,
     *              384-bit (48 bytes) key for HMAC-SHA384, and
     *              512-bit (64 bytes) key for HMAC-SHA512.
     */
    'key': string | Buffer;

    /**
     * The digest type to use for HMAC signature verification.
     */
    'digestType': cL.EDigestType;

    /**
     * Whether to check the `alg` claim in the JWT header if it is present.
     *
     * @default true
     */
    'checkAlgClaim'?: boolean;
}

function prepareKey(key: string | Buffer): Buffer {

    if (key instanceof Buffer) {

        return key;
    }
    else if (typeof key === 'string') {

        return Buffer.from(key, 'utf-8');
    }
    else {

        throw new eL.E_INVALID_SETTINGS(eL.EErrorCode.INVALID_KEY_FORMAT, {});
    }
}

/**
 * The HMAC signature validator implementation for JWT.
 *
 * This validator class checks if the signature is valid.
 * It neither parses the JWT, nor validates the JWT token claims.
 *
 * @example
 * ```ts
 * import * as LibJWT from '@litert/jwt';
 * const validator = new LibJWT.HmacJwaVerifier({
 *    key: 'the-secret-key',
 *    digestType: LibJWT.EDigestType.SHA256,
 * });
 * const info = LibJWT.parse(token); // Signature is not verified here.
 * if (!validator.validate(info)) {
 *    throw new Error('Invalid signature.');
 * }
 * ```
 */
export class HmacJwaVerifier implements dL.IJwtValidator {

    public readonly name: string;

    /**
     * The signing algorithm family.
     */
    public readonly family: cL.ESigningAlgoFamily = cL.ESigningAlgoFamily.HMAC;

    /**
     * The JWA algorithm name.
     */
    public readonly jwa: cL.ESigningJwa;

    /**
     * The digest type to use for verification.
     */
    public readonly digestType: cL.EDigestType;

    /**
     * Whether to check the `alg` claim in the JWT header if it is present.
     */
    public checkAlgClaim: boolean;

    private readonly _key: Buffer;

    public constructor(opts: IHmacValidatorOptions) {

        this.name = opts.customName ?? HmacJwaVerifier.name;
        this.jwa = parseJwaFromDigestType(opts.digestType);
        this.checkAlgClaim = opts.checkAlgClaim ?? true;

        this.digestType = opts.digestType;

        this._key = prepareKey(opts.key);
    }

    public validate(data: dL.IJwtParseResult): void {

        /**
         * The `alg` header claim is optional, do not check it unless it's
         * present.
         */
        if (this.checkAlgClaim && 'alg' in data.header && data.header.alg !== this.jwa) {

            throw new eL.E_VERIFY_FAILED(eL.EErrorCode.SIGNATURE_ALG_MISMATCH);
        }

        // This line does not throw any error because the key and digestType
        // are already validated in the constructor.
        const hmac = NodeCrypto.createHmac(this.digestType, this._key);

        let expectedSig: Buffer;

        try {

            expectedSig = hmac.update(data.signedContent).digest();
        }
        catch (e) {

            throw new eL.E_VERIFY_FAILED(eL.EErrorCode.SIGNATURE_VERIFY_FAILED, {}, e);
        }

        let result: boolean;

        try {

            result = NodeCrypto.timingSafeEqual(expectedSig, data.signature);
        }
        catch {

            result = false;
        }

        if (!result) {

            throw new eL.E_VERIFY_FAILED(eL.EErrorCode.SIGNATURE_VERIFY_FAILED);
        }
    }
}
