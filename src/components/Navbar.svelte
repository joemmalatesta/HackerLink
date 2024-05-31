<script lang="ts">
	import type { Session, SupabaseClient } from "@supabase/supabase-js";
	export let session: Session | null;
	export let supabase: SupabaseClient;
</script>

<nav class="flex justify-between items-center py-2 px-20 bg-gray-400/30">
	<a href="/"><img src="favicon.png" alt="HackerLink Logo" class="w-14" /></a>

	<div class="flex items-center justify-center text-lg font-semibold gap-4">
		{#if session}
			<a href="/forms">Forms</a>
			<a href="/response">Responses</a>
			<a href="/checkIn">Check In</a>
			<a href="/profile"
				><img
					class="w-10 rounded-full"
					src={session.user.user_metadata.avatar_url ?? "https://api.dicebear.com/8.x/fun-emoji/svg"}
					alt="person_avatar"
				/></a
			>
		{:else}
			<a href="/auth"><button>Login</button></a>
			<a href="/auth"><button>Sign up</button></a>
		{/if}
	</div>
</nav>
