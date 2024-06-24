<script lang="ts">
	import type { Question } from "$lib/types";

	export let question: Question;
	export let currentAnswer: any = undefined;
	export let editView: boolean = false
	let fileUploaded: boolean = false
	let fileName: string = ''
</script>

<div class="w-full h-40 rounded-2xl relative bg-gray-300/60 flex justify-center items-center shadow-lg hover:bg-gray-300">
	<div class="flex flex-col gap-3 items-center justify-center opacity-60" >
	<p class="font-semibold">Upload or drag file</p>
	<img class="w-20" src="/icons/plus.svg" alt="">
</div>
<input bind:value={fileName} type="file" class="hover:cursor-pointer opacity-0 w-full absolute inset-0 rounded-2xl" required={question.required}>
</div>
<div class="w-full whitespace-nowrap overflow-hidden overflow-ellipsis">
{fileName.split('\\').pop()}
</div>
