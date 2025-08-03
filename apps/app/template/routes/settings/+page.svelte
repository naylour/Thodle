<script lang="ts" module>
    import { useTMA, useApp } from "$stores";
    import { onDestroy, onMount } from "svelte";
    import * as Card from "$components/ui/card";
    import * as Toggle from "$components/ui/toggle-group";
    import { ScrollArea } from "$components/ui/scroll-area";
    import { Button } from "$components/ui/button";
    import { Schedule, ChangeTheme, Title } from "$components";

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
    //     tma.secondaryButton = {
    //         isVisible: true,
    //         text: "Отменить изменения",
    //     };
    // });

    // onDestroy(() => {
    //     tma.secondaryButton = {
    //         isVisible: false,
    //         text: "Нет текста",
    //     };
    // });
</script>

<article id="settings" class={[
    "flex flex-col gap-2",
    "[&_section]:not-first:[&_[data-slot=card]]:rounded-t-[10px]",
    "[&_section]:not-last:[&_[data-slot=card]]:rounded-b-[10px]",
]}>
    <Theme />
    <Helps />
</article>
