[Documents for @litert/jwt](../../index.md) / [Types](../index.md) / IJwtHeader

# Interface: IJwtHeader

Defined in: [src/lib/Types.ts:23](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L23)

The structure of JWT Header.

## Indexable

\[`key`: `string`\]: `IJsonSafeValue` \| `undefined`

Other claims.

## Properties

### alg

> **alg**: `"RS256"` \| `"RS384"` \| `"RS512"` \| `"PS256"` \| `"PS384"` \| `"PS512"` \| `"HS256"` \| `"HS384"` \| `"HS512"` \| `"ES256"` \| `"ES256K"` \| `"ES384"` \| `"ES512"` \| `"EdDSA"`

Defined in: [src/lib/Types.ts:46](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L46)

The "alg" (algorithm) Header Parameter identifies the cryptographic
algorithm used to secure the JWS.  The JWS Signature value is not
valid if the "alg" value does not represent a supported algorithm or
if there is not a key for use with that algorithm associated with the
party that digitally signed or MACed the content.  "alg" values
should either be registered in the IANA "JSON Web Signature and
Encryption Algorithms" registry established by JWA or be a value
that contains a Collision-Resistant Name.  The "alg" value is a case-
sensitive ASCII string containing a StringOrURI value.  This Header
Parameter MUST be present and MUST be understood and processed by
implementations.

A list of defined "alg" values for this use can be found in the IANA
"JSON Web Signature and Encryption Algorithms" registry established
by JWA; the initial contents of this registry are the values
defined in Section 3.1 of JWA.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.1

#### Required

***

### crit?

> `optional` **crit**: `string`[]

Defined in: [src/lib/Types.ts:215](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L215)

The "crit" (critical) Header Parameter indicates that extensions to
this specification and/or [JWA] are being used that MUST be
understood and processed.  Its value is an array listing the Header
Parameter names present in the JOSE Header that use those extensions.
If any of the listed extension Header Parameters are not understood
and supported by the recipient, then the JWS is invalid.  Producers
MUST NOT include Header Parameter names defined by this specification
or [JWA] for use with JWS, duplicate names, or names that do not
occur as Header Parameter names within the JOSE Header in the "crit"
list.  Producers MUST NOT use the empty list "[]" as the "crit"
value.  Recipients MAY consider the JWS to be invalid if the critical
list contains any Header Parameter names defined by this
specification or [JWA] for use with JWS or if any other constraints
on its use are violated.  When used, this Header Parameter MUST be
integrity protected; therefore, it MUST occur only within the JWS
Protected Header.  Use of this Header Parameter is OPTIONAL.  This
Header Parameter MUST be understood and processed by implementations.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.11

#### Optional

***

### cty?

> `optional` **cty**: `"JWT"`

Defined in: [src/lib/Types.ts:106](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L106)

The "cty" (content type) Header Parameter defined by [JWS] and [JWE]
is used by this specification to convey structural information about
the JWT.

#### Link

https://datatracker.ietf.org/doc/html/rfc7519#section-5.2

#### Optional

***

### jku?

> `optional` **jku**: `string`

Defined in: [src/lib/Types.ts:85](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L85)

The "jku" (JWK Set URL) Header Parameter is a URI [RFC3986] that
refers to a resource for a set of JSON-encoded public keys, one of
which corresponds to the key used to digitally sign the JWS.  The
keys MUST be encoded as a JWK Set [JWK].  The protocol used to
acquire the resource MUST provide integrity protection; an HTTP GET
request to retrieve the JWK Set MUST use Transport Layer Security
(TLS) [RFC2818] [RFC5246]; and the identity of the server MUST be
validated, as per Section 6 of RFC 6125 [RFC6125].  Also, see
Section 8 on TLS requirements.  Use of this Header Parameter is
OPTIONAL.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.2

#### Optional

***

### jwk?

> `optional` **jwk**: `string`

Defined in: [src/lib/Types.ts:96](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L96)

The "jwk" (JSON Web Key) Header Parameter is the public key that
corresponds to the key used to digitally sign the JWS.  This key is
represented as a JSON Web Key [JWK].  Use of this Header Parameter is
OPTIONAL.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.3

#### Optional

***

### kid?

> `optional` **kid**: `string`

Defined in: [src/lib/Types.ts:191](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L191)

