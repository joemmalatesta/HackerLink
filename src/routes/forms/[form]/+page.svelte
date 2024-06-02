<script lang="ts">
    // This is how we do slugs server side
    export let data
    const { form } = data
    
    
    // This is how we do slugs client side
    // import {page} from '$app/stores'
    // $: form = $page.params.form
</script>

{form}