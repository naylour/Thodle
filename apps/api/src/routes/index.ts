import Elysia from 'elysia';
import thoth from './v1';
import seshat from './v2';

export default new Elysia({
    name: 'RootRouter',
})
    .use(thoth)
    .use(seshat);
