
import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { Feature } from "../features.enum";
import { MockAdapter } from "../../mock/MockAdapter";
import { expect } from "chai";

const DefaultDeviceConfig = {
	staticFeatures: []
};

describe("BaseVacuumFeatures - Consumables", () => {
	let adapter: MockAdapter;
	let vacuum: BaseVacuumFeatures;

	beforeEach(() => {
		adapter = new MockAdapter();
		adapter.requestsHandler = {
			sendRequest: async () => {
				return []; // Default return, preventing crash. updateConsumables with argument doesn't use this if data is passed.
			}
		};

		vacuum = new class extends BaseVacuumFeatures {
			public getAppliedFeatures() { return this.appliedFeatures; }
			protected getDynamicFeatures(): Set<Feature> { return new Set(); }
			public async detectAndApplyRuntimeFeatures(): Promise<boolean> { return false; }
			// Stub abstract methods
			public getCommonConsumable(attribute: string | number): any { return super.getCommonConsumable(attribute); }
			public isResetableConsumable(consumable: string): boolean { return super.isResetableConsumable(consumable); }
			public getCommonDeviceStates(attribute: string | number): any { return super.getCommonDeviceStates(attribute); }
			public getCommonCleaningRecords(attribute: string | number): any { return super.getCommonCleaningRecords(attribute); }
			public getFirmwareFeatureName(id: number): string { return super.getFirmwareFeatureName(id); }
			public getCommonCleaningInfo(attribute: string | number): any { return super.getCommonCleaningInfo(attribute); }


		}(
            adapter as any,
            "1234567890",
            "roborock.vacuum.s5",
            DefaultDeviceConfig
		);
	});

	it("should convert time-based consumables from seconds to hours (integer)", async () => {
		const consumableData = {
			main_brush_work_time: 3600, // 1 hour
			filter_work_time: 7500,     // 2.08 hours -> round to 2
			sensor_dirty_time: 1800,    // 0.5 hours -> round to 1 (round half up) or 0? Math.round(0.5) is 1.
			side_brush_life: 90         // percentage
		};

		await vacuum.updateConsumables(consumableData);

		// Check converted values (seconds -> hours)
		expect(adapter.states["Devices.1234567890.consumables.main_brush_work_time"], "main_brush_work_time should be 1h").to.equal(1);
		expect(adapter.states["Devices.1234567890.consumables.filter_work_time"], "filter_work_time should be 2h").to.equal(2);

		// Math.round(0.5) = 1 in JS
		expect(adapter.states["Devices.1234567890.consumables.sensor_dirty_time"], "sensor_dirty_time should be 1h").to.equal(1);

		// Check non-converted values
		expect(adapter.states["Devices.1234567890.consumables.side_brush_life"], "side_brush_life should remain 90%").to.equal(90);
	});
});
