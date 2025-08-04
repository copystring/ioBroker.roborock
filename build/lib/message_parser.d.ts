import type { Roborock } from "../main";
export declare class message_parser {
    adapter: Roborock;
    constructor(adapter: Roborock);
    /**
     * @param {Buffer} message
     * @param {string} duid
     */
    _decodeMsg(message: any, duid: any): any;
    getParsedData(data: any): any;
    /**
     * @param {string} duid
     * @param {number} protocol
     * @param {number} messageID
     * @param {string} method
     * @param {Array | Object} params
     * @returns {Promise<string>}
     */
    buildPayload(duid: any, protocol: any, messageID: any, method: any, params: any): Promise<string>;
    /**
     * @param {string} duid
     * @param {number} protocol
     * @param {number} timestamp
     * @param {string} payload
     */
    buildRoborockMessage(duid: any, protocol: any, timestamp: any, payload: any): Promise<false | Buffer>;
    /**
     * @param {number} timestamp
     */
    _encodeTimestamp(timestamp: any): string;
    /**
     * @param {string} str
     */
    md5bin(str: any): Buffer;
    /**
     * @param {string} str
     */
    md5hex(str: any): string;
}
