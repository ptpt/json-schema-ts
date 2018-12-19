"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var s;
(function (s) {
    function object(body) {
        return __assign({}, body, { 'type': 'object' });
    }
    s.object = object;
    function number(body) {
        return __assign({}, body, { 'type': 'number' });
    }
    s.number = number;
    function integer(body) {
        return __assign({}, body, { 'type': 'integer' });
    }
    s.integer = integer;
    function boolean(body) {
        return __assign({}, body, { 'type': 'boolean' });
    }
    s.boolean = boolean;
    function string(body) {
        return __assign({}, body, { 'type': 'string' });
    }
    s.string = string;
    function array(body) {
        return __assign({}, body, { 'type': 'array' });
    }
    s.array = array;
    function tuple(body) {
        return __assign({ 'type': 'array' }, body);
    }
    s.tuple = tuple;
    function items() {
        var schema = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            schema[_i] = arguments[_i];
        }
        return schema;
    }
    s.items = items;
})(s = exports.s || (exports.s = {}));
