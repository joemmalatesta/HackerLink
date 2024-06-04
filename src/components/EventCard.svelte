<script lang="ts">
	import { goto } from "$app/navigation";
    import type { Event } from "../lib/types";

    export let event: Event
</script>

<!-- Use color of event info in here -->
<button on:click={() => goto(`/events/${event.name}`)} style={`color: ${event.secondaryColor}; background-color: ${event.primaryColor}`} class='w-40 h-40 hover:bg-gray-300/80 rounded-2xl flex flex-col items-center justify-center gap-5'>
    <p class="text-2xl font-semibold">{event.name}</p>
    <div class="flex justify-around items-center w-full">
        <!-- <p>{event.questionCount}</p>
        <p>{event.submissionCount}</p> -->
        submission count or something 
    </div>
</button>

