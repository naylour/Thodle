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
    initDataRaw,
    isColorDark,
    mainButton,
    miniApp,
    on,
    retrieveLaunchParams,
    secondaryButton,
    settingsButton,
    swipeBehavior,
    themeParams,
    useSignal,
    viewport,
} from '@telegram-apps/sdk-svelte';
import kebabCase from 'lodash.kebabcase';
import { setMode } from 'mode-watcher';
import { getContext, setContext } from 'svelte';
import { fromStore } from 'svelte/store';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { page } from '$app/state';

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
    get initDataRaw() {
        return fromStore(useSignal(initDataRaw)).current;
    }
    get user() {
        return this.initData?.user;
    }

    fullscreen = $state<{ available: null | boolean; state: boolean; }>({
        available: null,
        state: false
    })

    isDark = $state.raw(false);

    autoDarkMode = $state.raw(true);

    #theme = (bgColor = themeParams.backgroundColor()) => {
        if (!this.autoDarkMode) {
            if (this.isDark) setMode('dark');
            else setMode('light');
        } else {
            if (!bgColor) return;

            if (isColorDark(bgColor)) {
                setMode('dark');
                this.isDark = true;
            } else {
                setMode('light');
                this.isDark = false;
            }
        }
        this.#changeTheme();
        this.#setButtonsTheme();
    };

    changeTheme = () => {
        this.#theme();
    };

    themeColors = $state({
        dark: {
            bg: '#09090b',
            card: '#18181b',
            secondary: '#27272a',
            secondaryForeground: '#fafafa',
        },
        light: {
            bg: '#FFFFFF',
            card: '#FFFFFF',
            secondary: '#f5f5f5',
            secondaryForeground: '#324155',
        },
        primary: '#0ea5e9',
        primaryForeground: '#FFFFFF',
    });

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
                if (this.autoDarkMode)
                    this.#theme(params.theme_params.bg_color);
            });
            this.#theme(themeParams.backgroundColor());
        }

        $effect.root(() => {
            $effect(() => {
                this.themeColors.primary;
                this.#setButtonsTheme();
            });

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
        this.setHeaderColor(
            this.themeColors[this.isDark ? 'dark' : 'light'].bg,
        );
        this.setBackgroundColor(
            this.themeColors[this.isDark ? 'dark' : 'light'].bg,
        );
        this.setBottomBarColor(
            this.themeColors[this.isDark ? 'dark' : 'light'].card,
        );
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

            this.fullscreen.available = viewport.requestFullscreen.isSupported() &&
            ['android', 'ios'].includes(
                retrieveLaunchParams().tgWebAppPlatform,
            ) &&
            viewport.requestFullscreen.isAvailable()

            if (
                !viewport.isFullscreen() &&
                this.fullscreen.available
            ) {
                viewport.requestFullscreen();
                this.fullscreen.state = true;
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

        if (mainButton.mount.isAvailable()) {
            mainButton.mount();
        }
        if (secondaryButton.mount.isAvailable()) {
            secondaryButton.mount();
        }

        this.#setButtonsTheme();
    };

    #setButtonsTheme = () => {
        if (mainButton.isMounted() && mainButton.isEnabled())
            mainButton.setParams({
                backgroundColor: this.themeColors.primary as `#${string}`,
                textColor: this.themeColors.primaryForeground as `#${string}`,
            });
        if (secondaryButton.isMounted() && secondaryButton.isEnabled())
            secondaryButton.setParams({
                backgroundColor: this.themeColors[
                    this.isDark ? 'dark' : 'light'
                ].secondary as `#${string}`,
                textColor: this.themeColors[this.isDark ? 'dark' : 'light']
                    .secondaryForeground as `#${string}`,
            });
    };

    set mainButton(state: Partial<
        Omit<MainButtonState, 'backgroundColor' | 'textColor'>
    >) {
        if (mainButton.isMounted() && mainButton.isEnabled()) {
            mainButton.setParams({
                ...mainButton.state(),
                ...state,
            });
        }
    }
    set secondaryButton(state: Partial<
        Omit<SecondaryButtonState, 'backgroundColor' | 'textColor'>
    >) {
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
