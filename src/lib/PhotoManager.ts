import { Parser } from "binary-parser";
import { promisify } from "util";
import * as zlib from "zlib";
import type { Roborock } from "../main";

const unzipAsync = promisify(zlib.unzip);

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
	totalChunks?: number;
	totalSize?: number;
	lastUpdateTime: number;
	extracted?: { photo: Buffer; bbox: any | null };
}

export class PhotoManager {
	private adapter: Roborock;
	private pendingPhotoRequests: Record<string, PhotoRequestData> = {};
	private pendingRawRequest: { duid: string, photoId: number } | null = null;
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

	public getPendingRawRequest(): { duid: string, photoId: number } | null {
		return this.pendingRawRequest;
	}

	public setPendingRawRequest(request: { duid: string, photoId: number } | null): void {
		this.pendingRawRequest = request;
	}

	/**
	 * Dedicated handler for Protocol 300 (Initial Photo Chunk).
	 * Returns true if the packet was identified as a photo.
	 */
	public async handlePhotoProtocol300(duid: string, payloadBuf: Buffer, isRoborockHeader: boolean): Promise<boolean> {
		if (!isRoborockHeader || payloadBuf.length < 16) return false;

		try {
			const photoId = payloadBuf.readUInt16LE(12);
			const totalChunks = payloadBuf.readUInt16LE(14);

			let pendingReqId = photoId;
			// Fallback match for Task IDs
			if (!this.adapter.pendingRequests.has(pendingReqId as any)) {
				for (const [id, req] of this.adapter.pendingRequests) {
					if (req.method === "get_photo" && req.duid === duid) {
						if (req.params && req.params.data_filter && req.params.data_filter.type === 0) {
							pendingReqId = id;
							break;
						}
					}
				}
			}

			const requestKey = `${duid}_${photoId}`;
			if (this.adapter.pendingRequests.has(pendingReqId as any)) {
				const totalSize = payloadBuf.length >= 24 ? payloadBuf.readUInt32LE(20) : 0;
				this.adapter.rLog("MQTT", duid, "Info", "300", pendingReqId, `[Photo] Metadata (300). ID: ${photoId} (Task: ${pendingReqId}, Target Size: ${totalSize})`, "debug");

				const firstChunk = payloadBuf.length > 56 ? payloadBuf.subarray(56) : Buffer.alloc(0);
				this.pendingPhotoRequests[requestKey] = {
					id: pendingReqId as number,
					chunks: { [0]: firstChunk },
					totalChunks: totalChunks,
					totalSize: totalSize,
					lastUpdateTime: Date.now()
				};

				// Special matching for Type 0 (Large Photo) which reports Chunks: 0 and sends raw 301 stream
				if (totalChunks === 0) {
					this.pendingRawRequest = { duid, photoId };
				}

				// Check for completion immediately (relevant for single-packet photos where size is known)
				if (await this.isPhotoComplete(this.pendingPhotoRequests[requestKey], duid, photoId)) {
					await this.processAndResolvePhoto(this.pendingPhotoRequests[requestKey], duid, requestKey, 300);
				}
				return true;
			}
		} catch (e: any) {
			this.adapter.rLog("MQTT", duid, "Error", "300", undefined, `[Photo] Header parse failed: ${e.message}`, "error");
		}
		return false;
	}

	/**
	 * Dedicated handler for Protocol 301 (Subsequent Photo Chunks).
	 * Returns true if the packet was identified and handled as a photo.
	 */
	public async handlePhotoProtocol301(duid: string, payloadBuf: Buffer, isRoborockHeader: boolean): Promise<boolean> {
		let photoId = -1;
		let sequence = -1;
		let dataSkip = 24;
		let isKnownPhoto = false;
		let extractedTotalSize = 0;

		try {
			if (isRoborockHeader && payloadBuf.length >= 24) {
				photoId = payloadBuf.readUInt16LE(12);
				sequence = payloadBuf.readUInt16LE(18);
				extractedTotalSize = payloadBuf.readUInt32LE(20);
				dataSkip = 56;
				isKnownPhoto = true;
			} else if (isRoborockHeader) {
				this.adapter.rLog("MQTT", duid, "Warn", "301", undefined, `Photo packet with ROBOROCK header too short: ${payloadBuf.length}b`, "warn");
				return true;
			} else {
				// Non-standard header (likely Raw Stream for Type 0)
				if (this.pendingRawRequest && this.pendingRawRequest.duid === duid) {
					photoId = this.pendingRawRequest.photoId;
					const reqKey = `${duid}_${photoId}`;
					const existing = this.pendingPhotoRequests[reqKey];
					sequence = existing ? Object.keys(existing.chunks).length + 1 : 1;
					dataSkip = 0; // No header, raw data
					isKnownPhoto = true;
				}
			}

			if (!isKnownPhoto) return false;

			const requestKey = `${duid}_${photoId}`;
			let photoData = this.pendingPhotoRequests[requestKey];

			// Robust Initialization: Initialize if missing, regardless of sequence
			if (!photoData) {
				let reqId = photoId;
				if (!this.adapter.pendingRequests.has(reqId)) {
					for (const [id, req] of this.adapter.pendingRequests.entries()) {
						if (req.method === "get_photo" && req.duid === duid) {
							reqId = id;
							break;
						}
					}
				}
				this.pendingPhotoRequests[requestKey] = {
					id: reqId,
					chunks: {},
					totalSize: extractedTotalSize,
					lastUpdateTime: Date.now()
				};
				photoData = this.pendingPhotoRequests[requestKey];
			}

			if (photoData) {
				if (extractedTotalSize > 0 && !photoData.totalSize) {
					photoData.totalSize = extractedTotalSize;
				}

				const chunkData = payloadBuf.length > dataSkip ? payloadBuf.subarray(dataSkip) : Buffer.alloc(0);
				photoData.chunks[sequence - 1] = chunkData;
				photoData.lastUpdateTime = Date.now();

				this.adapter.rLog("MQTT", duid, "Info", "301", photoId, `[Photo] Chunk Seq: ${sequence}. Size: ${payloadBuf.length}. Skip: ${dataSkip}. Target: ${photoData.totalSize}`, "debug");

				if (await this.isPhotoComplete(photoData, duid, photoId)) {
					await this.processAndResolvePhoto(photoData, duid, requestKey, 301);
				}
				return true;
			}
		} catch (e: any) {
			this.adapter.rLog("MQTT", duid, "Error", "301", undefined, `Protocol 301 photo reassembly error: ${e.message}`, "error");
			return true;
		}

		return false;
	}

