/**
 * Q10 (ss09 / YxMap) real-time map format.
 * App plugin: parserPublicRealTimeMap – header 28 bytes (version, mapId, type, width, height, ox, oy, resolution, charge*, pixLen, pixLzLen), then raw or LZ4 pixels.
 * Version 1: 1 byte per pixel, high 6 bits = room ID (0–31), low 2 bits = type (0=floor, 1=wall, 3=outWall).
 */
import type { B01MapData, B01Area, B01Carpet, B01EntityPosition, B01PathPoint, B01Point } from "../b01/types";
import type {
	Q10DevicePoint,
	Q10RuntimeStatePatch,
	Q10SourceArea,
	Q10SourceData,
	Q10SourcePathPoint,
	Q10SourceRoom,
	Q10SourceSuspectedPoint
} from "./types";

const Q10_HEADER_LEN = 28;

function readU16BE(buf: Buffer, offset: number): number {
	return buf.readUInt16BE(offset);
}
function readU16LE(buf: Buffer, offset: number): number {
	return buf.readUInt16LE(offset);
}
function readU32BE(buf: Buffer, offset: number): number {
	return buf.readUInt32BE(offset);
}
/** JX byteArrToPointArr / parserObstacle / parserSkipClean: DataView.getInt16 ohne littleEndian → big-endian. */
function readI16BE(buf: Buffer, offset: number): number {
	return buf.readInt16BE(offset);
}

const MAX_MAP_PIXELS = 2000 * 2000; // sanity cap
const Q10_COMPAT_FALLBACKS_ENABLED = process.env.ROBOROCK_Q10_COMPAT_FALLBACKS === "1";

interface Q10RoomModel {
	roomID: number;
	roomType: number;
	roomMaterial: number;
	roomNameDataStr: string;
	cleanOrder: number;
	cleanCount: number;
	funLevel: number;
	waterLevel: number;
	cleanType: number;
	cleanLine: number;
}

function u8ToHex(arr: Uint8Array): string {
	return Buffer.from(arr).toString("hex");
}

function fixLikelyUtf8Mojibake(value: string): string {
	if (!value || !/[ÃÂÐ]/u.test(value)) return value;
	try {
		const repaired = Buffer.from(value, "latin1").toString("utf8").replace(/\0+$/g, "").trim();
		return repaired || value;
	} catch {
		return value;
	}
}

function decodeRoomNameFromRaw(raw: Uint8Array): string {
	// Original Q10 app/plugin decodes roomNameDataStr directly from the raw byte field.
	// The first byte usually contains the string length; the app retries with shorter
	// lengths until a non-empty string can be decoded.
	try {
		let len = raw.length > 0 ? raw[0] : 0;
		while (len > 0 && len <= 19 && raw.length >= 1 + len) {
			const decoded = fixLikelyUtf8Mojibake(Buffer.from(raw.slice(1, 1 + len)).toString("utf8").replace(/\0+$/g, "").trim());
			if (decoded) return decoded;
			len -= 1;
		}
		return "";
	} catch {
		return "";
	}
}

/** JX parserRoomData1 port: parse room properties block right after pix area for v1/v2/v3. */
function parseRoomData1(data: Buffer): Q10RoomModel[] {
	const roomModels: Q10RoomModel[] = [];
	if (!data || data.length < 2) return roomModels;
	let pos = 0;
	pos += 1; // region_id (unused)
	const regionNum = data[pos];
	pos += 1;
	if (data.length < 2 + regionNum * (26 + 20 + 1)) return roomModels;

	for (let i = 0; i < regionNum; i++) {
		if (pos + 26 > data.length) break;
		const props = data.subarray(pos, pos + 26);
		let p = 0;
		const roomID = props.readUInt16BE(p);
		p += 2;
		const roomType = props[p];
		p += 1;
		let cleanOrder = props.readUInt16BE(p);
		p += 2;
		if (cleanOrder === 0xffff) cleanOrder = -1;
		const cleanCount = props.readUInt16BE(p);
		p += 2;
		let cleanType = props[p];
		p += 1;
		if (cleanType === 0xff) cleanType = -1;
		let funLevel = props[p];
		p += 1;
		if (funLevel === 0xff) funLevel = -1;
		let waterLevel = props[p];
		p += 1;
		if (waterLevel === 0xff) waterLevel = -1;
		const roomMaterial = props[p];
		p += 1;
		let cleanLine = props[p];
		p += 1;
		if (cleanLine < 0 || cleanLine > 2) cleanLine = 0;
		pos += 26;

		if (pos + 20 > data.length) break;
		const roomNameData = new Uint8Array(data.subarray(pos, pos + 20));
		pos += 20;

		if (pos + 1 > data.length) break;
		const verticesNum = data[pos];
		pos += 1;
		const verticesBytes = verticesNum * 2 * 2;
		if (pos + verticesBytes > data.length) break;
		pos += verticesBytes; // vertices not used in current renderer

		roomModels.push({
			roomID,
			roomType,
			roomMaterial,
			roomNameDataStr: u8ToHex(roomNameData),
			cleanOrder,
			cleanCount,
			funLevel,
			waterLevel,
			cleanType,
			cleanLine
		});
	}
	return roomModels;
}

/** Returns width×height = pixLen with a plausible aspect (prefer width ≥ height). Used when header dimensions are wrong (e.g. 4439×1). */
function factorPairForPixelCount(pixLen: number): { width: number; height: number } | null {
	if (pixLen <= 0 || pixLen > MAX_MAP_PIXELS) return null;
	const sqrt = Math.sqrt(pixLen);
	for (let h = Math.max(1, Math.floor(sqrt) - 10); h <= Math.min(pixLen, Math.ceil(sqrt) + 10); h++) {
		if (pixLen % h !== 0) continue;
		const w = pixLen / h;
		if (w > 0 && w <= 2000 && h <= 2000) return { width: w, height: h };
	}
	// fallback: try small factors
	for (let h = 1; h <= Math.min(100, pixLen); h++) {
		if (pixLen % h !== 0) continue;
		const w = pixLen / h;
		if (w <= 2000 && h <= 2000) return { width: w, height: h };
	}
	return null;
}

/** Prefer near-square dimensions for room maps when exact factor pair is too strip-like (e.g. 503×7). Returns width×height >= pixLen. */
function nearSquareDimensions(pixLen: number): { width: number; height: number } {
	const h = Math.max(1, Math.ceil(Math.sqrt(pixLen)));
	const w = Math.ceil(pixLen / h);
	return { width: Math.min(w, 2000), height: Math.min(h, 2000) };
}

/** Decompress LZ4 block without optional native dependencies. */
function tryDecompressQ10Lz4Block(compressed: Uint8Array, expectedSize: number, reasonOut?: { reason: string }): Buffer | null {
	const input = Buffer.isBuffer(compressed) ? compressed : Buffer.from(compressed);
	const output = Buffer.alloc(expectedSize);
	const minMatch = 4;
	const canFast = typeof output.copyWithin === "function" && typeof output.fill === "function";
	let inPos = 0;
	let outPos = 0;

	try {
		while (inPos < input.length) {
			const token = input[inPos++];
			let literalLength = token >> 4;

			if (literalLength === 0x0f) {
				while (inPos < input.length) {
					const extension = input[inPos++];
					literalLength += extension;
					if (extension !== 0xff) break;
				}
			}

			if (inPos + literalLength > input.length || outPos + literalLength > output.length) {
				if (reasonOut) reasonOut.reason = "invalid literal block";
				return null;
			}

			input.copy(output, outPos, inPos, inPos + literalLength);
			inPos += literalLength;
			outPos += literalLength;

			if (inPos >= input.length) break;
			if (inPos + 2 > input.length) {
				if (reasonOut) reasonOut.reason = "invalid match offset";
				return null;
			}

			let matchLength = token & 0x0f;
			const matchOffset = input[inPos++] | (input[inPos++] << 8);
			if (matchOffset <= 0 || matchOffset > outPos) {
				if (reasonOut) reasonOut.reason = "invalid match distance";
				return null;
			}

			if (matchLength === 0x0f) {
				while (inPos < input.length) {
					const extension = input[inPos++];
					matchLength += extension;
					if (extension !== 0xff) break;
				}
			}
			matchLength += minMatch;

			if (outPos + matchLength > output.length) {
				if (reasonOut) reasonOut.reason = "invalid match length";
				return null;
			}

			if (canFast && matchOffset === 1) {
				output.fill(output[outPos - 1] | 0, outPos, outPos + matchLength);
				outPos += matchLength;
				continue;
			}

			if (canFast && matchOffset > matchLength && matchLength > 31) {
				output.copyWithin(outPos, outPos - matchOffset, outPos - matchOffset + matchLength);
				outPos += matchLength;
				continue;
			}

			let copyPos = outPos - matchOffset;
			const copyEnd = copyPos + matchLength;
			while (copyPos < copyEnd) {
				output[outPos++] = output[copyPos++] | 0;
			}
		}

		return output;
	} catch (e: any) {
		if (reasonOut) reasonOut.reason = e?.message || "decodeBlock threw";
		return null;
	}
}

