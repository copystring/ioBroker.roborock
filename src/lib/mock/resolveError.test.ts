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
	let sendRequest: ReturnType<typeof vi.fn>;

	beforeEach(async () => {
		mockAdapter = new MockAdapter();
		mockRobot = new MockRobot();
		statusPrefix = `Devices.${mockRobot.duid}.deviceStatus`;
		sendRequest = vi.fn(async (_duid: string, method: string, params: any) => mockRobot.handleRequest(method, params));

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
				sendRequest,
				command: async () => {}
			}
		};
		mockAdapter.requestsHandler = depsMock.requestsHandler;
		mockAdapter.http_api = depsMock.http_api;

		vacuumFeatures = new TestVacuum(depsMock, mockRobot.duid, mockRobot.model, { staticFeatures: [] });
		await vacuumFeatures.initialize();
	});

	const detectRuntimeFeatures = (status: Record<string, unknown>): Promise<boolean> =>
		V1VacuumFeatures.prototype.detectAndApplyRuntimeFeatures.call(vacuumFeatures, status);

	it("registers the button only for devices that report dock_error_status", async () => {
		expect(vacuumFeatures.getCommandSpec("commands", "resolve_error")).toBeUndefined();

		await detectRuntimeFeatures({ state: 8, error_code: 0 });
		expect(vacuumFeatures.getCommandSpec("commands", "resolve_error")).toBeUndefined();

		await detectRuntimeFeatures({ state: 8, error_code: 0, dock_error_status: 0 });
		expect(vacuumFeatures.getCommandSpec("commands", "resolve_error")).toMatchObject({ type: "boolean", role: "button" });
	});

	it("creates the button object when the dock is detected after startup", async () => {
		const objectId = `Devices.${mockRobot.duid}.commands.resolve_error`;
		expect(await mockAdapter.getObjectAsync(objectId)).toBeFalsy();

		await detectRuntimeFeatures({ state: 8, dock_error_status: 0 });

		expect((await mockAdapter.getObjectAsync(objectId))?.common).toMatchObject({ type: "boolean", role: "button", write: true });
	});

	it("resolves the dock error from a fresh status, as an object (never an array)", async () => {
		mockRobot.updateState({ dock_error_status: 42, error_code: 0 });

		const params = await vacuumFeatures.getCommandParams("resolve_error");

		expect(sendRequest).toHaveBeenCalledWith(mockRobot.duid, "get_prop", ["get_status"]);
		expect(params).toEqual({ error_code: 42 });
		expect(Array.isArray(params)).toBe(false);
	});

	it("ignores stale states: a cached error that the robot already cleared is not sent", async () => {
		await mockAdapter.setStateAsync(`${statusPrefix}.dock_error_status`, { val: 42, ack: true });
		mockRobot.updateState({ dock_error_status: 0 });

		expect(await vacuumFeatures.getCommandParams("resolve_error")).toBe(SKIP_COMMAND);
	});

	it("ignores stale states: a new error that the cached states do not show yet is sent", async () => {
		await mockAdapter.setStateAsync(`${statusPrefix}.dock_error_status`, { val: 0, ack: true });
		mockRobot.updateState({ dock_error_status: 38 });

		expect(await vacuumFeatures.getCommandParams("resolve_error")).toEqual({ error_code: 38 });
	});

	it("does not resolve robot errors (dock errors only)", async () => {
		mockRobot.updateState({ dock_error_status: 0, error_code: 5 });

		expect(await vacuumFeatures.getCommandParams("resolve_error")).toBe(SKIP_COMMAND);
	});

	it.each([
		["plain object", { state: 8, dock_error_status: 42 }],
		["wrapped in an array", [{ state: 8, dock_error_status: 42 }]],
		["wrapped twice", [[{ state: 8, dock_error_status: 42 }]]],
		["code as string", [{ state: 8, dock_error_status: "42" }]]
	])("accepts the status response %s", async (_label, response) => {
		sendRequest.mockResolvedValueOnce(response);

		expect(await vacuumFeatures.getCommandParams("resolve_error")).toEqual({ error_code: 42 });
	});

	it.each([
		["null", null],
		["an empty array", []],
		["a string result", ["ok"]],
		["several entries", [{ dock_error_status: 42 }, { dock_error_status: 42 }]],
		["no dock_error_status", [{ state: 8 }]],
		["a non-integer code", [{ dock_error_status: 4.2 }]]
	])("skips when the status response is %s", async (_label, response) => {
		sendRequest.mockResolvedValueOnce(response);

		expect(await vacuumFeatures.getCommandParams("resolve_error")).toBe(SKIP_COMMAND);
	});

	it("skips when the status request fails", async () => {
		await mockAdapter.setStateAsync(`${statusPrefix}.dock_error_status`, { val: 42, ack: true });
		sendRequest.mockRejectedValueOnce(new Error("Request timed out"));

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
