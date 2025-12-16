import { expect } from "chai";
import * as sinon from "sinon";
import { DeviceManager } from "./deviceManager";

describe("DeviceManager Polling Logic", () => {
	let adapterMock: any;
	let deviceManager: DeviceManager;
	let clock: sinon.SinonFakeTimers;
	let handlerMock: any;

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
			setInterval: (cb: any, ms: any) => setInterval(cb, ms),
			clearInterval: (id: any) => clearInterval(id),
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

		deviceManager = new DeviceManager(adapterMock);
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
		expect(handlerMock.updateStatus.called).to.be.true;

		// Expect updateDeviceData (rooms, etc) NOT to be called because map_status is stable (undefined -> 1 is first run, might trigger? Logic says: if last undefined, it sets it. Change is NOT detected on first run?)
		// Let's check logic:
		// const lastMapStatus = this.lastMapStatus.get(duid);
		// if (lastMapStatus !== undefined && currentMapStatus !== lastMapStatus)
		// So first run (last=undefined) does NOT trigger.
		expect(handlerMock.updateRoomMapping.called).to.be.false;

		// Run again (now last=1, current=1)
		await clock.tickAsync(60000);
		expect(handlerMock.updateRoomMapping.called).to.be.false;
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

		expect(handlerMock.updateRoomMapping.called).to.be.true;
		expect(adapterMock.log.info.calledWithMatch(/Map changed/)).to.be.true;
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

		expect(handlerMock.updateRoomMapping.called).to.be.true;
		expect(handlerMock.updateStatus.called).to.be.true;
		expect(handlerMock.updateCleanSummary.called).to.be.true;
		expect(adapterMock.log.info.calledWithMatch(/Activity finished/)).to.be.true;
	});




	// TODO: Fix mocking to enable this test
	// it("should seed local_api and initiate client if UDP failed but Cloud IP is available (Local Fallback)", async () => {
	// 	// ... (Test disabled due to mock complexity)
	// });
});
