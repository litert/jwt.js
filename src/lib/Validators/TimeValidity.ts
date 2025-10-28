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

interface IClaimOptions {

    /**
     * What to do when the claim is missing.
     *
     * @default 'reject' for cL.EStdPayloadClaim.EXPIRATION_TIME claim, 'skip' for cL.EStdPayloadClaim.NOT_BEFORE claim
     */
    onMissing?: 'reject' | 'skip';

    /**
     * Whether to check the value of this claim.
     *
     * @default true
     */
    check?: boolean;
}

/**
 * The options for the time validity validator.
 */
export interface ITimeValidityValidationOptions {

    /**
     * A custom name for this validator.
     *
     * @default 'JwtTimeValidityValidator'
     */
    customName?: string;

    /**
     * The strategy to use for the claims supported by this validator.
     *
     * The "nbf" claim is not checked by default.
     */
    claims?: Partial<Record<cL.EStdPayloadClaim.EXPIRATION_TIME | cL.EStdPayloadClaim.NOT_BEFORE, IClaimOptions>>;
}

const CLAIMS = [cL.EStdPayloadClaim.EXPIRATION_TIME, cL.EStdPayloadClaim.NOT_BEFORE] as const;

/**
 * The JWT time validity validator.
 *
 * @example
 * ```ts
 * import * as LibJWT from '@litert/jwt';
 * const info = LibJWT.parse(token);
 * if (!new LibJWT.JwtTimeValidityValidator().validate(info)) {
 *    throw new Error('Out of the token time validity period.');
 * }
 * ```
 */
export class JwtTimeValidityValidator implements dL.IJwtValidator {

    public readonly name: string;

    private readonly _claims: Record<
        cL.EStdPayloadClaim.EXPIRATION_TIME | cL.EStdPayloadClaim.NOT_BEFORE,
        Required<IClaimOptions>
    >;

    public constructor(opts?: ITimeValidityValidationOptions) {

        this._claims = {
            [cL.EStdPayloadClaim.EXPIRATION_TIME]: {
                'onMissing': opts?.claims?.exp?.onMissing ?? 'reject',
                'check': opts?.claims?.exp?.check ?? true,
            },
            [cL.EStdPayloadClaim.NOT_BEFORE]: {
                'onMissing': opts?.claims?.nbf?.onMissing ?? 'skip',
                'check': opts?.claims?.nbf?.check ?? true,
            },
        };

        this.name = opts?.customName ?? JwtTimeValidityValidator.name;
    }

    /**
     * Validates the time validity of a JWT token.
     *
     * @param info The JWT token information returned by `parse()` function.
     *
     * @throws {E_VERIFY_FAILED} If the JWT is not valid in terms of time validity.
     */
    public validate(info: dL.IJwtParseResult): void {

        try {

            for (const k of CLAIMS) {

                if (!this._claims[k].check) {

                    continue;
                }

                const v = info.payload[k];

                if (v === undefined || v === null) {

                    switch (this._claims[k].onMissing) {

                        case 'reject':

                            throw new eL.E_VERIFY_FAILED(eL.EErrorCode.MISSING_PAYLOAD_CLAIM, { 'claim': k });

                        case 'skip':

                            continue;
                    }
                }

                if (!Number.isSafeInteger(v)) {

                    throw new eL.E_VERIFY_FAILED(eL.EErrorCode.INVALID_PAYLOAD_CLAIM, { 'claim': k });
                }

                switch (k) {
                    case cL.EStdPayloadClaim.EXPIRATION_TIME:

                        if (Date.now() >= v * 1000) {

                            throw new eL.E_VERIFY_FAILED(eL.EErrorCode.EXPIRED);
                        }

                        break;

                    case cL.EStdPayloadClaim.NOT_BEFORE:

                        if (Date.now() < v * 1000) {

                            throw new eL.E_VERIFY_FAILED(eL.EErrorCode.NOT_VALID_YET);
                        }

                        break;
                }
            }
        }
        catch (e) {

            if (e instanceof eL.E_VERIFY_FAILED) {

                throw e;
            }

            throw new eL.E_VERIFY_FAILED(eL.EErrorCode.UNKNOWN_ERROR);
        }
    }
}
