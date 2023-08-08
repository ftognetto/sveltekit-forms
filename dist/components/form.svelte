<script>import { applyAction, enhance } from "$app/forms";
import { createEventDispatcher, setContext } from "svelte";
import { writable } from "svelte/store";
const dispatch = createEventDispatcher();
export let action = void 0;
export let submitLabel = "Salva";
let formClass = void 0;
export { formClass as class };
export let footerClass = void 0;
export let submitButtonClass = void 0;
export let errorClass = void 0;
export let onBeforeSubmit = void 0;
export let resetOnSuccess = true;
export let customEnhance = void 0;
export let disabled = false;
export let automaticallyDisableUi = true;
export let handleErrors = true;
export let id = `sveltekit-form-${Math.random().toString(36).substr(2, 9)}`;
const errors = writable({});
setContext(`sveltekit-forms-errors`, errors);
$:
  error = $errors?.generic;
let submitting = false;
let busy = false;
const _enhance = (event) => {
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
    dispatch("result", result);
    if (result.type === "success")
      dispatch("success", result);
    if (result.type === "failure")
      dispatch("failure", result);
    if (result.type === "error")
      dispatch("error", result);
    if (result.type === "failure") {
      errors.set(result.data?.errors ?? {});
      await update({ reset: resetOnSuccess });
    } else if (handleErrors && result.type === "error") {
      errors.set({ generic: result.error.message });
      await applyAction({
        status: result.status || 400,
        type: "failure",
        data: { errors: { generic: result.error.message } }
      });
    } else {
      errors.set({});
      await update({ reset: resetOnSuccess });
    }
    if (result.type === "success")
      dispatch("successAfterUpdate", result);
    reEnableUI();
    submitting = false;
    busy = false;
  };
};
const disableUI = (form) => {
  if (!automaticallyDisableUi)
    return () => {
    };
  form.querySelectorAll("button").forEach((node) => node.disabled = true);
  return () => {
    form.querySelectorAll("button").forEach((node) => node.disabled = false);
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
<form {id} {action} method="POST" use:enhance={customEnhance || _enhance} class={formClass}>
	<!-- Slot for inputs -->
	<slot errors={$errors} />

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
