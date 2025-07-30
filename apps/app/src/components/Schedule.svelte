<script lang="ts" module>
    import LectionIcon from "@lucide/svelte/icons/graduation-cap";
    import PracticeIcon from "@lucide/svelte/icons/notebook-pen";
    import ActivityIcon from "@lucide/svelte/icons/medal";
    import ClockIcon from "@lucide/svelte/icons/clock";
    import CalendarIcon from "@lucide/svelte/icons/calendar-range";
    import InfoIcon from "@lucide/svelte/icons/info";

    import { Badge, Title, Button } from "$components";

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
    // console.log(Drawer.Root)
</script>

<section class="flex flex-col items-end" data-vaul-drawer-wrapper>
    <div class="bg-card py-2 px-3 rounded-lg border border-muted w-full">
        <header class="mb-2 flex items-stretch justify-between gap-1">
            <div
                class="flex items-center justify-between w-full bg-secondary rounded-lg py-1 pl-3 pr-2"
            >
                <p
                    class="first-letter:uppercase font-semibold text-[14px] whitespace-nowrap"
                >
                    {dayjs(schedule.date)
                        .add(2, "months")
                        .add(-20, "days")
                        .format("dd, ll")}
                </p>
                <Badge
                    class={[
                        "",
                        {
                            "bg-black": schedule.weekType == "second",
                            "bg-red-600": schedule.weekType == "first",
                        },
                    ]}
                >
                    <CalendarIcon />
                    {#if schedule.weekType == "first"}
                        Красная
                    {:else if schedule.weekType == "second"}
                        Чёрная
                    {:else}
                        Неизвестно
                    {/if}
                </Badge>
            </div>

            <!-- <Drawer.Root shouldScaleBackground={false}>
                <Drawer.Trigger>
                    {#snippet child({ props })}
                        <Button
                            {...props}
                            class="aspect-square min-h-full p-2 bg-blue-400 rounded-lg"
                        >
                            <InfoIcon />
                        </Button>
                    {/snippet}
                </Drawer.Trigger>

                <Drawer.Content>
                    <Drawer.Header>
                        <Drawer.Title>Заголовок</Drawer.Title>
                    </Drawer.Header>
                </Drawer.Content>
            </Drawer.Root> -->
        </header>
        <ul class="flex flex-col gap-0 pt-1">
            {#each schedule.classes as { time, title, type, subtitle, room }, i (i)}
                <li class="not-last:border-b border-b-muted py-2">
                    <div class="flex items-stretch justify-between gap-2">
                        <div class="flex flex-col items-center gap-0">
                            <Badge
                                variant="outline"
                                class="w-full aspect-square rounded-b-none rounded-t-[10px] font-mono"
                            >
                                {i + 1}
                            </Badge>
                            <Badge
                                class={[
                                    "p-1 w-full aspect-square rounded-t-none rounded-b-[10px]",
                                    {
                                        "bg-green-500": type === "activity",
                                        "bg-yellow-500": type === "practice",
                                        "bg-blue-400": type === "lection",
                                    },
                                ]}
                            >
                                {#if type === "lection"}
                                    <LectionIcon />
                                    <!-- Лекция -->
                                {:else if type === "practice"}
                                    <PracticeIcon />
                                    <!-- Практика -->
                                {:else if type === "activity"}
                                    <ActivityIcon />
                                    <!-- Активность -->
                                {/if}
                            </Badge>
                        </div>
                        <div class="flex flex-col gap-1 w-full">
                            <div
                                class="flex items-center justify-between gap-0 w-full"
                            >
                                <Title
                                    level={4}
                                    class="text-[15px] line-clamp-1 break-all"
                                    weight="semibold"
                                >
                                    {title}
                                </Title>

                                <Badge class="font-mono" variant="default"
                                    >{room}</Badge
                                >
                            </div>

                            <div
                                class="flex items-center gap-1 justify-between"
                            >
                                <span class="muted text-[14px]">
                                    {subtitle}
                                </span>
                                <Badge variant="outline" class="">
                                    <ClockIcon />
                                    {time[0]}-{time[1]}
                                </Badge>
                            </div>
                        </div>

                        <!-- <div class="min-h-full">
                            <Button class="p-1 min-h-full w-auto rounded-sm">
                                <InfoIcon />
                            </Button>
                        </div> -->
                    </div>
                    <div></div>
                </li>
            {/each}
        </ul>
    </div>
    <Button variant="link" class="px-0 h-automl-auto">
        Посмотреть полное расписание
    </Button>
</section>
