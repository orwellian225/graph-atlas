<script lang="ts">
    import { page } from '$app/state';

    import Tooltip from '$lib/components/tooltip.svelte';
    import { Portal, Separator, Button } from "bits-ui";
    import { DownloadSimple, UploadSimple, ArrowCounterClockwise, Graph, BracketsSquare, BracketsCurly, Stack } from 'phosphor-svelte';

    let graph = $state({
    	order: page.url.searchParams.get('order') ? page.url.searchParams.get('order') : 4,
     	id: page.url.searchParams.get('id') ? page.url.searchParams.get('id') : 63,
      	name: "NA",
       	symbol: ""
    })

    let graph_view_text = [ "Graph", "Adjacency Matrix", "Adjacency List" ]
    let graph_view_icon = [ Graph, BracketsCurly, BracketsSquare ]
    let graph_view = $state(0)

</script>

<div class="w-full h-screen p-2">
	<span class="flex flex-row items-center justify-center">
		{#each graph_view_text as graph_view_item, item_idx}
			{@const DynComponent = graph_view_icon[item_idx]}
			{#if graph_view !== item_idx}
				<button class="w-full border-b-2 border-zinc-200 flex flex-row items-center justify-center gap-2" onclick={() => graph_view = item_idx}>
					<DynComponent size={28} />
					<h2 class="text-xl text-center">{graph_view_item}</h2>
				</button>
			{:else}
				<button class="w-full border-b-2 border-purple-500 flex flex-row items-center justify-center gap-2" onclick={() => {}}>
					<DynComponent size={28} />
					<h2 class="text-xl text-center">{graph_view_item}</h2>
				</button>
			{/if}
		{/each}
	</span>

    <span id="view-window" class="flex flex-row w-full h-full gap-2 items-center justify-evenly">
    </span>
</div>

<Portal to="#sidebar-control-portal">
    <span class="flex flex-row items-start justify-between">
        <label for="graph_name" class="text-lg">Name</label>
        <input name="graph_name" type="text" bind:value={graph.name}
            class="w-32 text-right text-lg border-b-1 border-black"
        >
    </span>
    <span class="flex flex-row items-start justify-between">
        <label for="graph_symbol" class="text-lg">Symbol</label>
        <input name="graph_symbol" type="text" bind:value={graph.symbol}
            class="w-32 text-right text-lg border-b-1 border-black"
        >
    </span>

    <Separator.Root class="data-[orientation=horizontal] bg-emerald-600 w-full h-0.5 my-2" />

    <span class="flex flex-row items-start justify-between">
        <label for="graph_order" class="text-lg">Number of Vertices</label>
        <input name="graph_order" type="number" bind:value={graph.order}
            class="w-16 text-right text-lg border-b-1 border-black"
        >
    </span>

    <span class="flex flex-row items-start justify-between ">
        <label for="graph_id" class="text-lg">Graph ID Number</label>
        <input name="graph_id" type="number" bind:value={graph.id}
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
