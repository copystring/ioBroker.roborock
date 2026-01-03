import { Roborock } from "../../main";
import { B01DeviceStatus } from "./b01/types";
export declare class MapManager {
    private adapter;
    private parserV1;
    private builderV1;
    private parserB01;
    private builderB01;
    constructor(adapter: Roborock);
    /**
     * Processes raw map data and returns a generated map buffer.
     * @param rawData The raw buffer from the robot (Protocol 301).
     * @param version The protocol version string (e.g., "B01" or "1.0").
     * @param model The robot model (used for key derivation/assets).
     * @param serial The robot serial (used for key derivation).
     * @param mappedRooms Optional room mapping for V1.
     */
    processMap(rawData: Buffer, version: string, model: string, serial: string, mappedRooms: any[] | null, duid?: string, connectionType?: string, deviceStatus?: B01DeviceStatus): Promise<{
        mapBase64: string;
        mapBase64Clean?: string;
        mapData?: any;
    } | null>;
    private getDeviceStatusForB01;
}
