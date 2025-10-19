[Documents for @litert/jwt](../../index.md) / [Errors](../index.md) / EErrorCode

# Enumeration: EErrorCode

Defined in: src/lib/Errors.ts:93

The error codes used in JWT module.

## Enumeration Members

### INVALID\_ALG\_HEADER

> **INVALID\_ALG\_HEADER**: `"invalid_alg_header"`

Defined in: src/lib/Errors.ts:108

The "alg" header claim indicates an unsupported algorithm.

***

### INVALID\_FORMAT

> **INVALID\_FORMAT**: `"invalid_format"`

Defined in: src/lib/Errors.ts:98

The input is not a valid JWT string.

***

### INVALID\_JWA\_KEY

> **INVALID\_JWA\_KEY**: `"invalid_jwa_key"`

Defined in: src/lib/Errors.ts:143

The provided key is incompatible with for a JWA.

***

### INVALID\_KEY\_ALGO

> **INVALID\_KEY\_ALGO**: `"invalid_key_algo"`

Defined in: src/lib/Errors.ts:128

The provided key is invalid about algorithm, can not be used here.

***

### INVALID\_KEY\_FORMAT

> **INVALID\_KEY\_FORMAT**: `"invalid_key_format"`

Defined in: src/lib/Errors.ts:118

The provided key is invalid about format, can not be used here.

***

### INVALID\_KEY\_SIZE

> **INVALID\_KEY\_SIZE**: `"invalid_key_size"`

Defined in: src/lib/Errors.ts:133

The size of the provided key is insufficient for secure operation.

***

### INVALID\_KEY\_TYPE

> **INVALID\_KEY\_TYPE**: `"invalid_key_type"`

Defined in: src/lib/Errors.ts:123

The provided key is invalid about type, can not be used here.

***

### INVALID\_KEY\_USAGE

> **INVALID\_KEY\_USAGE**: `"invalid_key_usage"`

Defined in: src/lib/Errors.ts:138

An incorrect-usage key is provided, e.g., a public key is provided for signing.

***

### INVALID\_TYP\_HEADER

> **INVALID\_TYP\_HEADER**: `"invalid_typ_header"`

Defined in: src/lib/Errors.ts:103

The "typ" header claim is invalid.

***

### UNKNOWN\_DIGEST\_TYPE

> **UNKNOWN\_DIGEST\_TYPE**: `"unknown_digest_type"`

Defined in: src/lib/Errors.ts:113

The specified digest type is not supported.
