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
import { JwtAudienceValidator } from './Audience';
import { EErrorCode } from '../Errors';

const EMPTY_BUFFER = Buffer.alloc(0);

NodeTest.describe('class JwtAudienceValidator', () => {

    NodeTest.it('Only item in allowlist should be allowed', () => {

        const validator = new JwtAudienceValidator({
            allowlist: [
                'trusted-audience',
            ],
        });

        NodeAssert.doesNotThrow(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'aud': 'trusted-audience',
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }));

        NodeAssert.throws(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'aud': 'untrusted-audience',
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }), { name: 'verify_failed', code: EErrorCode.INVALID_PAYLOAD_CLAIM });
    });

    NodeTest.it('Function-type allowlist should work', () => {

        const validator = new JwtAudienceValidator({
            allowlist: [
                (aud: string) => aud.endsWith('@trusted.com'),
                '123',
            ],
        });

        NodeAssert.doesNotThrow(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'aud': '123',
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }));

        NodeAssert.doesNotThrow(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'aud': 'test@trusted.com',
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }));

        NodeAssert.throws(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'aud': 'untrusted-audience',
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }), { name: 'verify_failed', code: EErrorCode.INVALID_PAYLOAD_CLAIM });
    });

    NodeTest.it('Regex-type allowlist should work', () => {

        const validator = new JwtAudienceValidator({
            allowlist: [
                /^https:\/\/trusted\.domain\/.+$/,
            ],
        });

        NodeAssert.doesNotThrow(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'aud': 'https://trusted.domain/user123',
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }));

        NodeAssert.throws(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'aud': 'http://trusted.domain/user123',
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }), { name: 'verify_failed', code: EErrorCode.INVALID_PAYLOAD_CLAIM });
    });

    NodeTest.it('Invalid audience claim type should throw', () => {

        const validator = new JwtAudienceValidator({
            allowlist: [
                'trusted-audience',
            ],
        });

        NodeAssert.throws(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'aud': 12345 as unknown as string,
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }), { name: 'verify_failed', code: EErrorCode.INVALID_PAYLOAD_CLAIM });
    });

    NodeTest.it('Empty allowlist should deny any JWT', () => {

        const validator = new JwtAudienceValidator({
            allowlist: [],
        });

        NodeAssert.throws(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'aud': 'any-audience',
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }), { name: 'verify_failed', code: EErrorCode.INVALID_PAYLOAD_CLAIM });
    });

    NodeTest.it('Multiple audiences in claim should work', () => {

        const validator = new JwtAudienceValidator({
            allowlist: [
                'trusted-audience',
                (v) => v.endsWith('@trusted.com'),
            ],
        });

        NodeAssert.doesNotThrow(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'aud': [
                    'untrusted-audience',
                    'trusted-audience',
                ],
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }));

        NodeAssert.doesNotThrow(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'aud': [
                    'untrusted-audience',
                    'aaa@trusted.com',
                ],
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }));

        NodeAssert.throws(() => validator.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'aud': [
                    'untrusted-audience-1',
                    'untrusted-audience-2',
                ],
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }), { name: 'verify_failed', code: EErrorCode.INVALID_PAYLOAD_CLAIM });
    });

    NodeTest.it('Missing audience claim should throw if required', () => {

        const validator1 = new JwtAudienceValidator({
            allowlist: [
                'trusted-audience',
            ],
            claimRequired: true,
        });

        NodeAssert.throws(() => validator1.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }), { name: 'verify_failed', code: EErrorCode.INVALID_PAYLOAD_CLAIM });

        NodeAssert.throws(() => validator1.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                'aud': null as unknown as string,
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }), { name: 'verify_failed', code: EErrorCode.INVALID_PAYLOAD_CLAIM });

        const validator2 = new JwtAudienceValidator({
            allowlist: [
                'trusted-audience',
            ],
            claimRequired: false,
        });

        NodeAssert.doesNotThrow(() => validator2.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }));

        NodeAssert.doesNotThrow(() => validator2.validate({
            header: {
                'alg': 'HS256',
            },
            payload: {
                aud: null as unknown as string,
            },
            signedContent: '',
            signature: EMPTY_BUFFER,
        }));
    });
});
