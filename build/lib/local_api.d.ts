import net from "net";
declare class EnhancedSocket extends net.Socket {
    connected: boolean;
    chunkBuffer: Buffer;
    constructor(options?: {});
}
export declare class local_api {
    adapter: any;
    deviceSockets: Record<string, EnhancedSocket>;
    cloudDevices: Set<string>;
    localDevices: Record<string, {
        ip: string;
        version: string;
    }>;
    localDevicesInterval: NodeJS.Timeout | null;
    private reconnectPlanned;
    private connecting;
    private discoveryServer;
    private discoveryTimer;
    constructor(adapter: any);
    /**
     * Initiates a TCP client connection for the given device.
     *
     * @async
     * @param {string} duid - The unique device identifier (DUID).
     * @returns {Promise<void>} Resolves when the client attempt has finished.
     */
    initiateClient(duid: string): Promise<void>;
    scheduleReconnect(duid: string, reason: string): void;
    isLocallyReachable(ip: string): Promise<boolean>;
    checkComplete(buffer: any): boolean;
    clearChunkBuffer(duid: any): void;
    sendMessage(duid: any, message: any): void;
    isConnected(duid: any): boolean;
    startUdpDiscovery(timeoutMs?: number): Promise<void>;
    stopUdpDiscovery(): void;
    sendHello(duid: string, ip: string, localKey: string, connectNonce: number): Promise<void>;
    /**
     * @param {string} duid
     */
    isLocalDevice(duid: any): boolean;
    getIpForDuid(duid: any): string | null;
    getLocalProtocolVersion(duid: any): string | null;
    decryptECB(encrypted: any): any;
    decryptGCM(hexPacket: any): string | null;
    removePadding(str: any): any;
    clearLocalDevicedTimeout(): void;
}
export {};
