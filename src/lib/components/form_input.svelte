<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	// input specific properties
	export let name: string;
	export let label: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let type: 'text' | 'date' | 'number' | 'email' | 'password' | 'file' | 'url' | 'tel' =
		'text';
	export let value: string | number | Date | '' | undefined = '';
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
		{#if type === 'text'}
			<input
				id={name}
				type="text"
				{name}
				{placeholder}
				class={inputClass}
				autocomplete={autocomplete ? 'on' : null}
				{disabled}
				bind:value
				on:change
				on:input
				{...$$restProps}
			/>
		{:else if type === 'date'}
			<input
				id={name}
				type="date"
				{name}
				{placeholder}
				class={inputClass}
				autocomplete={autocomplete ? 'on' : null}
				{disabled}
				bind:value
				on:change
				on:input
				{...$$restProps}
			/>
		{:else if type === 'number'}
			<input
				id={name}
				type="number"
				{name}
				{placeholder}
				class={inputClass}
				autocomplete={autocomplete ? 'on' : null}
				{disabled}
				bind:value
				on:change
				on:input
				{...$$restProps}
			/>
		{:else if type === 'email'}
			<input
				id={name}
				type="email"
				{name}
				{placeholder}
				class={inputClass}
				autocomplete={autocomplete ? 'on' : null}
				{disabled}
				bind:value
				on:change
				on:input
				{...$$restProps}
			/>
		{:else if type === 'password'}
			<input
				id={name}
				type="password"
				{name}
				{placeholder}
				class={inputClass}
				autocomplete={autocomplete ? 'on' : null}
				{disabled}
				bind:value
				on:change
				on:input
				{...$$restProps}
			/>
		{:else if type === 'file'}
			<input
				id={name}
				type="file"
				{name}
				{placeholder}
				class={inputClass}
				autocomplete={autocomplete ? 'on' : null}
				{disabled}
				bind:value
				on:change
				on:input
				{...$$restProps}
			/>
		{:else if type === 'url'}
			<input
				id={name}
				type="url"
				{name}
				{placeholder}
				class={inputClass}
				autocomplete={autocomplete ? 'on' : null}
				{disabled}
				bind:value
				on:change
				on:input
				{...$$restProps}
			/>
		{:else if type === 'tel'}
			<input
				id={name}
				type="tel"
				{name}
				{placeholder}
				class={inputClass}
				autocomplete={autocomplete ? 'on' : null}
				{disabled}
				bind:value
				on:change
				on:input
				{...$$restProps}
			/>
		{/if}
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
