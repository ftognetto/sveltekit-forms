<script>import { getContext } from "svelte";
export let name;
const errors = getContext("sveltekit-forms-errors");
$:
  error = $errors && $errors[name];
</script>

<div class={$$props.class}>
	<slot {error} />
</div>
