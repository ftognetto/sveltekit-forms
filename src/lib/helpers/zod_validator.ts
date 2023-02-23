// Import your language translation files
import { z, type ZodRawShape } from 'zod';
export const parseForm = (
	form: FormData,
	schema: ZodRawShape
):
	| { data: Record<string, any>; errors: undefined }
	| { data: undefined; errors: Record<string, string> } => {
	const validation = z.object(schema).safeParse(Object.fromEntries(form.entries()));
	if (validation.success) {
		return {
			data: validation.data,
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
