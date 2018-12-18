"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
{
    var the_string = index_1.s.string({
        'enum': ['hello'],
    });
    (function (_x) { })('hello');
}
{
    var the_number = index_1.s.number();
    (function (_x) { })(1);
}
{
    var the_integer = index_1.s.number({ 'title': 'integer' });
    (function (_x) { })(1);
}
{
    var the_boolean = index_1.s.boolean({ 'description': 'this is a boolean' });
    (function (_x) { })(true);
    (function (_x) { })(false);
}
{
    var the_array = index_1.s.array();
    (function (_x) { })([]);
}
{
    var the_object = index_1.s.object();
    (function (_x) { })({});
}
{
    var complex_array = index_1.s.array({ 'items': [
            index_1.s.string(),
            index_1.s.number(),
            index_1.s.integer(),
            index_1.s.boolean(),
            index_1.s.object(),
            true,
            false,
        ] });
    (function (_x) { })([]);
    (function (_x) { })(['hello']);
    (function (_x) { })([1]);
    (function (_x) { })([true]);
    (function (_x) { })([false]);
    (function (_x) { })([{}]);
}
{
    var complex_object = index_1.s.object({
        'properties': {
            'string': index_1.s.string(),
            'number': index_1.s.number(),
            'integer': index_1.s.integer(),
            'boolean': index_1.s.boolean(),
            'object': index_1.s.object(),
            'nested_object': index_1.s.object({
                'properties': {
                    'array': index_1.s.array(),
                }
            }),
            'array': index_1.s.array(),
            'true': true,
            'false': false,
        },
    });
    (function (_x) { })({
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
    var personSchema = index_1.s.object({
        'properties': {
            'name': index_1.s.string(),
            'age': index_1.s.number(),
            'friends': index_1.s.array({ 'items': index_1.s.string() }),
        }
    });
    // IPerson is equivalent to
    // interface IPerson {
    //     name: string;
    //     age: number;
    //     friends: string[];
    // }
}
