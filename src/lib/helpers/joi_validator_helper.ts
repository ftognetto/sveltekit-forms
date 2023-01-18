import Joi from 'joi';

// String
export const joiString = Joi.string();
export const joiStringRequired = joiString.required();
export const joiStringOptional = joiString.empty(null);

// Zip code
export const joiZip = Joi.string()
	.regex(/^(\s*|\d+)$/)
	.length(5)
	.messages({ 'string.pattern.base': '"Cap" il valore deve essere numerico' });
export const joiZipRequired = joiZip.required();
export const joiZipOptional = joiZip.empty(null);

// Vat code
export const joiVatCode = Joi.alternatives(
	Joi.string().min(9),
	Joi.number()
		.integer()
		.min(10 ** 8)
);
export const joiVatCodeRequired = joiVatCode.required();
export const joiVatCodeOptional = joiVatCode.empty(null);

// Date
export const joiDate = Joi.string().isoDate();
export const joiDateRequired = joiDate.required();
export const joiDateOptional = joiDate.empty(null);

// Number
export const joiNumber = Joi.number();
export const joiNumberRequired = joiNumber.required();
export const joiNumberOptional = joiNumber.empty(null);

// Mix
export const joiStringOrNumber = Joi.alternatives(joiString, joiNumber);
export const joiStringOrNumberRequired = joiStringOrNumber.required();
export const joiStringOrNumberOptional = joiStringOrNumber.empty(null);

// Boolean
export const joiBoolean = Joi.boolean();
export const joiBooleanRequired = joiBoolean.required();
export const joiBooleanOptional = joiBoolean.allow(null).empty(null);

// Email
export const joiEmail = Joi.string().email({ tlds: { allow: false } });
export const joiEmailRequired = joiEmail.required();
export const joiEmailOptional = joiEmail.empty(null);
