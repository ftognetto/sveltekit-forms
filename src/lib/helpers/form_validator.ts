import { fail, type RequestEvent } from '@sveltejs/kit';
import type { MaybePromise } from '@sveltejs/kit/types/private';
import type z from 'zod';
import { decodeFormData, decodeNestedFields } from './form_decoder';

export function decodeAndValidateForm<T extends z.ZodTypeAny>(
	schema: T,
	handler: (
		event: RequestEvent & {
			data: z.TypeOf<T>;
			form: FormData;
		}
	) => MaybePromise<void | Record<string, any>>
) {
	return async (event: RequestEvent) => {
		const form = await event.request.formData();
		const { data, errors } = safeParseForm(schema, form, { decodeForm: true });
		if (errors) {
			return fail(400, { errors });
		}
		return await handler({ ...event, data, form });
	};
}

export function validateForm<T extends z.ZodTypeAny>(
	schema: T,
	handler: (
		event: RequestEvent & {
			data: z.TypeOf<T>;
			form: FormData;
		}
	) => MaybePromise<void | Record<string, any>>
) {
	return async (event: RequestEvent) => {
		const form = await event.request.formData();
		const { data, errors } = safeParseForm(schema, form);
		if (errors) {
			return fail(400, { errors });
		}
		return await handler({ ...event, data, form });
	};
}

export const safeParseForm = <T extends z.ZodTypeAny>(
	schema: T,
	form: FormData | Record<string, any>,
	options?: {
		decodeForm?: boolean;
	}
):
	| { data: z.infer<typeof schema>; errors: undefined }
	| { data: undefined; errors: Record<string, string> } => {
	if (options?.decodeForm && form instanceof FormData) {
		form = decodeFormData(form);
		form = decodeNestedFields(form);
	}
	const validation = schema.safeParse(form);

	if (validation.success) {
		return {
			data: validation.data,
			errors: undefined
		};
	} else {
		// format the errors in a way readable for the form component
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
