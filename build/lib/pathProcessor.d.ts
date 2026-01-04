export interface PathPoint {
    x: number;
    y: number;
}
/** Result structure used by map.ts to bind SVG path strings */
export interface PathResult {
    mainPathD: string;
    backwashPathD: string;
    pureCleanPathD: string;
    mopPathD: string;
    mainPath: PathPoint[][];
    backwashPath: PathPoint[][];
    pureCleanPath: PathPoint[][];
    mopPath: PathPoint[][];
}
interface PointConverter {
    (robotPoint: [number, number], params: any): PathPoint;
}
export declare function processPaths(points: [number, number][], flags: number[], converter: PointConverter, scale: number, params: any): PathResult;
export {};
