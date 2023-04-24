import { fail } from '@sveltejs/kit';
import { decodeFormData, decodeNestedFields } from './form_decoder';
export function decodeAndValidateForm(schema, handler) {
    return async (event) => {
        const form = await event.request.formData();
        const { data, errors } = safeParseForm(schema, form, { decodeForm: true });
        if (errors) {
            return fail(400, { errors });
        }
        return await handler({ ...event, data, form });
    };
}
export function validateForm(schema, handler) {
    return async (event) => {
        const form = await event.request.formData();
        const { data, errors } = safeParseForm(schema, form);
        if (errors) {
            return fail(400, { errors });
        }
        return await handler({ ...event, data, form });
    };
}
export const safeParseForm = (schema, form, options) => {
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
    }
    else {
        // format the errors in a way readable for the form component
        const errors = {};
        for (const err of validation.error.issues) {
            if (errors[err.path.join('.')]) {
                errors[err.path.join('.')] += ', ' + err.message;
            }
            else {
                errors[err.path.join('.')] = err.message;
            }
        }
        return {
            data: undefined,
            errors: errors
        };
    }
};
