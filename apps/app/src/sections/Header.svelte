<script lang="ts" module>
    import UserTitleBlock from "$components/UserTitleBlock.svelte";
    import { useTMA, useApp } from "$stores";
</script>

<script lang="ts">
    const tma = useTMA();
    const app = useApp();
</script>

<header
    class={[
        "w-full flex justify-center items-end pb-1.5 px-3",
        !tma.viewport.isFullscreen && "pt-2",
        tma.viewport.isFullscreen &&
            "h-[calc(var(--tma-content-safe-area-inset-top)+var(--tma-safe-area-inset-top))] fixed top-0 left-[50%] -translate-x-[50%] z-1",
    ]}
>
    <UserTitleBlock />
</header>
