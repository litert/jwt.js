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

import type * as dL from '../Types';
import * as eL from '../Errors';
import type * as uT from '@litert/utils-ts-types';
import { parse } from '../CoreApis/Parse';

/**
 * The options for JWT verifier.
 */
export interface IJwtVerifierOptions<T extends dL.IJwtValidator | dL.IJwtAsyncValidator> {

    /**
     * The list of validators to be used during verification.
     *
     * Each validator will be executed in the order they are provided,
     * once a validator fails, the verification process will stop.
     *
     * When the verification fails, the `error.context.validator` will be
     * set to the name of the validator that failed.
     *
     * If empty, an exception will be thrown during the construction of
     * the verifier.
     */
    'validators': T[];
}

abstract class AbstractJwtVerifier<T extends dL.IJwtValidator | dL.IJwtAsyncValidator> {

    protected readonly _validators: T[];

    public constructor(opts: IJwtVerifierOptions<T>) {

        if (!opts.validators.length) {

            throw new eL.E_INVALID_SETTINGS(eL.EErrorCode.EMPTY_VALIDATOR_LIST);
        }

        this._checkDupValidator(opts);

        this._validators = [...opts.validators];
    }

    private _checkDupValidator(opts: IJwtVerifierOptions<T>): void {

        const foundName: uT.IDict<boolean> = {};

        for (const v of opts.validators) {

            if (foundName[v.name]) {

                throw new eL.E_INVALID_SETTINGS(eL.EErrorCode.DUP_VALIDATOR_NAME, {
                    'name': v.name,
                });
            }

            foundName[v.name] = true;
        }
    }
}

/**
 * The verifier class to help verifying JWT token step by step, and returning
 * the information and verification result of the JWT token.
 */
export class JwtVerifier extends AbstractJwtVerifier<dL.IJwtValidator> {

    /**
     * Parse and validate the given JWT token, with the configured list of
     * validators, one by one, in order.
     *
     * If fails, an exception will be thrown, indicating which validator
     * failed in the context.
     *
     * If it fails during parsing, the `error.context.validator` will be
     * an empty string, but the `error.origin` will be set to the original error.
     *
     * @param jwt   The JWT token to be verified.
     *
     * @returns Result of the verification.
     *
     * @example
     * ```ts
     * import { JwtVerifier, HmacJwaVerifier, JwtIssuerValidator } from '@litert/jwt';
     *
     * const verifier = new JwtVerifier({
     *     validators: [
     *         new HmacJwaVerifier({ key: 'test', digestType: EDigestType.SHA256 }),
     *         new JwtIssuerValidator({ allowlist: ['test'] }),
     *     ],
     * });
     *
     * const result = verifier.verify(token);
     * ```
     */
    public verify(jwt: string): dL.IJwtParseResult {

        let ret: dL.IJwtParseResult;

        try {

            ret = parse(jwt);
        }
        catch (e) {

            if (e instanceof eL.JwtError) {

                e.context.validator = '';
                throw e;
            }

            throw new eL.E_VERIFY_FAILED(eL.EErrorCode.INVALID_FORMAT, {
                'validator': '',
            }, e);
        }

        for (const validator of this._validators) {

            try {

                validator.validate(ret);
            }
            catch (e) {

                if (e instanceof eL.JwtError) {

                    e.context.validator = validator.name;
                    e.context.header = ret.header;
                    e.context.payload = ret.payload;
                    e.context.signedContent = ret.signedContent;
                    e.context.signature = ret.signature;
                    throw e;
                }

                throw new eL.E_VERIFY_FAILED(eL.EErrorCode.UNKNOWN_ERROR, {
                    'validator': validator.name,
                    'header': ret.header,
                    'payload': ret.payload,
                    'signedContent': ret.signedContent,
                    'signature': ret.signature,
                }, e);
            }
        }

        return ret;
    }
}

/**
 * The asynchronous verifier class to help verifying JWT token step by step,
 * and returning the information and verification result of the JWT token.
 */
export class JwtAsyncVerifier extends AbstractJwtVerifier<dL.IJwtValidator | dL.IJwtAsyncValidator> {

    /**
     * Parse and validate the given JWT token, with the configured list of
     * validators, one by one, in order.
     *
     * If fails, an exception will be thrown, indicating which validator
     * failed in the context.
     *
     * If it fails during parsing, the `error.context.validator` will be
     * an empty string, but the `error.origin` will be set to the original error.
     *
     * @param jwt   The JWT token to be verified.
     *
     * @returns Result of the verification.
     *
     * @example
     * ```ts
     * import { JwtAsyncVerifier, HmacJwaVerifier, JwtIssuerValidator } from '@litert/jwt';
     *
     * const verifier = new JwtAsyncVerifier({
     *     validators: [
     *         new HmacJwaVerifier({ key: 'test', digestType: EDigestType.SHA256 }),
     *         new JwtIssuerValidator({ allowlist: ['test'] }),
     *     ],
     * });
     *
     * const result = await verifier.verify(token);
     * ```
     */
    public async verify(jwt: string): Promise<dL.IJwtParseResult> {

        let ret: dL.IJwtParseResult;

        try {

            ret = parse(jwt);
        }
        catch (e) {

            if (e instanceof eL.JwtError) {

                e.context.validator = '';
                throw e;
            }

            throw new eL.E_VERIFY_FAILED(eL.EErrorCode.INVALID_FORMAT, {
                'validator': '',
            }, e);
        }

        for (const validator of this._validators) {

            try {

                const result = validator.validate(ret);

                if (result instanceof Promise) {

                    await result;
                }
            }
            catch (e) {

                if (e instanceof eL.JwtError) {

                    e.context.validator = validator.name;
                    e.context.header = ret.header;
                    e.context.payload = ret.payload;
                    e.context.signedContent = ret.signedContent;
                    e.context.signature = ret.signature;
                    throw e;
                }

                throw new eL.E_VERIFY_FAILED(eL.EErrorCode.UNKNOWN_ERROR, {
                    'validator': validator.name,
                    'header': ret.header,
                    'payload': ret.payload,
                    'signedContent': ret.signedContent,
                    'signature': ret.signature,
                }, e);
            }
        }

        return ret;
    }
}
