<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	// select specific properties
	export let name: string;
	export let label: string | undefined = undefined;
	export let placeholder: string = label || name;
	export let value: string | number | '' | undefined = '';
	export let disabled: boolean = false;
	export let options: { value: string | number; label: string }[];

	// Css classes
	export let containerClass: string | undefined = undefined;
	export let inputContainerClass: string | undefined = undefined;
	export let inputClass: string | undefined = undefined;
	export let labelClass: string | undefined = undefined;
	export let errorClass: string | undefined = undefined;

	// errors
	export let error: string | undefined = undefined;
	const errors: Writable<Record<string, string>> = getContext('sveltekit-forms-errors');
	$: error = $errors && $errors[name];

	$: value = value && options.map((o) => o.value).includes(value) ? value : options[0].value;
</script>

<div class={containerClass}>
	<slot name="label" {error}>
		{#if label}
			<label for={name} class={labelClass}>{label}</label>
		{/if}
	</slot>
	<div class={inputContainerClass}>
		<slot name="leading" {error} />
		<select
			id={name}
			{name}
			{placeholder}
			class={inputClass}
			{disabled}
			{value}
			on:change
			{...$$restProps}
		>
			{#each options as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
		<slot name="trailing" {error} />
	</div>
	{#if error}
		<slot name="error">
			<div class={errorClass}>
				{@html error.split(',').join('<br/>')}
			</div>
		</slot>
	{/if}
</div>
