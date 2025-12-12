import { expect } from "chai";
import * as sinon from "sinon";
import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { Feature } from "../features.enum";

describe("BaseVacuumFeatures", () => {
	let adapterMock: any;
	let depsMock: any;

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

	class TestVacuum extends BaseVacuumFeatures {
		protected getDynamicFeatures(): Set<Feature> { return new Set(); }
		public async detectAndApplyRuntimeFeatures(): Promise<boolean> { return false; }
		public async testUpdateDss(dss: number) {
			// Need to expose the protected method or logic for testing
			// Since we moved logic to updateDockingStationStatus/updateStatus override
			// We can test updateStatus if we mock the request result
			adapterMock.requestsHandler.sendRequest.withArgs("duid1", "get_prop", ["get_status"]).resolves([{ dss: dss }]);

			// For unit testing the specific shifting logic, we can cast to any
			await (this as any).updateDockingStationStatus(dss);
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

		// Manually apply feature to pass guard
		(vacuum as any).appliedFeatures.add(Feature.DockingStationStatus);

		await vacuum.testUpdateDss(dssValue);

		expect(adapterMock.setStateChangedAsync.calledWith("Devices.duid1.dockingStationStatus.cleanFluidStatus", { val: 1, ack: true })).to.be.true; // 1 = ERROR
		expect(adapterMock.setStateChangedAsync.calledWith("Devices.duid1.dockingStationStatus.waterBoxFilterStatus", { val: 2, ack: true })).to.be.true; // 2 = OK
		expect(adapterMock.setStateChangedAsync.calledWith("Devices.duid1.dockingStationStatus.dustBagStatus", { val: 0, ack: true })).to.be.true; // 0 = UNKNOWN
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
		expect(depsMock.ensureFolder.calledWith("Devices.duid1.floors")).to.be.true;
		expect(depsMock.ensureFolder.calledWith("Devices.duid1.floors.0")).to.be.true;
		expect(depsMock.ensureFolder.calledWith("Devices.duid1.floors.1")).to.be.true;

		// Check States
		// Floor 0
		sinon.assert.calledWithMatch(adapterMock.setStateChangedAsync, "Devices.duid1.floors.0.name", { val: "Ground Floor" });
		sinon.assert.calledWithMatch(adapterMock.setStateChangedAsync, "Devices.duid1.floors.0.mapFlag", { val: 0 });

		// Floor 1 (Name fallback)
		sinon.assert.calledWithMatch(adapterMock.setStateChangedAsync, "Devices.duid1.floors.1.name", { val: "Map 1" });

		// Load button existence
		// ensureState in BaseDeviceFeatures calls deps.ensureState(id, common) -> 2 args
		sinon.assert.calledWithMatch(depsMock.ensureState, "floors.0.load", { role: "button" });
	});
});
