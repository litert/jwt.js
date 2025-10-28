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
import * as NodeFS from 'node:fs';
import * as NodeAssert from 'node:assert';
import * as eL from '../Errors';
import { EddsaJwaSigner, EddsaJwaVerifier } from './Eddsa';

NodeTest.describe('JWA EdDSA', () => {

    for (const alg of ['ed448', 'ed25519'] as const) {

        const privKey = NodeFS.readFileSync(
            `${__dirname}/../../test-data/ok-${alg}.p8.pem`,
            'utf-8',
        );
        const pubKey = NodeFS.readFileSync(
            `${__dirname}/../../test-data/ok-${alg}.pub.pem`,
            'utf-8',
        );

        const signer = new EddsaJwaSigner({
            privateKey: privKey,
        });

        const verifier = new EddsaJwaVerifier({
            publicKey: pubKey,
        });

        NodeTest.it(`[${alg}] JWA name should be corrected`, () => {

            NodeAssert.strictEqual(signer.jwa, 'EdDSA');
            NodeAssert.strictEqual(verifier.jwa, 'EdDSA');
        });

        NodeTest.it(`[${alg}] digest type should be corrected`, () => {

            const digest = alg === 'ed25519' ? 'sha512' : 'shake256';

            NodeAssert.strictEqual(signer.digestType, digest);
            NodeAssert.strictEqual(verifier.digestType, digest);
        });

        NodeTest.it(`[${alg}] should match signing and verifying`, () => {

            NodeAssert.doesNotThrow(() => {

                verifier.validate({
                    header: { 'alg': 'EdDSA' },
                    payload: { data: 'test' },
                    signedContent: 'test-signature',
                    signature: signer.sign('test-signature'),
                });
            });
        });

        NodeTest.it(`[${alg}] should throw error if signature mismatches`, () => {

            NodeAssert.throws(() => {

                verifier.validate({
                    header: { 'alg': 'EdDSA' },
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
                    header: { 'alg': 'EdDSA' },
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

    NodeTest.it(`should throw error if invalid KeyObject provided`, () => {

        for (const badKey of [
            {},
            null,
            123,
            true,
            false,
            [],
            '',
            NodeCrypto.createSecretKey(Buffer.from('hello')),
            Buffer.from('invalid-key'),
        ]) {

            NodeAssert.throws(() => {

                new EddsaJwaSigner({
                    privateKey: badKey as any,
                });
            }, {
                name: 'invalid_settings',
                code: eL.EErrorCode.INVALID_KEY_FORMAT,
            });

            NodeAssert.throws(() => {

                new EddsaJwaVerifier({
                    publicKey: badKey as any,
                });
            }, {
                name: 'invalid_settings',
                code: eL.EErrorCode.INVALID_KEY_FORMAT,
            });
        }

        for (const badKey of [
            `${__dirname}/../../test-data/ok-RS256.p8.pem`,
            `${__dirname}/../../test-data/ok-RS384.p8.pem`,
            `${__dirname}/../../test-data/ok-RS512.p8.pem`,
            `${__dirname}/../../test-data/ok-PS256.p8.pem`,
            `${__dirname}/../../test-data/ok-PS384.p8.pem`,
            `${__dirname}/../../test-data/ok-PS512.p8.pem`,
        ]) {

            NodeAssert.throws(() => {

                new EddsaJwaSigner({
                    privateKey: NodeFS.readFileSync(badKey, 'utf-8'),
                });
            }, {
                name: 'invalid_settings',
                code: eL.EErrorCode.KEY_ALGO_MISMATCHED,
            });
        }

        for (const badKey of [
            `${__dirname}/../../test-data/ok-RS256.pub.pem`,
            `${__dirname}/../../test-data/ok-RS384.pub.pem`,
            `${__dirname}/../../test-data/ok-RS512.pub.pem`,
            `${__dirname}/../../test-data/ok-PS256.pub.pem`,
            `${__dirname}/../../test-data/ok-PS384.pub.pem`,
            `${__dirname}/../../test-data/ok-PS512.pub.pem`,
            `${__dirname}/../../test-data/ok-x25519.p8.pem`,
        ]) {

            NodeAssert.throws(() => {

                new EddsaJwaVerifier({
                    publicKey: NodeFS.readFileSync(badKey, 'utf-8'),
                });
            }, {
                name: 'invalid_settings',
                code: eL.EErrorCode.KEY_ALGO_MISMATCHED,
            });
        }

        for (const badKey of [
            `${__dirname}/../../test-data/ok-ed25519.pub.pem`,
            `${__dirname}/../../test-data/ok-ed448.pub.pem`,
        ]) {

            NodeAssert.throws(() => {

                new EddsaJwaSigner({
                    privateKey: NodeCrypto.createPublicKey(NodeFS.readFileSync(badKey, 'utf-8')),
                });
            }, {
                name: 'invalid_settings',
                code: eL.EErrorCode.INVALID_KEY_USAGE,
            });
        }


        for (const badKey of [
            `${__dirname}/../../test-data/ok-ed25519.p8.pem`,
            `${__dirname}/../../test-data/ok-ed448.p8.pem`,
        ]) {

            NodeAssert.doesNotThrow(() => {

                new EddsaJwaVerifier({
                    publicKey: NodeFS.readFileSync(badKey, 'utf-8'),
                });
            });
        }
    });

    NodeTest.it(`should throw error if invalid content provided for signing`, () => {

        NodeAssert.throws(() => {

            new EddsaJwaSigner({
                privateKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-ed25519.p8.pem`, 'utf-8'),
            }).sign(true as any);
        }, {
            name: 'sign_failed',
            code: eL.EErrorCode.SIGN_FAILED,
        });
    });

    NodeTest.it(`should throw error if invalid content provided for verification`, () => {

        NodeAssert.throws(() => {

            new EddsaJwaVerifier({
                publicKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-ed25519.pub.pem`, 'utf-8'),
            }).validate({
                header: { 'alg': 'EdDSA' },
                payload: { data: 'test' },
                signedContent: true as any,
                signature: new EddsaJwaSigner({
                    privateKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-ed25519.p8.pem`, 'utf-8'),
                }).sign('test-signature'),
            });
        }, {
            name: 'verify_failed',
            code: eL.EErrorCode.SIGNATURE_VERIFY_FAILED,
        });
    });

    NodeTest.it(`should throw error if key pair is mismatched`, () => {

        NodeAssert.throws(() => {

            new EddsaJwaVerifier({
                publicKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-ed25519.pub.pem`, 'utf-8'),
            }).validate({
                header: { 'alg': 'EdDSA' },
                payload: { data: 'test' },
                signedContent: 'test-signature',
                signature: new EddsaJwaSigner({
                    privateKey: NodeFS.readFileSync(`${__dirname}/../../test-data/err-ed25519.p8.pem`, 'utf-8'),
                }).sign('test-signature'),
            });
        }, {
            name: 'verify_failed',
            code: eL.EErrorCode.SIGNATURE_VERIFY_FAILED,
        });

        NodeAssert.throws(() => {

            new EddsaJwaVerifier({
                publicKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-ed25519.pub.pem`, 'utf-8'),
            }).validate({
                header: { 'alg': 'EdDSA' },
                payload: { data: 'test' },
                signedContent: 'test-signature',
                signature: new EddsaJwaSigner({
                    privateKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-ed448.p8.pem`, 'utf-8'),
                }).sign('test-signature'),
            });
        }, {
            name: 'verify_failed',
            code: eL.EErrorCode.SIGNATURE_VERIFY_FAILED,
        });
    });
});
