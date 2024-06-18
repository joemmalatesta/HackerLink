<script lang="ts">
	import type { Question } from "$lib/types";

	export let question: Question;
	export let currentAnswer;
</script>

<!-- svelte-ignore a11y-autofocus -->
<input autofocus type="text" class="w-full text-xl border-b-2 focus:outline-none focus:placeholder:opacity-0 placeholder:transition-all" placeholder="Your answer here">
