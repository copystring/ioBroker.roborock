import type { Roborock } from "../main";
import type { BaseDeviceFeatures } from "./features/baseDeviceFeatures";
import { RRMapParser } from "./RRMapParser";
import { messageParser } from "./messageParser";
import { MapCreator } from "./mapCreator";
export declare class requestsHandler {
    adapter: Roborock;
    idCounter: number;
    private deviceQueues;
    messageParser: messageParser;
    mapParser: RRMapParser;
    mapCreator: MapCreator;
    mqttResetInterval: ioBroker.Interval | undefined;
    cached_get_status_value: Record<string, any>;
    constructor(adapter: Roborock);
    private getQueue;
    scheduleMqttReset(): void;
    getStatus(handler: BaseDeviceFeatures, duid: string): Promise<void>;
    getCleaningRecordMap(duid: string, startTime: number): Promise<{
        mapBase64: string;
        mapBase64Truncated: string;
        mapData: string;
    } | null>;
    getCleanSummary(handler: BaseDeviceFeatures, duid: string): Promise<void>;
    getDockingStationStatus(duid: any): {
        cleanFluidStatus: number;
        waterBoxFilterStatus: number;
        dustBagStatus: number;
        dirtyWaterBoxStatus: number;
        clearWaterBoxStatus: number;
        isUpdownWaterReady: number;
    } | null;
    getParameter(handler: BaseDeviceFeatures, duid: string, parameter: string, attribute?: any): Promise<any>;
    private handleGetNetworkInfo;
    private handleGetConsumable;
    private handleGetProp;
    private handleGetRoomMapping;
    private handleGetMultiMapsList;
    private handleGetFwFeatures;
    private handleGetPhoto;
    command(handler: BaseDeviceFeatures, duid: string, parameter: string, value?: any): Promise<void>;
    getMap(handler: BaseDeviceFeatures, duid: string): Promise<void>;
    isCleaning(duid: string): boolean;
    /**
     * Gets the currently selected map ID (floor) from the ioBroker state.
     * This is more robust than relying on the cache, which might not be initialized.
     * @param duid The device DUID
     * @returns The map ID (number) or null if not found.
     */
    getSelectedMap(duid: string): Promise<number | null>;
    isCloudRequest(duid: string, method: string): true | Promise<boolean>;
    sendRequest(duid: string, method: string, params: Array<any> | Object | undefined, options?: {
        priority?: number;
    }): Promise<unknown>;
    private _performRequest;
    resolvePendingRequest(id: any, result: any, protocol: any): void;
    isCloudDevice(duid: any): Promise<boolean>;
    getConnector(duid: any): Promise<import("./localApi").local_api | import("./mqttApi").mqtt_api>;
    calculateCleaningValue(attribute: any, value: any): any;
    calculateRecordValue(attribute: any, value: any): any;
    unzipBuffer(buffer: any, callback: any): void;
    private unzipBufferAsync;
    isGZIP(buffer: any): boolean;
    extractPhoto(buffer: any): any;
    clearQueue(): void;
}
