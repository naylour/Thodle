<script lang="ts" module>
    import { goto } from "$app/navigation";
    import { useApp, useTMA } from "$stores";
    import { fly, scale } from "svelte/transition";

    import * as Avatar from "$components/ui/avatar";
    import { Button } from "$components/ui/button";
</script>

<script lang="ts">
    import { page } from "$app/state";
    import { getUser } from "$remotes/user.remote";

    const app = useApp();
    const tma = useTMA();

    const user = $derived(getUser(tma.initDataRaw));
    const pathname = $derived(page.url.pathname);

    const titles = {
        "/profile": "Профиль",
        "/settings": "Настройки",
        "/schedule": "Расписание",
        "/group": "Ваша группа",
        "/university": "Ваш АГУ",
    };

    const title = $derived(
        titles[pathname as keyof typeof titles] ?? "ИБ 2025",
    );

    const hiddenPaths = ["/profile", "/settings", '/group'];
    const unvisibleAvatar = ["/settings", '/profile', '/group'];
</script>

{#if app.isLoad && !(!tma.viewport.isFullscreen && hiddenPaths.includes(page.url.pathname)) && app.state.showUserTitleBlock}
    <div
        class={[
            "flex items-center gap-1 h-8.5 p-0.5 rounded-3xl backdrop-blur-sm bg-background/10",
            !tma.viewport.isFullscreen &&
                "flex-row-reverse w-full justify-between bg-muted h-10 p-1!",
        ]}

    >
        {#if user.current}
            <button
                class={[
                    "h-full rounded-full aspect-square overflow-hidden transition-all delay-75 ease-in",
                    (!app.isLoad ||
                        unvisibleAvatar.includes(page.url.pathname)) &&
                        "-mr-9.5",
                ]}
                onclick={() => {
                    goto("/profile");
                }}
            >
                <Avatar.Root class="border-2 border-primary size-full">
                    <Avatar.Image
                        src={user.current.avatar}
                        alt={user.current.firstName}
                    />
                    <Avatar.Fallback>
                        {#if user.current.lastName}
                            {user.current.firstName[0]}{user.current
                                .lastName[0]}
                        {:else}
                            {user.current.firstName[0]}{user.current
                                .firstName[1]}
                        {/if}
                    </Avatar.Fallback>
                </Avatar.Root>
            </button>
        {/if}
        <a
            style="--width-ch: {title.length}ch;"
            href={title === 'ИБ 2025' ? '/group' : undefined}
            class={[
                "relative whitespace-nowrap! py-0 px-3 font-600 text-sm text-primary-foreground transition-all backdrop-blur-sm h-full rounded-3xl flex items-center gap-2 bg-primary font-medium font-mono",
                "w-[calc(var(--width-ch))] box-content transition-all ease-in whitespace-normal overflow-hidden text-center",
            ]}
        >
            {title}
        </a>
    </div>
{/if}
