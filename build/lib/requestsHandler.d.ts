import type { Roborock } from "../main";
import type { BaseDeviceFeatures } from "./features/baseDeviceFeatures";
import { MapCreator } from "./mapCreator";
import { MapDataParser } from "./mapDataParser";
import PQueue from "p-queue";
import { messageParser } from "./messageParser";
declare class RequestManager {
    queue: PQueue;
    timeoutMs: number;
    tasks: Map<string, AbortController>;
    constructor(concurrency?: number, timeoutMs?: number);
    add<T>(id: string, taskFunction: (signal: AbortSignal) => Promise<T>, priority?: number): Promise<T>;
    cancel(id: string): boolean;
    onIdle(): Promise<void>;
    clear(): void;
}
export declare class requestsHandler {
    adapter: Roborock;
    idCounter: number;
    photoIdCounter: number;
    private deviceManagers;
    messageParser: messageParser;
    mapParser: MapDataParser;
    mapCreator: MapCreator;
    mqttResetInterval: ioBroker.Interval | undefined;
    startupFinished: boolean;
    private startupPromises;
    constructor(adapter: Roborock);
    private scheduleMqttReset;
    waitForStartup(): Promise<void>;
    private _processResult;
    getManager(duid: string): RequestManager;
    sendRequest(duid: string, method: string, params: unknown, options?: {
        priority?: number;
    }): Promise<unknown>;
    getParameter(handler: BaseDeviceFeatures, duid: string, parameter: string, extraParameters?: unknown): Promise<void>;
    command(_handler: BaseDeviceFeatures, duid: string, method: string, params?: unknown): Promise<void>;
    getStatus(handler: BaseDeviceFeatures, duid: string): Promise<void>;
    getCleanSummary(handler: BaseDeviceFeatures, duid: string): Promise<void>;
    getCleaningRecordMap(duid: string, startTime: number): Promise<{
        mapBase64CleanUncropped: string;
        mapBase64: string;
        mapBase64Truncated: string;
        mapData: string;
    } | null>;
    getMap(_handler: BaseDeviceFeatures, duid: string): Promise<void>;
    isCleaning(_duid: string): Promise<boolean>;
    isCloudDevice(_duid: string): Promise<boolean>;
    isCloudRequest(_duid: string, _method: string): boolean;
    private calculateCleaningValue;
    resolvePendingRequest(messageID: number, result: unknown, protocol?: unknown): void;
    clearQueue(): void;
}
export {};
