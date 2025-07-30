<script lang="ts" module>
    import { asset } from "$app/paths";
    import { useApp } from "$stores";
    import { fade } from "svelte/transition";
</script>

<script lang="ts">
    const app = useApp();
</script>

{#if !app.isLoad}
    <aside
        class={[
            "absolute top-0 left-0 w-dvw h-dvh bg-background",
            "flex items-center justify-center transition-all z-10",
        ]}
        out:fade
    >
        <div class="flex flex-col justify-center items-center gap-4">
            <img
                src={asset("./logo_clear.svg")}
                alt="Thodle Logo Clear"
                class="size-24 animate-pulse-alt"
            />
            <!-- <div class="flex flex-row gap-2">
                <div
                    class="w-4 h-4 rounded-full bg-text-accent animate-bounce"
                ></div>
                <div
                    class="w-4 h-4 rounded-full bg-text-accent animate-bounce animate-delay-100"
                ></div>
                <div
                    class="w-4 h-4 rounded-full bg-text-accent animate-bounce animate-delay-200"
                ></div>
            </div> -->
        </div>
    </aside>
{/if}
