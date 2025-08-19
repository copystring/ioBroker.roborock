import type { Roborock } from "../main";
import { MqttClient } from "mqtt";
export declare class mqtt_api {
    adapter: Roborock;
    mqttUser: string;
    mqttPassword: string;
    client: MqttClient | null;
    connected: boolean;
    pendingPhotoRequests: Record<string, any>;
    mqttOptions: any;
    constructor(adapter: Roborock);
    /**
     * Initializes the MQTT API.
     */
    init(): Promise<void>;
    /**
     * Sets up the MQTT user credentials.
     */
    setup_mqtt_user(): void;
    /**
     * Connects to the MQTT broker.
     */
    connect_mqtt(): Promise<void>;
    /**
     * Subscribes to MQTT events.
     * @param {object} client - The MQTT client.
     */
    subscribe_mqtt_events(client: any): Promise<void>;
    /**
     * Subscribes to MQTT messages.
     * @param {object} client - The MQTT client.
     */
    subscribe_mqtt_message(client: any): Promise<void>;
    /**
     * Handles photo data received in chunks (protocol 300 and 301).
     * @param {object} data - The received data.
     * @param {string} endpoint - The endpoint.
     */
    handlePhotoData(data: any, endpoint: any): Promise<void>;
    /**
     * Encodes a timestamp into a specific format.
     * @param {number} timestamp - The timestamp to encode.
     * @returns {string} The encoded timestamp.
     */
    _encodeTimestamp(timestamp: any): string;
    /**
     * Ensures that an endpoint exists, generating one if necessary.
     * @returns {Promise<string>} A promise that resolves with the endpoint.
     */
    ensureEndpoint(): Promise<any>;
    /**
     * Sends a message to the MQTT broker.
     * @param {string} duid - The device unique ID.
     * @param {Buffer} roborockMessage - The message to send.
     */
    sendMessage(duid: any, roborockMessage: any): Promise<void>;
    /**
     * Checks if the MQTT client is connected.
     * @returns {boolean} True if connected, false otherwise.
     */
    isConnected(): boolean;
    /**
     * Disconnects the MQTT client.
     */
    disconnectClient(): Promise<void>;
    /**
     * Calculates the MD5 hash of a string (hexadecimal representation).
     * @param {string} str - The string to hash.
     * @returns {string} The MD5 hash in hexadecimal format.
     */
    md5hex(str: any): string;
    /**
     * Calculates the MD5 hash of a string (binary representation).
     * @param {string} str - The string to hash.
     * @returns {Buffer} The MD5 hash in binary format.
     */
    md5bin(str: any): Buffer;
    /**
     * Clears any intervals or timers used by mqtt_api.
     */
    clearIntervals(): void;
    /**
     * Cleanup resources used by mqtt_api before disposal.
     */
    cleanup(): void;
}
