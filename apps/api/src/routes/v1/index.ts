import Elysia from 'elysia';

export default new Elysia({
    name: 'RootRouter_V1',
    prefix: '/v1',
    tags: ['Thoth'],
}).get('', 'Hello, from Thoth');
