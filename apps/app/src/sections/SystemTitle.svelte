<script lang="ts" module>
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { useTMA, useApp } from "$stores";
</script>

<script lang="ts">
    const tma = useTMA();
    const app = useApp();

    const user = $derived(tma.user);

    const pathname = $derived(page.url.pathname);

    const titles = {
        "/": "ИБ 2025",
        "/profile": "Профиль",
        "/settings": "Настройки",
    };

    const title = $derived(titles[pathname as keyof typeof titles] ?? "Thodle");
</script>

<header
    class={[
        !tma.viewport.isFullscreen && "pt-2",
        tma.viewport.isFullscreen && "h-[calc(var(--tma-content-safe-area-inset-top)+var(--tma-safe-area-inset-top))] fixed top-0 left-0 z-1",
        "w-full flex justify-center items-end px-2 pb-1.5",
    ]}
>
    <div
        class="flex items-center gap-1 h-8.5 p-0.5 rounded-3xl backdrop-blur-sm bg-background/10"
    >
        {#if user}
            <button
                class="h-full border-2 border-primary rounded-full aspect-square overflow-hidden"
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
            class="relative py-1 px-3 font-600 text-sm text-primary-foreground transition-all backdrop-blur-sm h-full rounded-3xl flex items-center gap-2 bg-primary font-medium font-mono"
        >
        {title}
        </button>
    </div>
</header>
