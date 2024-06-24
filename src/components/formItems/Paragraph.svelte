<script lang="ts">
	import type { Question } from "$lib/types";

	export let question: Question;
	export let currentAnswer: any = undefined;
</script>

<!-- svelte-ignore a11y-autofocus -->
<textarea required={question.required} id={question.title} autofocus class="focus:border-neutral-800 resize-none w-full px-3 py-2 text-gray-700 border-2 rounded-lg focus:outline-none" placeholder="Your answer here" rows="4"></textarea>
