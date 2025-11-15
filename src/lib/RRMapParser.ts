// src/lib/RRMapParser.ts
import type { Roborock } from "../main";
import crypto from "crypto";

// --------------------
// Constants
// --------------------
const TYPES = {
	CHARGER_LOCATION: 1,
	IMAGE: 2,
	PATH: 3,
	GOTO_PATH: 4,
	GOTO_PREDICTED_PATH: 5,
	CURRENTLY_CLEANED_ZONES: 6,
	GOTO_TARGET: 7,
	ROBOT_POSITION: 8,
	FORBIDDEN_ZONES: 9,
	VIRTUAL_WALLS: 10,
	CURRENTLY_CLEANED_BLOCKS: 11,
	NO_MOP_ZONE: 12,
	OBSTACLES: 13,
	IGNORED_OBSTACLES: 14,
	OBSTACLES2: 15,
	IGNORED_OBSTACLES2: 16,
	CARPET_MAP: 17,
	MOP_PATH: 18,
	CARPET_FORBIDDEN_ZONE: 19,
	SMART_ZONE_PATH_TYPE: 20,
	SMART_ZONE: 21,
	CUSTOM_CARPET: 22,
	CL_FORBIDDEN_ZONES: 23,
	FLOOR_MAP: 24,
	FURNITURES: 25,
	DOCK_TYPE: 26,
	ENEMIES: 27,
	DS_FORBIDDEN_ZONES: 28,
	STUCK_POINTS: 29,
	CLF_FORBIDDEN_ZONES: 30,
	SMART_DS: 31,
	FLOOR_DIRECTION: 32,
	DATE: 33,
	NONCEDATA: 34,
	EXT_ZONES: 36,
	PATROL: 37,
	PET_PATROL: 38,
	MODE_CARPET: 39,
	STROY_PT: 41,
	DIRTY_RECT: 42,
	IGNORE_DIRTY_RECT: 43,
	BRUSH_PT: 44,
	DIRTY_NEW: 45,
	MOP_ERR_PT: 46,
	ERAZER_ZONE: 47,
	LONG_CARPET: 48,
	DS_SIDES: 49,
	STEERING_PT: 50,
	SENSOR_INFO: 51,
	LOW_SPACES: 52,
	DIGEST: 1024,
};
const TYPES_REVERSE = Object.fromEntries(Object.entries(TYPES).map(([key, value]) => [value, key]));
const OFFSETS = {
	HLENGTH: 0x02,
	LENGTH: 0x04,
	TYPE_COUNT: 0x08,
	TARGET_X: 0x08,
	ANGLE: 0x10,
	PATH: 0x14,
	TARGET_Y: 0x0a,
	BLOCKS: 0x0c,
};

// --------------------
// Interfaces
// --------------------
interface MapMetaData {
	header_length: number;
	data_length: number;
	version: { major: number; minor: number };
	map_index: number;
	map_sequence: number;
	SHA1: string;
	expectedSHA1: string;
}
interface PositionBlock {
	position: [number, number];
	angle: number;
}
interface ImageBlock {
	segments: { count: number; id: number[]; largestSegment: number; centers: Record<string, [number, number]> };
	position: { top: number; left: number };
	dimensions: { height: number; width: number };
	pixels: { floor: number[]; obstacle: number[]; segments: number[] };
}
interface PathBlock {
	current_angle: number;
	points: [number, number][];
}
type Obstacle = [number, number, number, number, number, number, string];
interface NonceData {
	type: number;
	unixTime: number;
}
export interface ParsedMapData {
	metaData: MapMetaData;
	ROBOT_POSITION?: PositionBlock;
	CHARGER_LOCATION?: PositionBlock;
	IMAGE?: ImageBlock;
	PATH?: PathBlock;
	GOTO_PATH?: PathBlock;
	GOTO_PREDICTED_PATH?: PathBlock;
	CURRENTLY_CLEANED_ZONES?: number[][];
	GOTO_TARGET?: [number, number];
	VIRTUAL_WALLS?: number[][];
	CURRENTLY_CLEANED_BLOCKS?: number[];
	FORBIDDEN_ZONES?: number[][];
	NO_MOP_ZONE?: number[][];
	OBSTACLES2?: Obstacle[];
	CARPET_MAP?: number[];
	MOP_PATH?: number[];
	CARPET_FORBIDDEN_ZONE?: number[][];
	DS_FORBIDDEN_ZONES?: number[][];
	CLF_FORBIDDEN_ZONES?: number[][];
	MODE_CARPET?: number[][];
	NONCEDATA?: NonceData[];
}

export class RRMapParser {
	adapter: Roborock;

	constructor(adapter: Roborock) {
		this.adapter = adapter;
	}

