import Elysia from "elysia";

export default new Elysia({
    name: 'RootRouter_V1',
    prefix: '/user',
    tags: ['Thoth', 'User'],
}).get('/', 'Hello, from user endpoint!')
