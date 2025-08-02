import { Queue, Worker } from 'bullmq';

const _broadcast = new Queue('broadcast', {
    connection: {
        host: 'localhost',
        port: 6379,
    },
});

export const createBroadCastWorker = () =>
    new Worker('broadcast', async (_job) => {}, {
        connection: {
            host: 'localhost',
            port: 6379,
        },
    });
