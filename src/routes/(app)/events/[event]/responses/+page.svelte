<script lang="ts">
	import type { Answer, Response } from "$lib/types.js";
	export let data;
	let allResponses: Response[] = [];
    let selectedResponses: Response[] = []
    let allFormIds: string[];
    let selectedFormId: string;
    let noResponses: boolean = false
	$: if (data) {
        noResponses = false
        allResponses = data.responses;
        allFormIds = data.allFormIds;
        selectedFormId = allFormIds[selectedVersion]
        selectedResponses = allResponses.filter(response => response.formId == selectedFormId);
        // If no responses (should only happen for new forms), just say none found
        console.log(selectedResponses.length)
        if (selectedResponses.length <= 0) noResponses = true
    }
    

	// Versioning forms (select subset of responses)
	let toggleDropdown: boolean = false;
    let selectedVersion: number = 0
</script>

{#if allResponses}
	<div class="flex justify-center items-center flex-col">
        <div class="flex justify-between">
		<h1 class="text-2xl">Responses</h1>
        <div class="flex flex-col">
            <button class="p-1 rounded-md w-20 flex font-semibold" on:click={() => (toggleDropdown = !toggleDropdown)}>
                Version <img src="/chevronRight.svg" class="{toggleDropdown ? '-rotate-90' : 'rotate-90'} transition-all" alt="" />
            </button>
            {#if toggleDropdown}
                <div class="flex flex-col justify-center items-start w-16">
                    {#each allFormIds as formId, index}
                        <button class="w-full outline" on:click={() =>{ (selectedVersion = index); toggleDropdown = false}}>v{index}</button>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
        {#if !noResponses}
        <table class="table-auto w-3/4 overflow-scroll">
            <!-- COLUMNS -->
             <tr>
                    <th>ID</th>
				{#each selectedResponses[0].response as response}
					<th>{response.title}</th>
				{/each}
            </tr>
            {#each selectedResponses as response}
                <tr>
                        <td>{response.id}</td>
                    {#each response.response as answer}
                        <td>{answer.answer}</td>
                    {/each}
                </tr>
            {/each}
        </table>
        {:else}
        <h3>No responses for this form yet..</h3>
        {/if}
		
	</div>
{/if}
