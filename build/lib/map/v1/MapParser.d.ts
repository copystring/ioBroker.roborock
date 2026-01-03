import type { Roborock } from "../../../main";
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
    STROY_PT?: any[];
    DIRTY_RECT?: any[];
    IGNORE_DIRTY_RECT?: any[];
    BRUSH_PT?: any[];
    DIRTY_NEW?: any[];
    MOP_ERR_PT?: any[];
    ERAZER_ZONE?: any[];
    LONG_CARPET?: any[];
    DS_SIDES?: any[];
    STEERING_PT?: any[];
    SENSOR_INFO?: any[];
    LOW_SPACES?: any[];
    TIDY_ZONES?: any[];
    GARBAGE?: any[];
    ZONE_LINES?: any[];
    OBSTACLES?: any[];
    IGNORED_OBSTACLES?: any[];
    IGNORED_OBSTACLES2?: any[];
    SMART_ZONE_PATH_TYPE?: number;
    SMART_ZONE?: any[];
    CUSTOM_CARPET?: any[];
    FLOOR_MAP?: number[];
    FURNITURES?: any[];
    DOCK_TYPE?: number;
    ENEMIES?: any[];
    STUCK_POINTS?: any[];
    SMART_DS?: any[];
    FLOOR_DIRECTION?: any[];
    DATE?: number;
    EXT_ZONES?: any[];
    PATROL?: any[];
    PET_PATROL?: any[];
}
export declare class MapParser {
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
    private getStroyPt;
    private getDirtyRect;
    private getBrushPt;
    private getDirtyNew;
    private getMopErrPt;
    private getEraserZone;
    private getLongCarpet;
    private getDsSides;
    private getSteeringPt;
    private getSensorInfo;
    private getTidyZones;
    private getGarbage;
    private getZoneLines;
    private getObstaclesOld;
    private getIgnoredObstacles2;
    private getSmartZone;
    private getFurnitures;
    private getEnemies;
    private getFloorDirection;
    private getPatrol;
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
