<script lang="ts">
    import { Tooltip } from "bits-ui";
    import { type Snippet } from "svelte";

    type Props = Tooltip.RootProps & {
        trigger: Snippet;
        trigger_props?: Tooltip.TriggerProps;
    }

    let {
        open = $bindable(false),
        children,
        trigger,
        trigger_props={},
        ...rest_props
    }: Props = $props();
</script>

<Tooltip.Root>
    <Tooltip.Trigger {...trigger_props}>
        {@render trigger()}
    </Tooltip.Trigger>

    <Tooltip.Portal>
        <Tooltip.Content class="p-2 bg-zinc-100 border-2 border-zinc-900 rounded-md">
            <Tooltip.Arrow />
                {@render children?.()}
        </Tooltip.Content>
    </Tooltip.Portal>
</Tooltip.Root>
