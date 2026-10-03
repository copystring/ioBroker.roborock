import { describe, expect, it } from "vitest";
import { gzipSync } from "node:zlib";
import { decodeMowerMapBlob } from "../../src/lib/mower/mowerMapBlob";
import { decodeMowerMapProjection } from "../../src/lib/mower/mowerMapProjection";
import { MowerMapTransfer } from "../../src/lib/mower/mowerMapTransfer";

const endpoint = "Abcdef12";
const nonce = 0x12345678;
const correlationId = 123;

function firstChunk(version: 0 | 1, payload = Buffer.from("abc")): Buffer {
	const header = Buffer.alloc(24);
	header.write(endpoint, 0, "ascii");
	header[15] = version;
	header.writeInt32LE(correlationId, 16);
	return Buffer.concat([header, payload]);
}

describe("RockMow native blob chunk assembly", () => {
	it("waits for all ordered sequence IDs and strips only the v0/v1 header", () => {
		const transfer = new MowerMapTransfer(nonce, correlationId, endpoint);
		expect(transfer.push({ nonce, sequenceId: 3, isLast: true, data: Buffer.from("c") })).toBeUndefined();
		expect(transfer.push({ nonce, sequenceId: 1, isLast: false, data: firstChunk(0, Buffer.from("a")) })).toBeUndefined();
		expect(transfer.push({ nonce, sequenceId: 3, isLast: true, data: Buffer.from("c") })).toBeUndefined();
		expect(transfer.push({ nonce, sequenceId: 2, isLast: false, data: Buffer.from("b") })).toEqual(Buffer.from([0, 97, 98, 99]));
	});

	it("retains the complete ROBOROCK v2 first chunk after the synthetic version byte", () => {
		const first = Buffer.alloc(14);
		first.write("ROBOROCK", 0, "ascii");
		first.writeInt32LE(correlationId, 8);
		first.write("pb", 12, "ascii");
		const transfer = new MowerMapTransfer(nonce, correlationId, endpoint);
		expect(transfer.push({ nonce, sequenceId: 1, isLast: true, data: first })).toEqual(Buffer.concat([Buffer.from([2]), first]));
	});

	it("assembles v0 chunks, unzips and projects the named boundaries", () => {
		const sourceMap = Buffer.from("7062520508072a01418a010667617264656e", "hex");
		const gzip = gzipSync(sourceMap);
		const cut = Math.floor(gzip.length / 2);
		const transfer = new MowerMapTransfer(nonce, correlationId, endpoint);
		expect(transfer.push({ nonce, sequenceId: 2, isLast: true, data: gzip.subarray(cut) })).toBeUndefined();
		const blob = transfer.push({ nonce, sequenceId: 1, isLast: false, data: firstChunk(0, gzip.subarray(0, cut)) });
		expect(blob).toBeDefined();
		expect(decodeMowerMapProjection(decodeMowerMapBlob(blob!))).toEqual({ name: "garden", boundaries: [{ id: 7, name: "A" }] });
	});

	it("rejects wrong nonce, conflicting duplicate, wrong ID and malformed headers", () => {
		const transfer = new MowerMapTransfer(nonce, correlationId, endpoint);
		expect(() => transfer.push({ nonce: 1, sequenceId: 1, isLast: true, data: firstChunk(0) })).toThrow("nonce");
		expect(transfer.push({ nonce, sequenceId: 2, isLast: true, data: Buffer.from("x") })).toBeUndefined();
		expect(() => transfer.push({ nonce, sequenceId: 2, isLast: true, data: Buffer.from("y") })).toThrow("duplicate");
		const bad = firstChunk(1);
		bad.writeInt32LE(999, 16);
		const rejected = new MowerMapTransfer(nonce, correlationId, endpoint);
		expect(() => rejected.push({ nonce, sequenceId: 1, isLast: true, data: bad })).toThrow("correlation ID");
		expect(() => rejected.push({ nonce, sequenceId: 1, isLast: true, data: firstChunk(0) })).toThrow("aborted");
		expect(() => new MowerMapTransfer(nonce, correlationId, endpoint).push({ nonce, sequenceId: 1, isLast: true, data: Buffer.alloc(4) })).toThrow("first chunk");
	});

	it("bounds chunks and bytes, and honours cancellation", () => {
		const limited = new MowerMapTransfer(nonce, correlationId, endpoint, 25);
		expect(() => limited.push({ nonce, sequenceId: 1, isLast: true, data: firstChunk(0) })).toThrow("limits");
		expect(() => limited.push({ nonce, sequenceId: 1, isLast: true, data: firstChunk(0) })).toThrow("aborted");
		const controller = new AbortController();
		const cancelled = new MowerMapTransfer(nonce, correlationId, endpoint, 1000, 10, controller.signal);
		controller.abort();
		expect(() => cancelled.push({ nonce, sequenceId: 1, isLast: true, data: firstChunk(0) })).toThrow("aborted");
	});
});
