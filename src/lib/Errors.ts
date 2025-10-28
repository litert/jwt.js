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

import type { IDict } from '@litert/utils-ts-types';

/**
 * The class representing errors in JWT module.
 */
export abstract class JwtError extends Error {

    /**
     * Context of the exception.
     *
     * > Note:
     * > It's not recommended to use bigint and code types as values/keys in the context,
     * > which is not supported by JSON serialization.
     */
    public readonly context: IDict;

    /**
     * The origin of the exception.
     */
    public readonly origin: unknown;

    /**
     * The reason code of the exception.
     */
    public readonly code: EErrorCode;

    /**
     * The error name.
     */
    public static errorName: string = 'unknown';

    /**
     * The description of the error.
     */
    public static errorMessage: string = 'unknown';

    public constructor(
        code: EErrorCode,
        context: IDict = {},
        origin: unknown = null,
    ) {

        super();

        this.code = code;
        this.context = context;
        this.origin = origin;
        this.name = (this.constructor as typeof JwtError).errorName;
        this.message = (this.constructor as typeof JwtError).errorMessage;
    }
}

/* eslint-disable @typescript-eslint/naming-convention */

/**
 * The error indicating that the verification process failed, including
 * parsing, signature verification and claims validation.
 */
export class E_VERIFY_FAILED extends JwtError {

    public static override readonly errorName = 'verify_failed';

    public static override readonly errorMessage = 'The verification process failed.';
}

/**
 * The error indicating that the settings provided for this library are invalid.
 */
export class E_INVALID_SETTINGS extends JwtError {

    public static override readonly errorName = 'invalid_settings';

    public static override readonly errorMessage = 'The provided settings are invalid.';
}

/**
 * The error indicating that the signing process failed.
 */
export class E_SIGN_FAILED extends JwtError {

    public static override readonly errorName = 'sign_failed';

    public static override readonly errorMessage = 'The signing process failed.';
}

/* eslint-enable @typescript-eslint/naming-convention */

/**
 * The error codes used in JWT module.
 */
export const enum EErrorCode {

    /**
     * The input is not a valid JWT string.
     */
    INVALID_FORMAT = 'invalid_format',

    /**
     * The "typ" header claim is invalid.
     */
    INVALID_TYP_HEADER = 'invalid_typ_header',

    /**
     * The specified digest type is not supported.
     */
    UNKNOWN_DIGEST_TYPE = 'unknown_digest_type',

    /**
     * The provided key is invalid about format, can not be used here.
     */
    INVALID_KEY_FORMAT = 'invalid_key_format',

    /**
     * The provided key is invalid about algorithm, can not be used here.
     */
    KEY_ALGO_MISMATCHED = 'invalid_key_algo',

    /**
     * The size of the provided key is insufficient for secure operation.
     */
    INVALID_KEY_WEAK = 'invalid_key_weak',

    /**
     * Misused private key as public key or vice versa.
     */
    INVALID_KEY_USAGE = 'invalid_key_usage',

    /**
     * Failed to verify the signature.
     */
    SIGNATURE_VERIFY_FAILED = 'signature_verify_failed',

    /**
     * Unknown error occurred during signing.
     */
    SIGN_FAILED = 'sign_failed',

    /**
     * The signature algorithm does not match the algorithm indicated in the JWT header.
     */
    SIGNATURE_ALG_MISMATCH = 'signature_alg_mismatch',

    /**
     * The token is use before its valid time.
     */
    NOT_VALID_YET = 'not_valid_yet',

    /**
     * The token is already expired.
     */
    EXPIRED = 'expired',

    /**
     * A required claim is missing in the payload.
     */
    MISSING_PAYLOAD_CLAIM = 'missing_payload_claim',

    /**
     * A payload claim has an invalid value.
     */
    INVALID_PAYLOAD_CLAIM = 'invalid_payload_claim',

    /**
     * A validator with duplicated name is added to the verifier.
     */
    DUP_VALIDATOR_NAME = 'dup_validator_name',

    /**
     * Unexpected error occurred inside the library.
     */
    UNKNOWN_ERROR = 'unknown_error',

    /**
     * The validator list provided is empty.
     */
    EMPTY_VALIDATOR_LIST = 'empty_validator_list',

    /**
     * The signing content is invalid (JSON).
     */
    INVALID_JWT_CONTENT = 'invalid_jwt_content',
}
