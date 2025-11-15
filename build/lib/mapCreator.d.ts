import { Roborock } from "../main";
interface CanvasMapOptions {
    selectedMap?: any;
    mappedRooms?: any;
    options?: {
        FLOORCOLOR?: string;
        WALLCOLOR?: string;
        PATHCOLOR?: string;
        newmap?: boolean;
        ROBOT?: string;
    };
}
export declare class MapCreator {
    adapter: Roborock;
    colors: {
        floor: string;
        obstacle: string;
        path: string;
        newmap: boolean;
    };
    constructor(adapter: Roborock);
    private getX;
    private getY;
    private robotXtoPixelX;
    private robotYtoPixelY;
    private rotateCanvas;
    private drawLineBresenham;
    /**
     * Builds the adjacency matrix for room coloring.
     */
    private buildAdjacencyMatrix;
    canvasMap(mapdata: any, params?: CanvasMapOptions): Promise<[string, string]>;
    private drawPaths;
    private tracePathSegment;
    private drawRestrictedAreas;
    private roundRect;
}
export {};
