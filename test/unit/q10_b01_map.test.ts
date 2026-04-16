import { createCanvas } from "@napi-rs/canvas";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Q10DpDispatcher } from "../../src/lib/b01/q10/Q10DpDispatcher";
import { getB01VariantFromModel } from "../../src/lib/b01Variant";
import { Q10VacuumFeatures } from "../../src/lib/features/vacuum/b01/Q10VacuumFeatures";
import { mqtt_api } from "../../src/lib/mqttApi";
import { MapManager } from "../../src/lib/map/MapManager";
import { classifyB01MapPayload } from "../../src/lib/map/b01/B01MapPayloadClassifier";
import { MapDecryptor } from "../../src/lib/map/b01/MapDecryptor";
import { MapParser } from "../../src/lib/map/b01/MapParser";
import type { B01MapData } from "../../src/lib/map/b01/types";
import { Q10MapBuilder } from "../../src/lib/map/q10/Q10MapBuilder";
import { Q10MapCreator } from "../../src/lib/map/q10/Q10MapCreator";
import { getQ10ExportCanvasScale } from "../../src/lib/map/q10/Q10MapGeometry";
import {
	decompressQ10Lz4Block,
	mergeQ10RuntimeState,
	parseQ10VirtualWallDpPayload,
	parseQ10YxMapToB01
} from "../../src/lib/map/q10/Q10YxMapParser";
import type { Q10SourceData } from "../../src/lib/map/q10/types";
import { MockAdapter } from "../../src/lib/mock/MockAdapter";
import { requestsHandler } from "../../src/lib/requestsHandler";
import { Q10_PRIMARY_SAMPLE } from "./q10RepresentativeFixture";
import { Q10_FIXTURE_DEFAULTS } from "./q10FixtureDefaults";
import { createQ10MockAdapter, decodePngRgba, Q10_TEST_DEVICE_STATUS } from "./q10TestSupport";

const Q10_DUID = "q10-test-duid";
const { localKey: Q10_LOCAL_KEY, model: Q10_MODEL, sn: Q10_SN } = Q10_FIXTURE_DEFAULTS;
const mockAdapter = createQ10MockAdapter({ duid: Q10_DUID, assetErrorMessage: "asset not found" });

function q10RenderScale(sizeX: number, sizeY: number): number {
	return getQ10ExportCanvasScale(sizeX, sizeY);
}

function getFirstSample(): Buffer | null {
	return Buffer.from(Q10_PRIMARY_SAMPLE);
}

function createSyntheticQ10Map(
	pathPixels: Array<{ x: number; y: number; type?: number; update?: number }>,
	sizeX = 100,
	sizeY = 40,
	options: {
		chargerPixel?: { x: number; y: number; phi?: number };
		robotPixel?: { x: number; y: number; phi?: number };
	} = {}
): B01MapData {
	const resolution = 0.05;
	const q10SourceData: Q10SourceData | undefined =
		options.chargerPixel || options.robotPixel
			? {
					version: 1,
					mapId: 1,
					mapWidth: sizeX,
					mapHeight: sizeY,
					mapRate: 1 / resolution,
					resolution,
					xMin: 0,
					yMin: sizeY,
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
					hasSelfIdentificationCarpet: false,
					chargePosition: options.chargerPixel
						? {
								x: options.chargerPixel.x,
								y: options.chargerPixel.y,
								phi: options.chargerPixel.phi
							}
						: undefined,
					robotPosition: options.robotPixel
						? {
								x: options.robotPixel.x,
								y: options.robotPixel.y,
								phi: options.robotPixel.phi
							}
						: undefined
				}
			: undefined;

	return {
		sourceFormat: "q10-raw",
		header: {
			sizeX,
			sizeY,
			minX: 0,
			minY: 0,
			maxX: sizeX * resolution,
			maxY: sizeY * resolution,
			resolution
		},
		mapGrid: Buffer.alloc(sizeX * sizeY, 1),
		q10CreatorData: {
			q10Detected: true,
			mapRate: 1 / resolution,
			mapWidth: sizeX,
			mapHeight: sizeY,
			roomModels: [],
			clipEraseRoomModels: [],
			eraseAreas: [],
			virtualWalls: [],
			forbidAreas: [],
			mopAreas: [],
			thresholdAreas: [],
			carpetAreas: [],
			obstaclePixels: [],
			skipPixels: [],
			suspectedPoints: [],
			pathPixels,
			chargerPixel: options.chargerPixel,
			robotPixel: options.robotPixel,
			selfIdentifiedCarpets: [],
			roomTangentInfo: [],
			clipEraseRoomTangentInfo: [],
			materialPaths: {
				ceramicTile: [],
				horizontalFloorBoard: [],
				verticalFloorBoard: []
			},
			roomMaterialRoomIds: {
				ceramicTile: [],
				horizontalFloorBoard: [],
				verticalFloorBoard: [],
				other: []
			}
		},
		q10SourceData
	};
}

function createSyntheticQ10LivePayload(options: { tail?: Buffer; width?: number; height?: number; version?: number } = {}): Buffer {
	const width = options.width ?? 16;
	const height = options.height ?? 16;
	const version = options.version ?? 1;
	const tail = options.tail ?? Buffer.alloc(0);
	const pixLen = width * height;
	const payload = Buffer.alloc(1 + 28 + pixLen + tail.length, 0);

	payload[0] = 1;
	payload[1] = version;
	payload.writeUInt32BE(1, 2);
	payload[6] = 0;
	payload.writeUInt16BE(width, 7);
	payload.writeUInt16BE(height, 9);
	payload.writeUInt16BE(0, 11);
	payload.writeUInt16BE(height * 5, 13);
	payload.writeUInt16BE(5, 15);
	payload.writeUInt16BE(0xffff, 17);
	payload.writeUInt16BE(0xffff, 19);
	payload.writeUInt16BE(0xffff, 21);
	payload.writeUInt32BE(pixLen, 23);
	payload.writeUInt16BE(0, 27);
	payload.fill(1, 29, 29 + pixLen);

	if (tail.length > 0) {
		tail.copy(payload, 29 + pixLen);
	}

	return payload;
}

function pixelAt(image: { width: number; rgba: Buffer }, x: number, y: number): [number, number, number, number] {
	const idx = (y * image.width + x) * 4;
	return [
		image.rgba[idx] ?? 0,
		image.rgba[idx + 1] ?? 0,
		image.rgba[idx + 2] ?? 0,
		image.rgba[idx + 3] ?? 0
	];
}

function countDifferentPixels(
	first: { width: number; height: number; rgba: Buffer },
	second: { width: number; height: number; rgba: Buffer }
): number {
	expect(first.width).toBe(second.width);
	expect(first.height).toBe(second.height);

	let different = 0;
	for (let offset = 0; offset < first.rgba.length; offset += 4) {
		if (
			first.rgba[offset] !== second.rgba[offset] ||
			first.rgba[offset + 1] !== second.rgba[offset + 1] ||
			first.rgba[offset + 2] !== second.rgba[offset + 2] ||
			first.rgba[offset + 3] !== second.rgba[offset + 3]
		) {
			different++;
		}
	}
	return different;
}

function createQ10FeatureHarness() {
	const adapter = new MockAdapter() as MockAdapter & {
		translationManager: { get: (key: string, fallback?: string) => string };
		checkForNewFirmware: (duid: string) => Promise<void>;
		formatRoborockDate: (value: number) => string;
	};
	adapter.translationManager = { get: (_key: string, fallback?: string) => fallback || "" };
	adapter.checkForNewFirmware = async () => undefined;
	adapter.formatRoborockDate = (value: number) => String(value);
	adapter.http_api = {
		getMatchedLocalKeys: () => new Map([[Q10_DUID, Q10_LOCAL_KEY]]),
		getRobotModel: () => Q10_MODEL,
		getDevices: () => [{ duid: Q10_DUID, sn: Q10_SN, model: Q10_MODEL }],
		getFwFeaturesResult: () => ({}),
		storeFwFeaturesResult: () => undefined
	};
	adapter.requestsHandler = {
		sendRequest: vi.fn().mockResolvedValue(undefined),
		publishB01Dp: vi.fn().mockResolvedValue(undefined)
	};
		(adapter as any).mapManager = {
			processMap: vi.fn().mockResolvedValue(null),
			updateB01DeviceStatus: vi.fn(),
			applyQ10LiveStatePatch: vi.fn().mockResolvedValue(false)
		};

	const deps = {
		adapter,
		log: adapter.log,
		ensureState: async (id: string, common: any) => {
			await adapter.setObjectNotExistsAsync(id, { type: "state", common });
		},
		ensureFolder: async (id: string, name?: string) => {
			await adapter.setObjectNotExistsAsync(id, { type: "folder", common: { name: name ?? id } });
		},
		config: { staticFeatures: [] },
		http_api: adapter.http_api
	};

	const feature = new Q10VacuumFeatures(deps as any, Q10_DUID, Q10_MODEL, { staticFeatures: [] }, undefined);
	return { adapter, feature };
}

function createQ10RequestsHandlerHarness() {
	const handler = Object.create(requestsHandler.prototype) as requestsHandler & {
		adapter: {
			getB01Variant: ReturnType<typeof vi.fn>;
			rLog: ReturnType<typeof vi.fn>;
		};
		publishB01Dp: ReturnType<typeof vi.fn>;
		sendRequest: ReturnType<typeof vi.fn>;
		_processResult: ReturnType<typeof vi.fn>;
	};

	handler.adapter = {
		getB01Variant: vi.fn().mockResolvedValue("Q10"),
		rLog: vi.fn()
	};
	handler.publishB01Dp = vi.fn().mockResolvedValue(undefined);
	handler.sendRequest = vi.fn();
	handler._processResult = vi.fn();

	return handler;
}

