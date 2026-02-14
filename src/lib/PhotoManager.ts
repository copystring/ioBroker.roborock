import { Parser } from "binary-parser";
import { promisify } from "util";
import * as zlib from "zlib";
import type { Roborock } from "../main";
import { cryptoEngine } from "./cryptoEngine";

const unzipAsync = promisify(zlib.unzip);

// Header Parser for Protocol 300 (Initial Photo Chunk)
const proto300HeaderParser = new Parser()
	.endianess("little")
	.string("magic", { length: 8, assert: "ROBOROCK" }) // 0-7
	.uint32("msgIdRaw") // 8-11 (Full Request ID)
	.skip(4) // 12-15 (Zeros/Reserved)
	.uint16("headerLength") // 16-17
	.uint16("totalChunks") // 18-19
	.uint32("totalSize") // 20-23
	.uint16("checksum"); // 24-25

// Header Parser for Protocol 301 (Subsequent Photo Chunks)
const proto301HeaderParser = new Parser()
	.endianess("little")
	.string("magic", { length: 8, assert: "ROBOROCK" }) // 0-7
	.uint32("msgIdRaw") // 8-11 (Full Request ID)
	.skip(4) // 12-15 (Zeros/Reserved)
	.uint16("headerLength") // 16-17
	.uint16("sequence") // 18-19
	.uint32("chunkSize") // 20-23 (NOTE: This is NOT TotalSize for P301)
	.uint16("checksum"); // 24-25

// Parser for V1 Photo Inner Header
const v1PhotoInnerHeaderParser = new Parser()
	.endianess("little")
	.uint16("version")
	.uint16("headerLength")
	.uint32("type");

const v1PhotoProprietaryHeaderParser = new Parser()
	.endianess("little")
	.uint16("width")
	.uint16("height")
	.uint32("unknown1")
	.uint32("classId")
	.uint16("x1")
	.uint16("y1")
	.uint16("x2")
	.uint16("y2")
	.uint32("unknown2")
	.uint32("instanceId");

export interface PhotoRequestData {
	id: number;
	chunks: Record<number, Buffer>;
	expectedSize?: number;
	lastUpdateTime: number;
	extracted?: { photo: Buffer; bbox: any | null };
}

export class PhotoManager {
	private adapter: Roborock;
	private pendingPhotoRequests: Record<string, PhotoRequestData> = {};
	// Stores expected msgId for raw streams (P300 with 0 chunks) per DUID
	private expectedRawStreams: Map<string, { msgIdRaw: number; totalSize: number }> = new Map();
	// Buffer for packets arriving before P300 header (Out-of-Order / Early Data)
	private earlyDataPackets: Map<string, { buffers: Buffer[]; timer: any }> = new Map();
	private photoCleanupInterval: any = null;

	constructor(adapter: Roborock) {
		this.adapter = adapter;

		this.photoCleanupInterval = this.adapter.setInterval(() => {
			const now = Date.now();
			for (const key in this.pendingPhotoRequests) {
				if (now - this.pendingPhotoRequests[key].lastUpdateTime > 60000) {
					delete this.pendingPhotoRequests[key];
				}
			}
		}, 30000);
	}

	public getPendingPhotoRequests(): Record<string, PhotoRequestData> {
		return this.pendingPhotoRequests;
	}

	public getPendingRequest(duid: string): PhotoRequestData | undefined {
		const keys = Object.keys(this.pendingPhotoRequests);
		const key = keys.find((k) => k.startsWith(`${duid}_`));
		return key ? this.pendingPhotoRequests[key] : undefined;
	}

	/**
	 * Dedicated handler for Protocol 300 (Initial Photo Chunk).
	 * Returns true if the packet was identified as a photo.
	 */
	public async handlePhotoProtocol300(duid: string, payloadBuf: Buffer): Promise<boolean> {
		return this.handleCommonPhotoPacket(duid, payloadBuf, 300);
	}

	public async handlePhotoProtocol301(duid: string, payloadBuf: Buffer, forcedMsgId?: number): Promise<boolean> {
		return this.handleCommonPhotoPacket(duid, payloadBuf, 301, forcedMsgId);
	}

