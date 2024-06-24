<script lang="ts">
	import type { Question } from "$lib/types";

	export let question: Question;
	export let currentAnswer: any = undefined;
</script>

<textarea required={question.required} id={question.title} class="resize-none w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="Your answer here" rows="4"></textarea>
