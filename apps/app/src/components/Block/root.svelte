<script lang="ts" module>
    import { Title } from '$components';
    import * as Card from '$components/ui/card';
    import type { Snippet } from 'svelte';

    interface Props {
        signature?: Snippet<[]> | string;
        elems: Snippet<[]>;
        footer?: Snippet<[]>;
        title?: Snippet<[]> | string;
        class?: string;
    }
</script>

<script lang="ts">
    let { signature, elems, title, footer, class: _class }: Props = $props();
</script>


<section data-slot="block" class={[
    "[[data-slot=block]]:not-first:[&_[data-slot=card]]:rounded-t-sm",
    "[[data-slot=block]]:not-last:[&_[data-slot=card]]:rounded-b-sm",
    // "[[data-slot=block]]:not-last:mb-4",
    _class
]}>
    <Card.Root>
        <Card.Header class="px-4">
            <Card.Title>
                {#if typeof title === 'string'}
                  <Title level={3} weight="semibold" class="text-primary text-sm">{title}</Title>
                {:else if title}
                    {@render title()}
                {/if}
            </Card.Title>
        </Card.Header>

        <Card.Content>
            <ul class="flex flex-col">
                {@render elems?.()}
            </ul>
        </Card.Content>

        {#if footer}
          <Card.Footer>
              {@render footer()}
          </Card.Footer>
        {/if}
    </Card.Root>


    {#if typeof signature === 'string'}
        <p class="px-2 mt-2 text-[11px] text-pretty text-muted-foreground text-center font-mono">{signature}</p>
    {:else if signature}
        {@render signature()}
    {/if}
</section>