export function decompressQ10Lz4Block(compressed: Uint8Array, expectedSize: number): Buffer {
	const reasonOut = { reason: "unknown error" };
	const decompressed = tryDecompressQ10Lz4Block(compressed, expectedSize, reasonOut);
	if (!decompressed) {
		throw new Error(`Invalid Q10 LZ4 block: ${reasonOut.reason}`);
	}
	return decompressed;
}

/**
 * Canonical Q10 map header layout from the original app:
 * 0 version, 1-4 mapId, 5 type, 6-7 width, 8-9 height, 10-13 ox/oy,
 * 14-15 resolution, 16-21 charge*, 22-25 pixLen, 26-27 pixLzLen.
 *
 * The original parser reads multi-byte fields big-endian. Additional header
 * candidates are retained only for explicit compatibility mode.
 */
interface Q10Header {
	version: number;
	mapId: number;
	mapWidth: number;
	mapHeight: number;
	pixLen: number;
	pixLzLen: number;
	mapOx: number;
	mapOy: number;
	mapResolution: number;
	chargeX: number;
	chargeY: number;
	chargerDirection: number;
	offset: number;
}

function parseQ10HeaderAt(buf: Buffer, offset: number, heightEndian: "le" | "be"): Q10Header {
	if (buf.length < offset + Q10_HEADER_LEN) throw new Error("YxMap buffer too short");
	const version = buf[offset];
	const mapWidth = readU16BE(buf, offset + 6);
	const mapHeight = heightEndian === "be" ? readU16BE(buf, offset + 8) : readU16LE(buf, offset + 8);
	const chargeX = readU16BE(buf, offset + 16);
	const chargeY = readU16BE(buf, offset + 18);
	let chargerDirection = readU16BE(buf, offset + 20);
	if (chargerDirection === 0xffff) chargerDirection = 0;
	return {
		version,
		mapId: readU32BE(buf, offset + 1),
		mapWidth,
		mapHeight,
		pixLen: readU32BE(buf, offset + 22),
		pixLzLen: readU16BE(buf, offset + 26),
		mapOx: readU16BE(buf, offset + 10) / 10,
		mapOy: readU16BE(buf, offset + 12) / 10,
		mapResolution: readU16BE(buf, offset + 14) / 100,
		chargeX,
		chargeY,
		chargerDirection,
		offset
	};
}

function unwrapQ10OriginalMapPayload(buf: Buffer): Buffer | null {
	if (!buf || buf.length < Q10_HEADER_LEN) return null;

	if (
		buf.length >= 1 + Q10_HEADER_LEN &&
		(buf[0] === 1 || buf[0] === 3 || buf[0] === 4) &&
		buf[1] >= 0 &&
		buf[1] <= 3
	) {
		return buf.subarray(1);
	}

	if (buf[0] >= 0 && buf[0] <= 3) {
		return buf;
	}

	return null;
}

function isStrictOriginalHeader(hdr: Q10Header, totalLen: number): boolean {
	if (!hdr || hdr.version < 0 || hdr.version > 3) return false;
	if (hdr.mapWidth <= 0 || hdr.mapWidth > 4096) return false;
	if (hdr.mapHeight <= 0 || hdr.mapHeight > 4096) return false;
	if (hdr.mapWidth * hdr.mapHeight > MAX_MAP_PIXELS) return false;
	if (hdr.pixLen <= 0 || hdr.pixLen > MAX_MAP_PIXELS) return false;
	if (hdr.pixLzLen < 0) return false;
	if (hdr.mapResolution <= 0 || hdr.mapResolution > 1) return false;

	const pixelStart = hdr.offset + Q10_HEADER_LEN;
	if (pixelStart >= totalLen) return false;

	if (hdr.pixLzLen > 0) {
		return pixelStart + hdr.pixLzLen <= totalLen;
	}

	return pixelStart + hdr.pixLen <= totalLen;
}

function isPlausibleHeader(hdr: Q10Header, totalLen: number): boolean {
	if (!hdr || hdr.version < 0 || hdr.version > 3) return false;
	// Wie decode_q10_hex_to_png.js: innere Header (offset>0) dürfen kleinere Dim haben; pixLzLen>rem zulassen (Frames 9/10)
	const minDim = hdr.offset > 0 ? 2 : 16;
	if (hdr.mapWidth < minDim || hdr.mapWidth > 4096) return false;
	if (hdr.mapHeight < minDim || hdr.mapHeight > 4096) return false;
	if (hdr.pixLen <= 0 || hdr.pixLen > MAX_MAP_PIXELS) return false;
	const rem = totalLen - (hdr.offset + Q10_HEADER_LEN);
	if (rem <= 0) return false;
	if (hdr.pixLzLen < 0) return false;
	return true;
}

/** Build mapGrid from decompressed pixel buffer; version 0/1/2/3 (1 und 3 = gleiches Format). */
function buildGrid(hdr: Q10Header, src: Buffer): Buffer | null {
	const { version, mapWidth, mapHeight } = hdr;
	const size = mapWidth * mapHeight;
	if (size > MAX_MAP_PIXELS) return null;
	const mapGrid = Buffer.alloc(size);
	if (version === 0) {
		const pixByteCount = Math.floor(size / 4) + (size % 4 !== 0 ? 1 : 0);
		for (let i = 0; i < pixByteCount && i < src.length; i++) {
			const b = src[i];
			const p0 = (b & 0xc0) >> 6, p1 = (b & 0x30) >> 4, p2 = (b & 0x0c) >> 2, p3 = b & 0x03;
			const toVal = (p: number) => (p === 0 ? 1 : p === 1 ? 128 : 127);
			if (i * 4 < size) mapGrid[i * 4] = toVal(p0);
			if (i * 4 + 1 < size) mapGrid[i * 4 + 1] = toVal(p1);
			if (i * 4 + 2 < size) mapGrid[i * 4 + 2] = toVal(p2);
			if (i * 4 + 3 < size) mapGrid[i * 4 + 3] = toVal(p3);
		}
	} else if (version === 2) {
		// Floor material / room variant: roomID = (b & 0xf8) >> 3, low 3 bits = type
		for (let i = 0; i < src.length && i < size; i++) {
			const b = src[i];
			const roomID = (b & 0xf8) >> 3;
			const s = b & 0x07;
			if (roomID > 0 && roomID < 27) {
				mapGrid[i] = roomID + 1;
			} else {
				if (s === 0b000) mapGrid[i] = 0;
				else if (s === 0b001) mapGrid[i] = 128;
				else if (s === 0b010 || s === 0b111) mapGrid[i] = 1;
				else mapGrid[i] = 1;
			}
		}
	} else {
		// 1 und 3: gleiches Format (Partition, 1 Byte = 1 Pixel)
		for (let i = 0; i < src.length && i < size; i++) {
			const b = src[i];
			const roomID = (b & 0xfc) >> 2;
			const pointType = b & 0x03;
			if (roomID >= 1 && roomID <= 31) {
				mapGrid[i] = roomID + 1;
			} else {
				if (pointType === 0) mapGrid[i] = 1;
				else if (pointType === 1) mapGrid[i] = 128;
				else if (pointType === 3) mapGrid[i] = 127;
				else mapGrid[i] = 1;
			}
		}
	}
	return mapGrid;
}

function pixelDataLengthForVersion(version: number, mapWidth: number, mapHeight: number): number {
	if (version === 0) {
		let pix = Math.floor((mapWidth * mapHeight) / 4);
		if ((mapWidth * mapHeight) % 4 !== 0) pix += 1;
		return pix;
	}
	return mapWidth * mapHeight;
}

