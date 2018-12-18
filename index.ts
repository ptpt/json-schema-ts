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

    export interface NumberType extends BaseType {
        type: 'number';
        // strictly greater than 0
        multipleOf?: number;
        maximum?: number;
        exclusiveMaximum?: number;
        minimum?: number;
        exclusiveMinimum?: number;

        enum?: Array<TSType<NumberType>>;
    }

    export interface IntegerType extends BaseType {
        type: 'integer';
        // strictly greater than 0
        multipleOf?: number;
        maximum?: number;
        exclusiveMaximum?: number;
        minimum?: number;
        exclusiveMinimum?: number;

        enum?: Array<TSType<IntegerType>>;
    }

    export interface StringType extends BaseType {
        type: 'string';
        // a non-negative integer
        maxLength?: number;
        // a non-negative integer
        minLength?: number;
        pattern?: string;
        // TODO: add more

        enum?: Array<TSType<StringType>>;
    }

    export interface BooleanType extends BaseType {
        type: 'boolean';
        enum?: boolean[];
    }

    export interface NullType extends BaseType {
        type: 'null';
        enum?: null[];
    }

    export interface ArrayTypeLike extends BaseType {
        type: 'array';
        items?: SchemaTypeLike | SchemaTypeLike[];
        enum?: SchemaArrayWrap<SchemaTypeLike>;
    }

    export interface ArrayType<T extends SchemaTypeLike> extends BaseType {
        type: 'array';
        // Omitting this keyword has the same behavior as an empty schema.
        items?: T | T[];
        enum?: SchemaArrayWrap<T>;
    }

    export type ObjectProperties = {[key: string]: SchemaTypeLike}

    interface ObjectTypeLike extends BaseType {
        type: 'object';
        properties?: ObjectProperties;
    }

    export interface ObjectType<T extends ObjectProperties> extends BaseType {
        type: 'object';
        // Omitting this keyword has the same behavior as an empty object.
        properties?: T;
        // Omitting this keyword has the same behavior as an empty array.
        required?: Array<keyof T>;
    }

    export type SchemaTypeLike = boolean | StringType | NumberType | IntegerType | BooleanType | NullType | ArrayTypeLike | ObjectTypeLike;

    export type TSType<T> = T extends true ? true
                : T extends false ? false
                : T extends StringType ? string 
                : T extends NumberType ? number 
                : T extends IntegerType ? number 
                : T extends BooleanType ? boolean 
                : T extends NullType ? null 
                : T extends ArrayType<infer U> ? SchemaArrayWrap<U>
                : T extends ObjectType<infer U> ? {[key in keyof U]: TSType<U[key]>}
                : never

    interface SchemaArrayWrap<U> extends Array<TSType<U>> {}
}

export namespace s {
    export function object<T extends t.ObjectProperties>(body?: Partial<t.ObjectType<T>>): t.ObjectType<T> {
        return {
            ...body,
            'type': 'object',
        };
    }

    export function number(body?: Partial<t.NumberType>): t.NumberType {
        return {
            ...body,
            'type': 'number',
        };
    }

    export function integer(body?: Partial<t.IntegerType>): t.IntegerType {
        return {
            ...body,
            'type': 'integer',
        };
    }

    export function boolean(body?: Partial<t.BooleanType>): t.BooleanType {
        return {
            ...body,
            'type': 'boolean',
        };
    }

    export function string(body?: Partial<t.StringType>): t.StringType {
        return {
            ...body,
            'type': 'string',
        };
    }

    export function array<T extends t.SchemaTypeLike>(body?: Partial<t.ArrayType<T>>): t.ArrayType<T> {
        return {
            ...body,
            'type': 'array',
        };
    }
}