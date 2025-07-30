import type { Snippet } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';
import { ulid } from 'ulid';

export interface Banner {
    id: string;
    img?: string;
    title: string;
    content?: string;
    onclose?: () => void;
    onaction?: () => void;
    button: string;
    icon?: string;
}

export default new (class {
    #banners = new SvelteMap<string, Banner[]>();

    banners = (key: string) => {
        return this.#banners.get(key) ?? [];
    }

    initScope = (key: string) => {
        if(!this.#banners.has(key)) this.#banners.set(key, []);
    }

    setBanner = (key: string = 'default', banner: Omit<Banner, 'id'>) => {
        if(!this.#banners.has(key)) this.#banners.set(key, []);

        const banners = this.#banners.get(key) ?? [];

        const id = ulid()

        banners.push({
            id, ...banner
        });

        this.#banners.set(key, banners);

        return id;
    };

    removeBanner = (key: string, id: string) => {
        if(this.#banners.has(key)) {
            const banners = this.#banners.get(key) ?? [];

            this.#banners.set(key, banners.filter(banner => banner.id !== id));
        }
    }
})();
