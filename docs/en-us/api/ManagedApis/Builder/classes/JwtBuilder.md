[Documents for @litert/jwt](../../../index.md) / [ManagedApis/Builder](../index.md) / JwtBuilder

# Class: JwtBuilder

Defined in: [src/lib/ManagedApis/Builder.ts:103](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L103)

The builder class to help building JWT tokens step by step.

## Constructors

### Constructor

> **new JwtBuilder**(`opts`): `JwtBuilder`

Defined in: [src/lib/ManagedApis/Builder.ts:111](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L111)

#### Parameters

##### opts

[`IJwtBuilderOptions`](../interfaces/IJwtBuilderOptions.md)

#### Returns

`JwtBuilder`

## Methods

### build()

> **build**(): `string`

Defined in: [src/lib/ManagedApis/Builder.ts:513](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L513)

Sign and build the JWT string.

#### Returns

`string`

The signed JWT string.

***

### expiresIn()

> **expiresIn**(`deltaSeconds`): `this`

Defined in: [src/lib/ManagedApis/Builder.ts:410](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L410)

Set the expiration time to a duration from now, in seconds.

#### Parameters

##### deltaSeconds

`number`

The duration in seconds from now when the token should expire.

#### Returns

`this`

The builder itself for chaining.

#### Link

https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4

***

### setAudience()

> **setAudience**(`aud`): `this`

Defined in: [src/lib/ManagedApis/Builder.ts:503](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L503)

Set the audience (`aud`) payload claim.

#### Parameters

##### aud

The audience (string or string array).

`string` | `string`[]

#### Returns

`this`

The builder itself for chaining.

#### Link

https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.3

***

### setContentType()

> **setContentType**(`cty`): `this`

Defined in: [src/lib/ManagedApis/Builder.ts:295](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L295)

Set the Content Type (`cty`) header claim.

#### Parameters

##### cty

`string`

The Content Type.

#### Returns

`this`

The builder itself for chaining.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.10

***

### setExpiration()

> **setExpiration**(`exp`): `this`

Defined in: [src/lib/ManagedApis/Builder.ts:393](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L393)

Set the expiration time (`exp`) payload claim.

#### Parameters

##### exp

The expiration time (unix timestamp in seconds or Date object).

`number` | `Date`

#### Returns

`this`

The builder itself for chaining.

#### Link

https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4

***

### setHeaderClaim()

> **setHeaderClaim**(`name`, `value`, `opts?`): `this`

Defined in: [src/lib/ManagedApis/Builder.ts:137](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L137)

Set the value of a header claim, overriding any existing value.

The claims defined in the JWT specification have specific types, so
they will be type-checked before setting. You can skip the type validation
by setting `skipValidation` option to `true`.

> For `alg` and `typ` claims, they will be ignored, and automatically
> set according to the signer used.
> And `crit` claim cannot be set directly, use `critical` parameter to
> mark a claim as critical.

#### Parameters

##### name

`string`

The name of the header claim.

##### value

`IJsonSafeValue`

The value of the header claim.

##### opts?

[`ISetHeaderClaimOptions`](../interfaces/ISetHeaderClaimOptions.md)

The options for setting the header claim.

#### Returns

`this`

The builder itself for chaining.

***

### setIssuedAt()

> **setIssuedAt**(`iat`): `this`

Defined in: [src/lib/ManagedApis/Builder.ts:444](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L444)

Set the issued at (`iat`) payload claim.

#### Parameters

##### iat

The issued at time (unix timestamp in seconds or Date object).

`number` | `Date`

#### Returns

`this`

The builder itself for chaining.

#### Link

https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.1

***

### setIssuer()

> **setIssuer**(`iss`): `this`

Defined in: [src/lib/ManagedApis/Builder.ts:475](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L475)

Set the issuer (`iss`) payload claim.

#### Parameters

##### iss

`string`

The issuer.

#### Returns

`this`

The builder itself for chaining.

#### Link

https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.1

***

### setJwk()

> **setJwk**(`jwk`): `this`

Defined in: [src/lib/ManagedApis/Builder.ts:379](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L379)

Set the JWK (`jwk`) header claim.

#### Parameters

##### jwk

