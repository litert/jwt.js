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
import * as eL from '../Errors';
import { parse } from './Parse';

NodeTest.describe('API parse', () => {

    NodeTest.it('should throw error if JWT is invalid format', () => {

        for (const token of [
            '',
            '.',
            '..',
            '...',
            'invalid',
            'invalid.',
            'invalid.jwt',
            'invalid.jwt.',
            'invalid.jwt.token',
            'invalid.jwt.token.',
            'invalid.jwt.token.extra',
            '.invalid',
            '.invalid.jwt',
            '.invalid.jwt.',
            '.invalid.jwt.token',
            '.invalid.jwt.token.',
            '.invalid.jwt.token.extra',
            '..invalid',
            '..invalid.jwt',
            '..invalid.jwt.',
            '..invalid.jwt.token',
            '..invalid.jwt.token.',
            '..invalid.jwt.token.extra',
            '...invalid',
            '...invalid.jwt',
            '...invalid.jwt.',
            '...invalid.jwt.token',
            '...invalid.jwt.token.',
            '...invalid.jwt.token.extra',
            'e30.invalid.signature', // {}
            'invalid.e30.signature',
            'W10.invalid.signature', // []
            'invalid.W10.signature',
            'IiI.invalid.signature', // ""
            'invalid.IiI.signature',
            'MTIz.invalid.signature', // 123
            'invalid.MTIz.signature',
            'bnVsbA.invalid.signature', // null
            'invalid.bnVsbA.signature',
            'dHJ1ZQ.invalid.signature', // true
            'invalid.dHJ1ZQ.signature',
        ]) {
            NodeAssert.throws(() => parse(token), {
                name: 'verify_failed',
                code: eL.EErrorCode.INVALID_FORMAT,
            });
        }

        NodeAssert.throws(() => parse('eyJ0eXAiOiJXSEFUIn0.e30.signature'), {
            name: 'verify_failed',
            code: eL.EErrorCode.INVALID_TYP_HEADER,
        });
    });

    NodeTest.it('should parse valid JWT correctly', () => {

        const r1 = parse('e30.e30.MTIzNDU'); // {}.{}

        NodeAssert.deepStrictEqual(r1.header, {});
        NodeAssert.deepStrictEqual(r1.payload, {});
        NodeAssert.strictEqual(r1.signedContent, 'e30.e30');
        NodeAssert.strictEqual(r1.signature.toString('base64url'), 'MTIzNDU');

        const r2 = parse('eyJ0eXAiOiJKV1QifQ.eyJ0ZXN0IjoiYTEyMyJ9.MTIzNDU'); // {"typ":"JWT"}.{"test":"a123"}

        NodeAssert.deepStrictEqual(r2.header, { typ: 'JWT' });
        NodeAssert.deepStrictEqual(r2.payload, { test: 'a123' });
        NodeAssert.strictEqual(r2.signedContent, 'eyJ0eXAiOiJKV1QifQ.eyJ0ZXN0IjoiYTEyMyJ9');
        NodeAssert.strictEqual(r2.signature.toString('base64url'), 'MTIzNDU');
    });
});
