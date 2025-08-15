<script lang="ts" module>
    import { Schedule, Button, Title } from "$components";
    import * as Tabs from "$components/ui/tabs";
    import { useTMA } from "$stores";

    import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";

    import { onMount } from "svelte";
    import { toast } from "svelte-sonner";

    import { getUser } from "$remotes/user.remote";
</script>

<script lang="ts">
    const tma = useTMA();

    const user = $derived(getUser(tma.initDataRaw))
</script>

<article id="main" class="pt-2 px-3">
    <Tabs.Root value="schedule">
        <Tabs.List>
            <Tabs.Trigger value="schedule">Расписание</Tabs.Trigger>
            <Tabs.Trigger value="survey">Опросы</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="schedule">
            <Schedule  />
        </Tabs.Content>
        <Tabs.Content value="survey">
            <div class="py-5">
                <p class="text-center text-muted-foreground">Тут скоро будут опросы!</p>
            </div>
        </Tabs.Content>
    </Tabs.Root>

    <section class="mt-8">
        <header class="flex items-center justify-between gap-2">
             <Title level={2} weight="semibold">АГУ</Title>
             <Button href="/university" variant="link" class="h-auto p-0 gap-1">
                 Перейти <ChevronRightIcon />
             </Button>
        </header>
    </section>
</article>