	private async handleCommonPhotoPacket(duid: string, payloadBuf: Buffer, protocol: number, forcedMsgId?: number): Promise<boolean> {
		const magicSearch = payloadBuf.indexOf("ROBOROCK");
		const alignedBuf = magicSearch !== -1 ? payloadBuf.subarray(magicSearch) : payloadBuf;

		let context: { msgIdRaw: number; sequence: number; totalSize: number; headerLength: number; dataSkip: number } | null = null;

		try {
			if (magicSearch !== -1) {
				if (protocol === 300) {
					const header = proto300HeaderParser.parse(alignedBuf);
					context = {
						msgIdRaw: header.msgIdRaw,
						sequence: 1, // P300 is always the start
						totalSize: header.totalSize,
						headerLength: header.headerLength,
						dataSkip: 26 // Preserve RSA
					};
					// If chunks == 0, expect raw stream (Type 0 behavior)
					if (header.totalChunks === 0) {
						// This is for Type 0 photos that come on P300 as raw stream (less common now)
						await this.expectRawStream(duid, header.msgIdRaw, header.totalSize);
					}
				} else {
					context = this.parseProtocol301Header(duid, alignedBuf);
				}
			} else {
				// Try to match with expected raw stream (Type 0)
				context = this.matchRawStreamContext(duid);

				// Fallback: If forced by RequestsHandler match but packet has no internal header
				if (!context && forcedMsgId) {
					const requestKey = `${duid}_${forcedMsgId}`;
					const existing = this.pendingPhotoRequests[requestKey];
					const nextSeq = existing ? Object.keys(existing.chunks).length + 1 : 1;

					context = {
						msgIdRaw: forcedMsgId,
						sequence: nextSeq,
						totalSize: 0,
						headerLength: 0,
						dataSkip: 0
					};
				}
			}

			if (context) {
				const { msgIdRaw, sequence, totalSize, headerLength, dataSkip } = context;
				const requestKey = `${duid}_${msgIdRaw}`;
				let photoData = this.pendingPhotoRequests[requestKey];

				if (!photoData) {
					// Check if this request is still pending in global queue
					if (!this.adapter.pendingRequests.has(msgIdRaw as any)) return true;

					// Calculation: expectedSize = payloadSize + (actualHeaderReserved - 26)
					const expectedSize = totalSize > 0 ? totalSize + (headerLength > 0 ? headerLength - 26 : 0) : 0;
					photoData = this.initializePhotoRequest(msgIdRaw, expectedSize);
					this.pendingPhotoRequests[requestKey] = photoData;
				}

				if (headerLength > 0 && totalSize > 0 && !photoData.expectedSize) {
					photoData.expectedSize = totalSize + (headerLength - 26);
				}

				// Sequence is 1-based, we store as 0-based index
				photoData.chunks[sequence - 1] = alignedBuf.subarray(dataSkip);
				photoData.lastUpdateTime = Date.now();

				// Register as expected raw stream if not complete (ensures P301 without headers match this DUID)
				const isComplete = await this.isPhotoComplete(photoData);
				if (!isComplete && msgIdRaw) {
					// We call expectRawStream even if it's P300 with Chunk=1, because out-of-order packets might be waiting
					await this.expectRawStream(duid, msgIdRaw, photoData.expectedSize || 0);
				}

				if (isComplete) {
					await this.processAndResolvePhoto(photoData, duid, requestKey, protocol);
				}
				return true;
			}

			// Not a header and not an expected raw stream -> Early Data?
			this.bufferEarlyDataPacket(duid, payloadBuf);
			return false;
		} catch (e: any) {
			this.adapter.rLog("MQTT", duid, "Error", undefined, protocol.toString(), `[Photo] Reassembly error: ${e.message}`, "error");
			return true;
		}
	}

	private async expectRawStream(duid: string, msgIdRaw: number, totalSize: number): Promise<void> {
		this.expectedRawStreams.set(duid, { msgIdRaw, totalSize });

		// Check for early data packets that arrived before the header
		const earlyData = this.earlyDataPackets.get(duid);
		if (earlyData) {
			clearTimeout(earlyData.timer);
			this.earlyDataPackets.delete(duid);

			// Process strictly in order
			for (const buf of earlyData.buffers) {
				await this.handlePhotoProtocol301(duid, buf);
			}
		}
	}

	private initializePhotoRequest(photoId: number, expectedSize: number): PhotoRequestData {
		return {
			id: photoId,
			chunks: {},
			expectedSize: expectedSize,
			lastUpdateTime: Date.now()
		};
	}

	private parseProtocol301Header(duid: string, payloadBuf: Buffer): { msgIdRaw: number; sequence: number; totalSize: number; headerLength: number; dataSkip: number } | null {
		if (payloadBuf.length < 26) {
			this.adapter.log.warn(`[Photo] P301 Short Header Ignored: ${duid} (Bytes: ${payloadBuf.toString("hex")})`);
			return null;
		}
		const header = proto301HeaderParser.parse(payloadBuf);

		// If headerLength is > 26 (e.g. 184), we only skip 26 for sequence 1 to keep RSA, but FULL header for seq > 1
		const dataSkip = header.sequence === 1 ? 26 : header.headerLength;

		return {
			msgIdRaw: header.msgIdRaw,
			sequence: header.sequence,
			totalSize: header.chunkSize, // For P301, chunkSize often is the image size (if seq=1)
			headerLength: header.headerLength,
			dataSkip: dataSkip
		};
	}

