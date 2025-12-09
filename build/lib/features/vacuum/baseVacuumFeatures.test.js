"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = __importStar(require("sinon"));
const baseVacuumFeatures_1 = require("./baseVacuumFeatures");
describe("BaseVacuumFeatures", () => {
    let adapterMock;
    let depsMock;
    beforeEach(() => {
        adapterMock = {
            log: { info: sinon.stub(), error: sinon.stub(), warn: sinon.stub(), debug: sinon.stub(), silly: sinon.stub() },
            setStateChangedAsync: sinon.stub().resolves(),
            ensureState: sinon.stub().resolves(),
            ensureFolder: sinon.stub().resolves(),
            getStateAsync: sinon.stub().resolves(),
            requestsHandler: { sendRequest: sinon.stub().resolves({}), command: sinon.stub().resolves() },
            translations: {},
        };
        depsMock = {
            adapter: adapterMock,
            http_api: { storeFwFeaturesResult: sinon.stub(), getFwFeaturesResult: sinon.stub() },
            ensureState: sinon.stub().resolves(),
            ensureFolder: sinon.stub().resolves(),
            log: adapterMock.log,
            config: { staticFeatures: [] }
        };
    });
    class TestVacuum extends baseVacuumFeatures_1.BaseVacuumFeatures {
        getDynamicFeatures() { return new Set(); }
        async detectAndApplyRuntimeFeatures() { return false; }
        async testUpdateDss(dss) {
            // Need to expose the protected method or logic for testing
            // Since we moved logic to updateDockingStationStatus/updateStatus override
            // We can test updateStatus if we mock the request result
            adapterMock.requestsHandler.sendRequest.withArgs("duid1", "get_prop", ["get_status"]).resolves([{ dss: dss }]);
            // For unit testing the specific shifting logic, we can cast to any
            await this.updateDockingStationStatus(dss);
        }
    }
    it("should correctly breakdown dss bits into status codes", async () => {
        const vacuum = new TestVacuum(depsMock, "duid1", "roborock.vacuum.a70", { staticFeatures: [] });
        // Example Value Construction:
        // cleanFluidStatus: 1 (01 binary) << 10
        // waterBoxFilterStatus: 2 (10 binary) << 8
        // dustBagStatus: 0 (00 binary) << 6
        // ... rest 0
        // Value: (1 << 10) | (2 << 8) = 1024 + 512 = 1536
        const dssValue = (1 << 10) | (2 << 8);
        await vacuum.testUpdateDss(dssValue);
        (0, chai_1.expect)(adapterMock.setStateChangedAsync.calledWith("Devices.duid1.dockingStationStatus.cleanFluidStatus", { val: 1, ack: true })).to.be.true; // 1 = ERROR
        (0, chai_1.expect)(adapterMock.setStateChangedAsync.calledWith("Devices.duid1.dockingStationStatus.waterBoxFilterStatus", { val: 2, ack: true })).to.be.true; // 2 = OK
        (0, chai_1.expect)(adapterMock.setStateChangedAsync.calledWith("Devices.duid1.dockingStationStatus.dustBagStatus", { val: 0, ack: true })).to.be.true; // 0 = UNKNOWN
    });
});
//# sourceMappingURL=baseVacuumFeatures.test.js.map