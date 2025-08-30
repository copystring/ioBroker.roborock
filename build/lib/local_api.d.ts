import net from "net";
import dgram from "dgram";
declare class EnhancedSocket extends net.Socket {
    connected: boolean;
    chunkBuffer: Buffer;
    constructor(options?: {});
}
export declare class local_api {
    adapter: any;
    server: dgram.Socket;
    localDevices: Record<string, EnhancedSocket>;
    cloudDevices: Set<string>;
    localIps: Record<string, string>;
    localDevicesTimeout: NodeJS.Timeout | null;
    private reconnectPlanned;
    private connecting;
    constructor(adapter: any);
    /**
     * Initiates a TCP client connection for the given device.
     *
     * @async
     * @param {string} duid - The unique device identifier (DUID).
     * @returns {Promise<void>} Resolves when the client attempt has finished.
     */
    initiateClient(duid: string): Promise<void>;
    createClient(duid: any, ip: any): Promise<void>;
    isLocallyReachable(ip: string): Promise<boolean>;
    checkComplete(buffer: any): boolean;
    clearChunkBuffer(duid: any): void;
    sendMessage(duid: any, message: any): void;
    isConnected(duid: any): boolean | undefined;
    getLocalDevices(): Promise<unknown>;
    updateTcpIps(): Promise<void>;
    /**
     * @param {string} duid
     */
    isLocalDevice(duid: any): boolean;
    getIpForDuid(duid: any): string | null;
    decryptECB(encrypted: any): any;
    decryptGCM(hexPacket: any): string | null;
    removePadding(str: any): any;
    clearLocalDevicedTimeout(): void;
}
export {};
