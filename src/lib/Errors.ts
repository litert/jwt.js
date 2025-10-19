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

export const E_INVALID_JWT = class extends JwtError {

    public static override readonly errorName = 'invalid_jwt';

    public static override readonly errorMessage = 'The JWT is invalid, cannot be decoded.';
};

export const E_INVALID_KEY = class extends JwtError {

    public static override readonly errorName = 'invalid_key';

    public static override readonly errorMessage = 'The provided key is invalid for the operation.';
};

export const E_INVALID_DIGEST = class extends JwtError {

    public static override readonly errorName = 'invalid_digest';

    public static override readonly errorMessage = 'The provided digest is invalid.';
};

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
     * The "alg" header claim indicates an unsupported algorithm.
     */
    INVALID_ALG_HEADER = 'invalid_alg_header',

    /**
     * The specified digest type is not supported.
     */
    UNKNOWN_DIGEST_TYPE = 'unknown_digest_type',

    /**
     * The provided key is invalid about format, can not be used here.
     */
    INVALID_KEY_FORMAT = 'invalid_key_format',

    /**
     * The provided key is invalid about type, can not be used here.
     */
    INVALID_KEY_TYPE = 'invalid_key_type',

    /**
     * The provided key is invalid about algorithm, can not be used here.
     */
    INVALID_KEY_ALGO = 'invalid_key_algo',

    /**
     * The size of the provided key is insufficient for secure operation.
     */
    INVALID_KEY_SIZE = 'invalid_key_size',

    /**
     * An incorrect-usage key is provided, e.g., a public key is provided for signing.
     */
    INVALID_KEY_USAGE = 'invalid_key_usage',

    /**
     * The provided key is incompatible with for a JWA.
     */
    INVALID_JWA_KEY = 'invalid_jwa_key',
}
