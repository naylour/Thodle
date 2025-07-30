<script lang="ts" module>
    import { useTMA } from "$stores";
    import { onDestroy } from "svelte";
</script>

<script lang="ts">
    const tma = useTMA();

    tma.mainButton = {
        isVisible: true,
        text: "Сохранить",
    };
    tma.secondaryButton = {
        isVisible: true,
        text: "Отменить",
    };

    onDestroy(() => {
        tma.secondaryButton = {
            isVisible: false,
            text: "Нет текста",
        };
        tma.mainButton = {
            isVisible: false,
            text: "Нет текста",
        };
    });
</script>
