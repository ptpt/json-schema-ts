export namespace t {
    interface BaseType {
        $id?: string;
        $schema?: string;
        $ref?: string;
        $comment?: string;

        type?: 'string' | 'number' | 'integer' | 'boolean' | 'null' | 'array' | 'object';

        enum?: Array<string | number | boolean | null | object | any[]>;
        const?: any;

        title?: string;
        description?: string;
        definitions?: { [K: string]: Schema }
    }

    export interface NumberType<E extends number=number> extends BaseType {
        type: 'number';
        // strictly greater than 0
        multipleOf?: number;
        maximum?: number;
        exclusiveMaximum?: number;
        minimum?: number;
        exclusiveMinimum?: number;

        enum?: Array<E>;
    }

    export interface IntegerType<E extends number=number> extends BaseType {
        type: 'integer';
        // strictly greater than 0
        multipleOf?: number;
        maximum?: number;
        exclusiveMaximum?: number;
        minimum?: number;
        exclusiveMinimum?: number;

        enum?: Array<E>;
    }

    export interface StringType<E extends string=string> extends BaseType {
        type: 'string';
        // a non-negative integer
        maxLength?: number;
        // a non-negative integer
        minLength?: number;
        pattern?: string;

        enum?: Array<E>;
    }

    export interface BooleanType<E extends boolean=boolean> extends BaseType {
        type: 'boolean';
        enum?: Array<E>;
    }

    export interface NullType<E extends null=null> extends BaseType {
        type: 'null';
        enum?: Array<E>;
    }

    export interface ArrayType<T extends Schema> extends BaseType {
        type: 'array';
        // Omitting this keyword has the same behavior as an empty schema.
        items?: T;
        // The value of this keyword MUST be a non-negative integer.
        maxItems?: number;
        // The value of this keyword MUST be a non-negative integer.
        minItems?: number;
        uniqueItems?: boolean;
        // FIXME: An array instance is valid against "contains" if at least one of its elements is valid against the given schema.
        // contains?: Schema;
    }

    interface GenericArrayType extends ArrayType<Schema> {}

    export interface TupleType<T extends Schema[]> extends BaseType {
        type: 'array';
        // Omitting this keyword has the same behavior as an empty schema.
        items?: T;
        // The value of this keyword MUST be a non-negative integer.
        maxItems?: number;
        // The value of this keyword MUST be a non-negative integer.
        minItems?: number;
        uniqueItems?: boolean;
        // FIXME: An array instance is valid against "contains" if at least one of its elements is valid against the given schema.
        // contains?: Schema;
    }

    interface GenericTupleType extends TupleType<Schema[]> {}

    export type ObjectProperties = {[key: string]: Schema}

    export interface ObjectType<T extends ObjectProperties, AdditionalProperties extends Schema=Schema> extends BaseType {
        type: 'object';
        // Omitting this keyword has the same behavior as an empty object.
        properties?: T;
        maxProperties?: number;
        minProperties?: number;
        // Omitting this keyword has the same behavior as an empty array.
        required?: Array<keyof T>;
        additionalProperties?: AdditionalProperties;
        // FIXME: dependencies?: {};
        propertyNames?: Schema;
    }

    interface GenericObjectType extends ObjectType<ObjectProperties> {};

    export interface RefType<T extends Schema> extends BaseType {
        $ref: string;
    }

    interface GenericRefType extends RefType<Schema> {};

    export type Schema = boolean
        | StringType
        | NumberType
        | IntegerType
        | BooleanType
        | NullType
        | GenericArrayType
        | GenericTupleType
        | GenericObjectType
        | GenericRefType;

    export interface ArrayTSType<U extends Schema> extends Array<TSType<U>> {}

    // FIXME: why can't use MapToTSType<T> in TSType?
    type MapToTSType<T> = { [K in keyof T]: TSType<T[K]> };

    export type TSTypeNoRef<T> = T extends true ? true
                : T extends false ? false
                : T extends StringType<infer U> ? U
                : T extends NumberType<infer U> ? U
                : T extends IntegerType<infer U> ? U
                : T extends BooleanType<infer U> ? U
                : T extends NullType<infer U> ? U
                : T extends ArrayType<infer T> ? ArrayTSType<T>
                : T extends TupleType<infer T> ? { [K in keyof T]: TSType<T[K]> }
                : T extends ObjectType<infer T> ? { [K in keyof T]: TSType<T[K]> }
                : never

    export type TSType<T> = T extends RefType<infer S> ? TSTypeNoRef<S> : TSTypeNoRef<T>
}

export namespace s {
    export function object<T extends t.ObjectProperties>(body?: Partial<t.ObjectType<T>>): t.ObjectType<T> {
        return {
            ...body,
            'type': 'object',
        };
    }

    export function number<E extends number=number>(body?: Partial<t.NumberType<E>>): t.NumberType<E> {
        return {
            ...body,
            'type': 'number',
        };
    }

    export function integer<E extends number=number>(body?: Partial<t.IntegerType<E>>): t.IntegerType<E> {
        return {
            ...body,
            'type': 'integer',
        };
    }

    export function boolean<E extends boolean=boolean>(body?: Partial<t.BooleanType<E>>): t.BooleanType<E> {
        return {
            ...body,
            'type': 'boolean',
        };
    }

    export function string<E extends string=string>(body?: Partial<t.StringType<E>>): t.StringType<E> {
        return {
            ...body,
            'type': 'string',
        };
    }

    export function array<T extends t.Schema>(body?: Partial<t.ArrayType<T>>): t.ArrayType<T> {
        return {
            ...body,
            'type': 'array',
        };
    }

    export function tuple<T extends t.Schema[]>(body?: Partial<t.TupleType<T>>): t.TupleType<T> {
        return {
            'type': 'array',
            ...body,
        };
    }

    export function items<T extends t.Schema[]>(...schema: T): T {
        return schema;
    }

    export function ref<T extends t.Schema>(path: string, refType: T): t.RefType<T> {
        return {
            '$ref': path,
        };
    }
}