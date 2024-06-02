<script lang="ts">
  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte'
	import Navbar from '../components/Navbar.svelte';
  import "../app.css";

  export let data

  let { supabase, session } = data
  $: ({ supabase, session } = data) 
  

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth')
      }
    })

    return () => subscription.unsubscribe()
  })
</script>

<Navbar session={session} supabase={supabase}/>

<slot />