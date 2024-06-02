<script lang="ts">
	import { dndzone, type DndEvent } from 'svelte-dnd-action';
	let form: FormItem[] = [
		{
			id: 1,
			question: 'question 1',
			type: 'short answer'
		},
		{
			id: 2,
			question: 'question 2',
			type: 'short answer'
		},
		{
			id: 3,
			question: 'question 3',
			type: 'short answer'
		}
	];
    interface FormItem{
        id: number,
        question: string,
        type: string,
    }

    function handleConsider(event: CustomEvent<DndEvent<FormItem>>) {
        console.log('considering')
        form = event.detail.items
    }

    function handleFinalize(event: CustomEvent<DndEvent<FormItem>>) {
        console.log('finalize')
        form = event.detail.items
        console.log(form)
    }
</script>

<div class="w-60 h-screen bg-gray-200/30">
<section class="h-full" use:dndzone={{ items: form, dropTargetStyle: {}, morphDisabled: true  }} on:consider="{handleConsider}" on:finalize="{handleFinalize}">
	{#each form as question(question.id)}
		<div class="flex justify-around items-center p-2 bg-gray-500/30">
			<p>{question.id}</p>
			<p>{question.type}</p>
		</div>
	{/each}
    </section>
</div>