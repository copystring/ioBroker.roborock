import type { Roborock } from "../main";
import { z } from "zod";
export type ProtocolVersion = "1.0" | "A01" | "L01";
declare const FrameSchema: z.ZodObject<{
    version: z.ZodString;
    seq: z.ZodNumber;
    random: z.ZodNumber;
    timestamp: z.ZodNumber;
    protocol: z.ZodNumber;
    payloadLen: z.ZodNumber;
    payload: z.ZodCustom<Buffer, Buffer>;
    crc32: z.ZodNumber;
}, z.core.$strip>;
export type Frame = z.infer<typeof FrameSchema> & {
    version: ProtocolVersion;
};
export declare class messageParser {
    adapter: Roborock;
    constructor(adapter: Roborock);
    /**
     * Decodes a buffer containing one or more Roborock protocol messages.
     * @param message The raw buffer received from the network.
     * @param duid The Device Unique ID (DUID) associated with the message.
     * @returns A single Frame, an array of Frames, or null if no valid frames were found.
     */
    _decodeMsg(message: Buffer, duid: string): Frame | Frame[] | null;
    /**
     * Builds the JSON payload string for a device command.
     * Handles special security parameters for specific methods (like photo/map requests).
     */
    buildPayload(duid: string, protocol: number, messageID: number, method: string, params: any, version: string): Promise<string>;
    /**
     * Builds the complete Roborock binary frame (Header + Encrypted Payload + CRC).
     * @returns The Buffer to send, or false if encryption is not possible (e.g., missing key).
     */
    buildRoborockMessage(duid: string, protocol: number, timestamp: number, payload: string | Buffer, version: string): Promise<Buffer | false>;
}
export {};
