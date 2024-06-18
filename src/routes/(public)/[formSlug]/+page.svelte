<script lang="ts">
	import type { Question } from "$lib/types";
	import type { QuestionType } from "$lib/types";
	import Checkboxes from "../../../components/formItems/Checkboxes.svelte";
	import FileUpload from "../../../components/formItems/FileUpload.svelte";
	import MultipleChoice from "../../../components/formItems/MultipleChoice.svelte";
	import TrueFalse from "../../../components/formItems/TrueFalse.svelte";
	import ShortAnswer from "../../../components/formItems/ShortAnswer.svelte";
	import LongAnswer from "../../../components/formItems/LongAnswer.svelte";
	import { browser } from "$app/environment";
	import { fly, slide } from "svelte/transition";
	export let data;

	let questions: Question[];
	$: questions = data.questions;
	let answers: any;

	$: if (browser) {
		localStorage.setItem("questions", JSON.stringify(questions));
		localStorage.setItem("answers", JSON.stringify(answers));
	}

	// Get questions from data
	// Get user Id from data
	let activeQuestion: Question;
	let currentQuestionId: number = 0;
	let currentAnswer: any;
	$: activeQuestion = questions[currentQuestionId];

	function handleSubmit() {
		console.log("submitted!");
		// Call to server to verify all is answered and submit answers
	}
</script>

<div class="absolute left-1/2 -translate-x-1/2 bottom-1/2 ">
	{#key activeQuestion}
		<div class="gap-3 flex flex-col justify-start items-start" transition:slide={{ duration: 300 }}>
			<h1 class="text-3xl">{activeQuestion.title}</h1>
			{#if activeQuestion.type == "shortAnswer"}
				<ShortAnswer question={activeQuestion} bind:currentAnswer />
			{:else if activeQuestion.type == "longAnswer"}
				<LongAnswer question={activeQuestion} bind:currentAnswer />
			{:else if activeQuestion.type == "multipleChoice"}
				<MultipleChoice question={activeQuestion} bind:currentAnswer />
			{:else if activeQuestion.type == "trueFalse"}
				<TrueFalse question={activeQuestion} bind:currentAnswer />
			<!-- {:else if activeQuestion.type == "date"} -->
				<!-- <Date question={activeQuestion} bind:currentAnswer /> -->
			{:else if activeQuestion.type == "fileUpload"}
				<FileUpload question={activeQuestion} bind:currentAnswer />
			{:else if activeQuestion.type == "checkBoxes"}
				<Checkboxes question={activeQuestion} bind:currentAnswer />
			{/if}

			<div class="flex w-full gap-4">
				{#if currentQuestionId >= 1}
				<button
					on:click={() => {
						currentQuestionId -= 1;
					}}>Previous</button
				>
				{/if}
				{#if currentQuestionId == questions.length - 1}
					<button on:click={handleSubmit}>Submit</button>
				{:else}
					<button
						on:click={() => {
							currentQuestionId += 1;
						}}>Next</button
					>
				{/if}
			</div>
		</div>
	{/key}
</div>
