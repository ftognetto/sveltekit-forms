export const decodeForm = (formData) => {
    return [...formData.entries()].reduce((data, [key, v]) => {
        if (key === 'submit') {
            return data;
        }
        let value = v;
        if (v === '')
            value = null;
        else if (v === 'undefined')
            value = undefined;
        else if (v === 'true')
            value = true;
        else if (v === 'on')
            value = true;
        else if (v === 'false')
            value = false;
        else if (!isNaN(Number(v)))
            value = Number(v);
        else if (v instanceof Date)
            value = v.toISOString();
        // For grouped fields like multi-selects and checkboxes, we need to
        // store the values in an array.
        if (key in data || key.endsWith('[]')) {
            key = key.replace('[]', '');
            const val = data[key];
            value = val ? (Array.isArray(val) ? [...val, value] : [val, value]) : [value];
        }
        data[key] = value;
        return data;
    }, {});
};
export const decodeNestedFields = (data) => {
    // if in data there are fields with dot i assume that they are nested objects
    // and i transform them in nested objects
    for (const [key, value] of Object.entries(data)) {
        if (key.includes('.')) {
            const keys = key.split('.');
            const lastKey = keys.pop();
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
    return data;
};
export const decodeFormData = (data) => {
    var object = {};
    data.forEach((value, key) => {
        // Reflect.has in favor of: object.hasOwnProperty(key)
        if (!Reflect.has(object, key)) {
            if (value && value.length) {
                object[key] = value;
            }
            else {
                object[key] = undefined;
            }
            return;
        }
        // For grouped fields like multi-selects and checkboxes, we need to
        // store the values in an array.
        if (!Array.isArray(object[key])) {
            object[key] = [object[key]];
        }
        object[key].push(value);
    });
    return object;
};
