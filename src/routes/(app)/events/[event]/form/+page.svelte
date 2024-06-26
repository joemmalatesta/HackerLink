<script lang="ts">
	import type { Question, QuestionType } from "$lib/types";
	import { onMount } from "svelte";
	import AddFormQuestionModal from "../../../../../components/AddFormQuestionModal.svelte";
	import toast, { Toaster } from "svelte-french-toast";

	import { dndzone, type DndEvent } from "svelte-dnd-action";
	import { enhance } from "$app/forms";
	import ShortAnswer from "../../../../../components/formItems/ShortAnswer.svelte";
	import Paragraph from "../../../../../components/formItems/Paragraph.svelte";
	import MultipleChoice from "../../../../../components/formItems/MultipleChoice.svelte";
	import TrueFalse from "../../../../../components/formItems/TrueFalse.svelte";
	import FileUpload from "../../../../../components/formItems/FileUpload.svelte";
	import Checkboxes from "../../../../../components/formItems/Checkboxes.svelte";
	import QuestionSelector from "../../../../../components/formItems/QuestionSelector.svelte";
	export let data;
	export let form;

	let questions: Question[];
	let selectedQuestion = 1;
	let eventId: string | undefined;
	let eventName: string;
	$: eventName = data.eventName;
	$: eventId = data.eventId;
	$: questions = data.questions;

	// DNDZONE FUNCTIONS
	function handleConsider(event: CustomEvent<DndEvent<Question>>) {
		questions = event.detail.items;
	}

	async function handleFinalize(event: CustomEvent<DndEvent<Question>>) {
		questions = event.detail.items;
		questions.forEach((question, index) => {
			question.id = index + 1;
		});
		// Save Questions each time the question order is changed.
		await saveChanges(questions);
	}

	// Stuff for handling new question
	let showNewQuestionModal = false;
	async function addNewQuestion(event: any) {
		// Update placeholder ID to add to end of list.
		let newQuestion: Question = event.detail.newQuestion;
		newQuestion.id = questions.length + 1;

		// Add new question to end of list
		questions.push(newQuestion);
		// Reassign the array to itself to trigger Svelte reactivity
		questions = [...questions];
		showNewQuestionModal = false;
		// Save Questions when a new one is added.
		await saveChanges(questions);
	}

	// async function deleteQuestion(index: number) {
	// 	questions.splice(index, 1)
	// 	console.log(questions)
	// 	questions.forEach((question, index) => {
	// 		question.id = index + 1;
	// 	});
	// 	questions = [...questions]
	// 	await saveChanges(questions)
	// }

	async function saveChanges(updatedQuestions: Question[]) {
		let response = await fetch("/api/SaveFormChanges", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ eventId: eventId, updatedQuestions: JSON.stringify(updatedQuestions) }),
		});
		return await response.json();
	}

	let hoverPublish: boolean;
	let hoveredQuestion: number;

	$: console.log(questions);
</script>

<!-- ADD SKELETONS IF NOT BROTHER -->
{#if questions}
	<div class="flex flex-grow min-h-full">
		<!-- PUBLISH FORM -->
		<form
			class="absolute left-60"
			use:enhance={({}) => {
				return async ({ result }) => {
					if (result.type == "success") {
						if (result.data?.success) toast.success(String(result.data.success));
						else if (result.data?.error) toast.error(String(result.data.error));
					}
				};
			}}
			action="?/publish"
			method="POST"
		>
			<input name="questions" value={JSON.stringify(questions)} class="hidden" />
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<button
				class="flex gap-1 font-medium items-center text-lg bg-white p-2 rounded-md border-black border-2 hover:bg-black hover:text-white"
				on:mouseover={() => (hoverPublish = true)}
				on:mouseleave={() => (hoverPublish = false)}
				on:click={() => {
					if (!questions) console.log("no questions");
				}}
				>Publish form <svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke={hoverPublish ? "#fff" : "#000"}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="icon icon-tabler icons-tabler-outline icon-tabler-send-2"
					><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
						d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z"
					/><path d="M6.5 12h14.5" /></svg
				></button
			>
		</form>
		<!-- LEFT SIDE BAR (could be it's own component tbh.) -->
		<div class="flex flex-col">
			<section
				class="h-full flex flex-col border-r-1"
				use:dndzone={{ items: questions, dropTargetStyle: {}, morphDisabled: true }}
				on:consider={handleConsider}
				on:finalize={handleFinalize}
			>
				{#each questions as question, index (question.id)}
					<!-- svelte-ignore a11y-mouse-events-have-key-events -->
					<button
						on:mouseover={() => {
							hoveredQuestion = index;
						}}
						on:click={() => (selectedQuestion = index)}
						class={`h-15 flex justify-around py-1 w-60 border-b hover:bg-gray-300 ${selectedQuestion == index ? "bg-gray-300/60" : ""}`}
					>
						<div class="w-1/4 flex flex-col items-center justify-around h-full">
							<p class="font-semibold text-sm">{question.id}</p>
							<img src={`/icons/${question.type}.svg`} height="12" width="20" alt={question.type} />
						</div>
						<!-- Figure out how to get ... if it's too long -->
						<p class="h-12 w-3/4 overflow-ellipsis overflow-hidden flex items-start justify-start">{question.title}</p>
						<!-- <button on:click={() => {deleteQuestion(index)}} class={` ${index == hoveredQuestion ? "opacity-100 translate-x-4" : "opacity-0"} transition-all translate-y-3`}>
						<img src="/trash.svg" alt="">
					  </button> -->
					</button>
				{/each}
			</section>
			<button
				class="flex justify-center w-full"
				on:click={() => {
					showNewQuestionModal = true;
				}}>Add Question</button
			>
		</div>
		<!-- Main section showing current question. -->
		<section class="flex justify-center items-center w-full">
			<div class="w-[30rem] flex flex-col items-start justify-start">
				<p class="text-2xl">{questions[selectedQuestion].title}</p>
				<QuestionSelector question={questions[selectedQuestion]} />
			</div>
		</section>
	</div>
	{#if showNewQuestionModal}
		<AddFormQuestionModal bind:showNewQuestionModal on:submit={addNewQuestion} />
	{/if}
{/if}
<!-- MF toaster this thing is lit -->
<Toaster position={"bottom-center"} />
