import * as crypto from "node:crypto";
import * as zlib from "node:zlib";

import { describe, expect, it, vi } from "vitest";

import {
	ApkBlobTransferAssembler,
	type ApkBlobTransferSegment,
} from "../../src/apppluginHost/apkBlobTransferAssembler";
import { ApkPluginDeviceEventBridge } from "../../src/apppluginHost/apkDeviceEvents";
import {
	ApkRpcBlobCodecError,
	decodeApkRpcBlob,
	decodeApkRpcBlobToBase64,
} from "../../src/apppluginHost/apkRpcBlobCodec";

const duid = "rr-device";
const endpoint = "ENDPOINT";

function segment(overrides: Partial<ApkBlobTransferSegment> = {}): ApkBlobTransferSegment {
	return {
		duid,
		pv: "B01",
		nonce: 7,
		sequenceId: 1,
		isFirst: true,
		isLast: false,
		data: Buffer.from("first"),
		...overrides,
	};
}

function encryptApkVersionOne(payload: Buffer, nonce: string): Buffer {
	const cipher = crypto.createCipheriv("aes-128-cbc", Buffer.from(nonce, "hex"), Buffer.alloc(16));
	return Buffer.concat([cipher.update(zlib.gzipSync(payload)), cipher.final()]);
}

describe("APK-derived device blob path", () => {
	it("emits the exact RRPluginDevice event names and Base64 payload shapes", () => {
		const bridge = new ApkPluginDeviceEventBridge();
		const blobListener = vi.fn();
		const protobufListener = vi.fn();
		const dpsListener = vi.fn();
		const removeBlobListener = bridge.addListener("RRDeviceBlobPayloadUpdateEvent", blobListener);
		bridge.addListener("RRDeviceDpsPbUpdateEvent", protobufListener);
		bridge.addListener("RRDeviceDpsUpdateEvent", dpsListener);

		bridge.emitBlobPayload(Buffer.from([0xfb, 0xef, 0xff]));
		bridge.emitProtobufPayload(Buffer.from("protobuf"));
		bridge.emitDpsPayload('{"102":{"id":9}}');

		expect(blobListener).toHaveBeenCalledWith({ blob: "++//" });
		expect(protobufListener).toHaveBeenCalledWith("cHJvdG9idWY=");
		expect(dpsListener).toHaveBeenCalledWith({ dps: '{"102":{"id":9}}' });
		removeBlobListener();
		bridge.emitBlobPayload(Buffer.from("ignored"));
		expect(blobListener).toHaveBeenCalledTimes(1);
	});

	it("assembles B01 segments by nonce and sequence without interpreting their bytes", () => {
		const assembler = new ApkBlobTransferAssembler(duid, endpoint);
		expect(assembler.accept(segment({ duid: "other" }))).toBeUndefined();
		expect(assembler.accept(segment({ sequenceId: 2, isFirst: false, isLast: true, data: Buffer.from("second") })))
			.toBeUndefined();
		expect(assembler.accept(segment({ sequenceId: 2, isFirst: false, isLast: true, data: Buffer.from("second") })))
			.toBeUndefined();

		const result = assembler.accept(segment());
		expect(result).toEqual({
			kind: "b01-payload",
			duid,
			payload: Buffer.from("firstsecond"),
		});
	});

	it("fails closed on mixed protocols, conflicting duplicates and impossible last segments", () => {
		const assembler = new ApkBlobTransferAssembler(duid, endpoint);
		assembler.accept(segment({
			sequenceId: 2,
			isFirst: false,
			isLast: true,
			data: Buffer.from("second"),
		}));
		expect(() => assembler.accept(segment({ pv: "1.0" }))).toThrow(/mischt Protokolle/u);
		expect(() => assembler.accept(segment({
			sequenceId: 2,
			isFirst: false,
			isLast: true,
			data: Buffer.from("conflict"),
		}))).toThrow(/widersprüchliche Sequenz/u);
		expect(assembler.accept(segment())).toEqual({
			kind: "b01-payload",
			duid,
			payload: Buffer.from("firstsecond"),
		});

		const impossibleLast = new ApkBlobTransferAssembler(duid, endpoint);
		impossibleLast.accept(segment({
			sequenceId: 3,
			isFirst: false,
			isLast: false,
			data: Buffer.from("third"),
		}));
		expect(() => impossibleLast.accept(segment({
			sequenceId: 2,
			isFirst: false,
			isLast: true,
			data: Buffer.from("second"),
		}))).toThrow(/hinter dem letzten Segment/u);
	});

	it("expires stale groups, evicts the least recently used nonce and bounds segment resources", () => {
		let now = 0;
		const assembler = new ApkBlobTransferAssembler(duid, endpoint, 2, 10, () => now);
		const pendingLast = (nonce: number): ApkBlobTransferSegment => segment({
			nonce,
			sequenceId: 2,
			isFirst: false,
			isLast: true,
			data: Buffer.from("second"),
		});
		assembler.accept(pendingLast(1));
		now = 1;
		assembler.accept(pendingLast(2));
		now = 2;
		assembler.accept(pendingLast(3));
		expect(assembler.accept(segment({ nonce: 1 }))).toBeUndefined();

		now = 20;
		expect(assembler.accept(segment({ nonce: 2 }))).toBeUndefined();
		expect(() => assembler.accept(segment({ sequenceId: 8_193, isFirst: false }))).toThrow(
			/zwischen 1 und 8192/u,
		);
		expect(() => assembler.accept(segment({ data: new Uint8Array(8 * 1024 * 1024 + 1) }))).toThrow(
			/überschreitet/u,
		);
		expect(() => new ApkBlobTransferAssembler(duid, endpoint, 0)).toThrow(/Gruppenanzahl/u);
	});

	it("reproduces the APK version-0 header stripping and GZIP path", () => {
		const body = Buffer.from("version-zero-map");
		const compressed = zlib.gzipSync(body);
		const first = Buffer.alloc(24 + 5);
		first.write(endpoint, 0, "ascii");
		first[15] = 0;
		first.writeInt32LE(31337, 16);
		compressed.copy(first, 24, 0, 5);
		const assembler = new ApkBlobTransferAssembler(duid, endpoint);
		expect(assembler.accept(segment({ pv: "1.0", data: first }))).toBeUndefined();
		const result = assembler.accept(segment({
			pv: "1.0",
			sequenceId: 2,
			isFirst: false,
			isLast: true,
			data: compressed.subarray(5),
		}));

		expect(result?.kind).toBe("rpc-response");
		if (result?.kind !== "rpc-response") throw new Error("RPC-Antwort erwartet");
		expect(result.messageId).toBe(31337);
		expect(result.protocolVersion).toBe(0);
		expect(decodeApkRpcBlob(result.encodedResponse, "00000000000000000000000000000000")).toEqual(body);
	});

	it("reproduces the APK AES-CBC, zero-IV and GZIP path", () => {
		const nonce = "00112233445566778899AABBCCDDEEFF";
		const body = Buffer.from("version-one-map");
		const encrypted = encryptApkVersionOne(body, nonce);
		const encoded = Buffer.concat([Buffer.from([1]), encrypted]);
		expect(decodeApkRpcBlob(encoded, nonce)).toEqual(body);
		expect(decodeApkRpcBlobToBase64(encoded, nonce)).toBe(body.toString("base64"));
	});

	it("passes APK version 2 through without decrypting or decompressing it", () => {
		const raw = Buffer.alloc(20);
		raw.write("ROBOROCK", 0, "ascii");
		raw.writeInt32LE(42, 8);
		raw.write("payload", 12, "ascii");
		const assembler = new ApkBlobTransferAssembler(duid, endpoint);
		const result = assembler.accept(segment({ pv: "1.0", isLast: true, data: raw }));

		expect(result?.kind).toBe("rpc-response");
		if (result?.kind !== "rpc-response") throw new Error("RPC-Antwort erwartet");
		expect(result.messageId).toBe(42);
		expect(result.protocolVersion).toBe(2);
		expect(decodeApkRpcBlob(result.encodedResponse, "not-used-for-v2")).toEqual(raw);
	});

	it("fails closed when the APK key or compressed payload is invalid", () => {
		expect(() => decodeApkRpcBlob(Buffer.from([1, 1, 2, 3]), "invalid"))
			.toThrowError(expect.objectContaining<Partial<ApkRpcBlobCodecError>>({ stage: "key" }));
		expect(() => decodeApkRpcBlob(Buffer.from([0, 1, 2, 3]), "00000000000000000000000000000000"))
			.toThrowError(expect.objectContaining<Partial<ApkRpcBlobCodecError>>({ stage: "gzip" }));
	});
});
