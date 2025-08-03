import path from 'node:path';
import { defineConfig } from 'prisma/config';

export default defineConfig({
    experimental: {
        studio: true,
    },
    migrations: {
        path: path.join('prisma', 'migrations'),
    },

    schema: path.join('prisma', 'schema'),
    typedSql: {
        path: path.join('prisma', 'queries'),
    },
    views: {
        path: path.join('prisma', 'views'),
    },
});
