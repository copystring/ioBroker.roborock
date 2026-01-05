import type { Roborock } from "../main";
import { BaseDeviceFeatures } from "./features/baseDeviceFeatures";
import "./features/vacuum/index";
export declare class DeviceManager {
    private adapter;
    private mainUpdateInterval;
    deviceFeatureHandlers: Map<string, BaseDeviceFeatures>;
    constructor(adapter: Roborock);
    /**
     * Initializes devices from HTTP API.
     */
    initializeDevices(): Promise<void>;
    /**
     * Removes orphaned device folders.
     */
    private cleanupOrphanedDevices;
    private lastStateCode;
    /**
     * Get current state code.
     */
    private getDeviceState;
    /**
     * Check if robot is active.
     */
    private isActiveState;
    /**
     * Starts polling.
     */
    startPolling(): void;
    /**
     * Polling logic for B01 devices.
     */
    private pollB01Device;
    /**
     * Polling logic for A01 devices.
     */
    private pollA01Device;
    /**
     * Polling logic for V1 (Legacy) devices.
     */
    private pollV1Device;
    /**
     * Stops polling.
     */
    stopPolling(): void;
    /**
     * Fetches non-status data.
     */
    updateDeviceData(handler: BaseDeviceFeatures, duid: string): Promise<void>;
    /**
     * Fetches consumable percentages.
     */
    updateConsumablesPercent(duid: string): Promise<void>;
}
