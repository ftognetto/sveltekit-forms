<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let name: string;
	// errors
	const errors: Writable<Record<string, string>> = getContext('sveltekit-forms-errors');
	$: error = $errors && $errors[name];
</script>

<div class={$$props.class}>
	<slot {error} />
</div>
