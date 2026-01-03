import { B01MapData } from "./types";
export declare class MapParser {
    adapter: any;
    private protoRoot;
    private RobotMapType;
    constructor(adapter: any);
    parse(rawData: Buffer, serial: string, model: string, duid: string, connectionType: string): B01MapData | null;
    /**
     * Delegates decryption to the centralized B01MapDecryptor.
     */
    private smartDecrypt;
    parseProtobuf(buffer: Buffer, duid: string, connectionType: string): B01MapData;
    beautifyMap(mapData: B01MapData): void;
}
