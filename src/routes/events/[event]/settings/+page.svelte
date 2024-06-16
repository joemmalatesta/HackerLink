<script lang="ts">
	import type { EventSettings } from "$lib/types";

    export let data;
    let settings: EventSettings
    $: settings = data.eventSettings
</script>

<div class="flex justify-center items-center">
    <h1 class="text-2xl">Event Settings</h1>
    {#if settings}
    <!-- Why are objects not just iterable what the hell. -->
    <form action="?/update" >
        <div class="flex flex-col justify-start">
            <p>Event Name</p>
            <input type="text" name={settings.eventName} value={settings.eventName}>
        </div>
        <div class="flex flex-col justify-start">
            <p>Form Url</p>
            <input type="text" name={settings.slug} value={settings.slug}>
        </div>
        <div>
        <p>Primary Color</p>
        <input type="color" name={settings.primaryColor} value={settings.primaryColor}>
        </div>
        <div class="flex flex-col justify-start">
            <p>Secondary Color</p>
            <input type="color" name={settings.secondaryColor} value={settings.secondaryColor}>
        </div>
        <div class="flex flex-col justify-start">
            <p>Text Color</p>
            <input type="color" name={settings.textColor} value={settings.textColor}>
        </div>
    </form>
    {/if}
</div>