<script lang="ts">
	import type { Question, QuestionType } from "$lib/types";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher<{ submit: { newQuestion: Question } }>();

	export let showNewQuestionModal: boolean;
	let options: string[] = [];
	// For adding choices to the options
	let newChoice: string = "";
	let newChoiceInput: HTMLInputElement;
	let title: string;
	let type: QuestionType | undefined;
	let required: boolean;
	// What is this bullshit
	const possibleTypes: QuestionType[] = ["shortAnswer", "paragraph", "multipleChoice", "trueFalse", "checkBoxes", "date", "fileUpload"];
	const possibleTypesReadable = ["Short Answer", "Paragraph", "Multiple Choice", "True/False", "Check Boxes", "DateTime", "File Upload"];

	let dialog: HTMLDialogElement;

	$: if (dialog && showNewQuestionModal) dialog.showModal();

	// Flow of the component realistically should be Question type -> Title/Question -> Options if needed
	let titleError: boolean = false;
	function submitNewQuestion() {
		titleError = false;
		if (!title) {
			titleError = true;
			return;
		}
		if (!type) {
			console.log("What are you doing??");
			return;
		}
		let newQuestion: Question = {
			type,
			title,
			required,
			options,
			id: 0,
		};
		dispatch("submit", {
			newQuestion,
		});
	}

</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	class="rounded-2xl drop-shadow-lg ring-inset w-[40rem]"
	bind:this={dialog}
	on:close={() => (showNewQuestionModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="p-10">
		{#if type}
			<div class="flex text-sm gap-2 items-center">
				<img on:click={() => {type = undefined; title=''}} src="/chevronRight.svg" class="cursor-pointer scale-x-[-1] w-4 h-4" alt="" />
				<p>{type}</p>
			</div>
		{/if}

		<div class={`w-full flex justify-between items-center mb-5`}>
			<h1 class="text-3xl font-bold">New Question</h1>
			<img class="w-8 cursor-pointer" on:click={() => (showNewQuestionModal = false)} src="/x.svg" alt="Close" />
		</div>
		{#if !type && !title}
			<div class="grid lg:grid-cols-3 grid-cols-2 gap-3 gap-y-5">
				{#each possibleTypes as possibleType, index}
					<div
						on:click={() => {
							type = possibleType;
						}}
						class="flex items-center gap-3 cursor-pointer"
					>
						<div class="text-lg">
							{possibleTypesReadable[index]}
						</div>
						<div class="">
							<img class="w-6 h-6" src={`/icons/${possibleType}.svg`} alt={possibleType} />
						</div>
					</div>
				{/each}
			</div>
		{/if}
		<!-- STEP 2. QUESTION NAME AND REQUIRED OR NOT (should maybe be step 1) -->
		{#if type}
			<div class="flex flex-col gap-5">
				<div class="flex flex-col">
					<label for="title" class={`${titleError ? "text-red-500" : "text-black"}`}>Question Title</label>
					<input
						class="w-full focus:border-neutral-800 border-b focus:outline-none focus:placeholder:opacity-0 placeholder:transition-all"
						id="title"
						type="text"
						name="title"
						bind:value={title}
						placeholder="What do you wanna know?"
					/>
				</div>
				<div class="flex items-center gap-3">
					<input type="checkbox" id="required" name="true" bind:checked={required} class=" accent-black w-4 h-4 rounded focus:ring-black" />
					<label for="required">This is a required question</label>
				</div>
				{#if type == "checkBoxes" || type == "multipleChoice"}
					<div class="flex flex-col">
						<label for="title">Choices</label>
						<div class="flex flex-col w-full h-32 overflow-y-scroll ml-3 text-base overflow-x-hidden">
							<form
								class="flex gap-1"
								on:submit|preventDefault={() => {
									options = [newChoice, ...options];
									newChoice = "";
									newChoiceInput.focus();
								}}
							>
								<input
									bind:this={newChoiceInput}
									type="text"
									bind:value={newChoice}
									name="newChoice"
									class="w-1/3 border-b focus:border-neutral-800 focus:outline-none focus:placeholder:opacity-0 placeholder:transition-all"
								/>
								<button>
									<img src="/chevronRight.svg" alt="Add Choice" class={`w-4 ${newChoice.length > 14 ? "" : "-translate-x-5"} transition-all`} />
								</button>
							</form>
							{#if options}
								{#each options as option}
									<p>- {option}</p>
								{/each}
							{/if}
						</div>
					</div>
				{/if}

				<button on:click={submitNewQuestion} class="bg-black text-white rounded-md p-1.5 drop-shadow-md w-32">Submit</button>
			</div>
		{/if}
	</div>
</dialog>

<style>
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
