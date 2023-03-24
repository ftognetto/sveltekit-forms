import { joiItMessages } from './joi_it_messages';
export const validateForm = async (data, schema, options) => {
    // validation
    try {
        if (options?.language) {
            schema = schema.messages(options.language);
        }
        else {
            schema = schema.messages(joiItMessages);
        }
        await schema.validateAsync(data, {
            abortEarly: false,
            stripUnknown: true,
            errors: { language: 'it' }
        });
    }
    catch (e) {
        const errors = {};
        for (const err of e.details) {
            if (errors[err.path[0]]) {
                errors[err.path[0]] += ', ' + err.message;
            }
            else {
                errors[err.path[0]] = err.message;
            }
        }
        return errors;
    }
};
