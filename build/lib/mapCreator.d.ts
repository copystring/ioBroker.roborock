import { Roborock } from "../main";
interface CanvasMapOptions {
    selectedMap?: any;
    mappedRooms?: any;
    options?: any;
}
export declare class MapCreator {
    adapter: Roborock;
    adjacencyMatrix: number[][];
    constructor(adapter: Roborock);
    getX(dimensions: any, px: any): number;
    getY(dimensions: any, px: any): number;
    robotXtoPixelX(image: any, robotCoord: any): number;
    robotYtoPixelY(image: any, robotCoord: any): number;
    rotateCanvas(img: any, angleInDegrees: any): any;
    drawLineBresenham(imageData: any, x1: any, y1: any, x2: any, y2: any): void;
    appendPolyline(ctx: any, map: any, points: number[][], from: number, to: number, scale: number, gapPx?: number): void;
    /**
     * Builds an adjacency matrix indicating which segments (rooms) touch each other.
     * The matrix is 32x32 because segment IDs range from 0 to 31.
     * It only checks neighbors above and to the left to avoid double counting.
     *
     * @param {number[]} segmentPixels - Array of pixels with embedded segment IDs.
     * @param {number} width - Width of the map in pixels.
     * @param {number} height - Height of the map in pixels.
     * @returns {number[][]} - A 32x32 matrix where matrix[a][b] === 1 means segment a touches segment b.
     */
    buildAdjacencyMatrix(segmentPixels: any, width: any, height: any): any[][];
    /**
     * Returns the room name for a given segment number by looking up mappings.
     *
     * @param {number|string} segnum           The segment number to find the room name for.
     * @param {Array} mappedRooms               Array of mappedRooms entries, e.g., [[segmentNum, "roomIdString", mappedIndex], ...]
     * @param {Array} roomIDs                   Array of room objects, e.g., [{id: number, name: string}, ...]
     * @returns {string}                       The found room name, or "Room X" as a fallback.
     */
    getRoomNameBySegment(segnum: any, mappedRooms: any, roomIDs: any): any;
    hexToRGBA(hex: any, alpha?: number): string;
    canvasMap(mapdata: any, params?: CanvasMapOptions): Promise<any[]>;
}
export {};
