export const index = 2;
let component_cache;
export const component = async () =>
    (component_cache ??= (await import('../entries/pages/_page.svelte.js'))
        .default);
export const imports = [
    '_app/immutable/nodes/2.DI9pMQzO.js',
    '_app/immutable/chunks/NZTpNUN0.js',
    '_app/immutable/chunks/BQW-wJTv.js',
    '_app/immutable/chunks/DXRu5oHn.js',
];
export const stylesheets = [];
export const fonts = [];
