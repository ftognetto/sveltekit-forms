// Import your language translation files
import { z, type ZodRawShape } from 'zod';

export const parseRecord = (
	object: Record<string, any>,
	schema: ZodRawShape
):
	| { data: Record<string, any>; errors: undefined }
	| { data: undefined; errors: Record<string, string> } => {
	const zObject = z.object(schema);
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

export const parseForm = (
	form: FormData,
	schema: ZodRawShape
):
	| { data: Record<string, any>; errors: undefined }
	| { data: undefined; errors: Record<string, string> } => {
	const record = Object.fromEntries(form.entries());
	return parseRecord(record, schema);
};
