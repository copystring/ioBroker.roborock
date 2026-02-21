import * as crc32 from "crc-32";
import { beforeEach, describe, expect, it } from "vitest";
import { messageParser } from "../messageParser"; // Real class
import { MockAdapter } from "./MockAdapter";

describe("Protocol Deep Dive (messageParser)", () => {
	let mockAdapter: MockAdapter;
	let parser: messageParser;

	beforeEach(() => {
		mockAdapter = new MockAdapter();
		mockAdapter.http_api = {
			getMatchedLocalKeys: () => new Map([["duid", Buffer.from("3641643966536967756e447950543255", "hex")]])
		} as any;
		parser = new messageParser(mockAdapter as any);
		// Mock crypto engine if needed, but we can verify CRC/Header without decrypting if we mock dependencies
		// Actually, decodeMsg calls decryptors.
		// We'll need to mock crypto or handle the throwing.
	});

	it("should reject invalid CRC", () => {
		// Construct a fake frame

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
		// Log error is called, returns empty array
		expect(decoded).to.be.an("array").that.is.empty;
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
		mockAdapter.log.error = (msg: string) => {
			logError += msg + "\n";
		};

		parser.decodeMsg(buf, "duid");

		// If passed CRC, it proceeds to decryption.
		expect(logError).to.include("Decryption");
		expect(logError).to.not.include("CRC32 mismatch");
	});
});
