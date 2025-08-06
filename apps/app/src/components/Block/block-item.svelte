<script lang="ts" module>
    import * as Card from '$components/ui/card';
    import type { Icon } from '@lucide/svelte';
    import type { Snippet } from 'svelte';
    import { Button } from '$components/ui/button';

    interface Props {
        children: Snippet<[]>;
        icon?: Snippet<[]>;
        href?: string;
        hover?: boolean;
    }
</script>

<script lang="ts">
    let { children, href, icon, hover = true }: Props = $props();
</script>


<Button data-slot="block-item" clear {href} class={[
    "flex items-center px-3 gap-3",
    "text-sm transition-all",
    "not-last:[&_[data-slot=block-item-content]]:border-b rounded-md",
    hover && "hover:bg-gray-300/10 hover:cursor-pointer active:bg-gray-300/15",
    "[&_svg]:stroke-[2px]"
]}>
        {#if icon}
    <div>
          {@render icon()}
    </div>
        {/if}
    <div data-slot="block-item-content" class="py-4 w-full">
        {@render children?.()}
    </div>
</Button>
