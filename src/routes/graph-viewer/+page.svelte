<script lang="ts">
    import { page } from '$app/state';

    import Tooltip from '$lib/components/tooltip.svelte';
    import { Portal, Separator, Button } from "bits-ui";
    import { DownloadSimple, UploadSimple, ArrowCounterClockwise } from 'phosphor-svelte';

    let graph_order = $state(page.url.searchParams.get('order') ? page.url.searchParams.get('order') : 4)
    let graph_id = $state(page.url.searchParams.get('id') ? page.url.searchParams.get('id') : 63)
    let graph_name = $state("NA");
    let graph_symbol = $state("")

    const available_properties: Array<string> = []
    for (let i = 0; i < 1000; i += 1) {
        available_properties.push(`Property ${i + 1}`)
    }
</script>

<div class="w-full h-screen">
    <span id="view-window" class="flex flex-row w-full h-1/2 gap-2 items-center justify-evenly">
        <div id="graph-rendering" class="w-full h-full border-amber-500 border-2">
        </div>

        <div id="matrix-rendering" class="w-full h-full border-amber-500 border-2">
        </div>

        <div id="definition-rendering" class="w-full h-full border-amber-500 border-2">
        </div>
    </span>

    <span id="property-window" class="flex flex-row w-full gap-2 items-center justify-evenly">
        <div id="property-list" class="w-1/5 h-fit border-amber-500 border-2">
            <ol class="overflow-y-auto max-h-96">
                {#each available_properties as property}
                    <li>{property}</li>
                {/each}
            </ol>
        </div>
    </span>
</div>

<Portal to="#sidebar-control-portal">
    <span class="flex flex-row items-start justify-between">
        <label for="graph_name" class="text-lg">Name</label>
        <input name="graph_name" type="text" bind:value={graph_name} 
            class="w-32 text-right text-lg border-b-1 border-black"
        >
    </span>
    <span class="flex flex-row items-start justify-between">
        <label for="graph_symbol" class="text-lg">Symbol</label>
        <input name="graph_symbol" type="text" bind:value={graph_symbol} 
            class="w-32 text-right text-lg border-b-1 border-black"
        >
    </span>

    <Separator.Root class="data-[orientation=horizontal] bg-emerald-600 w-full h-0.5 my-2" />

    <span class="flex flex-row items-start justify-between">
        <label for="graph_order" class="text-lg">Number of Vertices</label>
        <input name="graph_order" type="number" bind:value={graph_order} 
            class="w-16 text-right text-lg border-b-1 border-black"
        >
    </span>

    <span class="flex flex-row items-start justify-between ">
        <label for="graph_id" class="text-lg">Graph ID Number</label>
        <input name="graph_id" type="number" bind:value={graph_id}
            class="w-16 text-right text-lg border-b-1 border-black"
        >
    </span>

    <Separator.Root class="data-[orientation=horizontal] bg-emerald-600 w-full h-0.5 my-2" />

    <span class="flex flex-row items-start justify-center gap-2">

        <Tooltip trigger_props={{ onclick: () => {} }}>
            {#snippet trigger()}
                <Button.Root class="border-2 hover:bg-zinc-200 border-zinc-600 rounded-md">
                    <DownloadSimple size={28}/>
                </Button.Root>
            {/snippet}
            Download the JSON data of the current graph
        </Tooltip>

        <Tooltip trigger_props={{ onclick: () => {} }}>
            {#snippet trigger()}
                <Button.Root class="border-2 hover:bg-zinc-200 border-zinc-600 rounded-md">
                    <UploadSimple size={28}/>
                </Button.Root>
            {/snippet}
            Upload JSON data of a new graph
        </Tooltip>

        <Tooltip trigger_props={{ onclick: () => {} }}>
            {#snippet trigger()}
                <Button.Root class="border-2 hover:bg-zinc-200 border-zinc-600 rounded-md">
                    <ArrowCounterClockwise size={28}/>
                </Button.Root>
            {/snippet}
            Refresh the graph rendering to default
        </Tooltip>
    </span>

</Portal>