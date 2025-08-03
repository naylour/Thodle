<script lang="ts" module>
    import * as Card from '$components/ui/card';
    import type { Icon } from '@lucide/svelte';
    import type { Snippet } from 'svelte';
    import { Button } from '$components/ui/button';

    interface Props {
        children: Snippet<[]>;
        href?: string;
    }
</script>

<script lang="ts">
    let { children, href }: Props = $props();
</script>


<div data-slot="block-item" class={[
    "rounded-sm text-start",
    "has-[>svg]:grid has-[>svg]:grid-cols-[50px_1fr] gap-2",
    !href && "[&>div]:py-4 px-2 hover:bg-gray-200/10",
    "has-[button]:not-last:[&_button>div]:border-b border-muted",
    "has-[button]:[&_button>div]:w-full",
    "not-last:[&>div]:border-b border-muted",
    "[&>div]:w-full",
    "not-[has-[button]]:items-center"
]}>
    {#if href}
      <Button class={[
          "w-full justify-start [&>div]:py-4 py-0! h-auto rounded-md",
          "bg-transparent hover:bg-gray-200/10",
          "[&_svg]:size-5! stroke-[1px]! text-start"
      ]}>
    {@render children?.()}
      </Button>
    {:else}
        {@render children?.()}
    {/if}
</div>
