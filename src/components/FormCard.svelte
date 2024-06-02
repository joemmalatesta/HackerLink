<script lang="ts">
	import { goto } from "$app/navigation";

    interface Form {
        // ID probably
        name: string
        questionCount: number,
        submissionCount: number,
        // questions: []Question,
        //primaryColor: string,
        //secondaryColor: string,
    }
    export let form: Form
</script>

<!-- Use color of form info in here -->
<button on:click={() => goto(`/forms/${form.name}`)} class="w-40 h-40 bg-gray-300/60 hover:bg-gray-300/80 rounded-2xl flex flex-col items-center justify-center gap-5">
    <p class="text-2xl font-semibold">{form.name}</p>
    <div class="flex justify-around items-center w-full">
        <p>{form.questionCount}</p>
        <p>{form.submissionCount}</p>
    </div>
</button>