	/**
	 * Shared logic to determine if all chunks for a photo have been received.
	 * Unified version: Relies solely on totalSize matching the accumulated chunks.
	 */
	private async isPhotoComplete(photoData: PhotoRequestData, duid: string, photoId: number): Promise<boolean> {
		if (!photoData.totalSize || photoData.totalSize === 0) return false;

		const keys = Object.keys(photoData.chunks).map(Number);
		const currentSize = keys.reduce((sum, k) => sum + photoData.chunks[k].length, 0);

		this.adapter.rLog("MQTT", duid, "Debug", "PHOTO", photoId, `[Photo] Progress: ${currentSize} / ${photoData.totalSize} bytes`, "debug");

		if (currentSize === photoData.totalSize) {
			this.adapter.rLog("MQTT", duid, "Info", "PHOTO", photoId, `[Photo] All chunks received. Total Size: ${currentSize}`, "debug");
			return true;
		}

		if (currentSize > photoData.totalSize) {
			this.adapter.rLog("MQTT", duid, "Warn", "PHOTO", photoId, `[Photo] Received more data than expected! Current: ${currentSize}, Total: ${photoData.totalSize}`, "warn");
			return true; // Consider complete but warn
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
				const extracted = await this.extractPhotoData(totalBuffer, duid, `${photoData.id}`);
				finalPhotoBuf = extracted.photo;
				bbox = extracted.bbox;
			}

			if (finalPhotoBuf && finalPhotoBuf.length > 0) {
				this.adapter.requestsHandler.resolvePendingRequest(photoData.id, { buffer: finalPhotoBuf, bbox }, protocol.toString(), duid, "MQTT");

				if (this.pendingRawRequest && this.pendingRawRequest.photoId === photoData.id) {
					this.pendingRawRequest = null;
				}
			}
		} catch (err: any) {
			this.adapter.rLog("MQTT", duid, "Error", protocol.toString(), photoData.id, `Failed to reassemble/extract photo: ${err.message}`, "error");
		}

		delete this.pendingPhotoRequests[requestKey];
	}

	/**
	 * Helper: Extracts JPEG/PNG data and Bounding Box from raw photo payload.
	 * Handles GZIP decompression and inner header stripping.
	 */
	public async extractPhotoData(rawPayload: Buffer, duid: string, logId: string): Promise<{ photo: Buffer; bbox: any | null }> {
		if (rawPayload.length < 8) {
			throw new Error("Payload too short for extraction");
		}
		this.adapter.rLog("MQTT", duid, "Debug", logId, undefined, `[Photo] Extracting photo data`, "debug");
		let workingBuf = rawPayload;
		let bbox = null;

		if (workingBuf.length > 2 && workingBuf[0] === 0x1f && workingBuf[1] === 0x8b) {
			try {
				workingBuf = (await unzipAsync(workingBuf)) as Buffer;
			} catch (e: any) {
				throw new Error(`GZIP decompression failed: ${e.message}`);
			}
		}

		const startsWithJpeg = workingBuf.length >= 2 && workingBuf[0] === 0xff && workingBuf[1] === 0xd8;
		const startsWithPng = workingBuf.length >= 4 && workingBuf[0] === 0x89 && workingBuf[1] === 0x50 && workingBuf[2] === 0x4e && workingBuf[3] === 0x47;

		if (startsWithJpeg || startsWithPng) {
			this.adapter.rLog("MQTT", duid, "Debug", logId, undefined, `[Photo] Valid image magic found at start. Skipping header stripping.`, "debug");
			return { photo: workingBuf, bbox: null };
		}

		try {
			if (workingBuf.length < 8) {
				throw new Error(`Buffer too small for V1 Inner Header (${workingBuf.length}b)`);
			}
			const innerHeader = v1PhotoInnerHeaderParser.parse(workingBuf);
			let strippedData = workingBuf;

			if (innerHeader.headerLength > 0 && innerHeader.headerLength < workingBuf.length) {
				strippedData = workingBuf.subarray(innerHeader.headerLength);

				if (innerHeader.type === 4 && workingBuf.length >= 36) {
					try {
						const extraHeader = v1PhotoProprietaryHeaderParser.parse(workingBuf.subarray(8, 36));
						if (extraHeader.width > 300 && extraHeader.width < 10000) {
							bbox = {
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
					} catch {}
				}
			}

			const isJpeg = strippedData.length >= 2 && strippedData[0] === 0xff && strippedData[1] === 0xd8;
			const isPng = strippedData.length >= 2 && strippedData[0] === 0x89 && strippedData[1] === 0x50;

			if (isJpeg || isPng) {
				return { photo: strippedData, bbox };
			} else {
				const found = this.findImageInBuffer(workingBuf);
				return { photo: found || strippedData, bbox };
			}
		} catch (e: any) {
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
}
