# JSON Schema for TypeScript

This package provides:

1. JSON schema types for TypeScript (in namespace `t`)
2. a builder for building JSON schema (in namespace `s`)
3. infer the type given the JSON schema built by the builder (with `t.TSType<T>`)

## Examples

```typescript
import {s, t} from 'json-schema-ts';

const sex = s.string<'male' | 'female'>({'enum': ['male', 'female']});

const personSchema = s.object({
    'title': 'person',
    'description': 'Person information',
    'definitions': {
        'sex': sex,
    },
    'properties': {
        'name': s.string(),
        // [first name, last name]
        'fullName': s.tuple({'items': s.items(s.string(), s.string())}),
        'age': s.number(),
        'friends': s.array({'items': s.string()}),
        'sex': s.ref('#/definitions/sex', sex),
    }
});

type IPerson = t.TSType<typeof personSchema>;

// IPerson is equivalent to
// interface IPerson {
//     name: string;
//     fullName: [string, string];
//     age: number;
//     friends: string[];
//     sex: 'male' | 'female';
// }
```

## License
MIT. See LICENSE.