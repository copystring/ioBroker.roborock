declare const utils: any;
type StateObjectOptions = {
    path: string;
    name: string;
    type: string;
    unit?: string;
    def?: any;
    role?: string;
    read?: boolean;
    write?: boolean;
    states?: any;
    native?: Record<string, any>;
};
interface StateCommonExtension {
    min?: number;
    max?: number;
    unit?: string;
}
export declare class Roborock extends utils.Adapter {
    constructor(options?: {});
    /**
     * Is called when databases are connected and adapter received configuration.
     */
    onReady(): Promise<void>;
    /**
     *
     * @returns {Promise<string>}
     */
    ensureClientID(): Promise<any>;
    /**
     * @param {Object} device
     */
    createDeviceObjects(device: any): Promise<void>;
    processScenes(): Promise<void>;
    startWebserver(): void;
    stopWebserver(): Promise<void>;
    startWebsocketServer(): Promise<void>;
    stopWebsocketServer(): Promise<void>;
    /**
     * @param {string} duid
     */
    updateDeviceData(duid: any): Promise<void>;
    clearTimersAndIntervals(): void;
    /**
     * @param {string} duid
     */
    updateConsumablesPercent(duid: any): Promise<void>;
    /**
     * @param {string} duid
     * @param {Array} devices
     */
    updateDeviceInfo(duid: any, devices: any): Promise<void>;
    /**
     * @param {string} duid
     */
    checkForNewFirmware(duid: any): Promise<void>;
    getType(value: any): "number" | "boolean" | "string";
    /**
     * @param {string} path
     * @param {object} value
     * @param {object} [commonExtended]
     */
    ensureState(path: any, value: any, commonExtended?: StateCommonExtension): Promise<void>;
    /**
     * @param {string} path
     * @param {object} commonExtended
     */
    ensureCommand(path: any, commonExtended: any): Promise<void>;
    ensureFolder(path: any): Promise<void>;
    createStateObjectHelper(options: StateObjectOptions): Promise<void>;
    /**
     * @param {string} duid
     */
    createDockingStationObject(duid: any): Promise<void>;
    /**
     * @param {string} duid
     */
    createBaseRobotObjects(duid: any): Promise<void>;
    /**
     * @param {string} _duid
     */
    createBasicVacuumObjects(_duid: any): Promise<void>;
    /**
     * @param {string} _duid
     */
    createBasicWashingMachineObjects(_duid: any): Promise<void>;
    /**
     * @param {string} duid
     */
    getDeviceProtocolVersion(duid: any): Promise<any>;
    setupBasicObjects(): Promise<void>;
    start_go2rtc(): Promise<void>;
    /**
     * Processes A01 protocol messages and stores the parsed data in a structured format.
     * @param {string} duid - The device unique identifier.
     * @param {object} response - The parsed response object.
     */
    processA01(duid: any, response: any): Promise<void>;
    /**
     * Resets the MQTT API instance by cleaning up resources and reinitializing it.
     */
    resetMqttApi(): Promise<void>;
    /**
     * @param {Error} error
     * @param {string} [attribute]
     * @param {string} [duid]
     */
    catchError(error: any, attribute: any, duid: any): Promise<void>;
    /**
     * Is called when adapter shuts down - callback has to be called under any circumstances!
     * @param {() => void} callback
     */
    onUnload(callback: any): void;
    /**
     * Is called if a subscribed state changes
     * @param {string} id
     * @param {ioBroker.State | null | undefined} state
     */
    onStateChange(id: any, state: any): Promise<void>;
}
export {};
