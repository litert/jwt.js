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
import * as NodeTimers from 'node:timers/promises';
import type * as dL from '../Types';
import * as eL from '../Errors';
import * as cL from '../Constants';
import { JwtAsyncVerifier, JwtVerifier } from './Verifier';
import { stringify } from '../CoreApis/Stringify';
import { JwtAudienceValidator } from '../Validators/Audience';

class TestSigner implements dL.IJwaSigner {
    public readonly family = cL.ESigningAlgoFamily.HMAC;
    public readonly jwa = cL.ESigningJwa.HS256;
    public readonly digestType = cL.EDigestType.SHA256;

    public sign(): Buffer {
        return Buffer.from('test');
    }
}

NodeTest.describe('class JwtVerifier/JwtAsyncVerifier', async () => {

    NodeTest.it('[sync] should throw error if empty validator list provided', () => {

        NodeAssert.throws(() => new JwtVerifier({
            validators: [],
        }), {
            name: 'invalid_settings',
            code: eL.EErrorCode.EMPTY_VALIDATOR_LIST,
        });
    });

    NodeTest.it('[sync] should return error with empty name if parsing fails', () => {

        const verifier = new JwtVerifier({
            validators: [
                {
                    name: 'test-validator',
                    validate: () => true,
                },
            ],
        });

        try {

            verifier.verify('invalid.jwt.token');
            NodeAssert.fail('Should throw error.');
        }
        catch (e) {

            NodeAssert.ok(e instanceof eL.E_VERIFY_FAILED);
            NodeAssert.strictEqual(e.context.validator, '');
        }
    });

    NodeTest.it('[sync] invalid value should get an INVALID_FORMAT error', () => {

        const verifier = new JwtVerifier({
            validators: [
                {
                    name: 'test-validator',
                    validate: () => true,
                },
            ],
        });

        try {

            verifier.verify(null as unknown as string);
            NodeAssert.fail('Should throw error.');
        }
        catch (e) {

            NodeAssert.ok(e instanceof eL.E_VERIFY_FAILED);
            NodeAssert.strictEqual(e.code, eL.EErrorCode.INVALID_FORMAT);
            NodeAssert.strictEqual(e.context.validator, '');
        }
    });

    NodeTest.it('[sync] should fail on any validator fails', () => {

        const verifier = new JwtVerifier({
            validators: [
                { name: '123', validate: () => { throw new Error('test123'); } },
            ],
        });

        const token = stringify({
            payload: { a: 1 },
            signer: new TestSigner(),
        });

        try {

            verifier.verify(token);
            NodeAssert.fail('Should throw error.');
        }
        catch (e) {
            NodeAssert.ok(e instanceof eL.E_VERIFY_FAILED);
            NodeAssert.strictEqual(e.context.validator, '123');
            NodeAssert.strictEqual((e.origin as Error).message, 'test123');
            NodeAssert.deepStrictEqual(e.context.header, { alg: 'HS256', typ: 'JWT' });
            NodeAssert.deepStrictEqual(e.context.payload, { a: 1 });
            NodeAssert.strictEqual(e.context.signedContent, token.split('.').slice(0, 2).join('.'));
            NodeAssert.strictEqual(e.context.signature.toString(), 'test');
        }
    });

    NodeTest.it('[sync] should throw the original errors from built-in validators', () => {

        const verifier = new JwtVerifier({
            validators: [
                new JwtAudienceValidator({
                    allowlist: ['123'],
                })
            ],
        });

        const token = stringify({
            payload: { a: 1 },
            signer: new TestSigner(),
        });

        try {

            verifier.verify(token);
            NodeAssert.fail('Should throw error.');
        }
        catch (e) {
            NodeAssert.ok(e instanceof eL.E_VERIFY_FAILED);
            NodeAssert.strictEqual(e.code, eL.EErrorCode.INVALID_PAYLOAD_CLAIM);
            NodeAssert.strictEqual(e.context.validator, 'JwtAudienceValidator');
            NodeAssert.deepStrictEqual(e.context.header, { alg: 'HS256', typ: 'JWT' });
            NodeAssert.deepStrictEqual(e.context.payload, { a: 1 });
            NodeAssert.strictEqual(e.context.signedContent, token.split('.').slice(0, 2).join('.'));
            NodeAssert.strictEqual(e.context.signature.toString(), 'test');
        }
    });

    NodeTest.it('[sync] should pass if all validators succeed', () => {

        const verifier = new JwtVerifier({
            validators: [
                { name: '123', validate: () => { return; } },
                { name: '321', validate: () => { return; } },
            ],
        });

        const token = stringify({
            payload: { a: 1 },
            signer: new TestSigner(),
        });

        const result = verifier.verify(token);

        NodeAssert.deepStrictEqual(result.header, { alg: 'HS256', typ: 'JWT' });
        NodeAssert.deepStrictEqual(result.payload, { a: 1 });
        NodeAssert.strictEqual(result.signedContent, token.split('.').slice(0, 2).join('.'));
        NodeAssert.strictEqual(result.signature.toString(), 'test');
    });

    NodeTest.it('[async] should throw error if empty validator list provided', () => {

        NodeAssert.throws(() => new JwtAsyncVerifier({
            validators: [],
        }), {
            name: 'invalid_settings',
            code: eL.EErrorCode.EMPTY_VALIDATOR_LIST,
        });
    });

    await NodeTest.it('[async] should return error with empty name if parsing fails', async () => {

        const verifier = new JwtAsyncVerifier({
            validators: [
                {
                    name: 'test-validator',
                    validate: () => true,
                },
            ],
        });

        try {
            await verifier.verify('invalid.jwt.token');
            NodeAssert.fail('Should throw error.');
        }
        catch (e) {
            NodeAssert.ok(e instanceof eL.E_VERIFY_FAILED);
            NodeAssert.strictEqual(e.context.validator, '');
        }
    });

    await NodeTest.it('[async] invalid value should get an INVALID_FORMAT error', async () => {

        const verifier = new JwtAsyncVerifier({
            validators: [
                {
                    name: 'test-validator',
                    validate: () => true,
                },
            ],
        });

        try {

            await verifier.verify(null as unknown as string);
            NodeAssert.fail('Should throw error.');
        }
        catch (e) {

            NodeAssert.ok(e instanceof eL.E_VERIFY_FAILED);
            NodeAssert.strictEqual(e.code, eL.EErrorCode.INVALID_FORMAT);
            NodeAssert.strictEqual(e.context.validator, '');
        }
    });

    await NodeTest.it('[async] should fail on any validator fails', async () => {

        const verifier = new JwtAsyncVerifier({
            validators: [
                { name: '123', validate: () => { throw new Error('test123'); } },
            ],
        });

        const token = stringify({
            payload: { a: 1 },
            signer: new TestSigner(),
        });

        try {

            await verifier.verify(token);
            NodeAssert.fail('Should throw error.');
        }
        catch (e) {
            NodeAssert.ok(e instanceof eL.E_VERIFY_FAILED);
            NodeAssert.strictEqual(e.context.validator, '123');
            NodeAssert.strictEqual((e.origin as Error).message, 'test123');
            NodeAssert.deepStrictEqual(e.context.header, { alg: 'HS256', typ: 'JWT' });
            NodeAssert.deepStrictEqual(e.context.payload, { a: 1 });
            NodeAssert.strictEqual(e.context.signedContent, token.split('.').slice(0, 2).join('.'));
            NodeAssert.strictEqual(e.context.signature.toString(), 'test');
        }
    });

    await NodeTest.it('[async] should throw the original errors from built-in validators', async () => {

        const verifier = new JwtAsyncVerifier({
            validators: [
                new JwtAudienceValidator({
                    allowlist: ['123'],
                })
            ],
        });

        const token = stringify({
            payload: { a: 1 },
            signer: new TestSigner(),
        });

        try {

            await verifier.verify(token);
            NodeAssert.fail('Should throw error.');
        }
        catch (e) {
            NodeAssert.ok(e instanceof eL.E_VERIFY_FAILED);
            NodeAssert.strictEqual(e.code, eL.EErrorCode.INVALID_PAYLOAD_CLAIM);
            NodeAssert.strictEqual(e.context.validator, 'JwtAudienceValidator');
            NodeAssert.deepStrictEqual(e.context.header, { alg: 'HS256', typ: 'JWT' });
            NodeAssert.deepStrictEqual(e.context.payload, { a: 1 });
            NodeAssert.strictEqual(e.context.signedContent, token.split('.').slice(0, 2).join('.'));
            NodeAssert.strictEqual(e.context.signature.toString(), 'test');
        }
    });

    await NodeTest.it('[async] should supports both async and sync validators', async () => {

        const verifier = new JwtAsyncVerifier({
            validators: [
                { name: '123', validate: () => { return; } },
                { name: '456', validate: async () => { await NodeTimers.setTimeout(10); } },
            ],
        });

        const token = stringify({
            payload: { a: 1 },
            signer: new TestSigner(),
        });

        const result = await verifier.verify(token);

        NodeAssert.deepStrictEqual(result.header, { alg: 'HS256', typ: 'JWT' });
        NodeAssert.deepStrictEqual(result.payload, { a: 1 });
        NodeAssert.strictEqual(result.signedContent, token.split('.').slice(0, 2).join('.'));
        NodeAssert.strictEqual(result.signature.toString(), 'test');
    });

    await NodeTest.it('[async] should pass if all validators succeed', async () => {

        const verifier = new JwtAsyncVerifier({
            validators: [
                { name: '123', validate: () => { return; } },
                { name: '321', validate: () => { return; } },
            ],
        });

        const token = stringify({
            payload: { a: 1 },
            signer: new TestSigner(),
        });

        const result = await verifier.verify(token);

        NodeAssert.deepStrictEqual(result.header, { alg: 'HS256', typ: 'JWT' });
        NodeAssert.deepStrictEqual(result.payload, { a: 1 });
        NodeAssert.strictEqual(result.signedContent, token.split('.').slice(0, 2).join('.'));
        NodeAssert.strictEqual(result.signature.toString(), 'test');
    });

    NodeTest.it('[common] should throw error if duplicate validator names are provided', () => {

        NodeAssert.throws(() => {
            new JwtVerifier({
                validators: [
                    { name: '123', validate: () => { return; } },
                    { name: '123', validate: () => { return; } },
                ],
            });
        }, {
            name: 'invalid_settings',
            code: eL.EErrorCode.DUP_VALIDATOR_NAME,
        });
    });
});
