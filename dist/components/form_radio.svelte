<script>import { getContext } from "svelte";
export let name;
export let label = void 0;
export let checked = false;
export let disabled = false;
export let value = "";
export let containerClass = void 0;
export let inputContainerClass = void 0;
export let inputClass = void 0;
export let errorInputClass = void 0;
export let labelClass = void 0;
export let errorContainerClass = void 0;
export let error = void 0;
const errors = getContext("sveltekit-forms-errors");
$:
  error = $errors && $errors[name];
</script>

<div class={containerClass}>
	<div class={inputContainerClass}>
		<slot name="leading" {error} />
		<input
			id={name}
			type="radio"
			{name}
			class={error ? errorInputClass || inputClass : inputClass}
			{disabled}
			{checked}
			bind:group={value}
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
			<div class={errorContainerClass}>
				{@html error.split(',').join('<br/>')}
			</div>
		</slot>
	{/if}
</div>
