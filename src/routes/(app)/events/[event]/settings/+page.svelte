<script lang="ts">
	import { enhance } from "$app/forms";
	import type { EventSettings } from "$lib/types";
	import toast, { Toaster } from "svelte-french-toast";

	$: if (form?.success) toast.success(form?.success);
	// $: if (form?.error) toast.error(form?.error)

	export let data;
	export let form;
	let settings: EventSettings;
	$: settings = data.eventSettings;

	function slugify(str: string) {
		str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
		str = str.toLowerCase(); // convert string to lowercase
		str = str
			.replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
			.replace(/\s+/g, "-") // replace spaces with hyphens
			.replace(/-+/g, "-"); // remove consecutive hyphens
		return str;
	}
	$: settings.slug = slugify(settings.slug);
</script>

<div class="flex flex-col justify-center items-center">
	<h1 class="text-4xl font-semibold my-2">Event Settings</h1>
	{#if settings}
		<!-- Why are objects not just iterable what the hell. -->
		<form use:enhance method="post" action="?/update" class="flex flex-col gap-3 w-1/3">
			<div class="flex justify-between text-lg">
				<label for="eventName">Event Name</label>
				<input
					type="text"
					id="eventName"
					name="eventName"
					value={settings.eventName}
					class="border-b border-gray-400 focus:border-gray-900 focus:outline-none"
				/>
			</div>
			<div class="flex justify-between text-lg">
				<label for="description">Event Description</label>
				<input
					id="description"
					type="text"
					name="description"
					value={settings.description}
					class="border-b border-gray-400 focus:border-gray-900 focus:outline-none"
				/>
			</div>
			<div class="flex justify-between text-lg">
				<label for="slug">Form Url</label>
				<div class="flex items-center gap-0.5">
					<p class="text-base text-gray-400/80">HackerSight.io/</p>
					<input
						id="slug"
						type="text"
						name="slug"
						bind:value={settings.slug}
						class={`border-b  focus:outline-none ${form?.error == "invalid slug" || form?.error == "duplicate slug" ? "border-red-400 focus:border-red-700" : "border-gray-400 focus:border-gray-900"}`}
					/>
				</div>
			</div>
			<div class="flex justify-between text-lg">
				<label for="primaryColor">Primary Color</label>
				<input id="primaryColor" type="color" name={settings.primaryColor} value={settings.primaryColor} />
			</div>
			<div class="flex justify-between text-lg">
				<label for="secondaryColor">Secondary Color</label>
				<input type="color" id="secondaryColor" name={settings.secondaryColor} value={settings.secondaryColor} />
			</div>
			<div class="flex justify-between text-lg">
				<label for="textColor">Text Color</label>
				<input id="textColor" type="color" name={settings.textColor} value={settings.textColor} />
			</div>
			<button class="rounded p-2 bg-gray-200 hover:bg-gray-300 drop-shadow">Update Event</button>
		</form>
	{/if}
	{#if form?.error == "invalid slug"}
		<p class="text-sm text-red-500">Invalid Url</p>
	{:else if form?.error == "duplicate slug"}
		<p class="text-sm text-red-500">That url is taken</p>
	{/if}
</div>
<Toaster position={"bottom-center"} />
