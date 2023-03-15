// Import your language translation files
import { z, ZodObject, type ZodRawShape } from 'zod';

export const parseRecordFromSchema = (
	object: Record<string, any>,
	zObject: ZodObject<any>
):
	| { data: Record<string, any>; errors: undefined }
	| { data: undefined; errors: Record<string, string> } => {
	type InferredType = z.infer<typeof zObject>;
	const validation = zObject.safeParse(object);
	if (validation.success) {
		return {
			data: validation.data as InferredType,
			errors: undefined
		};
	} else {
		const errors: Record<string, string> = {};
		for (const err of validation.error.issues) {
			if (errors[err.path[0]]) {
				errors[err.path[0]] += ', ' + err.message;
			} else {
				errors[err.path[0]] = err.message;
			}
		}
		return {
			data: undefined,
			errors: errors
		};
	}
};
export const parseFormFromSchema = (
	form: FormData,
	zObject: ZodObject<any>
):
	| { data: Record<string, any>; errors: undefined }
	| { data: undefined; errors: Record<string, string> } => {
	const record = Object.fromEntries(form.entries());
	return parseRecordFromSchema(record, zObject);
};
export const parseRecord = (
	object: Record<string, any>,
	schema: ZodRawShape
):
	| { data: Record<string, any>; errors: undefined }
	| { data: undefined; errors: Record<string, string> } => {
	const zObject = z.object(schema);
	return parseRecordFromSchema(object, zObject);
};

export const parseForm = (
	form: FormData,
	schema: ZodRawShape
):
	| { data: Record<string, any>; errors: undefined }
	| { data: undefined; errors: Record<string, string> } => {
	const record = Object.fromEntries(form.entries());
	return parseRecord(record, schema);
};
