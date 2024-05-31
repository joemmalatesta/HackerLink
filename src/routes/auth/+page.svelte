<script lang="ts">
	export let form;
  // form might throw errors back in which case we can handle it here :D 
</script>

<main class="w-screen h-[60vh] flex justify-center items-center flex-col">
	<h1 class="text-5xl font-semibold my-6">Sign into HackerLink</h1>
	<div class="flex flex-col p-10 justify-center items-center w-1/2">
		<form method="POST" action="?/oauth" class="flex justify-around w-full flex-col items-center gap-4">
			<button
      name='provider' value="github"
				class="hover:bg-gray-700/30 inline-flex h-10 w-2/5 items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
				><img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" class="h-[18px] w-[18px]" />
				Continue with GitHub
			</button>

			<button
      name='provider' value="google"
				class="hover:bg-gray-700/30 transition-all duration-100 inline-flex h-10 w-2/5 items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
				><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="h-[18px] w-[18px]" />Continue with Google
			</button>
		</form>
	</div>
</main>

{#if form?.message}
	<p>{form.message}</p>
{/if}
{#if form?.error}
	<p style="color: red;">{form.error}</p>
{/if}




<!-- 
<form method="POST" action="?/signin">
  <input name="email" placeholder="email" type="email" value={form?.data?.email ?? ""}>
  <input name="password" placeholder="password" type="password">
  <button style="margin-top: 12px;">Login</button>
  <button formaction="?/signup" style="margin-top: 12px;">Signup</button>
</form> -->