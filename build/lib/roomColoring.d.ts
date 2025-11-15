/**
 * Standard Roborock color palette (Dark Mode style).
 * Index 0 is the background/default. Indices 1-4 are the main room colors.
 */
export declare const ROBOROCK_PALETTE: string[];
/**
 * Defines the input data required for the coloring algorithm.
 */
export interface ColoringData {
    /** The highest segment ID (defines the size of the adjacency matrix). Usually 32. */
    maxBlockNum: number;
    /**
     * A flat (row-major) adjacency matrix (size * size).
     * neighborInfo[a * size + b] === 1 if room 'a' and room 'b' are neighbors.
     */
    neighborInfo: number[];
    /** An array storing the pixel count (area) for each segment ID. */
    pointsCount: number[];
}
/**
 * Defines the options for the coloring algorithm.
 */
export interface ColoringOptions {
    /** Whether segment IDs start at 1 (Roborock standard). */
    oneBased: boolean;
}
/**
 * Return structure containing the assignment results.
 */
export interface ColoringResult {
    /** Maps room ID to a logical color bucket index (1-4). */
    colorBucket: number[];
    /** Maps room ID to the final hex color string. */
    colorHex: string[];
}
/**
 * Assigns colors to rooms based on the Roborock graph coloring algorithm.
 * Ensures that adjacent rooms receive different colors where possible.
 * @param data The room topology and neighbor data.
 * @param options Configuration options (e.g. is index 1-based?).
 * @returns The color assignments (buckets and hex codes).
 */
export declare function assignRoborockRoomColorsToHex(data: ColoringData, options: ColoringOptions): ColoringResult;
