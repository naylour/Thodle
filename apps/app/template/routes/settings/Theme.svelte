<script>
    import { ChangeMode, ChangeTheme, Title } from "$components";
    import { BlockRoot } from "$components/Block";
    import BlockItem from "$components/Block/block-item.svelte";
    import Schedule from "$components/Schedule.svelte";
    import * as Card from "$components/ui/card";

</script>


<BlockRoot title="Цвета">
    {#snippet elems()}
        <BlockItem hover={false}>
            <ChangeMode />
        </BlockItem>
        <BlockItem hover={false}>
            <ChangeTheme />
        </BlockItem>
    {/snippet}

    {#snippet footer()}
        <div class="mt-3 px-4">
            Hello
        </div>
    {/snippet}
</BlockRoot>
