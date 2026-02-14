import { beforeEach, describe, expect, it } from "vitest";
import { Feature } from "../features/features.enum";
import { V1VacuumFeatures } from "../features/vacuum/v1VacuumFeatures";
import { MockAdapter } from "./MockAdapter";
import { MockRobot } from "./MockRobot";

class TestVacuum extends V1VacuumFeatures {
	protected getDynamicFeatures(): Set<Feature> {
		return new Set();
	}
	public async detectAndApplyRuntimeFeatures(): Promise<boolean> {
		return false;
	}
}

describe("State Machine Deep Dive", () => {
	let mockAdapter: MockAdapter;
	let mockRobot: MockRobot;
	let vacuumFeatures: TestVacuum;
	let depsMock: any;

	beforeEach(async () => {
		mockAdapter = new MockAdapter();
		mockRobot = new MockRobot();

		depsMock = {
			adapter: mockAdapter,
			log: mockAdapter.log,
			ensureState: async (id: string, common: any) => {
				await mockAdapter.setObjectNotExistsAsync(id, { type: "state", common });
			},
			ensureFolder: async (id: string) => {
				await mockAdapter.setObjectNotExistsAsync(id, { type: "folder", common: { name: id } });
			},
			config: { staticFeatures: [] },
			http_api: {
				getFwFeaturesResult: () => mockRobot.features,
				storeFwFeaturesResult: () => {},
				getRobotModel: () => mockRobot.model
			},
			requestsHandler: {
				sendRequest: async (duid: string, method: string, params: any[]) => {
					if (duid !== mockRobot.duid) return [];
					return mockRobot.handleRequest(method, params);
				},
				command: async () => {}
			}
		};
		mockAdapter.requestsHandler = depsMock.requestsHandler;
		mockAdapter.http_api = depsMock.http_api;

		vacuumFeatures = new TestVacuum(depsMock, mockRobot.duid, mockRobot.model, { staticFeatures: [] });
		await vacuumFeatures.initialize();
	});

	it("should process cleaning -> error -> resolved -> charging transition", async () => {
		// 1. Initial State: Cleaning
		mockRobot.state.state = 5; // Cleaning
		mockRobot.state.in_cleaning = 1;
		mockRobot.state.error_code = 0;
		await vacuumFeatures.updateStatus();
		expect(mockAdapter.states[`Devices.${mockRobot.duid}.deviceStatus.state`]).to.equal(5);
		expect(mockAdapter.states[`Devices.${mockRobot.duid}.deviceStatus.in_cleaning`]).to.equal(1);

		// 2. Error State: Device Stuck
		mockRobot.state.state = 12; // Error
		mockRobot.state.error_code = 8; // Stuck
		mockRobot.state.in_cleaning = 0;
		await vacuumFeatures.updateStatus();
		expect(mockAdapter.states[`Devices.${mockRobot.duid}.deviceStatus.state`]).to.equal(12);
		expect(mockAdapter.states[`Devices.${mockRobot.duid}.deviceStatus.error_code`]).to.equal(8);

		// 3. Resolved: Idle/Charging
		mockRobot.state.state = 8; // Charging
		mockRobot.state.error_code = 0;
		mockRobot.state.in_cleaning = 0;
		await vacuumFeatures.updateStatus();
		expect(mockAdapter.states[`Devices.${mockRobot.duid}.deviceStatus.state`]).to.equal(8);
		expect(mockAdapter.states[`Devices.${mockRobot.duid}.deviceStatus.error_code`]).to.equal(0);

		// Verify invalid transitions/states didn't persist
		// e.g. ensure error_code is CLEARED (0)
		expect(mockAdapter.states[`Devices.${mockRobot.duid}.deviceStatus.error_code`]).to.equal(0);
	});
});
