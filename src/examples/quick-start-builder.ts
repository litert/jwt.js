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

const signer = new Jwt.HmacJwaSigner({
    key: 'hello-world',
    digestType: Jwt.EDigestType.SHA256,
});

const builder = new Jwt.JwtBuilder({ signer });

export const token = builder
    .setIssuer('my-issuer')
    .setSubject('my-subject')
    .setAudience('my-audience')
    .setExpiration(Math.floor(Date.now() / 1000) + 3600) // 1 hour from now
    .setNotBefore(Math.floor(Date.now() / 1000)) // valid from now
    .setIssuedAt(Math.floor(Date.now() / 1000)) // issued at now
    .setJwtId('unique-jwt-id-12345')
    .setPayloadClaim('custom-claim', 'custom-value')
    .build();

console.log('Generated JWT:', token);
