import type { z } from 'zod';
export declare const safeParseForm: <T extends z.ZodTypeAny>(form: FormData | Record<string, any>, schema: T) => {
    data: z.TypeOf<T>;
    errors: undefined;
} | {
    data: undefined;
    errors: Record<string, string>;
};
