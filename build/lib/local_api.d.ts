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
    localDevicesTimeout: NodeJS.Timeout | null;
    constructor(adapter: any);
    initiateClient(duid: any): Promise<void>;
    createClient(duid: any, ip: any): Promise<void>;
    isPortOpen(ip: any): Promise<unknown>;
    checkComplete(buffer: any): boolean;
    clearChunkBuffer(duid: any): void;
    sendMessage(duid: any, message: any): void;
    isConnected(duid: any): boolean | undefined;
    getLocalDevices(): Promise<unknown>;
    decryptECB(encrypted: any): any;
    decryptGCM(hexPacket: any): string | null;
    removePadding(str: any): any;
    clearLocalDevicedTimeout(): void;
}
export {};
