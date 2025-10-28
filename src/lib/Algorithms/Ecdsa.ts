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
 * The options for creating an ECDSA JWT signer.
 */
export interface IEcdsaSignerOptions {

    /**
     * The private key to use for signing.
     * If a string is provided, it must be a PEM encoded EC private key,
     * both PKCS#8 and SEC1 formats are supported.
     *
     * The digest algorithm and JWA will be inferred from the key, no need to
     * specify them manually.
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

function extractJwaFromKey(key: NodeCrypto.KeyObject, keyUsage: IKeyUsage): [
    cL.ESigningJwa,
    cL.EDigestType,
] {

    if (!key.asymmetricKeyDetails || !key.asymmetricKeyType) {

        throw new eL.E_INVALID_SETTINGS(eL.EErrorCode.INVALID_KEY_FORMAT, {
            'keyUsage': key.type,
            'keyDetails': key.asymmetricKeyDetails,
            'keyAlgo': key.asymmetricKeyType,
        });
    }

    if (key.asymmetricKeyType !== 'ec') {

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

    switch (key.asymmetricKeyDetails?.namedCurve) {
        case 'prime256v1':
            return [ cL.ESigningJwa.ES256, cL.EDigestType.SHA256 ];
        case 'secp384r1':
            return [ cL.ESigningJwa.ES384, cL.EDigestType.SHA384 ];
        case 'secp521r1':
            return [ cL.ESigningJwa.ES512, cL.EDigestType.SHA512 ];
        case 'secp256k1':
            return [ cL.ESigningJwa.ES256K, cL.EDigestType.SHA256 ];
        default:
            throw new eL.E_INVALID_SETTINGS(eL.EErrorCode.KEY_ALGO_MISMATCHED, {
                'keyUsage': key.type,
                'keyDetails': key.asymmetricKeyDetails,
                'keyAlgo': key.asymmetricKeyType,
            });
    }
}

/**
 * The signer using ECDSA algorithm, for JWT.
 *
 * @example
 * ```ts
 * import * as LibJWT from '@litert/jwt';
 * const signer = new LibJWT.EcdsaJwaSigner({
 *  privateKey: '-----BEGIN PRIVATE KEY-----\n...',
 * });
 * const token = await LibJWT.stringify({
 *   payload: { foo: 'bar' },
 *   signer: signer,
 * });
 * console.log(token);
 * ```
 */
export class EcdsaJwaSigner implements dL.IJwaSigner {

    public readonly family: cL.ESigningAlgoFamily = cL.ESigningAlgoFamily.ECDSA;

    public readonly jwa: cL.ESigningJwa;

    public readonly keyId?: string | null;

    public readonly digestType: cL.EDigestType;

    private readonly _signOpts: NodeCrypto.SignKeyObjectInput;

    public constructor(opts: IEcdsaSignerOptions) {

        this.keyId = opts.keyId;
        const key = uL.preparePrivateKey(opts.privateKey);
        [this.jwa, this.digestType] = extractJwaFromKey(key, { private: true });

        this._signOpts = {
            'key': key,
            'dsaEncoding': 'ieee-p1363',
        };
    }

    public sign(content: Buffer | string): Buffer {

        const signer = uL.createSigner(this.digestType);

        try {

            return signer.update(content).sign(this._signOpts);
        }
        catch (e) {

            throw new eL.E_SIGN_FAILED(eL.EErrorCode.SIGN_FAILED, {}, e);
        }
    }
}

/**
 * The options for creating an ECDSA signature validator for JWT.
 */
export interface IEcdsaValidatorOptions {

    /**
     * A custom name for this validator.
     *
     * @default 'EcdsaJwaVerifier'
     */
    'customName'?: string;

    /**
     * The public key to use for ECDSA signature verification.
     * If a string is provided, it must be a PEM encoded EC public key.
     *
     * The digest algorithm and JWA will be inferred from the key, no need to
     * specify them manually.
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
 * The ECDSA signature validator implementation for JWT.
 *
 * This validator class checks if the signature is valid.
 * It neither parses the JWT, nor validates the JWT token claims.
 *
 * @example
 * ```ts
 * import * as LibJWT from '@litert/jwt';
 * const validator = new LibJWT.EcdsaJwaVerifier({
 *    publicKey: '-----BEGIN PUBLIC KEY-----\n...',
 * });
 * const info = LibJWT.parse(token); // Signature is not verified here.
 * const isValid = validator.validate(info);
 * if (!isValid) {
 *    throw new Error('Invalid signature');
 * }
 * ```
 */
export class EcdsaJwaVerifier implements dL.IJwtValidator {

    public readonly name: string;

    /**
     * The signing algorithm family.
     */
    public readonly family: cL.ESigningAlgoFamily = cL.ESigningAlgoFamily.ECDSA;

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

    public constructor(opts: IEcdsaValidatorOptions) {

        this.name = opts.customName ?? EcdsaJwaVerifier.name;

        this.checkAlgClaim = opts.checkAlgClaim ?? true;
        const key = uL.preparePublicKey(opts.publicKey);

        [this.jwa, this.digestType] = extractJwaFromKey(key, {
            public: true,
            private: true, // Private key can also be used for verification
        });

        this._verifyOpts = {
            'key': key,
            'dsaEncoding': 'ieee-p1363',
        };
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
