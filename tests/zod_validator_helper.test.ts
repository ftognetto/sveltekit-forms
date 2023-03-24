import { expect, test, vitest } from 'vitest';
import z from 'zod';
import { safeParseForm } from '../src/lib/helpers/zod_validator';
import {
	zEmail,
	zNumber,
	zString,
	zStringArray,
	zStringOptional
} from '../src/lib/helpers/zod_validator_helper';
test('zod validator helper', () => {
	const a = zString.parse('hello');
	expect(a).toBe('hello');
	const b = zString.safeParse(1);
	expect(b.success).toBe(false);
	const c = zString.safeParse(null);
	expect(c.success).toBe(false);
	const d = zString.safeParse(undefined);
	expect(d.success).toBe(false);
	const e = zString.safeParse('');
	expect(e.success).toBe(false);
	const f = zStringOptional.parse('');
	expect(f).toBe(undefined);
	const g = zStringOptional.parse(undefined);
	expect(g).toBe(undefined);
	const h = zStringOptional.parse(null);
	expect(h).toBe(null);
});

test('zod validator helper', () => {
	const schema = z.object({
		name: z.string(),
		age: zNumber,
		email: zEmail,
		address: zStringOptional
	});
	const validation = safeParseForm({ name: 'hello' }, schema);
});

class FormDataMock {
	append: (name: string, value: string | Blob, fileName?: string) => void = vitest.fn();
	delete: (name: string) => void = vitest.fn();
	get: (name: string) => FormDataEntryValue | null = vitest.fn();
	getAll: (name: string) => FormDataEntryValue[] = vitest.fn();
	has: (name: string) => boolean = vitest.fn();
	set: (name: string, value: string | Blob, fileName?: string) => void = vitest.fn();
	forEach: (
		callbackfn: (value: FormDataEntryValue, key: string, parent: FormData) => void,
		thisArg?: any
	) => void = vitest.fn();
}
// @ts-ignore
global.FormData = FormDataMock;

// test('zod validator helper - checkboxes', () => {
// 	const schema = z.object({
// 		checkboxes: z.array(z.string())
// 	});
// 	const formdata = new FormData();
// 	formdata.append('checkboxes', 'hello');
// 	formdata.append('checkboxes', 'world');
// 	const data = decodeFormData(formdata);
// 	expect(data).toEqual({ checkboxes: ['hello', 'world'] });
// });

test('zod validator helper - arrays', () => {
	const schema = z.object({
		array: zStringArray
	});
	const { data, errors } = safeParseForm({ array: ['hello', 'world'] }, schema);
	expect(data).toEqual({ array: ['hello', 'world'] });
	expect(errors).toBe(undefined);

	const { data: data2, errors: errors2 } = safeParseForm({ array: 'hello' }, schema);
	expect(data2).toStrictEqual({ array: ['hello'] });
	expect(errors2).toEqual(undefined);
});
