import ky from 'ky';
import { PersistedState } from 'runed';
import { getContext, setContext } from 'svelte';
import { page } from '$app/state';

// biome-ignore assist/source/useSortedKeys: true
export const Themes = {
    default: '#0ea5e9',
    amber: '#f59e0b',
    blue: '#3b82f6',
    cyan: '#06b6d4',
    emerald: '#10b981',
    fuchsia: '#d946ef',
    gray: '#6b7280',
    green: '#22c55e',
    indigo: '#6366f1',
    lime: '#84cc16',
    neutral: '#737373',
    orange: '#f97316',
    pink: '#ec4899',
    purple: '#a855f7',
    red: '#ef4444',
    rose: '#f43f5e',
    sky: '#0ea5e9',
    slate: '#64748b',
    stone: '#78716c',
    teal: '#14b8a6',
    violet: '#8b5cf6',
    yellow: '#eab308',
    zinc: '#71717a',
} as const;
// biome-ignore assist/source/useSortedKeys: true
export const ThemesName = {
    default: 'Thodle',
    amber: 'Янтарь',
    blue: 'Синий',
    cyan: 'Голубой',
    emerald: 'Изумруд',
    fuchsia: 'Фуксия',
    gray: 'Серый',
    green: 'Зелёный',
    indigo: 'Индиго',
    lime: 'Лайм',
    neutral: 'Нейтральный',
    orange: 'Апельсин',
    pink: 'Розовый',
    purple: 'Фиолетовый',
    red: 'Красный',
    rose: 'Роза',
    sky: 'Небо',
    slate: 'Шифер',
    stone: 'Камень',
    teal: 'Чирок',
    violet: 'Фиалка',
    yellow: 'Жёлтый',
    zinc: 'Цинк',
} as const;

export type Theme = keyof typeof Themes;

class App {
    themes = Themes;
    themesKeys = Object.keys(Themes) as Theme[];
    themesNames = ThemesName;

    state = $state<AppState>({
        apiURl: '',
        isLoad: false,
        showUserTitleBlock: true,
    });

    api = $derived(
        ky.extend({
            credentials: 'include',
            prefixUrl: this.state.apiURl,
            throwHttpErrors: false,
        }),
    );

    #mode = new PersistedState<AppMode>(
        'app-mode',
        {
            auto: true,
            isDark: true,
        },
        {
            storage: 'local',
        },
    );

    get mode(): AppMode {
        return this.#mode.current;
    }
    set mode(mode: Partial<AppMode>) {
        this.#mode.current = {
            ...this.#mode.current,
            ...mode,
        };
    }

    loadTimeout = $state(600);

    get isLoad() {
        return this.state.isLoad;
    }
    set isLoad(value: boolean) {
        if (!value) this.state.isLoad = value;
        else
            setTimeout(() => {
                this.state.isLoad = value;
            }, this.loadTimeout);
    }

    #theme = new PersistedState<Theme>('theme', 'default', {
        storage: 'local',
    });

    set theme(theme: Theme) {
        this.#theme.current = theme;
    }

    get theme() {
        return this.#theme.current;
    }

    constructor() {
        $effect.root(() => {
            $effect(() => {
                if (this.isLoad)
                    document.documentElement.setAttribute('data-load', '');
                else document.documentElement.removeAttribute('data-load');
            });

            $effect(() => {
                document.documentElement.setAttribute(
                    'data-pathname',
                    page.url.pathname,
                );
            });

            $effect(() => {
                document.documentElement.classList.remove(
                    ...Object.keys(this.themes),
                );
                if (this.theme !== 'default') {
                    document.documentElement.classList.add(this.theme);
                }
            });
        });
    }
}

export const APP_KEY = Symbol('APP_KEY'),
    setAppContext = () => setContext(APP_KEY, new App()),
    useApp = (): ReturnType<typeof setAppContext> => getContext(APP_KEY);

export interface AppState {
    isLoad: boolean;
    showUserTitleBlock: boolean;
    apiURl: string;
}

export interface AppMode {
    auto: boolean;
    isDark: boolean;
}
