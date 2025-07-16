<script lang="ts">
	import '../app.css';

	import Sidebar from '$lib/components/sidebar.svelte';

	import { Tooltip } from 'bits-ui';

	let { children } = $props();
</script>

<Tooltip.Provider>
	<main class="flex flex-row w-screen h-screen overflow-hidden bg-zinc-100">
		<div class="w-1/5">
			<Sidebar />
		</div>
		<div class="w-4/5 min-h-screen h-fit">
			{@render children()}
		</div>
	</main>
</Tooltip.Provider>
