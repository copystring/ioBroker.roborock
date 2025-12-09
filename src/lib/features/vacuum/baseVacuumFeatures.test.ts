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

		await vacuum.testUpdateDss(dssValue);

		expect(adapterMock.setStateChangedAsync.calledWith("Devices.duid1.dockingStationStatus.cleanFluidStatus", { val: 1, ack: true })).to.be.true; // 1 = ERROR
		expect(adapterMock.setStateChangedAsync.calledWith("Devices.duid1.dockingStationStatus.waterBoxFilterStatus", { val: 2, ack: true })).to.be.true; // 2 = OK
		expect(adapterMock.setStateChangedAsync.calledWith("Devices.duid1.dockingStationStatus.dustBagStatus", { val: 0, ack: true })).to.be.true; // 0 = UNKNOWN
	});
});
