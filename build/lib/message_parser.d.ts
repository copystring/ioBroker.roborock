import type { Roborock } from "../main";
export declare class message_parser {
    adapter: Roborock;
    constructor(adapter: Roborock);
    /**
     * Decode one or more concatenated messages from a buffer.
     */
    _decodeMsg(message: Buffer, duid: string): any;
    getParsedData(data: Buffer): any;
    /**
     * Build device JSON payload (inner JSON for dps).
     */
    buildPayload(duid: string, protocol: number, messageID: number, method: string, params: any[] | Record<string, any>): Promise<string>;
    /**
     * Wraps the payload into a Roborock local frame and encrypts according to protocol version.
     */
    buildRoborockMessage(duid: string, protocol: number, timestamp: number, payload: string | Buffer): Promise<false | Buffer>;
    /**
     * Timestamp permutation as used by Roborock.
     */
    _encodeTimestamp(timestamp: number): string;
    private _toBuf;
    private _wrap32;
    private _hex8;
}
