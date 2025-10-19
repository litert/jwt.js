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
            throw new eL.E_INVALID_DIGEST(eL.EErrorCode.UNKNOWN_DIGEST_TYPE, {
                'digestType': digestType,
            });
    }
}

/**
 * The HMAC JWT signer implementation.
 */
export class HmacJwtSigner implements dL.IJwtSigner {

    public readonly family: cL.ESigningAlgoFamily = cL.ESigningAlgoFamily.HMAC;

    public readonly jwa: cL.ESigningJwa;

    public readonly keyId?: string | null;

    public readonly digestType: cL.EDigestType;

    private readonly _key: Buffer;

    public constructor(opts: IHmacSignerOptions) {

        this.keyId = opts.keyId;
        this.digestType = opts.digestType;
        this._key = (typeof opts.key === 'string') ?
            Buffer.from(opts.key, 'utf-8') :
            opts.key;

        this.jwa = parseJwaFromDigestType(this.digestType);
    }

    public sign(content: Buffer | string): Buffer {

        return NodeCrypto.createHmac(
            this.digestType,
            this._key,
        )
            .update(content)
            .digest();
    }
}

/**
 * The options for creating an HMAC signature verifier for JWT.
 */
export interface IHmacVerifierOptions {

    /**
     * The secret key to use for HMAC signature verification.
     */
    'key': string | Buffer;

    /**
     * The digest type to use for HMAC signature verification.
     */
    'digestType': cL.EDigestType;
}

/**
 * The HMAC signature verifier implementation for JWT.
 *
 * This verifier class checks if the signature is valid.
 * It neither parses the JWT, nor validates the JWT token claims.
 */
export class HmacJwtVerifier implements dL.IJwtValidator {

    /**
     * The signing algorithm family.
     */
    public readonly family: cL.ESigningAlgoFamily = cL.ESigningAlgoFamily.HMAC;

    /**
     * The JWA algorithm name.
     */
    public readonly jwa: cL.ESigningJwa;

    private readonly _digestType: cL.EDigestType;

    private readonly _key: Buffer;

    public constructor(opts: IHmacVerifierOptions) {

        this.jwa = parseJwaFromDigestType(opts.digestType);

        this._digestType = opts.digestType;
        this._key = (typeof opts.key === 'string') ?
            Buffer.from(opts.key, 'utf-8') :
            opts.key;
    }

    public validate(data: dL.IJwtParseResult): boolean {

        /**
         * The `alg` header claim is optional, do not check it unless it's
         * present.
         */
        if ('alg' in data.header && data.header.alg !== this.jwa) {

            return false;
        }

        const expectedSig = NodeCrypto.createHmac(
            this._digestType,
            this._key,
        )
            .update(data.signedContent)
            .digest();

        return NodeCrypto.timingSafeEqual(expectedSig, data.signature);
    }
}
