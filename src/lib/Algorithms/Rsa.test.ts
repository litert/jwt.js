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
import * as cL from '../Constants';
import { RsaJwaSigner, RsaJwaVerifier } from './Rsa';

NodeTest.describe('JWA RSA', () => {

    NodeTest.it(`Validator name should be class name by default`, () => {

        NodeAssert.strictEqual(new RsaJwaVerifier({
            publicKey: NodeFS.readFileSync(
                `${__dirname}/../../test-data/ok-RS256.pub.pem`,
                'utf-8',
            ),
            digestType: cL.EDigestType.SHA256,
        }).name, RsaJwaVerifier.name);
    });

    NodeTest.it(`Validator name should be customized if provided`, () => {

        NodeAssert.strictEqual(new RsaJwaVerifier({
            publicKey: NodeFS.readFileSync(
                `${__dirname}/../../test-data/ok-RS256.pub.pem`,
                'utf-8',
            ),
            customName: 'CustomVerifierName',
            digestType: cL.EDigestType.SHA256,
        }).name, 'CustomVerifierName');
    });

    for (const alg of ['RS256', 'RS384', 'RS512', 'PS256', 'PS384', 'PS512'] as const) {

        const privKey = NodeFS.readFileSync(
            `${__dirname}/../../test-data/ok-${alg}.p8.pem`,
            'utf-8',
        );
        const pubKey = NodeFS.readFileSync(
            `${__dirname}/../../test-data/ok-${alg}.pub.pem`,
            'utf-8',
        );

        const signer = new RsaJwaSigner({
            privateKey: privKey,
            digestType: cL.EDigestType[`SHA${alg.slice(2, 5) as '256'}`],
        });

        const verifier = new RsaJwaVerifier({
            publicKey: pubKey,
            digestType: cL.EDigestType[`SHA${alg.slice(2, 5) as '256'}`],
        });

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
                    header: { 'alg': 'HS256' },
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

                new RsaJwaSigner({
                    privateKey: badKey as any,
                    digestType: cL.EDigestType.SHA256,
                });
            }, {
                name: 'invalid_settings',
                code: eL.EErrorCode.INVALID_KEY_FORMAT,
            });

            NodeAssert.throws(() => {

                new RsaJwaVerifier({
                    publicKey: badKey as any,
                    digestType: cL.EDigestType.SHA256,
                });
            }, {
                name: 'invalid_settings',
                code: eL.EErrorCode.INVALID_KEY_FORMAT,
            });
        }

        for (const badKey of [
            `${__dirname}/../../test-data/ok-ES256.p8.pem`,
            `${__dirname}/../../test-data/ok-ES384.p8.pem`,
            `${__dirname}/../../test-data/ok-ES512.p8.pem`,
        ]) {

            NodeAssert.throws(() => {

                new RsaJwaSigner({
                    privateKey: NodeFS.readFileSync(badKey, 'utf-8'),
                    digestType: cL.EDigestType.SHA256,
                });
            }, {
                name: 'invalid_settings',
                code: eL.EErrorCode.KEY_ALGO_MISMATCHED,
            });
        }

        for (const badKey of [
            `${__dirname}/../../test-data/ok-ES256.pub.pem`,
            `${__dirname}/../../test-data/ok-ES384.pub.pem`,
            `${__dirname}/../../test-data/ok-ES512.pub.pem`,
        ]) {

            NodeAssert.throws(() => {

                new RsaJwaVerifier({
                    publicKey: NodeFS.readFileSync(badKey, 'utf-8'),
                    digestType: cL.EDigestType.SHA256,
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
        ]) {

            NodeAssert.throws(() => {

                new RsaJwaSigner({
                    privateKey: NodeCrypto.createPublicKey(NodeFS.readFileSync(badKey, 'utf-8')),
                    digestType: cL.EDigestType.SHA256,
                });
            }, {
                name: 'invalid_settings',
                code: eL.EErrorCode.INVALID_KEY_USAGE,
            });
        }

        for (const badKey of [
            `${__dirname}/../../test-data/ok-RS256.p8.pem`,
            `${__dirname}/../../test-data/ok-RS384.p8.pem`,
            `${__dirname}/../../test-data/ok-RS512.p8.pem`,
            `${__dirname}/../../test-data/ok-RS256.p1.pem`,
            `${__dirname}/../../test-data/ok-RS384.p1.pem`,
            `${__dirname}/../../test-data/ok-RS512.p1.pem`,
        ]) {

            NodeAssert.doesNotThrow(() => {

                new RsaJwaVerifier({
                    publicKey: NodeFS.readFileSync(badKey, 'utf-8'),
                    digestType: cL.EDigestType.SHA256,
                });
            });
        }

        NodeAssert.throws(() => {

            new RsaJwaSigner({
                privateKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ES-unk.p1.pem`, 'utf-8'),
                digestType: cL.EDigestType.SHA256,
            });
        }, {
            name: 'invalid_settings',
            code: eL.EErrorCode.KEY_ALGO_MISMATCHED,
        });
    });

    NodeTest.it(`should throw error if using PSS key for non-PSS algorithm`, () => {

        NodeAssert.throws(() => {

            new RsaJwaSigner({
                privateKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-PS256.p8.pem`, 'utf-8'),
                digestType: cL.EDigestType.SHA256,
                usePssPadding: false,
            });
        }, {
            name: 'invalid_settings',
            code: eL.EErrorCode.KEY_ALGO_MISMATCHED,
        });
    });

    NodeTest.it(`should use PSS algorithm if usePssPadding is true`, () => {

        for (const d of [256, 384, 512] as const) {

            for (const k of [
                `${__dirname}/../../test-data/ok-RS${d}.p8.pem`,
                `${__dirname}/../../test-data/ok-RS${d}.p1.pem`,
            ]) {

                NodeAssert.strictEqual(
                    new RsaJwaVerifier({
                        publicKey: NodeFS.readFileSync(k, 'utf-8'),
                        digestType: cL.EDigestType[`SHA${d}`],
                        usePssPadding: true,
                    }).jwa,
                    `PS${d}`
                );
            }
        }
    });

    NodeTest.it(`should throw error with unknown digest`, () => {

        NodeAssert.throws(() => {
            new RsaJwaVerifier({
                publicKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-RS256.p8.pem`, 'utf-8'),
                digestType: 'SHAKE256' as any,
            });
        }, {
            name: 'invalid_settings',
            code: eL.EErrorCode.KEY_ALGO_MISMATCHED,
        })
    });

    NodeTest.it(`should not use PSS algorithm if usePssPadding is false with non-PSS key`, () => {

        for (const k of [
            `${__dirname}/../../test-data/ok-RS256.p8.pem`,
            `${__dirname}/../../test-data/ok-RS256.p1.pem`,
        ]) {

            NodeAssert.strictEqual(
                new RsaJwaVerifier({
                    publicKey: NodeFS.readFileSync(k, 'utf-8'),
                    digestType: cL.EDigestType.SHA256,
                    usePssPadding: false,
                }).jwa,
                `RS256`
            );

            NodeAssert.strictEqual(
                new RsaJwaVerifier({
                    publicKey: NodeFS.readFileSync(k, 'utf-8'),
                    digestType: cL.EDigestType.SHA256,
                }).jwa,
                `RS256`
            );
        }
    });

    NodeTest.it(`should throw error if invalid content provided for signing`, () => {

        NodeAssert.throws(() => {

            new RsaJwaSigner({
                privateKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-RS256.p8.pem`, 'utf-8'),
                digestType: cL.EDigestType.SHA256,
            }).sign(true as any);
        }, {
            name: 'sign_failed',
            code: eL.EErrorCode.SIGN_FAILED,
        });
    });

    NodeTest.it(`should throw error if invalid content provided for verification`, () => {

        NodeAssert.throws(() => {

            new RsaJwaVerifier({
                publicKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-RS256.pub.pem`, 'utf-8'),
                digestType: cL.EDigestType.SHA256,
            }).validate({
                header: { 'alg': 'RS256' },
                payload: { data: 'test' },
                signedContent: true as any,
                signature: new RsaJwaSigner({
                    privateKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-RS256.p8.pem`, 'utf-8'),
                    digestType: cL.EDigestType.SHA256,
                }).sign('test-signature'),
            });
        }, {
            name: 'verify_failed',
            code: eL.EErrorCode.SIGNATURE_VERIFY_FAILED,
        });
    });

    NodeTest.it(`should throw error if key pair is mismatched`, () => {

        NodeAssert.throws(() => {

            new RsaJwaVerifier({
                publicKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-RS256.pub.pem`, 'utf-8'),
                digestType: cL.EDigestType.SHA256,
            }).validate({
                header: { 'alg': 'RS256' },
                payload: { data: 'test' },
                signedContent: 'test-signature',
                signature: new RsaJwaSigner({
                    privateKey: NodeFS.readFileSync(`${__dirname}/../../test-data/err-RS256.p8.pem`, 'utf-8'),
                    digestType: cL.EDigestType.SHA256,
                }).sign('test-signature'),
            });
        }, {
            name: 'verify_failed',
            code: eL.EErrorCode.SIGNATURE_VERIFY_FAILED,
        });

        NodeAssert.throws(() => {

            new RsaJwaVerifier({
                publicKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-RS256.pub.pem`, 'utf-8'),
                digestType: cL.EDigestType.SHA256,
                checkAlgClaim: false,
            }).validate({
                header: { 'alg': 'RS256' },
                payload: { data: 'test' },
                signedContent: 'test-signature',
                signature: new RsaJwaSigner({
                    privateKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-RS512.p8.pem`, 'utf-8'),
                    digestType: cL.EDigestType.SHA256,
                }).sign('test-signature'),
            });
        }, {
            name: 'verify_failed',
            code: eL.EErrorCode.SIGNATURE_VERIFY_FAILED,
        });

        NodeAssert.throws(() => {

            new RsaJwaVerifier({
                publicKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-RS256.pub.pem`, 'utf-8'),
                digestType: cL.EDigestType.SHA256,
                checkAlgClaim: false,
            }).validate({
                header: { 'alg': 'PS512' },
                payload: { data: 'test' },
                signedContent: 'test-signature',
                signature: new RsaJwaSigner({
                    privateKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-PS512.p8.pem`, 'utf-8'),
                    digestType: cL.EDigestType.SHA512,
                }).sign('test-signature'),
            });
        }, {
            name: 'verify_failed',
            code: eL.EErrorCode.SIGNATURE_VERIFY_FAILED,
        });
    });

    NodeTest.it(`should throw error if digest mismatch with PSS key`, () => {

        for (const k of [256, 384, 512] as const) {

            for (const d of [256, 384, 512] as const) {

                if (k === d) {
                    continue;
                }

                NodeAssert.throws(() => {

                    new RsaJwaVerifier({
                        publicKey: NodeFS.readFileSync(
                            `${__dirname}/../../test-data/ok-PS${k}.p8.pem`,
                            'utf-8',
                        ),
                        digestType: cL.EDigestType[`SHA${d}`],
                    });
                }, {
                    name: 'invalid_settings',
                    code: eL.EErrorCode.KEY_ALGO_MISMATCHED,
                }, `PSS key with SHA${k} should not be used with SHA${d}`);
            }
        }
    });

});
