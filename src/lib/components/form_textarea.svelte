<script lang="ts">
	import { page } from '$app/stores';

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
	$: error = $page.form?.errors && $page.form?.errors[name];
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
		/>
		<slot name="trailing" {error} />
	</div>
	{#if error}
		<slot name="error">
			<div class={errorClass}>
				{@html $page.form?.errors[name].split(',').join('<br/>')}
			</div>
		</slot>
	{/if}
</div>
