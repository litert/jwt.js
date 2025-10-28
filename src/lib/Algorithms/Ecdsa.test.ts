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
import { EcdsaJwaSigner, EcdsaJwaVerifier } from './Ecdsa';

NodeTest.describe('JWA ECDSA', () => {

    NodeTest.it(`Validator name should be class name by default`, () => {

        NodeAssert.strictEqual(new EcdsaJwaVerifier({
            publicKey: NodeFS.readFileSync(
                `${__dirname}/../../test-data/ok-ES256.pub.pem`,
                'utf-8',
            ),
        }).name, EcdsaJwaVerifier.name);
    });

    NodeTest.it(`Validator name should be customized if provided`, () => {

        NodeAssert.strictEqual(new EcdsaJwaVerifier({
            publicKey: NodeFS.readFileSync(
                `${__dirname}/../../test-data/ok-ES256.pub.pem`,
                'utf-8',
            ),
            customName: 'CustomVerifierName',
        }).name, 'CustomVerifierName');
    });

    for (const alg of ['ES256', 'ES384', 'ES512', 'ES256K'] as const) {

        const privKey = NodeFS.readFileSync(
            `${__dirname}/../../test-data/ok-${alg}.p8.pem`,
            'utf-8',
        );
        const pubKey = NodeFS.readFileSync(
            `${__dirname}/../../test-data/ok-${alg}.pub.pem`,
            'utf-8',
        );

        const signer = new EcdsaJwaSigner({ privateKey: privKey });

        const verifier = new EcdsaJwaVerifier({ publicKey: pubKey });

        NodeTest.it(`[${alg}] JWA name should be corrected`, () => {

            NodeAssert.strictEqual(signer.jwa, alg);
            NodeAssert.strictEqual(verifier.jwa, alg);
        });

        NodeTest.it(`[${alg}] digest type should be corrected`, () => {

            NodeAssert.strictEqual(signer.digestType, 'sha' + alg.slice(2, 5));
            NodeAssert.strictEqual(verifier.digestType, 'sha' + alg.slice(2, 5));
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

                new EcdsaJwaSigner({
                    privateKey: badKey as any,
                });
            }, {
                name: 'invalid_settings',
                code: eL.EErrorCode.INVALID_KEY_FORMAT,
            });

            NodeAssert.throws(() => {

                new EcdsaJwaVerifier({
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

                new EcdsaJwaSigner({
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
        ]) {

            NodeAssert.throws(() => {

                new EcdsaJwaVerifier({
                    publicKey: NodeFS.readFileSync(badKey, 'utf-8'),
                });
            }, {
                name: 'invalid_settings',
                code: eL.EErrorCode.KEY_ALGO_MISMATCHED,
            });
        }

        for (const badKey of [
            `${__dirname}/../../test-data/ok-ES256.pub.pem`,
            `${__dirname}/../../test-data/ok-ES256K.pub.pem`,
            `${__dirname}/../../test-data/ok-ES384.pub.pem`,
            `${__dirname}/../../test-data/ok-ES512.pub.pem`,
        ]) {

            NodeAssert.throws(() => {

                new EcdsaJwaSigner({
                    privateKey: NodeCrypto.createPublicKey(NodeFS.readFileSync(badKey, 'utf-8')),
                });
            }, {
                name: 'invalid_settings',
                code: eL.EErrorCode.INVALID_KEY_USAGE,
            });
        }


        for (const badKey of [
            `${__dirname}/../../test-data/ok-ES256.p8.pem`,
            `${__dirname}/../../test-data/ok-ES256K.p8.pem`,
            `${__dirname}/../../test-data/ok-ES384.p8.pem`,
            `${__dirname}/../../test-data/ok-ES512.p8.pem`,
            `${__dirname}/../../test-data/ok-ES256.p1.pem`,
            `${__dirname}/../../test-data/ok-ES256K.p1.pem`,
            `${__dirname}/../../test-data/ok-ES384.p1.pem`,
            `${__dirname}/../../test-data/ok-ES512.p1.pem`,
        ]) {

            NodeAssert.doesNotThrow(() => {

                new EcdsaJwaVerifier({
                    publicKey: NodeFS.readFileSync(badKey, 'utf-8'),
                });
            });
        }

        NodeAssert.throws(() => {

            new EcdsaJwaSigner({
                privateKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ES-unk.p1.pem`, 'utf-8'),
            });
        }, {
            name: 'invalid_settings',
            code: eL.EErrorCode.KEY_ALGO_MISMATCHED,
        });
    });

    NodeTest.it(`should throw error if invalid content provided for signing`, () => {

        NodeAssert.throws(() => {

            new EcdsaJwaSigner({
                privateKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-ES256.p8.pem`, 'utf-8'),
            }).sign(true as any);
        }, {
            name: 'sign_failed',
            code: eL.EErrorCode.SIGN_FAILED,
        });
    });

    NodeTest.it(`should throw error if invalid content provided for verification`, () => {

        NodeAssert.throws(() => {

            new EcdsaJwaVerifier({
                publicKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-ES256.pub.pem`, 'utf-8'),
            }).validate({
                header: { 'alg': 'ES256' },
                payload: { data: 'test' },
                signedContent: true as any,
                signature: new EcdsaJwaSigner({
                    privateKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-ES256.p8.pem`, 'utf-8'),
                }).sign('test-signature'),
            });
        }, {
            name: 'verify_failed',
            code: eL.EErrorCode.SIGNATURE_VERIFY_FAILED,
        });
    });

    NodeTest.it(`should throw error if key pair is mismatched`, () => {

        NodeAssert.throws(() => {

            new EcdsaJwaVerifier({
                publicKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-ES256.pub.pem`, 'utf-8'),
            }).validate({
                header: { 'alg': 'ES256' },
                payload: { data: 'test' },
                signedContent: 'test-signature',
                signature: new EcdsaJwaSigner({
                    privateKey: NodeFS.readFileSync(`${__dirname}/../../test-data/err-ES256.p8.pem`, 'utf-8'),
                }).sign('test-signature'),
            });
        }, {
            name: 'verify_failed',
            code: eL.EErrorCode.SIGNATURE_VERIFY_FAILED,
        });

        NodeAssert.throws(() => {

            new EcdsaJwaVerifier({
                publicKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-ES256.pub.pem`, 'utf-8'),
                checkAlgClaim: false,
            }).validate({
                header: { 'alg': 'ES256' },
                payload: { data: 'test' },
                signedContent: 'test-signature',
                signature: new EcdsaJwaSigner({
                    privateKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-ES512.p8.pem`, 'utf-8'),
                }).sign('test-signature'),
            });
        }, {
            name: 'verify_failed',
            code: eL.EErrorCode.SIGNATURE_VERIFY_FAILED,
        });
    });
});
