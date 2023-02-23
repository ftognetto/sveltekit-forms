import { z } from 'zod';

// String
export const zString = z.string().min(1);
export const zStringOptional = zString.optional();

// Zip code
export const zZip = z
	.string()
	.regex(/^(\s*|\d+)$/)
	.length(5);
export const zZipOptional = zZip.optional();

// Vat code
export const zVatCode = zString.min(9).max(18);
export const zVatCodeOptional = zVatCode.optional();

// Date
export const zDate = z.date();
export const zDateOptional = zDate.optional();

// Number
export const zNumber = z.number();
export const zNumberOptional = zNumber.optional();

// Boolean
export const zBoolean = z.boolean();
export const zBooleanOptional = zBoolean.optional();

// Email
export const zEmail = z.string().email();
export const zEmailOptional = zEmail.optional();

// Arrays
export const zStringArray = z.array(zString);
export const zStringArrayOptional = zStringArray.optional();

export const zNumberArray = z.array(zNumber);
export const zNumberArrayOptional = zNumberArray.optional();
