<script lang="ts" module>
    import { browser } from "$app/environment";
    import { Loader } from "$components";
    import eruda from "$lib/eruda";
    import { SystemTitle } from "$sections";
    import { setAppContext, setTMAContext } from "$stores";
    import { ModeWatcher, resetMode,  } from "mode-watcher";
</script>

<script lang="ts">
    import "$styles/index.css";

    const { children } = $props();

    if (browser) eruda();

    const app = setAppContext(),
        tma = setTMAContext();

    $effect(() => {
        app.isLoad = tma.isReady;
    });

    $effect.root(() => {
        resetMode()
    })
</script>

<ModeWatcher synchronousModeChanges disableTransitions  track  />
<SystemTitle />
<div class="pt-4">
    {@render children()}
</div>
<Loader />
