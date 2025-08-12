<script lang="ts" module>
    import { useTMA, useApp } from "$stores";
    import { onDestroy, onMount } from "svelte";
    import * as Card from "$components/ui/card";
    import * as Toggle from "$components/ui/toggle-group";
    import { ScrollArea } from "$components/ui/scroll-area";
    import { Button } from "$components/ui/button";
    import { Schedule, ChangeTheme, Title } from "$components";
    import { BlockRoot, BlockItem } from "$components/Block";

    import QuestionIcon from '@lucide/svelte/icons/message-circle-more'
    import QuestionAppIcon from '@lucide/svelte/icons/circle-question-mark'
    import PrivacyIcon from '@lucide/svelte/icons/shield-check'
</script>

<script lang="ts">
import Helps from "./Helps.svelte";
    import Theme from "./Theme.svelte";


    const tma = useTMA();
    const app = useApp();

    // onMount(() => {
    //     tma.mainButton = {
    //         isVisible: true,
    //         text: "Отменить изменения",
    //     };
    // });

    // onDestroy(() => {
    //     tma.mainButton = {
    //         isVisible: false,
    //         text: "Нет текста",
    //     };
    // });
</script>

<article id="settings" class={[
    "flex flex-col gap-4",
]}>
    <Theme />
    <Helps />
</article>
