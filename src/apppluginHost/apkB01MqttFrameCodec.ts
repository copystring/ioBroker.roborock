import { createCipheriv, createDecipheriv, createHash } from "node:crypto";

import { buf as crc32Buffer } from "crc-32";

import type { ApkBlobTransferSegment } from "./apkBlobTransferAssembler";

const B01_HEADER_BYTES = 19;
const B01_CHECKSUM_BYTES = 4;
const B01_IV_SUFFIX = "5wwh9ikChRjASpMU8cxg7o1d2E";

export type ApkB01CodecStage = "frame" | "checksum" | "key" | "cipher";

export class ApkB01CodecError extends Error {
	public constructor(
		public readonly stage: ApkB01CodecStage,
		message: string,
		options?: ErrorOptions,
	) {
		super(message, options);
		this.name = "ApkB01CodecError";
	}
}

export interface ApkB01MqttFrame {
	protocolVersion: "B01";
	messageId: number;
	random: number;
	timestamp: number;
	dataPointId: number;
	payloadLength: number;
	encryptedPayload: Buffer;
	checksum: number;
}

export interface ApkDecodedB01MqttFrame extends ApkB01MqttFrame {
	decryptedPayload: Buffer;
}

function asBuffer(data: Uint8Array): Buffer {
	return Buffer.from(data.buffer, data.byteOffset, data.byteLength);
}

function validateLocalKey(localKey: string): Buffer {
	const key = Buffer.from(localKey, "utf8");
	if (key.length !== 16) {
		throw new ApkB01CodecError("key", "Der APK-B01-LocalKey muss exakt 16 UTF-8-Bytes lang sein");
	}
	return key;
}

/**
 * Recreates RRCodecApi.codecB1's IV derivation.
 *
 * The input and slice were traced against the original APK's librrcodec.so:
 * MD5(sprintf("%08x", random) + suffix).substring(9, 25), used as ASCII.
 */
export function deriveApkB01Iv(random: number): Buffer {
	if (!Number.isSafeInteger(random) || random < -0x8000_0000 || random > 0xffff_ffff) {
		throw new ApkB01CodecError("frame", "B01 random muss in einen 32-Bit-Wert passen");
	}
	const encodedRandom = (random >>> 0).toString(16).padStart(8, "0");
	const digest = createHash("md5").update(encodedRandom + B01_IV_SUFFIX, "utf8").digest("hex");
	return Buffer.from(digest.slice(9, 25), "ascii");
}

export function encryptApkB01Payload(payload: Uint8Array, localKey: string, random: number): Buffer {
	const cipher = createCipheriv("aes-128-cbc", validateLocalKey(localKey), deriveApkB01Iv(random));
	return Buffer.concat([cipher.update(asBuffer(payload)), cipher.final()]);
}

export function decryptApkB01Payload(payload: Uint8Array, localKey: string, random: number): Buffer {
	if (payload.byteLength === 0 || payload.byteLength % 16 !== 0) {
		throw new ApkB01CodecError("cipher", "APK-B01-Nutzdaten müssen aus vollständigen AES-Blöcken bestehen");
	}
	try {
		const decipher = createDecipheriv("aes-128-cbc", validateLocalKey(localKey), deriveApkB01Iv(random));
		return Buffer.concat([decipher.update(asBuffer(payload)), decipher.final()]);
	} catch (error) {
		if (error instanceof ApkB01CodecError) throw error;
		throw new ApkB01CodecError("cipher", "RRCodecApi.codecB1 konnte die Nutzdaten nicht entschlüsseln", {
			cause: error,
		});
	}
}

/**
 * Parses the exact MQTT wire-frame layout consumed by the APK before it calls
 * RRCodecApi.codecB1. The checksum covers every byte except the final CRC32.
 */
export function parseApkB01MqttFrame(frameData: Uint8Array): ApkB01MqttFrame {
	const frame = asBuffer(frameData);
	if (frame.length < B01_HEADER_BYTES + B01_CHECKSUM_BYTES) {
		throw new ApkB01CodecError("frame", "APK-B01-Frame ist kürzer als 23 Bytes");
	}
	const protocolVersion = frame.toString("ascii", 0, 3);
	if (protocolVersion !== "B01") {
		throw new ApkB01CodecError("frame", `Nicht unterstützte APK-Protokollversion: ${protocolVersion}`);
	}
	const payloadLength = frame.readUInt16BE(17);
	const expectedLength = B01_HEADER_BYTES + payloadLength + B01_CHECKSUM_BYTES;
	if (frame.length !== expectedLength) {
		throw new ApkB01CodecError(
			"frame",
			`APK-B01-Länge stimmt nicht: Header meldet ${expectedLength}, empfangen wurden ${frame.length} Bytes`,
		);
	}
	const checksum = frame.readUInt32BE(expectedLength - B01_CHECKSUM_BYTES);
	const calculatedChecksum = crc32Buffer(frame.subarray(0, -B01_CHECKSUM_BYTES)) >>> 0;
	if (checksum !== calculatedChecksum) {
		throw new ApkB01CodecError(
			"checksum",
			`APK-B01-CRC stimmt nicht: empfangen ${checksum}, berechnet ${calculatedChecksum}`,
		);
	}
	return {
		protocolVersion: "B01",
		messageId: frame.readInt32BE(3),
		random: frame.readInt32BE(7),
		timestamp: frame.readInt32BE(11),
		dataPointId: frame.readUInt16BE(15),
		payloadLength,
		encryptedPayload: Buffer.from(frame.subarray(B01_HEADER_BYTES, B01_HEADER_BYTES + payloadLength)),
		checksum,
	};
}

export function decodeApkB01MqttFrame(
	frameData: Uint8Array,
	localKey: string,
): ApkDecodedB01MqttFrame {
	const frame = parseApkB01MqttFrame(frameData);
	return {
		...frame,
		decryptedPayload: decryptApkB01Payload(frame.encryptedPayload, localKey, frame.random),
	};
}

/**
 * Converts one decoded APK MQTT frame into the TransferDataBean shape consumed
 * by RRRpcManager. It deliberately does not inspect or alter map bytes.
 */
export function decodeApkB01MqttFrameToSegment(
	duid: string,
	frameData: Uint8Array,
	localKey: string,
): ApkBlobTransferSegment {
	if (duid.length === 0) {
		throw new ApkB01CodecError("frame", "duid darf nicht leer sein");
	}
	const frame = decodeApkB01MqttFrame(frameData, localKey);
	return {
		duid,
		pv: frame.protocolVersion,
		nonce: frame.random,
		sequenceId: frame.messageId,
		isFirst: frame.messageId === 1,
		isLast: frame.dataPointId === 301,
		data: frame.decryptedPayload,
	};
}
