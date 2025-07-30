import type {
    ImpactHapticFeedbackStyle,
    MainButtonState,
    NotificationHapticFeedbackType,
    SecondaryButtonState,
} from '@telegram-apps/sdk-svelte';
import {
    backButton,
    hapticFeedback,
    init,
    initData,
    isColorDark,
    mainButton,
    miniApp,
    on,
    retrieveLaunchParams,
    secondaryButton,
    // on,
    settingsButton,
    swipeBehavior,
    themeParams,
    useSignal,
    viewport,
} from '@telegram-apps/sdk-svelte';
import chroma from 'chroma-js';
import kebabCase from 'lodash.kebabcase';
import { setMode } from 'mode-watcher';
// import { setMode } from 'mode-watcher';
import { getContext, setContext } from 'svelte';
import { fromStore } from 'svelte/store';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { page } from '$app/state';

const getValues = (oklch: string): number[] =>
    oklch
        .slice(6, oklch.length - 1)
        .split(' ')
        .map((str) => Number(str));

class TMA {
    #initReady = $state.raw(false);
    #miniAppReady = $state.raw(false);
    #themeParamsReady = $state.raw(false);
    #viewportReady = $state.raw(false);

    isReady = $derived(
        this.#initReady &&
            this.#miniAppReady &&
            this.#themeParamsReady &&
            this.#viewportReady,
    );

    get viewport() {
        return fromStore(useSignal(viewport.state)).current;
    }
    get theme() {
        return fromStore(useSignal(themeParams.state)).current;
    }

    get initData() {
        return fromStore(useSignal(initData.state)).current;
    }
    get user() {
        return this.initData?.user;
    }

    #theme = (bgColor?: string) => {
        if (!bgColor) return;

