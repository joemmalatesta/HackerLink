<script lang="ts">
	import type { Answer, Question } from "$lib/types";
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
	import { page } from "$app/stores";
	import { Toaster, toast } from "svelte-french-toast";
	import SubmissionScreen from "../../../components/formItems/SubmissionScreen.svelte";
	let slug = $page.params["formSlug"];
	export let data;

	let questions: Question[];
	$: questions = data.questions;
	let answers: any;
	let eventName: string
	$: eventName = data.eventName



	$: if (browser) {
		// Local storage unused now but soon for saving answers
		localStorage.setItem("questions", JSON.stringify(questions));
		localStorage.setItem("answers", JSON.stringify(answers));
		document.addEventListener("keydown", handleNext);
	}

	// Need to reset this on each element change
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

	let submitted: boolean = false;
	let redirectUrl: string | null;
	async function handleSubmit() {
		// not very DRY of me... (see handleNext)
		if (activeQuestion.required == true && currentAnswer == undefined) {
			requiredError = true;
		} else {
			requiredError = false;
			// Add answer to array
			allAnswers[currentQuestionId].answer = currentAnswer;
			allAnswers = [...allAnswers];
		}
		let response = await fetch("/api/SubmitAnswers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ slug, answers: JSON.stringify(allAnswers) }),
		});
		let responseData = await response.json();
		if (responseData.success) {
			submitted = true;
		} else {
			toast.error("Error submitting. Try again");
		}
	}

	let requiredError: boolean = false;
	let allAnswers: Answer[] = [];
	// Initialize the answers array when questions data is available
	$: if (questions && questions.length) {
		allAnswers = questions.map((question) => ({
			id: question.id,
			title: question.title,
			answer: undefined,
		}));
	}

	function nextQuestion() {
		if (activeQuestion.required == true && currentAnswer == undefined) {
			requiredError = true;
		} else {
			requiredError = false;
			// Add answer to array
			allAnswers[currentQuestionId].answer = currentAnswer;
			allAnswers = [...allAnswers];
			// Reset answer
			currentAnswer = undefined;
			currentQuestionId += 1;

			//maybe superfluous
			currentAnswer = allAnswers[currentQuestionId].answer;
		}
	}
</script>

<div class="absolute left-1/2 -translate-x-1/2 bottom-1/2 w-[40rem]">
	{#if submitted}
	<SubmissionScreen eventName={eventName} redirectUrl={data.redirectUrl}/>
	{:else}
	{#key activeQuestion}
		<div class="gap-3 flex flex-col justify-start items-start" transition:slide={{ duration: 300 }}>
			<div class="flex flex-col items-start">
				{#if previousQuestion}
					<!-- BACK BUTTON (maybe move to bottom) -->
					<button
						class="flex text-sm gap-2 items-center"
						on:click={() => {
							currentQuestionId -= 1;
							// Set current answer to what was previously answered
							currentAnswer = allAnswers[currentQuestionId].answer;
						}}
					>
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
					<button bind:this={nextButton} on:click={nextQuestion}>Next</button>
				{/if}
			</div>
			{#if requiredError}
				<p class="text-sm text-red-400">This question is required</p>
			{/if}
		</div>
	{/key}
	{/if}
</div>
<Toaster position={"bottom-center"} />
