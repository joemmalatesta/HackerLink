<script lang="ts">
	import { enhance } from "$app/forms";

	export let redirectUrl: string | null;
    export let eventName: string;
	export let editable: boolean = false;
</script>

<div class="flex flex-col">
	<h1 class="font-bold text-4xl">Thanks! Response Submitted</h1>
	{#if redirectUrl || editable}
		<a href={redirectUrl} class="bg-white hover:bg-black hover:text-white rounded text-xl">Return to {eventName}</a>
		{#if editable}
			<form use:enhance method="POST" action="?/updateRedirectUrl" class="flex gap-1">
				<p>New Redirect URL</p>
				<input type="url" name="redirectUrl" class="outline" bind:value={redirectUrl} />
				<button>Save</button>
			</form>
		{/if}
	{/if}
</div>
