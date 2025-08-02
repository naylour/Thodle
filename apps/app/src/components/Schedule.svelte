<script lang="ts" module>
    import LectionIcon from "@lucide/svelte/icons/graduation-cap";
    import PracticeIcon from "@lucide/svelte/icons/notebook-pen";
    import ActivityIcon from "@lucide/svelte/icons/medal";
    import TypeUndefinedIcon from "@lucide/svelte/icons/file-question-mark";
    import ClockIcon from "@lucide/svelte/icons/clock";
    import CalendarIcon from "@lucide/svelte/icons/calendar-range";
    import InfoIcon from "@lucide/svelte/icons/info";
    import EllipsisIcon from "@lucide/svelte/icons/ellipsis-vertical";
    import ShareIcon from "@lucide/svelte/icons/share";

    import { Title } from "$components";
    import { Badge } from "$components/ui/badge";
    import { Button } from "$components/ui/button";
    import { Label } from "$components/ui/label";
    import { Checkbox } from "$components/ui/checkbox";
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
                subtitle: "Алиев М. В.",
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
    const uid = $props.id();
    let openDrawer = $state.raw(false);
    let anotherVariant = $state.raw(false);
</script>

<Card.Root>
    <Card.Header class="gap-0">
        <Card.Title class="flex items-center justify-between gap-2">
            <Title
                level={3}
                class="first-letter:uppercase text-md"
                weight="bold"
            >
                {dayjs(schedule.date).format("dddd, DD MMMM")}
            </Title>
        </Card.Title>

        <Card.Description>
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
        </Card.Description>

        <Card.Action class="">
            <Button disabled variant="secondary">
                <ShareIcon />
            </Button>

            <Button
                variant="outline"
                onclick={() => {
                    openDrawer = true;
                }}
            >
                <EllipsisIcon />
            </Button>
        </Card.Action>
    </Card.Header>

    <Card.Content class="flex flex-col">
        {#each schedule.classes as { title, type, subtitle, time, room }, i (i)}
            <div
                class={[
                    "relative last:before:hidden before:absolute before:bottom-0 before:left-[10px] before:w-[calc(100%-20px)] before:h-[1px] before:bg-muted",
                    "grid grid-cols-[22px_1fr_0.5fr] gap-1 py-2 px-2 items-center",
                    "active:bg-gray-300/10 hover:bg-gray-300/10 hover:cursor-pointer transition-colors",
                    "rounded-sm select-none",
                    // i < 2 && "opacity-70"
                ]}
            >
                <div class="flex flex-col items-center gap-[4px]">
                        <Badge
                            variant="secondary"
                            class="rounded-[8px] w-full font-mono font-bold aspect-square"
                        >
                            {i + 1}
                        </Badge>
                        <Badge
                            variant="outline"
                            class={[
                                "rounded-[8px] w-full py-[2px] px-[4px] aspect-square",
                                {
                                    "border-green-500 text-green-500":
                                        type === "activity",
                                    "border-indigo-500 text-indigo-500":
                                        type === "lection",
                                    "border-yellow-500 text-yellow-500":
                                        type === "practice",
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
                    <div class="flex flex-col gap-1 justify-center pl-1">
                        <!-- <div class="flex items-center gap-1">
                        </div> -->
                        <Title
                            level={5}
                            class="text-[14px] line-clamp-2 font-semibold leading-none"
                        >
                            {title}
                        </Title>
                        <div class="flex items-center gap-2">
                            <p
                                class="text-muted-foreground text-[13px] font-medium"
                            >
                                {subtitle}
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col gap-[3px]">
                        <Badge variant="default" class="ml-auto">
                            {room}
                        </Badge>
                        <Badge class="ml-auto" variant="outline">
                            <ClockIcon />
                            {time[0]}-{time[1]}
                        </Badge>
                    </div>
            </div>
        {/each}
    </Card.Content>

    <Card.Footer>
        <!-- <div>
            <Label id="{uid}-another">
                <Checkbox id="{uid}-another" bind:checked={anotherVariant} />
                Другой вид
            </Label>
        </div> -->
    </Card.Footer>
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
