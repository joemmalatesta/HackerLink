<script lang="ts">
	import type { Question } from '$lib/types';
	import { onMount } from 'svelte';
    import Questions from '../../../../components/Questions.svelte'

    let questions: Question[] = []

    // Make call to server to pass info about the current event ID
    onMount(async () => {
        const eventId = sessionStorage.getItem('eventId')
        let response = await fetch('/api/GetFormQuestions', {
			method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({eventId: eventId})
		});
        questions = await response.json();
    }
		
	)
</script>

<Questions {questions}/> 