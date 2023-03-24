<script>import { getContext } from "svelte";
export let name;
export let label = void 0;
export let placeholder = label || name;
export let value = "";
export let disabled = false;
export let options;
export let containerClass = void 0;
export let inputContainerClass = void 0;
export let inputClass = void 0;
export let labelClass = void 0;
export let errorClass = void 0;
export let error = void 0;
const errors = getContext("sveltekit-forms-errors");
$:
  error = $errors[name];
$:
  value = value && options.map((o) => o.value).includes(value) ? value : options[0].value;
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