	private matchRawStreamContext(duid: string): { msgIdRaw: number; sequence: number; totalSize: number; headerLength: number; dataSkip: number } | null {
		const expected = this.expectedRawStreams.get(duid);
		if (!expected) return null;

		const { msgIdRaw, totalSize } = expected;
		const requestKey = `${duid}_${msgIdRaw}`;
		const existing = this.pendingPhotoRequests[requestKey];
		// If P300 was already handled, it's chunks[0]. If we find 1 chunk, next is sequence 2.
		// If P300 was somehow missed, we stay at sequence 2 as a placeholder for the missing header.
		const sequence = existing ? Object.keys(existing.chunks).length + 1 : 2;

		return {
			msgIdRaw,
			sequence,
			totalSize,
			headerLength: 0,
			dataSkip: 0
		};
	}

	private bufferEarlyDataPacket(duid: string, payloadBuf: Buffer): void {
		let entry = this.earlyDataPackets.get(duid);
		if (!entry) {
			entry = {
				buffers: [],
				timer: setTimeout(() => {
					this.earlyDataPackets.delete(duid);
				}, 2000) // Keep for 2s
			};
			this.earlyDataPackets.set(duid, entry);
		}
		entry.buffers.push(payloadBuf);
	}

	/**
	 * Shared logic to determine if all chunks for a photo have been received.
	 * Now supports speculative decryption for encrypted photos where totalSize is unknown.
	 */
	public async isPhotoComplete(photoData: PhotoRequestData): Promise<boolean> {
		const keys = Object.keys(photoData.chunks)
			.map(Number)
			.sort((a, b) => a - b);
		const currentSize = keys.reduce((sum, k) => sum + photoData.chunks[k].length, 0);

		// Case A: Size Math (Most reliable)
		// expectedSize = totalSize + (headerLength - 26)
		if (photoData.expectedSize && photoData.expectedSize > 0 && currentSize >= photoData.expectedSize) {
			return true;
		}

		// Case B: Feature Hint (Thumbnail Type 1 is often complete in one packet)
		const req = this.adapter.pendingRequests.get(photoData.id as any) as any;
		if (req?.params?.data_filter?.type === 1 && keys.length > 0 && (!photoData.expectedSize || currentSize >= photoData.expectedSize)) {
			return true;
		}

		// Case C: Speculative Detection (fallback)
		const isCipher1 = req?.params?.security?.cipher_suite === 1;

		try {
			const totalBuffer = Buffer.concat(keys.map((k) => photoData.chunks[k]));
			let checkBuf = totalBuffer;

			if (isCipher1) {
				// decryptPhotoPayload will throw if padding is wrong (truncated buffer)
				checkBuf = cryptoEngine.decryptPhotoPayload(totalBuffer) as any;
			}

			// Speculative extraction to find JPEG/PNG boundaries
			const extracted = await this.extractPhotoData(checkBuf);
			if (extracted.photo && extracted.photo.length > 0) {
				const buf = extracted.photo;
				// JPEG EOF: FF D9
				if (buf.length >= 2 && buf[buf.length - 2] === 0xff && buf[buf.length - 1] === 0xd9) {
					photoData.extracted = extracted;
					return true;
				}
				// PNG EOF: IEND block
				if (buf.length >= 12 && buf.toString("hex", buf.length - 12).includes("49454e44ae426082")) {
					photoData.extracted = extracted;
					return true;
				}
			}
		} catch {
			// Decryption or decompression failure usually means incomplete data
		}

		return false;
	}

	/**
	 * Processes a completed photo request: extracts data and resolves the pending request.
	 */
	private async processAndResolvePhoto(photoData: PhotoRequestData, duid: string, requestKey: string, protocol: number): Promise<void> {
		try {
			let finalPhotoBuf: Buffer;
			let bbox: any;

			if (photoData.extracted) {
				finalPhotoBuf = photoData.extracted.photo;
				bbox = photoData.extracted.bbox;
			} else {
				const sortedKeys = Object.keys(photoData.chunks).map(Number).sort((a, b) => a - b);
				const totalBuffer = Buffer.concat(sortedKeys.map(k => photoData.chunks[k]));

				const req = this.adapter.pendingRequests.get(photoData.id) as any;
				const isCipher1 = req?.params?.security?.cipher_suite === 1;

				let decryptedBuffer: Buffer = totalBuffer;

				// Priority: Standard P300 Decryption
				if (isCipher1) {
					try {
						decryptedBuffer = cryptoEngine.decryptPhotoPayload(totalBuffer);
					} catch (e: any) {
						this.adapter.rLog("MQTT", duid, "Error", undefined, protocol.toString(), `[Photo] Decryption failed: ${e.message}`, "error", photoData.id);
						throw e;
					}
				}

				const extracted = await this.extractPhotoData(decryptedBuffer);
				finalPhotoBuf = extracted.photo;
				bbox = extracted.bbox;
			}

			if (finalPhotoBuf && finalPhotoBuf.length > 0) {
				this.adapter.requestsHandler.resolvePendingRequest(photoData.id, { buffer: finalPhotoBuf, bbox }, protocol.toString(), duid, "MQTT");

				// Clean up raw stream expectation if complete
				const expected = this.expectedRawStreams.get(duid);
				if (expected && expected.msgIdRaw === photoData.id) {
					this.expectedRawStreams.delete(duid);
				}
			}
		} catch (err: any) {
			const version = await this.adapter.getDeviceProtocolVersion(duid).catch(() => "1.0");
			this.adapter.rLog("MQTT", duid, "Error", version, protocol.toString(), `[Photo] Failed to reassemble/extract: ${err.message}`, "error", photoData.id);
		}

		delete this.pendingPhotoRequests[requestKey];
	}

