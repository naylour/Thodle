<script lang="ts" module>
    import { Button } from "$components";
    import {
        HouseIcon,
        UniversityIcon,
        CalendarIcon,
        Icon,
    } from "@lucide/svelte";

    interface Link {
        href: string;
        label: string;
        icon: typeof Icon;
    }

    const links: Link[] = [
        {
            href: "/",
            label: "Главная",
            icon: HouseIcon,
        },
        {
            href: "/schedule",
            label: "Неделя",
            icon: CalendarIcon,
        },
        {
            href: "/university",
            label: "АГУ",
            icon: UniversityIcon,
        },
    ];
</script>

<script lang="ts">
    import { page } from "$app/state";
</script>

<nav
    class={[
        "fixed pb-[var(--tma-safe-area-inset-bottom)] bottom-0 left-0 w-full h-auto px-3 backdrop-blur-sm",
        "before:(content-[''] absolute top-0 left-0 w-full h-full opacity-50 -z-1)",
    ]}
>
    <div class="py-1 px-2 rounded-lg">
        <ul class="grid grid-cols-3 gap-2">
            {#each links as link (link.href)}
                {@const Icon = link.icon}
                <li class="w-full">
                    <Button
                        href={link.href}
                        variant={page.url.pathname == link.href
                            ? "default"
                            : "outline"}
                        class="flex-col justify-center gap-0 py-1 text-12px font-500"
                    >
                        <Icon class="size-4.8" />
                        {link.label}
                    </Button>
                </li>
            {/each}
        </ul>
    </div>
</nav>
