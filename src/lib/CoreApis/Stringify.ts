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

import type * as dL from '../Types';
import * as eL from '../Errors';

/**
 * The options for API `stringify`.
 */
export interface IStringifyOptions {

    /**
     * The JWT header to use.
     *
     * The `typ` (type) and `alg` (algorithm) claims will be set
     * automatically according to the provided signer. And they are not
     * allowed to be overridden.
     */
    header?: dL.IJwtHeaderInput;

    /**
     * The JWT payload to use.
     *
     * Only the user provided claims will be included in the JWT.
     * No default claims will be set.
     */
    payload: dL.IJwtPayload;

    /**
     * The signer to use for signing the JWT.
     */
    signer: dL.IJwaSigner;
}

/**
 * Encode the provided JWT data into a signed JWT string.
 *
 * This function is one of the core APIs for JWT operations, and also a low-level
 * API for signing JWTs. It does encode JWTs by provided header and payload,
 * without doing any other operations like setting default claims in the payload,
 * validating the payload claims, etc.
 *
 * The only default operations it will do is to set the `typ` and `alg` claims
 * in the JWT header according to the provided signer, and sign the JWT using
 * the provided signer.
 *
 * @param options   The options to use for stringification of the JWT.
 *
 * @returns  The signed JWT string.
 *
 * @example
 * ```ts
 * import * as LibJWT from '@litert/jwt';
 * const signer = new LibJWT.RsaJwaSigner({
 *   privateKey: '-----BEGIN PRIVATE KEY-----\n...',
 *   digestType: LibJWT.EDigestType.SHA256,
 * });
 * const token = LibJWT.stringify({
 *   header: {
 *     kid: 'my-key-id',
 *   },
 *   payload: { foo: 'bar' },
 *   signer: signer,
 * });
 * console.log(token);
 * ```
 */
export function stringify(options: IStringifyOptions): string {

    let signingInput: string;

    try {

        signingInput = `${
            Buffer.from(JSON.stringify({
                ...options.header,
                typ: 'JWT',
                alg: options.signer.jwa,
            }), 'utf-8').toString('base64url')
        }.${
            Buffer.from(JSON.stringify(options.payload), 'utf-8').toString('base64url')
        }`;
    }
    catch (e) {

        throw new eL.E_SIGN_FAILED(eL.EErrorCode.INVALID_JWT_CONTENT, {}, e);
    }

    return `${signingInput}.${
        options.signer
            .sign(signingInput)
            .toString('base64url')
    }`;
}
