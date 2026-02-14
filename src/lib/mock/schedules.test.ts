import { beforeEach, describe, expect, it, vi } from "vitest";
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

describe("Schedule (Timer) Verification", () => {
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

	it("should process timers and create schedule states", async () => {
		// Mock timer response
		const timerResponse = [
			["timer_id_1", "on", ["0 14 * * 5", ["Start Cleaning", ["102", "1", "101", "100"]], 1234567890]],
			["timer_id_2", "off", ["0 10 * * *", ["Start Cleaning", ["102", "1", "101", "100"]], 1234567891]],
			["timer_id_3", "on", ["0 8 * * 1,3,5", ["Start Cleaning", ["102", "1", "101", "100"]], 1234567892]]
		];
		// Inject mock into requestsHandler.sendRequest instead of mockRobot
		const originalSendRequest = depsMock.requestsHandler.sendRequest;
		depsMock.requestsHandler.sendRequest = vi.fn().mockImplementation(async (duid, method, params) => {
			if (method === "get_timer") return timerResponse;
			return originalSendRequest(duid, method, params);
		});

		// Call via vacuumFeatures
		await vacuumFeatures.updateTimers();

		// Check if get_timer was called
		expect(depsMock.requestsHandler.sendRequest).toHaveBeenCalledWith(expect.anything(), "get_timer", expect.anything());

		// Verify States are created
		const duid = mockRobot.duid;
		await mockAdapter.expectState(`Devices.${duid}.schedules.timer_id_1.enabled`, { val: true });
		await mockAdapter.expectState(`Devices.${duid}.schedules.timer_id_1.cron`, { val: "0 14 * * 5" });

		await mockAdapter.expectState(`Devices.${duid}.schedules.timer_id_2.enabled`, { val: false });
		await mockAdapter.expectState(`Devices.${duid}.schedules.timer_id_3.cron`, { val: "0 8 * * 1,3,5" });
	});
});
