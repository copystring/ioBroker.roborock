import type { Roborock } from "../main";
interface PhotoRequestData {
    chunks: Buffer[];
    timeout?: any;
}
export declare class mqtt_api {
    adapter: Roborock;
    mqttUser: string;
    mqttPassword: string;
    client: any;
    connected: boolean;
    pendingPhotoRequests: Record<string, PhotoRequestData>;
    mqttOptions: any;
    constructor(adapter: Roborock);
    /**
     * Initializes the MQTT API by setting up credentials and connecting.
     */
    init(): Promise<void>;
    /**
     * Derives MQTT credentials from the RRIOT data.
     */
    setup_mqtt_user(): void;
    /**
     * Establishes the connection to the Roborock MQTT broker.
     */
    connect_mqtt(): Promise<void>;
    /**
     * Subscribes to MQTT client events (connect, error, offline, etc.).
     * @param client - The MQTT client instance.
     */
    subscribe_mqtt_events(client: any): Promise<void>;
    /**
     * Sets up the listener for incoming MQTT messages.
     * @param client - The MQTT client instance.
     */
    subscribe_mqtt_message(client: any): Promise<void>;
    /**
     * Processes a single decoded Roborock message frame.
     */
    handleDecodedMessage(duid: string, data: any, endpoint: string): Promise<void>;
    /**
     * Handles binary data messages (Protocol 300/301) for Photos or Maps.
     */
    handlePhotoOrMapData(data: any, endpoint: string): void;
    /**
     * Ensures that a valid endpoint string exists for this adapter instance.
     * Generates one if missing.
     */
    ensureEndpoint(): Promise<string>;
    /**
     * Publishes a message to the MQTT broker.
     * @param duid The Device Unique ID
     * @param roborockMessage The encrypted binary message
     */
    sendMessage(duid: string, roborockMessage: Buffer): Promise<void>;
    isConnected(): boolean;
    /**
     * Gracefully disconnects the MQTT client.
     */
    disconnectClient(): Promise<void>;
    /**
     * Helper: Calculate MD5 hex string.
     */
    md5hex(str: string): string;
    /**
     * Helper: Calculate MD5 binary buffer.
     */
    md5bin(str: string): Buffer;
    /**
     * Clears internal state (e.g. pending partial downloads).
     */
    clearIntervals(): void;
    /**
     * Full cleanup of the API instance.
     */
    cleanup(): void;
}
export {};