describe("Q10 B01 Map Support", () => {
	let harness: ReturnType<typeof createQ10FeatureHarness>;

	beforeEach(() => {
		harness = createQ10FeatureHarness();
	});

	it("should derive the Q10 variant from ss-models", () => {
		expect(getB01VariantFromModel("roborock.vacuum.ss09")).toBe("Q10");
		expect(getB01VariantFromModel("roborock.vacuum.sc05")).toBe("Q7");
	});

	it("should request DP 102 instead of prop.get for Q10 status refresh", async () => {
		await harness.feature.updateStatus();
		expect(harness.adapter.requestsHandler.publishB01Dp).toHaveBeenCalledWith(Q10_DUID, { "102": 1 });
		expect(harness.adapter.requestsHandler.sendRequest).not.toHaveBeenCalled();
	});

	it("should request Q10 consumables via DP 102", async () => {
		await harness.feature.updateConsumables();
		expect(harness.adapter.requestsHandler.publishB01Dp).toHaveBeenCalledWith(Q10_DUID, { "102": 1 });
	});

	it("should request Q10 timers via DP 101.69", async () => {
		await harness.feature.updateTimers();
		expect(harness.adapter.requestsHandler.publishB01Dp).toHaveBeenCalledWith(Q10_DUID, { "101": { "69": 0 } });
	});

	it("should request Q10 multi-map metadata via DP 101.61", async () => {
		await harness.feature.updateMultiMapsList();
		expect(harness.adapter.requestsHandler.publishB01Dp).toHaveBeenCalledWith(Q10_DUID, { "101": { "61": { op: "list" } } });
	});

	it("should initialize Q10 with the original app startup request order", async () => {
		vi.spyOn(harness.feature as any, "updateFirmwareFeatures").mockResolvedValue(undefined);
		vi.spyOn(harness.feature as any, "updateExtraStatus").mockResolvedValue(undefined);

		await harness.feature.initializeDeviceData();

		expect(harness.adapter.requestsHandler.publishB01Dp.mock.calls).toEqual([
			[Q10_DUID, { "101": { "16": 1 } }],
			[Q10_DUID, { "102": 1 }],
			[Q10_DUID, { "101": { "61": { op: "list" } } }],
			[Q10_DUID, { "101": { "52": { op: "list" } } }],
			[Q10_DUID, { "101": { "69": 0 } }],
			[Q10_DUID, { "101": { "75": 0 } }],
			[Q10_DUID, { "101": { "64": { op: "list" } } }],
			[Q10_DUID, { "101": { "107": 0 } }]
		]);
	});

	it("should keep live map refresh and clean record refresh separate for Q10", async () => {
		await harness.feature.updateMap();
		expect(harness.adapter.requestsHandler.publishB01Dp.mock.calls).toEqual([
			[Q10_DUID, { "101": { "16": 1 } }]
		]);

		harness.adapter.requestsHandler.publishB01Dp.mockClear();

		await harness.feature.updateCleanSummary();
		expect(harness.adapter.requestsHandler.publishB01Dp).toHaveBeenCalledTimes(1);
		expect(harness.adapter.requestsHandler.publishB01Dp).toHaveBeenCalledWith(Q10_DUID, { "101": { "52": { op: "list" } } });
	});

	it("should suppress duplicate startup timer reloads until the initial Q10 timer list has arrived", async () => {
		vi.spyOn(harness.feature as any, "updateFirmwareFeatures").mockResolvedValue(undefined);
		vi.spyOn(harness.feature as any, "updateExtraStatus").mockResolvedValue(undefined);

		await harness.feature.initializeDeviceData();
		harness.adapter.requestsHandler.publishB01Dp.mockClear();

		await harness.feature.applyQ10ShadowDpPayload({
			"101": { "93": 2 }
		});

		expect(harness.adapter.requestsHandler.publishB01Dp).not.toHaveBeenCalled();

		await harness.feature.applyQ10ShadowDpPayload({
			"101": { "93": 2 }
		});

		expect(harness.adapter.requestsHandler.publishB01Dp).not.toHaveBeenCalled();

		await harness.feature.applyQ10TimersFromDpResult([]);

		await harness.feature.applyQ10ShadowDpPayload({
			"101": { "93": 3 }
		});

		expect(harness.adapter.requestsHandler.publishB01Dp).toHaveBeenCalledTimes(1);
		expect(harness.adapter.requestsHandler.publishB01Dp).toHaveBeenCalledWith(Q10_DUID, { "101": { "69": 0 } });
	});

	it("should expose the supported Q10 command set", async () => {
		await harness.feature.setupProtocolFeatures();

		expect(Object.keys(harness.feature.commands).sort()).toEqual([
			"app_charge",
			"app_pause",
			"app_segment_clean",
			"app_start",
			"app_stop",
			"app_zoned_clean",
			"clean_path_preference",
			"update_map",
			"water",
			"wind"
		]);
	});

	it("should remove stale Q10 command objects before recreating the verified command set", async () => {
		await harness.feature.setupProtocolFeatures();

		harness.adapter.objects[`Devices.${Q10_DUID}.commands.prop`] = { type: "folder" };
		harness.adapter.objects[`Devices.${Q10_DUID}.commands.prop.get`] = { type: "state" };
		harness.adapter.objects[`Devices.${Q10_DUID}.commands.find_me`] = { type: "state" };
		harness.adapter.objects[`Devices.${Q10_DUID}.resetConsumables`] = { type: "folder" };
		harness.adapter.objects[`Devices.${Q10_DUID}.resetConsumables.reset_filter`] = { type: "state" };

		await harness.feature.createCommandObjects();

		expect(harness.adapter.objects[`Devices.${Q10_DUID}.commands.prop`]).toBeUndefined();
		expect(harness.adapter.objects[`Devices.${Q10_DUID}.commands.prop.get`]).toBeUndefined();
		expect(harness.adapter.objects[`Devices.${Q10_DUID}.commands.find_me`]).toBeUndefined();
		expect(harness.adapter.objects[`Devices.${Q10_DUID}.resetConsumables`]).toBeUndefined();
		expect(harness.adapter.objects[`Devices.${Q10_DUID}.resetConsumables.reset_filter`]).toBeUndefined();
		expect(harness.adapter.objects[`Devices.${Q10_DUID}.commands.app_start`]).toBeDefined();
		expect(harness.adapter.objects[`Devices.${Q10_DUID}.commands.app_segment_clean`]).toBeDefined();
		expect(harness.adapter.objects[`Devices.${Q10_DUID}.commands.app_zoned_clean`]).toBeDefined();
		expect(harness.adapter.objects[`Devices.${Q10_DUID}.commands.update_map`]).toBeDefined();
	});

	it("should pass the real device serial instead of the duid when processing live Q10 maps", async () => {
		const livePayload = createSyntheticQ10LivePayload();
		harness.adapter.mapManager.processMap.mockResolvedValue({ mapBase64: "data:image/png;base64,live" });

		await (harness.feature as any).mapService.processUpdateMapResponse(livePayload);

		expect(harness.adapter.mapManager.processMap).toHaveBeenCalled();
		expect(harness.adapter.mapManager.processMap.mock.calls[0][3]).toBe(Q10_SN);
		expect(harness.adapter.mapManager.processMap.mock.calls[0][5]).toBe(Q10_DUID);
		expect(harness.adapter.mapManager.processMap.mock.calls[0][6]).toBe("B01");
	});

	it("should ignore duplicate Q10 live map blobs like the original app parser", async () => {
		const livePayload = createSyntheticQ10LivePayload();
		harness.adapter.mapManager.processMap.mockResolvedValue({ mapBase64: "data:image/png;base64,live" });

		await (harness.feature as any).mapService.processUpdateMapResponse(livePayload);
		await (harness.feature as any).mapService.processUpdateMapResponse(livePayload);

		expect(harness.adapter.mapManager.processMap).toHaveBeenCalledTimes(1);
	});

	it("should preserve Q10 runtime path data when the previous live model still has mapId 0", () => {
		const previous = createSyntheticQ10Map([
			{ x: 10, y: 10 },
			{ x: 12, y: 12 }
		], 100, 40, { chargerPixel: { x: 5, y: 5 } });
		previous.q10SourceData!.mapId = 0;
		previous.q10SourceData!.pathPoints = [
			{ x: 0.5, y: 1.5, type: 0 },
			{ x: 0.6, y: 1.4, type: 0 }
		];

		const current = createSyntheticQ10Map([], 100, 40, { chargerPixel: { x: 5, y: 5 } });
		current.q10SourceData!.mapId = 1772902161;

		const merged = mergeQ10RuntimeState(current, previous);
		expect(merged.q10SourceData?.pathPoints).toHaveLength(2);
		expect(merged.history).toHaveLength(2);
	});

	it("should refuse Q10 live map processing when the device serial is missing", async () => {
		const livePayload = Buffer.alloc(28);
		livePayload[0] = 2;
		harness.adapter.http_api.getDevices = () => [{ duid: Q10_DUID, model: Q10_MODEL }];

		await (harness.feature as any).mapService.processUpdateMapResponse(livePayload);

		expect(harness.adapter.mapManager.processMap).not.toHaveBeenCalled();
	});

	it("should route Q10 control commands through the source-verified Q10 DP path and keep DP writes for verified settings", async () => {
		const reqHandler = createQ10RequestsHandlerHarness();
		await harness.feature.setupProtocolFeatures();

		await reqHandler.command(harness.feature as any, Q10_DUID, "app_start");
		await reqHandler.command(harness.feature as any, Q10_DUID, "app_charge");
		await reqHandler.command(harness.feature as any, Q10_DUID, "app_pause");
		await reqHandler.command(harness.feature as any, Q10_DUID, "app_stop");
		await reqHandler.command(harness.feature as any, Q10_DUID, "wind", 3);
		await reqHandler.command(harness.feature as any, Q10_DUID, "clean_path_preference", 2);

		expect(reqHandler.publishB01Dp).toHaveBeenNthCalledWith(1, Q10_DUID, { "201": { cmd: 1 } });
		expect(reqHandler.publishB01Dp).toHaveBeenNthCalledWith(2, Q10_DUID, { "202": 5 });
		expect(reqHandler.publishB01Dp).toHaveBeenNthCalledWith(3, Q10_DUID, { "204": 0 });
		expect(reqHandler.publishB01Dp).toHaveBeenNthCalledWith(4, Q10_DUID, { "206": 0 });
		expect(reqHandler.publishB01Dp).toHaveBeenNthCalledWith(5, Q10_DUID, { "123": 3 });
		expect(reqHandler.publishB01Dp).toHaveBeenNthCalledWith(6, Q10_DUID, { "101": { "78": 2 } });
		expect(reqHandler.sendRequest).not.toHaveBeenCalled();
	});

	it("should gather selected Q10 room ids and send native room-clean dp201 cmd=2", async () => {
		const reqHandler = createQ10RequestsHandlerHarness();
		await harness.feature.setupProtocolFeatures();

		harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.current_map_id`] = 7;
		harness.adapter.states[`roborock.0.Devices.${Q10_DUID}.floors.7.1`] = true;
		harness.adapter.states[`roborock.0.Devices.${Q10_DUID}.floors.7.6`] = true;
		harness.adapter.states[`roborock.0.Devices.${Q10_DUID}.floors.7.name`] = "Main Floor";

		await reqHandler.command(harness.feature as any, Q10_DUID, "app_segment_clean");

		expect(reqHandler.publishB01Dp).toHaveBeenCalledWith(Q10_DUID, {
			"201": {
				cmd: 2,
				clean_paramters: [1, 6]
			}
		});
	});

	it("should map adapter zone tuples to the native Q10 area-clean dp201 cmd=3 payload", async () => {
		const reqHandler = createQ10RequestsHandlerHarness();
		await harness.feature.setupProtocolFeatures();

		await reqHandler.command(harness.feature as any, Q10_DUID, "app_zoned_clean", [[1, 2, 3, 4, 2]]);

		expect(reqHandler.publishB01Dp).toHaveBeenCalledTimes(1);
		const dpPayload = reqHandler.publishB01Dp.mock.calls[0]?.[1];
		expect(dpPayload).toMatchObject({
			"201": {
				cmd: 3
			}
		});

		const encoded = (dpPayload as { "201": { clean_paramters: string } })["201"].clean_paramters;
		const decoded = Buffer.from(encoded, "base64");

		expect(Array.from(decoded)).toEqual([
			1, 2, 1, 4,
			0, 10, 0, 20,
			0, 30, 0, 20,
			0, 30, 0, 40,
			0, 10, 0, 40,
			0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
		]);
	});

	it("should reject mixed repeat counts for Q10 zone cleaning because the original payload only supports one shared repeat value", async () => {
		const reqHandler = createQ10RequestsHandlerHarness();
		await harness.feature.setupProtocolFeatures();

		await expect(
			reqHandler.command(harness.feature as any, Q10_DUID, "app_zoned_clean", [
				[1, 2, 3, 4, 1],
				[5, 6, 7, 8, 2]
			])
		).rejects.toThrow("Q10 zone clean expects one shared repeat count");

		expect(reqHandler.publishB01Dp).not.toHaveBeenCalled();
	});

	it("should fail closed for unsupported Q10 commands instead of silently falling back to generic B01 logic", async () => {
		const reqHandler = createQ10RequestsHandlerHarness();
		const feature = {
			updateMap: vi.fn().mockResolvedValue(undefined),
			getCommandParams: vi.fn().mockImplementation(async (_method: string, params?: unknown) => params)
		} as any;

		await expect(reqHandler.command(feature, Q10_DUID, "find_me")).rejects.toThrow(
			"Unsupported Q10 command 'find_me'"
		);
		await expect(reqHandler.command(feature, Q10_DUID, "wind", "turbo")).rejects.toThrow(
			"Unsupported Q10 payload for wind"
		);

		expect(reqHandler.publishB01Dp).not.toHaveBeenCalled();
		expect(reqHandler.sendRequest).not.toHaveBeenCalled();
	});

	it("should create floor and room states from Q10 map_info", async () => {
		await harness.feature.applyQ10MapInfoFromDpResult({
			max_multi_map: 4,
			max_bak_map: 2,
			multi_map_count: 1,
			map_info: [{
				mapflag: 7,
				add_time: 1773671104,
				name: "Main Floor",
				rooms: [
					{ id: 1, iot_name: "Wohnzimmer" },
					{ id: 2, name: "Küche" }
				]
			}]
		});

		expect(harness.adapter.states[`Devices.${Q10_DUID}.floors.7.name`]).toBe("Main Floor");
		expect(harness.adapter.states[`Devices.${Q10_DUID}.floors.7.mapFlag`]).toBeUndefined();
		expect(harness.adapter.states[`Devices.${Q10_DUID}.floors.max_multi_map`]).toBe(4);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.floors.max_bak_map`]).toBe(2);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.floors.multi_map_count`]).toBe(1);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.floors.7.add_time`]).toBe("1773671104");
		expect(harness.adapter.objects[`Devices.${Q10_DUID}.floors.7.1`]).toBeDefined();
		expect(harness.adapter.objects[`Devices.${Q10_DUID}.floors.7.2`]).toBeDefined();
	});

	it("should normalize Q10 roomNN names like the original app and keep empty names empty", async () => {
		harness.adapter.translationManager = {
			get: (key: string, fallback?: string) => (key === "default_room_name" ? "Raum" : (fallback || ""))
		};

		await harness.feature.applyQ10MapInfoFromDpResult({
			map_info: [{
				mapflag: 7,
				name: "Main Floor",
				rooms: [
					{ id: 1, iot_name: "room12" },
					{ id: 2, name: "" }
				]
			}]
		});

		expect(harness.adapter.objects[`Devices.${Q10_DUID}.floors.7.1`]?.common?.name).toBe("Raum12");
		expect(harness.adapter.objects[`Devices.${Q10_DUID}.floors.7.2`]?.common?.name).toBe("");
	});

	it("should remove redundant Q10 floor metadata when refreshed floor data arrives", async () => {
		harness.adapter.objects[`Devices.${Q10_DUID}.floors.7.mapFlag`] = { type: "state" };
		harness.adapter.states[`Devices.${Q10_DUID}.floors.7.mapFlag`] = 7;
		harness.adapter.objects[`Devices.${Q10_DUID}.floors.1771526936.map_id`] = { type: "state" };
		harness.adapter.states[`Devices.${Q10_DUID}.floors.1771526936.map_id`] = 1771526936;

		await harness.feature.applyQ10MapInfoFromDpResult({
			map_info: [{ mapflag: 7, name: "Main Floor", rooms: [] }]
		});
		await harness.feature.applyQ10MultiMapListFromDp61({
			data: [{ id: "1771526936", name: "Map1", timestamp: 1773577323 }],
			op: "list",
			result: 1
		});

		expect(harness.adapter.objects[`Devices.${Q10_DUID}.floors.7.mapFlag`]).toBeUndefined();
		expect(harness.adapter.objects[`Devices.${Q10_DUID}.floors.1771526936.map_id`]).toBeUndefined();
	});

	it("should create Q10 consumable states from DP 102 payloads", async () => {
		await harness.feature.applyQ10ConsumablesFromDpResult({
			main_brush_work_time: 73044,
			side_brush_work_time: 641427,
			filter_work_time: 37793,
			filter_element_work_time: 0,
			sensor_dirty_time: 34127,
			strainer_work_times: 8,
			dust_collection_work_times: 264,
			cleaning_brush_work_times: 8
		});

		expect(harness.adapter.states[`Devices.${Q10_DUID}.consumables.main_brush_work_time`]).toBe(280);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.consumables.filter_element_work_time`]).toBe(150);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.consumables.dust_collection_work_times`]).toBe(264);
		expect(harness.adapter.objects[`Devices.${Q10_DUID}.resetConsumables.reset_main_brush`]).toBeDefined();
	});

	it("should create Q10 schedules from DP 102 timer results", async () => {
		await harness.feature.applyQ10TimersFromDpResult([
			[
				"1749184280712",
				"on",
				[
					"0 14 * * 3",
					["start_clean", { fan_power: 102, water_box_mode: 200 }]
				]
			]
		]);

		expect(harness.adapter.states[`Devices.${Q10_DUID}.schedules.1749184280712.enabled`]).toBe(true);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.schedules.1749184280712.cron`]).toBe("0 14 * * 3");
	});

	it("should process Q10 DP shadow payloads into status and network states", async () => {
		await harness.feature.applyQ10ShadowDpPayload({
			"101": {
				"6": 3600,
				"7": 123400,
				"25": 1,
				"26": 70,
				"53": 1,
				"78": 0,
				"81": {
					ipAdress: "192.168.1.98",
					mac: "24:9E:7D:25:6C:EC",
					signal: -62,
					wifiName: "nerdFour"
				}
			},
			"121": 8,
			"122": 100,
			"123": 2,
			"124": 2,
			"136": 2,
			"137": 1,
			"138": 5,
			"139": 6,
			"141": 42,
			"142": 1
		});

		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.status`]).toBe(8);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.state`]).toBeUndefined();
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.battery`]).toBe(100);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.wind`]).toBe(2);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.water`]).toBe(2);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.clean_times`]).toBe(2);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.clean_task_type`]).toBe(5);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.back_type`]).toBe(6);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.cleaning_progress`]).toBe(42);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.fleeing_goods`]).toBe(1);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.recent_clean_record`]).toBe(1);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.clean_path_preference`]).toBe(0);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.quiet_is_open`]).toBe(1);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.networkInfo.rssi`]).toBe(-62);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.cleaningInfo.clean_time`]).toBe(1);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.cleaningInfo.clean_area`]).toBe(0.12);
	});

	it("should normalize Q10 boolean shadow flags into numeric device states", async () => {
		await harness.feature.applyQ10ShadowDpPayload({
			"101": {
				"51": true,
				"53": false,
				"105": true
			}
		});

		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.map_save_switch`]).toBe(1);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.recent_clean_record`]).toBe(0);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.valley_point_charging`]).toBe(1);
	});

	it("should create floors from direct Q10 DP 101.61 shadow payloads", async () => {
		await harness.feature.applyQ10ShadowDpPayload({
			"101": {
				"61": {
					data: [
						{ id: "1771526936", name: "Map1", timestamp: 1773577323 },
						{ id: "1772902161", name: "Map2", timestamp: 1773714462 }
					],
					op: "list",
					result: 1
				}
			}
		});

		expect(harness.adapter.states[`Devices.${Q10_DUID}.floors.1771526936.name`]).toBe("Map1");
		expect(harness.adapter.states[`Devices.${Q10_DUID}.floors.1771526936.map_id`]).toBeUndefined();
		expect(harness.adapter.states[`Devices.${Q10_DUID}.floors.1771526936.add_time`]).toBe("1773577323");
		expect(harness.adapter.states[`Devices.${Q10_DUID}.floors.1772902161.name`]).toBe("Map2");
	});

	it("should parse Q10 local timer blobs from DP 101.32", async () => {
		await harness.feature.applyQ10ShadowDpPayload({
			"101": {
				"32": "AQEAAQEAAAAAAX8DAGmXWxgAAgICAQA=",
				"61": {
					data: [
						{ id: "1771526936", name: "Map1", timestamp: 1773577323 }
					],
					op: "list",
					result: 1
				}
			}
		});

		expect(harness.adapter.states[`Devices.${Q10_DUID}.schedules.local_01.enabled`]).toBe(true);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.schedules.local_01.locked`]).toBe(true);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.schedules.local_01.time`]).toBe("03:00");
		expect(harness.adapter.states[`Devices.${Q10_DUID}.schedules.local_01.weeks`]).toBe(JSON.stringify([0, 1, 2, 3, 4, 5, 6]));
		expect(harness.adapter.states[`Devices.${Q10_DUID}.schedules.local_01.map_id`]).toBe(1771526936);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.schedules.local_01.map_name`]).toBe("Map1");
		expect(harness.adapter.states[`Devices.${Q10_DUID}.schedules.local_01.clean_mode`]).toBe(2);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.schedules.local_01.fan_power`]).toBe(2);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.schedules.local_01.water_box_mode`]).toBe(2);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.schedules.local_01.clean_count`]).toBe(1);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.schedules.local_01.clean_line`]).toBe(0);
	});

	it("should parse Q10 not-disturb and valley charging blobs from shadow DPs", async () => {
		await harness.feature.applyQ10ShadowDpPayload({
			"101": {
				"33": "ABYACAAA",
				"106": "ARkAGQAA"
			}
		});

		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.not_disturb_start_hour`]).toBe(22);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.not_disturb_start_minute`]).toBe(0);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.not_disturb_end_hour`]).toBe(8);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.not_disturb_end_minute`]).toBe(0);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.not_disturb_time`]).toBe("22:00-08:00");

		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.valley_point_charging_start_hour`]).toBe(25);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.valley_point_charging_start_minute`]).toBe(0);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.valley_point_charging_end_hour`]).toBe(25);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.valley_point_charging_end_minute`]).toBe(0);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.valley_point_charging_time`]).toBe("25:00-25:00");
	});

	it("should parse Q10 clean record lists from DP 101.52", async () => {
		await harness.feature.applyQ10ShadowDpPayload({
			"101": {
				"52": {
					op: "list",
					result: 1,
					data: [
						"1773742379073_1773565494_1395_2343_0_669_0_0_0_0_0_1",
						"1773742058676_1773561894_600_1200_0_0_0_1_2_0_1_0"
					]
				}
			}
		});

		expect(harness.adapter.states[`Devices.${Q10_DUID}.cleaningInfo.record_count`]).toBe(2);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.cleaningInfo.records.0.record_id`]).toBe("1773742379073");
		expect(harness.adapter.states[`Devices.${Q10_DUID}.cleaningInfo.records.0.timestamp`]).toBe(1773565494);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.cleaningInfo.records.0.clean_time`]).toBe(1395);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.cleaningInfo.records.0.clean_area`]).toBe(2343);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.cleaningInfo.records.0.path_len`]).toBe(669);
	});

	it("should request Q10 clean record maps sequentially and store blob type 3 history maps", async () => {
		const processMap = vi.fn()
			.mockResolvedValueOnce({
				mapBase64: "data:image/png;base64,Zmlyc3Q=",
				mapBase64Clean: "data:image/png;base64,Y2xlYW4x",
				mapData: {
					id: "first",
					q10RuntimeDebug: {
						overlaySeedSource: "none",
						rawVirtualWalls: 4,
						rawForbidAreas: 2,
						sourceVirtualWalls: 2,
						sourceForbidAreas: 1,
						virtualWalls: 3,
						forbidAreas: 1
					}
				}
			})
			.mockResolvedValueOnce({
				mapBase64: "data:image/png;base64,c2Vjb25k",
				mapBase64Clean: "data:image/png;base64,Y2xlYW4y",
				mapData: { id: "second" }
			});
		(harness.adapter as any).mapManager = { processMap };
		harness.adapter.rLog = vi.fn();

		await harness.feature.applyQ10ShadowDpPayload({
			"101": {
				"52": {
					op: "list",
					result: 1,
					data: [
						"1773742379073_1773565494_1395_2343_1_669_0_0_0_0_0_1",
						"1773742058676_1773561894_600_1200_1_0_0_1_2_0_1_0"
					]
				}
			}
		});

		expect(harness.adapter.requestsHandler.publishB01Dp).toHaveBeenNthCalledWith(1, Q10_DUID, {
			"101": { "52": { op: "select", id: "1773742379073_1773565494_1395_2343_1_669_0_0_0_0_0_1" } }
		});
		expect(harness.feature.hasPendingQ10CleanRecordBlobRequest()).toBe(true);

		const firstBlob = Buffer.alloc(32);
		firstBlob[0] = 3;
		await harness.feature.applyQ10CleanRecordBlob(firstBlob);

		expect(harness.adapter.states[`Devices.${Q10_DUID}.cleaningInfo.records.0.map.mapBase64`]).toBe("data:image/png;base64,Zmlyc3Q=");
		expect(harness.adapter.states[`Devices.${Q10_DUID}.cleaningInfo.records.0.map.mapBase64Clean`]).toBeUndefined();
		expect(harness.adapter.requestsHandler.publishB01Dp).toHaveBeenNthCalledWith(2, Q10_DUID, {
			"101": { "52": { op: "select", id: "1773742058676_1773561894_600_1200_1_0_0_1_2_0_1_0" } }
		});

		const secondBlob = Buffer.alloc(32);
		secondBlob[0] = 3;
		await harness.feature.applyQ10CleanRecordBlob(secondBlob);

		expect(harness.adapter.states[`Devices.${Q10_DUID}.cleaningInfo.records.1.map.mapBase64`]).toBe("data:image/png;base64,c2Vjb25k");
		expect(harness.adapter.states[`Devices.${Q10_DUID}.cleaningInfo.records.1.map.mapBase64Clean`]).toBeUndefined();
		expect(processMap).toHaveBeenNthCalledWith(1, firstBlob, "B01", Q10_MODEL, Q10_SN, null, Q10_DUID, "B01History");
		expect(processMap).toHaveBeenNthCalledWith(2, secondBlob, "B01", Q10_MODEL, Q10_SN, null, Q10_DUID, "B01History");
		expect(harness.feature.hasPendingQ10CleanRecordBlobRequest()).toBe(false);
		expect(harness.adapter.rLog).toHaveBeenCalledWith(
			"MapManager",
			Q10_DUID,
			"Debug",
			"B01",
			52,
			"Q10 clean record map stored for record 1773742379073 at index 0 | seed=none rawWalls=4 rawForbid=2 srcWalls=2 srcForbid=1 walls=3 forbid=1",
			"debug"
		);
	});

	it("should log a compact queue summary instead of per-record Q10 clean record handshake spam", async () => {
		const rLog = vi.fn();
		harness.adapter.rLog = rLog;

		await harness.feature.applyQ10ShadowDpPayload({
			"101": {
				"52": {
					op: "list",
					result: 1,
					data: [
						"1773742379073_1773565494_1395_2343_1_669_0_0_0_0_0_1",
						"1773742058676_1773561894_600_1200_1_0_0_1_2_0_1_0"
					]
				}
			}
		});

		const messages = rLog.mock.calls.map((call) => String(call[5] ?? ""));
		expect(messages).toContain("Q10 queued 2 clean record map request(s).");
		expect(messages.some((message) => message.includes("requested clean record detail"))).toBe(false);
		expect(messages.some((message) => message.includes("acknowledged; waiting for blob type 3"))).toBe(false);
	});

	it("should keep waiting for the active Q10 history map when an earlier blob is non-renderable", async () => {
		const processMap = vi.fn()
			.mockResolvedValueOnce(null)
			.mockResolvedValueOnce({
				mapBase64: "data:image/png;base64,bGF0ZQ==",
				mapData: { id: "late-success" }
			})
			.mockResolvedValueOnce({
				mapBase64: "data:image/png;base64,bmV4dA==",
				mapData: { id: "next-record" }
			});
		(harness.adapter as any).mapManager = { processMap };

		await harness.feature.applyQ10ShadowDpPayload({
			"101": {
				"52": {
					op: "list",
					result: 1,
					data: [
						"1773742379073_1773565494_1395_2343_1_669_0_0_0_0_0_1",
						"1773742058676_1773561894_600_1200_1_0_0_1_2_0_1_0"
					]
				}
			}
		});

		const firstBlob = Buffer.alloc(32);
		firstBlob[0] = 3;
		await harness.feature.applyQ10CleanRecordBlob(firstBlob);

		expect(harness.feature.hasPendingQ10CleanRecordBlobRequest()).toBe(true);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.cleaningInfo.records.0.map.mapBase64`]).toBeUndefined();
		expect(harness.adapter.requestsHandler.publishB01Dp).toHaveBeenCalledTimes(1);

		const lateValidBlob = Buffer.alloc(32);
		lateValidBlob[0] = 3;
		await harness.feature.applyQ10CleanRecordBlob(lateValidBlob);

		expect(harness.adapter.states[`Devices.${Q10_DUID}.cleaningInfo.records.0.map.mapBase64`]).toBe("data:image/png;base64,bGF0ZQ==");
		expect(harness.adapter.requestsHandler.publishB01Dp).toHaveBeenCalledTimes(2);
		expect(harness.adapter.requestsHandler.publishB01Dp).toHaveBeenNthCalledWith(2, Q10_DUID, {
			"101": { "52": { op: "select", id: "1773742058676_1773561894_600_1200_1_0_0_1_2_0_1_0" } }
		});

		const secondBlob = Buffer.alloc(32);
		secondBlob[0] = 3;
		await harness.feature.applyQ10CleanRecordBlob(secondBlob);

		expect(harness.adapter.states[`Devices.${Q10_DUID}.cleaningInfo.records.1.map.mapBase64`]).toBe("data:image/png;base64,bmV4dA==");
		expect(harness.feature.hasPendingQ10CleanRecordBlobRequest()).toBe(false);
	});

	it("should not misclassify a Q10 clean-record blob as a live map response", () => {
		const adapter = new MockAdapter() as MockAdapter & {
			b01MapResponseQueue: Map<string, Array<"get_map_v1" | "get_clean_record_map">>;
		};
		adapter.pendingRequests = new Map([
			[1, { method: "get_map_v1", duid: Q10_DUID }]
		]);
		adapter.b01MapResponseQueue = new Map([[Q10_DUID, ["get_map_v1"]]]);
		adapter.http_api = {
			getMatchedLocalKeys: () => new Map([[Q10_DUID, Q10_LOCAL_KEY]]),
			getRobotModel: () => Q10_MODEL,
			getDevices: () => [{ duid: Q10_DUID, sn: Q10_SN, model: Q10_MODEL }]
		} as any;

		const mqttApi = new mqtt_api(adapter as any);
		const recordBlob = Buffer.alloc(32);
		recordBlob[0] = 3;

		expect((mqttApi as any).resolveB01Map301ToPendingId(Q10_DUID, recordBlob)).toBe(-1);
	});

	it("should suppress shadow-only Q10 DP 102 summaries", async () => {
		const adapter = new MockAdapter() as MockAdapter & {
			deviceFeatureHandlers: Map<string, unknown>;
			getB01Variant: ReturnType<typeof vi.fn>;
			rLog: ReturnType<typeof vi.fn>;
		};
		adapter.deviceFeatureHandlers = new Map([[Q10_DUID, {}]]);
		adapter.getB01Variant = vi.fn().mockResolvedValue("Q10");
		adapter.rLog = vi.fn();

		const dispatcher = new Q10DpDispatcher(adapter as any);
		const dps102 = { method: "prop.post", result: [] };

		await dispatcher.dispatchProtocol102(Q10_DUID, { dps: { "101": { "90": 1 } } } as any, dps102 as any);
		await dispatcher.dispatchProtocol102(Q10_DUID, { dps: { "101": { "90": 1 } } } as any, dps102 as any);
		await dispatcher.dispatchProtocol102(Q10_DUID, { dps: { "101": { "108": 4 } } } as any, dps102 as any);

		expect(adapter.rLog).not.toHaveBeenCalled();
	});

	it("should summarize Q10 DP 101.64 map metadata payloads instead of treating them as unknown", async () => {
		const adapter = new MockAdapter() as MockAdapter & {
			deviceFeatureHandlers: Map<string, unknown>;
			getB01Variant: ReturnType<typeof vi.fn>;
			rLog: ReturnType<typeof vi.fn>;
		};
		adapter.deviceFeatureHandlers = new Map([[Q10_DUID, {}]]);
		adapter.getB01Variant = vi.fn().mockResolvedValue("Q10");
		adapter.rLog = vi.fn();

		const dispatcher = new Q10DpDispatcher(adapter as any);
		const handled = await dispatcher.dispatchProtocol102(
			Q10_DUID,
			{
				dps: {
					"101": {
						"64": {
							op: "list",
							result: 1,
							data: [{ id: 1 }, { id: 2 }, { id: 3 }]
						}
					}
				}
			} as any,
			{ method: "prop.post", result: [] } as any
		);

		expect(handled).toBe(true);
		expect(adapter.rLog).toHaveBeenCalledWith("MQTT", Q10_DUID, "Debug", "102", undefined, "[Q10DP] map_meta:3", "debug");
	});

	it("should log unknown unsolicited inbound protocol 102 payloads on debug", async () => {
		const adapter = new MockAdapter() as MockAdapter & {
			deviceFeatureHandlers: Map<string, unknown>;
			getB01Variant: ReturnType<typeof vi.fn>;
			getDeviceProtocolVersion: ReturnType<typeof vi.fn>;
			rLog: ReturnType<typeof vi.fn>;
			requestsHandler: { isRequestRecentlyFinished: ReturnType<typeof vi.fn> };
		};
		adapter.deviceFeatureHandlers = new Map([[Q10_DUID, {}]]);
		adapter.getB01Variant = vi.fn().mockResolvedValue("Q10");
		adapter.getDeviceProtocolVersion = vi.fn().mockResolvedValue("B01");
		adapter.rLog = vi.fn();
		adapter.requestsHandler = {
			isRequestRecentlyFinished: vi.fn().mockReturnValue(false)
		} as any;

		const mqttApi = new mqtt_api(adapter as any);
		const rawPayload = JSON.stringify({ dps: { "101": { "255": 4 } } });

		await (mqttApi as any).handleProtocol102(Q10_DUID, {
			protocol: 102,
			payload: Buffer.from(rawPayload, "utf8")
		});

		expect(adapter.rLog).toHaveBeenCalledWith("MQTT", Q10_DUID, "<-", "B01", "102", rawPayload, "debug");
	});

	it("should route B01 protocol 102 through the specialized handler only once", async () => {
		const adapter = new MockAdapter() as MockAdapter & {
			deviceFeatureHandlers: Map<string, unknown>;
			getB01Variant: ReturnType<typeof vi.fn>;
			getDeviceProtocolVersion: ReturnType<typeof vi.fn>;
			rLog: ReturnType<typeof vi.fn>;
			requestsHandler: { isRequestRecentlyFinished: ReturnType<typeof vi.fn> };
		};
		adapter.deviceFeatureHandlers = new Map([[Q10_DUID, {}]]);
		adapter.getB01Variant = vi.fn().mockResolvedValue("Q10");
		adapter.getDeviceProtocolVersion = vi.fn().mockResolvedValue("B01");
		adapter.rLog = vi.fn();
		adapter.requestsHandler = {
			isRequestRecentlyFinished: vi.fn().mockReturnValue(false)
		} as any;

		const mqttApi = new mqtt_api(adapter as any);
		const rawPayload = JSON.stringify({ dps: { "101": { "255": 4 } } });

		await mqttApi.handleDecodedMessage(Q10_DUID, {
			version: "B01",
			protocol: 102,
			payload: Buffer.from(rawPayload, "utf8")
		});

		const raw102Logs = adapter.rLog.mock.calls.filter((call) => call[0] === "MQTT" && call[1] === Q10_DUID && call[2] === "<-" && call[4] === "102" && call[5] === rawPayload);
		expect(raw102Logs).toHaveLength(1);
	});

	it("should suppress raw logs for recognized unsolicited Q10 protocol 102 payloads", async () => {
		const adapter = new MockAdapter() as MockAdapter & {
			deviceFeatureHandlers: Map<string, unknown>;
			getB01Variant: ReturnType<typeof vi.fn>;
			getDeviceProtocolVersion: ReturnType<typeof vi.fn>;
			rLog: ReturnType<typeof vi.fn>;
			requestsHandler: { isRequestRecentlyFinished: ReturnType<typeof vi.fn> };
		};
		adapter.deviceFeatureHandlers = new Map([[Q10_DUID, {}]]);
		adapter.getB01Variant = vi.fn().mockResolvedValue("Q10");
		adapter.getDeviceProtocolVersion = vi.fn().mockResolvedValue("B01");
		adapter.rLog = vi.fn();
		adapter.requestsHandler = {
			isRequestRecentlyFinished: vi.fn().mockReturnValue(false)
		} as any;

		const mqttApi = new mqtt_api(adapter as any);
		const rawPayload = JSON.stringify({ dps: { "101": { "52": { op: "select", result: 1 } } } });

		await (mqttApi as any).handleProtocol102(Q10_DUID, {
			protocol: 102,
			payload: Buffer.from(rawPayload, "utf8")
		});

		expect(adapter.rLog).not.toHaveBeenCalledWith("MQTT", Q10_DUID, "<-", "B01", "102", rawPayload, "debug");
	});

	it("should forward unsolicited Q10 live path-only 301 payloads to the feature handler", async () => {
		const adapter = new MockAdapter() as MockAdapter & {
			deviceFeatureHandlers: Map<string, unknown>;
			getB01Variant: ReturnType<typeof vi.fn>;
			requestsHandler: {
				getPendingBinaryRequest: ReturnType<typeof vi.fn>;
				hasPendingPhotoRequest: ReturnType<typeof vi.fn>;
				resolvePendingRequest: ReturnType<typeof vi.fn>;
			};
			rLog: ReturnType<typeof vi.fn>;
		};
		const applyQ10LiveMapPayload = vi.fn().mockResolvedValue(undefined);
		adapter.deviceFeatureHandlers = new Map([[Q10_DUID, { applyQ10LiveMapPayload }]]);
		adapter.getB01Variant = vi.fn().mockResolvedValue("Q10");
		adapter.requestsHandler = {
			getPendingBinaryRequest: vi.fn().mockReturnValue(undefined),
			hasPendingPhotoRequest: vi.fn().mockReturnValue(false),
			resolvePendingRequest: vi.fn()
		} as any;
		adapter.rLog = vi.fn();

		const mqttApi = new mqtt_api(adapter as any);
		const pathOnlyPayload = Buffer.from(
			"02010084000200000039ffbe0000fffdfffcfff5ffe00000ffd30008ffbf0010ffab0018ff970020ff830028ff6f0030ff570038ff430040ff2b0048ff170050ff03005cfeeb0064fedb006cfec70074feb3007cfe9b0084fe87008cfe770098fe5f00a0fe4b00a8fe3700b0fe2300b8fe0f00c0fdff00c8fdeb00d0fdd700d8fdc300e0fdaf00e8fd9f00f0fd8b00f8fd770100fd630108fd4f0110fd3b0118fd270120fd0f012cfcff0134fceb013cfcd70144fcc3014cfcaf0154fc9b015cfc870164fc77016cfc630174fc4f017cfc3b0184fc27018cfc130198fbf701a0fbe701a8fbcf01b0fbbf01b8fbab01c0fb97",
			"hex"
		);

		await mqttApi.handleDecodedMessage(Q10_DUID, {
			version: "B01",
			protocol: 301,
			payload: pathOnlyPayload
		});

		expect(applyQ10LiveMapPayload).toHaveBeenCalledWith(pathOnlyPayload);
		expect(adapter.requestsHandler.resolvePendingRequest).not.toHaveBeenCalled();
	});

	it("should not consume the pending live-map request with a Q10 path-only 301 payload", async () => {
		const adapter = new MockAdapter() as MockAdapter & {
			deviceFeatureHandlers: Map<string, unknown>;
			getB01Variant: ReturnType<typeof vi.fn>;
			pendingRequests: Map<number, unknown>;
			b01MapResponseQueue: Map<string, string[]>;
			requestsHandler: {
				getPendingBinaryRequest: ReturnType<typeof vi.fn>;
				hasPendingPhotoRequest: ReturnType<typeof vi.fn>;
				resolvePendingRequest: ReturnType<typeof vi.fn>;
			};
			rLog: ReturnType<typeof vi.fn>;
		};
		const applyQ10LiveMapPayload = vi.fn().mockResolvedValue(undefined);
		const pathOnlyPayload = Buffer.from(
			"02010084000200000039ffbe0000fffdfffcfff5ffe00000ffd30008ffbf0010ffab0018ff970020ff830028ff6f0030ff570038ff430040ff2b0048ff170050ff03005cfeeb0064fedb006cfec70074feb3007cfe9b0084fe87008cfe770098fe5f00a0fe4b00a8fe3700b0fe2300b8fe0f00c0fdff00c8fdeb00d0fdd700d8fdc300e0fdaf00e8fd9f00f0fd8b00f8fd770100fd630108fd4f0110fd3b0118fd270120fd0f012cfcff0134fceb013cfcd70144fcc3014cfcaf0154fc9b015cfc870164fc77016cfc630174fc4f017cfc3b0184fc27018cfc130198fbf701a0fbe701a8fbcf01b0fbbf01b8fbab01c0fb97",
			"hex"
		);

		adapter.deviceFeatureHandlers = new Map([[Q10_DUID, { applyQ10LiveMapPayload }]]);
		adapter.getB01Variant = vi.fn().mockResolvedValue("Q10");
		adapter.pendingRequests = new Map([[1, { method: "get_map_v1", duid: Q10_DUID }]]);
		adapter.b01MapResponseQueue = new Map([[Q10_DUID, ["get_map_v1"]]]);
		adapter.requestsHandler = {
			getPendingBinaryRequest: vi.fn().mockReturnValue({ method: "get_map_v1", duid: Q10_DUID, binaryType: "map" }),
			hasPendingPhotoRequest: vi.fn().mockReturnValue(false),
			resolvePendingRequest: vi.fn()
		} as any;
		adapter.rLog = vi.fn();

		const mqttApi = new mqtt_api(adapter as any);

		await mqttApi.handleDecodedMessage(Q10_DUID, {
			version: "B01",
			protocol: 301,
			payload: pathOnlyPayload
		});

		expect(applyQ10LiveMapPayload).toHaveBeenCalledWith(pathOnlyPayload);
		expect(adapter.requestsHandler.resolvePendingRequest).not.toHaveBeenCalled();
		expect(adapter.pendingRequests.has(1)).toBe(true);
		expect(adapter.b01MapResponseQueue.get(Q10_DUID)).toEqual(["get_map_v1"]);
	});

	it("should forward chunk-assembled unsolicited Q10 live map payloads to the feature handler", async () => {
		const adapter = new MockAdapter() as MockAdapter & {
			deviceFeatureHandlers: Map<string, unknown>;
			getB01Variant: ReturnType<typeof vi.fn>;
			requestsHandler: {
				getPendingBinaryRequest: ReturnType<typeof vi.fn>;
				hasPendingPhotoRequest: ReturnType<typeof vi.fn>;
				resolvePendingRequest: ReturnType<typeof vi.fn>;
			};
			rLog: ReturnType<typeof vi.fn>;
		};
		const applyQ10LiveMapPayload = vi.fn().mockResolvedValue(undefined);
		const livePayload = Buffer.from(
			"02010084000200000039ffbe0000fffdfffcfff5ffe00000ffd30008ffbf0010ffab0018ff970020ff830028ff6f0030ff570038ff430040ff2b0048ff170050ff03005cfeeb0064fedb006cfec70074feb3007cfe9b0084fe87008cfe770098fe5f00a0fe4b00a8fe3700b0fe2300b8fe0f00c0fdff00c8fdeb00d0fdd700d8fdc300e0fdaf00e8fd9f00f0fd8b00f8fd770100fd630108fd4f0110fd3b0118fd270120fd0f012cfcff0134fceb013cfcd70144fcc3014cfcaf0154fc9b015cfc870164fc77016cfc630174fc4f017cfc3b0184fc27018cfc130198fbf701a0fbe701a8fbcf01b0fbbf01b8fbab01c0fb97",
			"hex"
		);

		adapter.deviceFeatureHandlers = new Map([[Q10_DUID, { applyQ10LiveMapPayload }]]);
		adapter.getB01Variant = vi.fn().mockResolvedValue("Q10");
		adapter.requestsHandler = {
			getPendingBinaryRequest: vi.fn().mockReturnValue(undefined),
			hasPendingPhotoRequest: vi.fn().mockReturnValue(false),
			resolvePendingRequest: vi.fn()
		} as any;
		adapter.rLog = vi.fn();

		const mqttApi = new mqtt_api(adapter as any);
		vi.spyOn((mqttApi as any).chunkAssembler, "process").mockResolvedValue({
			type: "map",
			payload: livePayload
		});
		vi.spyOn((mqttApi as any).q10DpDispatcher, "tryHandleCleanRecordBlob").mockResolvedValue(false);

		await mqttApi.handleDecodedMessage(Q10_DUID, {
			version: "B01",
			protocol: 301,
			seq: 1,
			payloadLen: 640,
			payload: Buffer.alloc(640, 0)
		});

		expect(applyQ10LiveMapPayload).toHaveBeenCalledWith(livePayload);
		expect(adapter.requestsHandler.resolvePendingRequest).not.toHaveBeenCalled();
	});

	it("should log Q10 DP publishes on debug", async () => {
		const adapter = new MockAdapter() as MockAdapter & {
			rLog: ReturnType<typeof vi.fn>;
			mqtt_api: { sendMessage: ReturnType<typeof vi.fn> };
		};
		adapter.rLog = vi.fn();
		adapter.mqtt_api = {
			sendMessage: vi.fn().mockResolvedValue(undefined)
		} as any;

		const handler = new requestsHandler(adapter as any);
		(handler as any).messageParser.buildRoborockMessage = vi.fn().mockResolvedValue(Buffer.from("aa", "hex"));

		await handler.publishB01Dp(Q10_DUID, { "102": 1 });

		expect(adapter.rLog).toHaveBeenCalledWith("MQTT", Q10_DUID, "->", "B01", 101, `Q10 DP publish: ${JSON.stringify({ "102": 1 })}`, "debug");
	});

	it("should map source-first Q10 voice and country fields instead of the old language alias", async () => {
		await harness.feature.applyQ10ShadowDpPayload({
			"101": {
				"36": 103,
				"108": 4,
				"109": "de"
			}
		});

		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.voice_language`]).toBe(103);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.voice_version`]).toBe(4);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.robot_country_code`]).toBe("de");
		expect(harness.adapter.objects[`Devices.${Q10_DUID}.deviceStatus.robot_country_code`]?.common?.type).toBe("string");
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.language`]).toBeUndefined();
	});

	it("should map shadow consumables and request timers when timer type changes", async () => {
		await harness.feature.applyQ10ShadowDpPayload({
			"125": 30,
			"126": 33,
			"127": 33,
			"101": {
				"67": 33,
				"93": 1
			}
		});

		expect(harness.adapter.states[`Devices.${Q10_DUID}.consumables.main_brush_work_time`]).toBe(30);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.consumables.side_brush_work_time`]).toBe(33);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.consumables.filter_work_time`]).toBe(33);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.consumables.sensor_dirty_time`]).toBe(33);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.deviceStatus.timer_type`]).toBe(1);
		expect(harness.adapter.requestsHandler.publishB01Dp).toHaveBeenCalledWith(Q10_DUID, { "101": { "69": 0 } });
	});

	it("should still convert oversized shadow consumable counters as used seconds", async () => {
		await harness.feature.applyQ10ShadowDpPayload({
			"125": 73044,
			"101": {
				"67": 34127
			}
		});

		expect(harness.adapter.states[`Devices.${Q10_DUID}.consumables.main_brush_work_time`]).toBe(280);
		expect(harness.adapter.states[`Devices.${Q10_DUID}.consumables.sensor_dirty_time`]).toBe(21);
	});

	it("should synthesize the Q10 robot pose from the dock for charging-like live states", () => {
		const chargingStatus = {
			deviceState: 8,
			deviceWorkMode: 0,
			deviceCleanMode: 0,
			isDustCollect: false,
			deviceFault: 0
		};
		const baseMap = createSyntheticQ10Map([], 100, 40, {
			chargerPixel: { x: 20, y: 20, phi: 0 }
		});

		const updated = new Q10MapCreator().create(baseMap, chargingStatus);

		expect(updated.q10CreatorData?.robotPixel?.x).toBeCloseTo(23.5);
		expect(updated.q10CreatorData?.robotPixel?.y).toBeCloseTo(20);
		expect(updated.q10CreatorData?.robotPixel?.phi).toBe(0);
		expect(baseMap.q10CreatorData?.robotPixel).toBeUndefined();
	});

	it("should synthesize the Q10 robot pose from the dock for parked docked live states", () => {
		const dockedStatus = {
			deviceState: 4,
			deviceWorkMode: 0,
			deviceCleanMode: 0,
			isDustCollect: false,
			deviceFault: 0
		};
		const baseMap = createSyntheticQ10Map([], 100, 40, {
			chargerPixel: { x: 20, y: 20, phi: 0 }
		});

		const updated = new Q10MapCreator().create(baseMap, dockedStatus);

		expect(updated.q10CreatorData?.robotPixel?.x).toBeCloseTo(23.5);
		expect(updated.q10CreatorData?.robotPixel?.y).toBeCloseTo(20);
		expect(updated.q10CreatorData?.robotPixel?.phi).toBe(0);
	});

	it("should synthesize the Q10 robot pose from the dock when shadow state 10 omits the live robot pose", () => {
		const q10ShadowStatus = {
			deviceState: 10,
			deviceWorkMode: 0,
			deviceCleanMode: 0,
			isDustCollect: false,
			deviceFault: 0
		};
		const baseMap = createSyntheticQ10Map([], 100, 40, {
			chargerPixel: { x: 20, y: 20, phi: 0 }
		});

		const updated = new Q10MapCreator().create(baseMap, q10ShadowStatus);

		expect(updated.q10CreatorData?.robotPixel?.x).toBeCloseTo(23.5);
		expect(updated.q10CreatorData?.robotPixel?.y).toBeCloseTo(20);
		expect(updated.q10CreatorData?.robotPixel?.phi).toBe(0);
	});

	it("should preserve an explicit Q10 robot pose instead of re-anchoring it to the dock", () => {
		const chargingStatus = {
			deviceState: 8,
			deviceWorkMode: 0,
			deviceCleanMode: 0,
			isDustCollect: false,
			deviceFault: 0
		};
		const baseMap = createSyntheticQ10Map([], 100, 40, {
			chargerPixel: { x: 20, y: 20, phi: 0 }
		});
		baseMap.q10SourceData!.robotPosition = { x: 40, y: 30, phi: 90 };
		baseMap.q10CreatorData!.robotPixel = { x: 40, y: 10, phi: 90 };

		const updated = new Q10MapCreator().create(baseMap, chargingStatus);

		expect(updated.q10CreatorData?.robotPixel?.x).toBeCloseTo(40);
		expect(updated.q10CreatorData?.robotPixel?.y).toBeCloseTo(10);
		expect(updated.q10CreatorData?.robotPixel?.phi).toBe(90);
		expect(updated.q10SourceData?.robotPosition).toEqual({ x: 40, y: 30, phi: 90 });
	});

	it("should decode sniff-derived Q10 virtual wall dp payloads exactly", () => {
		const walls = parseQ10VirtualWallDpPayload(Buffer.from("AgD7/PQA+Pr9APj89/93/Pg=", "base64"));

		expect(walls).toEqual([
			{
				type: "virtualWall",
				areaType: 1,
				points: [
					{ x: 25.1, y: -78 },
					{ x: 24.8, y: -128.3 }
				]
			},
			{
				type: "virtualWall",
				areaType: 1,
				points: [
					{ x: 24.8, y: -77.7 },
					{ x: -13.7, y: -77.6 }
				]
			}
		]);
	});

	it("should render Q10 virtual walls into the generated map image", async () => {
		const builder = new Q10MapBuilder();
		const baseMap = createSyntheticQ10Map([], 100, 40, {
			chargerPixel: { x: 20, y: 20, phi: 0 }
		});
		const wallMap = createSyntheticQ10Map([], 100, 40, {
			chargerPixel: { x: 20, y: 20, phi: 0 }
		});
		wallMap.q10SourceData!.virtualWalls = [
			{
				type: "virtualWall",
				areaType: 1,
				points: [
					{ x: 10, y: 10 },
					{ x: 30, y: 10 }
				]
			}
		];

		const baseCreated = new Q10MapCreator().create(baseMap);
		const wallCreated = new Q10MapCreator().create(wallMap);
		const scale = q10RenderScale(wallCreated.header.sizeX, wallCreated.header.sizeY);
		const base = await decodePngRgba(await builder.buildMap(baseCreated, undefined));
		const rendered = await decodePngRgba(await builder.buildMap(wallCreated, undefined));

		expect(pixelAt(rendered, 20 * scale, 30 * scale)).not.toEqual(pixelAt(base, 20 * scale, 30 * scale));
	});

	it("should expose whether a Q10 path-only packet reused overlay metadata from runtime cache", async () => {
		const adapter = createQ10MockAdapter({ duid: Q10_DUID, assetErrorMessage: "asset not found" });
		const manager = new MapManager(adapter as any);

		const previous = createSyntheticQ10Map(
			[
				{ x: 10, y: 10, type: 2 },
				{ x: 12, y: 12, type: 2 }
			],
			100,
			40,
			{ chargerPixel: { x: 20, y: 20, phi: 0 } }
		);
		previous.q10SourceData!.mapId = 21;
		previous.q10SourceData!.virtualWalls = [
			{
				type: "virtualWall",
				areaType: 1,
				points: [
					{ x: 1, y: 1 },
					{ x: 4, y: 1 }
				]
			}
		];

		(manager as any).q10StateByDevice.set(`${Q10_DUID}:live`, previous);

		const result = await (manager as any).processQ10Payload(
			{
				classification: {
					isQ10Payload: true,
					isLiveMapCandidate: true,
					payloadShape: "map",
					blobType: null,
					mapData: null,
					pathPoints: [
						{ x: 15, y: 15, type: 2 },
						{ x: 18, y: 18, type: 2 }
					]
				},
				mapData: null
			},
			Q10_DUID,
			"B01",
			Q10_TEST_DEVICE_STATUS,
			Q10_MODEL
		);

		expect(result?.mapData?.q10RuntimeDebug?.packetKind).toBe("path-only");
		expect(result?.mapData?.q10RuntimeDebug?.overlaySeedSource).toBe("runtime-cache");
		expect(result?.mapData?.q10RuntimeDebug?.sourceVirtualWalls).toBe(0);
		expect(result?.mapData?.q10RuntimeDebug?.virtualWalls).toBe(1);
	});

	it("should apply a Q10 path-only prelude that arrives before the first full live map", async () => {
		const adapter = createQ10MockAdapter({ duid: Q10_DUID, assetErrorMessage: "asset not found" });
		const manager = new MapManager(adapter as any);

		const prelude = await (manager as any).processQ10Payload(
			{
				classification: {
					isQ10Payload: true,
					isLiveMapCandidate: true,
					payloadShape: "map",
					blobType: null,
					mapData: null,
					pathPoints: [
						{ x: 15, y: 15, type: 2, update: 5 },
						{ x: 18, y: 18, type: 2, update: 5 }
					]
				},
				mapData: null
			},
			Q10_DUID,
			"B01",
			Q10_TEST_DEVICE_STATUS,
			Q10_MODEL
		);

		expect(prelude).toBeNull();

		const current = createSyntheticQ10Map([], 100, 40, {
			chargerPixel: { x: 20, y: 20, phi: 0 }
		});
		current.q10SourceData!.mapId = 77;

		const result = await (manager as any).processQ10Payload(
			{
				classification: {
					isQ10Payload: true,
					isLiveMapCandidate: true,
					payloadShape: "map",
					blobType: 1,
					mapData: current,
					pathPoints: null
				},
				mapData: current
			},
			Q10_DUID,
			"B01",
			Q10_TEST_DEVICE_STATUS,
			Q10_MODEL
		);

		expect(result?.mapData?.q10SourceData?.pathPoints).toHaveLength(2);
		expect(result?.mapData?.q10RuntimeDebug?.pathPoints).toBe(2);
		expect(result?.mapData?.history).toHaveLength(2);
	});

	it("should reuse same-map Q10 live runtime path points and overlays in a new full live map", async () => {
		const adapter = createQ10MockAdapter({ duid: Q10_DUID, assetErrorMessage: "asset not found" });
		const manager = new MapManager(adapter as any);

		const previous = createSyntheticQ10Map(
			[
				{ x: 10, y: 10, type: 2 },
				{ x: 12, y: 12, type: 2 }
			],
			100,
			40,
			{ chargerPixel: { x: 20, y: 20, phi: 0 } }
		);
		previous.q10SourceData!.mapId = 44;
		previous.q10SourceData!.pathPoints = [
			{ x: 10, y: 10, type: 2, update: 5 },
			{ x: 12, y: 12, type: 2, update: 5 }
		];
		previous.q10SourceData!.virtualWalls = [
			{
				type: "virtualWall",
				areaType: 1,
				points: [
					{ x: 1, y: 1 },
					{ x: 4, y: 1 }
				]
			}
		];

		const current = createSyntheticQ10Map([], 100, 40, {
			chargerPixel: { x: 20, y: 20, phi: 0 }
		});
		current.q10SourceData!.mapId = 44;

		(manager as any).q10StateByDevice.set(`${Q10_DUID}:live`, previous);

		const result = await (manager as any).processQ10Payload(
			{
				classification: {
					isQ10Payload: true,
					isLiveMapCandidate: true,
					payloadShape: "map",
					blobType: 2,
					mapData: current,
					pathPoints: null
				},
				mapData: current
			},
			Q10_DUID,
			"B01",
			Q10_TEST_DEVICE_STATUS,
			Q10_MODEL
		);

		expect(result?.mapData?.q10SourceData?.pathPoints).toHaveLength(2);
		expect(result?.mapData?.q10SourceData?.virtualWalls).toHaveLength(1);
		expect(result?.mapData?.q10RuntimeDebug?.pathPoints).toBe(2);
		expect(result?.mapData?.q10RuntimeDebug?.overlaySeedSource).toBe("runtime-cache");
	});

	it("should not inherit Q10 live runtime state into a different map id", async () => {
		const adapter = createQ10MockAdapter({ duid: Q10_DUID, assetErrorMessage: "asset not found" });
		const manager = new MapManager(adapter as any);

		const previous = createSyntheticQ10Map(
			[
				{ x: 10, y: 10, type: 2 },
				{ x: 12, y: 12, type: 2 }
			],
			100,
			40,
			{ chargerPixel: { x: 20, y: 20, phi: 0 } }
		);
		previous.q10SourceData!.mapId = 44;
		previous.q10SourceData!.virtualWalls = [
			{
				type: "virtualWall",
				areaType: 1,
				points: [
					{ x: 1, y: 1 },
					{ x: 4, y: 1 }
				]
			}
		];

		const current = createSyntheticQ10Map([], 100, 40, {
			chargerPixel: { x: 20, y: 20, phi: 0 }
		});
		current.q10SourceData!.mapId = 55;

		(manager as any).q10StateByDevice.set(`${Q10_DUID}:live`, previous);

		const result = await (manager as any).processQ10Payload(
			{
				classification: {
					isQ10Payload: true,
					isLiveMapCandidate: true,
					payloadShape: "map",
					blobType: 2,
					mapData: current,
					pathPoints: null
				},
				mapData: current
			},
			Q10_DUID,
			"B01",
			Q10_TEST_DEVICE_STATUS,
			Q10_MODEL
		);

		expect(result?.mapData?.q10SourceData?.pathPoints).toHaveLength(0);
		expect(result?.mapData?.q10SourceData?.virtualWalls).toHaveLength(0);
		expect(result?.mapData?.q10RuntimeDebug?.overlaySeedSource).toBe("none");
	});

	it("should translate Q10 live overlay shadow dps into a live map patch", async () => {
		const { adapter, feature } = createQ10FeatureHarness();
		const applyPatch = (adapter as any).mapManager.applyQ10LiveStatePatch as ReturnType<typeof vi.fn>;

		const restricted = Buffer.alloc(40);
		restricted[1] = 1;
		restricted[2] = 3;
		restricted.writeInt16BE(10, 4);
		restricted.writeInt16BE(20, 6);
		restricted.writeInt16BE(30, 8);
		restricted.writeInt16BE(40, 10);
		restricted.writeInt16BE(50, 12);
		restricted.writeInt16BE(60, 14);
		restricted.writeInt16BE(70, 16);
		restricted.writeInt16BE(80, 18);

		const wall = Buffer.alloc(9);
		wall[0] = 1;
		wall.writeInt16BE(100, 1);
		wall.writeInt16BE(200, 3);
		wall.writeInt16BE(300, 5);
		wall.writeInt16BE(400, 7);

		await feature.applyQ10ShadowDpPayload({
			"101": {
				"55": restricted.toString("base64"),
				"57": wall.toString("base64"),
				"65": {
					op: "list",
					result: 1,
					data: [
						{
							id: 101,
							vertexs: [
								[10, 20],
								[30, 20],
								[30, 40],
								[10, 40]
							]
						}
					]
				},
				"98": [[100, 200]],
				"100": [[300, 400]],
				"103": [[500, 600]]
			}
		});

		expect(applyPatch).toHaveBeenCalledTimes(1);
		expect(applyPatch).toHaveBeenCalledWith(Q10_DUID, {
			virtualWalls: [
				{
					type: "virtualWall",
					areaType: 1,
					points: [
						{ x: 10, y: 20 },
						{ x: 30, y: 40 }
					]
				}
			],
			forbidAreas: [],
			mopAreas: [],
			thresholdAreas: [
				{
					type: "threshold",
					areaType: 3,
					name: undefined,
					points: [
						{ x: 1, y: 2 },
						{ x: 3, y: 4 },
						{ x: 5, y: 6 },
						{ x: 7, y: 8 }
					]
				}
			],
			carpetAreas: [
				{
					id: 101,
					type: "carpet",
					points: [
						{ x: 1, y: 2 },
						{ x: 3, y: 2 },
						{ x: 3, y: 4 },
						{ x: 1, y: 4 }
					]
				}
			],
			suspectedPoints: [
				{ type: "easycard", point: { x: 10, y: 20 } },
				{ type: "threshold", point: { x: 30, y: 40 } },
				{ type: "cliff", point: { x: 50, y: 60 } }
			]
		});
	});

	it("should prefer cached B01 device status over stale persisted status values", async () => {
		const adapter = createQ10MockAdapter({ duid: Q10_DUID, assetErrorMessage: "asset not found" }) as ReturnType<typeof createQ10MockAdapter> & {
			getStateAsync: (id: string) => Promise<{ val: number } | null>;
		};
		adapter.getStateAsync = async (id: string) =>
			id.includes(`Devices.${Q10_DUID}.deviceStatus.`) ? { val: 0 } : null;

		const manager = new MapManager(adapter as any);
		manager.updateB01DeviceStatus(Q10_DUID, {
			deviceState: 4,
			deviceWorkMode: 0,
			deviceCleanMode: 0,
			isDustCollect: false,
			deviceFault: 0
		});

		const status = await (manager as any).getDeviceStatusForB01(Q10_DUID);
		expect(status.deviceState).toBe(4);
	});

	it("should publish runtime status updates into the shared adapter map manager", async () => {
		const { adapter, feature } = createQ10FeatureHarness();

		await (feature as any).processStatus({
			status: 4,
			clean_mode: 1,
			work_mode: 2,
			battery: 87,
			fault: 0,
			dust_action: 1
		});

		expect((adapter as any).mapManager.updateB01DeviceStatus).toHaveBeenCalledWith(Q10_DUID, {
			deviceState: 4,
			deviceWorkMode: 2,
			deviceCleanMode: 1,
			deviceFault: 0,
			deviceBattery: 87,
			isDustCollect: true
		});
	});

	it("should decompress a simple LZ4 literal block", () => {
		const compressed = Uint8Array.from([0x40, 0x61, 0x62, 0x63, 0x64]);
		const decompressed = decompressQ10Lz4Block(compressed, 4);

		expect(Buffer.from(decompressed).toString("utf8")).toBe("abcd");
	});

	it("should decompress a simple repeating LZ4 block", () => {
		const compressed = Uint8Array.from([0x11, 0x61, 0x01, 0x00]);
		const decompressed = decompressQ10Lz4Block(compressed, 6);

		expect(Buffer.from(decompressed).toString("utf8")).toBe("aaaaaa");
	});

	it("should decrypt, parse and render a Q10 sample map", async () => {
		const rawInput = getFirstSample();
		if (!rawInput) {
			console.warn("Skipping Q10 map test: embedded representative sample missing");
			return;
		}

		const decrypted = MapDecryptor.decrypt(rawInput, Q10_SN, Q10_MODEL, Q10_DUID, mockAdapter, Q10_LOCAL_KEY);
		expect(decrypted).not.toBeNull();
		expect(classifyB01MapPayload(decrypted!).variant).toBe("q10");

		const parser = new MapParser(mockAdapter);
		const mapData = parser.parse(rawInput, Q10_SN, Q10_MODEL, Q10_DUID, "B01");

		expect(mapData).not.toBeNull();
		expect(mapData?.sourceFormat).toBe("q10-raw");
		expect(mapData?.mapGrid.length).toBe((mapData?.header.sizeX || 0) * (mapData?.header.sizeY || 0));
		expect(mapData?.rooms && mapData.rooms.length).toBeGreaterThan(0);
		expect(mapData?.chargerPos).toBeDefined();
		expect(mapData?.q10SourceData).toBeDefined();
		expect(mapData?.rooms?.some((room) => room.roomName.startsWith("rr_"))).toBe(true);
		expect(mapData?.rooms?.some((room) => room.roomName.includes("Ã"))).toBe(false);

		const created = new Q10MapCreator().create(mapData!);
		expect(created.q10CreatorData?.q10Detected).toBe(true);
		expect(created.q10Verification).toBeDefined();
		expect(created.q10Verification?.items.paths.state).toBe("verified_with_current_samples");
		expect(created.q10Verification?.items.skipPoints.state).toBe("ported_unverified");
		const builder = new Q10MapBuilder();
		const pngBuffer = await builder.buildMap(created, undefined);

		expect(pngBuffer.length).toBeGreaterThan(1000);
		expect(pngBuffer.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
	});

	it("should reconstruct self-identified carpets by carpet id like the original app", () => {
		const rawInput = getFirstSample();
		if (!rawInput) {
			console.warn("Skipping Q10 carpet reconstruction test: embedded representative sample missing");
			return;
		}

		const decrypted = MapDecryptor.decrypt(rawInput, Q10_SN, Q10_MODEL, Q10_DUID, mockAdapter, Q10_LOCAL_KEY);
		expect(decrypted).not.toBeNull();

		const mapData = parseQ10YxMapToB01(decrypted!);
		expect(mapData?.carpetGrid).toBeDefined();

		const created = new Q10MapCreator().create(mapData!);
		const carpets = created.q10CreatorData?.selfIdentifiedCarpets ?? [];

		expect(carpets.map((carpet) => carpet.carpetID)).toEqual([1, 2]);
		expect(carpets.map((carpet) => carpet.id)).toEqual([1, 2]);
		expect(carpets[0]?.width).toBeGreaterThan(0);
		expect(carpets[0]?.height).toBeGreaterThan(0);
		expect(carpets[1]?.width).toBeGreaterThan(0);
		expect(carpets[1]?.height).toBeGreaterThan(0);
		expect(Array.from(carpets[0]?.mask ?? []).every((value) => value === 0 || value === 1)).toBe(true);
		expect(Array.from(carpets[1]?.mask ?? []).every((value) => value === 0 || value === 1)).toBe(true);
	});

	it("should build the original 3x3 diagonal self-identified carpet source mask", () => {
		const builder = new Q10MapBuilder();
		const carpet = {
			id: 1,
			carpetID: 1,
			left: 0,
			top: 0,
			right: 1,
			bottom: 1,
			width: 1,
			height: 1,
			lt: { x: 0, y: 0 },
			rb: { x: 1, y: 1 },
			mask: Buffer.from([1])
		};

		const canvas = (builder as any).buildSelfIdentifiedCarpetSourceCanvas(carpet);
		expect(canvas).toBeTruthy();

		const ctx = canvas.getContext("2d");
		const rgba = ctx.getImageData(0, 0, 3, 3).data;
		const alphaAt = (x: number, y: number): number => rgba[(y * 3 + x) * 4 + 3] ?? 0;

		expect(alphaAt(2, 0)).toBe(120);
		expect(alphaAt(1, 1)).toBe(120);
		expect(alphaAt(0, 2)).toBe(120);
		expect(alphaAt(0, 0)).toBe(0);
		expect(alphaAt(1, 0)).toBe(0);
		expect(alphaAt(0, 1)).toBe(0);
		expect(alphaAt(2, 1)).toBe(0);
		expect(alphaAt(1, 2)).toBe(0);
		expect(alphaAt(2, 2)).toBe(0);
	});

	it("should project the original 3x3 self-identified carpet texels sharply into backend PNG space", () => {
		const builder = new Q10MapBuilder();
		const carpet = {
			id: 1,
			carpetID: 1,
			left: 0,
			top: 0,
			right: 1,
			bottom: 1,
			width: 1,
			height: 1,
			lt: { x: 0, y: 0 },
			rb: { x: 1, y: 1 },
			mask: Buffer.from([1])
		};

		const canvas = createCanvas(8, 8);
		const ctx = canvas.getContext("2d");
		(builder as any).drawSelfIdentifiedCarpetToExport(ctx, carpet, 8);

		const rgba = ctx.getImageData(0, 0, 8, 8).data;
		const alphaAt = (x: number, y: number): number => rgba[(y * 8 + x) * 4 + 3] ?? 0;

		for (let y = 0; y < 3; y++) {
			for (let x = 5; x < 8; x++) {
				expect(alphaAt(x, y)).toBe(120);
			}
		}
		for (let y = 3; y < 5; y++) {
			for (let x = 3; x < 5; x++) {
				expect(alphaAt(x, y)).toBe(120);
			}
		}
		for (let y = 5; y < 8; y++) {
			for (let x = 0; x < 3; x++) {
				expect(alphaAt(x, y)).toBe(120);
			}
		}
		expect(alphaAt(4, 0)).toBe(0);
		expect(alphaAt(2, 3)).toBe(0);
		expect(alphaAt(5, 5)).toBe(0);
	});

	it("should parse the canonical Q10 map header via strict original blob-prefix stripping and big-endian semantics", () => {
		const rawInput = getFirstSample();
		if (!rawInput) {
			console.warn("Skipping Q10 header test: embedded representative sample missing");
			return;
		}

		const decrypted = MapDecryptor.decrypt(rawInput, Q10_SN, Q10_MODEL, Q10_DUID, mockAdapter, Q10_LOCAL_KEY);
		expect(decrypted).not.toBeNull();

		const mapData = parseQ10YxMapToB01(decrypted!);

		expect(mapData).not.toBeNull();
		expect(mapData?.header.sizeX).toBe(124);
		expect(mapData?.header.sizeY).toBe(238);
		expect(mapData?.header.minX).toBeCloseTo(15.9, 6);
		expect(mapData?.header.maxY).toBeCloseTo(40.1, 6);
		expect(mapData?.header.minY).toBeCloseTo(28.2, 6);
		expect(mapData?.header.maxX).toBeCloseTo(22.1, 6);
		expect(mapData?.header.resolution).toBeCloseTo(0.05, 6);
		expect(mapData?.chargerPos?.x).toBeCloseTo(5.3, 6);
		expect(mapData?.chargerPos?.y).toBeCloseTo(41.5, 6);
		expect(mapData?.chargerPos?.phi).toBe(-359);
		expect(mapData?.q10SourceData?.mapId).toBe(1772902161);
		expect(mapData?.q10SourceData?.mapWidth).toBe(124);
		expect(mapData?.q10SourceData?.mapHeight).toBe(238);
		expect(mapData?.q10SourceData?.resolution).toBeCloseTo(0.05, 6);
		expect(mapData?.q10SourceData?.xMin).toBeCloseTo(15.9, 6);
		expect(mapData?.q10SourceData?.yMin).toBeCloseTo(40.1, 6);
		expect(mapData?.q10SourceData?.chargePosition?.x).toBeCloseTo(-10.6, 6);
		expect(mapData?.q10SourceData?.chargePosition?.y).toBeCloseTo(-1.4, 6);
		expect(mapData?.q10SourceData?.chargePosition?.phi).toBe(-359);
	});

	it("should localize roomNN labels in the Q10 creator like replaceRoomName in the original app", () => {
		const map = createSyntheticQ10Map([], 20, 10, {
			chargerPixel: { x: 1, y: 1, phi: 0 }
		});
		map.mapGrid.fill(1);
		for (let y = 2; y < 8; y++) {
			for (let x = 2; x < 10; x++) {
				map.mapGrid[y * 20 + x] = 2;
			}
		}
		map.rooms = [{ roomId: 11, roomName: "room12", gridValue: 2 }];
		map.q10SourceData!.rooms = [{
			roomID: 11,
			roomName: "room12",
			roomType: 0,
			roomMaterial: 0,
			cleanOrder: 0,
			cleanCount: 0,
			funLevel: -1,
			waterLevel: -1,
			cleanType: -1,
			cleanLine: 0
		}];

		const created = new Q10MapCreator({
			translationManager: {
				get: (key: string, fallback?: string) => (key === "default_room_name" ? "Raum" : (fallback || ""))
			}
		}).create(map);

		expect(created.q10CreatorData?.roomModels[0]?.roomName).toBe("Raum12");
	});

	it("should refuse synthetic Q10 creator data when source data is missing", () => {
		const base = createSyntheticQ10Map([]);
		const mapData: B01MapData = {
			...base,
			q10CreatorData: undefined,
			q10SourceData: undefined
		};

		expect(() => new Q10MapCreator().create(mapData)).toThrow(/Q10 source data missing/i);
	});

	it("should expose a cleaner Q10 background image for interactive overlays", async () => {
		const rawInput = getFirstSample();
		expect(rawInput).not.toBeNull();

		const mapManager = new MapManager(mockAdapter as any);
		const result = await mapManager.processMap(
			rawInput!,
			"B01",
			Q10_MODEL,
			Q10_SN,
			null,
			Q10_DUID,
			"B01",
			Q10_TEST_DEVICE_STATUS
		);

		expect(result?.mapBase64).toBeDefined();
		expect(result?.mapBase64Clean).toBeDefined();
		expect(result?.mapBase64Clean).not.toBe(result?.mapBase64);

		const full = await decodePngRgba(Buffer.from(result!.mapBase64.slice(result!.mapBase64.indexOf(",") + 1), "base64"));
		const clean = await decodePngRgba(Buffer.from(result!.mapBase64Clean!.slice(result!.mapBase64Clean!.indexOf(",") + 1), "base64"));
		expect(countDifferentPixels(full, clean)).toBeGreaterThan(1000);
	});

	it("should keep Q10 charger and robot out of the clean background image", async () => {
		const builder = new Q10MapBuilder();
		const map = createSyntheticQ10Map([], 100, 40, {
			chargerPixel: { x: 20, y: 20, phi: 0 },
			robotPixel: { x: 24, y: 20, phi: 0 }
		});

		const rendered = await builder.buildMaps(map, undefined);
		const full = await decodePngRgba(rendered.full);
		const clean = await decodePngRgba(rendered.clean);
		const scale = q10RenderScale(map.header.sizeX, map.header.sizeY);

		expect(countDifferentPixels(full, clean)).toBeGreaterThan(0);
		expect(pixelAt(full, 20 * scale, 20 * scale)).not.toEqual(pixelAt(clean, 20 * scale, 20 * scale));
		expect(pixelAt(full, 24 * scale, 20 * scale)).not.toEqual(pixelAt(clean, 24 * scale, 20 * scale));
	});

	it("should render Q10 full-image paths directly from q10SourceData.pathPoints like the original app", async () => {
		const builder = new Q10MapBuilder();
		const map = createSyntheticQ10Map([], 100, 40, {
			chargerPixel: { x: 20, y: 20, phi: 0 },
			robotPixel: { x: 24, y: 20, phi: 0 }
		});
		map.q10CreatorData!.pathPixels = [];
		map.q10SourceData!.pathPoints = [
			{ x: 10, y: 20, type: 0 },
			{ x: 20, y: 20, type: 0 },
			{ x: 30, y: 20, type: 0 }
		];

		const rendered = await builder.buildMaps(map, undefined);
		const full = await decodePngRgba(rendered.full);
		const clean = await decodePngRgba(rendered.clean);
		const scale = q10RenderScale(map.header.sizeX, map.header.sizeY);

		expect(pixelAt(full, 20 * scale, 20 * scale)).not.toEqual(pixelAt(clean, 20 * scale, 20 * scale));
	});

	it("should render q10SourceData.pathPoints in the same coordinate space as creator.pathPixels", async () => {
		const builder = new Q10MapBuilder();
		const sourcePoints = [
			{ x: 10, y: 20, type: 0 },
			{ x: 20, y: 20, type: 0 },
			{ x: 30, y: 20, type: 0 }
		];

		const creatorMap = createSyntheticQ10Map(sourcePoints, 100, 40, {
			chargerPixel: { x: 20, y: 20, phi: 0 },
			robotPixel: { x: 24, y: 20, phi: 0 }
		});
		creatorMap.q10SourceData!.pathPoints = [];

		const sourceMap = createSyntheticQ10Map([], 100, 40, {
			chargerPixel: { x: 20, y: 20, phi: 0 },
			robotPixel: { x: 24, y: 20, phi: 0 }
		});
		sourceMap.q10CreatorData!.pathPixels = [];
		sourceMap.q10SourceData!.pathPoints = sourcePoints;

		const creatorRendered = await decodePngRgba((await builder.buildMaps(creatorMap, undefined)).full);
		const sourceRendered = await decodePngRgba((await builder.buildMaps(sourceMap, undefined)).full);

		expect(Array.from(sourceRendered.rgba)).toEqual(Array.from(creatorRendered.rgba));
	});

	it("should render ceramic room material as orthogonal grout instead of diagonal hatch", async () => {
		const builder = new Q10MapBuilder();
		const createMaterialMap = (ceramic = false) => {
			const map = createSyntheticQ10Map([], 40, 40);
			for (let y = 4; y < 36; y++) {
				for (let x = 4; x < 36; x++) {
					map.mapGrid[y * 40 + x] = 2;
				}
			}
			if (ceramic) {
				map.q10CreatorData!.roomMaterialRoomIds.ceramicTile = [2];
			}
			return map;
		};

		const base = await decodePngRgba(await builder.buildMap(createMaterialMap(false), undefined));
		const rendered = await decodePngRgba(await builder.buildMap(createMaterialMap(true), undefined));
		const scale = q10RenderScale(40, 40);

		let verticalHits = 0;
		for (let x = 16 * scale - 4; x <= 16 * scale + 4; x++) {
			const renderedPixel = pixelAt(rendered, x, 18 * scale);
			const basePixel = pixelAt(base, x, 18 * scale);
			if (renderedPixel.some((channel, index) => channel !== basePixel[index])) verticalHits++;
		}
		expect(verticalHits).toBeGreaterThan(0);

		let horizontalHits = 0;
		for (let y = 16 * scale - 4; y <= 16 * scale + 4; y++) {
			const renderedPixel = pixelAt(rendered, 18 * scale, y);
			const basePixel = pixelAt(base, 18 * scale, y);
			if (renderedPixel.some((channel, index) => channel !== basePixel[index])) horizontalHits++;
		}
		expect(horizontalHits).toBeGreaterThan(0);

		expect(pixelAt(rendered, 18 * 8, 18 * 8)).toEqual(pixelAt(base, 18 * 8, 18 * 8));
	});

	it("should prefer extracted adapter assets over local Q10 plugin paths", async () => {
		const canvas = createCanvas(2, 2);
		const pngBuffer = canvas.toBuffer("image/png");
		const fileExistsAsync = vi.fn().mockResolvedValue(true);
		const readFileAsync = vi.fn().mockResolvedValue({ file: pngBuffer });
		const builder = new Q10MapBuilder({
			name: "roborock.0",
			fileExistsAsync,
			readFileAsync
		});

		const image = await (builder as any).loadImageAsset(
			"drawable-mdpi/src_resources_map_images_light_mapobstacle.png",
			Q10_MODEL
		);

		expect(image).toBeDefined();
		expect(fileExistsAsync).toHaveBeenCalledWith(
			"roborock.0",
			`assets/${Q10_MODEL}/drawable-mdpi/src_resources_map_images_light_mapobstacle.png`
		);
		expect(readFileAsync).toHaveBeenCalledWith(
			"roborock.0",
			`assets/${Q10_MODEL}/drawable-mdpi/src_resources_map_images_light_mapobstacle.png`
		);
	});

	it("should keep type-4 path segments fully invisible", async () => {
		const builder = new Q10MapBuilder();
		const base = await decodePngRgba(await builder.buildMap(createSyntheticQ10Map([]), undefined));
		const hiddenOnly = await decodePngRgba(await builder.buildMap(
			createSyntheticQ10Map([
				{ x: 10, y: 20, type: 4 },
				{ x: 50, y: 20, type: 4 },
				{ x: 90, y: 20, type: 4 }
			]),
			undefined
		));

		expect(hiddenOnly.width).toBe(base.width);
		expect(hiddenOnly.height).toBe(base.height);
		expect(Array.from(hiddenOnly.rgba)).toEqual(Array.from(base.rgba));
	});

	it("should not connect separated visible path subpaths across hidden type-4 sections", async () => {
		const builder = new Q10MapBuilder();
		const base = await decodePngRgba(await builder.buildMap(createSyntheticQ10Map([]), undefined));
		const rendered = await decodePngRgba(await builder.buildMap(
			createSyntheticQ10Map([
				{ x: 10, y: 10, type: 2 },
				{ x: 10, y: 30, type: 2 },
				{ x: 50, y: 30, type: 4 },
				{ x: 90, y: 30, type: 4 },
				{ x: 90, y: 10, type: 2 },
				{ x: 90, y: 20, type: 2 }
			]),
			undefined
		));

		// If same-type segments are accidentally flattened into one polyline,
		// a visible bridge appears around the center of the hidden section.
		const probeX = 50 * 8;
		const probeY = 30 * 8;
		expect(pixelAt(rendered, probeX, probeY)).toEqual(pixelAt(base, probeX, probeY));
	});
});
