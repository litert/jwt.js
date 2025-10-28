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
import * as uL from './Utils';

NodeTest.describe('_internal/Utils', () => {

    NodeTest.it('"preparePrivateKey" should throw an error with invalid key', () => {

        NodeAssert.throws(() => {

            uL.preparePrivateKey('invalid-key');

        }, { name: 'invalid_settings', code: 'invalid_key_format' });

        NodeAssert.throws(() => {

            uL.preparePrivateKey(NodeFS.readFileSync(
                `${__dirname}/../../test-data/ok-RS256.pub.pem`,
                'utf-8',
            ));

        }, { name: 'invalid_settings', code: 'invalid_key_format' });
    });

    NodeTest.it('"preparePrivateKey" should work with valid key', () => {

        uL.preparePrivateKey(NodeFS.readFileSync(
            `${__dirname}/../../test-data/ok-RS256.p8.pem`,
            'utf-8',
        ));

        uL.preparePrivateKey(
            NodeCrypto.createPrivateKey({
                key: NodeFS.readFileSync(
                    `${__dirname}/../../test-data/ok-RS256.p8.der`,
                ),
                format: 'der',
                type: 'pkcs8',
            })
        );

        uL.preparePrivateKey(NodeFS.readFileSync(
            `${__dirname}/../../test-data/ok-RS256.p1.pem`,
            'utf-8',
        ));

        uL.preparePrivateKey(
            NodeCrypto.createPrivateKey({
                key: NodeFS.readFileSync(
                    `${__dirname}/../../test-data/ok-RS256.p1.der`,
                ),
                format: 'der',
                type: 'pkcs1',
            })
        );
    });

    NodeTest.it('"preparePublicKey" should throw an error with wrong key', () => {

        NodeAssert.throws(() => {

            uL.preparePublicKey('invalid-key');

        }, { name: 'invalid_settings', code: 'invalid_key_format' });
    });

    NodeTest.it('"preparePublicKey" should work with valid key', () => {

        uL.preparePublicKey(NodeFS.readFileSync(
            `${__dirname}/../../test-data/ok-RS256.pub.pem`,
            'utf-8',
        ));

        // Private keys should also work for public key usage

        uL.preparePublicKey(NodeFS.readFileSync(
            `${__dirname}/../../test-data/ok-RS256.p8.pem`,
            'utf-8',
        ));

        uL.preparePublicKey(NodeFS.readFileSync(
            `${__dirname}/../../test-data/ok-RS256.p1.pem`,
            'utf-8',
        ));

        uL.preparePublicKey(
            NodeCrypto.createPublicKey({
                key: NodeFS.readFileSync(
                    `${__dirname}/../../test-data/ok-RS256.pub.der`,
                ),
                format: 'der',
                type: 'spki',
            })
        );
    });

    NodeTest.it('"createSigner" should throw an error with unknown digest', () => {

        NodeAssert.throws(() => {

            uL.createSigner('unknown-digest');

        }, { name: 'sign_failed', code: 'unknown_digest_type' });
    });

    NodeTest.it('"createSigner" should work with valid digest', () => {

        uL.createSigner('SHA256');
        uL.createSigner('SHA384');
        uL.createSigner('SHA512');
    });

    NodeTest.it('"createVerifier" should throw an error with unknown digest', () => {

        NodeAssert.throws(() => {

            uL.createVerifier('unknown-digest');

        }, { name: 'verify_failed', code: 'unknown_digest_type' });
    });

    NodeTest.it('"createVerifier" should work with valid digest', () => {

        uL.createVerifier('SHA256');
        uL.createVerifier('SHA384');
        uL.createVerifier('SHA512');
    });
});