/** Try to decode one candidate: decompress from hdr.offset and build grid. */
function tryDecodeCandidate(buf: Buffer, hdr: Q10Header, compatFallbacks = false): B01MapData | null {
	const pixelStart = hdr.offset + Q10_HEADER_LEN;
	const actualPayloadLen = buf.length - pixelStart;
	let pixLen = hdr.pixLen;
	let pixLzLen = hdr.pixLzLen;
	let mapWidth = hdr.mapWidth;
	let mapHeight = hdr.mapHeight;

	// Compatibility mode only: recover malformed field captures we saw in older reverse-engineering samples.
	if (compatFallbacks && hdr.offset === 0 && actualPayloadLen >= 100 && actualPayloadLen <= 500000) {
		const expectedPixels = mapWidth * mapHeight;
		if (pixLen === 0 || pixLen > 500000 || (pixLzLen !== 0 && pixLen > 500000)) {
			pixLen = actualPayloadLen;
			pixLzLen = 0;
		} else if (
			pixLzLen > 0 &&
			pixLzLen > actualPayloadLen &&
			expectedPixels >= 100 &&
			expectedPixels <= MAX_MAP_PIXELS &&
			(pixLen !== expectedPixels || pixLen < 100)
		) {
			pixLen = expectedPixels;
			pixLzLen = actualPayloadLen;
		}
		// If dimensions still wrong (e.g. 1×124), try factor pair / near-square.
		if (mapWidth * mapHeight !== pixLen || mapHeight === 1 || mapWidth === 1) {
			const pair = factorPairForPixelCount(pixLen);
			const ratio = pair ? Math.max(pair.width / pair.height, pair.height / pair.width) : Infinity;
			if (pair && ratio <= 15) {
				mapWidth = pair.width;
				mapHeight = pair.height;
			} else {
				const ns = nearSquareDimensions(pixLen);
				mapWidth = ns.width;
				mapHeight = ns.height;
			}
		}
	}

	if (mapWidth === 0 || mapHeight === 0 || pixLen === 0) return null;
	if (mapWidth * mapHeight > MAX_MAP_PIXELS) return null;

	const actualCompressedLen = Math.min(pixLzLen, buf.length - pixelStart);
	let src: Buffer;
	if (pixLzLen !== 0 && actualCompressedLen > 0) {
		const compressed = buf.subarray(pixelStart, pixelStart + actualCompressedLen);
		const lz4Reason = { reason: "" };
		const decompressed = tryDecompressQ10Lz4Block(compressed, pixLen, lz4Reason);
		// Compatibility mode only: accept shortened decompressed payloads from malformed captures.
		if (compatFallbacks && decompressed && decompressed.length > 0 && decompressed.length !== pixLen && hdr.offset === 0) {
			const expectedPixels = mapWidth * mapHeight;
			if (decompressed.length < pixLen && expectedPixels >= 100 && decompressed.length <= MAX_MAP_PIXELS) {
				pixLen = decompressed.length;
				const n = pixLen;
				if (n % 124 === 0 && n / 124 <= 2000) {
					mapWidth = 124;
					mapHeight = n / 124;
				} else if (n % 256 === 0 && n / 256 <= 2000) {
					mapWidth = 256;
					mapHeight = n / 256;
				} else {
					const pair = factorPairForPixelCount(n);
					if (pair) {
						mapWidth = pair.width;
						mapHeight = pair.height;
					}
				}
			}
		}
		if (!decompressed || decompressed.length !== pixLen) return null;
		src = decompressed;
	} else {
		if (pixelStart + pixLen > buf.length) return null;
		src = buf.subarray(pixelStart, pixelStart + pixLen);
	}
	const size = mapWidth * mapHeight;
	let mapGrid = buildGrid(
		{ ...hdr, mapWidth, mapHeight, pixLen, pixLzLen },
		src
	);
	if (!mapGrid || mapGrid.length !== size) return null;
	// Compatibility mode only: recover obviously broken dimensions.
	if (compatFallbacks && src.length > 0 && src.length < 0.1 * size) {
		const n = src.length;
		let pair: { width: number; height: number } | null = null;
		if (n % 124 === 0 && n / 124 <= 2000) pair = { width: 124, height: n / 124 };
		else if (n % 256 === 0 && n / 256 <= 2000) pair = { width: 256, height: n / 256 };
		if (!pair) pair = factorPairForPixelCount(n);
		const ratio = pair ? Math.max(pair.width / pair.height, pair.height / pair.width) : Infinity;
		if (pair && ratio <= 15 && pair.width * pair.height === n) {
			const newGrid = buildGrid(
				{ ...hdr, mapWidth: pair.width, mapHeight: pair.height, pixLen: n, pixLzLen: hdr.pixLzLen },
				src
			);
			if (newGrid && newGrid.length === n) {
				mapWidth = pair.width;
				mapHeight = pair.height;
				pixLen = n;
				mapGrid = newGrid;
			}
		}
	}

	const mapResolution = hdr.mapResolution;
	const minX = hdr.mapOx;
	const maxY = hdr.mapOy;
	const minY = maxY - mapHeight * mapResolution;
	const maxX = minX + mapWidth * mapResolution;

	const q10SourceData: Q10SourceData = {
		version: hdr.version,
		mapId: hdr.mapId,
		mapWidth,
		mapHeight,
		mapRate: mapResolution > 0 ? 1 / mapResolution : 0,
		resolution: mapResolution,
		xMin: minX,
		yMin: maxY,
		rooms: [],
		eraseAreas: [],
		virtualWalls: [],
		forbidAreas: [],
		mopAreas: [],
		thresholdAreas: [],
		carpetAreas: [],
		pathPoints: [],
		obstacles: [],
		skipPoints: [],
		suspectedPoints: [],
		hasSelfIdentificationCarpet: false
	};

	const result: B01MapData = {
		sourceFormat: "q10-raw",
		header: {
			sizeX: mapWidth,
			sizeY: mapHeight,
			minX,
			minY,
			maxX,
			maxY,
			resolution: mapResolution
		},
		mapGrid,
		q10SourceData
	};

	// JX roomData1 is embedded after pixel area in decompressed payload for version != 0.
	if (hdr.version !== 0) {
		const pixDataLen = pixelDataLengthForVersion(hdr.version, mapWidth, mapHeight);
		if (pixDataLen > 0 && pixDataLen < src.length) {
			const roomData = src.subarray(pixDataLen, pixLen);
			const roomModels = parseRoomData1(roomData);
			if (roomModels.length) {
				q10SourceData.rooms = roomModels.map((rm): Q10SourceRoom => ({
					roomID: rm.roomID,
					roomName: decodeRoomNameFromRaw(Buffer.from(rm.roomNameDataStr, "hex")),
					roomNameDataStr: rm.roomNameDataStr,
					roomType: rm.roomType,
					roomMaterial: rm.roomMaterial,
					cleanOrder: rm.cleanOrder,
					cleanCount: rm.cleanCount,
					funLevel: rm.funLevel,
					waterLevel: rm.waterLevel,
					cleanType: rm.cleanType,
					cleanLine: rm.cleanLine
				}));
				result.rooms = roomModels.map((rm) => ({
					roomId: rm.roomID,
					roomName: decodeRoomNameFromRaw(Buffer.from(rm.roomNameDataStr, "hex")),
					roomTypeId: rm.roomType,
					gridValue: rm.roomID + 1,
					cleanOrder: rm.cleanOrder,
					cleanCount: rm.cleanCount,
					cleanType: rm.cleanType,
					funLevel: rm.funLevel,
					waterLevel: rm.waterLevel,
					material: rm.roomMaterial,
					cleanLine: rm.cleanLine
				}));
			}
		}
	}

	// module_973 / module_951:
	// chargePosition stays in device coordinates (relative to x_min/y_min), while the
	// shared B01 fields keep world coordinates for robotToPixel compatibility.
	if (
		(hdr.chargeX !== 0 || hdr.chargeY !== 0) &&
		hdr.chargeX !== 0xffff &&
		hdr.chargeY !== 0xffff
	) {
		const chargeDevicePoint = {
			x: hdr.chargeX / 10 - hdr.mapOx,
			y: hdr.mapOy - hdr.chargeY / 10,
			phi: -hdr.chargerDirection
		};
		q10SourceData.chargePosition = chargeDevicePoint;
		result.chargerPos = {
			x: hdr.chargeX / 10,
			y: hdr.chargeY / 10,
			phi: -hdr.chargerDirection
		};
	}

	// Trailing blocks after pixel data (erases, carpet, obstacle, skipClean)
	const payloadEnd = pixelStart + (pixLzLen !== 0 && actualCompressedLen > 0 ? actualCompressedLen : pixLen);
	if (payloadEnd < buf.length) {
		try {
			const trailing = parseQ10TrailingBlocks(buf, payloadEnd, hdr.mapOx, hdr.mapOy);
			// 抹除区域 → wie App „Forbidden“ (rot); robotToPixel erwartet Weltkoordinaten (wie chargerPos)
			if (trailing.eraseAreas?.length) {
				q10SourceData.eraseAreas = trailing.eraseAreas;
				result.recmForbitZone = trailing.eraseAreas.map((area) => q10DeviceAreaToWorld(minX, maxY, area));
			}
			if (trailing.obstaclePoints?.length) {
				q10SourceData.obstacles = trailing.obstaclePoints.map((point) => ({ point, type: "obstacle" as const }));
				result.obstaclePoints = trailing.obstaclePoints.map((point) => q10DevicePointToWorld(minX, maxY, point));
			}
			if (trailing.skipCleanPoints?.length) {
				q10SourceData.skipPoints = trailing.skipCleanPoints.map((point) => ({ point, type: "skip" as const }));
				result.skipCleanPoints = trailing.skipCleanPoints.map((point) => q10DevicePointToWorld(minX, maxY, point));
			}
			if (trailing.carpetGrid) {
				q10SourceData.carpetGrid = trailing.carpetGrid;
				q10SourceData.hasSelfIdentificationCarpet = true;
				result.carpetGrid = trailing.carpetGrid;
			}

			q10SourceData.dataReadIdx = trailing.nextOffset;

			const editTail = parseQ10EditTailSections(buf, trailing.nextOffset, hdr.mapOx, hdr.mapOy);
			if (editTail.pathPoints.length) {
				q10SourceData.pathPoints = editTail.pathPoints;
				result.history = editTail.pathPoints.map((point) => ({
					x: q10DevicePointToWorld(minX, maxY, point).x,
					y: q10DevicePointToWorld(minX, maxY, point).y,
					update: point.update
				}));
				if (editTail.pathPoints.length >= 2) {
					const previous = editTail.pathPoints[editTail.pathPoints.length - 2];
					const current = editTail.pathPoints[editTail.pathPoints.length - 1];
					const heading = (Math.atan2(20, 0) - Math.atan2(current.x - previous.x, current.y - previous.y)) * 180 / Math.PI;
					q10SourceData.robotPosition = { x: current.x, y: current.y, phi: heading };
					result.robotPos = { ...q10DevicePointToWorld(minX, maxY, current), phi: heading };
				}
			}
			if (editTail.virtualWalls.length) {
				q10SourceData.virtualWalls = editTail.virtualWalls;
				result.virtualWalls = editTail.virtualWalls.map((area) => q10DeviceAreaToWorld(minX, maxY, area));
			}
			if (editTail.forbidAreas.length) {
				q10SourceData.forbidAreas = editTail.forbidAreas;
				const forbidWorld = editTail.forbidAreas.map((area) => q10DeviceAreaToWorld(minX, maxY, area));
				result.virtualWalls = [...(result.virtualWalls ?? []), ...forbidWorld];
			}
			if (editTail.mopZones.length) {
				q10SourceData.mopAreas = editTail.mopZones;
				result.areasInfo = editTail.mopZones.map((area) => q10DeviceAreaToWorld(minX, maxY, area));
			}
			if (editTail.thresholdZones.length) {
				q10SourceData.thresholdAreas = editTail.thresholdZones;
				const thresholdWorld = editTail.thresholdZones.map((area) => q10DeviceAreaToWorld(minX, maxY, area));
				result.recmForbitZone = [...(result.recmForbitZone ?? []), ...thresholdWorld];
			}
			if (editTail.carpetAreas.length) {
				q10SourceData.carpetAreas = editTail.carpetAreas;
				result.carpetInfo = editTail.carpetAreas.map((area) => q10DeviceCarpetToWorld(minX, maxY, area));
			}
		} catch {
			// Optional tail sections vary across firmware revisions.
			// Keep the decoded raster/map usable even if a trailing edit block is malformed.
			q10SourceData.dataReadIdx = payloadEnd;
		}
	}

	result.q10RawOverlayCounts = {
		virtualWalls: q10SourceData.virtualWalls.length,
		forbidAreas: q10SourceData.forbidAreas.length,
		mopAreas: q10SourceData.mopAreas.length,
		thresholdAreas: q10SourceData.thresholdAreas.length,
		eraseAreas: q10SourceData.eraseAreas.length,
		carpetAreas: q10SourceData.carpetAreas.length
	};

	result.q10SourceData = q10SourceData;

	const overlayFields = rebuildQ10OverlayFields(result, q10SourceData);
	result.virtualWalls = overlayFields.virtualWalls;
	result.areasInfo = overlayFields.areasInfo;
	result.recmForbitZone = overlayFields.recmForbitZone;
	result.carpetInfo = overlayFields.carpetInfo;

	return result;
}

