import { beforeEach, describe, expect, it, vi } from "vitest";
import { FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";
import { V1VacuumFeatures } from "./v1VacuumFeatures";

// Mock MapManager
vi.mock("../../map/MapManager", () => {
	return {
		MapManager: class {
			processMap = vi.fn().mockResolvedValue({ mapBase64: "base64_map" });
		}
	};
});

describe("V1VacuumFeatures", () => {
	let adapterMock: any;
	let depsMock: any;
	let requestsHandlerMock: any;

	beforeEach(() => {
		requestsHandlerMock = {
			sendRequest: vi.fn().mockResolvedValue({}),
			command: vi.fn().mockResolvedValue(undefined),
			mapParser: { parsedata: vi.fn().mockResolvedValue({}) },
			mapCreator: { canvasMap: vi.fn().mockResolvedValue(["", "", ""]) }
		};

		adapterMock = {
			log: { info: vi.fn(), error: vi.fn(), warn: vi.fn(), debug: vi.fn(), silly: vi.fn() },
			setStateChanged: vi.fn().mockResolvedValue(undefined),
			setState: vi.fn(),
			ensureState: vi.fn().mockResolvedValue(undefined),
			ensureFolder: vi.fn().mockResolvedValue(undefined),
			getStateAsync: vi.fn().mockResolvedValue(undefined),
			getObjectAsync: vi.fn().mockResolvedValue({ common: {} }),
			extendObject: vi.fn().mockResolvedValue(undefined),
			setObject: vi.fn().mockResolvedValue(undefined),
			setObjectNotExistsAsync: vi.fn().mockResolvedValue(undefined),
			requestsHandler: requestsHandlerMock,
			getDeviceProtocolVersion: vi.fn().mockResolvedValue("1.0"),
			translations: {},
			http_api: {
				getFwFeaturesResult: vi.fn(),
				storeFwFeaturesResult: vi.fn(),
				getRobotModel: vi.fn().mockReturnValue("roborock.vacuum.a70"),
				getDevices: vi.fn().mockReturnValue([]) // For V1ConsumableService
			},
			rLog: vi.fn(),
		};
		depsMock = {
			adapter: adapterMock,
			http_api: { storeFwFeaturesResult: vi.fn(), getFwFeaturesResult: vi.fn() },
			ensureState: vi.fn().mockResolvedValue(undefined), // deps.ensureState
			ensureFolder: vi.fn().mockResolvedValue(undefined),
			log: adapterMock.log,
			config: { staticFeatures: [] }
		} as unknown as FeatureDependencies;
	});

	class TestVacuum extends V1VacuumFeatures {
		protected getDynamicFeatures(): Set<Feature> { return new Set(); }
		public async detectAndApplyRuntimeFeatures(): Promise<boolean> { return false; }
	}

	it("should parse dss bitmask correctly in updateDockingStationStatus", async () => {
		const vacuum = new TestVacuum(depsMock, "duid1", "roborock.vacuum.a70", { staticFeatures: [Feature.DockingStationStatus] });
		// 15995 (dec) = 11111001111011 (bin)
		const dss = 15995;

		await vacuum.initialize();
		console.log("Applied Features after init:", Array.from((vacuum as any).appliedFeatures));

		await vacuum.updateDockingStationStatus(dss);

		const calls = adapterMock.setStateChanged.mock.calls;
		// Filter calls for dockingStationStatus
		const dssCalls = calls.filter((c: any[]) => c[0].includes("dockingStationStatus"));

		const isUpdown = dssCalls.find((c: any[]) => c[0].endsWith("isUpdownWaterReady"));
		expect(isUpdown).toBeDefined();
		expect(isUpdown![1]).toHaveProperty("val", 3);

		const clearBox = dssCalls.find((c: any[]) => c[0].endsWith("clearWaterBoxStatus"));
		expect(clearBox).toBeDefined();
		expect(clearBox![1]).toHaveProperty("val", 2);
	});

	it("should parse get_multi_maps_list and create floors structure", async () => {
		const vacuum = new TestVacuum(depsMock, "duid1", "roborock.vacuum.a70", { staticFeatures: [] });

		// Mock response
		const mapResponse = [{
			max_multi_map: 4,
			max_bak_map: 1,
			multi_map_count: 2,
			map_info: [
				{ name: "Ground Floor", mapFlag: 0, add_time: 1600000000 },
				{ name: undefined, mapFlag: 1, add_time: 1600000001 }
			]
		}];

		requestsHandlerMock.sendRequest.mockResolvedValue(mapResponse);

		await vacuum.updateMultiMapsList();

		// Check Folder Creation
		expect(depsMock.ensureFolder).toHaveBeenCalledWith("Devices.duid1.floors");
		expect(depsMock.ensureFolder).toHaveBeenCalledWith("Devices.duid1.floors.0");
		expect(depsMock.ensureFolder).toHaveBeenCalledWith("Devices.duid1.floors.1");

		// Check States
		// Floor 0
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith(expect.stringContaining("Devices.duid1.floors.0.name"), { val: "Ground Floor", ack: true });
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith(expect.stringContaining("Devices.duid1.floors.0.mapFlag"), { val: 0, ack: true });

		// Floor 1 (Name fallback)
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith(expect.stringContaining("Devices.duid1.floors.1.name"), { val: "Map 1", ack: true });

		// Load button existence
		// V1MapService calls deps.ensureState("Devices.duid1.floors.0.load", ...)
		expect(depsMock.ensureState).toHaveBeenCalledWith(
			"Devices.duid1.floors.0.load",
			expect.objectContaining({ role: "button" })
		);
	});

	it("should format get_clean_record_map parameters correctly based on protocol version", async () => {
		const vacuum = new TestVacuum(depsMock, "duid1", "roborock.vacuum.a70", { staticFeatures: [] });

		// Test B01 Protocol
		adapterMock.getDeviceProtocolVersion.mockResolvedValue("B01");
		requestsHandlerMock.sendRequest.mockResolvedValue(null);

		await (vacuum as any).getCleaningRecordMap(1234567890);



		expect(requestsHandlerMock.sendRequest).toHaveBeenCalledWith(
			"duid1",
			"get_clean_record_map",
			{ start_time: 1234567890 },
			expect.any(Object)
		);

		// Test Standard Protocol (1.0)
		adapterMock.getDeviceProtocolVersion.mockResolvedValue("1.0");
		requestsHandlerMock.sendRequest.mockClear();

		await (vacuum as any).getCleaningRecordMap(1234567890);

		expect(requestsHandlerMock.sendRequest).toHaveBeenCalledWith(
			"duid1",
			"get_clean_record_map",
			{ start_time: 1234567890 },
			expect.any(Object)
		);
	});
});
