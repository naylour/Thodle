Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './build',
    target: 'bun',
    format: 'esm',
    sourcemap: 'external',
    minify: true,
    packages: 'bundle',
});
