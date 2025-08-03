import { dev } from '$app/environment';

export const initEruda = async () => {
    if (!dev) return;

    const eruda = (await import('eruda')).default;

    eruda.init();
};

export default initEruda;
