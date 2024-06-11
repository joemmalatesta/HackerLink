<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
    // This is how we do slugs server side
    export let data
    const { event } = data


    $: currentUrl = $page.url;
    
    onMount(() =>{
        goto(currentUrl.href+'/form')
    })
    
    
    
    // This is how we do slugs client side
    // import {page} from '$app/stores'
    // $: form = $page.params.form
    

</script>

<svelte:head>
    <title>{event}</title>
</svelte:head>