/** Scan buffer for inner YxMap block (container frames: map at offset 1, 2, ...). */
function findInnerMapCandidate(buf: Buffer): B01MapData | null {
	const endianModes: Array<"le" | "be"> = ["le", "be"];
	let best: { mapData: B01MapData; score: number } | null = null;
	for (let offset = 0; offset <= buf.length - Q10_HEADER_LEN; offset++) {
		for (const heightEndian of endianModes) {
			const decoded = tryDecodeHeaderCandidate(buf, offset, heightEndian);
			if (!decoded) continue;
			if (!best || decoded.score > best.score) {
				best = decoded;
			}
		}
	}
	return best?.mapData ?? null;
}

/** Trailing blocks after pixel data (app order: erasesArea, carpet, obstacle, skipClean). */
interface Q10Trailing {
	eraseAreas?: Q10SourceArea[];
	obstaclePoints?: Q10DevicePoint[];
	skipCleanPoints?: Q10DevicePoint[];
	carpetGrid?: Buffer;
	nextOffset: number;
}

interface Q10EditTailSections {
	pathPoints: Q10SourcePathPoint[];
	virtualWalls: Q10SourceArea[];
	forbidAreas: Q10SourceArea[];
	mopZones: Q10SourceArea[];
	thresholdZones: Q10SourceArea[];
	carpetAreas: Q10SourceArea[];
}

const MAX_Q10_PATH_POINTS = 100_000;

function q10DevicePoint(dx: number, dy: number): Q10DevicePoint {
	return {
		x: dx,
		y: dy
	};
}

function q10PathTypeToHistoryUpdate(type: number | undefined): number {
	if (type === 0) return 6;
	if (type === 1) return 4;
	if (type === 2 || type === 4) return 5;
	return 0;
}

function byte2ToShortBE(high: number, low: number): number {
	const bytes = Buffer.from([high & 0xff, low & 0xff]);
	return bytes.readInt16BE(0);
}

function yxPathRleDecompress(compressed: Buffer, compressedLen: number, outLen: number): Buffer {
	const inputLen = Math.min(compressedLen >>> 0, compressed.length);
	const output = Buffer.alloc(outLen);
	const matchMinLength = 4;
	let inPos = 0;
	let outPos = 0;
	const canFast = typeof output.copyWithin === "function" && typeof output.fill === "function";

	while (inPos < inputLen) {
		const token = compressed[inPos++];
		let literalLength = token >> 4;
		if (literalLength > 0) {
			if (literalLength === 15) {
				do {
					literalLength += compressed[inPos];
				} while (compressed[inPos++] === 255);
			}
			const literalEnd = inPos + literalLength;
			while (inPos < literalEnd) output[outPos++] = compressed[inPos++];
		}
		if (inPos >= inputLen) break;

		let matchLength = token & 15;
		const offset = compressed[inPos++] | (compressed[inPos++] << 8);
		if (matchLength === 15) {
			do {
				matchLength += compressed[inPos];
			} while (compressed[inPos++] === 255);
		}
		matchLength += matchMinLength;

		if (canFast && offset === 1) {
			output.fill(output[outPos - 1] | 0, outPos, outPos + matchLength);
			outPos += matchLength;
		} else if (canFast && offset > matchLength && matchLength > 31) {
			output.copyWithin(outPos, outPos - offset, outPos - offset + matchLength);
			outPos += matchLength;
		} else {
			let srcPos = outPos - offset;
			const srcEnd = srcPos + matchLength;
			while (srcPos < srcEnd) output[outPos++] = output[srcPos++] | 0;
		}
	}

	return output;
}

