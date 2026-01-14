import type { Roborock } from "../main";
import { PhotoManager } from "./PhotoManager";
export declare class mqtt_api {
    adapter: Roborock;
    mqttUser: string;
    mqttPassword: string;
    client: any;
    connected: boolean;
    photoManager: PhotoManager;
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
     * Helper to decrypt B01 payload if needed using device keys
     */
    private decryptB01Payload;
    /**
     * Helper to process the inner JSON of a B01 response.
     */
    private handleB01Response;
    /**
     * Processes a single decoded Roborock message frame.
     */
    handleDecodedMessage(duid: string, data: any, endpoint: string, topicEndpoint?: string): Promise<void>;
    /**
     * Handles binary data messages (Protocol 300/301) for Photos or Maps.
     */
    handlePhotoOrMapData(duid: string, data: any, endpoint: string, topicEndpoint?: string): Promise<void>;
    /**
     * Handles V1 Map Data (Standard Encryption with 24-byte header)
     */
    private handleV1Map;
    /**
     * Handles B01 Map Data (JSON Wrapped or Raw Encrypted with MapKey)
     */
    private handleB01Map;
    /**
     * Ensures that a valid endpoint string exists for this adapter instance.
     */
    ensureEndpoint(): Promise<string>;
    /**
     * Publishes a message to the MQTT broker.
     */
    sendMessage(duid: string, roborockMessage: Buffer): Promise<void>;
    isConnected(): boolean;
    disconnectClient(): Promise<void>;
    md5hex(str: string): string;
    md5bin(str: string): Buffer;
    clearIntervals(): void;
    cleanup(): void;
}
