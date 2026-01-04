import type { Roborock } from "../main";
import type { BaseDeviceFeatures } from "./features/baseDeviceFeatures";
import { MapParser } from "./map/v1/MapParser";
import { MapBuilder } from "./map/v1/MapBuilder";
import { messageParser } from "./messageParser";
export declare enum RequestPriority {
    LOW = -10,
    NORMAL = 0,
    HIGH = 10
}
export declare class requestsHandler {
    adapter: Roborock;
    idCounter: number;
    photoIdCounter: number;
    lastB01Id: number;
    private globalManager;
    messageParser: messageParser;
    mapParser: MapParser;
    mapCreator: MapBuilder;
    mqttResetInterval: ioBroker.Interval | undefined;
    startupFinished: boolean;
    private startupPromises;
    private finishedRequests;
    constructor(adapter: Roborock);
    private scheduleMqttReset;
    waitForStartup(): Promise<void>;
    _processResult<T>(requestPromise: Promise<T>, callback: (result: T) => Promise<void>, identifier: string, duid: string, alwaysBackground?: boolean): void;
    sendRequest(duid: string, method: string, params: unknown, options?: {
        priority?: number;
    }): Promise<unknown>;
    command(_handler: BaseDeviceFeatures, duid: string, method: string, params?: unknown): Promise<void>;
    isCloudDevice(_duid: string): Promise<boolean>;
    isCloudRequest(_duid: string, method: string, version?: string): boolean;
    resolvePendingRequest(messageID: number, result: unknown, protocol?: unknown, duid?: string, connectionType?: string, version?: string): void;
    isRequestRecentlyFinished(messageID: number): boolean;
    clearQueue(): void;
}
