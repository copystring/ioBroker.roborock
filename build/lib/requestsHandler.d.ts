import type { Roborock } from "../main";
import type { BaseDeviceFeatures } from "./features/baseDeviceFeatures";
import { MapDataParser } from "./mapDataParser";
import { messageParser } from "./messageParser";
import { MapCreator } from "./mapCreator";
export declare class requestsHandler {
    adapter: Roborock;
    idCounter: number;
    private deviceQueues;
    messageParser: messageParser;
    mapParser: MapDataParser;
    mapCreator: MapCreator;
    mqttResetInterval: ioBroker.Interval | undefined;
    constructor(adapter: Roborock);
    private getQueue;
    scheduleMqttReset(): void;
    getStatus(handler: BaseDeviceFeatures, duid: string): Promise<void>;
    getCleaningRecordMap(duid: string, startTime: number): Promise<{
        mapBase64CleanUncropped: string;
        mapBase64: string;
        mapBase64Truncated: string;
        mapData: string;
    } | null>;
    getCleanSummary(handler: BaseDeviceFeatures, duid: string): Promise<void>;
    getDockingStationStatus(dss: any): {
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
    isCleaning(duid: string): Promise<boolean>;
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
    private performRequest;
    resolvePendingRequest(id: number, result: any, protocol: string): void;
    isCloudDevice(duid: string): Promise<boolean>;
    getConnector(duid: string): Promise<import("./localApi").local_api | import("./mqttApi").mqtt_api>;
    calculateCleaningValue(attribute: string, value: any): any;
    calculateRecordValue(attribute: string, value: any): any;
    unzipBuffer(buffer: Buffer, callback: (err: Error | null, result?: Buffer) => void): void;
    isGZIP(buffer: Buffer): boolean;
    extractPhoto(buffer: Buffer): false | Buffer;
    clearQueue(): void;
}
