<script lang="ts" module>
    import type { Banner } from "./banners.svelte";

    interface Props {
        banner: Banner;
    }

    import Title from "$components/Title.svelte";

    import CloseIcon from "@lucide/svelte/icons/x";
    import Button from "$components/Button.svelte";
</script>

<script lang="ts">
    const { banner }: Props = $props();
</script>

<div
    class={[
        "rounded-lg bg-card border relative overflow-hidden",
        banner.img && "border-transparent",
    ]}
>
    {#if banner.img}
        <img
            class="absolute top-[50%] left-[50%] -translate-[50%] w-full h-fit object-cover"
            src={banner.img}
            alt=""
        />
    {/if}
    <div
        class={[
            "relative grid grid-cols-[1fr_30px] items-stretch p-4 gap-4 pr-2",
            banner.img && "bg-black/50",
            banner.icon && "grid-cols-[40px_1fr_30px]",
        ]}
    >
        {#if banner.icon}
            <div class="flex flex-col items-center justify-start pt-1">
                <img src={banner.icon} alt="" class="aspect-square w-full rounded-full object-cover" />
            </div>
        {/if}
        <div class="flex flex-col gap-4 items-start">
            <div>
                <Title
                    level={4}
                    class={["text-foreground line-clamp-1", banner.img && "text-white"]}
                >
                    {banner.title}
                </Title>

                {#if banner.content}
                    <p
                        class={[
                            "text-[16px] text-muted-foreground line-clamp-1",
                            banner.img && "text-white/80",
                        ]}
                    >
                        {banner.content}
                    </p>
                {/if}
            </div>

            <Button round="lg" class={[banner.img && "bg-white text-primary"]}
                >{banner.button}</Button
            >
        </div>
        <div class="flex flex-col justify-start items-end">
            <Button
                class={[
                    "h-auto aspect-square p-2 [&_svg]:text-white",
                    !banner.img && "[&_svg]:text-foreground",
                ]}
                round="sm"
                size="lg"
                variant="link"
            >
                <CloseIcon strokeWidth={2} />
            </Button>
        </div>
    </div>
</div>
