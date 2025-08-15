<script lang="ts" module>
    import { useApp, useTMA } from "$stores";
    import { fade, scale } from "svelte/transition";
</script>

<script lang="ts">
    const app = useApp();
    const tma = useTMA();

    let showIcon = $state(false);

    let iconTimout = $state<NodeJS.Timeout>();

    $effect.root(() => {
        $effect(() => {
                if (tma.fullscreenAvailable !== null) {
                    if (tma.fullscreenAvailable) {
                        if (tma.viewport.isFullscreen) {
                            iconTimout = setTimeout(() => {
                                showIcon = true;
                            }, 300);
                        } else {
                            iconTimout = setTimeout(() => {
                                showIcon = true;
                            }, 100);
                        }
                    } else {
                        iconTimout = setTimeout(() => {
                            showIcon = true;
                        }, 100);
                    }
                }
        });

        return () => {
            clearTimeout(iconTimout);
        };
    });
</script>

{#if !app.isLoad}
    <aside
        class={[
            "fixed top-0 left-0 w-dvw h-dvh bg-background",
            "flex items-center justify-center  z-10",
        ]}
        out:scale={{
            start: 1.4,
            opacity: 0,
        }}
    >
        <div class="relative flex flex-col justify-center items-center gap-4">
            {#if showIcon}
                <img
                    in:scale={{
                        start: 0.8,
                        opacity: 0.8,
                    }}
                    src="./logo_clear.svg"
                    alt="Thodle Logo Clear"
                    class="size-24 animate-pulse-alt"
                />
            {/if}
        </div>
    </aside>
{/if}
