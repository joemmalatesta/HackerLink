<script lang="ts">
	import type { Question } from "$lib/types";

	export let question: Question;
	export let currentAnswer;
	let options: string[] = question.options as string[]
</script>

{#each options as option}
	<input
		type="checkbox"
		id={option}
		name={option}
		value={option}
		class="checked:bg-red-600 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
	/>
	<label for={option}></label>
{/each}
