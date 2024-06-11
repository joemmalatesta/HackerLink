<script lang="ts">
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
    import type { Event } from "../lib/types";

    export let event: Event
</script>

<!-- Use color of event info in here -->
<button on:click={() => {
    if (browser){
        sessionStorage.setItem('eventId', event.id)
    }
    goto(`/events/${event.eventName}`)}} style={`color: ${event.textColor}; background-color: ${event.primaryColor}; border-color: ${event.secondaryColor}`} class={`border-4 border-spacing-2 w-40 h-40 rounded-md flex flex-col items-center justify-center gap-5`}>
    <p class="text-2xl font-semibold">{event.eventName}</p>
    <div class="flex justify-around items-center w-full">
        <!-- <p>{event.questionCount}</p>
        <p>{event.submissionCount}</p> -->
        {event.description}
    </div>
</button>

