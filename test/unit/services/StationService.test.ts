import { beforeEach, describe, expect, it, vi } from "vitest";
import { StationService } from "../../../src/lib/features/vacuum/services/StationService";

describe("StationService", () => {
	let service: StationService;
	let mockAdapter: any;
	let mockDeps: any;

	beforeEach(() => {
		mockAdapter = {
			setStateChanged: vi.fn(),
			translationManager: {
				get: vi.fn((key, def) => def || key),
			}
		};

		mockDeps = {
			adapter: mockAdapter,
			ensureState: vi.fn(),
			ensureFolder: vi.fn(),
		};

		service = new StationService(mockDeps, "test_duid");
	});

	describe("updateDockingStationStatus", () => {
		it("should correctly parse DSS bitmask (Case: All OK)", async () => {
			// dss = 0b 10 10 10 10 10 10 (binary)
			// dss = 0xAAA (hex) = 2730 (decimal)
			// Each 2-bit pair is 2 (OK)
			await service.updateDockingStationStatus(2730);

			const expectedValue = 2; // OK
			expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(expect.stringContaining("cleanFluidStatus"), { val: expectedValue, ack: true });
			expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(expect.stringContaining("waterBoxFilterStatus"), { val: expectedValue, ack: true });
			expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(expect.stringContaining("dustBagStatus"), { val: expectedValue, ack: true });
			expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(expect.stringContaining("dirtyWaterBoxStatus"), { val: expectedValue, ack: true });
			expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(expect.stringContaining("clearWaterBoxStatus"), { val: expectedValue, ack: true });
			expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(expect.stringContaining("isUpdownWaterReady"), { val: expectedValue, ack: true });
		});

		it("should correctly parse DSS bitmask (Case: Mixed values)", async () => {
			// Bits:
			// 10-11: 1 (Maintenance) -> cleanFluidStatus
			// 8-9: 2 (OK) -> waterBoxFilterStatus
			// 6-7: 3 (Unknown) -> dustBagStatus
			// 4-5: 0 (Not Supported) -> dirtyWaterBoxStatus
			// 2-3: 1 (Maintenance) -> clearWaterBoxStatus
			// 0-1: 2 (OK) -> isUpdownWaterReady

			// Binary: 01 10 11 00 01 10
			// Hex: 0x6C6
			// Decimal: 1734
			await service.updateDockingStationStatus(1734);

			expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(expect.stringContaining("cleanFluidStatus"), { val: 1, ack: true });
			expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(expect.stringContaining("waterBoxFilterStatus"), { val: 2, ack: true });
			expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(expect.stringContaining("dustBagStatus"), { val: 3, ack: true });
			expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(expect.stringContaining("dirtyWaterBoxStatus"), { val: 0, ack: true });
			expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(expect.stringContaining("clearWaterBoxStatus"), { val: 1, ack: true });
			expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(expect.stringContaining("isUpdownWaterReady"), { val: 2, ack: true });
		});
	});
});
