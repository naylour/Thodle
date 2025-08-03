<script lang="ts" module>
    import { asset } from "$app/paths";
    import { useApp } from "$stores";
    import { fade, scale } from "svelte/transition";
</script>

<script lang="ts">
    const app = useApp();
</script>

{#if !app.isLoad}
    <aside
        class={[
            "fixed top-0 left-0 w-dvw h-dvh bg-background",
            "flex items-center justify-center transition-all z-10",
        ]}
        out:scale={{
            start: 1.4,
            opacity: 0
        }}
    >
        <div class="flex flex-col justify-center items-center gap-4">
            <img
                src={asset("./logo_clear.svg")}
                alt="Thodle Logo Clear"
                class="size-24 animate-pulse-alt"
            />
        </div>
    </aside>
{/if}
