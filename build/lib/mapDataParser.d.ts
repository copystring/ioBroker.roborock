import type { Roborock } from "../main";
interface MapMetaData {
    header_length: number;
    data_length: number;
    version: {
        major: number;
        minor: number;
    };
    map_index: number;
    map_sequence: number;
    SHA1: string;
    expectedSHA1: string;
}
interface PositionBlock {
    position: [number, number];
    angle: number;
}
interface SegmentInfo {
    id: number;
    name: string;
    center: [number, number];
}
interface ImageBlock {
    segments: {
        count: number;
        list: SegmentInfo[];
    };
    position: {
        top: number;
        left: number;
    };
    dimensions: {
        height: number;
        width: number;
    };
    pixels: {
        floor: number[];
        obstacle: number[];
        segments: number[];
    };
}
interface PathBlock {
    current_angle: number;
    points: [number, number][];
}
type Obstacle = [number, number, number, number, number, number, string];
interface NonceData {
    type: number;
    unixTime: number;
}
export interface ParsedMapData {
    metaData: MapMetaData;
    ROBOT_POSITION?: PositionBlock;
    CHARGER_LOCATION?: PositionBlock;
    IMAGE?: ImageBlock;
    PATH?: PathBlock;
    GOTO_PATH?: PathBlock;
    GOTO_PREDICTED_PATH?: PathBlock;
    CURRENTLY_CLEANED_ZONES?: number[][];
    GOTO_TARGET?: [number, number];
    VIRTUAL_WALLS?: number[][];
    CURRENTLY_CLEANED_BLOCKS?: number[];
    FORBIDDEN_ZONES?: number[][];
    NO_MOP_ZONE?: number[][];
    OBSTACLES2?: Obstacle[];
    CARPET_MAP?: number[];
    MOP_PATH?: number[];
    CARPET_FORBIDDEN_ZONE?: number[][];
    DS_FORBIDDEN_ZONES?: number[][];
    CLF_FORBIDDEN_ZONES?: number[][];
    MODE_CARPET?: number[][];
    NONCEDATA?: NonceData[];
}
export declare class MapDataParser {
    adapter: Roborock;
    constructor(adapter: Roborock);
    /**
     * Parses the complete raw map buffer from the robot.
     */
    parsedata(buf: Buffer, mappedRooms: any[] | null, options?: {
        isHistoryMap: boolean;
    }): Promise<ParsedMapData | {}>;
    private parseHeader;
    private parseImageBlock;
    private parsePathBlock;
    private extractObstacles;
    private getXYPositions;
    /** Reads unscaled pixel dimensions and offsets from the image block header. */
    private getMapSizes;
    private getPointInPath;
    private getCount;
    private getPixelType;
    private getAngle;
    private getGoToTarget;
    private getForbiddenZone;
    private getSingleByteOffset;
    private getTwoByteOffsets;
    private getNonceData;
    private readUInt16LE;
    private readUInt8;
}
export {};
