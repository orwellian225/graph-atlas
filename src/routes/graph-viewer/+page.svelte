<script lang="ts">
    import { page } from '$app/state';
    import { Graph } from '$lib/graphs/graph.svelte';

    import Tooltip from '$lib/components/tooltip.svelte';
    import { Portal, Separator, Button } from "bits-ui";
    import { DownloadSimple, UploadSimple, ArrowCounterClockwise, Graph as GraphIcon, BracketsSquare, BracketsCurly, Stack } from 'phosphor-svelte';
    import VisualGraph from '$lib/components/graph_views/VisualGraph.svelte';
    import MatrixGraph from '$lib/components/graph_views/MatrixGraph.svelte';
	import EdgeGraph from '$lib/components/graph_views/EdgeGraph.svelte';

    let graph_order = $state(page.url.searchParams.get('order') !== null ? Number.parseInt(page.url.searchParams.get('order')) : 4);
    let graph_id = $state(page.url.searchParams.get('id') !== null ? Number.parseInt(page.url.searchParams.get('id')) : 63);
    $effect(() => {
    	if ( graph_id >= 2**(graph_order * (graph_order - 1) / 2) ) { graph_id = 2**(graph_order * (graph_order - 1) / 2) - 1 }
     	graph_data = Graph.from_id(graph_order, graph_id);
    })
    let graph_name = $state("NA");
    let graph_symbol = $state("");
    let graph_data = $state(Graph.from_id(graph_order, graph_id));

    let update_graph_view = (alternate_behaviour: boolean, graph_view_idx: number) => {
	    if (!alternate_behaviour) {
			active_graph_views = [ graph_view_idx ];
			return;
		}

		const found_idx = active_graph_views.indexOf(graph_view_idx);
		if (active_graph_views.length > 1 && found_idx !== -1) {
			active_graph_views.splice( active_graph_views.indexOf(graph_view_idx), 1 );
			return;
		}
		if (found_idx === -1) {
			active_graph_views.push(graph_view_idx);
		}
    };
    let graph_view_text = [ "Graph", "Adjacency Matrix", "Adjacency List" ]
    let graph_view_tooltip = [
	    "View the graphical representation of the graph",
		"View the adjacency matrix representation of the graph",
		"View the adjacency list representation of the graph"
    ]
    let graph_view_icon = [ GraphIcon, BracketsCurly, BracketsSquare ]
    let graph_view_windows = [ VisualGraph, MatrixGraph, EdgeGraph ]
    let active_graph_views = $state([ 0, 1, 2 ])
</script>

<div class="w-full h-screen p-2 flex flex-col gap-1">
	<span class="flex flex-row items-center justify-center">
		{#each graph_view_text as graph_view_item, item_idx}
			{@const DynComponent = graph_view_icon[item_idx]}
			{#if active_graph_views.indexOf(item_idx) !== -1}
				<button class="w-full border-b-2 border-purple-500 flex flex-row items-center justify-center gap-2" onclick={(event) => update_graph_view(event.metaKey, item_idx) }>
					<DynComponent size={28} />
					<h2 class="text-xl text-center">{graph_view_item}</h2>
				</button>
			{:else}
				<button class="w-full border-b-2 border-zinc-200 flex flex-row items-center justify-center gap-2" onclick={(event) => update_graph_view(event.metaKey, item_idx) }>
					<DynComponent size={28} />
					<h2 class="text-xl text-center">{graph_view_item}</h2>
				</button>
			{/if}
		{/each}
	</span>

	{#key graph_data}
	    <span id="view-window" class="flex flex-row w-full h-1/2 gap-2 items-center justify-evenly border-2 border-amber-500">
	    	{#each active_graph_views as graph_view_idx}
	     		{@const GraphViewComponent = graph_view_windows[graph_view_idx]}
	       		<GraphViewComponent graph={graph_data} />
		    {/each}
	    </span>
	{/key}

    <span id="info-window" class="flex flex-col w-full h-fit gap-2 items-center justify-evenly border-2 border-amber-500 overflow-y-auto">
    	<h3>There's a bunch of information down here that will be useful in the future</h3>
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
        <input name="graph_order" type="number" bind:value={graph_order} min={2}
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

    	{#each graph_view_icon as icon, idx}
		    {@const DynComponent = icon}
	        <Tooltip trigger_props={{ onclick: (event) => update_graph_view(event.metaKey, idx) }}>
	            {#snippet trigger()}
	                <Button.Root class="border-2 hover:bg-zinc-200 border-zinc-600 rounded-md">
	                    <DynComponent size={28}/>
	                </Button.Root>
	            {/snippet}
				{graph_view_tooltip[idx]}

				<p>
					Control + Click to multi-select the views
				</p>
	        </Tooltip>
		{/each}
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
