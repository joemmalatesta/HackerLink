<script lang="ts">
	import FormCard from "../../components/EventCard.svelte";
	import CreateEventModal from '../../components/CreateEventModal.svelte'
	import type { Event } from "../../lib/types";
	export let events: Event[];
	

	let showModal: boolean = false
	// Load forms from supabase for user on +pager.server.ts load function
	events = [
		{
			name: "GrizzHacks 6",
			submissionCount: 100,
			primaryColor: "#bc6c25",
			secondaryColor: "#dda15e",
		},
		{ name: "GrizzHacks 7", submissionCount: 1000, primaryColor: "#0077b6", secondaryColor: "#caf0f8" },
		{
			name: "GrizzHacks 8",
			submissionCount: 12452,
			primaryColor: "#ef233c",
			secondaryColor: "#8d99ae"
		},
	];
</script>

<main class="flex flex-wrap my-4 w-1/2 left-1/2 translate-x-1/2 gap-10">
	<!-- List all made forms -->
	{#each events as event}
		<FormCard {event} />
	{/each}
	<button on:click={() => showModal = true} class="w-40 h-40 bg-gray-300/60 hover:bg-gray-300/80 rounded-2xl flex flex-col items-center justify-center">
		<p class="text-2xl font-semibold">New Form</p>
		<img src="/plus.svg" alt="Plus" />
	</button>

<form class="flex flex-col" method="post">
	<input class="p-1 text-lg" type="text" name="message" placeholder="What does your email say">
	<button class="p-2 bg-blue-400 rounded-lg">Send email</button>
</form>

{#if showModal}
	<CreateEventModal bind:showModal />
{/if}
</main>
