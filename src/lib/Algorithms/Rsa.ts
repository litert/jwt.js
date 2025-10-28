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
import * as uL from '../_internal/Utils';

/**
 * The options for creating an RSA JWT signer.
 */
export interface IRsaSignerOptions {

    /**
     * The private key to use for signing.
     */
    'privateKey': string | NodeCrypto.KeyObject;

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

    /**
     * The digest type to use for signing.
     */
    'digestType': cL.EDigestType;

    /**
     * Whether to use RSA-PSS padding for signing.
     *
     * Set to `null` to use the default padding scheme based on the key type.
     *
     * If a RSA-PSS key is provided, but this option is set to `false`, an error
     * will be thrown.
     *
     * @default null
     */
    'usePssPadding'?: boolean | null;
}

type IKeyUsage = Partial<Record<'public' | 'private', boolean>>;

const PSS_OPTS = {
    'padding': NodeCrypto.constants.RSA_PKCS1_PSS_PADDING,
    'saltLength': NodeCrypto.constants.RSA_PSS_SALTLEN_DIGEST,
};

function extractJwaFromKey(
    key: NodeCrypto.KeyObject,
    digest: cL.EDigestType,
    keyUsage: IKeyUsage,
    usePSS: boolean | null = null,
): [cL.ESigningJwa, NodeCrypto.SignKeyObjectInput] {

    if (!key.asymmetricKeyDetails || !key.asymmetricKeyType) {

        throw new eL.E_INVALID_SETTINGS(eL.EErrorCode.INVALID_KEY_FORMAT, {
            'keyUsage': key.type,
            'keyDetails': key.asymmetricKeyDetails,
            'keyAlgo': key.asymmetricKeyType,
        });
    }

    if (key.asymmetricKeyType !== 'rsa' && key.asymmetricKeyType !== 'rsa-pss') {

        throw new eL.E_INVALID_SETTINGS(eL.EErrorCode.KEY_ALGO_MISMATCHED, {
            'keyUsage': key.type,
            'keyDetails': key.asymmetricKeyDetails,
            'keyAlgo': key.asymmetricKeyType,
        });
    }

    if (!keyUsage[key.type as 'public']) {

        throw new eL.E_INVALID_SETTINGS(eL.EErrorCode.INVALID_KEY_USAGE, {
            'keyUsage': key.type,
            'keyDetails': key.asymmetricKeyDetails,
            'keyAlgo': key.asymmetricKeyType,
        });
    }

    // if (key.asymmetricKeyDetails.modulusLength! < 2048) {

    //     throw new eL.E_INVALID_SETTINGS(eL.EErrorCode.INVALID_KEY_WEAK, {
    //         'keyUsage': key.type,
    //         'keyDetails': key.asymmetricKeyDetails,
    //         'keyAlgo': key.asymmetricKeyType,
    //     });
    // }

    if (usePSS === false && key.asymmetricKeyType === 'rsa-pss') {

        throw new eL.E_INVALID_SETTINGS(eL.EErrorCode.KEY_ALGO_MISMATCHED, {
            'keyUsage': key.type,
            'keyDetails': key.asymmetricKeyDetails,
            'keyAlgo': key.asymmetricKeyType,
        });
    }

    if ((key.asymmetricKeyDetails.hashAlgorithm ?? digest) !== digest) {

        throw new eL.E_INVALID_SETTINGS(eL.EErrorCode.KEY_ALGO_MISMATCHED, {
            'keyUsage': key.type,
            'keyDetails': key.asymmetricKeyDetails,
            'keyAlgo': key.asymmetricKeyType,
        });
    }

    switch (`${key.asymmetricKeyType}-${digest}`) {
        case 'rsa-sha256':
            if (usePSS === true) {
                return [cL.ESigningJwa.PS256, { 'key': key, ...PSS_OPTS }];
            }
            return [cL.ESigningJwa.RS256, { key }];
        case 'rsa-sha384':
            if (usePSS === true) {
                return [cL.ESigningJwa.PS384, { 'key': key, ...PSS_OPTS }];
            }
            return [cL.ESigningJwa.RS384, { key }];
        case 'rsa-sha512':
            if (usePSS === true) {
                return [cL.ESigningJwa.PS512, { 'key': key, ...PSS_OPTS }];
            }
            return [cL.ESigningJwa.RS512, { key }];
        case 'rsa-pss-sha256':
            return [cL.ESigningJwa.PS256, { key }];
        case 'rsa-pss-sha384':
            return [cL.ESigningJwa.PS384, { key }];
        case 'rsa-pss-sha512':
            return [cL.ESigningJwa.PS512, { key }];
        default:
            throw new eL.E_INVALID_SETTINGS(eL.EErrorCode.KEY_ALGO_MISMATCHED, {
                'keyUsage': key.type,
                'keyDetails': key.asymmetricKeyDetails,
                'keyAlgo': key.asymmetricKeyType,
            });
    }
}

