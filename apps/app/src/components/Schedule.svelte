<script lang="ts" module>
    import LectionIcon from "@lucide/svelte/icons/graduation-cap";
    import PracticeIcon from "@lucide/svelte/icons/notebook-pen";
    import ActivityIcon from "@lucide/svelte/icons/medal";
    import TypeUndefinedIcon from "@lucide/svelte/icons/file-question-mark";
    import ClockIcon from "@lucide/svelte/icons/clock";
    import CalendarIcon from "@lucide/svelte/icons/calendar-range";
    import InfoIcon from "@lucide/svelte/icons/info";
    import EllipsisIcon from "@lucide/svelte/icons/ellipsis-vertical";

    import { Title } from "$components";
    import { Badge } from "$components/ui/badge";
    import { Button } from "$components/ui/button";
    import * as Card from "$components/ui/card";
    import * as Drawer from "$components/ui/drawer";

    import dayjs from "dayjs";
    import Localized from "dayjs/plugin/localizedFormat";
    import "dayjs/locale/ru";

    dayjs.extend(Localized);
    dayjs.locale("ru");

    interface ScheduleClass {
        title: string;
        type: "lection" | "practice" | "activity";
        subtitle: string;
        room: string;
        time: [string, string];
    }

    interface Schedule {
        weekType: "first" | "second";
        date: Date;
        classes: ScheduleClass[];
    }

    const schedule: Schedule = {
        weekType: "first",
        date: new Date(),
        classes: [
            {
                title: "Алгебра и геометрия",
                subtitle: "Калашникова С. И.",
                type: "lection",
                room: "309",
                time: ["9:00", "10:45"],
            },
            {
                title: "Языки программирования",
                subtitle: "доц. Алиев М. В.",
                type: "practice",
                room: "312-a",
                time: ["10:45", "12:20"],
            },
            {
                title: "Математический анализ",
                subtitle: "Артисевич А. Е.",
                type: "lection",
                room: "327",
                time: ["13:00", "14:35"],
            },
            {
                title: "Физическая культура и спорт",
                subtitle: "Ельникова О. О.",
                type: "activity",
                room: "стадион",
                time: ["14:45", "16:20"],
            },
        ],
    };
</script>

<script lang="ts">
    let openDrawer = $state.raw(false);
</script>

<Card.Root>
    <Card.Header class="flex items-center justify-between">
        <Card.Title class="flex items-center justify-between gap-2">
            <Title
                level={3}
                class="first-letter:uppercase text-md"
                weight="bold"
            >
                {dayjs(schedule.date).format("dddd, DD MMMM")}
            </Title>
            <Badge variant="outline">
                <CalendarIcon />
                {#if schedule.weekType === "first"}
                    Чёрная неделя
                {:else if schedule.weekType === "second"}
                    Красная неделя
                {:else}
                    Неизвестно
                {/if}
            </Badge>
        </Card.Title>

        <!-- <Card.Description>

        </Card.Description> -->

        <Card.Action class="">
            <Button
                variant="secondary"
                onclick={() => {
                    openDrawer = true;
                }}
            >
                <EllipsisIcon />
            </Button>
        </Card.Action>
    </Card.Header>

    <Card.Content class="flex flex-col gap-1">
        {#each schedule.classes as { title, type, subtitle }, i (i)}
            <div
                class={[
                    "not-last:border-b border-muted",
                    "grid grid-cols-[25px_1fr_40px] gap-2 py-2",
                ]}
            >
                <div class="flex flex-col items-center gap-1 justify-center">
                    <Badge
                        variant="secondary"
                        class="rounded-[10px] w-full font-mono font-bold aspect-square"
                    >
                        {i + 1}
                    </Badge>
                    <Badge
                        class={[
                            "aspect-square w-full rounded-[10px] [&>svg]:size-4 p-0",
                            {
                                "bg-green-500": type === "activity",
                                "bg-red-500": type === "lection",
                                "bg-yellow-500": type === "practice",
                            },
                        ]}
                    >
                        {#if type === "lection"}
                            <LectionIcon />
                        {:else if type === "practice"}
                            <PracticeIcon />
                        {:else if type === "activity"}
                            <ActivityIcon />
                        {:else}
                            <TypeUndefinedIcon />
                        {/if}
                    </Badge>
                </div>
                <div class="flex flex-col gap-0">
                    <span class="text-[8px] leading-none">Идёт</span>
                    <Title level={5} class="tex-[14px] line-clamp-1 font-semibold">
                        {title}
                    </Title>
                    <p class="text-muted-foreground text-sm font-mono">{subtitle}</p>
                </div>
                <div></div>
            </div>
        {/each}
    </Card.Content>

    <!-- <Card.Footer>
        <div class="text-muted-foreground text-sm">
            <p>
                На сегодня: {schedule.classes.length}
                {#if schedule.classes.length === 1}
                    пара
                {:else if schedule.classes.length >= 2 && schedule.classes.length <= 4}
                    пары
                {:else}
                    пар
                {/if}
            </p>
            <p>Закончились: 2</p>
        </div>
    </Card.Footer> -->
</Card.Root>

<Drawer.Root bind:open={openDrawer}>
    <Drawer.Content>
        <Drawer.Header>
            <Drawer.Title>Заголовок</Drawer.Title>
            <Drawer.Description>Описание</Drawer.Description>
        </Drawer.Header>

        <section class="px-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea quam
            similique nostrum accusantium veniam perferendis ex, minus adipisci
            voluptates incidunt nulla minima omnis quae? Maxime, dolores
            perspiciatis assumenda nam eveniet vitae omnis impedit quod et ipsum
            quisquam ea, cum nostrum.
        </section>
    </Drawer.Content>
</Drawer.Root>
