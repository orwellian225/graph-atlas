<script lang="ts">
    import House from "phosphor-svelte/lib/House";
    import Wall from "phosphor-svelte/lib/Wall";
    import Graph from "phosphor-svelte/lib/Graph";
    import Question from "phosphor-svelte/lib/Question";
</script>

<div class="w-full h-full border-r-2 border-zinc-950 flex flex-col justify-start items-start p-2 gap-2">
    <h1 class="text-3xl w-full text-center border-b-2 border-sky-600 py-2">Graph Database</h1>

    <nav class="w-full border-b-2 border-sky-600 pb-2">
        <ol class="flex flex-col list-inside gap-1">
            <li>
                <a href="/" class="flex flex-row justify-start items-center gap-2 text-xl text-center align-middle">
                    <House size={32}/> Home 
                </a>
            </li>
            <li>
                <a href="/set-builder" class="flex flex-row justify-start items-center gap-2 text-xl text-center align-middle">
                    <Wall size={32}/> Set Builder 
                </a>
            </li>
            <li>
                <a href="/graph-viewer" class="flex flex-row justify-start items-center gap-2 text-xl text-center align-middle">
                    <Graph size={32}/> Graph Viewer 
                </a>
            </li>
            <li>
                <a href="/help" class="flex flex-row justify-start items-center gap-2 text-xl text-center align-middle">
                    <Question size={32}/> Help
                </a>
            </li>
        </ol>
    </nav>

    <div id="sidebar-control-portal" class="w-full border-b-2 border-sky-600 pb-2">
    </div>
</div>