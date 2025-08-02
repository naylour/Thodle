<script lang="ts" module>
    import { Schedule, Button } from "$components";
    import * as Tabs from "$components/ui/tabs";
    import { useTMA } from "$stores";

    import CalendarIcon from "@lucide/svelte/icons/calendar-1";
    import SurveyIcon from "@lucide/svelte/icons/notebook";

    import { onMount } from "svelte";
</script>

<script lang="ts">
    const tma = useTMA();
</script>

<article id="main">
    <Tabs.Root value="schedule">
        <Tabs.List
            class="[&_button]:data-[state=active]:bg-primary! [&_button]:data-[state=active]:text-primary-foreground! [&_button]:rounded-xl"
        >
            <Tabs.Trigger value="schedule">
                <CalendarIcon /> Расписание
            </Tabs.Trigger>
            <Tabs.Trigger value="surveys">
                <SurveyIcon /> Опросы
            </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="schedule">
            <Schedule />
        </Tabs.Content>
        <Tabs.Content value="surveys">
            <p class="muted text-center py-5">Скоро будут опросы</p>
        </Tabs.Content>
    </Tabs.Root>
</article>
