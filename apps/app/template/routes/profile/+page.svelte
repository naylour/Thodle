<script lang="ts" module>
    import { useTMA, useApp } from "$stores";
    import * as Avatar from "$components/ui/avatar";
    import { Button } from "$components/ui/button";
    import { Title } from "$components";
    import { onDestroy, onMount } from "svelte";
    import { getUser } from "$remotes/user.remote";

    import EditIcon from '@lucide/svelte/icons/user-round-pen';
</script>

<script lang="ts">
    const tma = useTMA();
    const app = useApp();

    const user = $derived(getUser(tma.initDataRaw));
</script>

<article id="profile" class={[
    "flex flex-col gap-4",
    // tma.viewport.isFullscreen && 'pt-2'
]}>
    {#if user.current}
        <header class="">
            <div class="relative bg-background flex items-center gap-4 py-4 px-3 shadow-sm">
                <Avatar.Root class="size-18">
                    <Avatar.Image src={user.current.avatar} />
                    <Avatar.Fallback class="uppercase">
                            {user.current.firstName.slice(0, 2)}
                        </Avatar.Fallback>
                </Avatar.Root>

                <div class="flex flex-col gap-1 items-start justify-center overflow-hidden">
                    <Title
                        level={2}
                        weight="semibold"
                        class="line-clamp-1 break-all text-lg leading-none!"
                    >
                        {user.current.firstName}
                        {user.current?.lastName}
                    </Title>
                    {#if user.current.username}
                        <Button
                            variant="link"
                            class="p-0! h-auto justify-start break-all max-w-[calc(100%-34px)]"
                            onclick={() => {}}
                        >
                            <span class="w-full text-ellipsis overflow-hidden text-start">
                                {user.current.username}
                            </span>
                        </Button>
                    {/if}
                </div>

                <Button class="absolute -bottom-4 right-4 h-auto aspect-square size-15 p-0! rounded-full border-4 border-secondary shadow-none!">
                    <EditIcon class="size-5! stroke-[1.4] " />
                </Button>
            </div>
        </header>
    {/if}

    <section class="bg-background shadow-sm py-4 px-3">
        <p class="line-clamp-1 pb-2 text-primary font-semibold text-sm">Группа</p>
        <Button clear class="flex items-stretch gap-4 h-full text-start" href="/group">
            <Avatar.Root class="size-13 ">
                <!-- <Avatar.Image /> -->
                <Avatar.Fallback class="text-md font-medium font-mono bg-linear-to-r from-cyan-500 to-blue-500 text-white">
                    ИБ
                </Avatar.Fallback>
            </Avatar.Root>

            <div class="h-full w-full flex flex-col justify-center">
                <Title level={3} class="text-md font-semibold!">ИБ 2025</Title>
                <p class=" text-sm">23 студента</p>
            </div>
        </Button>
    </section>


    <section class="mt-4">
        <p class="text-center font-mono text-muted-foreground text-sm">
            Тут скоро будет Ваша стена!
        </p>
    </section>
    <!-- <section class="bg-background shadow-sm py-4 px-3">
        <div>
            Ваша стена
        </div>
    </section> -->
</article>
