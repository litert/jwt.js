/**
 * Copyright 2025 Angus.Fenying <fenying@litert.org>
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as NodeTest from 'node:test';
import * as NodeCrypto from 'node:crypto';
import * as NodeFS from 'node:fs';
import * as NodeAssert from 'node:assert';
import * as eL from '../Errors';
import { MldsaJwaSigner, MldsaJwaVerifier } from './Mldsa';

NodeTest.describe('JWA ML-DSA', () => {

    for (const alg of ['ML-DSA-44', 'ML-DSA-65', 'ML-DSA-87'] as const) {

        const jwaName = alg.toUpperCase();

        const privKey = NodeFS.readFileSync(
            `${__dirname}/../../test-data/ok-${alg}.p8.pem`,
            'utf-8',
        );
        const pubKey = NodeFS.readFileSync(
            `${__dirname}/../../test-data/ok-${alg}.pub.pem`,
            'utf-8',
        );

        const signer = new MldsaJwaSigner({
            privateKey: privKey,
        });

        const verifier = new MldsaJwaVerifier({
            publicKey: pubKey,
        });

        NodeTest.it(`[${alg}] JWA name should be corrected`, () => {

            NodeAssert.strictEqual(signer.jwa, jwaName);
            NodeAssert.strictEqual(verifier.jwa, jwaName);
        });

        NodeTest.it(`[${alg}] digest type should be corrected`, () => {

            NodeAssert.strictEqual(signer.digestType, 'auto');
            NodeAssert.strictEqual(verifier.digestType, 'auto');
        });

        NodeTest.it(`[${alg}] should match signing and verifying`, () => {

            NodeAssert.doesNotThrow(() => {

                verifier.validate({
                    header: { 'alg': jwaName as any },
                    payload: { data: 'test' },
                    signedContent: 'test-signature',
                    signature: signer.sign('test-signature'),
                });
            });
        });

        NodeTest.it(`[${alg}] should throw error if signature mismatches`, () => {

            NodeAssert.throws(() => {

                verifier.validate({
                    header: { 'alg': jwaName as any },
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
                    header: { 'alg': jwaName as any },
                    payload: { data: 'test' },
                    signedContent: 'test-signature-1',
                    signature: Buffer.from('malformed-signature'),
                });
            }, {
                name: 'verify_failed',
                code: eL.EErrorCode.SIGNATURE_VERIFY_FAILED,
            }, 'Bad formatted signature should throw error');
        });

        NodeTest.it(`should throw error if 'alg' claim mismatch by default`, () => {

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

        NodeTest.it(`should not check 'alg' claim when it's not present`, () => {

            NodeAssert.doesNotThrow(() => {

                verifier.validate({
                    header: {} as any,
                    payload: { data: 'test' },
                    signedContent: 'test-signature',
                    signature: signer.sign('test-signature'),
                });
            });
        });

        NodeTest.it(`should not check 'alg' claim when it's not asked to`, () => {

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

                new MldsaJwaSigner({
                    privateKey: badKey as any,
                });
            }, {
                name: 'invalid_settings',
                code: eL.EErrorCode.INVALID_KEY_FORMAT,
            });

            NodeAssert.throws(() => {

                new MldsaJwaVerifier({
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
            `${__dirname}/../../test-data/ok-ed25519.p8.pem`,
            `${__dirname}/../../test-data/ok-ed448.p8.pem`,
        ]) {

            NodeAssert.throws(() => {

                new MldsaJwaSigner({
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
            `${__dirname}/../../test-data/ok-ed25519.pub.pem`,
            `${__dirname}/../../test-data/ok-ed448.pub.pem`,
        ]) {

            NodeAssert.throws(() => {

                new MldsaJwaVerifier({
                    publicKey: NodeFS.readFileSync(badKey, 'utf-8'),
                });
            }, {
                name: 'invalid_settings',
                code: eL.EErrorCode.KEY_ALGO_MISMATCHED,
            });
        }

        for (const badKey of [
            `${__dirname}/../../test-data/ok-ML-DSA-44.pub.pem`,
            `${__dirname}/../../test-data/ok-ML-DSA-65.pub.pem`,
            `${__dirname}/../../test-data/ok-ML-DSA-87.pub.pem`,
        ]) {

            NodeAssert.throws(() => {

                new MldsaJwaSigner({
                    privateKey: NodeCrypto.createPublicKey(NodeFS.readFileSync(badKey, 'utf-8')),
                });
            }, {
                name: 'invalid_settings',
                code: eL.EErrorCode.INVALID_KEY_USAGE,
            });
        }


        for (const badKey of [
            `${__dirname}/../../test-data/ok-ML-DSA-44.p8.pem`,
            `${__dirname}/../../test-data/ok-ML-DSA-65.p8.pem`,
            `${__dirname}/../../test-data/ok-ML-DSA-87.p8.pem`,
        ]) {

            NodeAssert.doesNotThrow(() => {

                new MldsaJwaVerifier({
                    publicKey: NodeFS.readFileSync(badKey, 'utf-8'),
                });
            });
        }
    });

    NodeTest.it(`should throw error if invalid content provided for signing`, () => {

        NodeAssert.throws(() => {

            new MldsaJwaSigner({
                privateKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-ML-DSA-44.p8.pem`, 'utf-8'),
            }).sign(true as any);
        }, {
            name: 'sign_failed',
            code: eL.EErrorCode.SIGN_FAILED,
        });
    });

    NodeTest.it(`should throw error if invalid content provided for verification`, () => {

        NodeAssert.throws(() => {

            new MldsaJwaVerifier({
                publicKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-ML-DSA-44.pub.pem`, 'utf-8'),
            }).validate({
                header: { 'alg': 'ML-DSA-44' },
                payload: { data: 'test' },
                signedContent: true as any,
                signature: new MldsaJwaSigner({
                    privateKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-ML-DSA-44.p8.pem`, 'utf-8'),
                }).sign('test-signature'),
            });
        }, {
            name: 'verify_failed',
            code: eL.EErrorCode.SIGNATURE_VERIFY_FAILED,
        });
    });

    NodeTest.it(`should throw error if key pair is mismatched`, () => {

        NodeAssert.throws(() => {

            new MldsaJwaVerifier({
                publicKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-ML-DSA-44.pub.pem`, 'utf-8'),
            }).validate({
                header: { 'alg': 'ML-DSA-44' },
                payload: { data: 'test' },
                signedContent: 'test-signature',
                signature: new MldsaJwaSigner({
                    privateKey: NodeFS.readFileSync(`${__dirname}/../../test-data/err-ML-DSA-44.p8.pem`, 'utf-8'),
                }).sign('test-signature'),
            });
        }, {
            name: 'verify_failed',
            code: eL.EErrorCode.SIGNATURE_VERIFY_FAILED,
        });

        NodeAssert.throws(() => {

            new MldsaJwaVerifier({
                publicKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-ML-DSA-44.pub.pem`, 'utf-8'),
            }).validate({
                header: { 'alg': 'ML-DSA-44' },
                payload: { data: 'test' },
                signedContent: 'test-signature',
                signature: new MldsaJwaSigner({
                    privateKey: NodeFS.readFileSync(`${__dirname}/../../test-data/ok-ML-DSA-65.p8.pem`, 'utf-8'),
                }).sign('test-signature'),
            });
        }, {
            name: 'verify_failed',
            code: eL.EErrorCode.SIGNATURE_VERIFY_FAILED,
        });
    });

    for (const data of [
        {
            'jwk': {
                'kid': 'T4xl70S7MT6Zeq6r9V9fPJGVn76wfnXJ21-gyo0Gu6o',
                'kty': 'AKP',
                'alg': 'ML-DSA-44',
                'pub': 'unH59k4RuutY-pxvu24U5h8YZD2rSVtHU5qRZsoBmBMcRPgmu9VuNOVdteXi1zNIXjnqJg_GAAxepLqA00Vc3lO0bzRIKu39VFD8Lhuk8l0V-cFEJC-zm7UihxiQMMUEmOFxe3x1ixkKZ0jqmqP3rKryx8tSbtcXyfea64QhT6XNje2SoMP6FViBDxLHBQo2dwjRls0k5a-XSQSu2OTOiHLoaWsLe8pQ5FLNfTDqmkrawDEdZyxr3oSWJAsHQxRjcIiVzZuvwxYy1zl2STiP2vy_fTBaPemkleynQzqPg7oPCyXEE8bjnJbrfWkbNNN8438e6tHPIX4l7zTuzz98YPhLjt_d6EBdT4MldsYe-Y4KLyjaGHcAlTkk9oa5RhRwW89T0z_t1DSO3dvfKLUGXh8gd1BD6Fz5MfgpF5NjoafnQEqDjsAAhrCXY4b-Y3yYJEdX4_dp3dRGdHG_rWcPmgX4JG7lCnser4f8QGnDriqiAzJYEXeS8LzUngg_0bx0lqv_KcyU5IaLISFO0xZSU5mmEPvdSoDnyAcV8pV44qhLtAvd29n0ehG259oRihtljTWeiu9V60a1N2tbZVl5mEqSK-6_xZvNYA1TCdzNctvweH24unV7U3wer9XA9Q6kvJWDVJ4oKaQsKMrCSMlteBJMRxWbGK7ddUq6F7GdQw-3j2M-qdJvVKm9UPjY9rc1lPgol25-oJxTu7nxGlbJUH-4m5pevAN6NyZ6lfhbjWTKlxkrEKZvQXs_Yf6cpXEwpI_ZJeriq1UC1XHIpRkDwdOY9MH3an4RdDl2r9vGl_IwlKPNdh_5aF3jLgn7PCit1FNJAwC8fIncAXgAlgcXIpRXdfJk4bBiO89GGccSyDh2EgXYdpG3XvNgGWy7npuSoNTE7WIyblAk13UQuO4sdCbMIuriCdyfE73mvwj15xgb07RZRQtFGlFTmnFcIdZ90zDrWXDbANntv7KCKwNvoTuv64bY3HiGbj-NQ-U9eMylWVpvr4hrXcES8c9K3PqHWADZC0iIOvlzFv4VBoc_wVflcOrL_SIoaNFCNBAZZq-2v5lAgpJTqVOtqJ_HVraoSfcKy5g45p-qULunXj6Jwq21fobQiKubBKKOZwcJFyJD7F4ACKXOrz-HIvSHMCWW_9dVrRuCpJw0s0aVFbRqopDNhu446nqb4_EDYQM1tTHMozPd_jKxRRD0sH75X8ZoToxFSpLBDbtdWcenxj-zBf6IGWfZnmaetjKEBYJWC7QDQx1A91pJVJCEgieCkoIfTqkeQuePpIyu48g2FG3P1zjRF-kumhUTfSjo5qS0YiZQy0E1BMs6M11EvuxXRsHClLHoy5nLYI2Sj4zjVjYyxSHyPRPGGo9hwB34yWxzYNtPPGiqXS_dNCpi_zRZwRY4lCGrQ-hYTEWIK1Dm5OlttvC4_eiQ1dv63NiGkLRJ5kJA3bICN0fzCDY-MBqnd1cWn8YVBijVkgtaoascjL9EywDgJdeHnXK0eeOvUxHHhXJVkNqcibn8O4RQdpVU60TSA-uiu675ytIjcBHC6kTv8A8pmkj_4oypPd-F92YIJC741swkYQoeIHj8rE-ThcMUkF7KqC5VORbZTRp8HsZSqgiJcIPaouuxd1-8Rxrid3fXkE6p8bkrysPYoxWEJgh7ZFsRCPDWX-yTeJwFN0PKFP1j0F6YtlLfK5wv-c4F8ZQHA_-yc_gODicy7KmWDZgbTP07e7gEWzw4MFRrndjbDQ',
                'priv': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
            },
            'signedContent': 'eyJhbGciOiJNTC1EU0EtNDQiLCJraWQiOiJUNHhsNzBTN01UNlplcTZyOVY5ZlBKR1ZuNzZ3Zm5YSjIxLWd5bzBHdTZvIn0.SXTigJlzIGEgZGFuZ2Vyb3VzIGJ1c2luZXNzLCBGcm9kbywgZ29pbmcgb3V0IHlvdXIgZG9vci4',
            'sig': [
                '92723543ff422332c7e57cbde0a91ced654aa9970082d27798d7f41948f5b8b0',
                '3a6170161497d7921fb343152d125dd4202ef33c2894c0a4c347a66cb949858f',
                'c0ad6ffe9a1fae2112537bc1e4bfd66e68902cbc1aa1cd2f696c7dc9421f7636',
                '7f840d3fe0cb552d57b2e6e80c0ec3c378abd887582887d6272214ed138781dd',
                'b89eeba7d7325bc5c2c90b610ab7633c474c19b9d70813d9e6e683f3617ab4cf',
                'e84fb0aa17a7d95e55892a80c98ef4ba3c48fff5618204b61dc1f2ff86b8fdb8',
                'f4a0d315128f8c84a62b868f0a49e3b638a11ec415bf65de3d7c4a1316ad1e5e',
                '2a86c8a25becbe1095dad4a7f0e166292c0ec1e3fe4876cfbe708266231edfeb',
                '1c4058a879aa8056ab540839a685bb3b00ada456dcd384bb34e17b0d449fce60',
                '23719c453646a7e5431b2c479b4025d387325a8d9bc4054e1747db0dcdbae623',
                'f6982370e90835d232097808460783803187015162401b497530dd54fe4a0498',
                '68797572a7413465e3ad5e6bf0aadc32e4700d838f6c285941720d3990f283bf',
                'ca178049f25a732466effb2e8fcf33e5714da3c179dcff0ec531bdc543e5af0b',
                'c7f9302aec01f7354e12357029c95293537ce1c75b49df89e54c82dc4ee8d754',
                '9568fdfd0365f531afa252098aafcb8cf52a5d300d0cdde796a8a7216d431bce',
                '3e17021db00ddf8836520ef9d099bcdf97e5ecd3b172aa0c6ee4dc807ebc92bd',
                'fb33e3dd8762bd59acd7509802ba981d2165bc5a37ce8e64e2179f42ad5b5f56',
                'd2b6a83cc5e343843427eab4d3d09597b970de69d0ff1aae3e14481f0708f87b',
                '35da90040796af0d30b1885d88cdfd96b4a403c98b458321667a8a1824cf0ab1',
                'd70dd12344a61135aa88513e3895a625e5cdbb2b4bfea338ca3eeeadcc486461',
                '20b85d9dcb7a1105b66033384d261db84a3205ea8e83c98ceac620f89b5f78f0',
                '2bcfd0e5198c397b57a3c477bd77c1694750a0b79ecb2c0d604d2721cb25e33e',
                '5af3fbadc0416255fd152b6a5dbe2ca238f5528b7cce3009aacfa805855cbc68',
                'c310396640100b93c83c3b6561ba762c29b66ae0497668b56eb7235f52d991fb',
                '91e097448abfa452ee6213ae1ba743e0c928b882d1742f5b5d930bacd0eaec23',
                'a950e3bce9a415958774a51f77e56a54c3e57aa1b4919c79511594a6512201ee',
                '1d50d0899c891ce88cdf775e1c3baa9cc6cddcc310edce3936b25da486ff4607',
                '432cbe787e2105b9a0b7f2c1c75db4835798e171de1c545f4df7ad1e42f9659b',
                'ac5f58d0fe793d7b3e17046ffa851b53352b9506c6251fcf8a52e479faa4cff1',
                'd92f45ff16936847a14af6b33e583bfc4314230c4ebb7c6a188cc9f8e8e62879',
                '170a37ae215b15418a89b9e24cb5eca45778b2970d2bf59c86564b46090f2b88',
                'e1e99fd7f092641f1bd0869ca8b87405c86c6006b976e31fbf101d736d632126',
                'd8669bc0e22adfa7cca689cfc0a3bb5f87c02a60efa091a91b04cf6872284a5b',
                '6f83392904a3dc0b04342ae8566439408bf72b65cd464bdee2f8c198feac5766',
                'fa19263f51e46f3c4940ed25200464ca6e7f9cd1a62106e07ca653e145305ae7',
                '9fdc16a0263666af175f9f74c92d26e21a1f67fe2b4cd90b36c7c39e3df7c4fb',
                '9085a0c8cb3218202fca7101fe484eab04fbb428e0e4743c4888dd9d1616d248',
                'd97e3b792c96c603e3e7468f203d541519e6033f6bec49784d258f78022b4a09',
                '8d6cadc4acb980eb84d04aae7a09d6e12c30f547b20170fd91ccc8011a550ba0',
                '852356e1f9bcabaff536fe332eeb43213ce600be9aea2ebe592e90448b3fe155',
                '2dc2be5c5d72050c378755678670d8af43a5bdbab1143f872b82e8aaef3fc34e',
                '261a19f524b2e6fe4fb9b0d3353c668392779a544e924bbfe218214025e82b1c',
                '1efba79d12c42aaa56d526b575c159b3954fe007d1de683bc17e1596ad401e7a',
                '45c44d8bd4b6622a84dcf630c43af4c3931afcea0324c0c9ba45dc8f17fab8f0',
                '0549d5bafc429f3cfb807ce17e76cd9e5cc3e20961ef87895276f4ba5e626df8',
                'd3fad68afa72f940798bd4ca94caf17fde32d689336533db3f7fefd7f5d7d271',
                '3b4532f3f7c100f7a7ae27b9771296c4aa4b3b9a1ea2d4524d9efbe533fbb6f6',
                'c6286c9e8f513fa2d559509c5fc904044a133ef8a415e6d65e58e4ba35e6bb08',
                '95a4078a750108ef1f1c21c8e7d2c07cabac378266a1d0ea2d8c245a28c42ffb',
                '1fac2e8bb6b6d7aa9335a70d3dcd2aecfed4b5450f8b9d61ee3eb53928b0b3bf',
                '9dc92ab87c954fdc741a307bf17e21bfd48b86d0d85304fb49a7c86d178a31d4',
                'b2b18c67d75fa30bc892bf37269ab09453990303264863cd3c4251c3d903b218',
                'e8b677540794b55027effd4e08a159fb5a0bf17824be041c6ac967e1ed84dd7f',
                'bdc49e61b0558c558e55da1c279e4d999469c9d3e0c41401c6c58d3aba04195b',
                'a0040658fd85656a5de87367aeebfbe3855e5a67e02e4f73e79ebbc05870b973',
                '24984db1bc3a38c0ff34c6eb6351fb1e3f1e5890bc616355ec5aa4d9af5f6d22',
                '7c49596abc44b66c58f9adab9c19e6e70131ab022e938005e9d865d480710361',
                '0bbdf02d2d19dacd47421068225ee5af5a77ef62d9b3f49ebb5bbff05a3b0e82',
                '6a46929a368736fc950c9a7ed35194bcccbcb3c607aaf11f2235b44fdb40f00c',
                '1357a1cb130c129a42bb41f908843f2490b496b81bad5778d672879686cdfa16',
                '67d3a68d91bda5b6de85cab022bb7e1128cfc9e4fab1f4abbce7d366bedf057c',
                '2952cdab4b806b94db1ee60fe1f024228a4f1a68e4ce10f9178b2838b390dec1',
                '19600d91d2fb783e6173d420134eeb6fc7c649e4329909bca5beb64bc36e0b71',
                'bf2e271bcd2e97a5bf29e46ca042834d160d2995b15e36484cd6b487a6a09f03',
                '4224a11b160dd086b7b7f787348bad267cff582202935eb097dd8b76797fba98',
                'fcd898b6d26d5e631faf6fe9666a615d96023fbd0d4d1d891e2139f6106899c1',
                '6614ed29bf9242c62216e375043277bfd78cf4af21abdd4d05d08755af93864f',
                '43a2ff8991c4d99d91914725b9c971d457834e125b415e1f069238c3bece58a3',
                '7bbedab3c25e32b56863d22355bc05a5092d0639b1b7c054202e50706ff95961',
                'e506a6b7e96078a82e86a4d2bb2fad8da6ce6f992204e1bbc4642ddf3f97617b',
                '675850c28a2fb9875d577d9b10fb1431cbc8127dd333e210caf4dc3f550b7a7f',
                '35a2418d1387f747cd5922d0c51f55fb0352381b9610fa8f4c206ecdf3763f86',
                '337aedb7ca22b74c17c75d5b20e68e2a07f4eed3f4c229955cc46a4567bb2c25',
                '002931393e444a535c7f8788aeb2bce2e6ec0a0e17384a64709ba2acb0dae608',
                '092234364244454a777c8c9eb8c0e0f0060f374a595a6570727a8ca9abb1bac4',
                'ced1ddf5000000000000000000000000121f3044',
            ].join(''),
        },
        {
            'jwk': {
                'kid': 'Suiu29qbfuaBaR4Ats-c6XQBePB_OpAxAwcTR_0KXVM',
                'kty': 'AKP',
                'alg': 'ML-DSA-65',
                'pub': 'QksvJn5Y1bO0TXGs_Gpla7JpUNV8YdsciAvPof6rRD8JQquL2619cIq7w1YHj22ZolInH-YsdAkeuUr7m5JkxQqIjg3-2AzV-yy9NmfmDVOevkSTAhnNT67RXbs0VaJkgCufSbzkLudVD-_91GQqVa3mk4aKRgy-wD9PyZpOMLzP-opHXlOVOWZ067galJN1h4gPbb0nvxxPWp7kPN2LDlOzt_tJxzrfvC1PjFQwNSDCm_l-Ju5X2zQtlXyJOTZSLQlCtB2C7jdyoAVwrftUXBFDkisElvgmoKlwBks23fU0tfjhwc0LVWXqhGtFQx8GGBQ-zol3e7P2EXmtIClf4KbgYq5u7Lwu848qwaItyTt7EmM2IjxVth64wHlVQruy3GXnIurcaGb_qWg764qZmteoPl5uAWwuTDX292Sa071S7GfsHFxue5lydxIYvpVUu6dyfwuExEubCovYMfz_LJd5zNTKMMatdbBJg-Qd6JPuXznqc1UYC3CccEXCLTOgg_auB6EUdG0b_cy-5bkEOHm7Wi4SDipGNig_ShzUkkot5qSqPZnd2I9IqqToi_0ep2nYLBB3ny3teW21Qpccoom3aGPt5Zl7fpzhg7Q8zsJ4sQ2SuHRCzgQ1uxYlFx21VUtHAjnFDSoMOkGyo4gH2wcLR7-z59EPPNl51pljyNefgCnMSkjrBPyz1wiET-uqi23f8Bq2TVk1jmUFxOwdfLsU7SIS30WOzvwD_gMDexUFpMlEQyL1-Y36kaTLjEWGCi2tx1FTULttQx5JpryPW6lW5oKw5RMyGpfRliYCiRyQePYqipZGoxOHpvCWhCZIN4meDY7H0RxWWQEpiyCzRQgWkOtMViwao6Jb7wZWbLNMebwLJeQJXWunk-gTEeQaMykVJobwDUiX-E_E7fSybVRTZXherY1jrvZKh8C5Gi5VADg5Vs319uN8-dVILRyOOlvjjxclmsRcn6HEvTvxd9MS7lKm2gI8BXIqhzgnTdqNGwTpmDHPV8hygqJWxWXCltBSSgY6OkGkioMAmXjZjYq_Ya9o6AE7WU_hUdm-wZmQLExwtJWEIBdDxrUxA9L9JL3weNyQtaGItPjXcheZiNBBbJTUxXwIYLnXtT1M0mHzMqGFFWXVKsN_AIdHyv4yDzY9m-tuQRfbQ_2K7r5eDOL1Tj8DZ-s8yXG74MMBqOUvlglJNgNcbuPKLRPbSDoN0E3BYkfeDgiUrXy34a5-vU-PkAWCsgAh539wJUUBxqw90V1Du7eTHFKDJEMSFYwusbPhEX4ZTwoeTHg--8Ysn4HCFWLQ00pfBCteqvMvMflcWwVfTnogcPsJb1bEFVSc3nTzhk6Ln8J-MplyS0Y5mGBEtVko_WlyeFsoDCWj4hqrgU7L-ww8vsCRSQfskH8lodiLzj0xmugiKjWUXbYq98x1zSnB9dmPy5P3UNwwMQdpebtR38N9I-jup4Bzok0-JsaOe7EORZ8ld7kAgDWa4K7BAxjc2eD540Apwxs-VLGFVkXbQgYYeDNG2tW1Xt20-XezJqZVUl6-IZXsqc7DijwNInO3fT5o8ZAcLKUUlzSlEXe8sIlHaxjLoJ-oubRtlKKUbzWOHeyxmYZSxYqQhSQj4sheedGXJEYWJ-Y5DRqB-xpy-cftxL10fdXIUhe1hWFBAoQU3b5xRY8KCytYnfLhsFF4O49xhnax3vuumLpJbCqTXpLureoKg5PvWfnpFPB0P-ZWQN35mBzqbb3ZV6U0rU55DvyXTuiZOK2Z1TxbaAd1OZMmg0cpuzewgueV-Nh_UubIqNto5RXCd7vqgqdXDUKAiWyYegYIkD4wbGMqIjxV8Oo2ggOcSj9UQPS1rD5u0rLckAzsxyty9Q5JsmKa0w8Eh7Jwe4Yob4xPVWWbJfm916avRgzDxXo5gmY7txdGFYHhlolJKdhBU9h6f0gtKEtbiUzhp4IWsqAR8riHQs7lLVEz6P537a4kL1r5FjfDf_yjJDBQmy_kdWMDqaNln-MlKK8eENjUO-qZGy0Ql4bMZtNbHXjfJUuSzapA-RqYfkqSLKgQUOW8NTDKhUk73yqCU3TQqDEKaGAoTsPscyMm7u_8QrvUK8kbc-XnxrWZ0BZJBjdinzh2w-QvjbWQ5mqFp4OMgY94__tIU8vvCUNJiYA1RdyodlfPfH5-avpxOCvBD6C7ZIDyQ-6huGEQEAb6DP8ydWIZQ8xY603DoEKKXkJWcP6CJo3nHFEdj_vcEbDQ-WESDpcQFa1fRIiGuALj-sEWcjGdSHyE8QATOcuWl4TLVzRPKAf4tCXx1zyvhJbXQu0jf0yfzVpOhPun4n-xqK4SxPBCeuJOkQ2VG9jDXWH4pnjbAcrqjveJqVti7huMXTLGuqU2uoihBw6mGqu_WSlOP2-XTEyRyvxbv2t-z9V6GPt1V9ceBukA0oGwtJqgD-q7NXFK8zhw7desI5PZMXf3nuVgbJ3xdvAlzkmm5f9RoqQS6_hqwPQEcclq1MEZ3yML5hc99TDtZWy9gGkhR0Hs3QJxxgP7bEqGFP-HjTPnJsrGaT6TjKP7qCxJlcFKLUr5AU_kxMULeUysWWtSGJ9mpxBvsyW1Juo',
                'priv': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
            },
            'signedContent': 'eyJhbGciOiJNTC1EU0EtNjUiLCJraWQiOiJTdWl1MjlxYmZ1YUJhUjRBdHMtYzZYUUJlUEJfT3BBeEF3Y1RSXzBLWFZNIn0.SXTigJlzIGEgZGFuZ2Vyb3VzIGJ1c2luZXNzLCBGcm9kbywgZ29pbmcgb3V0IHlvdXIgZG9vci4',
            'sig': [
                'ce63bdff46cb80901e82854dca67d1a389c63cae6556d4851a70dbcdfcd8003e',
                '665045e9681520e22b6f67cac05198b81cb6f9f50a83412052a4c5c2d1ac5a8d',
                '738c57f62db5f9b01a00ba14cc9a311664c7e03dd9b1a234bbada97f6373044b',
                '26a5e3324506873d98a477bf995f50a71a244421fd2ba8e4c85669e21648c055',
                'e146dd73d0e1886b9acea072acc4e0805198535ca88049bdef93d9540125b4f9',
                '8e7c58a4f8ad59acb7bfddbe4ec555b7bd03d236d481fe4ea960d7348ca08f28',
                'ce1d5a0521bddae3eeaec05de4a45c3a527084d51824380749c2075cce87ce4e',
                'aef7c5b9a2b28f1eed6b0c82bbac7248e19aee8b8c018e640bb0f134d4b7191d',
                '1c78cdec43093302192a236cbd45893f42537a147a9e2858ecad4c401fd9e0a2',
                'dea0c3d224aba7922c942b9ea0d8ed18e1529d42a5b2709e89917eb4da93cb52',
                'a927712b4da34f702cc2bec11a96127015aecd396c90384254cdc2da3d8fd510',
                '5c1c097d469386c423ed6b2c38b266a917827cbe536a119e5974777bbe7b64bf',
                '460fbf78bd47fd711b3ecfe49bef36d86ec963d962e26b99e4a56f7d07ffe61c',
                'dad55e06c1eaaf99e5ae64bd60054d873d2ef1d6d58befdf002ce935acc9f1b2',
                'f04e3e248bc4011d3e822ec34fea3252a34dabc970315a8a18028063149394a3',
                '53ae485904bdb78ae0c6ff4876ed0e0aca33a3d88206aad572768ec14a643215',
                '7a29e89703b91035c7a055a322a38d1c8d2c8c88492118838439ff0be9ea213a',
                '1fdb3cf458b3ef0dad9f953812426b4b9b25c0d4d5c4ee18d09aee7596c40a9f',
                '56370cc8d0f1f571c16019d239c14d7cc3fb4bd9efab0dca0b9d14fedd8f1f94',
                '9fc12f70e032ef720ae510ffe0c1280e5ee7fe8b4b5118b425cb720c07b3bc40',
                'e9e4a1fc8568250365ebab164193a6805f4fa9736c9ce74003080cf35c594b11',
                '94d4d7b07edab42d67c65e310c92e698f2c2c6212b7f16c25b980c5a8c7490b0',
                'f07ec163e7b86c5c6ef9719e238816eaf5bd158c3ed591ff3195cd3a13177306',
                '1197cfca0989a4f95870ecbb31adac59a1e9d88dd5c3b80b18ebe8a74d13c225',
                'cb1b1f5f1438008fb491ede03328b40ce19e1e01ee35cf891c3ee867a9e350c4',
                '9306447569430d4fb9ffda77c54c309da96d4768cb0cc081df2ce93a75ac8a5c',
                '4d6832a6393a9f12e64fd201a927474bcdc668654c0e61ddb649dbc359c4ce91',
                'ec3d34fde04462b1f6d2b9913fb1bb9172b32ef99679a280878a101e2aa35618',
                '1aba278f0d188c9a3c743a17509cc0ad3bc3d66f1d3a4a2be2467ff986cc1d55',
                '5d3c078f0c547a9b33603108b2c96229c2d84a74df4d94a340c8fab4cd675667',
                '9f9f2433b542b247310cbb07f4062f3f3f8742bdc7ed7834125c23627fa32578',
                '19fdc7672c5b78fd3b8a41da70fea86fcab3633b1d0c75cfb53ebc285aaa40f6',
                'c4affe94b9970236a8d547236563da6647072a1dd5051e3901317f74818cffc5',
                '1c4014cd4bb538af0cfb5490646cc94f6b2eddae999cc9e9d14e6a757c8c38d1',
                '682368c9da10e3b7b40442c2f1fabbda2f164c26d736cf4307770246002fe4ba',
                '0ed78c7dd259067306eef3ceb788692c2bd80da8a1b799880c9dc1bf0b5f642c',
                '63d26bfcda61180300ab3ae992e68cc8177fa454ca329f6cd06631c321b5643f',
                '6e46e3c8f62980e024bb6edf8ef18bdb5a0e9e43ea9af4ea8397136ddd7737d9',
                '39e240557157137a3c3637dd75d4f91a6f775c38ecd678f279322738c3f1795b',
                'be4f69db29f1587afe4ada391d765daeee23f044d45bbae2de6106d66fddc406',
                'c07b69156ec069d88d6f429a6e81b9917b1b8c44b7581482aa366d2aa50a164e',
                'bfe4dade4a1e75a896b49b147ed4b26f0fc328b8b0d861e3fc911c00cedaada8',
                'd7dcc20b1da994348c79823be0240f4462e52bf18b3381390737e7cb713679a1',
                '39fe04014d218d1e942d241d22a4fc038eab230c25ea5eea42911b5ad6fc6783',
                '87288b6faf598bcabba9aaf4785da2f1c0696ad9472bee3cf23864337f36499f',
                '411f07a2047a34b5612e5469d5cc0c02b4920c0ddff109678dd6da7aeb71457b',
                'c59c20a3064efdc2cf1519d580b919885a0a0415e5405719098c9d3bcce5bc23',
                '790d7c1ea99f1b19989c16006a967355253e690d06cb664978a70336dd97e5be',
                '927d57443ba1cd369f1e79026ca4b95e024ab160f616b85c9c26b1c51c6ec481',
                'b18a3a1f8c3e22866268603161d4562cf48702faccc47cc49e91a9d63886421d',
                'dd5f5734d26cbaf96cd68e5d1dac3b59ae157ef0db69bca41543ddfc8e1cad89',
                '9cae050429c406baee3080daaaabbc678c5eb001ca7f163aef0fb6e5e52ebd50',
                '862f7c695d2ca9f74ebce080a41b8493ced3f5b212d5b3128303edfbb0a2a996',
                'a7a611194c3d8e2f0ccd4da7c26555ac1b48622ea26db483aa76295ff3a483f0',
                'c7dbddd6702269e65baf27f737982d2fe74eabe73ab998530b1f4e2c1b4b184d',
                'c17009a7e49163306405c724cbd3b065b8dbb6e0a7fe96db468fd8f36f03d962',
                'ba24f929cc8a55c6144a81dc3ddc2823a55a3b2083fddc516d6e329e0a95642f',
                '922995f4f77b718ef4c3ad3b8dc601277325159f047967983d9f6abbac7089d0',
                '3c5e52c7c57c5f2c824e81fa54f0c4e9a5fc5d9cc86a352bc7fc7c79ee80e985',
                'b524b392b567cf8ee1d4a736a43e6566e1680c9d6101432ae505e8761302f696',
                '8499800b1853913a76b7af8fddb7aff8571d14876ccc90bd2f15ad27de8b63f1',
                '95e10be9d218887723f506e916347b6c5cad91c6b7acdffe029dd83604e1b155',
                'c299f58a500c2532efa1916d309e9ea8c3f921b9b155045616b9cb16ca02b3eb',
                'dbe5e9824f1cb990514807663cd45dc42814b6575f08b78bef1849bebc8ca2ec',
                '5f43be4f30168898772c31df79d3be5e3edfd59029546948f9e58f44f3515b38',
                '47213dfb9ddb0dd3b52bd13ef07cf91818f2c2c9500725c5c5061383e7292649',
                'ed320152d1c3eaec99d3e9c2e4a1b16d766c044cd47879ece22c745a6a3afbab',
                'c03383c62b7a9103554086d297caf35c01f55c7158bc28930af4ccf67883973c',
                '04efc91cb7e0bb6b720f2d7202b47ed62a116629019d9f5696415dc61f4c88a7',
                'b8b374faa2eb6b7f3c119baee7d8ef9910fb994bf59ac31654c195781a0d3f79',
                '4968918658af22632bb8abb1ababee965ebe6a0b3ffb93002d54975bfb35bc53',
                '78cb277b514989728e5a737950068c343a6278b9cbdc78045fb9414a9ca0630b',
                '2e0972c7658e0842d3f085bb9ec576d509eaa806ed0b367be94b4476652e10e4',
                'f2aa229067496b8cc466dd8ac2bc92b1b51e6d8614d191aef4f0dcc1bf0491b3',
                'e271186fff1168c7853f9a07854bdc82ffa33de6b77890a2ccdf03e4b31dc294',
                'd65699301b940b2c64b3a2a22604066513d7c9ac710eda9975a44ff087390a6b',
                '8f7b2bb791a7e2d0be8b1628ec5319d21b14e982eee17ef726a304228df13dff',
                '296f83c93f11b2369a21b5d6088e0d50986fb93d623cab8b073d75251467b5e8',
                '892db88566145fa04619034ddf05473e40e43954830584e3b68f7dba5aaeaf2c',
                '782bf50c0aef6c41537105f321f2d2cdecef7e31796725b1df29fa851e23c674',
                '860e069c2ea89740262ca2b921b7809c4c1bfc2ec0d9015a83befa23a6e8f21a',
                'ac2caf2fcfcffadb947d3e332208c9277a3a60985ba3eab62bcd991661ee20bc',
                'b37c3486b470d9a59211ed79d14167adf747091072f993ae7792fc841c983489',
                '4884d22c0d03977fe2006adef9b0d49ef8870007c7467f89811c3d2ea10c6a30',
                'f0cf03ed425364391457ff3ace3d98a869bf402fda01e0fffcd3fab1aeb56c8f',
                '7e8133b3bd87342621312930e338af5f22f1da57e1cde31af6bd69deafca3a8c',
                'fc844ef18cf03eda11ece551538417000b9a124f48c02afc593d26570852e0be',
                '21325936d373f40c1f8abbb7c243e36b56d737be9602e4478e26b4c79a6d80c0',
                'b2da9cbfbd21d9c9b7c84bce598ec390fa2fdefe7881ce1cb35f0cc168b13212',
                '2b5b178650c7973cf255ca0cca5ef6d8ab008e9701ca8b7f8519903f169b6615',
                'ee18557f12d0d4058b7a4584f436658c2b44f926d2d4458d191f1f697282bda6',
                '739d1ca8a9d5b3f08377c3b2af680fd9ac42a4217924adeced1baa48d3a0e50c',
                '70a5fec53aac23a8c907facb5018efb39be12764491a011c6811e94bfe2ebc47',
                'a7227ab6bcdc72ed24ab1b9b1eb916db21dca9ee9e9d57f8df363058a51e2496',
                '75d1bb776bddb38929defb76a3eafde0ba22a82682e757ff61f2b505eb3a2b4d',
                '613e4eae7cb587dbe529867f8882279732f4b4d8d023887f026d3e4526c81099',
                'c14856267576e0fe693993defc2724436f31bf927b65fe01beaaeafeb86e6c51',
                '214c9e49bdd31fcfc5a1739e964875fb19128432a5d5a77a47a2106f3b24fd06',
                '6a2dcc89626d5925272e20ce4cd47232493a577e04e68cfdc9cc887a68c8a5d2',
                '2405d33705e78331296ef0cfd98d1f9eb82a0e93b7451de020d6992d199e1b45',
                '88e3058130c7f0f0f1e3a72575ec2ff58667d123e75aadb65c5fb3c3dcde11c3',
                '8941002ca4ff09ce1c17004bee5c2d913336616685ce223b89accffb1e435374',
                '76b6c1d0da14556066718de9182f53898e9fe8f9fe141527424b81848c8fb600',
                '00000000000000060c151c252f',
            ].join(''),
        },
        {
            'jwk': {
                'kid': 'tRn1JNIkgMsABVQBlXeDHxAIcclh-2IX0UdDEzPt5XU',
                'kty': 'AKP',
                'alg': 'ML-DSA-87',
                'pub': '5F_8jMc9uIXcZi5ioYzY44AylxF_pWWIFKmFtf8dt7Roz8gruSnx2Gt37RT1rhamU2h3LOUZEkEBBeBFaXWukf22Q7US8STV5gvWi4x-Mf4Bx7DcZa5HBQHMVlpuHfz8_RJWVDPEr-3VEYIeLpYQxFJ14oNt7jXO1p1--mcv0eQxi-9etuiX6LRRqiAt7QQrKq73envj9pkUbaIpqL2z_6SWRFln51IXv7yQSPmVZEPYcx-DPrMN4Q2slv_-fPZeoERcPjHoYB4TO-ahAHZP4xluJncmRB8xdR-_mm9YgGRPTnJ15X3isPEF5NsFXVDdHJyTT931NbjeKLDHTARJ8iLNLtC7j7x3XM7oyUBmW0D3EvT34AdQ6eHkzZz_JdGUXD6bylPM1PEu7nWBhW69aPJoRZVuPnvrdh8P51vdMb_i-gGBEzl7OHvVnWKmi4r3-iRauTLmn3eOLO79ITBPu4CZ6hPY6lfBgTGXovda4lEHW1Ha04-FNmnp1fmKNlUJiUGZOhWUhg-6cf5TDuXCn1jyl4r2iMy3Wlg4o1nBEumOJahYOsjawfhh_Vjir7pd5aUuAgkE9bQrwIdONb788-YRloR2jzbgCPBHEhd86-YnYHOB5W6q7hYcFym43lHb3kdNSMxoJJ6icWK4eZPmDITtbMZCPLNnbZ61CyyrWjoEnvExOB1iP6b7y8nbHnzAJeoEGLna0sxszU6V-izsJP7spwMYp1Fxa3IT9j7b9lpjM4NX-Dj5TsBxgiwkhRJIiFEHs9HE6SRnjHYU6hrwOBBGGfKuNylAvs-mninLtf9sPiCke-Sk90usNMEzwApqcGrMxv_T2OT71pqZcE4Sg8hQ2MWNHldTzZWHuDxMNGy5pYE3IT7BCDTGat_iu1xQGo7y7K3Rtnej3xpt64br8HIsT1Aw4g-QGN1bb8U-6iT9kre1tAJf6umW0-SP1MZQ2C261-r5NmOWmFEvJiU9LvaEfIUY6FZcyaVJXG__V83nMjiCxUp9tHCrLa-P_Sv3lPp8aS2ef71TLuzB14gOLKCzIWEovii0qfHRUfrJeAiwvZi3tDphKprIZYEr_qxvR0YCd4QLUqOwh_kWynztwPdo6ivRnqIRVfhLSgTEAArSrgWHFU1WC8Ckd6T5MpqJhN0x6x8qBePZGHAdYwz8qa9h7wiNLFWBrLRj5DmQLl1CVxnpVrjW33MFso4P8n060N4ghdKSSZsZozkNQ5b7O6yajYy-rSp6QpD8msb8oEX5imFKRaOcviQ2D4TRT45HJxKs63Tb9FtT1JoORzfkdv_E1bL3zSR6oYbTt2Stnpz-7kVqc8KR2N45EkFKxDkRw3IXOte0cq81xoU87S_ntf4KiVZaszuqb2XN2SgxnXBl4EDnpehPmqkD92SAlLrQcTaxaSe47G28K-8MwoVt4eeVkj4UEsSfJN7rbCH2yKl2XJx5huDaS0xn2ODQyNRmgk-5I9hXMUiZDNLvEzx4zuyrcu2d0oXFo3ZoUtVFNCB__TQCf2x27ej9GjLXLDAEi7qnl9Xfb94n0IfeVyGte3-j6NP3DWv8OrLiUjNTaLv6Fay1yzfUaU6LI86-Jd6ckloiGhg7kE0_hd-ZKakZxU1vh0Vzc6DW7MFAPky75iCZlDXoBpZjTNGo5HR-mCW_ozblu60U9zZA8bn-voANuu_hYwxh-uY1sHTFZOqp2xicnnMChz_GTm1Je8XCkICYegeiHUryEHA6T6B_L9gW8S_R4ptMD0Sv6b1KHqqKeubwKltCWPUsr2En9iYypnz06DEL5Wp8KMhrLid2AMPpLI0j1CWGJExXHpBWjfIC8vbYH4YKVl-euRo8eDcuKosb5hxUGM9Jvy1siVXUpIKpkZt2YLP5pEBP_EVOoHPh5LJomrLMpORr1wBKbEkfom7npX1g817bK4IeYmZELI8zXUUtUkx3LgNTckwjx90Vt6oVXpFEICIUDF_LAVMUftzz6JUvbwOZo8iAZqcnVslAmRXeY_ZPp5eEHFfHlsb8VQ73Rd_p8XlFf5R1WuWiUGp2TzJ-VQvj3BTdQfOwSxR9RUk4xjqNabLqTFcQ7As246bHJXH6XVnd4DbEIDPfNa8FaWb_DNEgQAiXGqa6n7l7aFq5_6Kp0XeBBM0sOzJt4fy8JC6U0DEcMnWxKFDtMM7q06LubQYFCEEdQ5b1Qh2LbQZ898tegmeF--EZ4F4hvYebZPV8sM0ZcsKBXyCr585qs00PRxr0S6rReekGRBIvXzMojmid3dxc6DPpdV3x5zxlxaIBxO3i_6axknSSdxnS04_bemWqQ3CLf6mpSqfTIQJT1407GB4QINAAC9Ch3AXUR_n1jr64TGWzbIr8uDcnoVCJlOgmlXpmOwubigAzJattbWRi7k4QYBnA3_4QMjt73n2Co4-F_Qh4boYLpmwWG2SwcIw2PeXGr2LY2zwkPR4bcSyx1Z6UK5trQpWlpQCxgsvV_RvGzpN22RtHoihPH74K0cBIzCz7tK-jqeuWl1A7af7KmQ66fpRBr5ykTLOsa17WblkcIB_jDvqKfEcdxhPWJUwmOo4TIQS-xH8arLOy_NQFG2m14_yxwUemXC-QxLUYi6_FIcqwPBKjCdpQtadRdyftQSKO0SP-GxUvamMZzWI780rXuOBkq5kyYLy9QF9bf_-bL6QLpe1WMCQlOeXZaCPoncgYoT0WZ17jB52Xb2lPWsyXYK54npszkbKJ4OIqfvF8xqRXcVe22VwJuqT9Uy4-4KKQgQ7TXla7Gdm2H7mKl8YXQlsGCT2Ypc8O4t0Sfw7qYAuaDGf752Hbm3fl1bupcB2huIPlIaDP6IRR9XvTYIW2flbwYfhKLmoVKnG85uUi2qtqCjPOIuU3-peT0othfmwKQXaoOqO-V4r6wPL1VHxVFtIYmEdVt0RccUOvpOVR_OAHG9uHOzTmueK5557Qxp0ojtZCHyN-hgoMZJLrvdKkTCxPNo2-mZQbHoVh2FnThZ9JbO49dB8lKXP4_MU5xAnjXMgKXtbfI8w6ZWATE_XWgf2VQMUpGp4wpy44yWQTxHxh_4T9540BGwG0FU0bkgrwA_erseGZnepqdmz5_ScCs84O5Xr5MbYhJLCGGxY6O5GqS-ooB2w0Mt87KbbE4bpYje9CAHH8FX3pDrJyLsyasA3zxmk4OmGpG7Z70ofONJtHRe56R5287vFmuazEEutXn81kNzB-3aJT1ga3vnWZw4CSvFKoWYSA7auLgrHSHFZdITfOrgtmQmGbFhM9kSBdY1UCnpzf65oos3PZWRa2twfUxxLAnPNtrxpRGyvtsapw7ljUagZmuyh3hLCjhAxYmnoE1dbyIWvpCqSlEtVjL1yb_nuLEzgvmZuV02fHxGuWgHTOMVGXpf81Rce3eoBK3lapW1wkzezlk3tcA2bZOtA9qbxdsbVR37kemzQ9K1e3Y0OWhtSj',
                'priv': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
            },
            'signedContent': 'eyJhbGciOiJNTC1EU0EtODciLCJraWQiOiJ0Um4xSk5Ja2dNc0FCVlFCbFhlREh4QUljY2xoLTJJWDBVZERFelB0NVhVIn0.SXTigJlzIGEgZGFuZ2Vyb3VzIGJ1c2luZXNzLCBGcm9kbywgZ29pbmcgb3V0IHlvdXIgZG9vci4',
            'sig': [
                '86632b2a452067018f415fd65285d456afd9f5639e9c365b7cc987a4aae2b65d',
                '1bb568b6f530bc788c90c93d4502e5b6920de1e802ecbc2ae35f9b67dd028541',
                '9602d2c05d46dd153620e6d018f22788d67289920a06f4f9c19768b94e0c0cfe',
                '9e31ab89d61f3b50e918cc071ec86e2aebc40afe2a9d7dd78193c4fba0bc2dae',
                '374d9ad83bc6ebcc15c68aec8630babe4d29976af39e89a76da69ea24d4a890c',
                '1810498bcf07a3ef8a97823e5407d99422f2a92b6b1b298b4960cbc261d9a458',
                '8f8e035f664aabe325fa17c1241e221d1a569b03e9107ec47782e404895aa99a',
                '0f71cacf829190a72cf8fc571a86b25cf02186b533b9237e28e4172e65e8fb58',
                'e42f27a9919af62a22b630a0bb3edff60566455d5f8294dfca29accbc01e339b',
                '3a1cbfbd9640acc9c281f62508aac035b84e646f0ed015e0aa8c3906abffa112',
                '33b4641932b8afa7fd424b48442daaf09308ddab21f947be3b9dd576e884247b',
                '29facbd75a5d16485b1682f4a9806834a6e7e62c455a62000af44267da579d73',
                'd3ae7faf9a9998e305201111562f416e6fd9ee2a4992820bd92a95b1e3c04df1',
                'de581f21b85a5517175e1242543c3b81b6d85ac741e1c6946e102a453497f6c4',
                '0ef41e9e42e55648b22e443b6d47b91a62c6234a9973f9c2186c9ffbaffc1ed1',
                'e1fe035fa5fa039de516b51fa4522b4df390bc102f9845144d219c3de4fe17b7',
                'ffd65cf7e2e172377653e0509e0a1e27e32c996357d23d530db4e7caf06acbad',
                '1a16762f20324df4a132a06fdcc590553bb99855115455f3a03fd3ad1b805487',
                '583cf97655cb7f20a826c6ec1e53bd58189b4c292b32fea59e3878733a6bae8d',
                'a9ad1b490090768d5c12d5dbf69a8e303f594562a63adf233d23d75e5387f1cb',
                'a9a4c2283b5f071526c920f235ffd1a8004ea9ab29f616308e32190f5f72261a',
                '72037c5f6b921ea88f53572043c5541ac480b30e0f39d66999c52dfc369c54b4',
                'fcfaac27aba356a66f1baa6fee510bb7263a9c1ca2f3ef358aa2978b1bf658ed',
                'ae3922a510a706cc83d20213564d4dee67b0c1c02677af80b7d6935e309ef550',
                'c9156f952bdab5d51383412305ce8fdf96b8958d76bc83aad8436903e9b9d937',
                'd7797c572b4bed65f4fd498df7b618b811f6400562ff8d0ca28a8e9be8092b87',
                'afcf810f9b8761f6169bbc6771889ab6c7a1d71b9ea16998a62530bc310c79ca',
                '3f163b3e9cb257c1ec59f123a959405f9eacb402081b8fe8c30ccc64c705c20b',
                '9c00fd7be93c2369726a9bdbf6f835e2b03d9c363c86949feb79cebbd2bbfad6',
                'd863889176b99ac1f59db3a105589dcdd8f6c24c30f3e6ba751c5e93556564ac',
                '3e5143a0f6b5001a059d16cff2b3bea9b3463f937bc58d83b8f4583a9dc2772c',
                '5ec833e61810b6e79e8535e2d18fe3e13c091deb57e05ec419c92f4dda31e615',
                '420a6cbf28f9eddb427a96ede6c49fbcc08d2fcb4360ed8087489de52ef38861',
                'f0076ea16f64cbf68ea6abc15267671d4c191d089249d7823e710eb2c5416ee0',
                'ddde06dc41ffd55afa65c1c8d34eb24fb2aa99a62ae37d518f154095033ea40f',
                '4be115cbd3750b7a0c6ab2b3ad7183f54e7e3eb0c692ac5ee5c3baac1a79be0a',
                'a469e21f1fb6de710280a1bce8dff50415fc45102f62792cc48231231832ae78',
                '3ecb8e0257d14bff019f3f43e5c7a26349414e2f580365373936b00fa0eced12',
                '8d456c9d8babc82a051f4abbd6336b769800d00942f02b6935f3034b758faa9c',
                '9a1f96b57788d4613ef2778e26d95155bcd3e51bcf8912590159aef4f83def06',
                'cb2d034f268a88629f9cf6689e1ac0f1022ef90b633502b46709ae242495ebba',
                '9833433cc579f5b2691908bc2d8c3fd33007f67f358de6a77a2970d953d5374a',
                '2ebd6c9dc2d4924dea2743f0cabfb976c2ab0ba69e9daa411ceec6d0e9c0d2a4',
                'e2f3e3b2f7556a25861c56370e5106b135e32d9e4fa92c92fb8f7333a8d88391',
                'cf8e7d1d7d7dc5af0e699df59f30b63db49212f89930e7eea4d4a3e3ec551ec6',
                '9e9aa4226984984f2c6b86653c76b8fc87191856dd730a7dc6e3a7748365cd61',
                'ab20acb014f435c76eb35c311aedf3b1e5fd35697f1d214fca58d00675a6713c',
                '896a2d6e6a6c2e9d8a94aa7fd3706e564b26ce430a22d5f271d2f90336eb1409',
                '554347db69ffdd9ffccf5480f005fc77b8f4fa0d4f7fb3590bc7bc2299e6e01d',
                'd81a903b9e7e3bd5a4db25be0e51a99f832b35ecc57f84f0cafdfec517b357a7',
                '4ebe76d5580e672cfbced992b0ee96e3a451a462bca50bc2312d49b8a229900a',
                '8ab19f00ebb0c826dbcf2804a6a62f133b4005298361dfc5fdabad925a1bff47',
                '5e2aebef4581695426b179a610ed6224a5f05b3317a1f50722ee43df8320791f',
                'd6a3584255ddf811935d10d51696c9351d750fe359a96e8836b7183feddfdb14',
                'ac6ed08577363b3d4d3cf36863af80e2315b142b57485d66bb3b6acb4c5ac28a',
                'dc3621d8d7cc9e2f80b0da260b2754373b8367168dc4fb021799817808bc5989',
                'faf626477a231d70fb096c37abf209c0ecf0978081e267d3f39a864d6682f461',
                '573f0515e89d49d16a241c4629b7d9df617f6ae270aec2f28cdfd28714d21687',
                'f2290cb65c27e854c928e1ebb9a3a99debac419a366f4ef22d5cbedff9e0f427',
                '121206c064646de616b02964a6dda48d6511aebcd596c2c514d8a71511ecc713',
                '6ecd10e52f4f08de44954cff6b17deba92086c24c4e12d3e650b88750710da99',
                'f58fee2dd9cd388ed2c4e96148fb501204279d9599ab6548917a06decc4d3584',
                'c8859df377d81841bbb65c9e5042756c23f6151fa4476e24881a03769c5e1cac',
                '1ace349ea47347d8a6bd7f42050609663ac21ebfb039117ab2f9af1791400d18',
                '306ccec273da6e2602c1890c17ae10f8dc1ea48d7fce5e2e4ed9435916400faf',
                '458e34126c8a9f02811ea9b75bbf9882a522b60cf6433e89d246193d0367d514',
                'e0b331d3ef7fd8a0829230ea818375ad2f4303ffc63fdb52ddd27e5cb4a59365',
                '1142ea079b85ee6efe2fc208d44bb2730317105870741ed1c5a19dfeb58570fc',
                '645b470c8e0e6dc4f8de4edcbfd1fa9bdaf5fbe53e390234cadfd8897103104a',
                '30bd600b1b12aa116be72a0f796e342d3c4c17f7583cd2e30b797b991465ff07',
                'd8fc586f6b223b86b80261f32059e6fe717cb1e5e5ee9adf65305383ddd42d10',
                '6d4851b744ee95571be6daad62b4665e370ed40c350ce808afc12f17c2b1a99b',
                'c9145c23a1384137ea7b9956b557fc5a2e0aa6ba1e9d6c828e3cc48c941d5b0e',
                '20f9a7bf6e31a37d90a9dfc460b17b56808fedbb32b2445e56c23c8df5512845',
                '777c5b60dcb6605e8c71765c36336cc16427edfce12a243d7ea29ed9e5a8118c',
                'b34b2cc6b88986c14e03ebe00eb6ba444c770d431bf3fbbf52673ece9e04ea2b',
                '17e03f9e4588049668f47b3f78e67ab1a7762588ef2644b316e84e0eba92ed85',
                'fc38be62b762a4c0b977271b162b7fb26a02431fcf9b803e2d12a8f583419abb',
                'c9cbbd06690c5c022131bd7d5c10e32fb859183c0346b9fdc8105c6253da14f3',
                '578cc256247ff1c5428db13146839f89fd67715e2f199fab433316f1aaa8c8a7',
                '0fc551a334d23276321a5b933844c7b5fce69051e3b49c460afa589a5fe192d2',
                '16e57b353d562373c805afdb61e0a2ab6f5fa774a133ed5b4457491bf94665df',
                '7b4ee00c17f414ebe2835c1bf98bc914675357749533f98680d1145534580c18',
                'ce67d29281e481677003cafad693cc72c8649f6eb8174fdb2d87c706f0f18425',
                '9b2dbe313e5713901effd931baf208952ce3a5f2cdf74d761d29d7e2d67cc776',
                '96c287f713bb378e3cf0eea6c1b68524618a4819538a7f61299a112a7af4a55d',
                '85a90583775f66588ecac0f422fd3d3beb3ddc962f028199f87b70325b8cd5c9',
                '4902de28bee81f389cae594007347d0a4933edbdb85c65752a571ab7f3a0e280',
                '7dab188edb32595b3d860d300bd21a2c5251cb5a7ad062fa85cf37483b31a589',
                'fc08c8682844d6f8e0844ccf3b04af1ba8aa476365ec157383f3aee1d1955ddc',
                '58ae8ced952258bb71b4ccdab36b1f004472f01752ec848bce3e4f111a16c985',
                'd25bef3df160f7cdee4c25ca52b0060d1263c206d77117d97e433d4bc6e0daf2',
                '13824365b379fd5ad96145e6908169945c00afe479feb9c51b2de961698d6646',
                '08b654a870611432c439dec891bc3b77d57c75ce2700eeb93507317d3f490d46',
                '5a752da3990262a7c18b0f83fd9464b5472fbcac70a730def35c3a78dd37f262',
                '14a0bfdba3e312a2db098030c6019749f644d7a6c7c9edf8afdd9271a061818e',
                'c9b0e4836b805285ddc4fdf729f8918db46962a655022ab44b8e502c0231c468',
                '832686519f222c71d33a96bc90b578f43ceebbbd17fa89fc42df02eff7b1c750',
                'a7ab8295dc020fb8feb363fd9c7fc621cc7c201edaadc31b56bf0dc4a6bb9bb5',
                '38f9011e6cc707d56cf07574136fb3e38b25dc4c6a6f92fca4c6290e767b416f',
                '906f5f92fb3a04494cbffc02a191158f0bb1a6be6249247babe9244648ad17d8',
                'acacce4118a1efbc361c29bcbad89cdb9593b4249c14bdd4a1f6abc0b407c14a',
                'a9c638d12e482e42263fd88e1885d89796554657a80c1a47f41a28b561f66b3e',
                '65edcfdefaf7c11aced7a6e76802ae70ce17bff80301bca3c29b4068097e41fc',
                'd1946ac5ef116a1ba946fad66a4a0ae54977356d7b193e9bc25fbe675cf28a0f',
                '244603fe8a2c639fd2d4bb87a1cec61cb9e861d0d56f616120f84e2422d009e7',
                'fe63776d35386a384a39df8660ed1ef69d2792421750d6170152c739d14da817',
                'd3a53a757dcf986c7cdc08c5d50ef5b7685d16059a8b26b699837c6c407a6d2c',
                'e623c9d0427ff2cce5697da98ba93a54ff9c8be9fb27ca440702f647773e7a2d',
                'a2a81ec974b8bb1a0ea25d5329408153c6cc21d076e01adc995e047ff8033dd5',
                '746cce6fe4025a801d3009ec1fb46796c980c1846364ad05d846cde97f80d3d5',
                '6b17a60b70d3d3dd3819b094d99ddabd41dc79d79b234dbf31d20b750c725dbc',
                '35e392a3a82d790aa79a1befbac7a5b3a40b928eb15046ecfa67953289b5ba03',
                '2f51dcfdb973e83099a44cf2b3d6e58910b5075fcebb6f199eb0ca121c057bdb',
                'a54d363a80a17d10c5e312362ef9da5b783a85021419ee65b9e235dc0ad84408',
                '590b42c728fb957efe4e29e32ac5846d70ddd82ba0dd735b7ad6bb00ecc53570',
                '02b3386b2243b68dc8d0501ce57acfe5b8fb0b3f0e764a611333d03fe1c1b787',
                '3b464a85c8979e0e550c25f88726f8ecb13198ee4dd667e284dde21c4917ff5f',
                '6b220ba77e449bf6077d07f01a6b302db4110f3cbb5bb286677905c1465dcf5a',
                '20e90bfc9788b4d601dd7700e0581f304c29e278869954aac0064da192ced6e9',
                'bd5f76c33fd85fd90c12e70732ee61a0cf9325bb96a217a28a22921413512bf8',
                '3faea5d9a355198c33a71e91c62713a794904fa7de19bf087cb0a2cea4e778a9',
                'e38c2db9d82a26a0d346a5e71ff77c15eaf8a234637d4e25f80374268a010d03',
                '517ef51cde970ce96f535230878f220122477501839a385c4bc628797f689b03',
                'e262171b1891b3115ae7dc7ee1db87887ffedb551a6270c863c20841d31b6a4d',
                '3d1e55a9b597c92bd7ee647a6ec3af62b2aa6d87a44c1b8b728f5ca6035d045b',
                '1c494485accc098af6c278f1fc1c766a2dae65af2e4328cdd738757235871f44',
                'e270bd9e03273a60f29f2a999ce50c0bae04f475d40386f5e40a4379d1f391d5',
                '26e5e7a885a002fc828165dd0039c01939d6fb03b2ab84b7b9e5cfab064c7ce4',
                '9c435bf9e11acab5e7c3e43916e785c2ace826952b1180d74f180e53c5d586b3',
                'efd0eb7e04ee8e45fce7dffd604447078e1adce91745d3534dab2cf2546d0175',
                'c932c2f027cd41ac9167427cfeb674a771e3a94021154f777c46e2d562690efd',
                '18078c567a927822d76cecaa7e727084e4f67e04332f0c5c8f5b6a18105ddcf7',
                'f1d9de7ed745a22ff9a2b34bde9fa82896a68bab5110b2f79bf40269918809c5',
                'd05ec87657c4d2cc878fd702e2b5648b3d17c0b3d6f14455c0058a97aff9c172',
                '46fb1d70d236f872b69ce1a4ca911cb95013c8bb40d2329ec8fb44e13277fe5f',
                '0a5e5b446635b271001dffc4e3f62b37c22b02f1b7f38e597c5018c5669fabce',
                '60abf240387198a1f60976ed38829a1c8a86031f0d42149ae0cbfd19fd0cbc44',
                '013dc46e5d525b44e809c88db4a4c7f683bec2790f77e8e0d470a8a0b720f8af',
                'd090e4e9b493594456d7a68a0aab01f967daac0b1bab6719d2fccb1c9c4d2a4d',
                'ae04aab9698839e3e0506ce2af5210f94a7aab9f6331668d08acd62c2c45ebad',
                '7faa479acbd19b3f60c79bdde8d308908d3921e2cd0c496f94e183d389b5bd1e',
                '1921276674768081a5bdfc050f1b1d2f3f546a7b7e9cbde6f05184a7cdd6d9ef',
                '2d6cecf1fb197179afbccd13363d6c7997bec8dbdcdfeef4191e9f09107d9192',
                'e9ecf400000000000000000b1920252b383b43',
            ].join(''),
        }
    ] as const) {

        NodeTest.it(`[${data.jwk.alg}] should verify signature in RFC`, () => {

            const pub = NodeCrypto.createPublicKey({
                key: data.jwk,
                format: 'jwk',
                type: 'spki',
            });

            const verifier = new MldsaJwaVerifier({
                publicKey: pub,
            });

            NodeAssert.strictEqual(verifier.jwa, data.jwk.alg);

            NodeAssert.doesNotThrow(() => {

                verifier.validate({
                    header: { 'alg': data.jwk.alg as any },
                    payload: {},
                    signedContent: data.signedContent,
                    signature: Buffer.from(data.sig, 'hex'),
                });
            });
        });
    }

});
