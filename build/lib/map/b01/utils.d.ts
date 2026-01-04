/**
 * Utility functions for B01 map processing.
 */
/**
 * Interpolates points in a chain to create a dense line of pixels.
 */
export declare function interpolate(points: {
    chain_point: {
        x: number;
        y: number;
    };
}[]): {
    chain_point: {
        x: number;
        y: number;
    };
}[];
/**
 * Converts a hex color string to an RGBA string.
 * Supports 9-character hex strings (RRGGBBAA).
 */
export declare function hexToRgba(hex: string): string;
