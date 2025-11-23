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
 * The options for creating an ML-DSA JWT signer.
 */
export interface IMldsaSignerOptions {

    /**
     * The private key to use for signing.
     * If a string is provided, it must be a PEM encoded ML-DSA private key.
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
}

type IKeyUsage = Partial<Record<'public' | 'private', boolean>>;

function extractJwaFromKey(
    key: NodeCrypto.KeyObject,
    keyUsage: IKeyUsage
): cL.ESigningJwa {

    if (!key.asymmetricKeyType) {

        throw new eL.E_INVALID_SETTINGS(eL.EErrorCode.INVALID_KEY_FORMAT, {
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

    switch (key.asymmetricKeyType as string) {
        case 'ml-dsa-44':
            return cL.ESigningJwa.MLDSA44;
        case 'ml-dsa-65':
            return cL.ESigningJwa.MLDSA65;
        case 'ml-dsa-87':
            return cL.ESigningJwa.MLDSA87;
        default:
            throw new eL.E_INVALID_SETTINGS(eL.EErrorCode.KEY_ALGO_MISMATCHED, {
                'keyUsage': key.type,
                'keyDetails': key.asymmetricKeyDetails,
                'keyAlgo': key.asymmetricKeyType,
            });
    }
}

/**
 * The signer using ML-DSA algorithm, for JWT.
 *
 * @example
 * ```ts
 * import * as LibJWT from '@litert/jwt';
 * const signer = new LibJWT.MldsaJwaSigner({
 *   privateKey: '-----BEGIN PRIVATE KEY-----\n...',
 * });
 * const token = await LibJWT.stringify({
 *   payload: { foo: 'bar' },
 *   signer: signer,
 * });
 * console.log(token);
 * ```
 */
export class MldsaJwaSigner implements dL.IJwaSigner {

    public readonly family: cL.ESigningAlgoFamily = cL.ESigningAlgoFamily.MLDSA;

    public readonly jwa: cL.ESigningJwa;

    public readonly keyId?: string | null;

    public readonly digestType: cL.EDigestType = cL.EDigestType.AUTO;

    private readonly _key: NodeCrypto.KeyObject;

    public constructor(opts: IMldsaSignerOptions) {

        this.keyId = opts.keyId;
        this._key = uL.preparePrivateKey(opts.privateKey);
        this.jwa = extractJwaFromKey(this._key, { private: true });
    }

    public sign(content: Buffer | string): Buffer {

        try {

            return NodeCrypto.sign(
                null,
                typeof content === 'string' ? Buffer.from(content, 'utf-8') : content,
                this._key,
            );
        }
        catch (e) {

            throw new eL.E_SIGN_FAILED(eL.EErrorCode.SIGN_FAILED, {}, e);
        }
    }
}

/**
 * The options for creating an ML-DSA signature validator for JWT.
 */
export interface IMldsaValidatorOptions {

    /**
     * A custom name for this validator.
     *
     * @default 'MldsaJwaVerifier'
     */
    'customName'?: string;

    /**
     * The public key to use for ML-DSA signature verification.
     * If a string is provided, it must be a PEM encoded ML-DSA public key.
     */
    'publicKey': string | NodeCrypto.KeyObject;

    /**
     * Whether to check the `alg` claim in the JWT header if it is present.
     *
     * @default true
     */
    'checkAlgClaim'?: boolean;
}

/**
 * The signature validator using ML-DSA algorithm, for JWT.
 *
 * @example
 * ```ts
 * import * as LibJWT from '@litert/jwt';
 * const verifier = new LibJWT.MldsaJwaVerifier({
 *   publicKey: '-----BEGIN PUBLIC KEY-----\n...',
 * });
 * const result = await LibJWT.parse({
 *   token: '...',
 *   verifier: verifier,
 * });
 * console.log(result);
 * ```
 */
export class MldsaJwaVerifier implements dL.IJwtValidator {

    public readonly name: string;

    /**
     * The signing algorithm family.
     */
    public readonly family: cL.ESigningAlgoFamily = cL.ESigningAlgoFamily.MLDSA;

    /**
     * The JWA algorithm name.
     */
    public readonly jwa: cL.ESigningJwa;

    private readonly _key: NodeCrypto.KeyObject;

    /**
     * Whether to check the `alg` claim in the JWT header if it is present.
     */
    public checkAlgClaim: boolean;

    /**
     * The digest type to use for verification.
     */
    public readonly digestType: cL.EDigestType = cL.EDigestType.AUTO;

    public constructor(opts: IMldsaValidatorOptions) {

        this.name = opts.customName ?? MldsaJwaVerifier.name;
        this._key = uL.preparePublicKey(opts.publicKey);
        this.checkAlgClaim = opts.checkAlgClaim ?? true;

        this.jwa = extractJwaFromKey(this._key, {
            public: true,
            private: true, // Private key can also be used for verification
        });
    }

    public validate(data: dL.IJwtParseResult): void {

        /**
         * The `alg` header claim is optional, do not check it unless it's
         * present.
         */
        if (this.checkAlgClaim && 'alg' in data.header && data.header.alg !== this.jwa) {

            throw new eL.E_VERIFY_FAILED(eL.EErrorCode.SIGNATURE_ALG_MISMATCH, {
                'expected': this.jwa,
                'actual': data.header.alg,
            });
        }

        let result: boolean;

        try {

            result = NodeCrypto.verify(
                null,
                Buffer.from(data.signedContent, 'utf-8'),
                this._key,
                data.signature,
            );
        }
        catch (e) {

            throw new eL.E_VERIFY_FAILED(eL.EErrorCode.SIGNATURE_VERIFY_FAILED, {}, e);
        }

        if (!result) {

            throw new eL.E_VERIFY_FAILED(eL.EErrorCode.SIGNATURE_VERIFY_FAILED);
        }
    }
}
