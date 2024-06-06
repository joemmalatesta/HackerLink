<script lang="ts">
	import type { Session, SupabaseClient } from "@supabase/supabase-js";
	import { page, navigating } from "$app/stores";
	import {clickOutside} from '$lib/clickOutside'
	export let session: Session | null;


	import { selectedEvent } from "../Store";
	import { goto } from "$app/navigation";
	$: currentUrl = $page.url;
	
	// Profile dropdown for easy access to settings or sign out
	let toggleProfileDropdown = false
	// Close if page changes.
	$: if ($navigating) toggleProfileDropdown = false

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
			<button on:click={() => toggleProfileDropdown = !toggleProfileDropdown}
				><img
					class="w-10 rounded-full"
					src={session.user.user_metadata.avatar_url ?? "https://api.dicebear.com/8.x/fun-emoji/svg"}
					alt="person_avatar"
					title={session.user.email}
				/>
				</button
			>
		{:else}
			<a href="/auth"><button>Login</button></a>
			<a href="/auth"><button>Sign up</button></a>
		{/if}
	</div>
</nav>
{#if toggleProfileDropdown}
<div  class="absolute right-0" use:clickOutside={() => toggleProfileDropdown = false}>
	<div class="flex justify-end mr-20">
		<div class="flex flex-col justify-center items-center">
			<a href="profile">Profile</a>
			<!-- This is prone to failure. Seems good now but watch out.. -->
			<form action="/profile?/signout" method="POST"><button>Sign Out</button></form>
		</div>
	</div>
</div>	
{/if}
