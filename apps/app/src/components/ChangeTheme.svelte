<script lang="ts" module>
    import { useTMA, useApp } from "$stores";
    import { onDestroy, onMount } from "svelte";
    import * as Select from "$components/ui/select";
    import * as Toggle from "$components/ui/toggle-group";
    import { Label } from "$components/ui/label";
    import { ScrollArea } from "$components/ui/scroll-area";
    import { toast } from "svelte-sonner";
</script>

<script lang="ts">
    const uid = $props.id();

    const tma = useTMA();
    const app = useApp();
</script>

<div class="flex items-center justify-between">
    <Label for="{uid}-change-theme">Цветовая схема</Label>
    <Select.Root  type="single" bind:value={app.theme} onValueChange={() => {
        toast.success('Успешная смена цвета!')
    }}>
        <Select.Trigger>
            <div class="bg-primary aspect-square w-4 rounded-full"></div>
            {app.themesNames[app.theme]}
        </Select.Trigger>
        <Select.Content class="max-h-100" align="end">
            {#each app.themesKeys as theme (theme)}
                <Select.Item value={theme} >
                    <div style="--bg: {app.themes[theme]};" class="size-5 rounded-full bg-(--bg)!"></div>
                    {app.themesNames[theme]}
                </Select.Item>
            {/each}
        </Select.Content>
    </Select.Root>
</div>
