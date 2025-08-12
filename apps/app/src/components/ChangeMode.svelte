<script lang="ts" module>
    import * as Radio from "$components/ui/radio-group";
    import * as DropdownMenu from "$components/ui/dropdown-menu";
    import { Label } from "$components/ui/label";
    import { Button } from "$components/ui/button";

    import SunIcon from "@lucide/svelte/icons/sun";
    import MoonIcon from "@lucide/svelte/icons/moon";
    import SunMoonIcon from "@lucide/svelte/icons/sun-moon";

    import { useApp, useTMA } from "$stores";
    import { buttonVariants } from "./Button.svelte";
    import { toast } from "svelte-sonner";
</script>

<script lang="ts">
    const uid = $props.id();

    const app = useApp();
    const tma = useTMA();

    const modes = {
        auto: {
            name: "Авто",
            icon: SunMoonIcon,
        },
        dark: {
            name: "Тёмная",
            icon: MoonIcon,
        },
        light: {
            name: "Светлая",
            icon: SunIcon,
        },
    } as const;

    const modesKeys = Object.keys(modes) as (keyof typeof modes)[];

    const appMode = $derived(
        app.mode.auto ? "auto" : app.mode.isDark ? "dark" : "light",
    );
</script>

<div class="flex items-center justify-between">
    <p>Тема</p>
    <DropdownMenu.Root>
        <DropdownMenu.Trigger>
            {#snippet child({ props })}
                {@const Icon = modes[appMode].icon}
                <Button {...props} class="py-2 h-auto">
                    <Icon />
                    {modes[appMode].name}
                </Button>
            {/snippet}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
            {#each modesKeys as mode (mode)}
                {@const Icon = modes[mode].icon}
                <DropdownMenu.Item
                    onclick={() => {
                        if (mode == "auto" && !app.mode.auto) app.mode.auto = true;
                        else app.mode.auto = false;

                        if (mode == "dark") app.mode.isDark = true;
                        if (mode == "light") app.mode.isDark = false;

                        tma.autoDarkMode = app.mode.auto;
                        tma.isDark = app.mode.isDark;

                        tma.changeTheme();

                        toast.success('Успешная смена темы!')
                    }}
                >
                    <Icon />
                    {modes[mode].name}
                </DropdownMenu.Item>
            {/each}
        </DropdownMenu.Content>
    </DropdownMenu.Root>
</div>
