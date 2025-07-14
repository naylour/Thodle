import os from 'os';

export const useDeviceHosts = (): string[] => {
    const networkInterfaces = os.networkInterfaces();

    let hosts: string[] = [];

    for (const iface in networkInterfaces) {
        if (networkInterfaces[iface])
            for (const details of networkInterfaces[iface]) {
                if (details.family == 'IPv4' && !details.internal) {
                    hosts.push(details.address);
                }
            }
    }

    return hosts;
};
