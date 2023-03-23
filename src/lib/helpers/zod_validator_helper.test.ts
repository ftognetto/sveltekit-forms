import { expect, test } from 'vitest';
import z from 'zod';
import { safeParseForm } from './zod_validator';
import { zEmail, zNumber, zString, zStringOptional } from './zod_validator_helper';
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
