"use strict";

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
	UNKNOWN28: 28,
	UNKNOWN29: 29,
	UNKNOWN30: 30,
	UNKNOWN31: 31,
	UNKNOWN32: 32,
	UNKNOWN33: 33,
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

class RRMapParser {
	constructor(adapter) {
		this.adapter = adapter;
	}

	async parsedata(buf) {
		if (!this.PARSE(buf).map_index) {
			this.adapter.log.error(`RRMapParser: Failed to parse map data. map_index was missing`);
			return {};
		}

		let dataPosition = 0x14; // Skip header

		const result = {};

		while (dataPosition < buf.length) {
			const type = buf.readUInt16LE(dataPosition);
			const hlength = buf.readUInt16LE(dataPosition + OFFSETS.HLENGTH);
			const length = buf.readUInt32LE(dataPosition + OFFSETS.LENGTH);
			const [offset1, offset2] = this.getTwoByteOffsets(buf, dataPosition);

			// this.adapter.log.debug("Known values: type=" + type + ", hlength=" + hlength + ", length=" + length);

			if (TYPES_REVERSE[type]) {
				// this.adapter.log.debug("Test length: " + TYPES_REVERSE[type] + " " + length);
				// if (length < 100) this.adapter.log.debug("Test data type: " + TYPES_REVERSE[type] + " " + buf.toString("hex", dataPosition, dataPosition + length));

				switch (type) {
					case TYPES.ROBOT_POSITION:
					case TYPES.CHARGER_LOCATION: {
						const position = this.getXYPositions(buf, dataPosition, offset1, offset2);
						const angle = length >= 12 ? this.getAngle(buf, dataPosition) : 0; // gen3+

						result[TYPES_REVERSE[type]] = {
							position,
							angle,
						};
						break;
					}
					case TYPES.IMAGE: {
						const offset = this.getSingleByteOffset(buf, dataPosition);
						const [left, top, width, height] = this.getMapSizes(buf, dataPosition, offset1);

						let parameters = {};
						parameters = {
							segments: {
								count: hlength > 24 ? this.getCount(buf, dataPosition) : 0,
								id: [],
							},
							position: {
								top: top,
								left: left,
							},
							dimensions: {
								height: height,
								width: width,
							},
							pixels: {
								floor: [],
								obstacle: [],
								segments: [],
							},
						};

						if (parameters.dimensions.height > 0 && parameters.dimensions.width > 0) {
							let segmenetID = 0;

							for (let i = 0; i < length; i++) {
								const pixelType = this.getPixelType(buf, dataPosition + i + offset1);

								if (pixelType == 1) { // Obstacle
									parameters.pixels.obstacle.push(i);
								} else if (pixelType != 0) { // Floor
									parameters.pixels.floor.push(i);

									segmenetID = (buf.readUInt8(offset + dataPosition + i) & 248) >> 3;
									if (segmenetID !== 0) {
										if (!parameters.segments.id.includes(segmenetID)) parameters.segments.id.push(segmenetID); // Add segment ID to array if it doesn't exist

										parameters.pixels.segments.push(i | (segmenetID << 21)); // Add segment ID to pixel
									}
								}
							}
						}
						result[TYPES_REVERSE[type]] = parameters;
						break;
					}
					case TYPES.CARPET_MAP: {
						result[TYPES_REVERSE[type]] = [];

						for (let i = 0; i < length; i++) {
							// Only add the pixel index to the carpet array if it is a carpet pixel
							if (this.getPixelType(buf, dataPosition + i) == 1) {
								result[TYPES_REVERSE[type]].push(i);
							}
						}

						break;
					}
					case TYPES.MOP_PATH: {
						result[TYPES_REVERSE[type]] = [];

						for (let i = 0; i < length; i++) {
							result[TYPES_REVERSE[type]].push(this.getPointInPath(buf, dataPosition + i));
						}

						break;
					}
					case TYPES.PATH:
					case TYPES.GOTO_PATH:
					case TYPES.GOTO_PREDICTED_PATH: {
						const pathType = TYPES_REVERSE[type];
						result[pathType] = {
							current_angle: this.getAngle(buf, dataPosition),
							points: [],
						};

						for (let i = 0; i < length; i = i + 4) {
							result[pathType].points.push(this.getPointInPath(buf, dataPosition + i));
						}

						if (result[pathType].points.length >= 2) {
							const lastPoint = result[pathType].points[result[pathType].points.length - 1];
							const secondLastPoint = result[pathType].points[result[pathType].points.length - 2];

							result[pathType].current_angle = (Math.atan2( // Calculate the angle between the last two points
								lastPoint[1] - secondLastPoint[1],
								lastPoint[0] - secondLastPoint[0]
							) * 180) / Math.PI;
						}
						break;
					}

					case TYPES.GOTO_TARGET:
						result[TYPES_REVERSE[type]] = this.getGoToTarget(buf, dataPosition);
						break;

					case TYPES.CURRENTLY_CLEANED_ZONES:
					case TYPES.VIRTUAL_WALLS: {
						const wallCount = buf.readUInt32LE(0x08 + dataPosition);
						result[TYPES_REVERSE[type]] = [];

						for (let i = 0; i < wallCount; i++) {
							const wallDataPosition = dataPosition + i * 8; // 8 Bytes pro Wand
							result[TYPES_REVERSE[type]].push(this.readUInt16LE(buf, wallDataPosition, offset1, 4));
						}
						break;
					}
					case TYPES.FORBIDDEN_ZONES:
					case TYPES.NO_MOP_ZONE:
					case TYPES.CARPET_FORBIDDEN_ZONE: {
						const zoneCount = this.getCount(buf, dataPosition);
						result[TYPES_REVERSE[type]] = [];
						for (let i = 0; i < zoneCount; i++) {
							const zoneDataPosition = dataPosition + i * 16; // 16 Bytes pro Zone
							result[TYPES_REVERSE[type]].push(this.getForbiddenZone(buf, zoneDataPosition, offset1));
						}
						break;
					}
					case TYPES.OBSTACLES2:
						result[TYPES_REVERSE[type]] = this.extractObstacles(buf, dataPosition, offset1);
						break;
					case TYPES.CURRENTLY_CLEANED_BLOCKS: {
						const blockCount = this.getCount(buf, dataPosition);
						result[TYPES_REVERSE[type]] = [];

						for (let i = 0; i < blockCount; i++) {
							result[TYPES_REVERSE[type]].push(buf.readUInt8(OFFSETS.BLOCKS + dataPosition + i));
						}
						break;
					}
					case TYPES.UNKNOWN28:
					case TYPES.UNKNOWN29:
					case TYPES.UNKNOWN30:
					case TYPES.UNKNOWN31:
					case TYPES.UNKNOWN32:
					case TYPES.UNKNOWN33:
						break;
				}
			} else {
				this.adapter.log.warn(`Unknown block type! Please report this to the developer. Block type is: ${type} and a length of ${length}`);

				const analyzedBlock = await this.analyzeUnknownBlock(buf, dataPosition, offset1, offset2);
				if (analyzedBlock) this.adapter.log.warn(`Analyzed unknown block: ${JSON.stringify(analyzedBlock)}`);
			}
			dataPosition = dataPosition + length + hlength;
		}

		return result;
	}

