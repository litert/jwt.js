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
import * as eL from '../Errors';

/**
 * Transform the input into a Node.js KeyObject representing a private key.
 *
 * @internal
 */
export function preparePrivateKey(key: string | NodeCrypto.KeyObject): NodeCrypto.KeyObject {

    if (key instanceof NodeCrypto.KeyObject) {

        return key;
    }

    try {

        return NodeCrypto.createPrivateKey(key);
    }
    catch (e) {

        throw new eL.E_INVALID_SETTINGS(eL.EErrorCode.INVALID_KEY_FORMAT, {}, e);
    }
}

/**
 * Transform the input into a Node.js KeyObject representing a public key.
 *
 * @internal
 */
export function preparePublicKey(key: string | NodeCrypto.KeyObject): NodeCrypto.KeyObject {

    if (key instanceof NodeCrypto.KeyObject) {

        return key;
    }

    try {

        return NodeCrypto.createPublicKey(key);
    }
    catch (e) {

        throw new eL.E_INVALID_SETTINGS(eL.EErrorCode.INVALID_KEY_FORMAT, {}, e);
    }
}

export function createSigner(digest: string): NodeCrypto.Sign {

    try {

        return NodeCrypto.createSign(digest);
    }
    catch (e) {

        throw new eL.E_SIGN_FAILED(eL.EErrorCode.UNKNOWN_DIGEST_TYPE, {
            'digestType': digest,
        }, e);
    }
}

export function createVerifier(digest: string): NodeCrypto.Verify {

    try {

        return NodeCrypto.createVerify(digest);
    }
    catch (e) {

        throw new eL.E_VERIFY_FAILED(eL.EErrorCode.UNKNOWN_DIGEST_TYPE, {
            'digestType': digest,
        }, e);
    }
}