The "kid" (key ID) Header Parameter is a hint indicating which key
was used to secure the JWS.  This parameter allows originators to
explicitly signal a change of key to recipients.  The structure of
the "kid" value is unspecified.  Its value MUST be a case-sensitive
string.  Use of this Header Parameter is OPTIONAL.

When used with a JWK, the "kid" value is used to match a JWK "kid"
parameter value.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.4

#### Optional

***

### typ?

> `optional` **typ**: `"JWT"`

Defined in: [src/lib/Types.ts:68](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L68)

The "typ" (type) Header Parameter defined by JWS and JWE is used
by JWT applications to declare the media type IANA.MediaTypes of
this complete JWT.  This is intended for use by the JWT application
when values that are not JWTs could also be present in an application
data structure that can contain a JWT object; the application can use
this value to disambiguate among the different kinds of objects that
might be present.  It will typically not be used by applications when
it is already known that the object is a JWT.  This parameter is
ignored by JWT implementations; any processing of this parameter is
performed by the JWT application.  If present, it is RECOMMENDED that
its value be "JWT" to indicate that this object is a JWT.  While
media type names are not case sensitive, it is RECOMMENDED that "JWT"
always be spelled using uppercase characters for compatibility with
legacy implementations.  Use of this Header Parameter is OPTIONAL.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.9

#### Recommended

#### Optional

***

### x5c?

> `optional` **x5c**: `string`[]

Defined in: [src/lib/Types.ts:153](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L153)

The "x5c" (X.509 certificate chain) Header Parameter contains the
X.509 public key certificate or certificate chain [RFC5280]
corresponding to the key used to digitally sign the JWS.  The
certificate or certificate chain is represented as a JSON array of
certificate value strings.  Each string in the array is a
base64-encoded (Section 4 of [RFC4648] -- not base64url-encoded) DER
[ITU.X690.2008] PKIX certificate value.  The certificate containing
the public key corresponding to the key used to digitally sign the
JWS MUST be the first certificate.  This MAY be followed by
additional certificates, with each subsequent certificate being the
one used to certify the previous one.  The recipient MUST validate
the certificate chain according to RFC 5280 [RFC5280] and consider
the certificate or certificate chain to be invalid if any validation
failure occurs.  Use of this Header Parameter is OPTIONAL.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.6

#### Optional

***

### x5t?

> `optional` **x5t**: `string`

Defined in: [src/lib/Types.ts:119](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L119)

The "x5t" (X.509 certificate SHA-1 thumbprint) Header Parameter is a
base64url-encoded SHA-1 thumbprint (a.k.a. digest) of the DER
encoding of the X.509 certificate [RFC5280] corresponding to the key
used to digitally sign the JWS.  Note that certificate thumbprints
are also sometimes known as certificate fingerprints.  Use of this
Header Parameter is OPTIONAL.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.7

#### Optional

***

### x5t#S256?

> `optional` **x5t#S256**: `string`

Defined in: [src/lib/Types.ts:132](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L132)

The "x5t#S256" (X.509 certificate SHA-256 thumbprint) Header
Parameter is a base64url-encoded SHA-256 thumbprint (a.k.a. digest)
of the DER encoding of the X.509 certificate [RFC5280] corresponding
to the key used to digitally sign the JWS.  Note that certificate
thumbprints are also sometimes known as certificate fingerprints.
Use of this Header Parameter is OPTIONAL.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.8

#### Optional

***

### x5u?

> `optional` **x5u**: `string`

Defined in: [src/lib/Types.ts:176](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L176)

The "x5u" (X.509 URL) Header Parameter is a URI [RFC3986] that refers
to a resource for the X.509 public key certificate or certificate
chain [RFC5280] corresponding to the key used to digitally sign the
JWS.  The identified resource MUST provide a representation of the
certificate or certificate chain that conforms to RFC 5280 [RFC5280]
in PEM-encoded form, with each certificate delimited as specified in
Section 6.1 of RFC 4945 [RFC4945].  The certificate containing the
public key corresponding to the key used to digitally sign the JWS
MUST be the first certificate.  This MAY be followed by additional
certificates, with each subsequent certificate being the one used to
certify the previous one.  The protocol used to acquire the resource
MUST provide integrity protection; an HTTP GET request to retrieve
the certificate MUST use TLS [RFC2818] [RFC5246]; and the identity of
the server MUST be validated, as per Section 6 of RFC 6125 [RFC6125].
Also, see Section 8 on TLS requirements.  Use of this Header
Parameter is OPTIONAL.

#### Link

https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.5

#### Optional
