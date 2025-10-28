[Documents for @litert/jwt](../../index.md) / [Errors](../index.md) / EErrorCode

# Enumeration: EErrorCode

Defined in: [src/lib/Errors.ts:107](https://github.com/litert/jwt.js/blob/master/src/lib/Errors.ts#L107)

The error codes used in JWT module.

## Enumeration Members

### DUP\_VALIDATOR\_NAME

> **DUP\_VALIDATOR\_NAME**: `"dup_validator_name"`

Defined in: [src/lib/Errors.ts:182](https://github.com/litert/jwt.js/blob/master/src/lib/Errors.ts#L182)

A validator with duplicated name is added to the verifier.

***

### EMPTY\_VALIDATOR\_LIST

> **EMPTY\_VALIDATOR\_LIST**: `"empty_validator_list"`

Defined in: [src/lib/Errors.ts:192](https://github.com/litert/jwt.js/blob/master/src/lib/Errors.ts#L192)

The validator list provided is empty.

***

### EXPIRED

> **EXPIRED**: `"expired"`

Defined in: [src/lib/Errors.ts:167](https://github.com/litert/jwt.js/blob/master/src/lib/Errors.ts#L167)

The token is already expired.

***

### INVALID\_FORMAT

> **INVALID\_FORMAT**: `"invalid_format"`

Defined in: [src/lib/Errors.ts:112](https://github.com/litert/jwt.js/blob/master/src/lib/Errors.ts#L112)

The input is not a valid JWT string.

***

### INVALID\_JWT\_CONTENT

> **INVALID\_JWT\_CONTENT**: `"invalid_jwt_content"`

Defined in: [src/lib/Errors.ts:197](https://github.com/litert/jwt.js/blob/master/src/lib/Errors.ts#L197)

The signing content is invalid (JSON).

***

### INVALID\_KEY\_FORMAT

> **INVALID\_KEY\_FORMAT**: `"invalid_key_format"`

Defined in: [src/lib/Errors.ts:127](https://github.com/litert/jwt.js/blob/master/src/lib/Errors.ts#L127)

The provided key is invalid about format, can not be used here.

***

### INVALID\_KEY\_USAGE

> **INVALID\_KEY\_USAGE**: `"invalid_key_usage"`

Defined in: [src/lib/Errors.ts:142](https://github.com/litert/jwt.js/blob/master/src/lib/Errors.ts#L142)

Misused private key as public key or vice versa.

***

### INVALID\_KEY\_WEAK

> **INVALID\_KEY\_WEAK**: `"invalid_key_weak"`

Defined in: [src/lib/Errors.ts:137](https://github.com/litert/jwt.js/blob/master/src/lib/Errors.ts#L137)

The size of the provided key is insufficient for secure operation.

***

### INVALID\_PAYLOAD\_CLAIM

> **INVALID\_PAYLOAD\_CLAIM**: `"invalid_payload_claim"`

Defined in: [src/lib/Errors.ts:177](https://github.com/litert/jwt.js/blob/master/src/lib/Errors.ts#L177)

A payload claim has an invalid value.

***

### INVALID\_TYP\_HEADER

> **INVALID\_TYP\_HEADER**: `"invalid_typ_header"`

Defined in: [src/lib/Errors.ts:117](https://github.com/litert/jwt.js/blob/master/src/lib/Errors.ts#L117)

The "typ" header claim is invalid.

***

### KEY\_ALGO\_MISMATCHED

> **KEY\_ALGO\_MISMATCHED**: `"invalid_key_algo"`

Defined in: [src/lib/Errors.ts:132](https://github.com/litert/jwt.js/blob/master/src/lib/Errors.ts#L132)

The provided key is invalid about algorithm, can not be used here.

***

### MISSING\_PAYLOAD\_CLAIM

> **MISSING\_PAYLOAD\_CLAIM**: `"missing_payload_claim"`

Defined in: [src/lib/Errors.ts:172](https://github.com/litert/jwt.js/blob/master/src/lib/Errors.ts#L172)

A required claim is missing in the payload.

***

### NOT\_VALID\_YET

> **NOT\_VALID\_YET**: `"not_valid_yet"`

Defined in: [src/lib/Errors.ts:162](https://github.com/litert/jwt.js/blob/master/src/lib/Errors.ts#L162)

The token is use before its valid time.

***

### SIGN\_FAILED

> **SIGN\_FAILED**: `"sign_failed"`

Defined in: [src/lib/Errors.ts:152](https://github.com/litert/jwt.js/blob/master/src/lib/Errors.ts#L152)

Unknown error occurred during signing.

***

### SIGNATURE\_ALG\_MISMATCH

> **SIGNATURE\_ALG\_MISMATCH**: `"signature_alg_mismatch"`

Defined in: [src/lib/Errors.ts:157](https://github.com/litert/jwt.js/blob/master/src/lib/Errors.ts#L157)

The signature algorithm does not match the algorithm indicated in the JWT header.

***

### SIGNATURE\_VERIFY\_FAILED

> **SIGNATURE\_VERIFY\_FAILED**: `"signature_verify_failed"`

Defined in: [src/lib/Errors.ts:147](https://github.com/litert/jwt.js/blob/master/src/lib/Errors.ts#L147)

Failed to verify the signature.

***

### UNKNOWN\_DIGEST\_TYPE

> **UNKNOWN\_DIGEST\_TYPE**: `"unknown_digest_type"`

Defined in: [src/lib/Errors.ts:122](https://github.com/litert/jwt.js/blob/master/src/lib/Errors.ts#L122)

The specified digest type is not supported.

***

### UNKNOWN\_ERROR

> **UNKNOWN\_ERROR**: `"unknown_error"`

Defined in: [src/lib/Errors.ts:187](https://github.com/litert/jwt.js/blob/master/src/lib/Errors.ts#L187)

Unexpected error occurred inside the library.
