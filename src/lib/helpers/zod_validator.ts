import type { z, ZodTypeAny } from 'zod';
import { decodeFormData, decodeNestedFields } from './form_decoder';

export const safeParseForm = <T extends ZodTypeAny>(
	form: FormData | Record<string, any>,
	schema: T
):
	| { data: z.infer<typeof schema>; errors: undefined }
	| { data: undefined; errors: Record<string, string> } => {
	// if schema is not an object i transform it in an object
	let data = form instanceof FormData ? decodeFormData(form) : form;

	// if in data there are fields with dot i assume that they are nested objects
	// and i transform them in nested objects
	data = decodeNestedFields(data);

	// inferred type - should be the return type of the function
	//type InferredType = z.infer<typeof zObject>;

	// Validation
	const validation = schema.safeParse(data);
	if (validation.success) {
		return {
			data: validation.data,
			errors: undefined
		};
	} else {
		// format the errors in a more readable way
		const errors: Record<string, string> = {};
		for (const err of validation.error.issues) {
			if (errors[err.path.join('.')]) {
				errors[err.path.join('.')] += ', ' + err.message;
			} else {
				errors[err.path.join('.')] = err.message;
			}
		}
		return {
			data: undefined,
			errors: errors
		};
	}
};
