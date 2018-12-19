"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var meta;
(function (meta) {
    meta.equal = function (_true) { };
    var test;
    (function (test) {
        meta.equal(true);
        meta.equal(false);
        meta.equal(false);
        meta.equal(false);
        meta.equal(false);
        meta.equal(true);
    })(test || (test = {}));
})(meta || (meta = {}));
{
    var the_string = index_1.s.string({});
    meta.equal(true);
    (function (_x) { })('hello');
}
{
    var the_number = index_1.s.number();
    meta.equal(true);
    (function (_x) { })(1);
}
{
    var the_integer = index_1.s.number({ 'title': 'integer' });
    meta.equal(true);
    (function (_x) { })(1);
}
{
    var the_boolean = index_1.s.boolean({ 'description': 'this is a boolean' });
    meta.equal(true);
    (function (_x) { })(true);
    (function (_x) { })(false);
}
{
    var the_array = index_1.s.array();
    meta.equal(true);
    meta.equal(false);
    meta.equal(false);
    (function (_x) { })([]);
}
{
    var the_object = index_1.s.object();
    meta.equal(true);
    meta.equal(false);
    meta.equal(false);
    (function (_x) { })({});
}
{
    var items = index_1.s.items();
    var tuple = index_1.s.tuple({ 'items': items });
    meta.equal(true);
    meta.equal(false);
    (function (_x) { })([]);
}
{
    var items = index_1.s.items(index_1.s.string(), index_1.s.number(), index_1.s.integer(), index_1.s.boolean(), index_1.s.object(), index_1.s.object({
        'properties': {
            'hello': index_1.s.string()
        }
    }), true, false);
    var tuple = index_1.s.tuple({ 'items': items });
    (function (_x) { })(['a', 2, 2, true, {}, { 'hello': 'haha' }, true, false]);
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
            'array': index_1.s.array({ 'items': index_1.s.string() }),
            'tuple': index_1.s.tuple({ 'items': index_1.s.items(index_1.s.string(), index_1.s.number(), index_1.s.object({ 'properties': { 'hello': index_1.s.string() } })) }),
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
        'tuple': ['hello', 1, { 'hello': 'string' }],
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
