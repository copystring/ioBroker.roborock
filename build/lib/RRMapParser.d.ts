import type { Roborock } from "../main";
export declare class RRMapParser {
    adapter: Roborock;
    constructor(adapter: Roborock);
    BytesToInt(buffer: Buffer, offset: number, len: number): number;
    parsedata(buf: Buffer): Promise<{}>;
    /**
     *
     * @param mapBuf {Buffer} Should contain map in RRMap Format
     * @return {object}
     */
    PARSE(mapBuf: any): {
        header_length: any;
        data_length: any;
        version: {
            major: any;
            minor: any;
        };
        map_index: any;
        map_sequence: any;
        SHA1: string;
        expectedSHA1: string;
    } | {
        header_length?: undefined;
        data_length?: undefined;
        version?: undefined;
        map_index?: undefined;
        map_sequence?: undefined;
        SHA1?: undefined;
        expectedSHA1?: undefined;
    };
    extractObstacles(buf: Buffer, offset: number): any[];
    getXYPositions(buf: any, xOffset: any, yOffset: any): any[];
    getMapSizes(buf: any, offset: any): any[];
    getPointInPath(buf: Buffer, dataPosition: number): number[];
    getCount(buf: any): any;
    getPixelType(buf: any, dataPosition: any): number;
    getAngle(buf: any): any;
    getGoToTarget(buf: any): any[];
    getForbiddenZone(buf: any, dataPosition: any, offset: any): number[];
    getSingleByteOffset(buf: any): any;
    getTwoByteOffsets(buf: any): any[];
    getDatatype(buf: any, offset: any): "Unknown" | "UInt8" | "UInt16LE" | "UInt32LE";
    getNonceData(buf: Buffer): {
        type: number;
        unixTime: number;
    }[];
    readUInt16LE(buf: Buffer, dataPosition: number, offset: number, count: number): number[];
    readInt32LE(buf: Buffer, dataPosition: number, offset: number, count: number): number[];
    readUInt32LE(buf: Buffer, dataPosition: number, offset: number, count: number): number[];
    readUInt8(buf: Buffer, dataPosition: number, offset: number, count: number): number[];
}