	/**
	 * Parses the complete raw map buffer from the robot.
	 * @param buf The raw map buffer.
	 * @param options.isHistoryMap Set to true if parsing a history map (which lacks the 20-byte header).
	 * @returns A structured map data object (ParsedMapData) or empty object on failure.
	 */
	async parsedata(buf: Buffer, options: { isHistoryMap: boolean } = { isHistoryMap: false }): Promise<ParsedMapData | {}> {
		// --- PRIMARY GUARD ---
		if (buf.length < 8) {
			this.adapter.log.warn(`[RRMapParser] Received map buffer is too small (< 8 bytes). Length: ${buf.length}`);
			return {};
		}

		let metaData: MapMetaData;
		let dataPosition = 0;
		let dataLength = buf.length;

		// Check for Standard "rr" Header (20 bytes)
		if (buf.length >= 20 && buf[0x00] === 0x72 && buf[0x01] === 0x72) {
			// --- CASE 1: Standard Live Map (or History Map with Header) ---
			this.adapter.log.debug("[RRMapParser] Found 'rr' header. Parsing as Standard Map.");
			metaData = this.parseHeader(buf);

			if (!metaData.header_length) {
				// Check if header parsing failed
				this.adapter.log.error(`[RRMapParser] Failed to parse LIVE map header (Invalid structure).`);
				return {};
			}
			if (metaData.SHA1 !== metaData.expectedSHA1) {
				this.adapter.log.error(`[RRMapParser] Invalid map hash!`);
				return {};
			}

			dataPosition = 0x14; // Skip 20-byte header
			dataLength = metaData.data_length; // Use length from header
		} else if (options.isHistoryMap) {
			// --- CASE 2: History Map WITHOUT Header ---
			this.adapter.log.debug("[RRMapParser] Parsing as History Map (No 'rr' Header).");
			// Create dummy metadata. map_index = -1 is the key.
			metaData = { map_index: -1 } as any;
			dataPosition = 0; // Start from byte 0
			dataLength = buf.length;
		} else {
			// --- CASE 3: ERROR ---
			// This is a LIVE map (isHistoryMap: false) but the "rr" header is missing.
			this.adapter.log.warn("[RRMapParser] Invalid map header signature (expected 'rr').");
			return {};
		}

		const result: any = { metaData };

		// Loop through all blocks
		while (dataPosition < dataLength) {
			if (dataPosition + OFFSETS.LENGTH + 4 > buf.length) {
				this.adapter.log.warn(`[RRMapParser] Reached end of buffer prematurely while reading block header.`);
				break;
			}

			const type = buf.readUInt16LE(dataPosition);
			const hlength = buf.readUInt16LE(dataPosition + OFFSETS.HLENGTH);
			const length = buf.readUInt32LE(dataPosition + OFFSETS.LENGTH);

			if (dataPosition + hlength + length > buf.length) {
				this.adapter.log.warn(`[RRMapParser] Block (Type ${type}) claims to be larger than buffer. Stopping parse.`);
				break;
			}

			const blockBuffer = buf.slice(dataPosition, dataPosition + hlength + length);
			const [offset1, offset2] = this.getTwoByteOffsets(blockBuffer);

			const typeName = TYPES_REVERSE[type];
			if (typeName) {
				try {
					switch (type) {
						case TYPES.ROBOT_POSITION:
						case TYPES.CHARGER_LOCATION: {
							const position = this.getXYPositions(blockBuffer, offset1, offset2);
							const angle = length >= 12 ? this.getAngle(blockBuffer) : 0;
							result[typeName] = { position, angle };
							break;
						}
						case TYPES.IMAGE: {
							result[typeName] = this.parseImageBlock(blockBuffer, buf, dataPosition, length, hlength);
							break;
						}
						case TYPES.CARPET_MAP: {
							const carpets: number[] = [];
							const dataStart = dataPosition + offset1;
							for (let i = 0; i < length; i++) {
								if (this.getPixelType(buf, dataStart + i) === 1) {
									carpets.push(i);
								}
							}
							result[typeName] = carpets;
							break;
						}
						case TYPES.MOP_PATH: {
							const mopPath: number[] = [];
							const dataStart = dataPosition + hlength;
							for (let i = 0; i < length; i++) {
								mopPath.push(...this.readUInt8(buf, dataStart + i, 0, 1));
							}
							result[typeName] = mopPath;
							break;
						}
						case TYPES.PATH:
						case TYPES.GOTO_PATH:
						case TYPES.GOTO_PREDICTED_PATH: {
							result[typeName] = this.parsePathBlock(blockBuffer, buf, dataPosition, length);
							break;
						}
						case TYPES.GOTO_TARGET:
							result[typeName] = this.getGoToTarget(blockBuffer);
							break;

						case TYPES.CURRENTLY_CLEANED_ZONES:
						case TYPES.VIRTUAL_WALLS: {
							const count = this.getCount(blockBuffer);
							const zones: number[][] = [];
							const dataStart = dataPosition + hlength;
							for (let i = 0; i < count; i++) {
								zones.push(this.readUInt16LE(buf, dataStart + i * 8, 0, 4));
							}
							result[typeName] = zones;
							break;
						}
						case TYPES.FORBIDDEN_ZONES:
						case TYPES.NO_MOP_ZONE:
						case TYPES.CARPET_FORBIDDEN_ZONE:
						case TYPES.DS_FORBIDDEN_ZONES:
						case TYPES.CLF_FORBIDDEN_ZONES:
						case TYPES.MODE_CARPET: {
							const count = this.getCount(blockBuffer);
							const zones: number[][] = [];
							const dataStart = dataPosition + hlength;
							for (let i = 0; i < count; i++) {
								zones.push(this.getForbiddenZone(buf, dataStart + i * 16, 0));
							}
							result[typeName] = zones;
							break;
						}
						case TYPES.OBSTACLES2:
							result[typeName] = this.extractObstacles(blockBuffer, hlength);
							break;
						case TYPES.CURRENTLY_CLEANED_BLOCKS: {
							const count = this.getCount(blockBuffer);
							const blocks: number[] = [];
							for (let i = 0; i < count; i++) {
								blocks.push(buf.readUInt8(dataPosition + OFFSETS.BLOCKS + i));
							}
							result[typeName] = blocks;
							break;
						}
						case TYPES.NONCEDATA:
							result[typeName] = this.getNonceData(blockBuffer);
							break;
					}
				} catch (e: any) {
					this.adapter.log.error(`[RRMapParser] Error parsing block ${typeName} (Type ${type}): ${e.stack}`);
				}
			} else {
				this.adapter.log.warn(`[RRMapParser] Unknown block type: ${type} with length ${length}`);
			}
			dataPosition += length + hlength;
		}
		return result;
	}

