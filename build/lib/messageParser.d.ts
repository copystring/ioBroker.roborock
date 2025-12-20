import { z } from "zod";
import { Roborock } from "../main";
export type ProtocolVersion = "1.0" | "A01" | "L01" | "B01";
declare const FrameSchema: z.ZodObject<{
    version: z.ZodString;
    seq: z.ZodNumber;
    random: z.ZodNumber;
    timestamp: z.ZodNumber;
    protocol: z.ZodNumber;
    payloadLen: z.ZodNumber;
    payload: z.ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>;
    crc32: z.ZodNumber;
}, z.core.$strip>;
export type Frame = z.infer<typeof FrameSchema> & {
    version: ProtocolVersion;
};
export declare class messageParser {
    adapter: Roborock;
    constructor(adapter: Roborock);
    /**
     * Decodes a buffer containing Roborock protocol messages.
     */
    decodeMsg(message: Buffer, duid: string): Frame | Frame[] | null;
    /**
     * Builds JSON payload for device command.
     */
    buildPayload(protocol: number, messageID: number, method: string, params: any, version: string): Promise<string>;
    /**
     * Builds complete Roborock binary frame.
     */
    buildRoborockMessage(duid: string, protocol: number, timestamp: number, payload: string | Buffer, version: string): Promise<Buffer | false>;
}
export {};
