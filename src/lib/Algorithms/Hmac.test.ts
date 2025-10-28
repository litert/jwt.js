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
import * as NodeCrypto from 'node:crypto';
import * as NodeAssert from 'node:assert';
import * as eL from '../Errors';
import * as cL from '../Constants';
import { HmacJwaSigner, HmacJwaVerifier } from './Hmac';

NodeTest.describe('JWA HMAC', () => {

    for (const alg of ['HS256', 'HS384', 'HS512'] as const) {

        const key = NodeCrypto.randomBytes(64);

        const digestType = cL.EDigestType[`SHA${alg.slice(2, 5) as '256'}`];
        const signer = new HmacJwaSigner({ key, digestType });

        const verifier = new HmacJwaVerifier({ key, digestType });

        NodeTest.it(`[${alg}] JWA name should be corrected`, () => {

            NodeAssert.strictEqual(signer.jwa, alg);
            NodeAssert.strictEqual(verifier.jwa, alg);
        });

        NodeTest.it(`[${alg}] digest type should be corrected`, () => {

            NodeAssert.strictEqual(signer.digestType, digestType);
            NodeAssert.strictEqual(verifier.digestType, digestType);
        });

        NodeTest.it(`[${alg}] should match signing and verifying`, () => {

            NodeAssert.doesNotThrow(() => {

                verifier.validate({
                    header: { 'alg': alg },
                    payload: { data: 'test' },
                    signedContent: 'test-signature',
                    signature: signer.sign('test-signature'),
                });
            });
        });

        NodeTest.it(`[${alg}] should throw error if signature mismatches`, () => {

            NodeAssert.throws(() => {

                verifier.validate({
                    header: { 'alg': alg },
                    payload: { data: 'test' },
                    signedContent: 'test-signature-1',
                    signature: signer.sign('test-signature'),
                });
            }, {
                name: 'verify_failed',
                code: eL.EErrorCode.SIGNATURE_VERIFY_FAILED,
            });
        });

        NodeTest.it(`[${alg}] should throw error if signature is malformed`, () => {

            NodeAssert.throws(() => {

                verifier.validate({
                    header: { 'alg': alg },
                    payload: { data: 'test' },
                    signedContent: 'test-signature-1',
                    signature: Buffer.from('malformed-signature'),
                });
            }, {
                name: 'verify_failed',
                code: eL.EErrorCode.SIGNATURE_VERIFY_FAILED,
            }, 'Bad formatted signature should throw error');
        });

        NodeTest.it(`should throw error if "alg" claim mismatch by default`, () => {

            NodeAssert.throws(() => {

                verifier.validate({
                    header: { 'alg': 'RS256' },
                    payload: { data: 'test' },
                    signedContent: 'test-signature',
                    signature: signer.sign('test-signature'),
                });
            }, {
                name: 'verify_failed',
                code: eL.EErrorCode.SIGNATURE_ALG_MISMATCH,
            });
        });

        NodeTest.it(`should not check "alg" claim when it's not present`, () => {

            NodeAssert.doesNotThrow(() => {

                verifier.validate({
                    header: {} as any,
                    payload: { data: 'test' },
                    signedContent: 'test-signature',
                    signature: signer.sign('test-signature'),
                });
            });
        });

        NodeTest.it(`should not check "alg" claim when it's not asked to`, () => {

            verifier.checkAlgClaim = false;

            NodeAssert.doesNotThrow(() => {

                verifier.validate({
                    header: { 'alg': 'RS256' },
                    payload: { data: 'test' },
                    signedContent: 'test-signature',
                    signature: signer.sign('test-signature'),
                });
            });

            verifier.checkAlgClaim = true;
        });
    }

    NodeTest.it(`should throw error for unknown digest type`, () => {

        NodeAssert.throws(() => {

            new HmacJwaSigner({
                key: NodeCrypto.randomBytes(64),
                digestType: 'SHA999' as any,
            });
        }, {
            name: 'invalid_settings',
            code: eL.EErrorCode.UNKNOWN_DIGEST_TYPE,
        });

        NodeAssert.throws(() => {

            new HmacJwaVerifier({
                key: NodeCrypto.randomBytes(64),
                digestType: 'SHA999' as any,
            });
        }, {
            name: 'invalid_settings',
            code: eL.EErrorCode.UNKNOWN_DIGEST_TYPE,
        });
    });

    NodeTest.it(`should throw error for invalid key`, () => {

        NodeAssert.throws(() => {

            new HmacJwaSigner({
                key: null as any,
                digestType: cL.EDigestType.SHA256,
            });
        }, {
            name: 'invalid_settings',
            code: eL.EErrorCode.INVALID_KEY_FORMAT,
        });

        NodeAssert.throws(() => {

            new HmacJwaVerifier({
                key: Symbol('invalid-key') as any,
                digestType: cL.EDigestType.SHA256,
            });
        }, {
            name: 'invalid_settings',
            code: eL.EErrorCode.INVALID_KEY_FORMAT,
        });
    });

    NodeTest.it(`should throw error if invalid content provided for signing`, () => {

        NodeAssert.throws(() => {

            new HmacJwaSigner({
                key: '12345',
                digestType: cL.EDigestType.SHA256,
            }).sign(true as any);
        }, {
            name: 'sign_failed',
            code: eL.EErrorCode.SIGN_FAILED,
        });
    });

    NodeTest.it(`should throw error if invalid content provided for verification`, () => {

        NodeAssert.throws(() => {

            new HmacJwaVerifier({
                key: '12345',
                digestType: cL.EDigestType.SHA256,
            }).validate({
                header: { 'alg': 'HS256' },
                payload: { data: 'test' },
                signedContent: true as any,
                signature: new HmacJwaSigner({
                    key: '12345',
                    digestType: cL.EDigestType.SHA256,
                }).sign('test-signature'),
            });
        }, {
            name: 'verify_failed',
            code: eL.EErrorCode.SIGNATURE_VERIFY_FAILED,
        });
    });

    NodeTest.it(`should throw error if key is mismatched`, () => {

        NodeAssert.throws(() => {

            new HmacJwaVerifier({
                key: 'a', digestType: cL.EDigestType.SHA256,
            }).validate({
                header: { 'alg': 'HS256' },
                payload: { data: 'test' },
                signedContent: 'test-signature',
                signature: new HmacJwaSigner({
                    key: 'b', digestType: cL.EDigestType.SHA256,
                }).sign('test-signature'),
            });
        }, {
            name: 'verify_failed',
            code: eL.EErrorCode.SIGNATURE_VERIFY_FAILED,
        });
    });
});
