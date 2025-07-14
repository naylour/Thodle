export const manifest = (() => {
    function __memo(fn) {
        let value;
        return () => (value ??= value = fn());
    }

    return {
        appDir: '_app',
        appPath: '_app',
        assets: new Set(['favicon.svg']),
        mimeTypes: { '.svg': 'image/svg+xml' },
        _: {
            client: {
                start: '_app/immutable/entry/start.CesPNb6-.js',
                app: '_app/immutable/entry/app.DfnACbGA.js',
                imports: [
                    '_app/immutable/entry/start.CesPNb6-.js',
                    '_app/immutable/chunks/DcLYPkg8.js',
                    '_app/immutable/chunks/CntYslex.js',
                    '_app/immutable/chunks/DXRu5oHn.js',
                    '_app/immutable/chunks/BJDIZi-A.js',
                    '_app/immutable/entry/app.DfnACbGA.js',
                    '_app/immutable/chunks/DXRu5oHn.js',
                    '_app/immutable/chunks/CntYslex.js',
                    '_app/immutable/chunks/BJDIZi-A.js',
                    '_app/immutable/chunks/NZTpNUN0.js',
                ],
                stylesheets: [],
                fonts: [],
                uses_env_dynamic_public: false,
            },
            nodes: [
                __memo(() => import('./server/nodes/0.js')),
                __memo(() => import('./server/nodes/1.js')),
                __memo(() => import('./server/nodes/2.js')),
            ],
            routes: [
                {
                    id: '/',
                    pattern: /^\/$/,
                    params: [],
                    page: { layouts: [0], errors: [1], leaf: 2 },
                    endpoint: null,
                },
            ],
            prerendered_routes: new Set([]),
            matchers: async () => {
                return {};
            },
            server_assets: {},
        },
    };
})();

export const prerendered = new Set([]);
