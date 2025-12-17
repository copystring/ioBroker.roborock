"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const MockAdapter_1 = require("./MockAdapter");
const messageParser_1 = require("../messageParser"); // Real class
const crc32 = __importStar(require("crc-32"));
describe("Protocol Deep Dive (messageParser)", () => {
    let mockAdapter;
    let parser;
    beforeEach(() => {
        mockAdapter = new MockAdapter_1.MockAdapter();
        mockAdapter.http_api = {
            getMatchedLocalKeys: () => new Map([["duid", Buffer.from("3641643966536967756e447950543255", "hex")]])
        };
        parser = new messageParser_1.messageParser(mockAdapter);
        // Mock crypto engine if needed, but we can verify CRC/Header without decrypting if we mock dependencies
        // Actually, decodeMsg calls decryptors.
        // We'll need to mock crypto or handle the throwing.
    });
    it("should reject invalid CRC", () => {
        // Construct a fake frame
        // const header = Buffer.alloc(23); // Header len 19 + CRC 4? No, header is 19.
        // 3(ver) + 4(seq) + 4(rnd) + 4(ts) + 2(proto) + 2(len) = 19. + Payload + 4(CRC).
        const buf = Buffer.alloc(19 + 5 + 4); // 5 bytes payload
        buf.write("1.0");
        buf.writeUInt32BE(1, 3);
        buf.writeUInt32BE(1234, 7);
        buf.writeUInt32BE(99999, 11);
        buf.writeUInt16BE(4, 15);
        buf.writeUInt16BE(5, 17);
        buf.write("hello", 19);
        // Write INVALID CRC
        buf.writeUInt32BE(0xDEADBEEF, 19 + 5);
        const decoded = parser.decodeMsg(buf, "duid");
        // Log error is called, returns null
        (0, chai_1.expect)(decoded).to.be.null; // Or [] depending on implementation
    });
    it("should accept valid CRC", () => {
        const buf = Buffer.alloc(19 + 5 + 4);
        buf.write("1.0");
        buf.writeUInt32BE(1, 3);
        buf.writeUInt32BE(1234, 7);
        buf.writeUInt32BE(99999, 11);
        buf.writeUInt16BE(4, 15);
        buf.writeUInt16BE(5, 17);
        buf.write("hello", 19);
        // Calculate valid CRC
        const crcValue = crc32.buf(buf.subarray(0, buf.length - 4)) >>> 0;
        buf.writeUInt32BE(crcValue, buf.length - 4);
        // We expect decryption to fail (we didn't mock crypto fully), but CRC check comes BEFORE decryption.
        // In decodeMsg: Validate CRC -> Get Key -> Decrypt.
        // So checking logs for "Decryption failed" vs "CRC mismatch" separates the two.
        let logError = "";
        mockAdapter.log.error = (msg) => { logError += msg + "\n"; };
        parser.decodeMsg(buf, "duid");
        // If passed CRC, it proceeds to decryption.
        (0, chai_1.expect)(logError).to.include("Decryption");
        (0, chai_1.expect)(logError).to.not.include("CRC32 mismatch");
    });
});
//# sourceMappingURL=protocol.test.js.map