	private parseHeader(mapBuf: Buffer): MapMetaData {
		// This function assumes the "rr" signature has already been checked
		return {
			header_length: mapBuf.readUInt16LE(OFFSETS.HLENGTH),
			data_length: mapBuf.readUInt32LE(OFFSETS.LENGTH),
			version: {
				major: mapBuf.readUInt16LE(0x08),
				minor: mapBuf.readUInt16LE(0x0a),
			},
			map_index: mapBuf.readUInt32LE(0x0c),
			map_sequence: mapBuf.readUInt32LE(0x10),
			SHA1: crypto
				.createHash("sha1")
				.update(mapBuf.subarray(0, mapBuf.length - 20))
				.digest("hex"),
			expectedSHA1: mapBuf.subarray(mapBuf.length - 20).toString("hex"),
		};
	}

	private parseImageBlock(blockBuffer: Buffer, buf: Buffer, dataPosition: number, length: number, hlength: number): ImageBlock {
		const offset = this.getSingleByteOffset(blockBuffer);
		const [left, top, width, height] = this.getMapSizes(blockBuffer, offset);

		const parameters: ImageBlock = {
			segments: {
				count: hlength > 24 ? this.getCount(blockBuffer) : 0,
				id: [],
				largestSegment: -1,
				centers: {},
			},
			position: { top, left },
			dimensions: { height, width },
			pixels: { floor: [], obstacle: [], segments: [] },
		};

		if (height <= 0 || width <= 0) return parameters;

		const segBB: Record<number, { minX: number; maxX: number; minY: number; maxY: number }> = {};
		let maxPixels = 0;
		const pixelCountBySegment: Record<number, number> = {};

		const dataStart = dataPosition + offset;

		for (let i = 0; i < length; i++) {
			const pixelBytePosition = dataStart + i;
			const pixelType = this.getPixelType(buf, pixelBytePosition);

			if (pixelType === 1) {
				// Obstacle
				parameters.pixels.obstacle.push(i);
			} else if (pixelType !== 0) {
				// Floor
				parameters.pixels.floor.push(i);

				const segmentID = (buf.readUInt8(pixelBytePosition) & 248) >> 3;

				if (!parameters.segments.id.includes(segmentID)) {
					parameters.segments.id.push(segmentID);
				}
				parameters.pixels.segments.push(i | (segmentID << 21));

				const x = i % width;
				const y = Math.floor(i / width);

				const bb = segBB[segmentID];
				if (!bb) {
					segBB[segmentID] = { minX: x, maxX: x, minY: y, maxY: y };
				} else {
					if (x < bb.minX) bb.minX = x;
					if (x > bb.maxX) bb.maxX = x;
					if (y < bb.minY) bb.minY = y;
					if (y > bb.maxY) bb.maxY = y;
				}

				const count = (pixelCountBySegment[segmentID] = (pixelCountBySegment[segmentID] || 0) + 1);
				if (count > maxPixels) {
					maxPixels = count;
					parameters.segments.largestSegment = segmentID;
				}
			}
		}

		for (const segId of parameters.segments.id) {
			const bb = segBB[segId];
			if (bb) {
				const cx = Math.round((bb.minX + bb.maxX) / 2) + left;
				const cy = Math.round((bb.minY + bb.maxY) / 2) + top;
				parameters.segments.centers[segId] = [cx, cy];
			}
		}

		return parameters;
	}

