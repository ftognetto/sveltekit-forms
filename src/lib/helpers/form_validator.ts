import type Joi from 'joi';
import type { AnySchema } from 'joi';

export const validateForm = async (
	data: Record<string, any>,
	schema: AnySchema,
	options?: {
		language?: Joi.LanguageMessages;
	}
): Promise<Record<string, string> | undefined> => {
	// validation
	try {
		if (options?.language) {
			schema = schema.messages(options.language);
		}
		await schema.validateAsync(data, {
			abortEarly: false,
			stripUnknown: true,
			errors: { language: 'it' }
		});
	} catch (e: any) {
		const errors: Record<string, string> = {};
		for (const err of e.details) {
			if (errors[err.path[0]]) {
				errors[err.path[0]] += ', ' + err.message;
			} else {
				errors[err.path[0]] = err.message;
			}
		}
		return errors;
	}
};
