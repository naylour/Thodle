<script lang="ts" module>
    import * as Card from "$components/ui/card";
    import { Button } from "$components/ui/button";
    import { Title } from "$components";

    import QuestionIcon from "@lucide/svelte/icons/message-circle-more";
    import QuestionAppIcon from "@lucide/svelte/icons/circle-question-mark";
    import PrivacyIcon from "@lucide/svelte/icons/shield-check";
    import { BlockRoot } from "$components/Block";
    import BlockItem from "$components/Block/block-item.svelte";
    import { Icon } from "@lucide/svelte";

    const buttons = [
        {
            label: 'Задать вопрос',
            icon: QuestionIcon,
            href: '#',
            type: 'internal'
        },
        {
            label: 'Вопросы о Thodle',
            icon: QuestionAppIcon,
            href: '#',
            type: 'internal'
        },
        {
            label: 'Политика конфеденциальности',
            icon: PrivacyIcon,
            href: '#',
            type: 'internal'
        },
    ]
</script>

<!-- <section>
    <Card.Root class="gap-0">
        <Card.Header class="px-6">
            <Card.Title>
                <Title weight="semibold" class="text-sm text-primary">
                        Помощь
                    </Title>
            </Card.Title>
        </Card.Header>

        <Card.Content class="flex flex-col gap-0 [&_button]:not-last:[&_div]:border-b">
            <Button
                class="w-full justify-start [&_svg:not([class*='size-'])]:size-6 h-auto py-0 px-3! bg-transparent text-card-foreground shadow-none active:bg-gray-300/10 hover:bg-gray-300/10 hover:cursor-pointer transition-colors"
                size="lg"
            >
                <QuestionIcon strokeWidth={1.4} />
                <div class="py-3 w-full text-start">Задать вопрос</div>
            </Button>
            <Button
                class="w-full justify-start [&_svg:not([class*='size-'])]:size-6 h-auto py-0 px-3! bg-transparent text-card-foreground shadow-none active:bg-gray-300/10 hover:bg-gray-300/10 hover:cursor-pointer transition-colors"
                size="lg"
            >
                <QuestionAppIcon strokeWidth={1.4} />
                <div class="py-3 w-full text-start">Вопросы о Thodle</div>
            </Button>
            <Button
                class="w-full justify-start [&_svg:not([class*='size-'])]:size-6 h-auto py-0 px-3! bg-transparent text-card-foreground shadow-none active:bg-gray-300/10 hover:bg-gray-300/10 hover:cursor-pointer transition-colors"
                size="lg"
            >
                <PrivacyIcon strokeWidth={1.4} />
                <div class="py-3 w-full text-start">
                    Политика конфеденциальности
                </div>
            </Button>
        </Card.Content>
    </Card.Root>

    <p
        class="px-2 text-[12px] text-muted-foreground text-center font-mono py-2"
    >
        Мы всегда готовы помочь вам сделать использование приложения максимально
        удобным!
    </p>
</section> -->

<BlockRoot title="Помощь" signature=" Мы всегда готовы помочь вам сделать использование приложения максимально удобным!">
    {#snippet elems()}
        {#each buttons as { icon, label, href }, i (i)}
            {@const Icon = icon}
            <BlockItem >
                <Icon />

                <div>
                    <span>{ label }</span>
                </div>
            </BlockItem>
        {/each}
    {/snippet}
</BlockRoot>