function parseQ10PathBlock(
	buf: Buffer,
	offset: number
): { points: Q10SourcePathPoint[]; nextOffset: number } | null {
	try {
		const payloadLen = getQ10PathPayloadLengthAt(buf, offset);
		if (payloadLen === 0 || offset + 13 > buf.length) return null;

		let pos = offset;
		const pathVersion = buf[pos];
		pos += 1;
		pos += 2;
		pos += 1;
		const pathMode = buf[pos];
		pos += 1;
		const pointCount = readU32BE(buf, pos);
		pos += 4;
		pos += 2;
		const compressedLen = readU16BE(buf, pos);
		pos += 2;

		if (pointCount > MAX_Q10_PATH_POINTS) return null;

		const rawPointBytes = pointCount * 4;
		let payload: Buffer;
		if (compressedLen === 0) {
			if (pos + rawPointBytes > buf.length) return null;
			payload = buf.subarray(pos, pos + rawPointBytes);
		} else {
			if (pos + compressedLen > buf.length) return null;
			payload = yxPathRleDecompress(buf.subarray(pos, pos + compressedLen), compressedLen, rawPointBytes);
			if (!payload || payload.length < rawPointBytes) return null;
		}

		const points: Q10SourcePathPoint[] = [];
		for (let index = 0; index < pointCount; index++) {
			const pointOffset = index * 4;
			let x = byte2ToShortBE(payload[pointOffset], payload[pointOffset + 1]);
			let y = byte2ToShortBE(payload[pointOffset + 2], payload[pointOffset + 3]);

			if (pathVersion === 0) {
				x /= 10;
				y /= 10;
			} else if (pathVersion === 1) {
				x = x / 10 / 2;
				y = y / 10 / 2;
			} else {
				x /= 10;
				y /= 10;
			}

			const type = pathMode === 2 ? ((payload[pointOffset + 1] & 0x03) << 2) + (payload[pointOffset + 3] & 0x03) : 0;
			points.push({
				x,
				y,
				type,
				update: q10PathTypeToHistoryUpdate(type)
			});
		}

		return {
			points,
			nextOffset: offset + payloadLen
		};
	} catch {
		return null;
	}
}

function q10DevicePointToWorld(mapXMin: number, mapYMin: number, point: Q10DevicePoint): B01Point {
	return {
		x: mapXMin + point.x,
		y: mapYMin - point.y
	};
}

function q10DeviceAreaToWorld(mapXMin: number, mapYMin: number, area: Q10SourceArea): B01Area {
	return {
		type: area.areaType,
		area_type: area.areaType,
		name: area.name,
		points: area.points.map((point) => q10DevicePointToWorld(mapXMin, mapYMin, point))
	};
}

function q10DeviceCarpetToWorld(mapXMin: number, mapYMin: number, area: Q10SourceArea): B01Carpet {
	return {
		id: area.id,
		points: area.points.map((point) => q10DevicePointToWorld(mapXMin, mapYMin, point))
	};
}

function cloneDevicePoint(point: Q10DevicePoint): Q10DevicePoint {
	return {
		x: point.x,
		y: point.y
	};
}

function clonePathPoint(point: Q10SourcePathPoint): Q10SourcePathPoint {
	return {
		x: point.x,
		y: point.y,
		type: point.type,
		update: point.update
	};
}

function cloneSuspectedPoint(point: Q10SourceSuspectedPoint): Q10SourceSuspectedPoint {
	return {
		type: point.type,
		point: cloneDevicePoint(point.point)
	};
}

function cloneSourceArea(area: Q10SourceArea): Q10SourceArea {
	return {
		id: area.id,
		type: area.type,
		areaType: area.areaType,
		name: area.name,
		points: area.points.map((point) => cloneDevicePoint(point))
	};
}

function buildQ10PathState(
	mapData: B01MapData,
	pathPoints: Q10SourcePathPoint[]
): {
	history: B01PathPoint[];
	robotPos?: B01EntityPosition;
	robotPosition?: Q10DevicePoint & { phi?: number };
} {
	const history = pathPoints.map((point) => ({
		x: q10DevicePointToWorld(mapData.header.minX, mapData.header.maxY, point).x,
		y: q10DevicePointToWorld(mapData.header.minX, mapData.header.maxY, point).y,
		update: point.update
	}));

	if (pathPoints.length < 2) {
		return {
			history
		};
	}

	const previous = pathPoints[pathPoints.length - 2];
	const current = pathPoints[pathPoints.length - 1];
	const heading = (Math.atan2(20, 0) - Math.atan2(current.x - previous.x, current.y - previous.y)) * 180 / Math.PI;
	return {
		history,
		robotPos: {
			...q10DevicePointToWorld(mapData.header.minX, mapData.header.maxY, current),
			phi: heading
		},
		robotPosition: {
			x: current.x,
			y: current.y,
			phi: heading
		}
	};
}

function rebuildQ10OverlayFields(mapData: B01MapData, source: Q10SourceData): Pick<B01MapData, "virtualWalls" | "areasInfo" | "recmForbitZone" | "carpetInfo"> {
	const eraseWorld = source.eraseAreas.map((area) => q10DeviceAreaToWorld(mapData.header.minX, mapData.header.maxY, area));
	const virtualWallWorld = source.virtualWalls.map((area) => q10DeviceAreaToWorld(mapData.header.minX, mapData.header.maxY, area));
	const forbidWorld = source.forbidAreas.map((area) => q10DeviceAreaToWorld(mapData.header.minX, mapData.header.maxY, area));
	const mopWorld = source.mopAreas.map((area) => q10DeviceAreaToWorld(mapData.header.minX, mapData.header.maxY, area));
	const thresholdWorld = source.thresholdAreas.map((area) => q10DeviceAreaToWorld(mapData.header.minX, mapData.header.maxY, area));
	const carpetWorld = source.carpetAreas.map((area) => q10DeviceCarpetToWorld(mapData.header.minX, mapData.header.maxY, area));

	return {
		virtualWalls: virtualWallWorld.length || forbidWorld.length ? [...virtualWallWorld, ...forbidWorld] : undefined,
		areasInfo: mopWorld.length ? mopWorld : undefined,
		recmForbitZone: eraseWorld.length || thresholdWorld.length ? [...eraseWorld, ...thresholdWorld] : undefined,
		carpetInfo: carpetWorld.length ? carpetWorld : undefined
	};
}

export function parseQ10PathOnlyToSourcePoints(buf: Buffer): Q10SourcePathPoint[] | null {
	if (!buf || buf.length < 13) return null;

	// Original app path parser receives `parserPathData(l)` with the leading blob byte
	// already stripped (`l = a.slice(1)`). We unwrap the transport payload here so the
	// parser itself stays aligned with the original data shape.
	const stripped =
		getQ10PathPayloadLengthAt(buf, 0) > 0
			? buf
			: buf[0] === 2 && getQ10PathPayloadLengthAt(buf, 1) > 0
				? buf.subarray(1)
				: null;
	if (!stripped) return null;

	const pathBlock = parseQ10PathBlock(stripped, 0);
	return pathBlock?.points?.length ? pathBlock.points : null;
}

export function applyQ10PathOnlyToB01(previous: B01MapData, pathPoints: Q10SourcePathPoint[]): B01MapData {
	if (!previous.q10SourceData || !pathPoints.length) return previous;

	const nextSource: Q10SourceData = {
		...previous.q10SourceData,
		pathPoints: pathPoints.map((point) => clonePathPoint(point))
	};
	const pathState = buildQ10PathState(previous, nextSource.pathPoints);

	return {
		...previous,
		history: pathState.history,
		robotPos: pathState.robotPos,
		q10SourceData: {
			...nextSource,
			robotPosition: pathState.robotPosition
		}
	};
}

