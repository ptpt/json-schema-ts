import {t, s} from './index';

{
    const the_string = s.string({
        'enum': ['hello'],
    });
    type T = t.TSType<typeof the_string>;
    ((_x: T) => {})('hello');
}

{
    const the_number = s.number();
    type T = t.TSType<typeof the_number>;
    ((_x: T) => {})(1);
}

{
    const the_integer = s.number({'title': 'integer'});
    type T = t.TSType<typeof the_integer>;
    ((_x: T) => {})(1);
}

{
    const the_boolean = s.boolean({'description': 'this is a boolean'});
    type T = t.TSType<typeof the_boolean>;
    ((_x: T) => {})(true);
    ((_x: T) => {})(false);
}

{
    const the_array = s.array();
    type T = t.TSType<typeof the_array>;
    ((_x: T) => {})([]);
}

{
    const the_object = s.object();
    type T = t.TSType<typeof the_object>;
    ((_x: T) => {})({});
}

{
    const complex_array = s.array({'items': [
        s.string(),
        s.number(),
        s.integer(),
        s.boolean(),
        s.object(),
        true,
        false,
    ]});

    type T = t.TSType<typeof complex_array>;
    ((_x: T) => {})([]);
    ((_x: T) => {})(['hello']);
    ((_x: T) => {})([1]);
    ((_x: T) => {})([true]);
    ((_x: T) => {})([false]);
    ((_x: T) => {})([{}]);
}

{
    const complex_object = s.object({
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
            'array': s.array(),
            'true': true,
            'false': false,
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
        'true': true,
        'false': false,
    });
}

{
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
}