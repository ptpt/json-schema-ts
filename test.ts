import {t, s} from './index';

namespace meta {
    // test if 2 types are the same
    export type equal<A, B> = A extends B ? B extends A ? true : false : false;
    export const equal = <A, B>(_true: equal<A, B>) => {}

    namespace test {
        equal<{}, {}>(true);
        equal<number[], [number, number]>(false);
        equal<true, false>(false);
        equal<number, 1>(false);
        equal<string, ''>(false);
        equal<'', ''>(true);
    }
}

{
    const the_string = s.string({
        'default': 'test',
    });
    type T = t.TSType<typeof the_string>;
    meta.equal<T, string>(true);
    ((_x: T) => {})('hello');
}

{
    const the_number = s.number();
    type T = t.TSType<typeof the_number>;
    meta.equal<T, number>(true);
    ((_x: T) => {})(1);
}

{
    const the_number_enum = s.number<1 | 2>({'enum': [1, 2]});
    type T = t.TSType<typeof the_number_enum>;
    meta.equal<T, 1 | 2>(true);
    ((_x: T) => {})(1);
    ((_x: T) => {})(2);
}

{
    const the_integer = s.number({'title': 'integer'});
    type T = t.TSType<typeof the_integer>;
    meta.equal<T, number>(true);
    ((_x: T) => {})(1);
}

{
    const the_integer_enum = s.number<1 | 2>({'enum': [1, 2]});
    type T = t.TSType<typeof the_integer_enum>;
    meta.equal<T, 1 | 2>(true);
    ((_x: T) => {})(1);
    ((_x: T) => {})(2);
}

{
    const the_boolean = s.boolean({'description': 'this is a boolean', 'default': false});
    type T = t.TSType<typeof the_boolean>;
    meta.equal<T, boolean>(true);
    ((_x: T) => {})(true);
    ((_x: T) => {})(false);
}

{
    const the_boolean_enum = s.boolean<true | true>({'enum': [true]});
    type T = t.TSType<typeof the_boolean_enum>;
    meta.equal<T, true>(true);
    ((_x: T) => {})(true);
}

{
    const the_array = s.array({
        default: [],
    });
    type T = t.TSType<typeof the_array>;
    meta.equal<T, any[]>(true);
    // meta.equal<T, number[]>(false);
    meta.equal<T, [any, any]>(false);
    ((_x: T) => {})([]);
}

{
    const the_object = s.object({
        'default': {},
    });
    type T = t.TSType<typeof the_object>;
    meta.equal<T, {}>(true);
    // meta.equal<T, {[key: string]: number}>(false);
    meta.equal<T, any[]>(false);
    ((_x: T) => {})({});
}

{
    const items = s.items();
    const tuple = s.tuple({'items': items});
    type T = t.TSType<typeof tuple>;
    meta.equal<T, []>(true);
    meta.equal<T, any[]>(false);
    ((_x: T) => {})([]);
}

{
    const items = s.items(
        s.string(),
        s.number(),
        s.integer(),
        s.boolean(),
        s.object(),
        s.object({
            'properties': {
                'hello': s.string()
            }
        }),
        true,
        false,
    );

    const tuple = s.tuple({'items': items});
    type T = t.TSType<typeof tuple>;

    ((_x: T) => {})(['a', 2, 2, true, {}, {'hello': 'haha'}, true, false]);
}

{
    const the_ref = s.ref('#/hello', s.number());
    type T = t.TSType<typeof the_ref>;
    ((_X: T) => {})(1);
}

{
    const string = s.string({});
    const tuple = s.tuple({'items': s.items(s.string(), s.integer())});
    const any_of = s.anyOf(tuple, string);
    const one_of = s.oneOf(string, tuple);
    const all_of = s.allOf(string, tuple);
    type T1 = t.TSType<typeof any_of>;
    type T2 = t.TSType<typeof one_of>;
    type T3 = t.TSType<typeof all_of>;
    meta.equal<T1, string | number>(true);
    meta.equal<T2, string | number>(true);
    meta.equal<T3, string | number>(true);
}

{
    const refObject = s.object({
        'properties': {
            'ref_object': s.array({'items': s.number()}),
        }
    });

    const complex_object = s.object({
        'definitions': {
            'hello': refObject,
        },
        'properties': {
            'string': s.string(),
            'number': s.number(),
            'integer': s.integer(),
            'boolean': s.boolean(),
            'object': s.object(),
            'nested_object': s.object({
                'properties': {
                    'array': s.array(),
                }
            }),
            'array': s.array({'items': s.string()}),
            'tuple': s.tuple({'items': s.items(s.string(), s.number(), s.object({'properties': {'hello': s.string()}}))}),
            'true': true,
            'false': false,
            'ref': s.ref('hello', refObject),
        },
    });

    type T = t.TSType<typeof complex_object>;
    ((_x: T) => {})({
        'string': '1',
        'number': 1,
        'integer': 1,
        'boolean': true,
        'object': {},
        'nested_object': {
            'array': []
        },
        'array': [],
        'tuple': ['hello', 1, {'hello': 'string'}],
        'true': true,
        'false': false,
        'ref': {
            'ref_object': [1, 2],
        }
    });
}

{
    const sex = s.string<'male' | 'female'>({'enum': ['male', 'female']});

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
            'sex': s.ref('#/definitions/sex', sex),
            'location': s.oneOf(
                s.string(),
                s.tuple({'items': s.items(s.number(), s.number())}),
            )
        }
    });

    type IPerson = t.TSType<typeof personSchema>;

    // IPerson is equivalent to
    interface IPerson2 {
        name: string;
        fullName: {
            firstName: string,
            lastName: string,
        };
        age: number;
        friends: string[];
        sex: 'male' | 'female';
        location: string | [number, number];
    }

    meta.equal<IPerson, IPerson2>(true);
}