Bun.build({
    entrypoints: ['./src/index.ts'],
    format: 'esm',
    minify: true,
    outdir: './build',
    packages: 'bundle',
    sourcemap: 'external',
    target: 'bun',
});
