import { beforeEach, describe, expect, it, vi } from "vitest";
import { V1MapService } from "../../../src/lib/features/vacuum/services/V1MapService";

// Mock MapManager
vi.mock("../../../src/lib/map/MapManager", () => {
    return {
        MapManager: class {
            processMap = vi.fn().mockResolvedValue({ mapBase64: "base64_map" });
        }
    };
});

describe("V1MapService", () => {
	let service: V1MapService;
	let adapterMock: any;
	let depsMock: any;
	let requestsHandlerMock: any;
    let mapManagerInstance: any;

	beforeEach(() => {
		requestsHandlerMock = {
			sendRequest: vi.fn().mockResolvedValue({}),
		};

		adapterMock = {
			log: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn(), silly: vi.fn() },
			rLog: vi.fn(),
			setStateChanged: vi.fn().mockResolvedValue(undefined),
			ensureState: vi.fn().mockResolvedValue(undefined),
			ensureFolder: vi.fn().mockResolvedValue(undefined),
			extendObject: vi.fn().mockResolvedValue(undefined),
			requestsHandler: requestsHandlerMock,
			getDeviceProtocolVersion: vi.fn().mockResolvedValue("1.0"),
			http_api: {
				getRobotModel: vi.fn().mockReturnValue("model"),
			}
		};

		depsMock = {
			adapter: adapterMock,
			log: adapterMock.log,
			ensureState: adapterMock.ensureState,
			ensureFolder: adapterMock.ensureFolder,
		};

		vi.clearAllMocks();

		service = new V1MapService(depsMock, "duid1");
        // Access the mocked instance
        mapManagerInstance = (service as any).mapManager;
	});

	it("should update map for V1 protocol", async () => {
		const mapData = Buffer.from("test_map_data");
		requestsHandlerMock.sendRequest.mockResolvedValue(mapData);

		await service.updateMap();

		expect(requestsHandlerMock.sendRequest).toHaveBeenCalledWith(
			"duid1",
			"get_map_v1",
			[],
			expect.objectContaining({ priority: 0 })
		);

        // Check if mapManager.processMap was called
        // Since we mocked the constructor, we check the instance method
        expect(mapManagerInstance.processMap).toHaveBeenCalled();

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith(
			"Devices.duid1.map.mapBase64",
			{ val: "base64_map", ack: true }
		);
	});

	it("should handle map update failure (null response)", async () => {
		requestsHandlerMock.sendRequest.mockResolvedValue(null);
		await service.updateMap();
		// processMap might or might not be called depending on logic, but verify no state change if logic aborts
		// if mapBuf is undefined, it skips processMap.
		expect(mapManagerInstance.processMap).not.toHaveBeenCalled();
	});

	it("should success updateMultiMapsList", async () => {
		const result = [{
			max_multi_map: 4,
			map_info: [
				{ name: "Floor 1", mapFlag: 0 },
				{ mapFlag: 1 }
			]
		}];
		requestsHandlerMock.sendRequest.mockResolvedValue(result);

		const success = await service.updateMultiMapsList();
		expect(success).toBe(true);
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith(
			expect.stringContaining("Devices.duid1.floors.0.name"),
			{ val: "Floor 1", ack: true }
		);
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith(
			expect.stringContaining("Devices.duid1.floors.1.name"),
			{ val: "Map 1", ack: true }
		);
	});
});
