import { type RequestEvent } from '@sveltejs/kit';
import type { MaybePromise } from '@sveltejs/kit/types/private';
import type z from 'zod';
export declare function decodeAndValidateForm<T extends z.ZodTypeAny>(schema: T, handler: (event: RequestEvent & {
    data: z.TypeOf<T>;
    form: FormData;
}) => MaybePromise<void | Record<string, any>>): (event: RequestEvent) => Promise<void | Record<string, any>>;
export declare function validateForm<T extends z.ZodTypeAny>(schema: T, handler: (event: RequestEvent & {
    data: z.TypeOf<T>;
    form: FormData;
}) => MaybePromise<void | Record<string, any>>): (event: RequestEvent) => Promise<void | Record<string, any>>;
export declare const safeParseForm: <T extends z.ZodTypeAny>(schema: T, form: FormData | Record<string, any>, options?: {
    decodeForm?: boolean;
}) => {
    data: z.TypeOf<T>;
    errors: undefined;
} | {
    data: undefined;
    errors: Record<string, string>;
};
