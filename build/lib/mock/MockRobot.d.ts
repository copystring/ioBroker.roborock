export declare class MockRobot {
    duid: string;
    model: string;
    state: Record<string, any>;
    features: number[];
    consumables: any;
    cleanSummary: any;
    cleanRecords: any[];
    cleanRecordsMap: Map<number, any>;
    multiMaps: any;
    roomMapping: any[];
    timers: any[];
    constructor(duid?: string, model?: string);
    handleRequest(method: string, params?: any[]): any;
    private handleGetProp;
    private handleGetCleanRecord;
    updateState(updates: Record<string, any>): void;
    setDss(bits: {
        cleanFluid?: number;
        waterFilter?: number;
        dustBag?: number;
        dirtyTank?: number;
        cleanTank?: number;
        updownWater?: number;
    }): void;
}
