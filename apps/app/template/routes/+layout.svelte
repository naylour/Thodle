<script lang="ts" module>
    import { browser } from "$app/environment";
    import { Loader } from "$components";
    import eruda from "$lib/eruda";
    import { SystemTitle } from "$sections";
    import { setAppContext, setTMAContext } from "$stores";
    import { ModeWatcher, resetMode } from "mode-watcher";
</script>

<script lang="ts">
    import "$styles/index.css";
    import { onMount, untrack } from "svelte";
    import { fly, scale } from "svelte/transition";
    import { page } from "$app/state";

    const { children } = $props();

    if (browser) eruda();

    const app = setAppContext(),
        tma = setTMAContext();

    $effect(() => {
        app.isLoad = tma.isReady;
    });


    $effect(() => {
        tma.themeColors.primary = app.themes[app.theme];
    });

    onMount(() => {
        // resetMode();
        tma.autoDarkMode = app.mode.auto;
        tma.isDark = app.mode.isDark;

        tma.changeTheme()
    });
</script>

<ModeWatcher />
<SystemTitle />
{#if app.isLoad}
    <div
        class="pt-4"
        transition:scale={{
            start: 0.8,
        }}
    >
        {@render children()}
    </div>
{/if}
<Loader />
