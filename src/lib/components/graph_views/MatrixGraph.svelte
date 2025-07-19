<script lang="ts">
	import { Graph } from '$lib/graphs/graph.svelte';

	let { graph } = $props();
	const vertices = Array(graph.order).fill(0).map((val, idx) => val = idx)

</script>

<div class="w-full h-full flex flex-col justify-center items-center gap-2 overflow-auto">
	{#each vertices as vertex_one}
		<span class="w-full h-fit flex flex-row justify-center items-center gap-3">
			{#each vertices as vertex_two}
				<p>{graph.matrix.at(vertex_one, vertex_two)}</p>
			{/each}
		</span>
	{/each}
</div>
