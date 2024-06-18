<script lang="ts">
	import type { Question } from "$lib/types";

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
</form>
