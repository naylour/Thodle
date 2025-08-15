<script lang="ts" module>
    import { browser } from "$app/environment";
    import { Loader } from "$components";
    import eruda from "$lib/eruda";
    import { Header } from "$sections";
    import { setAppContext, setTMAContext } from "$stores";
    import { ModeWatcher, resetMode } from "mode-watcher";
    import { onMount } from "svelte";
    import { scale } from "svelte/transition";

    import { Toaster } from '$components/ui/sonner';

    import { getUser } from '$remotes/user.remote';
</script>

<script lang="ts">
    import "$styles/index.css";

    const { children, data } = $props();

    if (browser) eruda();

    const app = setAppContext(),
        tma = setTMAContext();

    app.state.apiURl = data.apiURL;

    let user = $derived(getUser(tma.initDataRaw))

    $effect(() => {
        app.isLoad = tma.isReady;
    });

    $effect(() => {
        if(tma.fullscreenAvailable !== null && tma.fullscreenAvailable) app.loadTimeout = 800;
    })


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

<Toaster />
<ModeWatcher />
<Header />
{#if app.isLoad}
    <div
        id="wrapper"
        transition:scale={{
            start: 0.9,
        }}
    >
        {@render children()}
    </div>
{/if}
<Loader />
