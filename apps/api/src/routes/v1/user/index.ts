import Elysia from "elysia";
import messagePack from "$middlewares/messagePack";

export default new Elysia({
    name: 'RootRouter_V1',
    prefix: '/user',
    tags: ['Thoth', 'User'],
})
.use(messagePack)
.get('/', ({ headers, msgpack }) => {
    return {
        message: 'Hello, world!'
    };
}, {
    useMsgPack: true
})
