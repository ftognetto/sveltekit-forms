<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	// textarea specific properties
	export let name: string;
	export let label: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let value: string | number | '' | undefined = '';
	export let autocomplete: boolean = false;
	export let disabled: boolean = false;

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
</script>

<div class={containerClass}>
	<slot name="label" {error}>
		{#if label}
			<label for={name} class={labelClass}>{label}</label>
		{/if}
	</slot>
	<div class={inputContainerClass}>
		<slot name="leading" {error} />
		<textarea
			id={name}
			{name}
			{placeholder}
			class={inputClass}
			autocomplete={autocomplete ? 'on' : null}
			{disabled}
			{value}
			on:change
			on:input
			{...$$restProps}
		/>
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
