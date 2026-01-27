
import { beforeEach, describe, expect, it } from "vitest";
import { Feature } from "../features/features.enum";
import { V1VacuumFeatures } from "../features/vacuum/v1VacuumFeatures";
import { MockAdapter } from "./MockAdapter";
import { MockRobot } from "./MockRobot";

class TestVacuum extends V1VacuumFeatures {
	protected getDynamicFeatures(): Set<Feature> {
		return new Set();
	}
	public async detectAndApplyRuntimeFeatures(): Promise<boolean> {
		return false;
	}

	public setMockMapManagerComponents(processMapStub: any): void {
		(this as any).mapService.mapManager.processMap = processMapStub;
	}
}

describe("Map Processing", () => {
	let mockAdapter: MockAdapter;
	let mockRobot: MockRobot;
	let vacuumFeatures: TestVacuum;
	let depsMock: any;

	beforeEach(async () => {
		mockAdapter = new MockAdapter();
		mockRobot = new MockRobot();

		depsMock = {
			adapter: mockAdapter,
			log: mockAdapter.log,
			ensureState: async (id: string, common: any) => {
				await mockAdapter.setObjectNotExistsAsync(id, { type: "state", common });
			},
			ensureFolder: async (id: string) => {
				await mockAdapter.setObjectNotExistsAsync(id, { type: "folder", common: { name: id } });
			},
			config: { staticFeatures: [], enable_map_creation: true },
			http_api: {
				getFwFeaturesResult: () => mockRobot.features,
				storeFwFeaturesResult: () => {},
				getRobotModel: () => mockRobot.model
			},
			requestsHandler: {
				sendRequest: async (duid: string, method: string, params: any[]) => {
					if (duid !== mockRobot.duid) return [];
					if (method === "get_map_v1") return Buffer.from("dummy_map_data");
					return mockRobot.handleRequest(method, params);
				},
				command: async () => {},
				mapParser: {
					parsedata: async (buf: Buffer) => {
						// Mock parser logic: return dummy JSON if buffer is valid
						if (buf && buf.length > 0) return {
							image: { pixels: {} },
							path: {},
							charger: [25600, 25600],
							robot: [25600, 25600],
							rooms: {
								1: { pixelCount: 100 },
								2: { pixelCount: 200 }
							}
						};
						return null;
					}
				},
				mapCreator: {
					canvasMap: async () => {
						return ["base64_uncropped", "base64_full", "base64_truncated"];
					}
				}
			}
		};
		mockAdapter.requestsHandler = depsMock.requestsHandler;
		mockAdapter.http_api = depsMock.http_api;

		// Attach helpers that MapManager expects on the adapter
		(mockAdapter as any).ensureState = depsMock.ensureState;
		(mockAdapter as any).ensureFolder = depsMock.ensureFolder;
		(mockAdapter as any).setStateChangedAsync = mockAdapter.setStateAsync;

		vacuumFeatures = new TestVacuum(depsMock, mockRobot.duid, mockRobot.model, { staticFeatures: [] });

		const processMapStub = async (rawData: Buffer) => {
			if (!rawData) return null;
			// Return different base64 depending on input to differentiate tests?
			// Or just return keys expected by test
			// Maps expectation: "base64_full" for updateMap, "base64_truncated" for cleanRecord
			if (rawData.toString() === "dummy_map_data") return { mapBase64: "base64_full", mapData: {} };
			if (rawData.toString() === "record_map_data") return { mapBase64Clean: "base64_truncated", mapBase64: "base64_full", mapData: {} }; // cleanRecord expects truncated?
			// cleanRecord test expects "mapBase64Truncated" state to equal "base64_truncated".
			// But MapManager processing returns mapBase64 and mapBase64Clean.
			// V1VacuumFeatures maps mapBase64Clean to mapBase64Truncated state key.
			return { mapBase64: "base64_full", mapBase64Clean: "base64_truncated", mapData: {} };
		};

		vacuumFeatures.setMockMapManagerComponents(processMapStub);
		await vacuumFeatures.initialize();
	});

	it("should process updateMap correctly", async () => {
		// Mock get_map_v1 to return a dummy buffer via depsMock
		const originalSendRequest = depsMock.requestsHandler.sendRequest;
		depsMock.requestsHandler.sendRequest = async (duid: string, method: string, params: any[]) => {
			if (method === "get_map_v1") return Buffer.from("dummy_map_data");
			return originalSendRequest(duid, method, params);
		};

		await vacuumFeatures.updateMap();

		// Verify states were set
		expect(mockAdapter.states[`Devices.${mockRobot.duid}.map.mapBase64`]).to.equal("base64_full");
		expect(mockAdapter.states[`Devices.${mockRobot.duid}.map.mapData`]).to.exist;
	});

	it("should handle cleaning record maps", async () => {
		// Mock get_clean_record_map via depsMock
		const originalSendRequest = depsMock.requestsHandler.sendRequest;
		depsMock.requestsHandler.sendRequest = async (duid: string, method: string, params: any[]) => {
			if (method === "get_clean_record_map") return Buffer.from("record_map_data");
			return originalSendRequest(duid, method, params);
		};

		// We access getCleaningRecordMap privately? It's private.
		// But updateCleanSummary calls it.
		// Let's verify via updateCleanSummary, ensuring it processes records.
		// MockRobot has records.

		await vacuumFeatures.updateCleanSummary();

		// Check if map data exists for a record
		// Check if map data exists for a record
		// Note: Clean record maps are only fetched if enable_map_creation is true (set in mock config above)
		// And if get_clean_record returns a valid map pointer? No, it requests by start_time.

		// Logic in updateCleanSummary:
		// loops records, if enable_map_creation, calls getCleaningRecordMap(startTime)

		const mapStatePath = `Devices.${mockRobot.duid}.cleaningInfo.records.0.map.mapBase64Truncated`;
		expect(mockAdapter.states[mapStatePath]).to.equal("base64_truncated");
	});
});

