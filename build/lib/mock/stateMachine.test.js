"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const MockAdapter_1 = require("./MockAdapter");
const MockRobot_1 = require("./MockRobot");
const baseVacuumFeatures_1 = require("../features/vacuum/baseVacuumFeatures");
class TestVacuum extends baseVacuumFeatures_1.BaseVacuumFeatures {
    getDynamicFeatures() {
        return new Set();
    }
    async detectAndApplyRuntimeFeatures() {
        return false;
    }
}
describe("State Machine Deep Dive", () => {
    let mockAdapter;
    let mockRobot;
    let vacuumFeatures;
    let depsMock;
    beforeEach(async () => {
        mockAdapter = new MockAdapter_1.MockAdapter();
        mockRobot = new MockRobot_1.MockRobot();
        depsMock = {
            adapter: mockAdapter,
            log: mockAdapter.log,
            ensureState: async (id, common) => {
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
            requestsHandler: {
                sendRequest: async (duid, method, params) => {
                    if (duid !== mockRobot.duid)
                        return [];
                    return mockRobot.handleRequest(method, params);
                },
                command: async () => { }
            }
        };
        mockAdapter.requestsHandler = depsMock.requestsHandler;
        vacuumFeatures = new TestVacuum(depsMock, mockRobot.duid, mockRobot.model, { staticFeatures: [] });
        await vacuumFeatures.initialize();
    });
    it("should process cleaning -> error -> resolved -> charging transition", async () => {
        // 1. Initial State: Cleaning
        mockRobot.state.state = 5; // Cleaning
        mockRobot.state.in_cleaning = 1;
        mockRobot.state.error_code = 0;
        await vacuumFeatures.updateStatus();
        (0, chai_1.expect)(mockAdapter.states[`Devices.${mockRobot.duid}.deviceStatus.state`]).to.equal(5);
        (0, chai_1.expect)(mockAdapter.states[`Devices.${mockRobot.duid}.deviceStatus.in_cleaning`]).to.equal(1);
        // 2. Error State: Device Stuck
        mockRobot.state.state = 12; // Error
        mockRobot.state.error_code = 8; // Stuck
        mockRobot.state.in_cleaning = 0;
        await vacuumFeatures.updateStatus();
        (0, chai_1.expect)(mockAdapter.states[`Devices.${mockRobot.duid}.deviceStatus.state`]).to.equal(12);
        (0, chai_1.expect)(mockAdapter.states[`Devices.${mockRobot.duid}.deviceStatus.error_code`]).to.equal(8);
        // 3. Resolved: Idle/Charging
        mockRobot.state.state = 8; // Charging
        mockRobot.state.error_code = 0;
        mockRobot.state.in_cleaning = 0;
        await vacuumFeatures.updateStatus();
        (0, chai_1.expect)(mockAdapter.states[`Devices.${mockRobot.duid}.deviceStatus.state`]).to.equal(8);
        (0, chai_1.expect)(mockAdapter.states[`Devices.${mockRobot.duid}.deviceStatus.error_code`]).to.equal(0);
        // Verify invalid transitions/states didn't persist
        // e.g. ensure error_code is CLEARED (0)
        (0, chai_1.expect)(mockAdapter.states[`Devices.${mockRobot.duid}.deviceStatus.error_code`]).to.equal(0);
    });
});
//# sourceMappingURL=stateMachine.test.js.map