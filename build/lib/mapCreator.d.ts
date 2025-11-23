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
    private robotXtoCanvasX;
    private robotYtoCanvasY;
    /**
     * Creates a pre-rendered sprite for a single carpet tile.
     * Logic matches renderCarpetTest.js exactly.
     */
    private createCarpetSprite;
    private buildAdjacencyMatrix;
    private drawPathSegments;
    canvasMap(mapdata: any, params?: CanvasMapOptions): Promise<[string, string, string]>;
    private applyOptions;
    private loadImages;
    private drawFloorAndWalls;
    private drawSegments;
    private getCleanMapBase64;
    private drawCarpet;
    private drawPaths;
    private drawActiveZones;
    private drawPredictedPath;
    private drawObstacles;
    private drawRobotChargerTarget;
    private drawRoomNames;
    private cropMap;
    private drawRestrictedAreas;
    private roundRect;
}
export {};