export function mergeQ10PersistentState(current: B01MapData, previous?: B01MapData | null): B01MapData {
	if (!current?.q10SourceData || !previous?.q10SourceData) return current;

	const currentSource = current.q10SourceData;
	const previousSource = previous.q10SourceData;
	if (!currentSource.mapId) return current;
	if (previousSource.mapId !== 0 && currentSource.mapId !== previousSource.mapId) return current;

	let changed = false;
	const nextSource: Q10SourceData = {
		...currentSource
	};

	if (!nextSource.virtualWalls.length && previousSource.virtualWalls.length) {
		nextSource.virtualWalls = previousSource.virtualWalls.map((area) => cloneSourceArea(area));
		changed = true;
	}
	if (!nextSource.forbidAreas.length && previousSource.forbidAreas.length) {
		nextSource.forbidAreas = previousSource.forbidAreas.map((area) => cloneSourceArea(area));
		changed = true;
	}
	if (!nextSource.mopAreas.length && previousSource.mopAreas.length) {
		nextSource.mopAreas = previousSource.mopAreas.map((area) => cloneSourceArea(area));
		changed = true;
	}
	if (!nextSource.thresholdAreas.length && previousSource.thresholdAreas.length) {
		nextSource.thresholdAreas = previousSource.thresholdAreas.map((area) => cloneSourceArea(area));
		changed = true;
	}
	if (!nextSource.carpetAreas.length && previousSource.carpetAreas.length) {
		nextSource.carpetAreas = previousSource.carpetAreas.map((area) => cloneSourceArea(area));
		changed = true;
	}
	if (!nextSource.tempRoomColorPlanStr && previousSource.tempRoomColorPlanStr) {
		nextSource.tempRoomColorPlanStr = previousSource.tempRoomColorPlanStr;
		changed = true;
	}
	if (!nextSource.tempClipEraseRoomColorPlanStr && previousSource.tempClipEraseRoomColorPlanStr) {
		nextSource.tempClipEraseRoomColorPlanStr = previousSource.tempClipEraseRoomColorPlanStr;
		changed = true;
	}

	if (!changed) return current;

	const overlayFields = rebuildQ10OverlayFields(current, nextSource);
	const pathState = nextSource.pathPoints.length ? buildQ10PathState(current, nextSource.pathPoints) : null;

	return {
		...current,
		history: pathState?.history ?? current.history,
		robotPos: pathState?.robotPos ?? current.robotPos,
		virtualWalls: overlayFields.virtualWalls,
		areasInfo: overlayFields.areasInfo,
		recmForbitZone: overlayFields.recmForbitZone,
		carpetInfo: overlayFields.carpetInfo,
		q10SourceData: {
			...nextSource,
			robotPosition: pathState?.robotPosition ?? nextSource.robotPosition
		}
	};
}

export function mergeQ10RuntimeState(current: B01MapData, previous?: B01MapData | null): B01MapData {
	if (!current?.q10SourceData || !previous?.q10SourceData) return current;

	const currentSource = current.q10SourceData;
	const previousSource = previous.q10SourceData;
	if (!currentSource.mapId) return current;
	if (previousSource.mapId !== 0 && currentSource.mapId !== previousSource.mapId) return current;

	let changed = false;
	const nextSource: Q10SourceData = {
		...currentSource
	};

	if (!nextSource.pathPoints.length && previousSource.pathPoints.length) {
		nextSource.pathPoints = previousSource.pathPoints.map((point) => clonePathPoint(point));
		changed = true;
	}
	if (!nextSource.virtualWalls.length && previousSource.virtualWalls.length) {
		nextSource.virtualWalls = previousSource.virtualWalls.map((area) => cloneSourceArea(area));
		changed = true;
	}
	if (!nextSource.forbidAreas.length && previousSource.forbidAreas.length) {
		nextSource.forbidAreas = previousSource.forbidAreas.map((area) => cloneSourceArea(area));
		changed = true;
	}
	if (!nextSource.mopAreas.length && previousSource.mopAreas.length) {
		nextSource.mopAreas = previousSource.mopAreas.map((area) => cloneSourceArea(area));
		changed = true;
	}
	if (!nextSource.thresholdAreas.length && previousSource.thresholdAreas.length) {
		nextSource.thresholdAreas = previousSource.thresholdAreas.map((area) => cloneSourceArea(area));
		changed = true;
	}
	if (!nextSource.carpetAreas.length && previousSource.carpetAreas.length) {
		nextSource.carpetAreas = previousSource.carpetAreas.map((area) => cloneSourceArea(area));
		changed = true;
	}
	if (!nextSource.suspectedPoints.length && previousSource.suspectedPoints.length) {
		nextSource.suspectedPoints = previousSource.suspectedPoints.map((point) => cloneSuspectedPoint(point));
		changed = true;
	}
	if (!nextSource.tempRoomColorPlanStr && previousSource.tempRoomColorPlanStr) {
		nextSource.tempRoomColorPlanStr = previousSource.tempRoomColorPlanStr;
		changed = true;
	}
	if (!nextSource.tempClipEraseRoomColorPlanStr && previousSource.tempClipEraseRoomColorPlanStr) {
		nextSource.tempClipEraseRoomColorPlanStr = previousSource.tempClipEraseRoomColorPlanStr;
		changed = true;
	}

	if (!changed) return current;

	const overlayFields = rebuildQ10OverlayFields(current, nextSource);
	const pathState = nextSource.pathPoints.length ? buildQ10PathState(current, nextSource.pathPoints) : null;

	return {
		...current,
		history: pathState?.history ?? current.history,
		robotPos: pathState?.robotPos ?? current.robotPos,
		virtualWalls: overlayFields.virtualWalls,
		areasInfo: overlayFields.areasInfo,
		recmForbitZone: overlayFields.recmForbitZone,
		carpetInfo: overlayFields.carpetInfo,
		q10SourceData: {
			...nextSource,
			robotPosition: pathState?.robotPosition ?? nextSource.robotPosition
		}
	};
}

export function applyQ10RuntimeStatePatch(current: B01MapData, patch: Q10RuntimeStatePatch): B01MapData {
	if (!current?.q10SourceData) return current;

	let changed = false;
	const nextSource: Q10SourceData = {
		...current.q10SourceData
	};

	if (patch.pathPoints) {
		nextSource.pathPoints = patch.pathPoints.map((point) => clonePathPoint(point));
		changed = true;
	}
	if (patch.virtualWalls) {
		nextSource.virtualWalls = patch.virtualWalls.map((area) => cloneSourceArea(area));
		changed = true;
	}
	if (patch.forbidAreas) {
		nextSource.forbidAreas = patch.forbidAreas.map((area) => cloneSourceArea(area));
		changed = true;
	}
	if (patch.mopAreas) {
		nextSource.mopAreas = patch.mopAreas.map((area) => cloneSourceArea(area));
		changed = true;
	}
	if (patch.thresholdAreas) {
		nextSource.thresholdAreas = patch.thresholdAreas.map((area) => cloneSourceArea(area));
		changed = true;
	}
	if (patch.carpetAreas) {
		nextSource.carpetAreas = patch.carpetAreas.map((area) => cloneSourceArea(area));
		changed = true;
	}
	if (patch.suspectedPoints) {
		nextSource.suspectedPoints = patch.suspectedPoints.map((point) => cloneSuspectedPoint(point));
		changed = true;
	}

	if (!changed) return current;

	const overlayFields = rebuildQ10OverlayFields(current, nextSource);
	const pathState = nextSource.pathPoints.length ? buildQ10PathState(current, nextSource.pathPoints) : null;

	return {
		...current,
		history: pathState?.history ?? current.history,
		robotPos: pathState?.robotPos ?? current.robotPos,
		virtualWalls: overlayFields.virtualWalls,
		areasInfo: overlayFields.areasInfo,
		recmForbitZone: overlayFields.recmForbitZone,
		carpetInfo: overlayFields.carpetInfo,
		q10SourceData: {
			...nextSource,
			robotPosition: pathState?.robotPosition ?? nextSource.robotPosition
		}
	};
}

export function parseQ10VirtualWallDpPayload(buf: Buffer): Q10SourceArea[] {
	if (!buf || buf.length < 1) return [];
	const count = buf[0] ?? 0;
	if (buf.length < 1 + count * 8) return [];

	const walls: Q10SourceArea[] = [];
	for (let index = 0; index < count; index++) {
		const off = 1 + index * 8;
		walls.push({
			type: "virtualWall",
			areaType: 1,
			points: [
				q10DevicePoint(readI16BE(buf, off) / 10, readI16BE(buf, off + 2) / 10),
				q10DevicePoint(readI16BE(buf, off + 4) / 10, readI16BE(buf, off + 6) / 10)
			]
		});
	}
	return walls;
}

