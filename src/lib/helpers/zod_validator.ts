// Import your language translation files
import { z, ZodObject, type ZodRawShape } from 'zod';

export const safeParseForm = (
	form: FormData | Record<string, any>,
	schema: ZodRawShape | ZodObject<any>
):
	| { data: Record<string, any>; errors: undefined }
	| { data: undefined; errors: Record<string, string> } => {
	// if schema is not an object i transform it in an object
	const zObject = schema instanceof ZodObject ? schema : z.object(schema);
	const data = form instanceof FormData ? Object.fromEntries(form.entries()) : form;

	// if in data there are fields with dot i assume that they are nested objects
	// and i transform them in nested objects
	for (const [key, value] of Object.entries(data)) {
		if (key.includes('.')) {
			const keys = key.split('.');
			const lastKey = keys.pop() as string;
			let obj = data;
			for (const k of keys) {
				if (!obj[k]) {
					obj[k] = {};
				}
				obj = obj[k];
			}
			obj[lastKey] = value;
			delete data[key];
		}
	}

	// inferred type - should be the return type of the function
	type InferredType = z.infer<typeof zObject>;

	// Validation
	const validation = zObject.safeParse(data);
	if (validation.success) {
		return {
			data: validation.data as InferredType,
			errors: undefined
		};
	} else {
		// format the errors in a more readable way
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
