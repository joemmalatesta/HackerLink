<script lang="ts">
    // This is how we do slugs server side
    export let data
    const { event } = data
    
    
    // This is how we do slugs client side
    // import {page} from '$app/stores'
    // $: form = $page.params.form
    

    // Set form from client 
    import { selectedEvent } from "../../../Store"
    selectedEvent.update((setEvent) => event)
</script>

<svelte:head>
    <title>{event}</title>
</svelte:head>

{event}