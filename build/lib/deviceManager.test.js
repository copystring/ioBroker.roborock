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
const deviceManager_1 = require("./deviceManager");
describe("DeviceManager Polling Logic", () => {
    let adapterMock;
    let deviceManager;
    let clock;
    let handlerMock;
    beforeEach(() => {
        clock = sinon.useFakeTimers();
        handlerMock = {
            updateStatus: sinon.stub().resolves(),
            updateMap: sinon.stub().resolves(),
            updateFirmwareFeatures: sinon.stub().resolves(),
            updateMultiMapsList: sinon.stub().resolves(),
            updateRoomMapping: sinon.stub().resolves(),
            updateConsumables: sinon.stub().resolves(),
            updateTimers: sinon.stub().resolves(),
            updateNetworkInfo: sinon.stub().resolves(),
            updateExtraStatus: sinon.stub().resolves(),
            updateCleanSummary: sinon.stub().resolves(),
            processDockType: sinon.stub().resolves(),
        };
        adapterMock = {
            log: {
                info: sinon.stub(),
                error: sinon.stub().callsFake((msg) => console.error("MOCK ERROR:", msg)),
                warn: sinon.stub().callsFake((msg) => console.warn("MOCK WARN:", msg)),
                debug: sinon.stub(),
                silly: sinon.stub()
            },
            config: { updateInterval: 60 },
            setInterval: (cb, ms) => setInterval(cb, ms),
            clearInterval: (id) => clearInterval(id),
            catchError: sinon.stub(),
            http_api: {
                getDevices: sinon.stub().returns([{ duid: "duid1", online: true }]),
                updateHomeData: sinon.stub().resolves(),
                getRobotModel: sinon.stub(),
                getProductCategory: sinon.stub(),
                productInfo: [], // Prevent crash in BaseDeviceFeatures constructor
            },
            updateDeviceInfo: sinon.stub().resolves(),
            getDeviceProtocolVersion: sinon.stub().resolves("1.0"),
            getStateAsync: sinon.stub(),
            checkForNewFirmware: sinon.stub().resolves(),
            requestsHandler: {
                sendRequest: sinon.stub().resolves({}),
                isCloudDevice: sinon.stub().resolves(true),
                waitForStartup: sinon.stub().resolves(),
            },
            extendObjectAsync: sinon.stub().resolves(),
            delObjectAsync: sinon.stub().resolves(),
            getAdapterObjectsAsync: sinon.stub().resolves({}),
        };
        deviceManager = new deviceManager_1.DeviceManager(adapterMock);
        // Manually inject the handler
        deviceManager.deviceFeatureHandlers.set("duid1", handlerMock);
    });
    afterEach(() => {
        clock.restore();
        deviceManager.stopPolling();
    });
    it("should NOT trigger updateDeviceData when map_status matches last status (Stable)", async () => {
        // Mock initial state
        // deviceStatus.state = 8 (Charging - Inactive)
        adapterMock.getStateAsync.withArgs("Devices.duid1.deviceStatus.state").resolves({ val: 8 });
        // map_status = 1
        adapterMock.getStateAsync.withArgs("Devices.duid1.deviceStatus.map_status").resolves({ val: 1 });
        deviceManager.startPolling();
        // Tick fast loop (1s) multiple times to reach slow loop (60s)
        // We expect the slow loop to run
        await clock.tickAsync(61000);
        // Expect updateStatus to be called (it's called every slow loop)
        (0, chai_1.expect)(handlerMock.updateStatus.called).to.be.true;
        // Expect updateDeviceData (rooms, etc) NOT to be called because map_status is stable (undefined -> 1 is first run, might trigger? Logic says: if last undefined, it sets it. Change is NOT detected on first run?)
        // Let's check logic:
        // const lastMapStatus = this.lastMapStatus.get(duid);
        // if (lastMapStatus !== undefined && currentMapStatus !== lastMapStatus)
        // So first run (last=undefined) does NOT trigger.
        (0, chai_1.expect)(handlerMock.updateRoomMapping.called).to.be.false;
        // Run again (now last=1, current=1)
        await clock.tickAsync(60000);
        (0, chai_1.expect)(handlerMock.updateRoomMapping.called).to.be.false;
    });
    it("should trigger updateDeviceData when map_status changes", async () => {
        // Initial State: Map 1
        adapterMock.getStateAsync.withArgs("Devices.duid1.deviceStatus.state").resolves({ val: 8 });
        adapterMock.getStateAsync.withArgs("Devices.duid1.deviceStatus.map_status").resolves({ val: 1 });
        deviceManager.startPolling();
        await clock.tickAsync(61000); // First run sets last=1
        // Change State: Map 2
        adapterMock.getStateAsync.withArgs("Devices.duid1.deviceStatus.map_status").resolves({ val: 2 });
        await clock.tickAsync(60000); // Second run detects 1 -> 2
        // Logic:
        // Map changed ... Updating device data (rooms, etc.)...
        // await this.updateDeviceData(handler, duid);
        // updateDeviceData calls updateRoomMapping
        (0, chai_1.expect)(handlerMock.updateRoomMapping.called).to.be.true;
        (0, chai_1.expect)(adapterMock.log.info.calledWithMatch(/Map changed/)).to.be.true;
    });
    it("should trigger updateDeviceData when activity finishes", async () => {
        // Initial State: Cleaning (Active)
        adapterMock.getStateAsync.withArgs("Devices.duid1.deviceStatus.state").resolves({ val: 5 }); // Cleaning
        adapterMock.getStateAsync.withArgs("Devices.duid1.deviceStatus.map_status").resolves({ val: 1 });
        deviceManager.startPolling();
        await clock.tickAsync(61000); // First run sets last=5 (Active)
        // Change State: Charging (Inactive)
        adapterMock.getStateAsync.withArgs("Devices.duid1.deviceStatus.state").resolves({ val: 8 }); // Charging
        await clock.tickAsync(60000); // Second run detects Active -> Inactive
        // Logic:
        // if (wasActive && !isActive) -> Trigger full update
        (0, chai_1.expect)(handlerMock.updateRoomMapping.called).to.be.true;
        (0, chai_1.expect)(handlerMock.updateStatus.called).to.be.true;
        (0, chai_1.expect)(handlerMock.updateCleanSummary.called).to.be.true;
        (0, chai_1.expect)(adapterMock.log.info.calledWithMatch(/Activity finished/)).to.be.true;
    });
    // TODO: Fix mocking to enable this test
    // it("should seed local_api and initiate client if UDP failed but Cloud IP is available (Local Fallback)", async () => {
    // 	// ... (Test disabled due to mock complexity)
    // });
});
//# sourceMappingURL=deviceManager.test.js.map