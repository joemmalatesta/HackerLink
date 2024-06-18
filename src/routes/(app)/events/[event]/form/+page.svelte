<script lang="ts">
	import type { Question, QuestionType } from "$lib/types";
	import { onMount } from "svelte";
	import AddFormQuestionModal from "../../../../../components/AddFormQuestionModal.svelte";
	import toast, { Toaster } from "svelte-french-toast";

	import { dndzone, type DndEvent } from "svelte-dnd-action";
	import { enhance } from "$app/forms";
	export let data;
	export let form;
	$: if (form?.success) toast.success(form?.success);
	$: if (form?.error) toast.error(form?.error);

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

	let hoveredQuestion: number;
</script>

<!-- ADD SKELETONS IF NOT BROTHER -->
{#if questions}
	<div class="flex flex-grow min-h-full">
		<!-- PUBLISH FORM -->
		<form class="absolute left-60" use:enhance action="?/publish" method="POST">
			<input type="text" name="eventId" bind:value={eventId} class="hidden" />
			<input name="questions" value={JSON.stringify(questions)} class="hidden" />
			<button class="flex gap-1 font-medium items-center text-lg bg-indigo-200 p-2 rounded-md hover:bg-indigo-300">Publish form <img src="/send.svg" alt="send"></button>
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
						<p class="h-12 w-3/4 overflow-ellipsis overflow-hidden flex items-start justify-st">{question.title}</p>
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
		<section class="w-full flex justify-center items-center">
			{questions[selectedQuestion].title}
		</section>
	</div>
	{#if showNewQuestionModal}
		<AddFormQuestionModal bind:showNewQuestionModal on:submit={addNewQuestion} />
	{/if}
{/if}
<!-- MF toaster this thing is lit -->
<Toaster position={"bottom-center"} />
