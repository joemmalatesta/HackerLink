<script lang="ts">
	import type { Session, SupabaseClient } from "@supabase/supabase-js";
	import { page, navigating } from "$app/stores";
	import { clickOutside } from "$lib/clickOutside";
	export let session: Session | null;

	import { goto } from "$app/navigation";
	import { fade, fly, slide } from "svelte/transition";
	$: currentUrl = $page.url;

	// Profile dropdown for easy access to settings or sign out
	let toggleProfileDropdown = false;
	// Close if page changes.
	$: if ($navigating) {
		toggleProfileDropdown = false;
	}

	function handleRedirect(redirectTo: string) {
		let parts = currentUrl.href.split("/");

		// Remove the last segment
		parts.pop();

		// Join the remaining parts and append the new part
		let newUrl = parts.join("/") + "/" + redirectTo;

		// Example function call to redirect
		goto(newUrl);
	}
</script>

<nav class="flex justify-between items-center py-2 border-b-2 border-gray-300/40 h-20 px-16">
	<a href={session ? "/events" : "/"}><img src="/icon.svg" alt="HackerSight Logo" class="w-14" /></a>
	<!-- If we're currently in an event, show other options -->
	{#if session && currentUrl.href.includes("/events/")}
		<div class="flex items-center justify-center text-lg font-semibold gap-6">
			<button
				on:click={() => {
					handleRedirect("form");
				}}>Form</button
			>
			<button
				on:click={() => {
					handleRedirect("responses");
				}}>Responses</button
			>
			<button
				on:click={() => {
					handleRedirect("checkIn");
				}}>Check In</button
			>
			<button
				on:click={() => {
					handleRedirect("stats");
				}}>Stats</button
			>
			<button
				on:click={() => {
					handleRedirect("settings");
				}}>Settings</button
			>
			<!-- don't want /form/form so maybe we check the last bit against -->
		</div>
	{/if}

	<div class="flex items-center justify-center text-lg font-semibold gap-4">
		{#if session}
			<!-- Update store to empty string to indicate no event selected so  -->
			<a href="/events">Events</a>
			<button on:click={() => (toggleProfileDropdown = !toggleProfileDropdown)}
				><img
					class="w-10 rounded-full"
					src={session.user.user_metadata.avatar_url ?? "/defaultProfile.webp"}
					alt="person_avatar"
					title={session.user.email}
				/>
			</button>
		{:else}
			<a href="/auth"><button>Sign in</button></a>
		{/if}
	</div>
</nav>
{#if toggleProfileDropdown}
	<div class="absolute right-0" transition:slide={{ duration: 100 }} use:clickOutside={() => (toggleProfileDropdown = false)}>
		<div class="flex justify-end mr-12">
			<div class="flex flex-col justify-start items-center gap-1 text-lg bg-gray-400/30 p-1 px-4 rounded-b">
				<a href="/profile">Profile</a>
				<div class="w-full border-t-2 border-gray-400/80 left-1/2"></div>
				<!-- This is prone to failure. Seems good now but watch out.. -->
				<form action="/profile?/signout" method="POST"><button>Sign Out</button></form>
			</div>
		</div>
	</div>
{/if}
