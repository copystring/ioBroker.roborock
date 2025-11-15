interface Point {
    x: number;
    y: number;
}
interface MapParams {
    scaleFactor: number;
    left: number;
    topMap: number;
    mapMaxY: number;
    imageHeight: number;
}
export declare function localCoordsToRobotCoords(imagePoint: Point, params: MapParams): Point;
export declare function robotCoordsToLocalCoords(robotPoint: Point, params: MapParams): Point;
export {};
