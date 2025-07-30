<script lang="ts" module>
    import type { Snippet } from "svelte";
    import type { HTMLBlockquoteAttributes } from "svelte/elements";

    interface Props extends HTMLBlockquoteAttributes {
        children: Snippet<[]>;
    };

    import QuoteIcon from '@lucide/svelte/icons/quote';
</script>

<script lang="ts">
    let { children, class: _class, ...restProps }: Props = $props();
</script>

<blockquote
    {...restProps}
    class={[
        "relative rounded-lg overflow-hidden py-2 pl-3 pr-5 text-15px line-height-[20px] bg-primary/10",
        "after:content-[''] after:absolute after:top-0 after:left-0 after:h-full after:w-[3px] after:bg-primary after:-z-1",
        _class,
    ]}
>
    <QuoteIcon class="absolute top-2 right-2 size-3 text-primary" />
    <p class="">
        {@render children?.()}
    </p>
</blockquote>
