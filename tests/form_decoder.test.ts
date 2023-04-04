import { test } from 'vitest';

test('form decoder', () => {
	const form = new FormData();
	form.append('stringfull', 'hello');
	form.append('stringempty', '');
	form.append('numberfull', '1');
	form.append('numberempty', '');
	form.append('numberinvalid', 'hello');
	form.append('checkboxfull', 'on');
	form.append('checkboxempty', '');
	form.append('checkboxinvalid', 'hello');
	form.append('manycheckboxes', 'a');
	form.append('manycheckboxes', 'b');
	form.append('manycheckboxes', 'c');
});
