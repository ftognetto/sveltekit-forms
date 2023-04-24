import { z } from 'zod';
// String
export const zString = z
    .string()
    .min(1)
    .transform((v) => String(v));
export const zStringOptional = z
    .union([zString, z.string().length(0)])
    .optional()
    .transform((v) => (v?.length ? v : undefined))
    .nullable(); // z.coerce.string().nullable().or(zString);
// Zip code
export const zZip = z.coerce
    .string()
    .regex(/^(\s*|\d+)$/)
    .length(5);
export const zZipOptional = z.union([zZip, z.string().length(0)]).optional();
// Vat code
export const zVatCode = z.coerce.string().min(9).max(18);
export const zVatCodeOptional = z.union([zVatCode, z.string().length(0)]).optional();
// Date
export const zDate = z.coerce.date();
export const zDateOptional = z.union([zDate, z.string().length(0)]).optional();
// Number
export const zNumber = z.coerce.number().min(1);
export const zNumberOptional = z
    .union([zNumber, z.string().length(0)])
    .optional()
    .transform((v) => (v === '' ? undefined : v));
// Boolean
export const zBoolean = z.coerce.boolean();
export const zBooleanOptional = z.union([zBoolean, z.string().length(0)]).optional();
// Email
export const zEmail = z.coerce.string().email();
export const zEmailOptional = z.union([zEmail, z.string().length(0)]).optional();
// Arrays
export const zStringArray = z
    .union([zString, z.string().array()])
    .transform((val) => (Array.isArray(val) ? val : [val]));
export const zStringArrayOptional = zStringArray.optional();
export const zNumberArray = z.array(zNumber);
export const zNumberArrayOptional = zNumberArray.optional();
