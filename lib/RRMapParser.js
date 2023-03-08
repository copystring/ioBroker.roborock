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
			OBSTACLES3: 15,
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
			DIGEST: 1024
		};

		this.parameters = {};
	}

	PARSEBLOCK(buf, offset) {
		const result = {};

		let carpet;
		let mopactive;
		let points;
		let zoneCount;
		let zones;
		let forbiddenZoneCount;
		let forbiddenZones;
		let wallCount;
		let walls;
		let blockCount;
		let blocks;


		while (offset < buf.length) {
			let g3offset = 0;

			const type = buf.readUInt16LE(0x00 + offset);
			const hlength = buf.readUInt16LE(0x02 + offset);
			const length = buf.readUInt32LE(0x04 + offset);
			//console.log('type' + type + 'länge: ' + length);

			switch (type) {

				case this.TYPES.ROBOT_POSITION:
				case this.TYPES.CHARGER_LOCATION:
					result[type] = {
						position: [
							buf.readUInt16LE(0x08 + offset),
							buf.readUInt16LE(0x0c + offset)
						],
						angle: length >= 12 ? buf.readInt32LE(0x10 + offset) : 0 // gen3+
					};
					break;

				case this.TYPES.IMAGE:
					if (hlength > 24) { // gen3+
						g3offset = 4;
					}
					this.parameters = {
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

					if (this.parameters.dimensions.height > 0 && this.parameters.dimensions.width > 0) {
						for (let s, i = 0; i < length; i++) {
							switch (buf.readUInt8(0x18 + g3offset + offset + i) & 0x07) {
								case 0:
									break;

								case 1:
									this.parameters.pixels.obstacle.push(i);
									break;

								default:
									this.parameters.pixels.floor.push(i);
									s = (buf.readUInt8(0x18 + g3offset + offset + i) & 248) >> 3;
									if (s !== 0) {
										if (!this.parameters.segments.id.includes(s)) this.parameters.segments.id.push(s);
										this.parameters.pixels.segments.push(i | (s << 21));
									}
									break;
							}
						}
					}
					result[type] = this.parameters;
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
					result[type] = carpet;
					break;

				case this.TYPES.MOP_PATH:
					mopactive = [];
					for (let i = 0; i < length; i++) {
						mopactive.push(buf.readUInt8(0x14 + offset + i));
					}
					result[type] = mopactive;

					break;
				case this.TYPES.PATH:
				case this.TYPES.GOTO_PATH:
				case this.TYPES.GOTO_PREDICTED_PATH:
					points = [];
					for (let i = 0; i < length; i = i + 4) {
					//to draw these coordinates onto the map pixels, they have to be divided by 50
						points.push([
							buf.readUInt16LE(0x14 + offset + i),
							buf.readUInt16LE(0x14 + offset + i + 2)
						]);
					}
					result[type] = {
					//point_count: buf.readUInt32LE(0x08 + offset),
					//point_size: buf.readUInt32LE(0x0c + offset),
						current_angle: buf.readUInt32LE(0x10 + offset), //This is always 0. Roborock didn't bother
						points: points
					};
					break;

				case this.TYPES.GOTO_TARGET:
					result[type] = {
						position: [
							buf.readUInt16LE(0x08 + offset),
							buf.readUInt16LE(0x0a + offset)
						]
					};
					break;

				case this.TYPES.CURRENTLY_CLEANED_ZONES:
					zoneCount = buf.readUInt32LE(0x08 + offset);
					zones = [];
					if (zoneCount > 0) {
						for (let i = 0; i < length; i = i + 8) {
							zones.push([
								buf.readUInt16LE(0x0c + offset + i),
								buf.readUInt16LE(0x0c + offset + i + 2),
								buf.readUInt16LE(0x0c + offset + i + 4),
								buf.readUInt16LE(0x0c + offset + i + 6)
							]);
						}

						result[type] = zones;
					}
					break;

				case this.TYPES.FORBIDDEN_ZONES:
					forbiddenZoneCount = buf.readUInt32LE(0x08 + offset);
					forbiddenZones = [];
					if (forbiddenZoneCount > 0) {
						for (let i = 0; i < length; i = i + 16) {
							forbiddenZones.push([
								buf.readUInt16LE(0x0c + offset + i),
								buf.readUInt16LE(0x0c + offset + i + 2),
								buf.readUInt16LE(0x0c + offset + i + 4),
								buf.readUInt16LE(0x0c + offset + i + 6),
								buf.readUInt16LE(0x0c + offset + i + 8),
								buf.readUInt16LE(0x0c + offset + i + 10),
								buf.readUInt16LE(0x0c + offset + i + 12),
								buf.readUInt16LE(0x0c + offset + i + 14)
							]);
						}

						result[type] = forbiddenZones;
					}
					break;
				case this.TYPES.VIRTUAL_WALLS:
					wallCount = buf.readUInt32LE(0x08 + offset);
					walls = [];
					if (wallCount > 0) {
						for (let i = 0; i < length; i = i + 8) {
							walls.push([
								buf.readUInt16LE(0x0c + offset + i),
								buf.readUInt16LE(0x0c + offset + i + 2),
								buf.readUInt16LE(0x0c + offset + i + 4),
								buf.readUInt16LE(0x0c + offset + i + 6)
							]);
						}

						result[type] = walls;
					}
					break;
				case this.TYPES.CURRENTLY_CLEANED_BLOCKS:
					blockCount = buf.readUInt32LE(0x08 + offset);
					blocks = [];
					if (blockCount > 0) {
						for (let i = 0; i < length; i++) {
							blocks.push(buf.readUInt8(0x0c + offset + i));
						}
						result[type] = blocks;
					}
					break;

				default:
					this.adapter.log.warn("Unknown block type! Please report this to the developer. Block type is:" + type);
			}
			offset = offset + length + hlength;
		}
		return result;
	}

	async parsedata(mapBuf) {
		if (!this.PARSE(mapBuf).map_index) {
			return {};
		}
		const blocks = this.PARSEBLOCK(mapBuf, 0x14);
		const parsedMapData = {};
		if (blocks[this.TYPES.IMAGE]) { //We need the image to flip everything else correctly
			parsedMapData.image = blocks[this.TYPES.IMAGE];
			parsedMapData.image.pixels.carpet = blocks[this.TYPES.CARPET_MAP];
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
				if (blocks[item.type]) {
					parsedMapData[item.path] = blocks[item.type];
					if (parsedMapData[item.path].points) {
						parsedMapData[item.path].points = parsedMapData[item.path].points.map(point => {
							return point;
						});
					} else {
						parsedMapData[item.path].points = [];
					}

					if (parsedMapData[item.path].points.length >= 2) {
						parsedMapData[item.path].current_angle =
						Math.atan2(
							parsedMapData[item.path].points[parsedMapData[item.path].points.length - 1][1] -
							parsedMapData[item.path].points[parsedMapData[item.path].points.length - 2][1],

							parsedMapData[item.path].points[parsedMapData[item.path].points.length - 1][0] -
							parsedMapData[item.path].points[parsedMapData[item.path].points.length - 2][0]

						) * 180 / Math.PI;
					}
				}
			});

			parsedMapData.charger = blocks[this.TYPES.CHARGER_LOCATION] ? { ...blocks[this.TYPES.CHARGER_LOCATION] } : null;

			if (blocks[this.TYPES.ROBOT_POSITION]) {
				parsedMapData.robot = blocks[this.TYPES.ROBOT_POSITION].position;
			}
			if (blocks[this.TYPES.GOTO_TARGET]) {
				parsedMapData.goto_target = blocks[this.TYPES.GOTO_TARGET].position;
			}
			if (blocks[this.TYPES.CURRENTLY_CLEANED_ZONES]) {
				parsedMapData.currently_cleaned_zones = blocks[this.TYPES.CURRENTLY_CLEANED_ZONES];
				if (!parsedMapData.currently_cleaned_zones) {
					parsedMapData.currently_cleaned_zones = [];
				}
			}
			if (blocks[this.TYPES.FORBIDDEN_ZONES]) {
				parsedMapData.forbidden_zones = blocks[this.TYPES.FORBIDDEN_ZONES];
				if (!parsedMapData.forbidden_zones) {
					parsedMapData.forbidden_zones = [];
				}
			}
			if (blocks[this.TYPES.VIRTUAL_WALLS]) {
				parsedMapData.virtual_walls = blocks[this.TYPES.VIRTUAL_WALLS];
				if (!parsedMapData.virtual_walls) {
					parsedMapData.virtual_walls = [];
				}
			}
			if (blocks[this.TYPES.CURRENTLY_CLEANED_BLOCKS]) {
				parsedMapData.currently_cleaned_blocks = blocks[this.TYPES.CURRENTLY_CLEANED_BLOCKS];
			}
		}

		return parsedMapData;
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
}

module.exports = RRMapParser;