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

import * as NodeTest from 'node:test';
import * as NodeAssert from 'node:assert';
import type * as dL from '../Types';
import * as cL from '../Constants';
import * as eL from '../Errors';
import { stringify } from './Stringify';

class TestSigner implements dL.IJwaSigner {
    public readonly family = cL.ESigningAlgoFamily.HMAC;
    public readonly jwa = cL.ESigningJwa.HS256;
    public readonly digestType = cL.EDigestType.SHA256;

    public shouldThrow = false;

    public sign(): Buffer {
        if (this.shouldThrow) {
            throw new Error('Test sign error');
        }
        return Buffer.from('test');
    }
}

NodeTest.describe('API stringify', () => {

    NodeTest.it('should always add typ and alg header claims', () => {

        const signer = new TestSigner();
        const jwt = stringify({
            header: {},
            payload: { a: 123 },
            signer: signer,
        });

        const [headerB64] = jwt.split('.');
        const header = JSON.parse(Buffer.from(headerB64, 'base64url').toString('utf-8'));

        NodeAssert.deepStrictEqual(header, {
            alg: signer.jwa,
            typ: 'JWT',
        });
    });

    NodeTest.it('should put exactly the same claims in the header and payload', () => {

        const signer = new TestSigner();
        const jwt = stringify({
            header: { hello: 'world' },
            payload: { a: 123 },
            signer: signer,
        });

        const [headerB64, payloadB64] = jwt.split('.');
        const header = JSON.parse(Buffer.from(headerB64, 'base64url').toString('utf-8'));
        const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'));

        NodeAssert.deepStrictEqual(header, {
            alg: signer.jwa,
            typ: 'JWT',
            hello: 'world',
        });

        NodeAssert.deepStrictEqual(payload, { a: 123 });
    });

    NodeTest.it('should throw error if failed', () => {

        const signer = new TestSigner();

        NodeAssert.throws(() => stringify({
            header: { hello: BigInt(123) as unknown as string },
            payload: { a: 123 },
            signer: signer,
        }), {
            name: 'sign_failed',
            code: eL.EErrorCode.INVALID_JWT_CONTENT,
        });

        NodeAssert.throws(() => stringify({
            payload: { hello: BigInt(123) as unknown as string },
            signer: signer,
        }), {
            name: 'sign_failed',
            code: eL.EErrorCode.INVALID_JWT_CONTENT,
        });

        signer.shouldThrow = true;

        NodeAssert.throws(() => stringify({
            payload: { a: 123 },
            signer: signer,
        }), {
            name: 'Error',
            message: 'Test sign error',
        });
    });
});
