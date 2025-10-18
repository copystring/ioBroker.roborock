import type { Roborock } from "../main";
import { RRMapParser } from "./RRMapParser";
import { MapCreator } from "./mapCreator";
import { messageParser } from "./messageParser";
export declare class requestsHandler {
    adapter: Roborock;
    idCounter: number;
    messageQueue: Map<string, any>;
    messageParser: messageParser;
    mapParser: RRMapParser;
    mapCreator: MapCreator;
    mqttResetInterval: NodeJS.Timeout | null;
    cached_get_status_value: any[];
    constructor(adapter: Roborock);
    /**
     * Schedules the MQTT API to be reset every hour.
     */
    scheduleMqttReset(): void;
    /**
     * @param {string} duid
     */
    getStatus(duid: any): Promise<void>;
    /**
     * @param {string} duid
     * @param {number} startTime
     */
    getCleaningRecordMap(duid: any, startTime: any): Promise<{
        mapBase64: any;
        mapBase64Truncated: any;
        mapData: string;
    } | null>;
    /**
     * @param {string} duid
     */
    getCleanSummary(duid: any): Promise<void>;
    /**
     * @param {string} duid
     */
    getDockingStationStatus(duid: any): {
        cleanFluidStatus: number;
        waterBoxFilterStatus: number;
        dustBagStatus: number;
        dirtyWaterBoxStatus: number;
        clearWaterBoxStatus: number;
        isUpdownWaterReady: number;
    };
    /**
     * @param {string} duid
     * @param {string} parameter
     * @param {Object} [attribute]
     */
    getParameter(duid: any, parameter: any, attribute: any): Promise<void>;
    /**
     * @param {string} duid
     * @param {string} parameter
     * @param {string | number | Array | Object} [value]
     */
    command(duid: any, parameter: any, value: any): Promise<void>;
    /**
     * @param {string} duid
     */
    getMap(duid: any): Promise<void>;
    /**
     * @param {string} duid
     */
    isCleaning(duid: any): boolean;
    /**
     * @param {string} duid
     */
    getSelectedMap(duid: any): number | null;
    isCloudRequest(duid: any, method: any): any;
    sendRequest(duid: string, method: string, params: Array<any> | Object | undefined): Promise<unknown>;
    /**
     * Resolves a previously tracked pending request by ID.
     * Removes the request from the internal map and calls its resolve function.
     * Throws an error if no matching request is found.
     *
     * @param {string|number} id - The unique identifier of the pending request to resolve.
     * @param {*} result - The result value to pass to the resolve function.
     * @param {number} protocol - The protocol number associated with this request, used for error context.
     * @throws {Error} If no pending request with the given ID exists.
     */
    resolvePendingRequest(id: any, result: any, protocol: any): void;
    /**
     * @param {string} duid
     */
    isCloudDevice(duid: any): Promise<boolean>;
    /**
     * @param {string} duid
     */
    getConnector(duid: any): Promise<any>;
    /**
     * @param {string} attribute
     * @param {number} value
     */
    calculateCleaningValue(attribute: any, value: any): any;
    /**
     * @param {string} attribute
     * @param {number} value
     */
    calculateRecordValue(attribute: any, value: any): any;
    unzipBuffer(buffer: any, callback: any): void;
    isGZIP(buffer: any): boolean;
    extractPhoto(buffer: any): any;
    clearQueue(): void;
}
