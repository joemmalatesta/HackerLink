<script lang="ts">
	import Question from "../Question.svelte";

	export let question: Question;
	export let currentAnswer;
</script>

<form>
	<div class="space-y-2">
		<div class="flex items-center">
			<input
				type="checkbox"
				id="option1"
				name="options[]"
				value="Option1"
				class="checked:bg-blue-600 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
			/>
			<label for="option1" class="ml-2 text-sm text-gray-900">{question.title}</label>
		</div>
		<div class="flex items-center">
			<input
				type="checkbox"
				id="option2"
				name="options[]"
				value="Option2"
				class="checked:bg-blue-600 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
			/>
			<label for="option2" class="ml-2 text-sm text-gray-900">Option 2</label>
		</div>
		<!-- Repeat the block above for more options -->
	</div>
	<button type="submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Submit</button>
</form>
