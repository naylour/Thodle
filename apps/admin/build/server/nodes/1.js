export const index = 1;
let component_cache;
export const component = async () =>
    (component_cache ??= (await import('../entries/fallbacks/error.svelte.js'))
        .default);
export const imports = [
    '_app/immutable/nodes/1.B3PowMLT.js',
    '_app/immutable/chunks/NZTpNUN0.js',
    '_app/immutable/chunks/BQW-wJTv.js',
    '_app/immutable/chunks/DXRu5oHn.js',
    '_app/immutable/chunks/CntYslex.js',
    '_app/immutable/chunks/BJDIZi-A.js',
    '_app/immutable/chunks/DcLYPkg8.js',
];
export const stylesheets = [];
export const fonts = [];
