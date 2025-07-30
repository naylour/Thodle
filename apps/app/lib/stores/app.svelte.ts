import { getContext, setContext } from 'svelte';

class App {
    state = $state<AppState>({
        isLoad: false
    });

    get isLoad() {
        return this.state.isLoad;
    }
    set isLoad(value: boolean) {
        if(!value) this.state.isLoad = value;
        else setTimeout(() => {
            this.state.isLoad = value;
        }, 0);
    }

    constructor() {
        $effect.root(() => {
            $effect(() => {
                if(this.isLoad) document.documentElement.setAttribute('data-load', '');
                else document.documentElement.removeAttribute('data-load');
            })
        })
    }
}

export const APP_KEY = Symbol('APP_KEY'),
    setAppContext = () => setContext(APP_KEY, new App()),
    useApp = (): ReturnType<typeof setAppContext> => getContext(APP_KEY);


export interface AppState {
    isLoad: boolean;
}
