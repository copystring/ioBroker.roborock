const RRMapParser = function () {};

RRMapParser.TYPES = {
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

let parameters = {};

RRMapParser.PARSEBLOCK = function parseBlock(buf, offset, result) {
	result = result || {};
	if (buf.length <= offset) {
		return result;
	}
	let g3offset = 0;

	const type = buf.readUInt16LE(0x00 + offset);
	const hlength = buf.readUInt16LE(0x02 + offset);
	const length = buf.readUInt32LE(0x04 + offset);
	//console.log('type' + type + 'länge: ' + length);

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

	switch (type) {

		case RRMapParser.TYPES.ROBOT_POSITION:
		case RRMapParser.TYPES.CHARGER_LOCATION:
			result[type] = {
				position: [
					buf.readUInt16LE(0x08 + offset),
					buf.readUInt16LE(0x0c + offset)
				],
				angle: length >= 12 ? buf.readInt32LE(0x10 + offset) : 0 // gen3+
			};
			break;

		case RRMapParser.TYPES.IMAGE:
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

			// parameters.position.top = Tools.DIMENSION_PIXELS - parameters.position.top - parameters.dimensions.height;

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
			result[type] = parameters;
			break;

		case RRMapParser.TYPES.CARPET_MAP:
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

		case RRMapParser.TYPES.MOP_PATH:
			mopactive = [];
			for (let i = 0; i < length; i++) {
				mopactive.push(buf.readUInt8(0x14 + offset + i));
			}
			result[type] = mopactive;

			break;
		case RRMapParser.TYPES.PATH:
		case RRMapParser.TYPES.GOTO_PATH:
		case RRMapParser.TYPES.GOTO_PREDICTED_PATH:
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

		case RRMapParser.TYPES.GOTO_TARGET:
			result[type] = {
				position: [
					buf.readUInt16LE(0x08 + offset),
					buf.readUInt16LE(0x0a + offset)
				]
			};
			break;

		case RRMapParser.TYPES.CURRENTLY_CLEANED_ZONES:
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

		case RRMapParser.TYPES.FORBIDDEN_ZONES:
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
		case RRMapParser.TYPES.VIRTUAL_WALLS:
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
		case RRMapParser.TYPES.CURRENTLY_CLEANED_BLOCKS:
			blockCount = buf.readUInt32LE(0x08 + offset);
			blocks = [];
			if (blockCount > 0) {
				for (let i = 0; i < length; i++) {
					blocks.push(buf.readUInt8(0x0c + offset + i));
				}
				result[type] = blocks;
			}
			break;
	}
	return parseBlock(buf, offset + length + hlength, result);
};

/**
 *
 * @param mapBuf {Buffer} Should contain map in RRMap Format
 * @return {object}
 */
RRMapParser.PARSE = function parse(mapBuf) {
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
};

RRMapParser.PARSEDATA = function parseData(mapBuf) {
	if (!this.PARSE(mapBuf).map_index) {
		return null;
	}
	const blocks = RRMapParser.PARSEBLOCK(mapBuf, 0x14);
	const parsedMapData = {};
	if (blocks[RRMapParser.TYPES.IMAGE]) { //We need the image to flip everything else correctly
		parsedMapData.image = blocks[RRMapParser.TYPES.IMAGE];
		parsedMapData.image.pixels.carpet = blocks[RRMapParser.TYPES.CARPET_MAP];
		[{
			type: RRMapParser.TYPES.PATH,
			path: "path"
		},
		{
			type: RRMapParser.TYPES.GOTO_PREDICTED_PATH,
			path: "goto_predicted_path"
		},
		{
			type: RRMapParser.TYPES.MOP_PATH,
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
		if (blocks[RRMapParser.TYPES.CHARGER_LOCATION]) {
			parsedMapData.charger = blocks[RRMapParser.TYPES.CHARGER_LOCATION].position;
		}
		if (blocks[RRMapParser.TYPES.ROBOT_POSITION]) {
			parsedMapData.robot = blocks[RRMapParser.TYPES.ROBOT_POSITION].position;
		}
		if (blocks[RRMapParser.TYPES.GOTO_TARGET]) {
			parsedMapData.goto_target = blocks[RRMapParser.TYPES.GOTO_TARGET].position;
		}
		if (blocks[RRMapParser.TYPES.CURRENTLY_CLEANED_ZONES]) {
			parsedMapData.currently_cleaned_zones = blocks[RRMapParser.TYPES.CURRENTLY_CLEANED_ZONES];
			if (!parsedMapData.currently_cleaned_zones) {
				parsedMapData.currently_cleaned_zones = [];
			}
		}
		if (blocks[RRMapParser.TYPES.FORBIDDEN_ZONES]) {
			parsedMapData.forbidden_zones = blocks[RRMapParser.TYPES.FORBIDDEN_ZONES];
			if (!parsedMapData.forbidden_zones) {
				parsedMapData.forbidden_zones = [];
			}
		}
		if (blocks[RRMapParser.TYPES.VIRTUAL_WALLS]) {
			parsedMapData.virtual_walls = blocks[RRMapParser.TYPES.VIRTUAL_WALLS];
			if (!parsedMapData.virtual_walls) {
				parsedMapData.virtual_walls = [];
			}
		}
		if (blocks[RRMapParser.TYPES.CURRENTLY_CLEANED_BLOCKS]) {
			parsedMapData.currently_cleaned_blocks = blocks[RRMapParser.TYPES.CURRENTLY_CLEANED_BLOCKS];
		}
	}

	return parsedMapData;
};

module.exports = RRMapParser;