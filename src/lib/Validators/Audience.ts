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
 * The options for `JwtAudienceValidator`.
 */
export interface IAudienceValidationOptions {

    /**
     * The allowlist of audiences, the elements can be:
     *
     * - A string: the `aud` claim must be exactly the same as this string.
     * - A RegExp: the `aud` claim must match this regular expression.
     * - A function: the function will be called with the `aud` claim as the only
     *   argument, and should return true if the audience is allowed, or false otherwise.
     */
    'allowlist': Array<string | RegExp | ((v: string) => boolean)>;

    /**
     * Whether the `aud` claim is required.
     *
     * @default true
     */
    'claimRequired'?: boolean;

    /**
     * A custom name for this validator.
     *
     * @default 'JwtAudienceValidator'
     */
    'customName'?: string;
}

/**
 * The validator to check if the `aud` claim is allowed.
 *
 * @example
 * ```ts
 * import * as LibJwt from '@litert/jwt';
 * const info = LibJwt.parse(token);
 *
 * const validator = new LibJwt.JwtAudienceValidator({
 *     allowlist: [
 *         'trusted-audience',
 *         /^https:\/\/trusted\.domain\/.+$/,
 *         (aud: string) => aud.endsWith('@trusted.com'),
 *     ],
 * });
 *
 * validator.validate(info);
 * ```
 */
export class JwtAudienceValidator implements dL.IJwtValidator {

    public readonly name: string;

    private readonly _claimRequired: boolean;

    private readonly _stringAllowlist: IDict<boolean> = {};

    private readonly _allowlist: Array<RegExp | ((v: string) => boolean)> = [];

    public constructor(opts: IAudienceValidationOptions) {

        for (const allowed of opts.allowlist) {

            if (typeof allowed === 'string') {

                this._stringAllowlist[allowed] = true;
            }
            else {

                this._allowlist.push(allowed);
            }
        }

        this.name = opts?.customName ?? JwtAudienceValidator.name;
        this._claimRequired = opts.claimRequired ?? true;
    }

    public validate(parsed: dL.IJwtParseResult): void {

        let jwtAudList = parsed.payload[cL.EStdPayloadClaim.AUDIENCE];

        if (!this._claimRequired && (jwtAudList === undefined || jwtAudList === null)) {

            return;
        }

        if (typeof jwtAudList === 'string') {

            jwtAudList = [jwtAudList];
        }
        else if (!Array.isArray(jwtAudList) || jwtAudList.some(i => typeof i !== 'string')) {

            throw new eL.E_VERIFY_FAILED(
                eL.EErrorCode.INVALID_PAYLOAD_CLAIM,
                {
                    claim: cL.EStdPayloadClaim.AUDIENCE,
                    value: jwtAudList,
                },
            );
        }

        for (const jwtAud of jwtAudList) {

            if (this._stringAllowlist[jwtAud]) {

                return;
            }

            for (const allowItem of this._allowlist) {

                if (allowItem instanceof RegExp) {

                    if (allowItem.test(jwtAud)) {

                        return;
                    }
                }
                else if (allowItem(jwtAud)) {

                    return;
                }
            }
        }

        throw new eL.E_VERIFY_FAILED(
            eL.EErrorCode.INVALID_PAYLOAD_CLAIM,
            {
                claim: cL.EStdPayloadClaim.AUDIENCE,
                value: jwtAudList,
            },
        );
    }
}
