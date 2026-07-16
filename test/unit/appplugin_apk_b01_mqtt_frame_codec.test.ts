import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import {
	ApkB01CodecError,
	decodeApkB01MqttFrame,
	decodeApkB01MqttFrameToSegment,
	decryptApkB01Payload,
	deriveApkB01Iv,
	encryptApkB01Payload,
	parseApkB01MqttFrame,
} from "../../src/apppluginHost/apkB01MqttFrameCodec";
import { ApkBlobTransferAssembler } from "../../src/apppluginHost/apkBlobTransferAssembler";
import { ApkPluginDeviceEventBridge } from "../../src/apppluginHost/apkDeviceEvents";
import { Q10_FIXTURE_DEFAULTS } from "./q10FixtureDefaults";
import { Q10_PRIMARY_SAMPLE } from "./q10RepresentativeFixture";

const originalPayload = Buffer.from("7b22647073223a7b22313031223a317d7d", "hex");
const originalB01Ciphertext = Buffer.from(
	"7rngjTqKTAVmilDBDP7T5hSG2uttD8LxzB+eA1CKWjs=",
	"base64",
);

describe("APK B01 MQTT frame codec", () => {
	it("matches traced librrcodec.so IVs and the original codecB1 vector byte-for-byte", () => {
		expect(deriveApkB01Iv(0).toString()).toBe("2dafb24e74ccdec2");
		expect(deriveApkB01Iv(1).toString()).toBe("b0ae0c7bdb93941b");
		expect(deriveApkB01Iv(42).toString()).toBe("c20ff2c7e5b55b29");
		expect(deriveApkB01Iv(0x3c21_018e).toString()).toBe("76531ad1fcbd4b1a");
		expect(deriveApkB01Iv(-1).toString()).toBe("fa8472c3310c794f");
		expect(encryptApkB01Payload(originalPayload, "0123456789abcdef", 42)).toEqual(originalB01Ciphertext);
		expect(decryptApkB01Payload(originalB01Ciphertext, "0123456789abcdef", 42)).toEqual(originalPayload);
	});

	it("decodes the representative Q10 frame exactly like the original APK codec", () => {
		const parsed = parseApkB01MqttFrame(Q10_PRIMARY_SAMPLE);
		expect(parsed).toMatchObject({
			protocolVersion: "B01",
			messageId: 1,
			random: 1_008_796_046,
			timestamp: 1_773_781_272,
			dataPointId: 301,
			payloadLength: 11_952,
			checksum: 1_337_865_561,
		});

		const decoded = decodeApkB01MqttFrame(Q10_PRIMARY_SAMPLE, Q10_FIXTURE_DEFAULTS.localKey);
		expect(decoded.decryptedPayload).toHaveLength(11_946);
		expect(decoded.decryptedPayload.subarray(0, 64).toString("hex")).toBe(
			"030169ac571101007c00ee009f019100050035019f0167000074350bd91ff301002a1ef901000f50002a0f0200190e7b001ff93f00190f02002a3af9f9080100",
		);
		expect(createHash("sha256").update(decoded.decryptedPayload).digest("hex")).toBe(
			"93e549e35ff36f34076d5e80ba6f3b02f2adc0d055113eda05e30c87ed3d5acc",
		);
	});

	it("preserves the APK frame to TransferDataBean to Blob-event data flow", () => {
		const duid = "q10-apk-path";
		const segment = decodeApkB01MqttFrameToSegment(
			duid,
			Q10_PRIMARY_SAMPLE,
			Q10_FIXTURE_DEFAULTS.localKey,
		);
		expect(segment).toMatchObject({
			duid,
			pv: "B01",
			nonce: 1_008_796_046,
			sequenceId: 1,
			isFirst: true,
			isLast: true,
		});

		const assembled = new ApkBlobTransferAssembler(duid, "unused-for-b01").accept(segment);
		expect(assembled?.kind).toBe("b01-payload");
		if (assembled?.kind !== "b01-payload") throw new Error("B01-Blob erwartet");
		expect(assembled.payload).toEqual(segment.data);

		const bridge = new ApkPluginDeviceEventBridge();
		let emittedBlob = "";
		bridge.addListener("RRDeviceBlobPayloadUpdateEvent", payload => {
			emittedBlob = (payload as { blob: string }).blob;
		});
		bridge.emitBlobPayload(assembled.payload);
		expect(Buffer.from(emittedBlob, "base64")).toEqual(segment.data);
		expect(Buffer.from(emittedBlob, "base64")[0]).toBe(3);
	});

	it("fails closed on malformed frames, CRCs, keys and cipher blocks", () => {
		expect(() => parseApkB01MqttFrame(Buffer.from("B01"))).toThrowError(
			expect.objectContaining<Partial<ApkB01CodecError>>({ stage: "frame" }),
		);
		const badChecksum = Buffer.from(Q10_PRIMARY_SAMPLE);
		badChecksum[30] ^= 0xff;
		expect(() => parseApkB01MqttFrame(badChecksum)).toThrowError(
			expect.objectContaining<Partial<ApkB01CodecError>>({ stage: "checksum" }),
		);
		expect(() => decryptApkB01Payload(Buffer.alloc(16), "short", 1)).toThrowError(
			expect.objectContaining<Partial<ApkB01CodecError>>({ stage: "key" }),
		);
		expect(() => decryptApkB01Payload(Buffer.alloc(15), "0123456789abcdef", 1)).toThrowError(
			expect.objectContaining<Partial<ApkB01CodecError>>({ stage: "cipher" }),
		);
	});
});
