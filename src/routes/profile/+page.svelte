<script lang="ts">
  export let data
  export let form

  $: ({ session } = data)
</script>

{#if session}
  <h4>Your id is {session.user.id}</h4>
  <h4>Your nickname is {session.user.user_metadata.nickname ?? "not set"}</h4>
  <form method="POST" action="?/saveProfile">
    <input type="text" name='organization' class="p-1" placeholder="your org">
    <input name="name" type="text" class="p-1" placeholder="your name">
    <button style="margin-top: 12px;">Update</button>
  </form>
{/if}

<!-- 
{#if form?.error}
  <p style="color: red;">{form.error}</p>
{/if} -->
