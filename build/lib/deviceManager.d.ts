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
    private lastMapStatus;
    /**
     * Get current state code.
     */
    private getDeviceState;
    /**
     * Get current map status.
     */
    private getDeviceMapStatus;
    /**
     * Check if robot is active.
     */
    private isActiveState;
    /**
     * Starts polling.
     */
    startPolling(): void;
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
