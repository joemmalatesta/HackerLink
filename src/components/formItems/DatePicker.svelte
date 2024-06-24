<script lang="ts">
	import type { Question } from "$lib/types";
	import { onMount } from "svelte";

    export let question: Question;
    export let currentAnswer: any = undefined

    let now = new Date(), month, day, year;
    onMount(()=> {
        month = '' + (now.getMonth() + 1),
        day = '' + now.getDate(),
        year = now.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    currentAnswer = [year, month, day].join('-');
	})
</script>


<input class="py-2" type="date" bind:value={currentAnswer}>
