<script lang="ts">
	import type { Question } from '$lib/types';
    import Questions from '../../../../components/Questions.svelte'
    // Get questions that are returned from supabase call on server
    export let data
    const questions: Question[] = data.questions
</script>

<Questions {questions}/> 