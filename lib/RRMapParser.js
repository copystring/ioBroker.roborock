"use strict";

class RRMapParser {
	constructor(adapter) {
		this.adapter = adapter;

		this.TYPES = {
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
			CARPET_FORBIDDEN: 19,
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
			DIGEST: 1024
		};

		this.TYPES_REVERSE = Object.fromEntries(
			Object.entries(this.TYPES).map(([key, value]) => [value, key])
		);

	}

	async parsedata(buf) {
		if (!this.PARSE(buf).map_index) {
			this.adapter.log.error("RRMapParser: Failed to parse map data. map_index was missing");
			return {};
		}

		let offset = 0x14;
		const result = {};
		let parameters = {};

		let carpet;
		let mopactive;
		let points;
		let zoneCount;
		let zones;
		let forbiddenZoneCount, forbiddenZones;
		let noMopZoneCount, noMopZones;
		let carpetForbiddenCount, carpetForbiddenZones;
		let wallCount;
		let obstacleCount, obstacles;
		let walls;
		let blockCount;
		let blocks;


		while (offset < buf.length) {
			let g3offset = 0;

			const type = buf.readUInt16LE(0x00 + offset);
			const hlength = buf.readUInt16LE(0x02 + offset);
			const length = buf.readUInt32LE(0x04 + offset);
			//console.log('type' + type + 'länge: ' + length);

			if (this.TYPES_REVERSE[type]) {
				switch (type) {

					case this.TYPES.ROBOT_POSITION:
					case this.TYPES.CHARGER_LOCATION:
						result[this.TYPES_REVERSE[type]] = {
							position: [
								buf.readUInt16LE(0x08 + offset),
								buf.readUInt16LE(0x0c + offset)
							],
							angle: length >= 12 ? buf.readInt32LE(0x10 + offset) : 0 // gen3+
						};
						this.adapter.log.debug("Block type processed: " + type);
						break;

					case this.TYPES.IMAGE:
						if (hlength > 24) { // gen3+
							g3offset = 4;
						}
						parameters = {
							segments: {
								count: g3offset ? buf.readInt32LE(0x08 + offset) : 0,
								id: [],
							},
							position: {
								top: buf.readInt32LE(0x08 + g3offset + offset),
								left: buf.readInt32LE(0x0c + g3offset + offset)
							},
							dimensions: {
								height: buf.readInt32LE(0x10 + g3offset + offset),
								width: buf.readInt32LE(0x14 + g3offset + offset)
							},
							pixels: {
								floor: [],
								obstacle: [],
								segments: [],
							}
						};

						if (parameters.dimensions.height > 0 && parameters.dimensions.width > 0) {
							for (let s, i = 0; i < length; i++) {
								switch (buf.readUInt8(0x18 + g3offset + offset + i) & 0x07) {
									case 0:
										break;

									case 1:
										parameters.pixels.obstacle.push(i);
										break;

									default:
										parameters.pixels.floor.push(i);
										s = (buf.readUInt8(0x18 + g3offset + offset + i) & 248) >> 3;
										if (s !== 0) {
											if (!parameters.segments.id.includes(s)) parameters.segments.id.push(s);
											parameters.pixels.segments.push(i | (s << 21));
										}
										break;
								}
							}
						}
						result[this.TYPES_REVERSE[type]] = parameters;
						this.adapter.log.debug("Block type processed: " + type);
						break;

					case this.TYPES.CARPET_MAP:
						if (hlength > 24) { // gen3+
							g3offset = 4;
						}
						carpet = [];

						for (let i = 0; i < length; i++) {
							switch (buf.readUInt8(0x18 + offset + i) & 0x07) {
								case 0:
									break;

								case 1:
									carpet.push(i);
									break;

								default:
									break;
							}
						}
						result[this.TYPES_REVERSE[type]] = carpet;
						this.adapter.log.debug("Block type processed: " + type);
						break;

					case this.TYPES.MOP_PATH:
						mopactive = [];
						for (let i = 0; i < length; i++) {
							mopactive.push(buf.readUInt8(0x14 + offset + i));
						}
						result[this.TYPES_REVERSE[type]] = mopactive;

						this.adapter.log.debug("Block type processed: " + type);
						break;
					case this.TYPES.PATH:
					case this.TYPES.GOTO_PATH:
					case this.TYPES.GOTO_PREDICTED_PATH:
						points = [];
						for (let i = 0; i < length; i = i + 4) {
							//to draw these coordinates onto the map pixels, they have to be divided by 50
							points.push(this.readDouble(buf, offset, i));
						}
						result[this.TYPES_REVERSE[type]] = {
							//point_count: buf.readUInt32LE(0x08 + offset),
							//point_size: buf.readUInt32LE(0x0c + offset),
							current_angle: buf.readUInt32LE(0x10 + offset), //This is always 0. Roborock didn't bother
							points: points
						};
						this.adapter.log.debug("Block type processed: " + type);
						break;

					case this.TYPES.GOTO_TARGET:
						result[this.TYPES_REVERSE[type]] = {
							position: [
								buf.readUInt16LE(0x08 + offset),
								buf.readUInt16LE(0x0a + offset)
							]
						};
						this.adapter.log.debug("Block type processed: " + type);
						break;

					case this.TYPES.CURRENTLY_CLEANED_ZONES:
						zoneCount = buf.readUInt32LE(0x08 + offset);
						zones = [];
						if (zoneCount > 0) {
							for (let i = 0; i < length; i = i + 8) {
								zones.push(this.readQuadruple(buf, offset, i));
							}

							result[this.TYPES_REVERSE[type]] = zones;
						}
						this.adapter.log.debug("Block type processed: " + type);
						break;

					case this.TYPES.FORBIDDEN_ZONES:
						forbiddenZoneCount = buf.readUInt32LE(0x08 + offset);
						forbiddenZones = [];
						if (forbiddenZoneCount > 0) {
							for (let i = 0; i < length; i = i + 16) {
								forbiddenZones.push(this.readOctuple(buf, offset, i));
							}

							result[this.TYPES_REVERSE[type]] = forbiddenZones;
						}
						this.adapter.log.debug("Block type processed: " + type);
						break;

					case this.TYPES.VIRTUAL_WALLS:
						wallCount = buf.readUInt32LE(0x08 + offset);
						walls = [];
						if (wallCount > 0) {
							for (let i = 0; i < length; i = i + 8) {
								walls.push(this.readQuadruple(buf, offset, i));
							}

							result[this.TYPES_REVERSE[type]] = walls;
						}
						this.adapter.log.debug("Block type processed: " + type);
						break;

					case this.TYPES.NO_MOP_ZONE:
						noMopZoneCount = buf.readUInt32LE(0x08 + offset);
						noMopZones = [];
						if (noMopZoneCount > 0) {
							for (let i = 0; i < length; i = i + 16) {
								noMopZones.push(this.readOctuple(buf, offset, i));
							}

							result[this.TYPES_REVERSE[type]] = noMopZones;
						}
						this.adapter.log.debug("Block type processed: " + type);
						break;


					case this.TYPES.CARPET_FORBIDDEN:
						carpetForbiddenCount = buf.readUInt32LE(0x08 + offset);
						carpetForbiddenZones = [];
						if (carpetForbiddenCount > 0) {
							for (let i = 0; i < length; i = i + 16) {
								carpetForbiddenZones.push(this.readOctuple(buf, offset, i));
							}

							result[this.TYPES_REVERSE[type]] = carpetForbiddenZones;
						}
						this.adapter.log.debug("Block type processed: " + type);
						break;

					case this.TYPES.OBSTACLES2:
						obstacleCount = buf.readUInt32LE(0x08 + offset);
						obstacles = [];
						if (obstacleCount > 0) {
							for (let i = 0; i < length; i += 28) {
								obstacles.push([
									buf.readUInt16LE(0x0c + offset + i), // x
									buf.readUInt16LE(0x0c + offset + i + 2), // y
									buf.readUInt16LE(0x0c + offset + i + 4), // obstacle type
									buf.readUInt16LE(0x0c + offset + i + 6), // confidence level
									buf.readUInt16LE(0x0c + offset + i + 8), // unknown
									buf.readUInt16LE(0x0c + offset + i + 10), // unknown
									buf.slice(0x0c + offset + i + 12, 0x0c + offset + i + 12 + 16).toString("utf-8") // photo id
								]);
							}

							result[this.TYPES_REVERSE[type]] = obstacles;
						}
						this.adapter.log.debug("Block type processed: " + type);
						break;

					case this.TYPES.CURRENTLY_CLEANED_BLOCKS:
						blockCount = buf.readUInt32LE(0x08 + offset);
						blocks = [];
						if (blockCount > 0) {
							for (let i = 0; i < length; i++) {
								blocks.push(buf.readUInt8(0x0c + offset + i));
							}
							result[this.TYPES_REVERSE[type]] = blocks;
						}
						this.adapter.log.debug("Block type processed: " + type);
						break;

					case this.TYPES.UNKNOWN28:
						this.adapter.log.debug("Block type processed: " + type);
						break;

					case this.TYPES.UNKNOWN29:
						this.adapter.log.debug("Block type processed: " + type);
						break;

					case this.TYPES.UNKNOWN30:
						this.adapter.log.debug("Block type processed: " + type);
						break;

					case this.TYPES.UNKNOWN31:
						this.adapter.log.debug("Block type processed: " + type);
						break;

					case this.TYPES.UNKNOWN32:
						this.adapter.log.debug("Block type processed: " + type);
						break;

					case this.TYPES.UNKNOWN33:
						this.adapter.log.debug("Block type processed: " + type);
						break;
				}
			}
			else {
				this.adapter.log.warn("Unknown block type! Please report this to the developer. Block type is:" + type);
			}
			offset = offset + length + hlength;
		}

		if (result[this.TYPES.IMAGE]) { //We need the image to flip everything else correctly
			result.image = result[this.TYPES.IMAGE];
			result.image.pixels.carpet = result[this.TYPES.CARPET_MAP];
			[{
				type: this.TYPES.PATH,
				path: "path"
			},
			{
				type: this.TYPES.GOTO_PREDICTED_PATH,
				path: "goto_predicted_path"
			},
			{
				type: this.TYPES.MOP_PATH,
				path: "mop_path"
			},
			].forEach(item => {
				if (result[item.type]) {
					result[item.path] = result[item.type];
					if (result[item.path].points) {
						result[item.path].points = result[item.path].points.map(point => {
							return point;
						});
					} else {
						result[item.path].points = [];
					}

					if (result[item.path].points.length >= 2) {
						result[item.path].current_angle =
						Math.atan2(
							result[item.path].points[result[item.path].points.length - 1][1] -
							result[item.path].points[result[item.path].points.length - 2][1],

							result[item.path].points[result[item.path].points.length - 1][0] -
							result[item.path].points[result[item.path].points.length - 2][0]

						) * 180 / Math.PI;
					}
				}
			});
		}

		return result;
	}

