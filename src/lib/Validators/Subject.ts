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
import * as cL from '../Constants';
import type { IDict } from '@litert/utils-ts-types';

/**
 * The options for `JwtSubjectValidator`.
 */
export interface ISubjectValidationOptions {

    /**
     * The allowlist of subjects, the elements can be:
     *
     * - A string: the `sub` claim must be exactly the same as this string.
     * - A RegExp: the `sub` claim must match this regular expression.
     * - A function: the function will be called with the `sub` claim as the only
     *   argument, and should return true if the subject is allowed, or false otherwise.
     */
    'allowlist': Array<string | RegExp | ((v: string) => boolean)>;

    /**
     * Whether the `sub` claim is required.
     *
     * @default true
     */
    'claimRequired'?: boolean;

    /**
     * A custom name for this validator.
     *
     * @default 'JwtSubjectValidator'
     */
    'customName'?: string;
}

/**
 * The validator to check if the `sub` claim is allowed.
 *
 * @example
 * ```ts
 * import * as LibJwt from '@litert/jwt';
 * const info = LibJwt.parse(token);
 *
 * const validator = new LibJwt.JwtSubjectValidator({
 *     allowlist: [
 *         'trusted-subject',
 *         /^https:\/\/trusted\.domain\/.+$/,
 *         (sub: string) => sub.endsWith('@trusted.com'),
 *     ],
 * });
 *
 * validator.validate(info);
 * ```
 */
export class JwtSubjectValidator implements dL.IJwtValidator {

    public readonly name: string;

    private readonly _claimRequired: boolean;

    private readonly _stringAllowlist: IDict<boolean> = {};

    private readonly _allowlist: Array<RegExp | ((iss: string) => boolean)> = [];

    public constructor(opts: ISubjectValidationOptions) {

        for (const allowed of opts.allowlist) {

            if (typeof allowed === 'string') {

                this._stringAllowlist[allowed] = true;
            }
            else {

                this._allowlist.push(allowed);
            }
        }

        this.name = opts?.customName ?? JwtSubjectValidator.name;
        this._claimRequired = opts.claimRequired ?? true;
    }

    public validate(parsed: dL.IJwtParseResult): void {

        const jwtSubject = parsed.payload[cL.EStdPayloadClaim.SUBJECT];

        if (!this._claimRequired && (jwtSubject === undefined || jwtSubject === null)) {

            return;
        }

        if (typeof jwtSubject !== 'string') {

            throw new eL.E_VERIFY_FAILED(
                eL.EErrorCode.INVALID_PAYLOAD_CLAIM,
                {
                    claim: cL.EStdPayloadClaim.SUBJECT,
                    value: jwtSubject,
                },
            );
        }

        if (this._stringAllowlist[jwtSubject]) {

            return;
        }

        for (const allowItem of this._allowlist) {

            if (allowItem instanceof RegExp) {

                if (allowItem.test(jwtSubject)) {

                    return;
                }
            }
            else if (allowItem(jwtSubject)) {

                return;
            }
        }

        throw new eL.E_VERIFY_FAILED(
            eL.EErrorCode.INVALID_PAYLOAD_CLAIM,
            {
                claim: cL.EStdPayloadClaim.SUBJECT,
                value: jwtSubject,
            },
        );
    }
}
