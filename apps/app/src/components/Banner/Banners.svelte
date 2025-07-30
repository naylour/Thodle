<script lang="ts" module>
    import Banner from "./Banner.svelte";
    import context from "./banners.svelte";

    interface Props {
        key: string;
    }
</script>

<script lang="ts">
    const { key }: Props = $props();

    context.initScope(key);

    const banners = $derived(context.banners(key));
</script>

<section class="py-3 flex flex-col gap-3">
    {#each banners as banner, i (i)}
        <Banner {banner} />
    {/each}
</section>

<div class="flex flex-col gap-2">
    <Banner
        banner={{
            button: "Перейти",
            id: "3424",
            title: "Колаба часа!",
            content: "Поскорее, узнавай подробнее!",
            img: "https://avatars.mds.yandex.net/i?id=8b09251b67e308be307535492afd667e_l-10878007-images-thumbs&n=13",
            icon: "https://i.pinimg.com/originals/9f/2d/d1/9f2dd129fb4027d7150d65df414a08c0.jpg",
            onaction() {},
            onclose() {},
        }}
    />
    <Banner
        banner={{
            button: "Button Click",
            id: "34d24",
            title: "Introducing TON Space",
            content: "Start exploring TON in a new, better way",
            img: "https://avatars.mds.yandex.net/i?id=d146ac4d3ca3a0ce055c499e4f151745_l-4577918-images-thumbs&n=13",
            onaction() {},
            onclose() {},
        }}
    />
    <Banner
        banner={{
            button: "Button Click",
            id: "sdf34d24",
            title: "Introducing TON Space",
            content: "Start exploring TON in a new, better way",
            onaction() {},
            onclose() {},
        }}
    />
</div>
