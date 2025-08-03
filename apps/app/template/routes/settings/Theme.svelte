<script>
    import { ChangeMode, ChangeTheme, Title } from "$components";
    import * as Card from "$components/ui/card";

</script>


<section>
    <Card.Root class="gap-0">
        <Card.Header class="px-6">
            <Card.Title>
                <Title weight="semibold" class="text-sm text-primary">Тема</Title>
            </Card.Title>
        </Card.Header>

        <Card.Content class="flex flex-col gap-2">
            <div class="px-4">
                <ChangeMode />
            </div>
            <div class="px-4">
                <ChangeTheme />
            </div>
        </Card.Content>
    </Card.Root>

    <p class="px-2 text-[12px] text-muted-foreground text-center font-mono py-2">Настройте внешний вид вашего приложения по своему вкусу!</p>
</section>
