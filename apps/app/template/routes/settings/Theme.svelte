<script>
    import { ChangeMode, ChangeTheme, Title } from "$components";
    import { BlockRoot } from "$components/Block";
    import BlockItem from "$components/Block/block-item.svelte";
    import * as Card from "$components/ui/card";

</script>


<!-- <section>
    <Card.Root class="gap-0">
        <Card.Header class="px-6">
            <Card.Title>
                <Title weight="semibold" class="text-sm text-primary">Тема</Title>
            </Card.Title>
        </Card.Header>

        <Card.Content class="flex flex-col gap-2 [&>div>div]:py-2 [&>div>div]:not-last:border-b [&>div>div]:border-b-muted">
            <div class="px-4">
                <ChangeMode />
            </div>
            <div class="px-4">
                <ChangeTheme />
            </div>
        </Card.Content>
    </Card.Root>

    <p class="px-2 text-[12px] text-muted-foreground text-center font-mono py-2">Настройте внешний вид вашего приложения по своему вкусу!</p>
</section> -->

<BlockRoot title="Настройки темы" signature=" Мы всегда готовы помочь вам сделать использование приложения максимально удобным!">
    {#snippet elems()}
        <!-- <BlockItem></BlockItem> -->
    {/snippet}
</BlockRoot>
