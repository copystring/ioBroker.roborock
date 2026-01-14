import type { Roborock } from "../main";
export interface PhotoRequestData {
    id: number;
    chunks: Record<number, Buffer>;
    totalChunks?: number;
    totalSize?: number;
    lastUpdateTime: number;
    extracted?: {
        photo: Buffer;
        bbox: any | null;
    };
}
export declare class PhotoManager {
    private adapter;
    private pendingPhotoRequests;
    private pendingRawRequest;
    private photoCleanupInterval;
    constructor(adapter: Roborock);
    getPendingPhotoRequests(): Record<string, PhotoRequestData>;
    getPendingRawRequest(): {
        duid: string;
        photoId: number;
    } | null;
    setPendingRawRequest(request: {
        duid: string;
        photoId: number;
    } | null): void;
    /**
     * Dedicated handler for Protocol 300 (Initial Photo Chunk).
     * Returns true if the packet was identified as a photo.
     */
    handlePhotoProtocol300(duid: string, payloadBuf: Buffer, isRoborockHeader: boolean): Promise<boolean>;
    /**
     * Dedicated handler for Protocol 301 (Subsequent Photo Chunks).
     * Returns true if the packet was identified and handled as a photo.
     */
    handlePhotoProtocol301(duid: string, payloadBuf: Buffer, isRoborockHeader: boolean): Promise<boolean>;
    /**
     * Shared logic to determine if all chunks for a photo have been received.
     * Unified version: Relies solely on totalSize matching the accumulated chunks.
     */
    private isPhotoComplete;
    /**
     * Processes a completed photo request: extracts data and resolves the pending request.
     */
    private processAndResolvePhoto;
    /**
     * Helper: Extracts JPEG/PNG data and Bounding Box from raw photo payload.
     * Handles GZIP decompression and inner header stripping.
     */
    extractPhotoData(rawPayload: Buffer, duid: string, logId: string): Promise<{
        photo: Buffer;
        bbox: any | null;
    }>;
    private findImageInBuffer;
    clearIntervals(): void;
}
