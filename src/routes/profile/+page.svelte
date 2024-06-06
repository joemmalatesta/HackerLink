<script lang="ts">
  export let data
  export let form

  $: ({ session, organization, name } = data)
</script>

<div class="w-screen flex justify-center my-10">
{#if session}
  <form method="POST" action="?/saveProfile" class="flex flex-col justify-start items-start w-60 gap-2">
    <div class="flex flex-col w-full">
      <p>Organization</p>
    <input type="text" name='organization' class="p-1 rounded ring-2 ring-gray-500" placeholder={organization}>
    </div>
    <div class="flex flex-col w-full">
      <p>Name</p>
    <input name="name" type="text" class="p-1 rounded ring-2 ring-gray-500" placeholder={name}>
    </div>
    <button class="w-60 bg-green-600 p-1 rounded-md ring-1 ring-green-700">Update</button>
  </form>
{/if}
</div>

<!-- 
{#if form?.error}
  <p style="color: red;">{form.error}</p>
{/if} -->
