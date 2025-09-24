import type { Roborock } from "../main";
export declare class messageParser {
    adapter: Roborock;
    constructor(adapter: Roborock);
    /**
     * Decodes one or more messages from a buffer.
     */
    _decodeMsg(message: Buffer, duid: string): any;
    /**
     * Builds the JSON payload for the device.
     */
    buildPayload(duid: string, protocol: number, messageID: number, method: string, params: any): Promise<string>;
    /**
     * Builds the final Roborock frame and encrypts the payload.
     */
    buildRoborockMessage(duid: string, protocol: number, timestamp: number, payload: string | Buffer): Promise<false | Buffer>;
}
