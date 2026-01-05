export interface Point {
    x: number;
    y: number;
}
export declare const VISUAL_BLOCK_SIZE = 3;
export declare const ROBOROCK_PALETTE: string[];
export declare const LEGACY_COLORS: {
    floor: string;
    obstacle: string;
    path: string;
};
export declare const ALGORITHM_COLORS: {};
export declare function loadSharedImages(robotType?: string): Promise<[import("@napi-rs/canvas").Image, import("@napi-rs/canvas").Image, import("@napi-rs/canvas").Image]>;
export declare function robotXtoCanvasX(x: number, left: number): number;
export declare function robotYtoCanvasY(y: number, top: number, height: number): number;
export declare function getRoomColor(colorId: number): string;
export declare function hexToRgba(hex: string, alpha?: number): [number, number, number, number];
/**
 * Robust decompression that handles multi-layered GZIP/ZLIB and scans for magic headers.
 */
export declare function decompress(compressed: Buffer): Buffer;
export declare function isSignatureMatch(buf: Buffer): boolean;
export declare function isLikelyProtobuf(buf: Buffer): boolean;
