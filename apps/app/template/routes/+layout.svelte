<script lang="ts" module>
    import { browser } from "$app/environment";
    import { Loader } from "$components";
    import eruda from "$lib/eruda";
    import { Header } from "$sections";
    import { setAppContext, setTMAContext } from "$stores";
    import { ModeWatcher, resetMode } from "mode-watcher";
    import { onMount } from "svelte";
    import { scale } from "svelte/transition";
</script>

<script lang="ts">
    import "$styles/index.css";

    const { children, data } = $props();

    if (browser) eruda();

    const app = setAppContext(),
        tma = setTMAContext();

    app.state.apiURl = data.apiURL;

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

        app.api.get('user', {
            headers: {
                'Accept': 'application/x-msgpack'
            }
        })
    });
</script>

<ModeWatcher />
<Header />
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
