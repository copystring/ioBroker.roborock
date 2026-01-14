export interface TransformationParams {
    x: number;
    y: number;
    minX: number;
    minY: number;
    sizeY: number;
    resolution: number;
    scale: number;
}
/**
 * Transforms Robot Coordinate (mm) to Visual Pixel Coordinate
 * Matches logic from MapBuilder.ts (Backend)
 */
export declare function robotToPixel(params: TransformationParams): {
    x: number;
    y: number;
};
export interface InverseTransformationParams {
    x: number;
    y: number;
    minX: number;
    minY: number;
    sizeY: number;
    resolution: number;
    scale: number;
}
/**
 * Transforms Visual Pixel Coordinate to Robot Coordinate (mm)
 * Inverse of robotToPixel
 */
export declare function pixelToRobot(params: InverseTransformationParams): {
    x: number;
    y: number;
};
export declare const VISUAL_BLOCK_SIZE = 3;
interface Point {
    x: number;
    y: number;
}
export interface MapParams {
    scaleFactor: number;
    left: number;
    topMap: number;
    imageHeight: number;
    mapMaxY?: number;
}
/**
 * Converts LOCAL "world" pixel coordinates (px, Y-down) back to ROBOT coordinates (mm).
 * Used for Click-Tests, GoTo, and Zones.
 */
export declare function localCoordsToRobotCoords(localPoint: Point, params: MapParams): Point;
/**
 * Converts ROBOT coordinates (mm) to LOCAL "world" pixel coordinates (px, Y-down).
 * This is used to DRAW things on the map.
 */
export declare function robotCoordsToLocalCoords(robotPoint: Point, params: MapParams): Point;
export {};
