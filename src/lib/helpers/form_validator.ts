import type Joi from 'joi';
import type { AnySchema } from 'joi';
import { joiItMessages } from './joi_it_messages';

export const validateForm = (
	data: Record<string, any>,
	schema: AnySchema,
	options?: {
		language?: Joi.LanguageMessages;
	}
):
	| { data: Record<string, any>; errors: undefined }
	| { data: undefined; errors: Record<string, string> } => {
	// validation
	if (options?.language) {
		schema = schema.messages(options.language);
	} else {
		schema = schema.messages(joiItMessages);
	}
	const result = schema.validate(data, {
		abortEarly: true,
		stripUnknown: true,
		errors: { language: 'it' }
	});
	if (result.error) {
		const errors: Record<string, string> = {};
		for (const err of result.error.details) {
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
	} else {
		return {
			data: result.value,
			errors: undefined
		};
	}
};
