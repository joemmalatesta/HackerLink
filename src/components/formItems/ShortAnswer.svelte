<script lang="ts">
	import type { Question } from "$lib/types";

	export let question: Question;
	export let currentAnswer: any = undefined;
</script>

<!-- svelte-ignore a11y-autofocus -->
<input autofocus bind:value={currentAnswer}  required={question.required} id={question.title} type="text" class="pt-2 focus:border-neutral-800 w-full text-xl border-b-2 focus:outline-none " placeholder="Your answer here">
