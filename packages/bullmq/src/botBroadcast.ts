import { Queue, Worker } from 'bullmq';

const broadcast = new Queue('broadcast', {
    connection: {
        host: 'localhost',
        port: 6379,
    },
});

export const createBroadCastWorker = () =>
    new Worker('broadcast', async (job) => {}, {
        connection: {
            host: 'localhost',
            port: 6379,
        },
    });
