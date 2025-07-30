<script lang="ts" module>
    import type { Snippet } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";

    interface Props extends HTMLButtonAttributes {
        children: Snippet<[]>;
        name?: string;
    }
</script>

<script lang="ts">
    let { children, name, ...restProps }: Props = $props();
</script>

<button {...restProps}>
    {@render children?.()}

    {#if name}
        <span>
            You're name is {name}!
        </span>
    {/if}
</button>
