"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const MockAdapter_1 = require("./MockAdapter");
const MockRobot_1 = require("./MockRobot");
const v1VacuumFeatures_1 = require("../features/vacuum/v1VacuumFeatures");
const features_enum_1 = require("../features/features.enum");
// We need a concrete implementation of abstract V1VacuumFeatures to test it
class TestVacuumFeatures extends v1VacuumFeatures_1.V1VacuumFeatures {
    getDescriptor() { return {}; }
    getDynamicFeatures() { return new Set(); }
    async detectAndApplyRuntimeFeatures() { return false; }
    // Abstract getters implementation - minimal valid return for test
    getCommonConsumable() { return {}; }
    isResetableConsumable() { return false; }
    getCommonDeviceStates() { return {}; }
    getCommonCleaningRecords() { return {}; }
    getFirmwareFeatureName() { return ""; }
    getCommonCleaningInfo() { return {}; }
    // Expose protected method for testing
    // Expose protected method for testing
    async publicApplyFeature(feature) {
        return this.applyFeature(feature);
    }
    // Override updateConsumables to use our manual logic for testing "smart" behavior
    // Since we cannot easily intercept the "requestAndProcess" which calls helper methods,
    // we will simulate the behavior of requestAndProcess -> processing loop here.
    // The REAL implementation uses requestAndProcess.
    // The REAL implementation of updateConsumables takes NO arguments.
    // So we must match that signature.
    async updateConsumables() {
        // We cheat here for the test: we assume the test setup put the data where we can find it
        // OR we can't easily test this without mocking sendRequest.
        // Let's assume the test will mock the RESPONSE of sendRequest.
        // So calling super() is actually what we want, IF the dep injection worked.
        return super.updateConsumables();
    }
}
describe("Features - State Creation", () => {
    let mockAdapter;
    let mockRobot;
    beforeEach(() => {
        mockAdapter = new MockAdapter_1.MockAdapter();
        mockRobot = new MockRobot_1.MockRobot();
    });
    it("should create dockingStationStatus states only when supported", async () => {
        const deps = {
            adapter: mockAdapter,
            log: {
                info: console.log,
                warn: console.warn,
                error: console.error,
                debug: console.log,
                silly: console.log,
            },
            http_api: {},
            config: {},
            ensureFolder: async (path) => mockAdapter.setObjectNotExistsAsync(path, { type: "folder" }),
            ensureState: async (id, common) => mockAdapter.setObjectNotExistsAsync(id, { type: "state", common }),
        };
        // Double-ensure setState is present even if class binding fails
        if (!deps.adapter.setState) {
            deps.adapter.setState = mockAdapter.setState;
        }
        const features = new TestVacuumFeatures(deps, mockRobot.duid, mockRobot.model, { staticFeatures: [] });
        // 1. Initial State: No DSS features applied
        const dssFolder = `Devices.${mockRobot.duid}.dockingStationStatus`;
        const cleanFluid = `Devices.${mockRobot.duid}.dockingStationStatus.cleanFluidStatus`;
        (0, chai_1.expect)(mockAdapter.objects).to.not.have.property(dssFolder);
        // 2. Simulate DSS detection (e.g. via runtime status having 'dss')
        // We simulate the feature application logic which would happen in detectAndApplyRuntimeFeatures
        await features.publicApplyFeature(features_enum_1.Feature.DockingStationStatus);
        // This should fail currently because implementation is missing
        (0, chai_1.expect)(mockAdapter.objects, "dockingStationStatus folder missing after feature applied").to.have.property(dssFolder);
        (0, chai_1.expect)(mockAdapter.objects, "cleanFluidStatus state missing after feature applied").to.have.property(cleanFluid);
    });
    it("should dynamically create resetConsumables states based on data", async () => {
        // In this test, we need to mock the sendRequest to return our consumable data
        const mockConsumableData = {
            main_brush_work_time: 3600,
            filter_work_time: 1200,
            side_brush_work_time: 1800, // Added for new test case
            unknown_consumable: 999
        };
        const deps = {
            adapter: mockAdapter,
            log: {
                info: console.log,
                warn: console.warn,
                error: console.error,
                debug: console.debug,
                silly: () => { },
            },
            http_api: {},
            config: {},
            ensureFolder: async (path) => mockAdapter.setObjectNotExistsAsync(path, { type: "folder" }),
            ensureState: async (id, common) => mockAdapter.setObjectNotExistsAsync(id, { type: "state", common }),
        };
        // Patch the adapter request handler to return our data
        deps.adapter.requestsHandler = {
            sendRequest: async (_duid, method) => {
                if (method === "get_consumable")
                    return mockConsumableData;
                return {};
            }
        };
        // Ensure setState is present
        if (!deps.adapter.setState) {
            console.log("[TestDiag] setState missing on adapter, patching...");
            deps.adapter.setState = mockAdapter.setState;
        }
        console.log("[TestDiag] Adapter methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(deps.adapter)));
        const features = new TestVacuumFeatures(deps, mockRobot.duid, mockRobot.model, { staticFeatures: [] });
        // 1. Initial: No reset buttons
        const resetMainBrush = `Devices.${mockRobot.duid}.resetConsumables.main_brush_work_time`;
        (0, chai_1.expect)(mockAdapter.objects).to.not.have.property(resetMainBrush);
        // 2. Apply Consumables Feature
        await features.publicApplyFeature(features_enum_1.Feature.ResetConsumables);
        // 3. Trigger update
        await features.updateConsumables();
        // 4. Verification
        // Check for RESET buttons - Main Key Checks
        // We know resetConsumables contains: main_brush_work_time, side_brush_work_time, filter_work_time, etc.
        const duid = mockRobot.duid; // Use duid from mockRobot
        const resetMainBrushPath = `Devices.${duid}.resetConsumables.main_brush`;
        const resetSideBrush = `Devices.${duid}.resetConsumables.side_brush`;
        const resetFilter = `Devices.${duid}.resetConsumables.filter`;
        const resetUnknown = `Devices.${duid}.resetConsumables.unknown_consumable`;
        (0, chai_1.expect)(mockAdapter.objects).to.have.property(resetMainBrushPath);
        (0, chai_1.expect)(mockAdapter.objects).to.have.property(resetSideBrush);
        (0, chai_1.expect)(mockAdapter.objects).to.have.property(resetFilter);
        // Should NOT create reset button for unknown consumable (only work_time/dirty_time suffixes)
        (0, chai_1.expect)(mockAdapter.objects).to.not.have.property(resetUnknown);
        // Verify object properties for a created button
        const btnObj = mockAdapter.objects[resetMainBrushPath];
        (0, chai_1.expect)(btnObj.common.role).to.equal("button");
        (0, chai_1.expect)(btnObj.common.type).to.equal("boolean");
        (0, chai_1.expect)(btnObj.common.write).to.equal(true);
    });
});
//# sourceMappingURL=features.test.js.map