import { describe, expect, it, vi } from "vitest";
import { Q7VacuumFeatures } from "../../src/lib/features/vacuum/b01/Q7VacuumFeatures";
import type { FeatureDependencies } from "../../src/lib/features/baseDeviceFeatures";

function createDeps() {
	const updateB01DeviceStatus = vi.fn();
	const setStateChanged = vi.fn().mockResolvedValue(undefined);
	const ensureState = vi.fn().mockResolvedValue(undefined);
	const ensureFolder = vi.fn().mockResolvedValue(undefined);
	const deps: FeatureDependencies = {
		adapter: {
			language: "en",
			translations: {},
			translationManager: { get: vi.fn((key: string, fallback?: string) => fallback ?? key) },
			mapManager: { updateB01DeviceStatus },
			setStateChanged,
			rLog: vi.fn(),
			formatRoborockDate: vi.fn((value: number) => String(value)),
			errorMessage: vi.fn((error: unknown) => error instanceof Error ? error.message : String(error)),
		} as any,
		config: {} as any,
		http_api: {} as any,
		ensureState,
		ensureFolder,
		log: {
			debug: vi.fn(),
			warn: vi.fn(),
			error: vi.fn(),
		} as any,
	};

	return { deps, updateB01DeviceStatus, setStateChanged };
}

describe("B01 status normalization", () => {
	it("writes canonical adapter states from Q7/B01 raw status keys", async () => {
		const { deps, updateB01DeviceStatus, setStateChanged } = createDeps();
		const feature = new Q7VacuumFeatures(deps, "duid-q7", "roborock.vacuum.sc01", { staticFeatures: [] });

		await (feature as any).processStatus({
			quantity: 88,
			fault: 0,
			wind: 2,
			water: 3,
			work_mode: 1,
			sweep_type: 1,
			cleaning_area: 11287,
		});

		expect(setStateChanged).toHaveBeenCalledWith("Devices.duid-q7.deviceStatus.battery", { val: 88, ack: true });
		expect(setStateChanged).toHaveBeenCalledWith("Devices.duid-q7.deviceStatus.error_code", { val: 0, ack: true });
		expect(setStateChanged).toHaveBeenCalledWith("Devices.duid-q7.deviceStatus.fan_power", { val: 2, ack: true });
		expect(setStateChanged).toHaveBeenCalledWith("Devices.duid-q7.deviceStatus.water_box_mode", { val: 3, ack: true });
		expect(setStateChanged).toHaveBeenCalledWith("Devices.duid-q7.deviceStatus.mop_mode", { val: 1, ack: true });
		expect(setStateChanged).toHaveBeenCalledWith("Devices.duid-q7.deviceStatus.clean_area", { val: 112.87, ack: true });
		expect(updateB01DeviceStatus).toHaveBeenCalledWith("duid-q7", expect.objectContaining({
			deviceBattery: 88,
			deviceFault: 0,
			deviceWorkMode: 1,
		}));
	});
});