	/**
	 *
	 * @param mapBuf {Buffer} Should contain map in RRMap Format
	 * @return {object}
	 */
	PARSE(mapBuf) {
		if (mapBuf && mapBuf[0x00] === 0x72 && mapBuf[0x01] === 0x72) {
			return {
				header_length: mapBuf.readUInt16LE(OFFSETS.HLENGTH),
				data_length: mapBuf.readUInt16LE(OFFSETS.LENGTH),
				version: {
					major: mapBuf.readUInt16LE(0x08),
					minor: mapBuf.readUInt16LE(0x0a),
				},
				map_index: mapBuf.readUInt16LE(OFFSETS.GENERIC),
				map_sequence: mapBuf.readUInt16LE(0x10),
			};
		} else {
			return {};
		}
	}

	extractObstacles(buf, dataPosition, offset) {
		const obstacleCount = this.getCount(buf, dataPosition);
		const obstacles = [];

		for (let i = 0; i < obstacleCount * 28; i += 28) {
			const obstacle = [
				buf.readUInt16LE(offset + dataPosition + i), // x
				buf.readUInt16LE(offset + dataPosition + i + 2), // y
				buf.readUInt16LE(offset + dataPosition + i + 4), // obstacle type
				buf.readUInt16LE(offset + dataPosition + i + 6), // confidence level
				buf.readUInt16LE(offset + dataPosition + i + 8), // unknown
				buf.readUInt16LE(offset + dataPosition + i + 10), // unknown
				buf.toString("utf-8", offset + dataPosition + i + 12, offset + dataPosition + i + 12 + 16), // photo id
			];
			obstacles.push(obstacle);
		}

		return obstacles;
	}

	getXYPositions(buf, dataPosition, xOffset, yOffset) {
		const xPosition = buf.readInt32LE(dataPosition + xOffset);
		const yPosition = buf.readInt32LE(dataPosition + yOffset);

		return [xPosition, yPosition];
	}

	getMapSizes(buf, dataPosition, offset) {
		const top = buf.readInt32LE(dataPosition + offset - 0x10);
		const left = buf.readInt32LE(dataPosition + offset - 0x0c);
		const height = buf.readInt32LE(dataPosition + offset - 0x08);
		const width = buf.readInt32LE(dataPosition + offset - 0x04);

		return [left, top, width, height];
	}

	getPointInPath(buf, dataPosition) {
		const result = [];
		for (let i = 0; i < 2; i++) {
			result.push(buf.readUInt16LE(dataPosition + OFFSETS.PATH + (i * 2)));
		}

		return result;
	}

	getCount(buf, dataPosition) {
		return buf.readUInt32LE(dataPosition + OFFSETS.TYPE_COUNT);
	}

