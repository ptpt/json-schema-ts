# JSON Schema for TypeScript

This package provides:

1. JSON schema types for TypeScript (in namespace `t`)
2. a builder for building JSON schema (in namespace `s`)
3. infer the type given the JSON schema built by the builder (with `t.TSType<T>`)

## Examples

```typescript
import {s, t} from 'json-schema-ts';

const personSchema = s.object({
    'properties': {
        'name': s.string(),
        'age': s.number(),
        'friends': s.array({'items': s.string()}),
    }
});

type IPerson = t.TSType<typeof personSchema>;

// IPerson is equivalent to
// interface IPerson {
//     name: string;
//     age: number;
//     friends: string[];
// }
```

## License
MIT. See LICENSE.