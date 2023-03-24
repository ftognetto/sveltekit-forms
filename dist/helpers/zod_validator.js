import { decodeFormData, decodeNestedFields } from './form_decoder';
export const safeParseForm = (form, schema) => {
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
    }
    else {
        // format the errors in a more readable way
        const errors = {};
        for (const err of validation.error.issues) {
            if (errors[err.path[0]]) {
                errors[err.path[0]] += ', ' + err.message;
            }
            else {
                errors[err.path[0]] = err.message;
            }
        }
        return {
            data: undefined,
            errors: errors
        };
    }
};
