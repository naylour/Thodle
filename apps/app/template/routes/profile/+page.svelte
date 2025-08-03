<script lang="ts" module>
    import { useTMA, useApp } from "$stores";
    import * as Avatar from "$components/ui/avatar";
    import { Button, Title } from "$components";
    import { onDestroy, onMount } from "svelte";
</script>

<script lang="ts">
    const tma = useTMA();
    const app = useApp();

    const user = $derived(tma.user);

    // onMount(() => {
    //     app.state.showUserTitleBlock = false;
    // })
    // onDestroy(() => {
    //     app.state.showUserTitleBlock = true;
    // })
</script>

<article id="profile">
    {#if user}
        <header class="w-dvw -ml-3">
            <div
                class="bg-secondary flex items-center gap-2 py-2 px-3"
            >
                <Avatar.Root class="size-18 border-3 border-primary">
                    <Avatar.Image src={user.photo_url} />
                    <Avatar.Fallback class="uppercase"
                        >{user.first_name.slice(0, 2)}</Avatar.Fallback
                    >
                </Avatar.Root>

                <div class="">
                    <Title
                        level={3}
                        weight="semibold"
                        class="leading-none line-clamp-1"
                    >
                        {user.first_name}
                        {user?.last_name}
                    </Title>
                    {#if user.username}
                        <Button
                            variant="link"
                            class="py-1 px-0"
                            onclick={() => {}}>{user.username}</Button
                        >
                    {/if}
                </div>
            </div>

            <div class="bg-card px-3">
                Hello
            </div>
        </header>
    {/if}
</article>
