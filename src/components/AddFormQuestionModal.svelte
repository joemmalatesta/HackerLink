<script lang="ts">
	import type { Question, QuestionType } from "$lib/types";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher<{ submit: { newQuestion: Question } }>();

	export let showNewQuestionModal: boolean;
	let options: string[] | undefined;
	let title: string;
	let type: keyof typeof QuestionType;
	const possibleTypes = ["shortAnswer", "paragraph", "multipleChoice", "trueFalse", "checkBoxes", "date", "fileUpload"];

	let dialog: HTMLDialogElement;

	$: if (dialog && showNewQuestionModal) dialog.showModal();

	// Flow of the component realistically should be Question type -> Title/Question -> Options if needed
	function submitNewQuestion() {
		let newQuestion: Question = {
			type,
			title,
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
	class="rounded-2xl drop-shadow-lg ring-2 ring-gray-400/60 ring-offset-1 ring-inset"
	bind:this={dialog}
	on:close={() => (showNewQuestionModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="p-10">
		{#if !type}
			<div class="grid lg:grid-cols-3 grid-cols-2 gap-3">
				{#each possibleTypes as possibleType}
					<div class="flex items-center">
						<div class="w-3/4">
							{possibleType}
						</div>
						<div class="w-1/4">
							<img class="w-10 h-10" src={`/icons/${possibleType}.svg`} alt={possibleType}>
						</div>
					</div>
				{/each}
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
