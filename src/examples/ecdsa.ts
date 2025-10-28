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

import * as LibJwt from '../lib';
import * as NodeFS from 'node:fs';

const KEY_DIR = `${__dirname}/../test-data`;

for (const k of [
    'ES256',
    'ES384',
    'ES512',
    'ES256K',
] as const) {

    const okKeyId = `ok-${k}`;
    const errKeyId = `err-${k}`;

    const okPubKeyFiles = [
        `${okKeyId}.pub.pem`,
    ];

    const errPubKeyFiles = [
        `${errKeyId}.pub.pem`,
    ];

    const okPrivKeyFiles = [
        `${okKeyId}.p1.pem`,
        `${okKeyId}.p8.pem`,
    ];

    const errPrivKeyFiles = [
        `${errKeyId}.p1.pem`,
        `${errKeyId}.p8.pem`,
    ];

    console.log(`=== Token signed with ${k} ===`);

    for (const okKey of okPrivKeyFiles) {

        const signer = new LibJwt.EcdsaJwaSigner({
            privateKey: NodeFS.readFileSync(`${KEY_DIR}/${okKey}`, 'utf-8'),
            keyId: okKeyId,
        });

        const token = LibJwt.stringify({
            header: { kid: signer.keyId! },
            payload: {
                sub: '1234567890',
                name: 'John Doe',
                admin: true,
            },
            signer,
        });

        for (const okPub of [
            ...okPrivKeyFiles,
            ...okPubKeyFiles,
        ]) {

            const okVerifier = new LibJwt.EcdsaJwaVerifier({
                publicKey: NodeFS.readFileSync(`${KEY_DIR}/${okPub}`, 'utf-8'),
            });

            try {

                okVerifier.validate(LibJwt.parse(token));
                console.info(`${okKey} * ${okPub} should passed => √`);
            }
            catch {

                console.error(`${okKey} * ${okPub} should passed => ×`);
            }
        }

        for (const errPub of [
            ...errPrivKeyFiles,
            ...errPubKeyFiles,
        ]) {

            const errVerifier = new LibJwt.EcdsaJwaVerifier({
                publicKey: NodeFS.readFileSync(`${KEY_DIR}/${errPub}`, 'utf-8'),
            });

            try {

                errVerifier.validate(LibJwt.parse(token));
                console.error(`${okKey} * ${errPub} should failed => ×`);
            }
            catch {

                console.info(`${okKey} * ${errPub} should failed => √`);
            }
        }
    }
}
