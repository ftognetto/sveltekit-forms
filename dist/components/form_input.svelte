<script>import { getContext } from "svelte";
export let name;
export let label = void 0;
export let placeholder = void 0;
export let type = "text";
export let value = "";
export let autocomplete = false;
export let disabled = false;
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
				class={error ? errorInputClass || inputClass : inputClass}
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
				class={error ? errorInputClass || inputClass : inputClass}
				autocomplete={autocomplete ? 'on' : null}
				{disabled}
				bind:value
				on:change
				on:input
				{...$$restProps}
			/>
		{:else if type === 'datetime-local'}
			<input
				id={name}
				type="datetime-local"
				{name}
				{placeholder}
				class={error ? errorInputClass || inputClass : inputClass}
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
				class={error ? errorInputClass || inputClass : inputClass}
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
				class={error ? errorInputClass || inputClass : inputClass}
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
				class={error ? errorInputClass || inputClass : inputClass}
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
				class={error ? errorInputClass || inputClass : inputClass}
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
				class={error ? errorInputClass || inputClass : inputClass}
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
				class={error ? errorInputClass || inputClass : inputClass}
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
			<div class={errorContainerClass}>
				{@html error.split(',').join('<br/>')}
			</div>
		</slot>
	{/if}
</div>
