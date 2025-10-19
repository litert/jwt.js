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
import type * as uT from '@litert/utils-ts-types';
import * as eL from '../Errors';
import * as cL from '../Constants';

const VALID_ALG = Object.values(cL.ESigningJwa).reduce((acc, alg) => {
    acc[alg] = true;
    return acc;
// eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
}, {} as uT.IDict<boolean>);

/**
 * The function to decode a JWT string into its components.
 *
 * This function is one of the core APIs for JWT operations, and also a low-level
 * API for parsing JWTs. It does decode JWTs into components, without doing any
 * other operations like validating the JWT token claims, verifying the signature,
 *
 * The only validation it will do is to check the basic format of the JWT string,
 * and the `typ` and `alg` claims in the header if they are present.
 *
 * @param jwt   The JWT string to parse.
 *
 * @returns    The parsed JWT components.
 */
export function parse(jwt: string): dL.IJwtParseResult {

    const [headerB64, payloadB64, sigB64] = jwt.split('.');

    if (!headerB64 || !payloadB64 || !sigB64) {

        throw new eL.E_INVALID_JWT(eL.EErrorCode.INVALID_FORMAT);
    }

    const header = parseJsonFromBase64url<dL.IJwtHeader>(headerB64);

    if ((header?.typ ?? 'JWT') !== 'JWT') {

        throw new eL.E_INVALID_JWT(eL.EErrorCode.INVALID_TYP_HEADER);
    }

    if (!VALID_ALG[header.alg ?? 'ES256']) {

        throw new eL.E_INVALID_JWT(eL.EErrorCode.INVALID_ALG_HEADER);
    }

    return {
        'header': header,
        'payload': parseJsonFromBase64url<dL.IJwtPayload>(payloadB64),
        'signature': Buffer.from(sigB64, 'base64url'),
        'signedContent': `${headerB64}.${payloadB64}`,
    };
}

function parseJsonFromBase64url<T>(jsonBase64url: string): T {

    try {

        const ret = JSON.parse(Buffer.from(jsonBase64url, 'base64url').toString('utf-8')) as T;

        if (typeof ret !== 'object' || ret === null || Array.isArray(ret)) {

            throw new eL.E_INVALID_JWT(eL.EErrorCode.INVALID_FORMAT);
        }

        return ret;
    }
    catch {

        throw new eL.E_INVALID_JWT(eL.EErrorCode.INVALID_FORMAT);
    }
}
