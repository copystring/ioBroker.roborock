import { beforeEach, describe, expect, it, vi } from "vitest";
import { FeatureDependencies } from "../../../src/lib/features/baseDeviceFeatures";
import { V1ConsumableService } from "../../../src/lib/features/vacuum/services/V1ConsumableService";

describe("V1ConsumableService", () => {
	let service: V1ConsumableService;
	let mockAdapter: any;
	let mockRequestsHandler: any;
	let mockHttpApi: any;

	const testDuid = "test_duid";

	beforeEach(() => {
		mockRequestsHandler = {
			sendRequest: vi.fn(),
		};

		mockHttpApi = {
			getDevices: vi.fn().mockReturnValue([]),
		};

		mockAdapter = {
			rLog: vi.fn(),
			log: {
				debug: vi.fn(),
				error: vi.fn(),
				warn: vi.fn(),
				info: vi.fn(),
			},
			ensureFolder: vi.fn().mockResolvedValue(undefined),
			ensureState: vi.fn().mockResolvedValue(undefined),
			setStateChanged: vi.fn().mockResolvedValue(undefined),
			requestsHandler: mockRequestsHandler,
			http_api: mockHttpApi,
		};

		const mockDeps = {
			adapter: mockAdapter,
			log: mockAdapter.log,
			ensureFolder: mockAdapter.ensureFolder,
			ensureState: mockAdapter.ensureState,
		} as unknown as FeatureDependencies;

		const mockProfile = {
			mappings: { fan_power: {} },
			consumableLifeHours: {
				main_brush: 300,
				side_brush: 200,
				filter: 150
			}
		};

		service = new V1ConsumableService(mockDeps, testDuid, mockProfile as any);
	});

	describe("updateConsumables", () => {
		it("should fetch consumables from API if no data provided", async () => {
			mockRequestsHandler.sendRequest.mockResolvedValue([{
				main_brush_work_time: 3600,
				side_brush_work_time: 1800,
			}]);

			await service.updateConsumables();

			expect(mockRequestsHandler.sendRequest).toHaveBeenCalledWith(testDuid, "get_consumable", []);
			expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(
				expect.stringContaining("main_brush"),
				expect.objectContaining({ val: expect.any(Number) })
			);
		});

		it("should use provided data if available", async () => {
			const data = { main_brush_work_time: 7200 };
			await service.updateConsumables(data);

			expect(mockRequestsHandler.sendRequest).not.toHaveBeenCalled();
			expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(
				expect.stringContaining("main_brush"),
				expect.objectContaining({ val: expect.any(Number) })
			);
		});
	});

	describe("processConsumables", () => {
		it("should process consumables", async () => {
			const data = {
				main_brush_work_time: 3600
			};

			await service.updateConsumables(data);

			// Consumable content
			expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(
				`Devices.${testDuid}.consumables.main_brush`,
				expect.anything()
			);
		});

		it("should calculate percent for known consumables", async () => {
			// main_brush life is 300h. 150h usage = 50% remaining.
			// 150 * 3600 = 540000
			const data = { main_brush_work_time: 540000 };
			await service.updateConsumables(data);

			expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(
				`Devices.${testDuid}.consumables.main_brush`,
				{ val: 50, ack: true }
			);
		});

		it("should create reset buttons", async () => {
			const data = { main_brush_work_time: 100 };
			await service.updateConsumables(data);

			expect(mockAdapter.ensureState).toHaveBeenCalledWith(
				`Devices.${testDuid}.resetConsumables.main_brush`,
				expect.objectContaining({ role: "button" })
			);
		});
	});

	describe("updateConsumablesPercent", () => {
		it("should update percentages from device status", async () => {
			mockHttpApi.getDevices.mockReturnValue([{
				duid: testDuid,
				deviceStatus: {
					"125": 80, // main_brush_life
					"126": 90, // side_brush_life
					"127": 40  // filter_life
				}
			}]);

			await service.updateConsumablesPercent();

			expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(
				`Devices.${testDuid}.consumables.main_brush_life`,
				{ val: 80, ack: true }
			);
			expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(
				`Devices.${testDuid}.consumables.side_brush_life`,
				{ val: 90, ack: true }
			);
			expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(
				`Devices.${testDuid}.consumables.filter_life`,
				{ val: 40, ack: true }
			);
		});

		it("should do nothing if device status not found", async () => {
			mockHttpApi.getDevices.mockReturnValue([]);
			await service.updateConsumablesPercent();
			expect(mockAdapter.setStateChanged).not.toHaveBeenCalled();
		});
	});
});
