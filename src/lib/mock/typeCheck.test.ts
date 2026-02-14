import { beforeEach, describe, expect, it } from "vitest";
import { Feature } from "../features/features.enum";
import { V1VacuumFeatures } from "../features/vacuum/v1VacuumFeatures";
import { MockAdapter } from "./MockAdapter";
import { MockRobot } from "./MockRobot";

// Concrete implementation for testing abstract class
class TestVacuum extends V1VacuumFeatures {
	protected getDynamicFeatures(): Set<Feature> {
		return new Set();
	}
	public async detectAndApplyRuntimeFeatures(): Promise<boolean> {
		return false;
	}
}

describe("Adapter Type Verification", () => {
	let mockAdapter: MockAdapter;
	let mockRobot: MockRobot;
	let vacuumFeatures: TestVacuum;
	let depsMock: any;

	beforeEach(async () => {
		mockAdapter = new MockAdapter();
		mockRobot = new MockRobot();

		// Mock the Dependencies
		depsMock = {
			adapter: mockAdapter,
			log: mockAdapter.log,
			ensureState: async (id: string, common: any) => {
				// BaseDeviceFeatures.ensureState passes 'native' as 3rd arg, NOT value.
				// So we only ensure object existence here.
				await mockAdapter.setObjectNotExistsAsync(id, { type: "state", common });
			},
			ensureFolder: async (id: string) => {
				await mockAdapter.setObjectNotExistsAsync(id, { type: "folder", common: { name: id } });
			},
			config: { staticFeatures: [] },
			http_api: {
				getFwFeaturesResult: () => mockRobot.features,
				storeFwFeaturesResult: () => {}
			},
			// Intercept all requests and route to MockRobot
			requestsHandler: {
				sendRequest: async (duid: string, method: string, params: any[]) => {
					if (duid !== mockRobot.duid) return [];
					return mockRobot.handleRequest(method, params);
				},
				command: async () => {} // Add dummy command handler
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
		expect(mockAdapter.states[`Devices.${mockRobot.duid}.deviceStatus.battery`]).to.equal(100);
	});

	it("should process network info and verify types", async () => {
		await vacuumFeatures.initialize();
		await vacuumFeatures.updateNetworkInfo();
		expect(mockAdapter.states[`Devices.${mockRobot.duid}.networkInfo.ip`]).to.equal("192.168.1.91");
	});

	it("should process clean summary and verify types", async () => {
		await vacuumFeatures.initialize();
		await vacuumFeatures.updateCleanSummary();
		expect(mockAdapter.states[`Devices.${mockRobot.duid}.cleaningInfo.clean_time`]).to.equal(122.6);
	});
});
