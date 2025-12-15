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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
            getObjectAsync: sinon.stub().resolves({ common: {} }),
            extendObjectAsync: sinon.stub().resolves(),
            extendObject: sinon.stub().resolves(),
            setObject: sinon.stub().resolves(),
            setObjectNotExistsAsync: sinon.stub().resolves(),
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
    it("should parse get_multi_maps_list and create floors structure", async () => {
        const vacuum = new TestVacuum(depsMock, "duid1", "roborock.vacuum.a70", { staticFeatures: [] });
        // Mock response
        const mapResponse = [{
                max_multi_map: 4,
                max_bak_map: 1,
                multi_map_count: 2,
                map_info: [
                    { name: "Ground Floor", mapFlag: 0, add_time: 1600000000 },
                    { name: undefined, mapFlag: 1, add_time: 1600000001 }
                ]
            }];
        adapterMock.requestsHandler.sendRequest.withArgs("duid1", "get_multi_maps_list", []).resolves(mapResponse);
        await vacuum.updateMultiMapsList();
        // Check Folder Creation
        (0, chai_1.expect)(depsMock.ensureFolder.calledWith("Devices.duid1.floors")).to.be.true;
        (0, chai_1.expect)(depsMock.ensureFolder.calledWith("Devices.duid1.floors.0")).to.be.true;
        (0, chai_1.expect)(depsMock.ensureFolder.calledWith("Devices.duid1.floors.1")).to.be.true;
        // Check States
        // Floor 0
        (0, chai_1.expect)(adapterMock.setStateChangedAsync.calledWithMatch("Devices.duid1.floors.0.name", { val: "Ground Floor" })).to.be.true;
        (0, chai_1.expect)(adapterMock.setStateChangedAsync.calledWithMatch("Devices.duid1.floors.0.mapFlag", { val: 0 })).to.be.true;
        // Floor 1 (Name fallback)
        (0, chai_1.expect)(adapterMock.setStateChangedAsync.calledWithMatch("Devices.duid1.floors.1.name", { val: "Map 1" })).to.be.true;
        // Load button existence
        (0, chai_1.expect)(depsMock.ensureState.calledWithMatch("floors.0", "load", { role: "button" })).to.be.true;
    });
});
//# sourceMappingURL=baseVacuumFeatures.test.js.map