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

<BlockRoot title="Помощь" signature=" Мы всегда готовы помочь вам сделать использование приложения максимально удобным!">
    {#snippet elems()}
        {#each buttons as { icon, label, href }, i (i)}
            {@const Icon = icon}
            <BlockItem {href}>
                {#snippet icon()}
                    <Icon />
                {/snippet}

                <div>
                    <span>{ label }</span>
                </div>
            </BlockItem>
        {/each}
    {/snippet}
</BlockRoot>
