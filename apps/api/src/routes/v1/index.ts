import Elysia from 'elysia';
import user from './user';

export default new Elysia({
    name: 'RootRouter_V1',
    prefix: '/v1',
    tags: ['Thoth'],
}).use(user).get('', 'Root Endpoint from Thodle API v1 "Thoth"')
