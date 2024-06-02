<script lang="ts">
    import FormCard from '../../components/FormCard.svelte'
	interface Form {
		name: string;
		questionCount: number;
		submissionCount: number;
		// questions: []Question
	}
	export let forms: Form[];
	// Load forms from supabase for user on +pager.server.ts load function

	forms = [
		{
			name: "GrizzHacks 6",
			questionCount: 5,
			submissionCount: 100,
		},
		{ name: "GrizzHacks 7", questionCount: 20, submissionCount: 1000 },
		{
			name: "GrizzHacks 8",
			questionCount: 20,
			submissionCount: 12452,
		},
	];
</script>

<main class="flex flex-wrap my-4 w-1/2 left-1/2 translate-x-1/2 gap-10">
	<!-- List all made forms -->
    {#each forms as form}
     <FormCard form={form}/>
    {/each}
	<button class="w-40 h-40 bg-gray-300/60 hover:bg-gray-300/80 rounded-2xl flex flex-col items-center justify-center">
		<p class="text-2xl font-semibold">New Form</p>
		<img src="/plus.svg" alt="Plus" />
	</button>
</main>
