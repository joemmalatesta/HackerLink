<script lang="ts">
	import type { Question } from "$lib/types";
	import Checkboxes from "./Checkboxes.svelte";
	import DatePicker from "./DatePicker.svelte";
	import FileUpload from "./FileUpload.svelte";
	import MultipleChoice from "./MultipleChoice.svelte";
	import Paragraph from "./Paragraph.svelte";
	import ShortAnswer from "./ShortAnswer.svelte";
	import TrueFalse from "./TrueFalse.svelte";

	export let question: Question;
</script>

{#if question.type == "shortAnswer"}
	<ShortAnswer {question} />
{:else if question.type == "paragraph"}
	<Paragraph {question} />
{:else if question.type == "multipleChoice"}
	<MultipleChoice {question} />
{:else if question.type == "trueFalse"}
	<TrueFalse {question} />
{:else if question.type == "date"}
	<DatePicker question={question} />
{:else if question.type == "fileUpload"}
	<FileUpload {question} />
{:else if question.type == "checkBoxes"}
	<Checkboxes {question} />
{/if}
