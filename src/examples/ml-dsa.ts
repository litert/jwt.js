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
    'ML-DSA-44',
    'ML-DSA-65',
    'ML-DSA-87',
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
        `${okKeyId}.p8.pem`,
    ];

    console.log(`=== Token signed with ${k} ===`);

    for (const okKey of okPrivKeyFiles) {

        try {
            const signer = new LibJwt.MldsaJwaSigner({
                'privateKey': NodeFS.readFileSync(`${KEY_DIR}/${okKey}`).toString(),
                'keyId': 'my-key-id'
            });

            const token = LibJwt.stringify({
                'header': {
                    'alg': signer.jwa,
                    'kid': signer.keyId ?? undefined
                },
                'payload': {
                    'sub': '1234567890',
                    'name': 'John Doe',
                    'iat': 1516239022
                },
                'signer': signer
            });

            console.log(`Token: ${token}`);

            for (const okPubKey of okPubKeyFiles) {

                const verifier = new LibJwt.MldsaJwaVerifier({
                    'publicKey': NodeFS.readFileSync(`${KEY_DIR}/${okPubKey}`).toString()
                });

                const result = LibJwt.parse(token);

                verifier.validate(result);

                console.log(`Verified with ${okPubKey}: OK`);
            }

            for (const errPubKey of errPubKeyFiles) {

                const verifier = new LibJwt.MldsaJwaVerifier({
                    'publicKey': NodeFS.readFileSync(`${KEY_DIR}/${errPubKey}`).toString()
                });

                try {
                    const result = LibJwt.parse(token);
                    verifier.validate(result);
                    console.error(`Verified with ${errPubKey}: FAILED (Should fail)`);
                }
                catch (e) {
                    console.log(`Verified with ${errPubKey}: OK (Expected failure)`);
                }
            }
        }
        catch (e: any) {
            console.warn(`Skipping ${k}: ${e.message}`);
        }
    }
}
