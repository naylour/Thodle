import type { LayoutServerLoad } from "./$types";
import { useAppConfig, useMode, usePortsConfig, useSubsConfig } from '@repo/env';
import { useDeviceHosts } from '@repo/utils/deviceHosts'

const mode = useMode(process.env);
const app = useAppConfig(process.env);
const ports = usePortsConfig(process.env);
const subs = useSubsConfig(process.env);
const hosts = useDeviceHosts();
const IS_TEST_ENV = mode === 'DEVELOPMENT' || mode === 'PREVIEW';

const API_URL = new URL(IS_TEST_ENV ? `http://${hosts[0]}` : app.APP_HOST);

if(IS_TEST_ENV) {
    API_URL.port = `${ports.PORT_API_APP}`;
} else {
    API_URL.hostname = `${subs.SUB_API_APP}.${API_URL.hostname}`;
}

API_URL.pathname = '/v1'

export const load: LayoutServerLoad = async (): Promise<{ apiURL: string }> => {
    return {
        apiURL: API_URL.href
    }
}
