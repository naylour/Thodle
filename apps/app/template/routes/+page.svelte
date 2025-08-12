<script lang="ts" module>
    import { Schedule, Button } from "$components";
    import * as Tabs from "$components/ui/tabs";
    import { useTMA } from "$stores";

    import CalendarIcon from "@lucide/svelte/icons/calendar-1";
    import SurveyIcon from "@lucide/svelte/icons/notebook";

    import { onMount } from "svelte";
    import { toast } from "svelte-sonner";

    import { getUser } from "$remotes/user.remote";
</script>

<script lang="ts">
    const tma = useTMA();

    const user = $derived(getUser(tma.initDataRaw))
</script>

<article id="main" class="pt-2 px-3">
    <Tabs.Root value="schedule" onValueChange={() => {
        toast.success('Yeah', {
            duration: 10000
        })
    }}>
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
