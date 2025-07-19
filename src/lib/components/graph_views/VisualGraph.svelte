<script lang="ts">
	import { Graph } from '$lib/graphs/graph.svelte';
	import { onMount } from 'svelte';
	import Camera from '$lib/canvas/camera';

	let { graph } = $props();

	let canvas_parent: HTMLDivElement;
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let camera: any;
    let camera_dragging = false;
    // const canvas_resize_observer  = new ResizeObserver((entries) => {
    //     canvas.width = canvas_parent.offsetWidth;
    //     canvas.height = canvas_parent.offsetHeight;
    //     camera.updateViewport();
    //     camera.zoomTo(800);
    // });

    onMount(() => {
        canvas.addEventListener("mousemove", (event: MouseEvent) => {
            if (camera_dragging) {
                camera.moveTo(
                    camera.lookAt[0] - event.movementX,
                    camera.lookAt[1] - event.movementY
                );
            }
        });
        canvas.addEventListener("mousedown", (event) => {
            if (event.button == 2) { camera_dragging = true; }
        });
        canvas.addEventListener("mouseup", (event) => {
             if (event.button == 2) { camera_dragging = false; }
        });
        canvas.addEventListener("wheel", (event: WheelEvent) => { camera.zoomTo(camera.distance + (event.deltaY / 2)) });
        // canvas_resize_observer.observe(canvas);

        canvas.width = canvas_parent.offsetWidth;
        canvas.height = canvas_parent.offsetHeight;

        //@ts-ignore
        ctx = canvas.getContext("2d");
        camera = new Camera(ctx, { distance: 800 });
        camera.updateViewport();

        draw(0);
    })

    let prev_time: number;
    function draw(now_time: number) {
	   	let delta = now_time - prev_time;
        prev_time = now_time;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        camera.begin();

        for (let i = 0; i < graph.order; i += 1) {
	        ctx.lineWidth= 2;
	        ctx.strokeStyle = "black";
	        ctx.beginPath();
	            ctx.arc(
	                graph.vertex_positions[i].x, graph.vertex_positions[i].y, 10,
	                0, 2 * Math.PI
	            );
	            ctx.fill();
	        ctx.closePath();
        }

        for (let vertex_i = 0; vertex_i < graph.order; vertex_i += 1) {
	        for (let vertex_j = 0; vertex_j < graph.order; vertex_j += 1) {
				if (vertex_i == vertex_j) { continue; }

				if ( graph.matrix.at(vertex_i, vertex_j) > Graph.MISSING ) {
			        ctx.lineWidth= 2;
			        ctx.strokeStyle = "black";
			        ctx.beginPath();
						ctx.moveTo(
							graph.vertex_positions[vertex_i].x,
							graph.vertex_positions[vertex_i].y
						);
						ctx.lineTo(
							graph.vertex_positions[vertex_j].x,
							graph.vertex_positions[vertex_j].y
						);
			            ctx.stroke();
			        ctx.closePath();
				}
	        }
        }

        camera.end();
        requestAnimationFrame(draw);
    }
</script>

<svelte:document oncontextmenu={(event) => {
    if (event.target == canvas) {
        event.preventDefault();
    }
}} />

<div bind:this={canvas_parent} class="w-full h-full">
    <canvas bind:this={canvas} class="w-full h-full"></canvas>
</div>
