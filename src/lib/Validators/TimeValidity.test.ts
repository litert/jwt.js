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
import { JwtTimeValidityValidator } from './TimeValidity';
import { EErrorCode } from '../Errors';

const EMPTY_BUFFER = Buffer.alloc(0);

NodeTest.describe('class JwtTimeValidityValidator', () => {

    NodeTest.it('[default] should require and validate exp', () => {

        const validator = new JwtTimeValidityValidator();

        NodeAssert.doesNotThrow(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'exp': Math.floor(Date.now() / 1000) + 60,
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }));

        NodeAssert.throws(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'exp': Math.floor(Date.now() / 1000) - 1,
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }), { name: 'verify_failed', code: EErrorCode.EXPIRED });

        NodeAssert.throws(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'exp': 1.2,
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }), { name: 'verify_failed', code: EErrorCode.INVALID_PAYLOAD_CLAIM });

        NodeAssert.throws(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }), { name: 'verify_failed', code: EErrorCode.MISSING_PAYLOAD_CLAIM });
    });

    NodeTest.it('[default] should validate nbf but optional', () => {

        const validator = new JwtTimeValidityValidator();

        NodeAssert.doesNotThrow(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'exp': Math.floor(Date.now() / 1000) + 60,
                'nbf': Math.floor(Date.now() / 1000) - 60,
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }));

        NodeAssert.throws(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'exp': Math.floor(Date.now() / 1000) + 60,
                'nbf': Math.floor(Date.now() / 1000) + 60,
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }), { name: 'verify_failed', code: EErrorCode.NOT_VALID_YET });

        NodeAssert.throws(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'exp': Math.floor(Date.now() / 1000) + 60,
                'nbf': 1.2,
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }), { name: 'verify_failed', code: EErrorCode.INVALID_PAYLOAD_CLAIM });

        NodeAssert.doesNotThrow(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'exp': Math.floor(Date.now() / 1000) + 60,
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }));
    });

    NodeTest.it('should not check if not asked for nbf', () => {

        const validator = new JwtTimeValidityValidator({
            claims: { nbf: { check: false } },
        });

        NodeAssert.doesNotThrow(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'exp': Math.floor(Date.now() / 1000) + 60,
                'nbf': Math.floor(Date.now() / 1000) + 60,
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }));

        NodeAssert.doesNotThrow(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'exp': Math.floor(Date.now() / 1000) + 60,
                'nbf': null as unknown as number,
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }));

        NodeAssert.doesNotThrow(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'exp': Math.floor(Date.now() / 1000) + 60,
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }));
    });

    NodeTest.it('should not check if not asked for exp', () => {

        const validator = new JwtTimeValidityValidator({
            claims: { exp: { check: false } },
        });

        NodeAssert.doesNotThrow(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'exp': Math.floor(Date.now() / 1000) - 60,
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }));

        NodeAssert.doesNotThrow(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }));

        NodeAssert.doesNotThrow(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'exp': null as unknown as number,
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }));
    });
    NodeTest.it('should catch all errors and turn them into JwtErrors', () => {

        const validator = new JwtTimeValidityValidator({
            claims: { exp: { check: false } },
        });

        NodeAssert.throws(() => validator.validate(null as any), {
            name: 'verify_failed',
            code: EErrorCode.UNKNOWN_ERROR,
        });
    });
});
