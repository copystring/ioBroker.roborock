import { createCipheriv } from "node:crypto";
import { gzipSync } from "node:zlib";
import { describe, expect, it } from "vitest";
import { decodeMowerMapBlob } from "../../src/lib/mower/mowerMapBlob";

describe("RockMow native map blob payload", () => {
	const map = Buffer.from("pb\x0a\x04map1", "binary");
	const key = Buffer.from("0123456789abcdef", "ascii");

	it("returns version 2 bytes unchanged after its one-byte marker", () => {
		expect(decodeMowerMapBlob(Buffer.concat([Buffer.from([2]), map]))).toEqual(map);
	});

	it("decompresses version 0 GZIP and version 1 AES-CBC/GZIP", () => {
		const compressed = gzipSync(map);
		expect(decodeMowerMapBlob(Buffer.concat([Buffer.from([0]), compressed]))).toEqual(map);
		const cipher = createCipheriv("aes-128-cbc", key, Buffer.alloc(16));
		const encrypted = Buffer.concat([cipher.update(compressed), cipher.final()]);
		expect(decodeMowerMapBlob(Buffer.concat([Buffer.from([1]), encrypted]), key)).toEqual(map);
	});

	it("requires the explicit key and bounds expanded output", () => {
		expect(() => decodeMowerMapBlob(Buffer.from([1, 1]))).toThrow("explicit AES key");
		expect(() => decodeMowerMapBlob(Buffer.from([3, 1]))).toThrow("Unsupported");
		expect(() => decodeMowerMapBlob(Buffer.concat([Buffer.from([2]), map]), undefined, map.length - 1)).toThrow("size limit");
		expect(() => decodeMowerMapBlob(Buffer.alloc(2048), undefined, 64)).toThrow("size limit");
		expect(() => decodeMowerMapBlob(Buffer.concat([Buffer.from([0]), gzipSync(Buffer.alloc(1000))]), undefined, 64)).toThrow("size limit");
	});
});
