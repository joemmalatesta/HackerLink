<script lang="ts">
	import type { Question, QuestionType } from "$lib/types";
	import { onMount } from "svelte";
	import AddFormQuestionModal from "../../../../components/AddFormQuestionModal.svelte";

	import { dndzone, type DndEvent } from "svelte-dnd-action";

	export let form;
	$: console.log(form)
	let questions: Question[];
	let selectedQuestion = 1;
	let eventId: string | null

	// Make call to server to pass info about the current event ID
	onMount(async () => {
		eventId = sessionStorage.getItem("eventId");
		let response = await fetch("/api/GetFormQuestions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ eventId: eventId }),
		});
		questions = await response.json();
	});

	// DNDZONE FUNCTIONS
	function handleConsider(event: CustomEvent<DndEvent<Question>>) {
		questions = event.detail.items;
	}

	async function handleFinalize(event: CustomEvent<DndEvent<Question>>) {
		questions = event.detail.items;
		questions.forEach((question, index) => {
			question.id = index + 1;
		});
		// Save Questions
		await saveChanges(questions)
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
		// Save Questions
		await saveChanges(questions)
		}



async function saveChanges(updatedQuestions: Question[]) {
	let response = await fetch("/api/SaveFormChanges", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ eventId: eventId, updatedQuestions: JSON.stringify(updatedQuestions) }),
		});
		return await response.json()
}
</script>

<!-- ADD SKELETONS IF NOT BROTHER -->
{#if questions}
	<div class="flex">
		<div class="flex flex-col">
			<section
				class="h-full flex flex-col gap-1 m-1"
				use:dndzone={{ items: questions, dropTargetStyle: {}, morphDisabled: true }}
				on:consider={handleConsider}
				on:finalize={handleFinalize}
			>
				{#each questions as question, index (question.id)}
					<button on:click={() => (selectedQuestion = index)} class="h-12 flex gap-3 rounded-md justify-around p-2 w-60 outline">
						<div class="flex flex-col items-center justify-around h-full">
							<p class="font-semibold">{question.id}</p>
							<img src={`/icons/${question.type}.svg`} class="w-4" alt={question.type} />
						</div>

						<p class="flex justify-start items-start">{question.title}</p>
					</button>
					<!-- <div class="border-b border-gray-400/40 w-11/12 self-center"></div> -->
				{/each}
			</section>
			<button
				class="flex justify-center w-full"
				on:click={() => {
					showNewQuestionModal = true;
				}}>Add Question</button
			>
		</div>
		<section class="outline w-full">
			{questions[selectedQuestion].title}

			<form action="?/publish" method="POST">
				<input type="text" name="eventId" bind:value={eventId} class="hidden">
				<input name="questions" value={JSON.stringify(questions)} class="hidden">
				<button class="bg-blue-200 p-2 rounded-md hover:bg-blue-300">Publish form</button>
			</form>
		</section>
	</div>
	{#if showNewQuestionModal}
		<AddFormQuestionModal bind:showNewQuestionModal on:submit={addNewQuestion} />
	{/if}
{/if}