`IJsonSafeValue`

The JWK.

#### Returns

`this`

The builder itself for chaining.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.3

***

### setJwkUrl()

> **setJwkUrl**(`url`): `this`

Defined in: [src/lib/ManagedApis/Builder.ts:365](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L365)

Set the JWK URL (`jku`) header claim.

#### Parameters

##### url

`string`

The JWK URL.

#### Returns

`this`

The builder itself for chaining.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.2

***

### setJwtId()

> **setJwtId**(`jti`): `this`

Defined in: [src/lib/ManagedApis/Builder.ts:461](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L461)

Set the JWT ID (`jti`) payload claim.

#### Parameters

##### jti

`string`

The JWT ID.

#### Returns

`this`

The builder itself for chaining.

#### Link

https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.7

***

### setKeyId()

> **setKeyId**(`kid`): `this`

Defined in: [src/lib/ManagedApis/Builder.ts:281](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L281)

Set the Key ID (`kid`) header claim.

#### Parameters

##### kid

`string`

The Key ID.

#### Returns

`this`

The builder itself for chaining.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.4

***

### setNotBefore()

> **setNotBefore**(`nbf`): `this`

Defined in: [src/lib/ManagedApis/Builder.ts:427](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L427)

Set the not before (`nbf`) payload claim.

#### Parameters

##### nbf

The not before time (unix timestamp in seconds or Date object).

`number` | `Date`

#### Returns

`this`

The builder itself for chaining.

#### Link

https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.5

***

### setPayloadClaim()

> **setPayloadClaim**(`name`, `value`, `opts?`): `this`

Defined in: [src/lib/ManagedApis/Builder.ts:225](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L225)

Set the value of a payload claim, overriding any existing value.

The claims defined in the JWT specification have specific types, so
they will be type-checked before setting by default. You can skip
the type validation by setting `skipValidation` option to `true`.

#### Parameters

##### name

`string`

The name of the payload claim.

##### value

`IJsonSafeValue`

The value of the payload claim.

##### opts?

[`ISetPayloadClaimOptions`](../interfaces/ISetPayloadClaimOptions.md)

The options for setting the payload claim.

#### Returns

`this`

The builder itself for chaining.

***

### setSubject()

> **setSubject**(`sub`): `this`

Defined in: [src/lib/ManagedApis/Builder.ts:489](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L489)

Set the subject (`sub`) payload claim.

#### Parameters

##### sub

`string`

The subject.

#### Returns

`this`

The builder itself for chaining.

#### Link

https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.2

***

### setX509CertChain()

> **setX509CertChain**(`chain`): `this`

Defined in: [src/lib/ManagedApis/Builder.ts:309](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L309)

Set the X.509 Certificate Chain (`x5c`) header claim.

#### Parameters

##### chain

`string`[]

The X.509 Certificate Chain.

#### Returns

`this`

The builder itself for chaining.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.6

***

### setX509CertThumbprintSha1()

> **setX509CertThumbprintSha1**(`th`): `this`

Defined in: [src/lib/ManagedApis/Builder.ts:323](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L323)

Set the X.509 Certificate (SHA-1) Thumbprint (`x5t`) header claim.

#### Parameters

##### th

`string`

The X.509 Certificate Thumbprint.

#### Returns

`this`

The builder itself for chaining.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.7

***

### setX509CertThumbprintSha256()

> **setX509CertThumbprintSha256**(`th`): `this`

Defined in: [src/lib/ManagedApis/Builder.ts:337](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L337)

Set the X.509 Certificate SHA-256 Thumbprint (`x5t#S256`) header claim.

#### Parameters

##### th

`string`

The X.509 Certificate SHA-256 Thumbprint.

#### Returns

`this`

The builder itself for chaining.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.8

***

### setX509CertUrl()

> **setX509CertUrl**(`url`): `this`

Defined in: [src/lib/ManagedApis/Builder.ts:351](https://github.com/litert/jwt.js/blob/master/src/lib/ManagedApis/Builder.ts#L351)

Set the X.509 Certificate URL (`x5u`) header claim.

#### Parameters

##### url

`string`

The X.509 Certificate URL.

#### Returns

`this`

The builder itself for chaining.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.5
