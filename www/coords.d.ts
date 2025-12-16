interface Point {
    x: number;
    y: number;
}
interface MapParams {
    scaleFactor: number;
    left: number;
    topMap: number;
    imageHeight: number;
}
export declare const VISUAL_BLOCK_SIZE = 3;
export declare const GRID_CENTER_OFFSET: number;
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