	/**
	 * Helper: Extracts JPEG/PNG data and Bounding Box from raw photo payload.
	 * Handles GZIP decompression and inner header stripping.
	 */
	public async extractPhotoData(rawPayload: Buffer): Promise<{ photo: Buffer; bbox: any | null }> {
		if (rawPayload.length < 8) throw new Error("Payload too short");

		let workingBuf = rawPayload;
		let bbox = null;

		if (workingBuf.length > 2 && workingBuf[0] === 0x1f && workingBuf[1] === 0x8b) {
			try {
				workingBuf = (await unzipAsync(workingBuf)) as unknown as Buffer;
			} catch (e: any) {
				throw new Error(`GZIP decompression failed: ${e.message}`);
			}
		}

		const startsWithJpeg = workingBuf.length >= 2 && workingBuf[0] === 0xff && workingBuf[1] === 0xd8;
		const startsWithPng = workingBuf.length >= 4 && workingBuf[0] === 0x89 && workingBuf[1] === 0x50 && workingBuf[2] === 0x4e && workingBuf[3] === 0x47;

		if (startsWithJpeg || startsWithPng) {
			return { photo: workingBuf, bbox: null };
		}

		try {
			const innerHeader = v1PhotoInnerHeaderParser.parse(workingBuf);
			let strippedData = workingBuf;

			if (innerHeader.headerLength > 0 && innerHeader.headerLength < workingBuf.length) {
				strippedData = workingBuf.subarray(innerHeader.headerLength);
				bbox = this.parseProprietaryHeader(workingBuf, innerHeader.type);
			}

			const isJpeg = strippedData.length >= 2 && strippedData[0] === 0xff && strippedData[1] === 0xd8;
			const isPng = strippedData.length >= 4 && strippedData[0] === 0x89 && strippedData[1] === 0x50 && strippedData[2] === 0x4e && strippedData[3] === 0x47;

			if (isJpeg || isPng) {
				return { photo: strippedData, bbox };
			} else {
				const found = this.findImageInBuffer(workingBuf);
				return { photo: found || strippedData, bbox };
			}
		} catch {
			const found = this.findImageInBuffer(workingBuf);
			return { photo: found || workingBuf, bbox: null };
		}
	}

	private findImageInBuffer(buf: Buffer): Buffer | null {
		const jpegOffset = buf.indexOf(Buffer.from([0xff, 0xd8]));
		const pngOffset = buf.indexOf(Buffer.from([0x89, 0x50, 0x4e, 0x47]));

		if (jpegOffset !== -1 && (pngOffset === -1 || jpegOffset < pngOffset)) {
			return buf.subarray(jpegOffset);
		}
		if (pngOffset !== -1) {
			return buf.subarray(pngOffset);
		}
		return null;
	}

	public clearIntervals(): void {
		this.pendingPhotoRequests = {};
		if (this.photoCleanupInterval) {
			this.adapter.clearInterval(this.photoCleanupInterval);
			this.photoCleanupInterval = undefined;
		}
	}

	private parseProprietaryHeader(buf: Buffer, type: number): any | null {
		if (type !== 4 || buf.length < 36) return null;

		try {
			const extraHeader = v1PhotoProprietaryHeaderParser.parse(buf.subarray(8, 36));
			const isValidWidth = extraHeader.width > 300 && extraHeader.width < 10000;

			if (isValidWidth) {
				return {
					imageWidth: extraHeader.width,
					imageHeight: extraHeader.height,
					classId: extraHeader.classId,
					instanceId: extraHeader.instanceId,
					x: extraHeader.x1,
					y: extraHeader.y1,
					w: extraHeader.x2 - extraHeader.x1,
					h: extraHeader.y2 - extraHeader.y1
				};
			}
		} catch {
			// Ignore parsing errors
		}
		return null;
	}
}