        if (isColorDark(bgColor)) {
            setMode('dark');
        } else setMode('light');
    };

    constructor() {
        if (browser) {
            init({
                acceptCustomStyles: true,
            });
            this.#initReady = true;

            this.#initMiniApp();
            this.#initThemeParams();
            this.#initViewport();
            this.#initButtons();

            initData.restore();

            on('theme_changed', (params) => {
                this.#theme(params.theme_params.bg_color);
                this.#changeTheme();
            });
            this.#theme(themeParams.backgroundColor());

            this.#changeTheme();
        }

        $effect.root(() => {
            $effect(() => {
                page.url;
                this.haptic.impact('soft');
            });
            $effect(() => {
                if (page.url.pathname !== '/') this.showBackButton = true;
                else this.showBackButton = false;
            });

            return () => {
                this.#buttonsOfClicks.back?.();
                this.#buttonsOfClicks.settings?.();
            };
        });
    }

    #changeTheme = () => {
        const computed = getComputedStyle(document.documentElement);

        const primary = chroma.oklch(
            // @ts-ignore
            ...getValues(computed.getPropertyValue('--primary')),
        );
        const background = chroma.oklch(
            // @ts-ignore
            ...getValues(computed.getPropertyValue('--background')),
        );
        const secondary = chroma.oklch(
            // @ts-ignore
            ...getValues(computed.getPropertyValue('--card')),
        );

        this.setHeaderColor(background.hex('auto'));
        this.setBackgroundColor(background.hex('auto'));
        this.setBottomBarColor(secondary.hex('auto'));
    };

    setHeaderColor = (color: string) => {
        if (miniApp.isMounted()) miniApp.setHeaderColor(color);
    };
    setBackgroundColor = (color: string) => {
        if (miniApp.isMounted()) miniApp.setBackgroundColor(color);
    };
    setBottomBarColor = (color: string) => {
        if (miniApp.isMounted()) miniApp.setBottomBarColor(color);
    };

    #initMiniApp = () => {
        if (miniApp.mountSync.isAvailable()) {
            miniApp.mountSync();

            if (
                !miniApp.isCssVarsBound() &&
                miniApp.bindCssVars.isAvailable()
            ) {
                miniApp.bindCssVars((key) => `--tma-${kebabCase(key)}`);
            }

            if (miniApp.ready.isAvailable()) miniApp.ready();

            this.#miniAppReady = true;
        }
    };

    haptic = new (class {
        impact = (type: ImpactHapticFeedbackStyle) => {
            if (hapticFeedback.isSupported()) {
                if (hapticFeedback.impactOccurred.isAvailable())
                    hapticFeedback.impactOccurred(type);
            }
        };
        notify = (type: NotificationHapticFeedbackType) => {
            if (hapticFeedback.isSupported()) {
                if (hapticFeedback.notificationOccurred.isAvailable())
                    hapticFeedback.notificationOccurred(type);
            }
        };
        change = () => {
            if (hapticFeedback.isSupported()) {
                if (hapticFeedback.selectionChanged.isAvailable())
                    hapticFeedback.selectionChanged();
            }
        };
    })();

    #initThemeParams = () => {
        if (themeParams.mountSync.isAvailable()) {
            themeParams.mountSync();

            if (
                !themeParams.isCssVarsBound() &&
                themeParams.bindCssVars.isAvailable()
            ) {
                themeParams.bindCssVars((key) => `--tma-${kebabCase(key)}`);
            }

            this.#themeParamsReady = true;
        }
    };
    #initViewport = async () => {
        if (viewport.mount.isAvailable()) {
            await viewport.mount();

            if (
                !viewport.isFullscreen() &&
                viewport.requestFullscreen.isSupported() &&
                ['android', 'ios'].includes(
                    retrieveLaunchParams().tgWebAppPlatform,
                ) &&
                viewport.requestFullscreen.isAvailable()
            ) {
                viewport.requestFullscreen();
            }

            if (
                !viewport.isCssVarsBound() &&
                viewport.bindCssVars.isAvailable()
            ) {
                viewport.bindCssVars((key) => `--tma-${kebabCase(key)}`);
            }

            if (swipeBehavior.isSupported()) {
                if (!swipeBehavior.isMounted()) swipeBehavior.mount();
                if (
                    !swipeBehavior.isVerticalEnabled() &&
                    swipeBehavior.disableVertical.isAvailable()
                )
                    swipeBehavior.disableVertical();
            }

            this.#viewportReady = true;
        }
    };

    set showBackButton(value: boolean) {
        if (backButton.isMounted()) {
            if (value && !backButton.isVisible()) backButton.show();
            else if (!value && backButton.isVisible()) backButton.hide();
        }
    }

    #onBackButtonClick = () => {
        history.back();
    };
    #onSettingsButtonClick = () => {
        goto('/settings');
    };

    #buttonsOfClicks = $state<ButtonsOffClicks>({
        back: null,
        settings: null,
    });

    #initButtons = () => {
        if (backButton.isSupported()) {
            if (backButton.mount.isAvailable() && !backButton.isMounted())
                backButton.mount();

            this.#buttonsOfClicks.back = backButton.onClick(
                this.#onBackButtonClick,
            );
        }

        if (settingsButton.isSupported()) {
            if (
                settingsButton.mount.isAvailable() &&
                !settingsButton.isMounted()
            )
                settingsButton.mount();

            settingsButton.show();
            this.#buttonsOfClicks.settings = settingsButton.onClick(
                this.#onSettingsButtonClick,
            );
        }

         const computed = getComputedStyle(document.documentElement);

        const primary = chroma.oklch(
            // @ts-ignore
            ...getValues(computed.getPropertyValue('--primary')),
        );
        const primaryForeground = chroma.oklch(
            // @ts-ignore
            ...getValues(computed.getPropertyValue('--primary-foreground')),
        );
        const secondary = chroma.oklch(
            // @ts-ignore
            ...getValues(computed.getPropertyValue('--secondary')),
        );
        const secondaryForeground = chroma.oklch(
            // @ts-ignore
            ...getValues(computed.getPropertyValue('--secondary-foreground')),
        );

        if (mainButton.mount.isAvailable()) {
            mainButton.mount();

            mainButton.setParams({
                backgroundColor: primary.hex('auto'),
                textColor: primaryForeground.hex('auto')
            })
        }
        if (secondaryButton.mount.isAvailable()) {
            secondaryButton.mount();

            secondaryButton.setParams({
                backgroundColor: secondary.hex('auto'),
                textColor: secondaryForeground.hex('auto')
            })
        }
    };

    set mainButton(state: Partial<Omit<MainButtonState, 'backgroundColor' | 'textColor'>>) {
        if (mainButton.isMounted() && mainButton.isEnabled()) {
            mainButton.setParams({
                ...mainButton.state(),
                ...state,
            });
        }
    }
    set secondaryButton(state: Partial<Omit<SecondaryButtonState, 'backgroundColor' | 'textColor'>>) {
        if (secondaryButton.isMounted() && secondaryButton.isEnabled()) {
            secondaryButton.setParams({
                ...secondaryButton.state(),
                ...state,
            });
        }
    }
}

export const MINIAPP_KEY = Symbol('MINIAPP_KEY'),
    setTMAContext = () => setContext(MINIAPP_KEY, new TMA()),
    useTMA = (): ReturnType<typeof setTMAContext> => getContext(MINIAPP_KEY);

export interface ButtonsOffClicks {
    back: null | (() => void);
    settings: null | (() => void);
}
