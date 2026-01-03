"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const MockAdapter_1 = require("./MockAdapter");
const MockRobot_1 = require("./MockRobot");
const v1VacuumFeatures_1 = require("../features/vacuum/v1VacuumFeatures");
// Concrete implementation for testing abstract class
class TestVacuum extends v1VacuumFeatures_1.V1VacuumFeatures {
    getDynamicFeatures() {
        return new Set();
    }
    async detectAndApplyRuntimeFeatures() {
        return false;
    }
}
describe("Adapter Type Verification", () => {
    let mockAdapter;
    let mockRobot;
    let vacuumFeatures;
    let depsMock;
    beforeEach(async () => {
        mockAdapter = new MockAdapter_1.MockAdapter();
        mockRobot = new MockRobot_1.MockRobot();
        // Mock the Dependencies
        depsMock = {
            adapter: mockAdapter,
            log: mockAdapter.log,
            ensureState: async (id, common) => {
                // BaseDeviceFeatures.ensureState passes 'native' as 3rd arg, NOT value.
                // So we only ensure object existence here.
                await mockAdapter.setObjectNotExistsAsync(id, { type: "state", common });
            },
            ensureFolder: async (id) => {
                await mockAdapter.setObjectNotExistsAsync(id, { type: "folder", common: { name: id } });
            },
            config: { staticFeatures: [] },
            http_api: {
                getFwFeaturesResult: () => mockRobot.features,
                storeFwFeaturesResult: () => { }
            },
            // Intercept all requests and route to MockRobot
            requestsHandler: {
                sendRequest: async (duid, method, params) => {
                    if (duid !== mockRobot.duid)
                        return [];
                    return mockRobot.handleRequest(method, params);
                },
                command: async () => { } // Add dummy command handler
            }
        };
        // Attach requestsHandler to mockAdapter as BaseDeviceFeatures expects it there
        mockAdapter.requestsHandler = depsMock.requestsHandler;
        // Instantiate the vacuum features handler for our mock device
        // We use the A147 model from the log
        vacuumFeatures = new TestVacuum(depsMock, mockRobot.duid, mockRobot.model, { staticFeatures: [] });
    });
    it("should process get_status and update states with correct types", async () => {
        await vacuumFeatures.initialize();
        await vacuumFeatures.updateStatus();
        // updateStatus handles 'deviceStatus' states.
        // Verify one of them, e.g. battery or fan_power
        (0, chai_1.expect)(mockAdapter.states[`Devices.${mockRobot.duid}.deviceStatus.battery`]).to.equal(100);
    });
    it("should process network info and verify types", async () => {
        await vacuumFeatures.initialize();
        await vacuumFeatures.updateNetworkInfo();
        (0, chai_1.expect)(mockAdapter.states[`Devices.${mockRobot.duid}.networkInfo.ip`]).to.equal("192.168.1.91");
    });
    it("should process clean summary and verify types", async () => {
        await vacuumFeatures.initialize();
        await vacuumFeatures.updateCleanSummary();
        (0, chai_1.expect)(mockAdapter.states[`Devices.${mockRobot.duid}.cleaningInfo.clean_time`]).to.equal(122.6);
    });
});
//# sourceMappingURL=typeCheck.test.js.map