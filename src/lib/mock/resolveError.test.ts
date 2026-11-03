import { beforeEach, describe, expect, it, vi } from "vitest";
import { SKIP_COMMAND } from "../features/baseDeviceFeatures";
import { Feature } from "../features/features.enum";
import { V1VacuumFeatures } from "../features/vacuum/v1VacuumFeatures";
import { requestsHandler } from "../requestsHandler";
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

describe("resolve_error command", () => {
	let mockAdapter: MockAdapter;
	let mockRobot: MockRobot;
	let vacuumFeatures: TestVacuum;
	let statusPrefix: string;

	beforeEach(async () => {
		mockAdapter = new MockAdapter();
		mockRobot = new MockRobot();
		statusPrefix = `Devices.${mockRobot.duid}.deviceStatus`;

		const depsMock: any = {
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
				sendRequest: async (_duid: string, method: string, params: any) => mockRobot.handleRequest(method, params),
				command: async () => {}
			}
		};
		mockAdapter.requestsHandler = depsMock.requestsHandler;
		mockAdapter.http_api = depsMock.http_api;

		vacuumFeatures = new TestVacuum(depsMock, mockRobot.duid, mockRobot.model, { staticFeatures: [] });
		await vacuumFeatures.initialize();
	});

	it("registers resolve_error as a button", () => {
		expect(vacuumFeatures.getCommandSpec("commands", "resolve_error")).toMatchObject({ type: "boolean", role: "button" });
	});

	it("resolves a pending dock error first, as an object (never an array)", async () => {
		await mockAdapter.setStateAsync(`${statusPrefix}.dock_error_status`, { val: 42, ack: true });
		await mockAdapter.setStateAsync(`${statusPrefix}.error_code`, { val: 5, ack: true });

		const params = await vacuumFeatures.getCommandParams("resolve_error");

		expect(params).toEqual({ error_code: 42 });
		expect(Array.isArray(params)).toBe(false);
	});

	it("falls back to the robot error when the dock reports none", async () => {
		await mockAdapter.setStateAsync(`${statusPrefix}.dock_error_status`, { val: 0, ack: true });
		await mockAdapter.setStateAsync(`${statusPrefix}.error_code`, { val: 5, ack: true });

		expect(await vacuumFeatures.getCommandParams("resolve_error")).toEqual({ error_code: 5 });
	});

	it("skips the request while no error is pending", async () => {
		await mockAdapter.setStateAsync(`${statusPrefix}.dock_error_status`, { val: 0, ack: true });
		await mockAdapter.setStateAsync(`${statusPrefix}.error_code`, { val: 0, ack: true });

		expect(await vacuumFeatures.getCommandParams("resolve_error")).toBe(SKIP_COMMAND);
	});

	it("clears the dock error on the mock robot", async () => {
		mockRobot.updateState({ dock_error_status: 42 });

		expect(mockRobot.handleRequest("resolve_error", { error_code: 42 } as any)).toEqual(["ok"]);
		expect(mockRobot.state.dock_error_status).toBe(0);
		expect(() => mockRobot.handleRequest("resolve_error", [42])).toThrow("-10007");
	});
});

describe("requestsHandler.command with SKIP_COMMAND", () => {
	it("sends nothing when the handler skips the command", async () => {
		const mockAdapter = new MockAdapter();
		const handler = new requestsHandler(mockAdapter as any);
		const sendRequest = vi.spyOn(handler, "sendRequest").mockResolvedValue(["ok"] as any);
		const featureHandler: any = { getCommandParams: async () => SKIP_COMMAND };

		await handler.command(featureHandler, "duid", "resolve_error");

		expect(sendRequest).not.toHaveBeenCalled();
	});

	it("sends the object params otherwise", async () => {
		const mockAdapter = new MockAdapter();
		const handler = new requestsHandler(mockAdapter as any);
		const sendRequest = vi.spyOn(handler, "sendRequest").mockResolvedValue(["ok"] as any);
		const featureHandler: any = { getCommandParams: async () => ({ error_code: 42 }) };

		await handler.command(featureHandler, "duid", "resolve_error");

		expect(sendRequest).toHaveBeenCalledWith("duid", "resolve_error", { error_code: 42 }, expect.any(Object));
	});
});
