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
    private finishedRequests;
    constructor(adapter: Roborock);
    private scheduleMqttReset;
    waitForStartup(): Promise<void>;
    _processResult<T>(requestPromise: Promise<T>, callback: (result: T) => Promise<void>, identifier: string, duid: string, alwaysBackground?: boolean): void;
    getManager(duid: string): RequestManager;
    sendRequest(duid: string, method: string, params: unknown, options?: {
        priority?: number;
    }): Promise<unknown>;
    command(_handler: BaseDeviceFeatures, duid: string, method: string, params?: unknown): Promise<void>;
    isCloudDevice(_duid: string): Promise<boolean>;
    isCloudRequest(_duid: string, method: string, version?: string): boolean;
    resolvePendingRequest(messageID: number, result: unknown, protocol?: unknown): void;
    isRequestRecentlyFinished(messageID: number): boolean;
    clearQueue(): void;
}
export {};
