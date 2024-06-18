<script lang="ts">
	export let showModal: boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();

	let primaryColor: string = "#c8d9f4";
	let secondaryColor: string = "#ffdbe2";
	let textColor: string = "#000";
	let buttonType: any = "submit";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	class="rounded-2xl drop-shadow-lg ring-2 ring-gray-400/60 ring-offset-1 ring-inset"
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="p-10" on:click|stopPropagation>
		<h1 class="text-4xl font-semibold mb-5 text-center">Create New Event</h1>
		<form action="?/createNewEvent" method="POST" class="flex flex-col gap-2">
			<div class="flex flex-col items-start">
				<p class="text-sm">Event name</p>
				<input
					type="text"
					placeholder="Your event's name"
					name="eventName"
					class="py-1 border-b border-gray-400/60 focus:outline-none focus:border-gray-600 text-gray-600 w-full"
				/>
			</div>
			<div class="flex flex-col items-start">
				<p class="text-sm">Description</p>
				<textarea
					placeholder="Tell us about your event"
					name="description"
					class="placeholder:bottom-0 resize-none p-1 rounded-bl-md border-l border-b border-gray-400/60 w-full focus:outline-none focus:border-gray-600 text-gray-600"
				/>
			</div>

			<div class="flex justify-between gap-4">
				<p>Primary Color</p>
				<input type="text" class="border-b border-gray-400/60 focus:outline-none focus:border-gray-600 text-gray-600" bind:value={primaryColor} />
				<input type="color" name="primaryColor" class="w-12 rounded-md" bind:value={primaryColor} />
			</div>
			<div class="flex justify-between gap-4">
				<p>Secondary Color</p>
				<input type="text" class="border-b border-gray-400/60 focus:outline-none focus:border-gray-600 text-gray-600" bind:value={secondaryColor} />
				<input type="color" name="secondaryColor" class="w-12 rounded-md" bind:value={secondaryColor} />
			</div>
			<div class="flex justify-between gap-4 items-center">
				<p>Text Color</p>
				<input type="text" class="border-b border-gray-400/60 focus:outline-none focus:border-gray-600 text-gray-600" bind:value={textColor} />
				<input type="color" name="textColor" class=" rounded-md w-12" bind:value={textColor} />
			</div>

			<!-- Change button type programatically? to fix double submission  -->
			<button
				style={`background: linear-gradient( 90deg,${primaryColor},${secondaryColor}); color: ${textColor} `}
				class={`p-1 bg-gradient-to-r rounded-md from-[${primaryColor}] to-[${secondaryColor}]`}>Create Event</button
			>
		</form>
		<!-- svelte-ignore a11y-autofocus -->
	</div>
</dialog>

<style>
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