	/**
	*
	* @param mapBuf {Buffer} Should contain map in RRMap Format
	* @return {object}
	*/
	PARSE(mapBuf) {
		if (mapBuf && mapBuf[0x00] === 0x72 && mapBuf[0x01] === 0x72) { // rr
			const parsedMapData = {
				header_length: mapBuf.readUInt16LE(0x02),
				data_length: mapBuf.readUInt16LE(0x04),
				version: {
					major: mapBuf.readUInt16LE(0x08),
					minor: mapBuf.readUInt16LE(0x0A)
				},
				map_index: mapBuf.readUInt16LE(0x0C),
				map_sequence: mapBuf.readUInt16LE(0x10)
			};
			return parsedMapData;
		} else {
			return {};
		}
	}

	readDouble(buf, offset, i)
	{
		return [
			buf.readUInt16LE(0x14 + offset + i),
			buf.readUInt16LE(0x14 + offset + i + 2)
		];
	}

	readQuadruple(buf, offset, i)
	{
		return [
			buf.readUInt16LE(0x0c + offset + i),
			buf.readUInt16LE(0x0c + offset + i + 2),
			buf.readUInt16LE(0x0c + offset + i + 4),
			buf.readUInt16LE(0x0c + offset + i + 6)
		];
	}

	readOctuple(buf, offset, i)
	{
		return [
			buf.readUInt16LE(0x0c + offset + i),
			buf.readUInt16LE(0x0c + offset + i + 2),
			buf.readUInt16LE(0x0c + offset + i + 4),
			buf.readUInt16LE(0x0c + offset + i + 6),
			buf.readUInt16LE(0x0c + offset + i + 8),
			buf.readUInt16LE(0x0c + offset + i + 10),
			buf.readUInt16LE(0x0c + offset + i + 12),
			buf.readUInt16LE(0x0c + offset + i + 14)
		];
	}
}

module.exports = RRMapParser;