<script lang="ts" module>
    import { cn } from "$lib/utils";
    import type { HTMLAttributes } from "svelte/elements";
    import { tv, type VariantProps } from "tailwind-variants";

    export const titleVariants = tv({
        base: "text-foreground",
        variants: {
            level: {
                1: "scroll-m-20 text-3xl tracking-tight lg:text-5xl",
                2: "scroll-m-20 border-b pb-2 text-2xl tracking-tight transition-colors first:mt-0",
                3: "scroll-m-20 text-xl tracking-tight",
                4: "scroll-m-20 text-lg  tracking-tight",
                5: "",
                6: "",
            },
            weight: {
                normal: "font-normal",
                bold: "font-extrabold",
                semibold: "font-semibold"
            }
        },
        defaultVariants: {
            level: 2,
            weight: "normal"
        }
    });

    export type TitleLevel = VariantProps<typeof titleVariants>['level']
    export type TitleWeight = VariantProps<typeof titleVariants>['weight']

    interface Props extends HTMLAttributes<HTMLTitleElement> {
        level?: TitleLevel;
        weight?: TitleWeight;
    }
</script>

<script lang="ts">
    let {
        children,
        level: _level = 2,
        class: _class,
        weight = 'normal',
        ...restProps
    }: Props = $props();

    const level = $derived(`h${_level}`);
</script>

<svelte:element
    this={level}
    {...restProps}
    class={cn(titleVariants({ level: _level, weight }), _class)}
>
    {@render children?.()}
</svelte:element>
