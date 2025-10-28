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
import * as NodeAssert from 'node:assert';
import type * as dL from '../Types';
import * as cL from '../Constants';
import { JwtBuilder } from './Builder';
import { parse } from '../CoreApis/Parse';

class TestSigner implements dL.IJwaSigner {
    public readonly family = cL.ESigningAlgoFamily.HMAC;
    public readonly jwa = cL.ESigningJwa.HS256;
    public readonly digestType = cL.EDigestType.SHA256;

    public sign(): Buffer {
        return Buffer.from('test');
    }
}

NodeTest.describe('class JwtBuilder', () => {

    NodeTest.it('default initial header claims should be empty', () => {

        const builder = new JwtBuilder({ signer: new TestSigner() });

        const jwtString = builder.setKeyId('123')
            .setExpiration(Math.floor(Date.now() / 1000 + 60))
            .setPayloadClaim('a', 'hello')
            .setPayloadClaim('b', 123)
            .build();

        const info = parse(jwtString);

        NodeAssert.deepStrictEqual(info.header, {
            alg: 'HS256',
            typ: 'JWT',
            kid: '123'
        });
    });

    NodeTest.it('should use initial header claims', () => {

        const builder = new JwtBuilder({
            signer: new TestSigner(),
            header: {
                customHeader: 'customValue'
            }
        });

        const jwtString = builder.setKeyId('123')
            .setExpiration(Math.floor(Date.now() / 1000 + 60))
            .setPayloadClaim('a', 'hello')
            .setPayloadClaim('b', 123)
            .build();

        const info = parse(jwtString);

        NodeAssert.deepStrictEqual(info.header, {
            alg: 'HS256',
            typ: 'JWT',
            kid: '123',
            customHeader: 'customValue'
        });
    });

    NodeTest.it('initial header claims should be overridable', () => {

        const builder = new JwtBuilder({
            signer: new TestSigner(),
            header: {
                kid: 'initialKid',
                customHeader: 'customValue'
            }
        });

        const jwtString = builder.setKeyId('123')
            .setExpiration(Math.floor(Date.now() / 1000 + 60))
            .setPayloadClaim('a', 'hello')
            .setPayloadClaim('b', 123)
            .build();

        const info = parse(jwtString);

        NodeAssert.deepStrictEqual(info.header, {
            alg: 'HS256',
            typ: 'JWT',
            kid: '123',
            customHeader: 'customValue'
        });
    });

    NodeTest.it('default initial payload claims should be empty', () => {

        const builder = new JwtBuilder({
            signer: new TestSigner()
        });

        const exp = Math.floor(Date.now() / 1000 + 60);
        const jwtString = builder.setKeyId('123')
            .setExpiration(exp)
            .setPayloadClaim('a', 'hello')
            .setPayloadClaim('b', 123)
            .build();

        const info = parse(jwtString);

        NodeAssert.deepStrictEqual(info.payload, {
            a: 'hello',
            b: 123,
            exp: exp
        });
    });

    NodeTest.it('should use initial payload claims', () => {

        const builder = new JwtBuilder({
            signer: new TestSigner(),
            payload: {
                customPayload: 'customValue'
            }
        });

        const exp = Math.floor(Date.now() / 1000 + 60);
        const jwtString = builder.setKeyId('123')
            .setExpiration(exp)
            .setPayloadClaim('a', 'hello')
            .setPayloadClaim('b', 123)
            .build();

        const info = parse(jwtString);

        NodeAssert.deepStrictEqual(info.payload, {
            a: 'hello',
            b: 123,
            exp: exp,
            customPayload: 'customValue'
        });
    });

    NodeTest.it('initial payload claims should be overridable', () => {

        const builder = new JwtBuilder({
            signer: new TestSigner(),
            payload: {
                exp: 9999999999,
                customPayload: 'customValue'
            }
        });

        const exp = Math.floor(Date.now() / 1000 + 60);
        const jwtString = builder.setKeyId('123')
            .setExpiration(exp)
            .setPayloadClaim('a', 'hello')
            .setPayloadClaim('b', 123)
            .build();

        const info = parse(jwtString);

        NodeAssert.deepStrictEqual(info.payload, {
            a: 'hello',
            b: 123,
            exp: exp,
            customPayload: 'customValue'
        });
    });

    NodeTest.it('should use the given signer', () => {

        const builder = new JwtBuilder({ signer: new TestSigner() });

        const jwtString = builder.setKeyId('123')
            .setExpiration(Math.floor(Date.now() / 1000 + 60))
            .setPayloadClaim('a', 'hello')
            .setPayloadClaim('b', 123)
            .build();

        const info = parse(jwtString);

        NodeAssert.strictEqual(info.signature.toString(), 'test');
    });

    NodeTest.it('should do nothing when setting alg or typ claim', () => {

        const builder = new JwtBuilder({ signer: new TestSigner() });

        NodeAssert.deepStrictEqual(
            parse(builder.setHeaderClaim('alg', 'none').setHeaderClaim('typ', '123').build()).header,
            { alg: 'HS256', typ: 'JWT' }
        );
    });

    NodeTest.it('should add header claims as critical as required', () => {

        const builder = new JwtBuilder({ signer: new TestSigner() });

        NodeAssert.deepStrictEqual(
            parse(builder.setHeaderClaim('a', 'abc', { critical: true }).build()).header,
            { alg: 'HS256', typ: 'JWT', a: 'abc', crit: ['a'] }
        );

        NodeAssert.deepStrictEqual(
            parse(builder.setHeaderClaim('a', 'xyx', { critical: true }).setHeaderClaim('b', 'def', { critical: true }).build()).header,
            { alg: 'HS256', typ: 'JWT', a: 'xyx', b: 'def', crit: ['a', 'b'] }
        );
    });

    NodeTest.it('should not set spec-defined claims as critical by default', () => {

        const builder = new JwtBuilder({ signer: new TestSigner() });

        NodeAssert.deepStrictEqual(
            parse(builder.setHeaderClaim('jku', 'https://example.com/jwks.json', { critical: true }).build()).header,
            { alg: 'HS256', typ: 'JWT', jku: 'https://example.com/jwks.json' }
        );
    });

    NodeTest.it('should verify type of header claim "jwk"', () => {

        const builder = new JwtBuilder({ signer: new TestSigner() });

        NodeAssert.throws(
            () => builder.setHeaderClaim('jwk', 1123),
            {
                name: 'TypeError',
                message: 'The header claim "jwk" must be an object.'
            }
        );

        NodeAssert.throws(
            () => builder.setJwk('not-an-object' as any),
            {
                name: 'TypeError',
                message: 'The header claim "jwk" must be an object.'
            }
        );

        NodeAssert.doesNotThrow(
            () => builder.setHeaderClaim('jwk', 1123, { skipValidation: true })
        );

        NodeAssert.doesNotThrow(
            () => builder.setHeaderClaim('jwk', { kty: 'RSA' })
        );
    });

    NodeTest.it('should verify type of header claim "x5c"', () => {

        const builder = new JwtBuilder({ signer: new TestSigner() });

        NodeAssert.throws(
            () => builder.setHeaderClaim('x5c', 'not-an-array'),
            {
                name: 'TypeError',
                message: 'The header claim "x5c" must be a string array.'
            }
        );

        NodeAssert.throws(
            () => builder.setX509CertChain('not-an-array' as any),
            {
                name: 'TypeError',
                message: 'The header claim "x5c" must be a string array.'
            }
        );

        NodeAssert.doesNotThrow(
            () => builder.setHeaderClaim('x5c', '', { skipValidation: true }),
        );

        NodeAssert.throws(
            () => builder.setHeaderClaim('x5c', [123, 'valid-string']),
            {
                name: 'TypeError',
                message: 'The header claim "x5c" must be a string array.'
            }
        );

        NodeAssert.doesNotThrow(
            () => builder.setHeaderClaim('x5c', ['valid-string-1', 'valid-string-2'])
        );
    });

    NodeTest.it('should deny setting the header claim "crit"', () => {

        const builder = new JwtBuilder({ signer: new TestSigner() });

        NodeAssert.throws(
            () => builder.setHeaderClaim('crit', 'not-an-array'),
            {
                name: 'Error',
                message: 'The "crit" header claim cannot be set directly.'
            }
        );
    });

    NodeTest.it('should verify type of header claim "cty"', () => {

        const builder = new JwtBuilder({ signer: new TestSigner() });

        NodeAssert.throws(
            () => builder.setHeaderClaim('cty', 123),
            {
                name: 'TypeError',
                message: 'The header claim "cty" must be a non-empty string.'
            }
        );

        NodeAssert.throws(
            () => builder.setContentType(123 as any),
            {
                name: 'TypeError',
                message: 'The header claim "cty" must be a non-empty string.'
            }
        );

        NodeAssert.doesNotThrow(
            () => builder.setHeaderClaim('cty', 123, { skipValidation: true })
        );

        NodeAssert.doesNotThrow(
            () => builder.setHeaderClaim('cty', 'application/json')
        );
    });

    NodeTest.it('should verify type of header claim "kid"', () => {

        const builder = new JwtBuilder({ signer: new TestSigner() });

        NodeAssert.throws(
            () => builder.setHeaderClaim('kid', 123),
            {
                name: 'TypeError',
                message: 'The header claim "kid" must be a non-empty string.'
            }
        );

        NodeAssert.throws(
            () => builder.setKeyId(123 as any),
            {
                name: 'TypeError',
                message: 'The header claim "kid" must be a non-empty string.'
            }
        );

        NodeAssert.doesNotThrow(
            () => builder.setHeaderClaim('kid', 123, { skipValidation: true })
        );

        NodeAssert.doesNotThrow(
            () => builder.setHeaderClaim('kid', 'key-123')
        );
    });

    NodeTest.it('should verify type of header claim "jku"', () => {

        const builder = new JwtBuilder({ signer: new TestSigner() });

        NodeAssert.throws(
            () => builder.setHeaderClaim('jku', 123),
            {
                name: 'TypeError',
                message: 'The header claim "jku" must be a non-empty string.'
            }
        );

        NodeAssert.throws(
            () => builder.setJwkUrl(123 as any),
            {
                name: 'TypeError',
                message: 'The header claim "jku" must be a non-empty string.'
            }
        );

        NodeAssert.doesNotThrow(
            () => builder.setHeaderClaim('jku', 123, { skipValidation: true })
        );

        NodeAssert.doesNotThrow(
            () => builder.setHeaderClaim('jku', 'https://example.com/jwks.json')
        );
    });

    NodeTest.it('should verify type of header claim "x5u"', () => {

        const builder = new JwtBuilder({ signer: new TestSigner() });

        NodeAssert.throws(
            () => builder.setHeaderClaim('x5u', 123),
            {
                name: 'TypeError',
                message: 'The header claim "x5u" must be a non-empty string.'
            }
        );

        NodeAssert.throws(
            () => builder.setX509CertUrl(123 as any),
            {
                name: 'TypeError',
                message: 'The header claim "x5u" must be a non-empty string.'
            }
        );

        NodeAssert.doesNotThrow(
            () => builder.setHeaderClaim('x5u', 123, { skipValidation: true })
        );

        NodeAssert.doesNotThrow(
            () => builder.setHeaderClaim('x5u', 'https://example.com/cert.pem')
        );
    });

    NodeTest.it('should verify type of header claim "x5t"', () => {

        const builder = new JwtBuilder({ signer: new TestSigner() });

        NodeAssert.throws(
            () => builder.setHeaderClaim('x5t', 123),
            {
                name: 'TypeError',
                message: 'The header claim "x5t" must be a non-empty string.'
            }
        );

        NodeAssert.throws(
            () => builder.setX509CertThumbprintSha1(123 as any),
            {
                name: 'TypeError',
                message: 'The header claim "x5t" must be a non-empty string.'
            }
        );

        NodeAssert.doesNotThrow(
            () => builder.setHeaderClaim('x5t', 123, { skipValidation: true })
        );

        NodeAssert.doesNotThrow(
            () => builder.setHeaderClaim('x5t', 'abc123')
        );
    });

    NodeTest.it('should verify type of header claim "x5t#S256"', () => {

        const builder = new JwtBuilder({ signer: new TestSigner() });

        NodeAssert.throws(
            () => builder.setHeaderClaim('x5t#S256', 123),
            {
                name: 'TypeError',
                message: 'The header claim "x5t#S256" must be a non-empty string.'
            }
        );

        NodeAssert.throws(
            () => builder.setX509CertThumbprintSha256(123 as any),
            {
                name: 'TypeError',
                message: 'The header claim "x5t#S256" must be a non-empty string.'
            }
        );

        NodeAssert.doesNotThrow(
            () => builder.setHeaderClaim('x5t#S256', 123, { skipValidation: true })
        );

        NodeAssert.doesNotThrow(
            () => builder.setHeaderClaim('x5t#S256', 'abc123')
        );
    });

    NodeTest.it('should verify type of payload claim "aud"', () => {

        const builder = new JwtBuilder({ signer: new TestSigner() });

        NodeAssert.throws(
            () => builder.setPayloadClaim('aud', 123),
            {
                name: 'TypeError',
                message: 'The payload claim "aud" must be a non-empty string or an array of non-empty strings.'
            }
        );

        NodeAssert.throws(
            () => builder.setAudience(123 as any),
            {
                name: 'TypeError',
                message: 'The payload claim "aud" must be a non-empty string or an array of non-empty strings.'
            }
        );

        NodeAssert.doesNotThrow(
            () => builder.setPayloadClaim('aud', 123, { skipValidation: true })
        );

        NodeAssert.doesNotThrow(
            () => builder.setPayloadClaim('aud', 'audience-123')
        );

        NodeAssert.doesNotThrow(
            () => builder.setPayloadClaim('aud', ['audience-1', 'audience-2'])
        );
    });

    for (const [c, m] of [
        ['sub', 'setSubject'],
        ['iss', 'setIssuer'],
        ['jti', 'setJwtId']
    ] as const) {

        NodeTest.it(`should verify type of payload claim "${c}"`, () => {

            const builder = new JwtBuilder({ signer: new TestSigner() });

            NodeAssert.throws(
                () => builder.setPayloadClaim(c, 123),
                {
                    name: 'TypeError',
                    message: `The payload claim "${c}" must be a non-empty string.`
                }
            );

            NodeAssert.throws(
                () => builder[m](123 as any),
                {
                    name: 'TypeError',
                    message: `The payload claim "${c}" must be a non-empty string.`
                }
            );

            NodeAssert.doesNotThrow(
                () => builder.setPayloadClaim(c, 123, { skipValidation: true })
            );

            NodeAssert.doesNotThrow(
                () => builder.setPayloadClaim(c, 'subject-123')
            );
        });
    }

    for (const [c, m] of [
        ['nbf', 'setNotBefore'],
        ['iat', 'setIssuedAt'],
        ['exp', 'setExpiration'],
    ] as const) {

        NodeTest.it(`should verify type of payload claim "${c}"`, () => {

            const builder = new JwtBuilder({ signer: new TestSigner() });

            NodeAssert.throws(
                () => builder.setPayloadClaim(c, 'not-a-number'),
                {
                    name: 'TypeError',
                    message: `The payload claim "${c}" must be an integer.`
                }
            );

            NodeAssert.throws(
                () => builder[m]('not-a-number' as any),
                {
                    name: 'TypeError',
                    message: `The payload claim "${c}" must be an integer.`
                }
            );

            NodeAssert.doesNotThrow(
                () => builder.setPayloadClaim(c, 'not-a-number', { skipValidation: true })
            );

            NodeAssert.doesNotThrow(
                () => builder.setPayloadClaim(c, Math.floor(Date.now() / 1000))
            );
        });
    }

    NodeTest.it('expiresIn method should use delta time', (ctx) => {

        ctx.mock.timers.enable({ apis: ['Date', 'setTimeout'] });

        const NOW = Date.now();

        const builder = new JwtBuilder({
            signer: new TestSigner(),
            header: {
                customHeader: 'customValue'
            }
        });

        const jwtString = builder.setKeyId('123')
            .expiresIn(3600)
            .setPayloadClaim('a', 'hello')
            .setPayloadClaim('b', 123)
            .build();

        const info = parse(jwtString);

        NodeAssert.deepStrictEqual(info.payload, {
            a: 'hello',
            b: 123,
            exp: Math.floor(NOW / 1000) + 3600,
        });
    });
});