export function parseQ10RestrictedZoneDpPayload(
	buf: Buffer
): Required<Pick<Q10RuntimeStatePatch, "forbidAreas" | "mopAreas" | "thresholdAreas">> {
	const result: Required<Pick<Q10RuntimeStatePatch, "forbidAreas" | "mopAreas" | "thresholdAreas">> = {
		forbidAreas: [],
		mopAreas: [],
		thresholdAreas: []
	};
	if (!buf || buf.length < 2) return result;

	const count = buf[1] ?? 0;
	if (buf.length < 2 + count * 38) return result;

	for (let index = 0; index < count; index++) {
		const off = 2 + index * 38;
		const areaType = buf[off] ?? 0;
		const points: Q10DevicePoint[] = [];
		for (let pointIndex = 0; pointIndex < 4; pointIndex++) {
			const pointOff = off + 2 + pointIndex * 4;
			points.push(q10DevicePoint(readI16BE(buf, pointOff) / 10, readI16BE(buf, pointOff + 2) / 10));
		}

		const nameLen = buf[off + 18] ?? 0;
		let name: string | undefined;
		if (nameLen > 0 && nameLen <= 19) {
			const nameBytes = buf.subarray(off + 19, Math.min(off + 19 + nameLen, off + 38));
			name = fixLikelyUtf8Mojibake(nameBytes.toString("utf8").replace(/\0+$/g, "").trim()) || undefined;
		}

		const area: Q10SourceArea = {
			type: areaType === 2 ? "mop" : areaType === 3 ? "threshold" : "forbid",
			areaType,
			name,
			points
		};
		if (areaType === 2) result.mopAreas.push(area);
		else if (areaType === 3) result.thresholdAreas.push(area);
		else result.forbidAreas.push(area);
	}

	return result;
}

export function parseQ10CarpetDpPayload(data: unknown): Q10SourceArea[] {
	if (!Array.isArray(data)) return [];

	const carpets: Q10SourceArea[] = [];
	for (const entry of data) {
		if (!entry || typeof entry !== "object" || Array.isArray(entry)) continue;
		const item = entry as Record<string, unknown>;
		if (!Array.isArray(item.vertexs) || item.vertexs.length < 4) continue;

		const points: Q10DevicePoint[] = [];
		for (const vertex of item.vertexs) {
			if (!Array.isArray(vertex) || vertex.length < 2) continue;
			const x = Number(vertex[0]);
			const y = Number(vertex[1]);
			if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
			points.push(q10DevicePoint(x / 10, y / 10));
		}
		if (points.length < 4) continue;

		const id = Number(item.id);
		carpets.push({
			id: Number.isFinite(id) ? id : undefined,
			type: "carpet",
			points
		});
	}
	return carpets;
}

export function parseQ10SuspectedPointsDpPayload(
	data: unknown,
	type: Q10SourceSuspectedPoint["type"]
): Q10SourceSuspectedPoint[] {
	if (!Array.isArray(data)) return [];

	const points: Q10SourceSuspectedPoint[] = [];
	for (const entry of data) {
		if (!Array.isArray(entry) || entry.length < 2) continue;
		const x = Number(entry[0]);
		const y = Number(entry[1]);
		if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
		points.push({
			type,
			point: q10DevicePoint(x / 10, y / 10)
		});
	}
	return points;
}

function parseQ10TrailingBlocks(
	buf: Buffer,
	start: number,
	mapXMin: number,
	mapYMin: number
): Q10Trailing {
	void mapXMin;
	void mapYMin;
	const out: Q10Trailing = { nextOffset: start };
	if (!buf || start >= buf.length) return out;

	// Erase areas (JX parserErasesArea): count; if count>0: vertsPerPoly (1) + count × vertsPerPoly × 4 bytes (int16 BE x,y /10)
	let pos = start;
	if (pos + 1 > buf.length) return out;
	const erasesCount = buf[pos];
	pos += 1;
	if (erasesCount > 0) {
		if (pos + 1 > buf.length) return out;
		const vertsPerPoly = buf[pos];
		pos += 1;
		if (vertsPerPoly < 2 || vertsPerPoly > 32) return out;
		const bytesPerPoly = vertsPerPoly * 4;
		const erasesBlockLen = erasesCount * bytesPerPoly;
		if (pos + erasesBlockLen <= buf.length) {
			const areas: Q10SourceArea[] = [];
			for (let i = 0; i < erasesCount; i++) {
				const points: Q10DevicePoint[] = [];
				for (let p = 0; p < vertsPerPoly; p++) {
					const rx = readI16BE(buf, pos) / 10;
					const ry = readI16BE(buf, pos + 2) / 10;
					pos += 4;
					points.push(q10DevicePoint(rx, ry));
				}
				areas.push({ type: "erase", points });
			}
			out.eraseAreas = areas;
		} else {
			return out;
		}
	}

	// Carpet: pixLen (4), pixLzLen (2), then LZ4 or raw
	if (pos + 6 > buf.length) return out;
	const carpetPixLen = readU32BE(buf, pos);
	pos += 4;
	const carpetPixLzLen = readU16BE(buf, pos);
	pos += 2;
	if (carpetPixLen > 0 && carpetPixLen <= MAX_MAP_PIXELS) {
		if (carpetPixLzLen === 0) {
			if (pos + carpetPixLen <= buf.length) {
				out.carpetGrid = Buffer.from(buf.subarray(pos, pos + carpetPixLen));
			}
			pos += carpetPixLen;
		} else {
			if (pos + carpetPixLzLen <= buf.length) {
				const compressed = buf.subarray(pos, pos + carpetPixLzLen);
				const decompressed = tryDecompressQ10Lz4Block(compressed, carpetPixLen);
				if (decompressed && decompressed.length === carpetPixLen) {
					out.carpetGrid = decompressed;
				}
			}
			pos += carpetPixLzLen;
		}
	}

	// Obstacle points: n (1), n × 4 bytes, Int16LE, unit 1/50 (app: /10/5)
	if (pos + 1 > buf.length) return out;
	const obstacleN = buf[pos];
	pos += 1;
	if (obstacleN > 0 && pos + obstacleN * 4 <= buf.length) {
		const points: Q10DevicePoint[] = [];
		for (let i = 0; i < obstacleN; i++) {
			const gx = readI16BE(buf, pos) / 10 / 5;
			const gy = readI16BE(buf, pos + 2) / 10 / 5;
			pos += 4;
			points.push(q10DevicePoint(gx, gy));
		}
		out.obstaclePoints = points;
	}

	// Skip-clean points: n (1), n × 4 bytes, int16 BE, unit 1/10 → Weltkoordinaten
	if (pos + 1 > buf.length) return out;
	const skipN = buf[pos];
	pos += 1;
	if (skipN > 0 && pos + skipN * 4 <= buf.length) {
		const points: Q10DevicePoint[] = [];
		for (let i = 0; i < skipN; i++) {
			const rx = readI16BE(buf, pos) / 10;
			const ry = readI16BE(buf, pos + 2) / 10;
			pos += 4;
			points.push(q10DevicePoint(rx, ry));
		}
		out.skipCleanPoints = points;
	}

	out.nextOffset = pos;
	return out;
}

/**
 * module_973 can place an embedded path block at the beginning of the edit tail
 * for clean-record/live frames. Multi-map frames start directly with virtualWall.
 */
function getQ10PathPayloadLengthAt(buf: Buffer, offset: number): number {
	if (!buf || offset + 13 > buf.length) return 0;
	const version = buf[offset];
	const pathMode = buf[offset + 4];
	const pointCount = readU32BE(buf, offset + 5);
	const compressedLen = readU16BE(buf, offset + 11);
	if (version < 0 || version > 3) return 0;
	if (pathMode < 0 || pathMode > 4) return 0;
	if (pointCount < 2 || pointCount > MAX_Q10_PATH_POINTS) return 0;
	const payloadLen = 13 + (compressedLen === 0 ? pointCount * 4 : compressedLen);
	if (offset + payloadLen > buf.length) return 0;
	return payloadLen;
}

/**
 * Tail after erases/carpet/obstacle/skip (native module_973 order):
 * optional path -> virtualWall -> forbidArea -> carpetArea.
 * These coordinates still use devicePointToOrigMap semantics and must be mapped like path points.
 */
