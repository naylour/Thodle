<script lang="ts" module>
    import { goto } from "$app/navigation";
    import { useApp, useTMA } from "$stores";
    import type { AnimationConfig } from "svelte/animate";
    import { fly, slide } from "svelte/transition";
</script>

<script lang="ts">
    import { page } from "$app/state";

    const app = useApp();
    const tma = useTMA();

    const user = $derived(tma.user);
    const pathname = $derived(page.url.pathname);

    const titles = {
        "/profile": "Профиль",
        "/settings": "Настройки",
        "/schedule": "Расписание",
    };

    const title = $derived(titles[pathname as keyof typeof titles] ?? "ИБ 2025");

    const hiddenPaths = ['/profile', '/settings'];
    const unvisibleAvatar = ['/profile', '/settings'];
</script>

{#if app.isLoad && !(!tma.viewport.isFullscreen &&  hiddenPaths.includes(page.url.pathname)) && app.state.showUserTitleBlock}
    <div
        class={[
            "flex items-center gap-1 h-8.5 p-0.5 rounded-3xl backdrop-blur-sm bg-background/10",
            !tma.viewport.isFullscreen &&
                "flex-row-reverse w-full justify-between bg-secondary/50 h-10 p-1!",
        ]}
        in:fly={{
            y: "-100%",
        }}
    >
        {#if user}
            <button
                class={[
                    "h-full border-2 border-primary rounded-full aspect-square overflow-hidden transition-all delay-75 ease-in",
                    (!app.isLoad || unvisibleAvatar.includes(page.url.pathname)) && "-mr-10"
                    ]}
                onclick={() => {
                    goto("/profile");
                }}
            >
                <img
                    class="h-full w-full"
                    src={user.photo_url}
                    alt={user.first_name}
                />
            </button>
        {/if}
        <button
            style="--width-ch: {title.length}ch;"
            class={[
                "relative py-0 px-3 font-600 text-sm text-primary-foreground transition-all backdrop-blur-sm h-full rounded-3xl flex items-center gap-2 bg-primary font-medium font-mono",
                "w-[calc(var(--width-ch))] box-content transition-all ease-in whitespace-normal overflow-hidden text-center"
            ]}
        >
            {title}
        </button>
    </div>
{/if}
