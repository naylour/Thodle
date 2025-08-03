import { defineConfig } from 'prisma/config';
import path from 'node:path';

export default defineConfig({

    schema: path.join("prisma", "schema.prisma"),
    experimental: {
        studio: true,
    },
      migrations: {
        path: path.join("prisma", "migrations"),

      },
      views: {
        path: path.join("prisma", "views"),
      },
      typedSql: {
        path: path.join("prisma", "queries"),
      }
})
