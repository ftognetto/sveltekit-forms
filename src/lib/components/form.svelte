<script lang="ts">
	// input
	// validazione input
	// error generico
	// submit
	// loading ui

	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	/**
	 * The action of the form. Can be undefined
	 */
	export let action: string | undefined = undefined;

	/**
	 * The label to display into the default submit button.
	 *
	 * If the "submit" slot is overridden with custom content this property will not be used
	 */
	export let submitLabel: string | undefined = 'Salva';

	// /**
	//  * A delete action of the form. If specified also [action] must be specified
	//  */
	//  export let deleteAction: string | undefined = undefined;

	// /**
	//  * The label to display into the delete submit button.
	//  *
	//  * If the "submit" slot is overridden with custom content this property will not be used
	//  */
	// export let deleteLabel: string | undefined = 'Elimina';

	/// CSS SECTION

	/**
	 * The form css class
	 */
	let formClass: string | undefined = undefined;
	export { formClass as class };

	/**
	 * The footer css class.
	 * Footer contains submit button
	 */
	export let footerClass: string | undefined = undefined;

	/**
	 * The submit button css class
	 */
	export let submitButtonClass: string | undefined = undefined;

	/**
	 * The generic error css class.
	 */
	export let errorClass: string | undefined = undefined;

	// /**
	//  * The submit button css class
	//  */
	// export let deleteButtonClass: string | undefined = undefined;

	/// ENHANCE HELPERS

	/**
	 * (Optional) If specified, this callback will be executed before form submitting.
	 *
	 * In the callback can also modify the ActionResult
	 * @param The event that triggered the submit
	 * @return void
	 */
	export let onBeforeSubmit: ((data: FormData) => boolean | undefined) | undefined = undefined;

	/**
	 * (Optional) If specified, this callback will be executed after a successful response from server side.
	 *
	 * In the callback can also modify the ActionResult
	 * @param The successful `ActionResult` returned from the server
	 * @return The `ActionResult` to apply
	 */
	export let onResult: ((result: ActionResult) => void) | undefined = undefined;

	/**
	 * (Optional) If specified, this callback will be executed after a successful response from server side.
	 *
	 * In the callback can also modify the ActionResult
	 * @param The successful `ActionResult` returned from the server
	 * @return The `ActionResult` to apply
	 */
	export let onSuccess: ((result: Extract<ActionResult, { type: 'success' }>) => void) | undefined =
		undefined;

	/**
	 * (Optional) If specified, this callback will be executed after a successful response from server side.
	 *
	 * In the callback can also modify the ActionResult
	 * @param The successful `ActionResult` returned from the server
	 * @return The `ActionResult` to apply
	 */
	export let onFailure: ((result: Extract<ActionResult, { type: 'failure' }>) => void) | undefined =
		undefined;

	export let customEnhance: SubmitFunction | undefined = undefined;

	/**
	 * Controls whether the form is disabled or not.
	 * This property disables the submit button.
	 * Default: false
	 */
	export let disabled: boolean = false;

	/**
	 * Choose wheter automatically disable the UI when submitting
	 * and re-enable it when the response is received
	 * Default: true
	 */
	export let automaticallyDisableUi: boolean = true;

	/// INTERNAL VARIABLES
	const errors = writable({} as Record<string, string>);
	setContext(`sveltekit-forms-errors`, errors);
	$: error = $errors?.generic;
	let submitting: boolean = false;
	let busy: boolean = false; // Whether the form is busy (submitting or any other custom actions)

	const _enhance: SubmitFunction = (event) => {
		if (submitting) {
			event.cancel();
		}
		submitting = event.action.search === action ? true : false;
		busy = true;

		const reEnableUI = disableUI(event.form);

		if (onBeforeSubmit) {
			const ok = onBeforeSubmit(event.data);
			if (ok === false) {
				event.cancel();
				submitting = false;
				busy = false;
				reEnableUI();
			}
		}

		return async ({ result, update }) => {
			// custom callbacks
			if (onResult) onResult(result);
			else if (result.type === 'success' && onSuccess) onSuccess(result);
			else if (result.type === 'failure' && onFailure) onFailure(result);

			if (result.type === 'failure') {
				// update error context
				errors.set(result.data?.errors ?? {});
			} else {
				errors.set({});
			}

			// update form
			await update();

			// update loading ui
			reEnableUI();
			submitting = false;
			busy = false;
		};
	};

	const disableUI = (form: HTMLFormElement) => {
		if (!automaticallyDisableUi) return () => {};
		form.querySelectorAll('button').forEach((node) => (node.disabled = true));
		// non disabilito i campi perché potrebbero essere disabilitati per altri scopi
		// form.querySelectorAll('input').forEach((node) => (node.disabled = true));
		// form.querySelectorAll('textarea').forEach((node) => (node.disabled = true));
		// form.querySelectorAll('select').forEach((node) => (node.disabled = true));
		return () => {
			form.querySelectorAll('button').forEach((node) => (node.disabled = false));
			// form.querySelectorAll('input').forEach((node) => (node.disabled = false));
			// form.querySelectorAll('textarea').forEach((node) => (node.disabled = false));
			// form.querySelectorAll('select').forEach((node) => (node.disabled = false));
		};
	};
</script>

<!--
@component
A Form component that wraps the sveltekit form actions.
It automatically create a form with error and submit handling.
- You can use the input exported from this package like FormInput, FormRadio, FormSelect...
- You can execute async actions on succesful or invalid responses and also modify the ActionResult to be applied.
- Usage:
  ```tsx
  <Form
	action="?/createUser"
	submitLabel="Save"
	onSuccess={async (_) => {
		alert('User saved successfully!')
	}}
	>
	```
  -->
<form
	{action}
	method="POST"
	use:enhance={customEnhance || _enhance}
	class={formClass}
	novalidate={true}
>
	<!-- Slot for inputs -->
	<slot />

	<!-- Slot for displaying 'generic' error -->
	<slot name="error" {error}>
		{#if error}
			<div class={errorClass}>
				{error}
			</div>
		{/if}
	</slot>

	<!-- Slot for submit button -->
	<div class={footerClass}>
		<slot name="otherActionsLeft" {submitting} {busy} />
		<slot name="submit" {submitting} {busy}>
			<button type="submit" {disabled} class={submitButtonClass}>
				{#if submitting}
					<slot name="submitting" {submitting} {busy}>In progress...</slot>
				{/if}
				{submitLabel}
			</button>
		</slot>
		<slot name="otherActionsRight" {submitting} {busy} />
	</div>
</form>
