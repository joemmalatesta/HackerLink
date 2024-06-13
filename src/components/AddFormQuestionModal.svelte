<script lang="ts">
	import type { Question, QuestionType } from "$lib/types";
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher<{submit:{newQuestion:Question}}>();


	export let showNewQuestionModal: boolean;
    let options: string[] | undefined
    let title: string
    let type: keyof typeof QuestionType
    
	let dialog: HTMLDialogElement;

	$: if (dialog && showNewQuestionModal) dialog.showModal();


    // Flow of the component realistically should be Question type -> Title/Question -> Options if needed
    function submitNewQuestion() {
        let newQuestion: Question = {
            type, title, options, id:  0
        }
		dispatch('submit', {
			newQuestion
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
        <form action="">
            <div class="flex flex-col gap-4">
                <div>
                    <p>Whats the type of Question</p>
                    <select bind:value={type}>
                        <option value="shortAnswer">Short Answer</option>
                        <option value="longAnswer">Long Answer</option>
                        <option value="multipleChoice">multiple Choice</option>
                        <option value="trueFalse">True or False</option>
                        <option value="checkBoxes">CheckBoxes</option>
                        <option value="date">Date</option>
                        <option value="fileUpload">File Upload</option>
                      </select>
                </div>
                <div>
                    <p>What is your question?</p>
                    <input type="text" bind:value={title} placeholder="How's your day?">
                </div>
                <!-- <div>
                    <p>Options</p>
                    <input type="text">
                </div> -->
            </div>
            <button type="submit" on:click={() => {
                submitNewQuestion();
                showNewQuestionModal = false;
            }}>Add Question</button>
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