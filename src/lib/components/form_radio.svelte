<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	// input specific properties
	export let name: string;
	export let label: string | undefined = undefined;
	export let checked: boolean = false;
	export let disabled: boolean = false;
	export let value: string | number | undefined = '';

	// Css classes
	export let containerClass: string | undefined = undefined;
	export let inputContainerClass: string | undefined = undefined;
	export let inputClass: string | undefined = undefined;
	export let labelClass: string | undefined = undefined;
	export let errorClass: string | undefined = undefined;

	// errors
	export let error: string | undefined = undefined;
	const errors: Writable<Record<string, string>> = getContext('sveltekit-forms-errors');
	$: error = $errors[name];
</script>

<div class={containerClass}>
	<div class={inputContainerClass}>
		<slot name="leading" {error} />
		<input
			id={name}
			type="radio"
			{name}
			class={inputClass}
			{disabled}
			{checked}
			{value}
			on:change
			on:input
			{...$$restProps}
		/>
		<slot name="label" {error}>
			<label for={name} class={labelClass}>{label || value}</label>
		</slot>
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
