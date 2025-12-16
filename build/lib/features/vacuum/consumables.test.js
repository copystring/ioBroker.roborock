"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseVacuumFeatures_1 = require("./baseVacuumFeatures");
const MockAdapter_1 = require("../../mock/MockAdapter");
const chai_1 = require("chai");
const DefaultDeviceConfig = {
    staticFeatures: []
};
describe("BaseVacuumFeatures - Consumables", () => {
    let adapter;
    let vacuum;
    beforeEach(() => {
        adapter = new MockAdapter_1.MockAdapter();
        adapter.requestsHandler = {
            sendRequest: async () => {
                return []; // Default return, preventing crash. updateConsumables with argument doesn't use this if data is passed.
            }
        };
        vacuum = new class extends baseVacuumFeatures_1.BaseVacuumFeatures {
            getAppliedFeatures() { return this.appliedFeatures; }
            getDynamicFeatures() { return new Set(); }
            async detectAndApplyRuntimeFeatures() { return false; }
            // Stub abstract methods
            getCommonConsumable(attribute) { return super.getCommonConsumable(attribute); }
            isResetableConsumable(consumable) { return super.isResetableConsumable(consumable); }
            getCommonDeviceStates(attribute) { return super.getCommonDeviceStates(attribute); }
            getCommonCleaningRecords(attribute) { return super.getCommonCleaningRecords(attribute); }
            getFirmwareFeatureName(id) { return super.getFirmwareFeatureName(id); }
            getCommonCleaningInfo(attribute) { return super.getCommonCleaningInfo(attribute); }
        }(adapter, "1234567890", "roborock.vacuum.s5", DefaultDeviceConfig);
    });
    it("should convert time-based consumables from seconds to hours (integer)", async () => {
        const consumableData = {
            main_brush_work_time: 3600, // 1 hour
            filter_work_time: 7500, // 2.08 hours -> round to 2
            sensor_dirty_time: 1800, // 0.5 hours -> round to 1 (round half up) or 0? Math.round(0.5) is 1.
            side_brush_life: 90 // percentage
        };
        await vacuum.updateConsumables(consumableData);
        // Check converted values (seconds -> hours)
        (0, chai_1.expect)(adapter.states["Devices.1234567890.consumables.main_brush_work_time"], "main_brush_work_time should be 1h").to.equal(1);
        (0, chai_1.expect)(adapter.states["Devices.1234567890.consumables.filter_work_time"], "filter_work_time should be 2h").to.equal(2);
        // Math.round(0.5) = 1 in JS
        (0, chai_1.expect)(adapter.states["Devices.1234567890.consumables.sensor_dirty_time"], "sensor_dirty_time should be 1h").to.equal(1);
        // Check non-converted values
        (0, chai_1.expect)(adapter.states["Devices.1234567890.consumables.side_brush_life"], "side_brush_life should remain 90%").to.equal(90);
    });
});
//# sourceMappingURL=consumables.test.js.map