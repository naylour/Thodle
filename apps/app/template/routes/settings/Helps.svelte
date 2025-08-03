<script>
    import * as Card from "$components/ui/card";
    import { Button } from "$components/ui/button";
    import { Schedule, ChangeTheme, Title } from "$components";

    import QuestionIcon from "@lucide/svelte/icons/message-circle-more";
    import QuestionAppIcon from "@lucide/svelte/icons/circle-question-mark";
    import PrivacyIcon from "@lucide/svelte/icons/shield-check";
</script>

<section>
    <Card.Root class="gap-0">
        <Card.Header class="px-6">
            <Card.Title>
                <Title weight="semibold" class="text-sm text-primary"
                    >Помощь</Title
                >
            </Card.Title>
        </Card.Header>

        <Card.Content class="flex flex-col gap-0">
            <Button
                class="w-full justify-start [&_svg:not([class*='size-'])]:size-6 h-auto py-0 px-3! bg-transparent hover:bg-transparent text-card-foreground shadow-none not-last:[&_div]:border-b"
                size="lg"
            >
                <QuestionIcon strokeWidth={1.4} />
                <div class="py-3 w-full text-start">Задать вопрос</div>
            </Button>
            <Button
                class="w-full justify-start [&_svg:not([class*='size-'])]:size-6 h-auto py-0 px-3! bg-transparent hover:bg-transparent text-card-foreground shadow-none not-last:[&_div]:border-b"
                size="lg"
            >
                <QuestionAppIcon strokeWidth={1.4} />
                <div class="py-3 w-full text-start">Вопросы о Thodle</div>
            </Button>
            <Button
                class="w-full justify-start [&_svg:not([class*='size-'])]:size-6 h-auto py-0 px-3! bg-transparent hover:bg-transparent text-card-foreground shadow-none not-last:[&_div]:border-b"
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
</section>
