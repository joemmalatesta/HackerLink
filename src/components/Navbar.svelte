<script lang="ts">
	import type { Session, SupabaseClient } from "@supabase/supabase-js";
	import { page } from "$app/stores";
	export let session: Session | null;

	import { selectedEvent } from "../Store";
	import { goto } from "$app/navigation";
	$: currentUrl = $page.url;

	function handleRedirect(redirectTo: string) {
		const routes = ['responses', 'checkIn', 'stats', 'settings', 'form']
		const lastRoute = currentUrl.href.split("/")[currentUrl.href.split('/').length - 1]
		if (routes.includes(lastRoute)){
			goto(currentUrl.href.replace(lastRoute, redirectTo))
		}
		else{
			goto(currentUrl.href+"/"+redirectTo)
		}
	}
</script>

<nav class="flex justify-between items-center py-2 px-20 bg-gray-400/30">
	<a href="/"><img src="/icon.svg" alt="HackerLink Logo" class="w-14" /></a>
	<!-- If we're currently in an event, show other options -->
	{#if session && $selectedEvent != "" && currentUrl.href.includes("/events")}
		<div class="flex items-center justify-center text-lg font-semibold gap-6">
			<button on:click={() => {handleRedirect('form')}}>Form</button>
			<button on:click={() => {handleRedirect('responses')}}>Responses</button>
			<button on:click={() => {handleRedirect('checkIn')}}>Check In</button>
			<button on:click={() => {handleRedirect('stats')}}>Stats</button>
			<button on:click={() => {handleRedirect('settings')}}>Settings</button>
			<!-- don't want /form/form so maybe we check the last bit against -->
		</div>
	{/if}

	<div class="flex items-center justify-center text-lg font-semibold gap-4">
		{#if session}
			<!-- Update store to empty string to indicate no event selected so  -->
			<a
				href="/events"
				on:click={() => {
					selectedEvent.update((setEvent) => "");
				}}>Events</a
			>
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
