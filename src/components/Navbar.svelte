<script lang="ts">
	import type { Session, SupabaseClient } from "@supabase/supabase-js";
	import { page } from "$app/stores";
	export let session: Session | null;
	export let supabase: SupabaseClient;

	import { selectedEvent } from "../Store";
	console.log('navbar sees' + $selectedEvent)
	$: currentUrl = $page.url;
	$: console.log(currentUrl.href)
</script>

<nav class="flex justify-between items-center py-2 px-20 bg-gray-400/30">
	<a href="/"><img src="favicon.png" alt="HackerLink Logo" class="w-14" /></a>

	<div class="flex items-center justify-center text-lg font-semibold gap-4">
		{#if session}
			<!-- Update store to empty string to indicate no event selected so  -->
			<a href="/events" on:click={() => {selectedEvent.update((setEvent) => '')}}>Events</a>
			{#if $selectedEvent != '' && currentUrl.href.includes("/events")}
			<a on:click={() => {}} href="{currentUrl.toString()}/form">Form</a>
			<a href="{currentUrl.href}/response">Responses</a>
			<a href="{currentUrl.href}/checkIn">Check In</a>
			<a href="{currentUrl.href}/stats">Stats</a>
			{/if}
			<a href="/profile"
				><img
					class="w-10 rounded-full"
					src={session.user.user_metadata.avatar_url ?? "https://api.dicebear.com/8.x/fun-emoji/svg"}
					alt="person_avatar"
				/></a
			>
		{:else}
			<a href="/auth"><button>Login</button></a>
			<a href="/auth"><button>Sign up</button></a>
		{/if}
	</div>
</nav>
