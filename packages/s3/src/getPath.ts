import { useMode } from '@repo/env/mode';
import { join } from 'node:path';
import z from 'zod/v4';

const mode = useMode(Bun.env);
const USE_TEST = mode === 'DEVELOPMENT' || mode === 'PREVIEW';

const pathSchema = z.string().refine(path => path.startsWith('/'), {
    message: 'Путь должен начинаться с "/"',
}).refine(path => /^(\/[^/]+(\/[^/]+)*)?$/.test(path), {
    message: 'Некорректный формат пути'
});

export const getPath = (...paths: string[]) => {
    try {
        const path = join(...paths);
        pathSchema.parse(path);

        return USE_TEST ? `/test${path}` : path;
    } catch {
        return null;
    }
};

export default getPath;
