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

import * as JWT from '../lib';

const jwtInfo = JWT.parse('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIifQ.QU8SAZfLfKPRp6_vPGyepPtmeotqcn4qezKfSGgrbGw');

console.info(`Header: ${JSON.stringify(jwtInfo.header)}`);
console.info(`Payload: ${JSON.stringify(jwtInfo.payload)}`);

const verifier = new JWT.HmacJwaVerifier({
    // example secret, don't use such a weak secret in production
    key: 'hello-world',
    digestType: JWT.EDigestType.SHA256,
});

try {

    verifier.validate(jwtInfo);

    console.info('The JWT is valid.');
}
catch (err) {

    console.error('The JWT is invalid.', err);
}
