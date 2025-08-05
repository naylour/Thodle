import Elysia, { t } from "elysia";
import { Encoder } from '@msgpack/msgpack';

const encoder = new Encoder({
    sortKeys: true,
    useBigInt64: true,
    ignoreUndefined: true,
})

export default new Elysia({
    name: 'MessagePackPlugin',
    seed: {}
}).guard({
    headers: t.Object({
        'accept': t.Optional(
            t.Union([
                t.Literal('application/json'),
                t.Literal('application/x-msgpack'),
                t.Literal('*/*'),
            ])
        )
    })
}).derive(({ headers }) => {
    if (headers["accept"] === 'application/x-msgpack') return {
        msgpack: true
    };

    return {
        msgpack: false
    };
})
.onAfterHandle(({ response, msgpack, headers, set }) => {
    if(msgpack && headers['accept'] === 'application/x-msgpack' && typeof response === 'object') {
        set.headers['Content-Type'] = 'application/x-msgpack';
        return encoder.encode(response);
    }
})
.as('scoped')
