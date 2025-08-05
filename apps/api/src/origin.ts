import cors from "@elysiajs/cors";
import { apiConfig, isTestEnv, ports, subs } from '$lib/config';
import { useDeviceHosts } from '@repo/utils/deviceHosts'

const currentHost = useDeviceHosts()[0];

export default () => {
    const origin: string[] = [];

    if(isTestEnv) {
        for(const port of Object.values(ports)) {
            origin.push(`localhost:${port}`)
            if(currentHost) origin.push(`${currentHost}:${port}`)
        }
    } else {
        for(const sub of Object.values(subs)) {
            const url = new URL(apiConfig.APP_HOST);

            url.hostname = `${sub}.${url.hostname}`;

            origin.push(url.hostname)
        }
    }

    return cors({
        credentials: true,
        origin,

    })
}
