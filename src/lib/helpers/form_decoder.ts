type StructuredFormData =
	| string
	| boolean
	| number
	| File
	| undefined
	| null
	| StructuredFormData[];

export const decodeForm = (formData: FormData): Record<string, any> => {
	return [...formData.entries()].reduce((data, [key, v]) => {
		if (key === 'submit') {
			return data;
		}
		let value: StructuredFormData = v;
		if (v === '') value = null;
		else if (v === 'undefined') value = undefined;
		else if (v === 'true') value = true;
		else if (v === 'on') value = true;
		else if (v === 'false') value = false;
		else if (!isNaN(Number(v))) value = Number(v);
		else if (v instanceof Date) value = v.toISOString();

		// For grouped fields like multi-selects and checkboxes, we need to
		// store the values in an array.
		if (key in data || key.endsWith('[]')) {
			key = key.replace('[]', '');
			const val = data[key];
			value = val ? (Array.isArray(val) ? [...val, value] : [val, value]) : [value];
		}

		data[key] = value;

		return data;
	}, {} as Record<string, StructuredFormData>);
};
