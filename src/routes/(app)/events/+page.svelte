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
	$: events = data?.events;

	let showModal: boolean = false;
</script>

<main class="flex flex-wrap my-4 w-1/2 left-1/2 translate-x-1/2 gap-10">
	<!-- List all made forms -->
	{#each events as event}
		<EventCard {event} />
	{/each}
	<button
		on:click={() => (showModal = true)}
		class="w-40 h-40 bg-gray-300/60 hover:bg-gray-300/80 rounded-2xl flex flex-col items-center justify-center"
	>
		<p class="text-2xl font-semibold">New Form</p>
		<img src="icons/plus.svg" alt="Plus" />
	</button>

	<form class="flex flex-col" method="post">
		<input class="p-1 text-lg" type="text" name="message" placeholder="What does your email say" />
		<button class="p-2 bg-blue-400 rounded-lg">Send email</button>
	</form>

	{#if showModal}
		<CreateEventModal bind:showModal formError={formError} />
	{/if}
</main>
<Toaster position={"bottom-center"} />
