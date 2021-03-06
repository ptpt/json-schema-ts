# JSON Schema for TypeScript

This package provides:

1. JSON schema types for TypeScript (in namespace `t`)
2. a builder for building JSON schema (in namespace `s`)
3. infer the type given the JSON schema built by the builder (with `t.TSType<T>`)

## Installation

```
npm install json-schema-ts
```

## Examples

```typescript
import {s, t} from 'json-schema-ts';

const sex = s.string<'male' | 'female'>({'enum': ['male', 'female']});

// personSchema is a valid JSON schema
const personSchema = s.object({
    'title': 'person',
    'description': 'Person information',
    'definitions': {
        'sex': sex,
    },
    'properties': {
        'name': s.string(),
        'fullName': s.object({'properties': {
            'firstName': s.string(),
            'lastName': s.string(),
        }}),
        'age': s.number(),
        'friends': s.array({'items': s.string()}),
        'sex': s.ref<typeof sex>('#/definitions/sex'),
        'location': s.oneOf(
            s.string(),
            s.tuple({'items': s.items(s.number(), s.number())}),
        )
    }
});

// Infer IPerson from personSchema
type IPerson = t.TSType<typeof personSchema>;

// IPerson is equivalent to
// interface IPerson {
//     name: string;
//     fullName: {
//         firstName: string,
//         lastName: string,
//     };
//     age: number;
//     friends: string[];
//     sex: 'male' | 'female';
//     location: string | [number, number];
// }
```

## Development

```
npx tsc -w
```

## License
MIT. See LICENSE.
