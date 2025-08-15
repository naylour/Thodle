<script lang="ts" module>
    import { cn } from "$lib/utils";
    import LoaderIcon from "@lucide/svelte/icons/loader-circle";

    import type { Snippet } from "svelte";
    import type {
        HTMLAnchorAttributes,
        HTMLButtonAttributes,
    } from "svelte/elements";
    import { tv, type VariantProps } from "tailwind-variants";

    export const buttonVariants = tv({
        base: "relative hover:cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap text-sm font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
                destructive:
                    "bg-destructive shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white",
                outline:
                    "bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
                lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
                icon: "size-9",
            },
            round: {
                sm: "rounded-sm",
                default: "rounded-lg",
                lg: "rounded-4xl",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            round: "default"
        },
    });

    export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
    export type ButtonSize = VariantProps<typeof buttonVariants>["size"];
    export type ButtonRound = VariantProps<typeof buttonVariants>["round"];

    interface AnchorAttributes extends HTMLAnchorAttributes {
        type?: never;
        href: string;
    }
    interface ButtonAttributes extends HTMLButtonAttributes {
        href?: never;
    }

    type Props = (AnchorAttributes | ButtonAttributes) & {
        variant?: ButtonVariant;
        size?: ButtonSize;
        round?: ButtonRound;
        disabled?: boolean;
        loading?: boolean;
        children: Snippet<[]>;
    };
</script>

<script lang="ts">
    let {
        class: _class,
        variant = "default",
        size = "default",
        href = undefined,
        type = "button",
        children,
        disabled = false,
        round = "default",
        loading = false,
        ...restProps
    }: Props = $props();

    const attrs = $derived(href ? { href } : { type });
</script>

<svelte:element
    this={href ? "a" : "button"}
    {...restProps}
    {...attrs}
    disabled={href ? null : disabled}
    tabindex={disabled ? -1 : undefined}
    class={cn(buttonVariants({ variant, round, size }), _class)}
>
    {#if loading}
        <LoaderIcon class="animate-spin absolute top-[50%] left-[50%] -translate-[50%]" />
    {/if}
    <span class={[loading && "text-transparent", "contents w-full"]}>
        {@render children?.()}
    </span>
</svelte:element>

<!-- <div class="cursor-"></div> -->
