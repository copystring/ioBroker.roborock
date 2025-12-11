import type { Roborock } from "../main";
import { Socket, SocketConstructorOpts } from "net";
interface LocalDevice {
    ip: string;
    version: string;
    connectNonce?: number;
    ackNonce?: number;
}
declare class EnhancedSocket extends Socket {
    connected: boolean;
    chunkBuffer: Buffer;
    constructor(options?: SocketConstructorOpts);
}
export declare class local_api {
    adapter: Roborock;
    deviceSockets: Record<string, EnhancedSocket>;
    cloudDevices: Set<string>;
    localDevices: Record<string, LocalDevice>;
    localDevicesInterval: NodeJS.Timeout | null;
    private reconnectPlanned;
    private connecting;
    private discoveryServer;
    private discoveryTimer;
    constructor(adapter: Roborock);
    /**
     * Initiates a TCP client connection for the given device.
     * Used for local control if an IP is available.
     */
    initiateClient(duid: string): Promise<void>;
    /**
     * Schedules a reconnection attempt after a delay.
     */
    scheduleReconnect(duid: string, reason: string): void;
    /**
     * Checks if an IP is reachable via ICMP Ping.
     */
    isLocallyReachable(ip: string): Promise<boolean>;
    /**
     * Checks if the buffer contains a complete message (or multiple complete messages).
     */
    checkComplete(buffer: Buffer): boolean;
    clearChunkBuffer(duid: string): void;
    sendMessage(duid: string, message: Buffer): void;
    isConnected(duid: string): boolean;
    /**
     * Starts listening for UDP broadcast packets to discover devices.
     */
    startUdpDiscovery(timeoutMs?: number): Promise<void>;
    stopUdpDiscovery(): void;
    /**
     * Initializes connection for L01 protocol devices (Handshake).
     */
    initL01(duid: string): Promise<void>;
    /**
     * Sends the Hello packet (Step 1 of L01 Handshake).
     */
    sendHello(duid: string, connectNonce: number): Promise<void>;
    isLocalDevice(duid: string): boolean;
    getIpForDuid(duid: string): string | null;
    getLocalProtocolVersion(duid: string): string | null;
    /**
     * Decrypts AES-128-ECB packets (Protocol 1.0 Discovery).
     */
    decryptECB(encrypted: Buffer | string): string;
    /**
     * Decrypts AES-256-GCM packets (Protocol L01 Discovery).
     */
    decryptGCM(hexPacket: string): string | null;
    /**
     * Manually removes padding (Legacy support).
     */
    removePadding(str: string): string;
    clearLocalDevicedTimeout(): void;
}
export {};
