import { B01DeviceStatus, B01MapData } from "./types";
export declare class MapBuilder {
    private readonly SCALE;
    private assets;
    private assetsLoaded;
    private adapter;
    private offsetCache;
    constructor(adapter?: any);
    private loadAssets;
    private getRobotIconAssetKey;
    private getVisibleOffset;
    private drawMapAsset;
    buildMap(data: B01MapData, robotModel: string, duid?: string, deviceStatus?: B01DeviceStatus): Promise<Buffer>;
}
