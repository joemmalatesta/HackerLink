<script lang="ts">
	import type { Question } from '$lib/types';
	import { dndzone, type DndEvent } from 'svelte-dnd-action';


	export let questions: Question[]
	


    function handleConsider(event: CustomEvent<DndEvent<Question>>) {
        questions = event.detail.items
    }

    function handleFinalize(event: CustomEvent<DndEvent<Question>>) {
        questions = event.detail.items
        console.log(questions)
    }
</script>

<div class="w-60">
<section class="h-full flex flex-col gap-1 m-1" use:dndzone={{ items: questions, dropTargetStyle: {}, morphDisabled: true  }} on:consider="{handleConsider}" on:finalize="{handleFinalize}">
	{#each questions as question(question.id)}
		<div class="flex gap-5 rounded-md justify-around items-center p-4 bg-gray-500/30 h-20">
			<div class="flex flex-col items-center justify-between h-full">
				<p>{question.id}</p>
				<img src={`/icons/${question.type}.svg`} class="w-4" alt={question.type}>
			</div>
			
			<p class="flex justify-start items-start">{question.title}</p>
		</div>
	{/each}
    </section>
</div>