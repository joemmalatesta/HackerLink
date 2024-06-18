<script lang="ts">
	import type { EventSettings } from "$lib/types";

	export let data;
	let settings: EventSettings;
	$: settings = data.eventSettings;
</script>

<div class="flex flex-col justify-center items-center">
	<h1 class="text-4xl font-semibold my-2">Event Settings</h1>
	{#if settings}
		<!-- Why are objects not just iterable what the hell. -->
		<form action="?/update" class="flex flex-col gap-3 w-1/3">
			<div class="flex justify-between text-lg">
				<label for="eventName">Event Name</label>
				<input type="text" id="eventName" name="eventName" value={settings.eventName} class="border-b border-gray-400 focus:border-gray-900 focus:outline-none" />
			</div>
			<div class="flex justify-between text-lg">
				<p>Event Description</p>
				<input type="text" name="description" value={settings.description} class="border-b border-gray-400 focus:border-gray-900 focus:outline-none" />
			</div>
			<div class="flex justify-between text-lg">
				<p>Form Url</p>
				<div class="flex items-center gap-0.5">
                    <p class="text-base text-gray-400/80">HackerSight.io/</p>
					<input
						type="text"
						name="slug"
						value={settings.slug}
						class="border-b border-gray-400 focus:border-gray-900 focus:outline-none"
					/>
				</div>
			</div>
			<div class="flex justify-between text-lg">
				<p>Primary Color</p>
				<input type="color" name={settings.primaryColor} value={settings.primaryColor} />
			</div>
			<div class="flex justify-between text-lg">
				<p>Secondary Color</p>
				<input type="color" name={settings.secondaryColor} value={settings.secondaryColor} />
			</div>
			<div class="flex justify-between text-lg">
				<p>Text Color</p>
				<input type="color" name={settings.textColor} value={settings.textColor} />
			</div>
            <button class="">Update Event</button>
		</form>
	{/if}
</div>