/**
 * The RSA JWT signer implementation, for both RSASSA-PKCS1-v1_5 (RS256, ...)
 * and RSASSA-PSS (PS256, ...).
 *
 * @example
 *
 * Signing with RSASSA-PKCS1-v1_5:
 *
 * ```ts
 * import * as LibJWT from '@litert/jwt';
 * const signer = new LibJWT.RsaJwaSigner({
 *     // NOTE: Don't use a RSA key with PSS padding parameters here.
 *     'privateKey': '-----BEGIN PRIVATE KEY-----\n...',
 *     'digestType': LibJWT.EDigestType.SHA256,
 * });
 * // ...
 * ```
 *
 * Signing with RSASSA-PSS:
 *
 * ```ts
 * import * as LibJWT from '@litert/jwt';
 * const signer = new LibJWT.RsaJwaSigner({
 *     'privateKey': '-----BEGIN PRIVATE KEY-----\n...',
 *     'digestType': LibJWT.EDigestType.SHA256,
 *     // NOTE: if your key is generated as RSA-PSS key, the usePssPadding
 *     // option can be omitted or set to null.
 *     'usePssPadding': true,
 * });
 * // ...
 * ```
 */
export class RsaJwaSigner implements dL.IJwaSigner {

    public readonly family: cL.ESigningAlgoFamily = cL.ESigningAlgoFamily.RSA;

    public readonly jwa: cL.ESigningJwa;

    public readonly keyId?: string | null;

    public readonly digestType: cL.EDigestType;

    private readonly _signOpts: NodeCrypto.SignKeyObjectInput;

    public constructor(opts: IRsaSignerOptions) {

        this.keyId = opts.keyId;
        const key = uL.preparePrivateKey(opts.privateKey);
        this.digestType = opts.digestType;
        [this.jwa, this._signOpts] = extractJwaFromKey(
            key,
            this.digestType,
            { private: true },
            opts.usePssPadding ?? null,
        );
    }

    public sign(content: Buffer | string): Buffer {

        const signer = uL.createSigner(this.digestType);

        try {

            return signer
                .update(content)
                .sign(this._signOpts);
        }
        catch (e) {
            throw new eL.E_SIGN_FAILED(eL.EErrorCode.SIGN_FAILED, {}, e);
        }
    }
}

/**
 * The options for creating an RSA signature validator for JWT.
 */
export interface IRsaValidatorOptions {

    /**
     * A custom name for this validator.
     *
     * @default 'RsaJwaVerifier'
     */
    'customName'?: string;

    /**
     * The public key to use for RSA signature verification.
     */
    'publicKey': string | NodeCrypto.KeyObject;

    /**
     * Whether to check the `alg` claim in the JWT header if it is present.
     *
     * @default true
     */
    'checkAlgClaim'?: boolean;

    /**
     * The digest type to use for RSA signature verification.
     */
    'digestType': cL.EDigestType;

    /**
     * Whether to use RSA-PSS padding for verification.
     *
     * Set to `null` to use the default padding scheme based on the key type.
     *
     * If a RSA-PSS key is provided, but this option is set to `false`, an error
     * will be thrown.
     *
     * @default null
     */
    'usePssPadding'?: boolean | null;
}

/**
 * The RSA signature validator implementation for JWT.
 *
 * This validator class checks if the signature is valid.
 * It neither parses the JWT, nor validates the JWT token claims.
 *
 * @example
 * ```ts
 * import * as LibJWT from '@litert/jwt';
 * const validator = new LibJWT.RsaJwaVerifier({
 *    publicKey: '-----BEGIN PUBLIC KEY-----\n...',
 *    digestType: LibJWT.EDigestType.SHA256,
 * });
 * const info = LibJWT.parse(token); // Signature is not verified here.
 * const isValid = validator.validate(info);
 * console.log(isValid);
 * ```
 */
export class RsaJwaVerifier implements dL.IJwtValidator {

    public readonly name: string;

    /**
     * The signing algorithm family.
     */
    public readonly family: cL.ESigningAlgoFamily = cL.ESigningAlgoFamily.RSA;

    /**
     * Whether to check the `alg` claim in the JWT header if it is present.
     */
    public checkAlgClaim: boolean;

    /**
     * The JWA algorithm name.
     */
    public readonly jwa: cL.ESigningJwa;

    /**
     * The digest type to use for verification.
     */
    public readonly digestType: cL.EDigestType;

    private readonly _verifyOpts: NodeCrypto.VerifyKeyObjectInput;

    public constructor(opts: IRsaValidatorOptions) {

        this.name = opts.customName ?? RsaJwaVerifier.name;
        this.checkAlgClaim = opts.checkAlgClaim ?? true;
        this.digestType = opts.digestType;
        const key = uL.preparePublicKey(opts.publicKey);

        [this.jwa, this._verifyOpts] = extractJwaFromKey(
            key,
            this.digestType,
            {
                public: true,
                private: true, // Private key can also be used for verification
            },
            opts.usePssPadding ?? null
        );
    }

    public validate(data: dL.IJwtParseResult): void {

        /**
         * The `alg` header claim is optional, do not check it unless it's
         * present.
         */
        if (this.checkAlgClaim && 'alg' in data.header && data.header.alg !== this.jwa) {

            throw new eL.E_VERIFY_FAILED(eL.EErrorCode.SIGNATURE_ALG_MISMATCH);
        }

        const verifier = uL.createVerifier(this.digestType);

        let result: boolean;

        try {

            result = verifier
                .update(data.signedContent)
                .verify(this._verifyOpts, data.signature);
        }
        catch (e) {

            throw new eL.E_VERIFY_FAILED(eL.EErrorCode.SIGNATURE_VERIFY_FAILED, {}, e);
        }

        if (!result) {

            throw new eL.E_VERIFY_FAILED(eL.EErrorCode.SIGNATURE_VERIFY_FAILED);
        }
    }
}
