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

import * as Jwt from '../lib';
import { token } from './quick-start-builder';

const hmacVerifier = new Jwt.HmacJwaVerifier({
    key: 'hello-world',
    digestType: Jwt.EDigestType.SHA256,
});

const verifier = new Jwt.JwtVerifier({
    validators: [
        new Jwt.JwtIssuerValidator({ allowlist: ['my-issuer'] }),
        new Jwt.JwtAudienceValidator({ allowlist: ['my-audience'] }),
        new Jwt.JwtTimeValidityValidator(),
        hmacVerifier,
    ],
});

try {

    const result = verifier.verify(token);

    console.log('JWT is valid');
    console.log('Header:', result.header);
    console.log('Payload:', result.payload);
}
catch (err) {

    console.error('JWT is invalid:', err);
}
