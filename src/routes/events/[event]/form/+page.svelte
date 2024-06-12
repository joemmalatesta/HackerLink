<script lang="ts">
	import type { Question } from "$lib/types";
	import { onMount } from "svelte";
	import Questions from "../../../../components/Questions.svelte";
	import { dndzone, type DndEvent } from "svelte-dnd-action";

	let questions: Question[];
	let initialQuestions: Question[];
	let selectedQuestion = 1;
	let unsavedChanges = false;

	// Make call to server to pass info about the current event ID
	onMount(async () => {
		const eventId = sessionStorage.getItem("eventId");
		let response = await fetch("/api/GetFormQuestions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ eventId: eventId }),
		});
		questions = await response.json();
		initialQuestions = questions;
		console.log(initialQuestions);
	});

	// DNDZONE FUNCTIONS
	function handleConsider(event: CustomEvent<DndEvent<Question>>) {
		questions = event.detail.items;
	}

	function handleFinalize(event: CustomEvent<DndEvent<Question>>) {
		questions = event.detail.items;
		questions.forEach((question, index) => {
			question.id = index + 1;
		});
		unsavedChanges = !arraysEqual(initialQuestions, questions);
	}

	// Helper to compare two arrays to see if there are actually changes or not. Currently DND makes a new reference which always makes this untrue
	function arraysEqual(arr1: any, arr2: any) {
		if (arr1.length !== arr2.length) return false;
		for (let i = 0; i < arr1.length; i++) {
			if (arr1[i].id !== arr2[i].id) return false;
			// Add other property comparisons as needed
		}
		return true;
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
					<button on:click={() => (selectedQuestion = index)} class="h-20 flex gap-3 rounded-md justify-around items-center p-2 bg-gray-500/30">
						<div class="flex flex-col items-center justify-around h-full">
							<p>{question.id}</p>
							<img src={`/icons/${question.type}.svg`} class="w-4" alt={question.type} />
						</div>

						<p class="flex justify-start items-start">{question.title}</p>
					</button>
				{/each}
			</section>
            <form action="" class="w-full">
				<button class="flex justify-center w-full">Add Question</button>
			</form>
		</div>
		<section class="outline w-full">
			{questions[selectedQuestion].title}

			{#if unsavedChanges}
				<p>You have unsaved Changes!</p>
				<form action="updateForm">
					<button>Update them now!</button>
				</form>
			{/if}
		</section>
	</div>
{/if}