	private parsePathBlock(blockBuffer: Buffer, buf: Buffer, dataPosition: number, length: number): PathBlock {
		const pathData: PathBlock = {
			current_angle: this.getAngle(blockBuffer),
			points: [],
		};
		const pathDataPosition = dataPosition + OFFSETS.PATH;

		for (let i = 0; i < length; i += 4) {
			pathData.points.push(this.getPointInPath(buf, pathDataPosition + i));
		}

		if (pathData.points.length >= 2) {
			const last = pathData.points[pathData.points.length - 1];
			const secondLast = pathData.points[pathData.points.length - 2];
			pathData.current_angle = (Math.atan2(last[1] - secondLast[1], last[0] - secondLast[0]) * 180) / Math.PI;
		}

		return pathData;
	}

	private extractObstacles(buf: Buffer, offset: number): Obstacle[] {
		const obstacleCount = this.getCount(buf);
		const obstacles: Obstacle[] = [];
		for (let i = 0; i < obstacleCount * 28; i += 28) {
			const obstacle: Obstacle = [
				buf.readUInt16LE(offset + i),
				buf.readUInt16LE(offset + i + 2),
				buf.readUInt16LE(offset + i + 4),
				buf.readUInt16LE(offset + i + 6),
				buf.readUInt16LE(offset + i + 8),
				buf.readUInt16LE(offset + i + 10),
				buf.toString("utf-8", offset + i + 12, offset + i + 12 + 16),
			];
			obstacles.push(obstacle);
		}
		return obstacles;
	}

	// --------------------
	// Binary Read Helpers
	// --------------------

	private getXYPositions(buf: Buffer, xOffset: number, yOffset: number): [number, number] {
		const xPosition = buf.readInt32LE(xOffset);
		const yPosition = buf.readInt32LE(yOffset);
		return [xPosition, yPosition];
	}

	private getMapSizes(buf: Buffer, offset: number): [number, number, number, number] {
		const top = buf.readInt32LE(offset - 0x10);
		const left = buf.readInt32LE(offset - 0x0c);
		const height = buf.readInt32LE(offset - 0x08);
		const width = buf.readInt32LE(offset - 0x04);
		return [left, top, width, height];
	}

	private getPointInPath(buf: Buffer, dataPosition: number): [number, number] {
		const x = buf.readUInt16LE(dataPosition);
		const y = buf.readUInt16LE(dataPosition + 2);
		return [x, y];
	}

	private getCount(buf: Buffer): number {
		return buf.readUInt32LE(OFFSETS.TYPE_COUNT);
	}

	private getPixelType(buf: Buffer, dataPosition: number): number {
		return buf.readUInt8(dataPosition) & 0x07;
	}

	private getAngle(buf: Buffer): number {
		return buf.readInt32LE(OFFSETS.ANGLE);
	}

	private getGoToTarget(buf: Buffer): [number, number] {
		return [buf.readUInt16LE(OFFSETS.TARGET_X), buf.readUInt16LE(OFFSETS.TARGET_Y)];
	}

	private getForbiddenZone(buf: Buffer, dataPosition: number, offset: number): number[] {
		return this.readUInt16LE(buf, dataPosition, offset, 8);
	}

	private getSingleByteOffset(buf: Buffer): number {
		return buf.readUInt8(2);
	}

	private getTwoByteOffsets(buf: Buffer): [number, number] {
		return [buf.readUInt8(2), buf.readUInt8(4)];
	}

	private getNonceData(buf: Buffer): NonceData[] {
		const sections: NonceData[] = [];
		for (let i = 12; i < buf.length; i += 5) {
			const type = buf[i];
			const unixTime = buf.readUInt32LE(i + 1);
			sections.push({ type, unixTime });
		}
		return sections;
	}

	private readUInt16LE(buf: Buffer, dataPosition: number, offset: number, count: number): number[] {
		const result: number[] = [];
		for (let j = 0; j < count; j++) {
			result.push(buf.readUInt16LE(dataPosition + offset + j * 2));
		}
		return result;
	}

	private readUInt8(buf: Buffer, dataPosition: number, offset: number, count: number): number[] {
		const array: number[] = [];
		for (let j = 0; j < count; j++) {
			array.push(buf.readUInt8(offset + dataPosition + j));
		}
		return array;
	}
}
