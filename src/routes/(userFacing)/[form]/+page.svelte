<script lang="ts">
	import type { Question } from "$lib/types";
	import type { QuestionType } from "$lib/types";
	import Checkboxes from "../../../components/formItems/Checkboxes.svelte";
	import FileUpload from "../../../components/formItems/FileUpload.svelte";
	import MultipleChoice from "../../../components/formItems/MultipleChoice.svelte";
	import TrueFalse from "../../../components/formItems/TrueFalse.svelte";
	import ShortAnswer from "../../../components/formItems/ShortAnswer.svelte";
	import LongAnswer from "../../../components/formItems/LongAnswer.svelte";
	import DateComponent from "../../../components/formItems/Date.svelte";
	import { browser } from "$app/environment";

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

{#if activeQuestion.type == "shortAnswer"}
	<ShortAnswer question={activeQuestion} bind:currentAnswer />
{:else if activeQuestion.type == "longAnswer"}
	<LongAnswer question={activeQuestion} bind:currentAnswer />
{:else if activeQuestion.type == "multipleChoice"}
	<MultipleChoice question={activeQuestion} bind:currentAnswer />
{:else if activeQuestion.type == "trueFalse"}
	<TrueFalse question={activeQuestion} bind:currentAnswer />
{:else if activeQuestion.type == "date"}
	<!-- <DateComponent question={activeQuestion} bind:currentAnswer /> -->
{:else if activeQuestion.type == "fileUpload"}
	<FileUpload question={activeQuestion} bind:currentAnswer />
{:else if activeQuestion.type == "checkBoxes"}
	<Checkboxes question={activeQuestion} bind:currentAnswer />
{/if}

{#if currentQuestionId == questions.length - 1}
	<button on:click={handleSubmit}>Submit</button>
{:else}
	<button on:click={() => {currentQuestionId += 1;}}>Next</button>
{/if}
