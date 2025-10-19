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
 * The options for creating an ECDSA JWT signer.
 */
export interface IEcdsaSignerOptions {

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
}

type IKeyUsage = Partial<Record<'public' | 'private', boolean>>;

function extractJwaFromKey(key: NodeCrypto.KeyObject, keyUsage: IKeyUsage): [
    cL.ESigningJwa,
    cL.EDigestType,
] {

    if (!key.asymmetricKeyDetails || !key.asymmetricKeyType) {

        throw new eL.E_INVALID_KEY(eL.EErrorCode.INVALID_KEY_TYPE, {
            'keyUsage': key.type,
            'keyDetails': key.asymmetricKeyDetails,
            'keyAlgo': key.asymmetricKeyType,
        });
    }

    if (key.asymmetricKeyType !== 'ec') {

        throw new eL.E_INVALID_KEY(eL.EErrorCode.INVALID_KEY_ALGO, {
            'keyUsage': key.type,
            'keyDetails': key.asymmetricKeyDetails,
            'keyAlgo': key.asymmetricKeyType,
        });
    }

    if (!keyUsage[key.type as 'public']) {

        throw new eL.E_INVALID_KEY(eL.EErrorCode.INVALID_KEY_USAGE, {
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
            throw new eL.E_INVALID_KEY(eL.EErrorCode.INVALID_JWA_KEY, {
                'keyUsage': key.type,
                'keyDetails': key.asymmetricKeyDetails,
                'keyAlgo': key.asymmetricKeyType,
            });
    }
}

function preparePrivateKey(key: string | NodeCrypto.KeyObject): NodeCrypto.KeyObject {

    if (key instanceof NodeCrypto.KeyObject) {

        return key;
    }

    try {

        return NodeCrypto.createPrivateKey({
            format: (typeof key === 'string' ? 'pem' : 'der'),
            key,
        });
    }
    catch (e) {

        throw new eL.E_INVALID_KEY(eL.EErrorCode.INVALID_KEY_FORMAT, {}, e);
    }
}

function preparePublicKey(key: string | NodeCrypto.KeyObject): NodeCrypto.KeyObject {

    if (key instanceof NodeCrypto.KeyObject) {

        return key;
    }

    try {

        return NodeCrypto.createPublicKey(key);
    }
    catch (e) {

        throw new eL.E_INVALID_KEY(eL.EErrorCode.INVALID_KEY_FORMAT, {}, e);
    }
}

/**
 * The ECDSA JWT signer implementation.
 */
export class EcdsaJwtSigner implements dL.IJwtSigner {

    public readonly family: cL.ESigningAlgoFamily = cL.ESigningAlgoFamily.ECDSA;

    public readonly jwa: cL.ESigningJwa;

    public readonly keyId?: string | null;

    public readonly digestType: cL.EDigestType;

    private readonly _signOpts: NodeCrypto.SignKeyObjectInput;

    public constructor(opts: IEcdsaSignerOptions) {

        this.keyId = opts.keyId;
        const key = preparePrivateKey(opts.privateKey);
        [this.jwa, this.digestType] = extractJwaFromKey(key, { private: true });

        this._signOpts = {
            'key': key,
            'dsaEncoding': 'ieee-p1363',
        };
    }

    public sign(content: Buffer | string): Buffer {

        return NodeCrypto.createSign(this.digestType)
            .update(content)
            .sign(this._signOpts);
    }
}

/**
 * The options for creating an ECDSA signature verifier for JWT.
 */
export interface IEcdsaVerifierOptions {

    /**
     * The public key to use for ECDSA signature verification.
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
 * The ECDSA signature verifier implementation for JWT.
 *
 * This verifier class checks if the signature is valid.
 * It neither parses the JWT, nor validates the JWT token claims.
 */
export class EcdsaJwtVerifier implements dL.IJwtValidator {

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

    private readonly _digestType: cL.EDigestType;

    private readonly _verifyOpts: NodeCrypto.VerifyKeyObjectInput;

    public constructor(opts: IEcdsaVerifierOptions) {

        this.checkAlgClaim = opts.checkAlgClaim ?? true;
        const key = preparePublicKey(opts.publicKey);

        [this.jwa, this._digestType] = extractJwaFromKey(key, {
            public: true,
            private: true, // Private key can also be used for verification
        });

        this._verifyOpts = {
            'key': key,
            'dsaEncoding': 'ieee-p1363',
        };
    }

    public validate(data: dL.IJwtParseResult): boolean {

        /**
         * The `alg` header claim is optional, do not check it unless it's
         * present.
         */
        if ('alg' in data.header && data.header.alg !== this.jwa) {

            return false;
        }

        return NodeCrypto.createVerify(this._digestType)
            .update(data.signedContent)
            .verify(this._verifyOpts, data.signature);
    }
}