function parseQ10EditTailSections(
	buf: Buffer,
	start: number,
	mapXMin: number,
	mapYMin: number
): Q10EditTailSections {
	void mapXMin;
	void mapYMin;
	const out: Q10EditTailSections = {
		pathPoints: [],
		virtualWalls: [],
		forbidAreas: [],
		mopZones: [],
		thresholdZones: [],
		carpetAreas: []
	};
	if (!buf || start >= buf.length) return out;

	let pos = start;
	const leadingPath = parseQ10PathBlock(buf, pos);
	if (leadingPath) {
		out.pathPoints = leadingPath.points;
		pos = leadingPath.nextOffset;
	}

	if (pos + 1 > buf.length) return out;
	const virtualWallCount = buf[pos];
	const virtualWallLen = 1 + virtualWallCount * 8;
	if (pos + virtualWallLen > buf.length) return out;
	for (let i = 0; i < virtualWallCount; i++) {
		const off = pos + 1 + i * 8;
		const p0 = q10DevicePoint(readI16BE(buf, off) / 10, readI16BE(buf, off + 2) / 10);
		const p1 = q10DevicePoint(readI16BE(buf, off + 4) / 10, readI16BE(buf, off + 6) / 10);
		out.virtualWalls.push({ type: "virtualWall", areaType: 1, points: [p0, p1] });
	}
	pos += virtualWallLen;

	if (pos + 2 > buf.length) return out;
	const forbidCount = buf[pos + 1];
	const forbidLen = 2 + forbidCount * 38;
	if (pos + forbidLen > buf.length) return out;
	for (let i = 0; i < forbidCount; i++) {
		const off = pos + 2 + i * 38;
		const areaType = buf[off];
		const points: Q10DevicePoint[] = [];
		for (let p = 0; p < 4; p++) {
			const pointOff = off + 2 + p * 4;
			points.push(q10DevicePoint(readI16BE(buf, pointOff) / 10, readI16BE(buf, pointOff + 2) / 10));
		}
		const areaTypeName: Q10SourceArea["type"] =
			areaType === 2 ? "mop" :
				areaType === 3 ? "threshold" :
					"forbid";
		const area: Q10SourceArea = { type: areaTypeName, areaType, points };
		if (areaType === 2) out.mopZones.push(area);
		else if (areaType === 3) out.thresholdZones.push(area);
		else out.forbidAreas.push(area);
	}
	pos += forbidLen;

	if (pos + 1 > buf.length) return out;
	const carpetAreaCount = buf[pos];
	const carpetAreaLen = 1 + carpetAreaCount * 20;
	if (pos + carpetAreaLen > buf.length) return out;
	for (let i = 0; i < carpetAreaCount; i++) {
		const off = pos + 1 + i * 20;
		const id = readU16BE(buf, off);
		const points: Q10DevicePoint[] = [];
		for (let p = 0; p < 4; p++) {
			const pointOff = off + 4 + p * 4;
			points.push(q10DevicePoint(readI16BE(buf, pointOff) / 10, readI16BE(buf, pointOff + 2) / 10));
		}
		out.carpetAreas.push({ id, type: "carpet", points });
	}

	return out;
}

/** Returns true if buffer looks like Q10 YxMap (version 0/1/2/3, length >= header). */
export function isQ10YxMapPayload(buf: Buffer): boolean {
	return buf != null && buf.length >= Q10_HEADER_LEN && buf[0] >= 0 && buf[0] <= 3;
}

function scoreDecodedCandidate(mapData: B01MapData | null): number {
	if (!mapData?.header || !mapData.mapGrid?.length) return Number.NEGATIVE_INFINITY;

	const { sizeX, sizeY, minX, minY, maxX, maxY, resolution } = mapData.header;
	let score = 0;

	if (sizeX > 0 && sizeY > 0 && mapData.mapGrid.length === sizeX * sizeY) score += 100;
	if (sizeX >= 16 && sizeX <= 2000) score += 20;
	if (sizeY >= 16 && sizeY <= 2000) score += 20;
	if (resolution > 0 && resolution <= 1) score += 80;
	else if (resolution > 0 && resolution <= 5) score += 20;
	else score -= 120;

	const spanX = maxX - minX;
	const spanY = maxY - minY;
	if (Number.isFinite(spanX) && Number.isFinite(spanY)) {
		const expectedSpanX = sizeX * resolution;
		const expectedSpanY = sizeY * resolution;
		if (Math.abs(spanX - expectedSpanX) <= Math.max(resolution, 0.25)) score += 15;
		if (Math.abs(spanY - expectedSpanY) <= Math.max(resolution, 0.25)) score += 15;
	}

	// Real Q10 maps live in a small map-local coordinate system.
	const extentAbsMax = Math.max(
		Math.abs(minX),
		Math.abs(minY),
		Math.abs(maxX),
		Math.abs(maxY)
	);
	if (extentAbsMax <= 200) score += 80;
	else if (extentAbsMax <= 2000) score += 20;
	else score -= 160;

	if (mapData.chargerPos) {
		const margin = Math.max(resolution * 2, 0.2);
		const inBounds =
			mapData.chargerPos.x >= minX - margin &&
			mapData.chargerPos.x <= maxX + margin &&
			mapData.chargerPos.y >= minY - margin &&
			mapData.chargerPos.y <= maxY + margin;
		score += inBounds ? 40 : -40;
		if (Math.abs(mapData.chargerPos.phi) <= 360) score += 10;
		else score -= 20;
	}

	for (const areas of [mapData.virtualWalls, mapData.areasInfo, mapData.recmForbitZone]) {
		if (!areas?.length) continue;
		let plausiblePoints = 0;
		let implausiblePoints = 0;
		for (const area of areas) {
			for (const point of area.points ?? []) {
				const inBounds =
					point.x >= minX - 5 &&
					point.x <= maxX + 5 &&
					point.y >= minY - 5 &&
					point.y <= maxY + 5;
				if (inBounds) plausiblePoints++;
				else implausiblePoints++;
			}
		}
		score += plausiblePoints * 2;
		score -= implausiblePoints * 3;
	}

	return score;
}

function tryDecodeHeaderCandidate(
	buf: Buffer,
	offset: number,
	heightEndian: "le" | "be"
): { mapData: B01MapData; score: number } | null {
	try {
		const hdr = parseQ10HeaderAt(buf, offset, heightEndian);
		if (!isPlausibleHeader(hdr, buf.length)) return null;
		if (hdr.version !== 0 && hdr.version !== 1 && hdr.version !== 2 && hdr.version !== 3) return null;
		const mapData = tryDecodeCandidate(buf, hdr, true);
		if (!mapData) return null;
		return { mapData, score: scoreDecodedCandidate(mapData) };
	} catch {
		return null;
	}
}

function parseStrictOriginalQ10Map(buf: Buffer): B01MapData | null {
	const payload = unwrapQ10OriginalMapPayload(buf);
	if (!payload || payload.length < Q10_HEADER_LEN) return null;

	try {
		const hdr = parseQ10HeaderAt(payload, 0, "be");
		if (!isStrictOriginalHeader(hdr, payload.length)) return null;
		return tryDecodeCandidate(payload, hdr, false);
	} catch {
		return null;
	}
}

/**
 * Parses Q10 YxMap buffer to B01MapData for use with the B01/Q10 renderer.
 *
 * Default behavior mirrors the original app:
 * - strip the leading blob-type byte for map blobs (`1`, `3`, `4`)
 * - parse the header at offset `0`
 * - use big-endian multi-byte fields
 *
 * A separate compatibility mode can be enabled explicitly for malformed legacy
 * captures that do not follow the original transport shape.
 */
export function parseQ10YxMapToB01(buf: Buffer): B01MapData | null {
	if (!buf || buf.length < Q10_HEADER_LEN) return null;

	const strict = parseStrictOriginalQ10Map(buf);
	if (strict) return strict;
	if (!Q10_COMPAT_FALLBACKS_ENABLED) return null;

	const preferredCandidates: Array<{ offset: number; endian: "le" | "be" }> = [
		{ offset: 1, endian: "be" },
		{ offset: 0, endian: "be" },
		{ offset: 1, endian: "le" },
		{ offset: 0, endian: "le" }
	];

	let bestPreferred: { mapData: B01MapData; score: number } | null = null;
	for (const candidate of preferredCandidates) {
		if (candidate.offset < 0 || candidate.offset + Q10_HEADER_LEN > buf.length) continue;
		const decoded = tryDecodeHeaderCandidate(buf, candidate.offset, candidate.endian);
		if (!decoded) continue;
		if (!bestPreferred || decoded.score > bestPreferred.score) {
			bestPreferred = decoded;
		}
	}

	// Very low scores usually mean we decoded a structurally valid but semantically
	// wrong inner block. In that case, keep scanning the payload for a better hit.
	if (bestPreferred && bestPreferred.score >= 120) {
		return bestPreferred.mapData;
	}

	const scanned = findInnerMapCandidate(buf);
	if (!scanned) {
		return bestPreferred?.mapData ?? null;
	}

	if (!bestPreferred) return scanned;

	return scoreDecodedCandidate(scanned) > bestPreferred.score ? scanned : bestPreferred.mapData;
}
