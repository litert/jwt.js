[Documents for @litert/jwt](../../index.md) / [Types](../index.md) / IJsonFieldValue

# Type Alias: IJsonFieldValue

> **IJsonFieldValue** = `string` \| `number` \| `boolean` \| `null` \| `IJsonFieldValue`[] \| \{\[`key`: `string`\]: `IJsonFieldValue`; \}

Defined in: [src/lib/Types.ts:24](https://github.com/litert/jwt.js/blob/master/src/lib/Types.ts#L24)

The type of the JSON field value, which can be a string,
number, boolean, null, an array of JSON field values, or
an object with string keys and JSON field values.
