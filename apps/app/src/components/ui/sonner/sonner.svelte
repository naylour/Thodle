<script lang="ts" module>
    import LoadingIcon from '@lucide/svelte/icons/loader-circle';
    import SuccessIcon from '@lucide/svelte/icons/check';
    import ErrorIcon from '@lucide/svelte/icons/server-crash';
    import InfoIcon from '@lucide/svelte/icons/info';
    import WarningIcon from '@lucide/svelte/icons/shield-alert';

    import { useTMA } from '$stores/miniapp.svelte';
</script>

<script lang="ts">
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";
	import { mode } from "mode-watcher";

	let { ...restProps }: SonnerProps = $props();

	const tma = useTMA()
</script>

<Sonner
	theme={mode.current}
	class="toaster group"
	style="--normal-bg: var(--color-popover); --normal-text: var(--color-popover-foreground); --normal-border: var(--color-border); bottom: {tma.viewport.safeAreaInsets?.bottom || 10}px;"
	toastOptions={{

	}}
	{...restProps}
>
    {#snippet loadingIcon()}
        <LoadingIcon class="animate-spin text-primary" />
	{/snippet}
	{#snippet successIcon()}
		<SuccessIcon class="text-green-500" />
	{/snippet}
	{#snippet errorIcon()}
		<ErrorIcon class="text-red-500" />
	{/snippet}
	{#snippet infoIcon()}
		<InfoIcon class="text-blue-400" />
	{/snippet}
	{#snippet warningIcon()}
		<WarningIcon class="text-orange-400" />
	{/snippet}
</Sonner>
