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
}

type IKeyUsage = Partial<Record<'public' | 'private', boolean>>;

function extractJwaFromKey(
    key: NodeCrypto.KeyObject,
    digest: cL.EDigestType,
    keyUsage: IKeyUsage,
): cL.ESigningJwa {

    if (!key.asymmetricKeyDetails || !key.asymmetricKeyType) {

        throw new eL.E_INVALID_KEY(eL.EErrorCode.INVALID_KEY_TYPE, {
            'keyUsage': key.type,
            'keyDetails': key.asymmetricKeyDetails,
            'keyAlgo': key.asymmetricKeyType,
        });
    }

    if (key.asymmetricKeyType !== 'rsa' && key.asymmetricKeyType !== 'rsa-pss') {

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

    if (key.asymmetricKeyDetails.modulusLength! < 2048) {

        throw new eL.E_INVALID_KEY(eL.EErrorCode.INVALID_KEY_SIZE, {
            'keyUsage': key.type,
            'keyDetails': key.asymmetricKeyDetails,
            'keyAlgo': key.asymmetricKeyType,
        });
    }

    switch (`${key.asymmetricKeyType}-${digest}`) {
        case 'rsa-sha256':
            return cL.ESigningJwa.RS256;
        case 'rsa-sha384':
            return cL.ESigningJwa.RS384;
        case 'rsa-sha512':
            return cL.ESigningJwa.RS512;
        case 'rsa-pss-sha256':
            return cL.ESigningJwa.PS256;
        case 'rsa-pss-sha384':
            return cL.ESigningJwa.PS384;
        case 'rsa-pss-sha512':
            return cL.ESigningJwa.PS512;
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
 * The RSA JWT signer implementation.
 */
export class RsaJwtSigner implements dL.IJwtSigner {

    public readonly family: cL.ESigningAlgoFamily = cL.ESigningAlgoFamily.RSA;

    public readonly jwa: cL.ESigningJwa;

    public readonly keyId?: string | null;

    public readonly digestType: cL.EDigestType;

    private readonly _key: NodeCrypto.KeyObject;

    public constructor(opts: IRsaSignerOptions) {

        this.keyId = opts.keyId;
        this._key = preparePrivateKey(opts.privateKey);
        this.digestType = opts.digestType;
        this.jwa = extractJwaFromKey(this._key, this.digestType, { private: true });
    }

    public sign(content: Buffer | string): Buffer {

        return NodeCrypto.createSign(this.digestType)
            .update(content)
            .sign(this._key);
    }
}

/**
 * The options for creating an RSA signature verifier for JWT.
 */
export interface IRsaVerifierOptions {

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
}

/**
 * The RSA signature verifier implementation for JWT.
 *
 * This verifier class checks if the signature is valid.
 * It neither parses the JWT, nor validates the JWT token claims.
 */
export class RsaJwtVerifier implements dL.IJwtValidator {

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

    private readonly _digestType: cL.EDigestType;

    private readonly _key: NodeCrypto.KeyObject;

    public constructor(opts: IRsaVerifierOptions) {

        this.checkAlgClaim = opts.checkAlgClaim ?? true;
        this._key = preparePublicKey(opts.publicKey);
        this._digestType = opts.digestType;

        this.jwa = extractJwaFromKey(this._key, this._digestType, {
            public: true,
            private: true, // Private key can also be used for verification
        });
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
            .verify(this._key, data.signature);
    }
}
