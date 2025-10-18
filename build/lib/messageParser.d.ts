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
     * Decodes one or more messages from a buffer.
     */
    _decodeMsg(message: Buffer, duid: string): Frame | Frame[] | null;
    /**
     * Builds the JSON payload for the device.
     */
    buildPayload(duid: string, protocol: number, messageID: number, method: string, params: any, version: string): Promise<string>;
    /**
     * Builds the final Roborock frame and encrypts the payload.
     */
    buildRoborockMessage(duid: string, protocol: number, timestamp: number, payload: string | Buffer, version: string): Promise<Buffer | false>;
}
export {};
