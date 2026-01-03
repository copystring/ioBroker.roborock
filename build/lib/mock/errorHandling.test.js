"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const MockAdapter_1 = require("./MockAdapter");
const MockRobot_1 = require("./MockRobot");
const v1VacuumFeatures_1 = require("../features/vacuum/v1VacuumFeatures");
class TestVacuum extends v1VacuumFeatures_1.V1VacuumFeatures {
    getDynamicFeatures() {
        return new Set();
    }
    async detectAndApplyRuntimeFeatures() {
        return false;
    }
}
describe("Error Resilience", () => {
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
                    // Simulate error for specific method
                    if (method === "get_status_fail") {
                        throw new Error("Simulated Timeout");
                    }
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
    it("should handle request failures gracefully", async () => {
        // We override requestAndProcess in the test instance or mock the deps?
        // requestAndProcess uses this.deps.adapter.requestsHandler.sendRequest
        // We can define a new method on vacuumFeatures that uses a failing command, OR
        // just call sendRequest directly and verify it throws/catches.
        // BaseDeviceFeatures.updateStatus uses "get_status".
        // Let's force sendRequest to fail for "get_status".
        const originalSendRequest = depsMock.requestsHandler.sendRequest;
        depsMock.requestsHandler.sendRequest = async (duid, method, params) => {
            if (method === "get_prop" && params[0] === "get_status") {
                throw new Error("Network Error");
            }
            return originalSendRequest(duid, method, params);
        };
        // Spy on log.warn to verify error is caught and logged
        let warnCalled = false;
        const originalWarn = mockAdapter.log.warn.bind(mockAdapter.log);
        mockAdapter.log.warn = (msg) => {
            if (msg.includes("Network Error") || msg.includes("Failed")) {
                warnCalled = true;
            }
            originalWarn(msg);
        };
        const originalError = mockAdapter.log.error.bind(mockAdapter.log);
        mockAdapter.log.error = (msg) => {
            if (msg.includes("Network Error") || msg.includes("Failed")) {
                warnCalled = true;
            }
            originalError(msg);
        };
        await vacuumFeatures.updateStatus();
        (0, chai_1.expect)(warnCalled).to.be.true;
    });
});
//# sourceMappingURL=errorHandling.test.js.map