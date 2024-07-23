<script lang="ts">
	import EventCard from "../../../components/EventCard.svelte";
	import CreateEventModal from "../../../components/CreateEventModal.svelte";
	import type { Event } from "../../../lib/types";
	import toast, { Toaster } from "svelte-french-toast";

	export let data;
	export let form;
	$: if (form?.success) {showModal = false; toast.success(form.success)};
	let formError = form?.error
	$: formError = form?.error as string
	// $: if (form?.error) toast.error(form.error)

	let events: Event[];
	$: events = data?.events.sort((x, y) => +new Date(x.lastUpdated) - +new Date(y.lastUpdated));

		

	let showModal: boolean = false;
</script>

<main class="flex flex-col w-1/2 translate-x-1/2">
	<div class="flex justify-between items-center p-1">
	<h3 class="text-3xl font-bold my-3">Your Events</h3>
	<button
		on:click={() => (showModal = true)}
		class="px-3 py-1.5 flex items-center justify-center rounded text-white bg-neutral-900 drop-shadow-md"
	>
		<p class="text-xl">New Event +</p>
	</button>
</div>
	<!-- List all made forms -->
	{#each events as event}
		<EventCard {event} />
	{/each}


	{#if showModal}
		<CreateEventModal bind:showModal formError={formError} />
	{/if}
</main>
<Toaster position={"bottom-center"} />
