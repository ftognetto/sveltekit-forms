import type Joi from 'joi';
import type { AnySchema } from 'joi';
export declare const validateForm: (data: Record<string, any>, schema: AnySchema, options?: {
    language?: Joi.LanguageMessages;
}) => Promise<Record<string, string> | undefined>;
