<script lang="ts">
	import type { Question } from "$lib/types";
	import type { QuestionType } from "$lib/types";
	import Checkboxes from "../../../components/formItems/Checkboxes.svelte";
	import FileUpload from "../../../components/formItems/FileUpload.svelte";
	import MultipleChoice from "../../../components/formItems/MultipleChoice.svelte";
	import TrueFalse from "../../../components/formItems/TrueFalse.svelte";
	import ShortAnswer from "../../../components/formItems/ShortAnswer.svelte";
	import { browser } from "$app/environment";
	import { fly, slide } from "svelte/transition";
	import Paragraph from "../../../components/formItems/Paragraph.svelte";
	import DatePicker from "../../../components/formItems/DatePicker.svelte";
	export let data;

	let questions: Question[];
	$: questions = data.questions;
	let answers: any;

	$: if (browser) {
		localStorage.setItem("questions", JSON.stringify(questions));
		localStorage.setItem("answers", JSON.stringify(answers));
		document.addEventListener("keydown", handleNext);
	}

	let nextButton: HTMLButtonElement;
	function handleNext(event: KeyboardEvent) {
		if (event.key === "Enter") {
			event.preventDefault();
			if (nextButton) {
				nextButton.click();
			}
		}
	}

	// Get questions from data
	// Get user Id from data
	let activeQuestion: Question;
	let currentQuestionId: number = 0;
	let currentAnswer: any = undefined;
	let previousQuestion: Question;
	$: activeQuestion = questions[currentQuestionId];
	$: previousQuestion = questions[currentQuestionId - 1];

	function handleSubmit() {
		console.log("submitted!");
		// Loop through all answers and questions and make sure their lengths match, and that each required question was answered 

		// Call to server to verify all is answered and submit answers - make route in /api folder 
	}

	let requiredError: boolean = false;
	interface Answers {
		id: number;
		title: string;
		answer: any;
	}
	let allAnswers: Answers[] = [];
	$: console.log(allAnswers);
</script>

<div class="absolute left-1/2 -translate-x-1/2 bottom-1/2 w-[40rem]">
	{#key activeQuestion}
		<div class="gap-3 flex flex-col justify-start items-start" transition:slide={{ duration: 300 }}>
			<div class="flex flex-col items-start">
				{#if previousQuestion}
					<button class="flex text-sm gap-2 items-center" on:click={() => (currentQuestionId -= 1)}>
						<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<img src="/chevronRight.svg" class="cursor-pointer scale-x-[-1] w-4 h-4" alt="" />
						<p>Question {previousQuestion.id}</p>
						<!-- <p>{previousQuestion.title}</p> -->
					</button>
				{/if}

				<h1 class="text-3xl">{activeQuestion.title}{activeQuestion.required ? "*" : ""}</h1>
			</div>
			{#if activeQuestion.type == "shortAnswer"}
				<ShortAnswer question={activeQuestion} bind:currentAnswer />
			{:else if activeQuestion.type == "paragraph"}
				<Paragraph question={activeQuestion} bind:currentAnswer />
			{:else if activeQuestion.type == "multipleChoice"}
				<MultipleChoice question={activeQuestion} bind:currentAnswer />
			{:else if activeQuestion.type == "trueFalse"}
				<TrueFalse question={activeQuestion} bind:currentAnswer />
			{:else if activeQuestion.type == "date"}
				<DatePicker question={activeQuestion} bind:currentAnswer />
			{:else if activeQuestion.type == "fileUpload"}
				<FileUpload question={activeQuestion} bind:currentAnswer />
			{:else if activeQuestion.type == "checkBoxes"}
				<Checkboxes question={activeQuestion} bind:currentAnswer />
			{/if}

			<div class="flex w-full gap-4">
				{#if currentQuestionId == questions.length - 1}
					<button on:click={handleSubmit}>Submit</button>
				{:else}
					<button
						bind:this={nextButton}
						on:click={() => {
							if (activeQuestion.required == true && currentAnswer == undefined) {
								requiredError = true;
							} else {
								// at what point do I make this function not inline
								requiredError = false
								allAnswers.push({id: currentQuestionId, title: activeQuestion.title, answer: currentAnswer});
								allAnswers = [...allAnswers];
								currentAnswer = undefined;
								currentQuestionId += 1;
							}
						}}>Next</button
					>
				{/if}
			</div>
			{#if requiredError}
				<p class="text-sm text-red-400">This question is required</p>
			{/if}
		</div>
	{/key}
</div>