	analyzeUnknownBlock(buf, dataPosition, offset1, offset2) {
		const length = buf.readUInt32LE(dataPosition + OFFSETS.LENGTH);

		const results = {};
		const analysisMethods = [
			{ name: "extractObstacles", method: this.extractObstacles },
			{ name: "getXYPositions", method: this.getXYPositions },
			{ name: "getCount", method: this.getCount },
			{ name: "getSingleByteOffset", method: this.getSingleByteOffset },
			{ name: "getTwoByteOffsets", method: this.getTwoByteOffsets },
		];

		const readMethods = [
			{ name: "readUInt16LE", method: this.readUInt16LE, count: 16 },
			{ name: "readInt32LE", method: this.readInt32LE, count: 16 },
			{ name: "readUInt32LE", method: this.readUInt32LE, count: 16 },
			{ name: "readUInt8", method: this.readUInt8, count: 16 },
		];

		// Analyzing using known methods
		for (const { name, method } of analysisMethods) {
			try {
				if (dataPosition < buf.length + 4) { // Offset is at least 2 bytes to fix out of bounds error
					const result = method.call(this, buf, dataPosition - 4, offset1, offset2);
					if (result) results[name] = result;
				}
			} catch (error) {
				this.adapter.log.warn(`Error applying method ${name} on unknown block: ${error.message}`);
			}
		}

		// Analyzing using known read methods
		for (const { name, method, count } of readMethods) {
			try {
				const endPosition = dataPosition + count * method.length; // method.length ist die Byte-Länge der zu lesenden Daten
				if (endPosition <= buf.length) {
					const result = method.call(this, buf, dataPosition, offset1, count);
					if (result && result.length > 0) results[`${name}_${count}`] = result;
				}
			} catch (error) {
				this.adapter.log.warn(`Error applying method ${name} with count ${count} on unknown block: ${error.message}`);
			}
		}

		// Analyzing using getPointInPath
		try {
			const points = [];
			for (let i = 0; i < length - dataPosition; i += 4) {
				if (dataPosition + i + 4 <= length) {
					points.push(this.getPointInPath(buf, dataPosition + i));
				}
			}
			if (points.length > 0) results.getPointInPath = points;
		} catch (error) {
			this.adapter.log.warn(`Error applying getPointInPath on unknown block: ${error.message}`);
		}

		this.adapter.log.warn(`Analysis results: ${JSON.stringify(results)}`);
		return results;
	}

	getPixelType(buf, dataPosition) {
		// Get the pixel type with bitwise AND operation of 0x07
		return buf.readUInt8(dataPosition) & 0x07;
	}

	getAngle(buf, dataPosition) {
		return buf.readInt32LE(dataPosition + OFFSETS.ANGLE);
	}

	getGoToTarget(buf, dataPosition) {
		return [buf.readUInt16LE(OFFSETS.TARGET_X + dataPosition), buf.readUInt16LE(OFFSETS.TARGET_Y + dataPosition)];
	}

	getForbiddenZone(buf, dataPosition, offset) {
		return this.readUInt16LE(buf, dataPosition, offset, 8);
	}

	getSingleByteOffset(buf, dataPosition) {
		return buf.readUInt8(dataPosition + 2);
	}

	getTwoByteOffsets(buf, dataPosition) {
		return [buf.readUInt8(dataPosition + 2), buf.readUInt8(dataPosition + 4)];
	}

	getDatatype(buf, offset) {
		// Get the first byte of the block
		const byte = buf[offset];

		// Check the byte value
		if (byte >= 0x00 && byte <= 0xff) {
			// It's an unsigned byte
			return "UInt8";
		} else if (byte >= 0x00 && byte <= 0xffff) {
			// It's an unsigned 16-bit little-endian integer
			return "UInt16LE";
		} else if (byte >= 0x00 && byte <= 0xffffffff) {
			// It's an unsigned 32-bit little-endian integer
			return "UInt32LE";
		} else {
			// It's an unknown type
			return "Unknown";
		}
	}

	readUInt16LE(buf, dataPosition, offset, count) {
		const result = [];
		for (let j = 0; j < count; j++) {
			result.push(buf.readUInt16LE(dataPosition + offset + (j * 2)));
		}
		return result;
	}

	readInt32LE(buf, dataPosition, offset, count) {
		const array = [];
		for (let j = 0; j < count; j++) {
			array.push(buf.readInt32LE(offset + dataPosition + j * 4));
		}
		return array;
	}

	readUInt32LE(buf,  dataPosition, offset, count) {
		const array = [];
		for (let j = 0; j < count; j++) {
			array.push(buf.readUInt32LE(offset + dataPosition + j * 4));
		}
		return array;
	}

	readUInt8(buf, dataPosition, offset, count) {
		const array = [];
		for (let j = 0; j < count; j++) {
			array.push(buf.readUInt8(offset + dataPosition + j));
		}
		return array;
	}
}

module.exports = RRMapParser;
