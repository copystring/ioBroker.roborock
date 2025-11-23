import type { Roborock } from "../main";
import { BaseDeviceFeatures } from "./features/baseDeviceFeatures";
import "./features/vacuum/index";
export declare class DeviceManager {
    private adapter;
    private mainUpdateInterval;
    deviceFeatureHandlers: Map<string, BaseDeviceFeatures>;
    constructor(adapter: Roborock);
    /**
     * Initializes all devices found via the HTTP API.
     */
    initializeDevices(): Promise<void>;
    private lastCleaningState;
    /**
     * Starts the polling loops.
     */
    startPolling(): void;
    /**
     * Stops the polling interval.
     */
    stopPolling(): void;
    /**
     * Fetches non-status data (consumables, timers, etc.) for a device.
     */
    updateDeviceData(handler: BaseDeviceFeatures, duid: string): void;
    /**
     * Fetches consumable percentages from cloud data.
     */
    updateConsumablesPercent(duid: string): Promise<void>;
}
