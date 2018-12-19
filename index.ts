export namespace t {
    interface BaseType {
        $id?: string;
        $schema?: string;
        $ref?: string;
        $comment?: string;

        type: 'string' | 'number' | 'integer' | 'boolean' | 'null' | 'array' | 'object';

        enum?: Array<string | number | boolean | null | object | any[]>;
        const?: any;

        title?: string;
        description?: string;
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
        // FIXME: add more

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

    export interface ArrayTypeLike extends BaseType {
        type: 'array';
        items?: SchemaTypeLike;
        enum?: ArrayWrap<SchemaTypeLike>;
    }

    export interface ArrayType<T extends SchemaTypeLike> extends BaseType {
        type: 'array';
        // Omitting this keyword has the same behavior as an empty schema.
        items?: T;
        enum?: ArrayWrap<T>;
    }

    export interface TupleTypeLike extends BaseType {
        type: 'array';
        // Omitting this keyword has the same behavior as an empty schema.
        items?: SchemaTypeLike[];
    }

    export interface TupleType<T extends SchemaTypeLike[]> extends BaseType {
        type: 'array';
        // Omitting this keyword has the same behavior as an empty schema.
        items?: T;
    }

    export type ObjectProperties = {[key: string]: SchemaTypeLike}

    interface ObjectTypeLike extends BaseType {
        type: 'object';
        properties?: ObjectProperties;
        // FIXME: enum?: Array<object>;
    }

    export interface ObjectType<T extends ObjectProperties> extends BaseType {
        type: 'object';
        // Omitting this keyword has the same behavior as an empty object.
        properties?: T;
        // Omitting this keyword has the same behavior as an empty array.
        required?: Array<keyof T>;
        // FIXME: enum?: Array<object>;
    }

    export type SchemaTypeLike = boolean | StringType | NumberType | IntegerType | BooleanType | NullType | ArrayTypeLike | TupleTypeLike | ObjectTypeLike;

    // FIXME: not sure why can't use MapToTSType<T> above
    type MapToTSType<T> = { [K in keyof T]: TSType<T[K]> };

    interface ArrayWrap<U extends SchemaTypeLike> extends Array<TSType<U>> {}

    export type TSType<T> = T extends true ? true
                : T extends false ? false
                : T extends StringType<infer U> ? U
                : T extends NumberType<infer U> ? U
                : T extends IntegerType<infer U> ? U
                : T extends BooleanType<infer U> ? U
                : T extends NullType<infer U> ? U
                : T extends ArrayType<infer T> ? ArrayWrap<T>
                : T extends TupleType<infer T> ? { [K in keyof T]: TSType<T[K]> }
                : T extends ObjectType<infer T> ? { [K in keyof T]: TSType<T[K]> }
                : never
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

    type S = t.SchemaTypeLike;

    export function array<T extends S>(body?: Partial<t.ArrayType<T>>): t.ArrayType<T> {
        return {
            ...body,
            'type': 'array',
        };
    }

    export function tuple<T extends S[]>(body?: Partial<t.TupleType<T>>): t.TupleType<T> {
        return {
            'type': 'array',
            ...body,
        };
    }

    export function items<T extends S[]>(...schema: T): T {
        return schema;
    }
}