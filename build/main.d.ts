import * as utils from "@iobroker/adapter-core";
import ws from "ws";
import { roborock_package_helper } from "./lib/roborock_package_helper";
import { requestsHandler } from "./lib/requestsHandler";
import { http_api } from "./lib/httpApi";
import { local_api } from "./lib/localApi";
import { mqtt_api } from "./lib/mqttApi";
import { socketHandler } from "./lib/socketHandler";
import { DeviceManager } from "./lib/deviceManager";
import type { BaseDeviceFeatures } from "./lib/features/baseDeviceFeatures";
export declare class Roborock extends utils.Adapter {
    http_api: http_api;
    local_api: local_api;
    mqtt_api: mqtt_api;
    requestsHandler: requestsHandler;
    socketHandler: socketHandler;
    deviceManager: DeviceManager;
    deviceFeatureHandlers: Map<string, BaseDeviceFeatures>;
    socket: ws | null;
    nonce: Buffer;
    pendingRequests: Map<number, {
        method: string;
        resolve: (value: any) => void;
        reject: (reason?: any) => void;
        timeout: ioBroker.Timeout | undefined;
    }>;
    roborock_package_helper: roborock_package_helper;
    isInitializing: boolean;
    sentryInstance: any;
    translations: Record<string, string>;
    private commandTimeout;
    instance: number;
    constructor(options?: Partial<utils.AdapterOptions>);
    /**
     * Adapter ready logic.
     */
    onReady(): Promise<void>;
    /**
     * Message handler for Admin/Vis communication.
     */
    onMessage(obj: ioBroker.Message): Promise<void>;
    /**
     * Is called when adapter shuts down.
     */
    onUnload(callback: () => void): void;
    /**
     * Is called if a subscribed state changes.
     */
    onStateChange(id: string, state: ioBroker.State | null | undefined): Promise<void>;
    /**
     * Ensures a ClientID exists.
     */
    ensureClientID(): Promise<string>;
    /**
     * Creates base adapter objects (Folders, States).
     */
    setupBasicObjects(): Promise<void>;
    /**
     * Processes scenes from HTTP API.
     */
    processScenes(): Promise<void>;
    /**
     * Clears all timeouts and intervals.
     */
    clearTimersAndIntervals(): void;
    /**
     * Updates general device info (online status, etc.).
     */
    updateDeviceInfo(duid: string, devices: any[]): Promise<void>;
    /**
     * Checks for new firmware.
     */
    checkForNewFirmware(duid: string): Promise<void>;
    /**
     * Creates a state if it doesn't exist, applying translations.
     */
    ensureState(path: string, commonOptions: Partial<ioBroker.StateCommon>, native?: Record<string, any>): Promise<void>;
    /**
     * Creates a folder if it doesn't exist, applying translations.
     */
    ensureFolder(path: string): Promise<void>;
    /**
     * Gets the protocol version for a device.
     */
    getDeviceProtocolVersion(duid: string): Promise<string>;
    /**
     * Starts the go2rtc process if cameras are present.
     */
    start_go2rtc(): Promise<void>;
    /**
     * Processes A01 (Tuya) protocol messages.
     */
    processA01(duid: string, response: {
        dps?: Record<string, any>;
    }): Promise<void>;
    /**
     * Resets the MQTT API instance.
     */
    resetMqttApi(): Promise<void>;
    /**
     * Centralized error handler.
     */
    catchError(error: any, attribute?: string, duid?: string): Promise<void>;
}
