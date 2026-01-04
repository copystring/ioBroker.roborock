import * as utils from "@iobroker/adapter-core";
import { AppPluginManager } from "./lib/AppPluginManager";
import { DeviceManager } from "./lib/deviceManager";
import { BaseDeviceFeatures } from "./lib/features/baseDeviceFeatures";
import { http_api } from "./lib/httpApi";
import { local_api } from "./lib/localApi";
import { MapManager } from "./lib/map/MapManager";
import { mqtt_api } from "./lib/mqttApi";
import { requestsHandler } from "./lib/requestsHandler";
import { socketHandler } from "./lib/socketHandler";
export declare class Roborock extends utils.Adapter {
    http_api: http_api;
    local_api: local_api;
    mqtt_api: mqtt_api;
    requestsHandler: requestsHandler;
    socketHandler: socketHandler;
    deviceManager: DeviceManager;
    mapManager: MapManager;
    deviceFeatureHandlers: Map<string, BaseDeviceFeatures>;
    nonce: Buffer;
    pendingRequests: Map<number, any>;
    appPluginManager: AppPluginManager;
    isInitializing: boolean;
    sentryInstance: any;
    translations: Record<string, string>;
    private commandTimeouts;
    private mqttReconnectInterval;
    instance: number;
    private go2rtcProcess;
    private onExitBound;
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
     * Handles commands from onStateChange.
     */
    private handleCommand;
    /**
     * Executes a specific command for a device.
     */
    private executeCommand;
    private isTruthy;
    /**
     * Sets a timeout to reset a state to false after 1 second.
     * Helps avoid race conditions by managing timeouts in a map.
     */
    private setResetTimeout;
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
    /**
     * Centralized Logging Function for Protocol Messages
     * Format: [Connection] [duid] direction (PV: version) (Protocol: protocol) payload
     */
    rLog(connection: "MQTT" | "TCP" | "UDP" | "HTTP" | "Cloud" | "Local" | "System" | "MapManager" | "Requests" | "Unknown", duid: string | null | undefined, direction: "<-" | "->" | "Info" | "Error" | "Warn" | "Debug", version: string | undefined, protocol: string | number | undefined, message: string, level?: "debug" | "info" | "warn" | "error"): void;
    handleFloorSwitch(duid: string, mapFlag: number, stateId: string): Promise<void>;
}
