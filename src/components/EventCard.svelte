<script lang="ts">
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import type { Event } from "../lib/types";

	export let event: Event;
	let formElement: HTMLFormElement;
	function submitForm() {
		formElement.submit();
	}

</script>

<!-- Use color of event info in here -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<form bind:this={formElement} method="post" action="?/selectEvent">
	<input type="text" name="eventId" value={event.id} class="hidden" />
	<button
		on:click={submitForm}
		class="w-full flex flex-start h-12 items-center justify-between hover:bg-gray-200/60 px-1.5 rounded"
	>
		<p class="text-xl font-semibold">{event.eventName} <span class="opacity-30 text-sm">{event.slug}</span> </p>

		<!-- Submissions, questions, last updated -->
		<div class="flex items-center gap-5">
			<div class="flex items-center flex-col gap-0.5">
				<p>{event.draftFormQuestions.length}</p>
				<p class="text-xs font-medium opacity-30">Questions</p>
			</div>
			<div class="flex items-center flex-col gap-0.5">
				<p>{event.submissionCount}</p>
				<p class="text-xs font-medium opacity-30">Responses</p>
			</div>
			<div class="flex items-center flex-col gap-0.5">
				<p>{new Date(event.lastUpdated).toLocaleDateString('en-US')}</p>
				<p class="text-xs font-medium opacity-30">Updated</p>
			</div>
		</div>
	</button>
</form>
