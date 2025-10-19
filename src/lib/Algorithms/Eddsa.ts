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
 * The options for creating an EDDSA JWT signer.
 */
export interface IEddsaSignerOptions {

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

    if (!key.asymmetricKeyType) {

        throw new eL.E_INVALID_KEY(eL.EErrorCode.INVALID_KEY_TYPE, {
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

    switch (key.asymmetricKeyType) {
        case 'ed25519':
            return [ cL.ESigningJwa.EDDSA, cL.EDigestType.SHA512 ];
        case 'ed448':
            return [ cL.ESigningJwa.EDDSA, cL.EDigestType.SHAKE256 ];
        default:
            throw new eL.E_INVALID_KEY(eL.EErrorCode.INVALID_KEY_ALGO, {
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
 * The EDDSA JWT signer implementation.
 */
export class EddsaJwtSigner implements dL.IJwtSigner {

    public readonly family: cL.ESigningAlgoFamily = cL.ESigningAlgoFamily.EDDSA;

    public readonly jwa: cL.ESigningJwa;

    public readonly keyId?: string | null;

    public readonly digestType: cL.EDigestType;

    private readonly _key: NodeCrypto.KeyObject;

    public constructor(opts: IEddsaSignerOptions) {

        this.keyId = opts.keyId;
        this._key = preparePrivateKey(opts.privateKey);
        [this.jwa, this.digestType] = extractJwaFromKey(this._key, { private: true });
    }

    public sign(content: Buffer | string): Buffer {

        return NodeCrypto.sign(
            null,
            typeof content === 'string' ? Buffer.from(content, 'utf-8') : content,
            this._key,
        );
    }
}

/**
 * The options for creating an EDDSA signature verifier for JWT.
 */
export interface IEddsaVerifierOptions {

    /**
     * The public key to use for EDDSA signature verification.
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
 * The EDDSA signature verifier implementation for JWT.
 *
 * This verifier class checks if the signature is valid.
 * It neither parses the JWT, nor validates the JWT token claims.
 */
export class EddsaJwtVerifier implements dL.IJwtValidator {

    /**
     * The signing algorithm family.
     */
    public readonly family: cL.ESigningAlgoFamily = cL.ESigningAlgoFamily.EDDSA;

    /**
     * The JWA algorithm name.
     */
    public readonly jwa: cL.ESigningJwa;

    private readonly _key: NodeCrypto.KeyObject;

    /**
     * Whether to check the `alg` claim in the JWT header if it is present.
     */
    public checkAlgClaim: boolean;

    public readonly digestType: cL.EDigestType;

    public constructor(opts: IEddsaVerifierOptions) {

        this._key = preparePublicKey(opts.publicKey);
        this.checkAlgClaim = opts.checkAlgClaim ?? true;

        [this.jwa, this.digestType] = extractJwaFromKey(this._key, {
            public: true,
            private: true, // Private key can also be used for verification
        });
    }

    public validate(data: dL.IJwtParseResult): boolean {

        /**
         * The `alg` header claim is optional, do not check it unless it's
         * present.
         */
        if (this.checkAlgClaim && 'alg' in data.header && data.header.alg !== this.jwa) {

            return false;
        }

        return NodeCrypto.verify(
            null,
            typeof data.signedContent === 'string' ?
                Buffer.from(data.signedContent, 'utf-8') :
                data.signedContent,
            this._key,
            data.signature,
        );
    }
}
