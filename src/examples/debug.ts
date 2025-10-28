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

const JWT_SECRET = 'hello-world-nTqb91omeWcYYXIld76preWHFEiRNEN4';
const token = LibJwt.stringify({
    header: {
        'test': 123,
    },
    payload: {
        sub: '1234567890',
        name: 'John Doe',
        admin: true,
        data: {
            a: '123',
            b: 456,
            c: false,
        },
        "eUrl": "xxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
    signer: new LibJwt.HmacJwaSigner({
        key: JWT_SECRET,
        digestType: LibJwt.EDigestType.SHA256,
    })
});

console.log(token);

const info = LibJwt.parse(token);

console.log(info);

const verifier = new LibJwt.HmacJwaVerifier({
    key: JWT_SECRET,
    digestType: LibJwt.EDigestType.SHA256,
});

try {

    verifier.validate(info);
    console.log('Signature is valid.');
}
catch {

    console.error('Signature is INVALID.');
}
