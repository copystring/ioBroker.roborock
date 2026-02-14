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

describe("Error Resilience", () => {
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
					// Simulate error for specific method
					if (method === "get_status_fail") {
						throw new Error("Simulated Timeout");
					}
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

	it("should handle request failures gracefully", async () => {
		// We override requestAndProcess in the test instance or mock the deps?
		// requestAndProcess uses this.deps.adapter.requestsHandler.sendRequest
		// We can define a new method on vacuumFeatures that uses a failing command, OR
		// just call sendRequest directly and verify it throws/catches.

		// BaseDeviceFeatures.updateStatus uses "get_status".
		// Let's force sendRequest to fail for "get_status".

		const originalSendRequest = depsMock.requestsHandler.sendRequest;
		depsMock.requestsHandler.sendRequest = async (duid: string, method: string, params: any[]) => {
			if (method === "get_status" || method === "get_prop") {
				throw new Error("Network Error");
			}
			return originalSendRequest(duid, method, params);
		};

		// Spy on log.warn to verify error is caught and logged
		let warnCalled = false;
		const originalWarn = mockAdapter.log.warn.bind(mockAdapter.log);
		mockAdapter.log.warn = (msg: string) => {
			if (msg.includes("Network Error") || msg.toLowerCase().includes("failed")) {
				warnCalled = true;
			}
			originalWarn(msg);
		};
		const originalError = mockAdapter.log.error.bind(mockAdapter.log);
		mockAdapter.log.error = (msg: string) => {
			if (msg.includes("Network Error") || msg.includes("Failed")) {
				warnCalled = true;
			}
			originalError(msg);
		};

		await vacuumFeatures.updateStatus();

		expect(warnCalled).to.be.true;
	});
});
