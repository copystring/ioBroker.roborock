import { createCipheriv, createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { deflateSync } from "node:zlib";

import { parse } from "protobufjs";

import { ROBOROCK_PROTO_STR } from "../../src/lib/map/b01/roborock_proto";

export const Q7_FULL_SCENE_MODEL = "roborock.vacuum.sc01";
export const Q7_FULL_SCENE_SERIAL = "SC01SYNTHETIC001";
export const Q7_FULL_SCENE_MAP_ID = 424_242;
export const Q7_FULL_SCENE_FIRMWARE = "02.24.90";

export interface Q7FullSceneFixture {
	blob: Buffer;
	replayManifest: Readonly<Record<string, unknown>>;
}

interface GridPoint {
	x: number;
	y: number;
	value: number;
}

const MAP_WIDTH = 300;
const MAP_HEIGHT = 320;
const MAP_MIN_X = -5;
const MAP_MIN_Y = -5;
const MAP_RESOLUTION = 0.05;
const OUTER_WALL = 0xffff_ffff;

function deriveMapKey(serial: string, model: string): Buffer {
	const modelSuffix = model.includes(".") ? model.split(".").at(-1) as string : model;
	let paddedSuffix = modelSuffix;
	while (paddedSuffix.length < 16) paddedSuffix += "0";
	const seedKey = Buffer.from(paddedSuffix.slice(0, 16), "utf8");
	const input = Buffer.from(`${serial}+${modelSuffix}+${serial}`, "utf8");
	const paddingLength = 16 - (input.length % 16);
	const paddedInput = Buffer.concat([input, Buffer.alloc(paddingLength, paddingLength)]);
	const cipher = createCipheriv("aes-128-ecb", seedKey, null);
	cipher.setAutoPadding(false);
	const encryptedSeed = Buffer.concat([cipher.update(paddedInput), cipher.final()]);
	const digest = createHash("md5").update(encryptedSeed.toString("base64")).digest("hex");
	return Buffer.from(digest.slice(8, 24).toLowerCase(), "utf8");
}

function boundaryValue(x: number, y: number): number {
	if (x === 150 && y >= 80 && y <= 190) return 0;
	if (x === 190 && y >= 80 && y < 135) return 1;
	if (x === 190 && y > 135 && y <= 190) return 2;
	return OUTER_WALL;
}

function roomPerimeter(x0: number, y0: number, x1: number, y1: number): GridPoint[] {
	const points: GridPoint[] = [];
	for (let x = x0; x <= x1; x += 1) points.push({ x, y: y0, value: boundaryValue(x, y0) });
	for (let y = y0 + 1; y <= y1; y += 1) points.push({ x: x1, y, value: boundaryValue(x1, y) });
	for (let x = x1 - 1; x >= x0; x -= 1) points.push({ x, y: y1, value: boundaryValue(x, y1) });
	for (let y = y1 - 1; y > y0; y -= 1) points.push({ x: x0, y, value: boundaryValue(x0, y) });
	return points;
}

function world(gridCoordinate: number, minimum: number): number {
	return minimum + gridCoordinate * MAP_RESOLUTION;
}

function createOccupancyMap(): Buffer {
	const data = Buffer.alloc(MAP_WIDTH * MAP_HEIGHT);
	for (let y = 70; y <= 200; y += 1) {
		for (let x = 60; x <= 240; x += 1) {
			const border = x < 63 || x > 237 || y < 73 || y > 197;
			data[y * MAP_WIDTH + x] = border ? 128 : 127;
		}
	}
	return data;
}

function createRobotMap(): Readonly<Record<string, unknown>> {
	const rooms = [
		{ roomId: 10, roomName: "Raum1", colorId: 1, center: [110, 135], bounds: [70, 80, 150, 190] },
		{ roomId: 11, roomName: "Raum2", colorId: 2, center: [170, 135], bounds: [150, 80, 190, 190] },
		{ roomId: 12, roomName: "Raum3", colorId: 3, center: [210, 107], bounds: [190, 80, 230, 135] },
		{ roomId: 13, roomName: "Raum4", colorId: 4, center: [210, 162], bounds: [190, 135, 230, 190] },
	] as const;
	return {
		mapType: 0,
		mapExtInfo: {
			taskBeginDate: 0,
			mapUploadDate: 0,
			mapValid: 1,
			radian: 0,
			force: 0,
			cleanPath: 1,
			boudaryInfo: {
				mapMd5: "synthetic-q7-full-scene",
				vMinX: 60,
				vMaxX: 240,
				vMinY: 70,
				vMaxY: 200,
			},
			mapVersion: 1,
			mapValueType: 0,
		},
		mapHead: {
			mapHeadId: Q7_FULL_SCENE_MAP_ID,
			sizeX: MAP_WIDTH,
			sizeY: MAP_HEIGHT,
			minX: MAP_MIN_X,
			minY: MAP_MIN_Y,
			maxX: MAP_MIN_X + MAP_WIDTH * MAP_RESOLUTION,
			maxY: MAP_MIN_Y + MAP_HEIGHT * MAP_RESOLUTION,
			resolution: MAP_RESOLUTION,
		},
		mapData: { mapData: createOccupancyMap() },
		mapInfo: [
			{ mapHeadId: Q7_FULL_SCENE_MAP_ID, mapName: "Etage 1", force: 0 },
			{ mapHeadId: Q7_FULL_SCENE_MAP_ID + 1, mapName: "Etage 2", force: 0 },
		],
		historyPose: {
			poseId: 2,
			points: [
				{ update: 0, x: 0, y: 0 },
				{ update: 0, x: 1.5, y: 1 },
				{ update: 0, x: 3, y: 3.5 },
			],
		},
		chargeStation: { x: -1.5, y: -1.5, phi: 0 },
		currentPose: { poseId: 2, update: 0, x: 3, y: 3.5, phi: 0.6 },
		virtualWalls: [{
			status: 0,
			type: 3,
			areaIndex: 1,
			points: [
				{ x: 1, y: 1 },
				{ x: 1, y: 2 },
				{ x: 3, y: 2 },
				{ x: 3, y: 1 },
			],
		}],
		areasInfo: [],
		navigationPoints: [{ pointId: 1, status: 0, pointType: 1, x: 4_500, y: 5_000, phi: 0 }],
		roomDataInfo: rooms.map(room => ({
			roomId: room.roomId,
			roomName: room.roomName,
			roomTypeId: 2020,
			meterialId: 0,
			cleanState: 0,
			roomClean: 0,
			roomCleanIndex: room.roomId,
			roomNamePost: {
				x: world(room.center[0], MAP_MIN_X),
				y: world(room.center[1], MAP_MIN_Y),
			},
			cleanPerfer: { cleanMode: 0, waterLevel: 102, windPower: 102, twiceClean: 0, carpet: 0 },
			colorId: room.colorId,
			floor_direction: 0,
			global_seq: room.roomId,
		})),
		roomMatrix: { matrix: Buffer.from([
			0, 1, 0, 0,
			1, 0, 2, 3,
			0, 2, 0, 0,
			0, 3, 0, 0,
		]) },
		roomChain: rooms.map(room => ({
			roomId: room.roomId,
			points: roomPerimeter(...room.bounds),
			door_info: [],
		})),
		objects: [],
		furnitureInfo: [],
		houseInfos: [],
		backupAreas: [],
		sillInfo: [],
		carpetInfo: [],
		recmForbitZone: [],
		map_hide: [],
	};
}

function encodeTransportBlob(robotMap: Readonly<Record<string, unknown>>): Buffer {
	const root = parse(ROBOROCK_PROTO_STR).root;
	const robotMapType = root.lookupType("SCMap.RobotMap");
	const verificationError = robotMapType.verify(robotMap);
	if (verificationError) throw new Error(`Synthetische Q7-Karte ist ungültig: ${verificationError}`);
	const protobuf = Buffer.from(robotMapType.encode(robotMapType.create(robotMap)).finish());
	const compressed = deflateSync(protobuf, { level: 9 });
	const hexTransport = Buffer.from(compressed.toString("hex"), "ascii");
	const cipher = createCipheriv("aes-128-ecb", deriveMapKey(Q7_FULL_SCENE_SERIAL, Q7_FULL_SCENE_MODEL), null);
	const encrypted = Buffer.concat([cipher.update(hexTransport), cipher.final()]);
	return Buffer.from(encrypted.toString("base64"), "ascii");
}

function propGetPayload(): Readonly<Record<string, unknown>> {
	return {
		status: 1,
		fault: 0,
		wind: 102,
		water: 102,
		mode: 0,
		quantity: 1,
		repeat_state: 1,
		tank_state: 1,
		sweep_type: 0,
		clean_path_preference: 0,
		cloth_state: 1,
		time_zone: 0,
		time_zone_info: "Europe/Berlin",
		language: 4,
		cleaning_time: 0,
		real_clean_time: 0,
		cleaning_area: 0,
		custom_type: 0,
		work_mode: 0,
		charge_state: 0,
		current_map_id: Q7_FULL_SCENE_MAP_ID,
		map_num: 2,
		dust_action: 0,
		quiet_is_open: 0,
		clean_finish: 0,
		build_map: 0,
		dust_frequency: 1,
		multi_floor: 1,
		map_save: 1,
		green_laser: 0,
		dust_bag_used: 0,
		back_to_wash: 0,
		pv_cut_charge: 0,
		pv_charging: 0,
		recommend: [],
		add_sweep_status: 0,
	};
}

export function buildQ7FullSceneFixture(): Q7FullSceneFixture {
	const blobFile = "q7-l5-full-scene-synthetic.blob";
	const uploadEvent = {
		kind: "blob",
		blobPath: blobFile,
		waitAfterMs: 1_500,
	};
	return {
		blob: encodeTransportBlob(createRobotMap()),
		replayManifest: {
			version: 1,
			deviceContext: { firmwareVersion: Q7_FULL_SCENE_FIRMWARE },
			shadowDps: {},
			events: [{
				kind: "dps",
				dps: {
					"10001": JSON.stringify({ method: "prop.get", data: propGetPayload() }),
				},
				waitAfterMs: 500,
			}, {
				kind: "dps",
				dps: {
					"10001": JSON.stringify({
						method: "service.upload_by_maptype",
						data: { map_id: Q7_FULL_SCENE_MAP_ID, map_type: 0 },
					}),
				},
				waitAfterMs: 50,
			}, {
				kind: "blob",
				blobPath: blobFile,
				waitAfterMs: 5_000,
			}],
			publishResponses: [{
				match: {
					dpsKey: "10000",
					payload: {
						method: "service.upload_by_maptype",
						params: { map_type: 0 },
					},
				},
				events: [uploadEvent],
				maximumMatches: 10,
			}],
		},
	};
}

export function writeQ7FullSceneFixture(fixtureDirectory: string): Readonly<Record<string, unknown>> {
	const fixture = buildQ7FullSceneFixture();
	fs.mkdirSync(fixtureDirectory, { recursive: true });
	const blobPath = path.join(fixtureDirectory, "q7-l5-full-scene-synthetic.blob");
	const replayPath = path.join(fixtureDirectory, "q7-l5-full-scene-replay.json");
	fs.writeFileSync(blobPath, fixture.blob);
	fs.writeFileSync(replayPath, `${JSON.stringify(fixture.replayManifest, null, 2)}\n`, "utf8");
	return {
		blobPath,
		replayPath,
		blobBytes: fixture.blob.length,
		blobSha256: createHash("sha256").update(fixture.blob).digest("hex"),
	};
}
