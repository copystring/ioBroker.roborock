import { describe, expect, it, vi } from "vitest";

vi.mock("@iobroker/adapter-core", () => ({
	Adapter: class MockAdapter {}
}));

vi.mock("go2rtc-static", () => ({
	default: ""
}));

describe("command state handling", () => {
	async function createSceneAdapter(sceneParam: string, sendRequest: ReturnType<typeof vi.fn>, commandSpy: ReturnType<typeof vi.fn>) {
		const errorMessage = (error: unknown): string => error instanceof Error ? error.message : String(error);
		const { Roborock } = await import("../../src/main");
		const handler = { protocolVersion: "L01" };

		return {
			adapter: Object.assign(Object.create(Roborock.prototype), {
				deviceFeatureHandlers: new Map([["duid1", handler]]),
				http_api: {
					getScenes: vi.fn().mockResolvedValue({
						result: [{
							id: 23,
							name: "Multi Step Program",
							param: sceneParam
						}]
					})
				},
				requestsHandler: {
					command: commandSpy,
					sendRequest
				},
				rLog: vi.fn(),
				errorMessage
			}),
			handler
		};
	}

	it("ignores stale command states that are no longer registered", async () => {
		const { Roborock } = await import("../../src/main");
		const commandSpy = vi.fn().mockResolvedValue(undefined);
		const handler = {
			protocolVersion: "1.0",
			hasCommandFolder: vi.fn().mockReturnValue(true),
			getCommandSpec: vi.fn().mockReturnValue(undefined)
		};
		const adapter = Object.assign(Object.create(Roborock.prototype), {
			deviceFeatureHandlers: new Map([["duid1", handler]]),
			requestsHandler: { command: commandSpy },
			rLog: vi.fn(),
			catchError: vi.fn()
		});

		await adapter.onStateChange("roborock.0.Devices.duid1.commands.app_start_dust_collection", {
			val: true,
			ack: false
		});

		expect(handler.getCommandSpec).toHaveBeenCalledWith("commands", "app_start_dust_collection");
		expect(commandSpy).not.toHaveBeenCalled();
		expect(adapter.catchError).not.toHaveBeenCalled();
	});

	it("starts scene programs with the full cmd_ids payload resolved from app_get_program", async () => {
		const cmdIds = [
			{ id: 11, cmd_id: "sound", value: "code_mode_process_9" },
			{ id: 12, cmd_id: "arm_out" }
		];
		const sceneParam = JSON.stringify({
			action: {
				items: [{
					id: "scene-item-1",
					type: "CMD",
					entityId: "duid1",
					param: JSON.stringify({
						method: "app_start_program",
						params: JSON.stringify({ program_id: 7 })
					})
				}]
			}
		});
		const sendRequest = vi.fn().mockResolvedValue({ result: { program_id: 7, cmd_ids: cmdIds } });
		const commandSpy = vi.fn().mockResolvedValue(undefined);
		const { adapter, handler } = await createSceneAdapter(sceneParam, sendRequest, commandSpy);

		await adapter.executeSceneLocal("duid1", 23);

		expect(sendRequest).toHaveBeenCalledWith("duid1", "app_get_program", { program_id: 7 });
		expect(commandSpy).toHaveBeenCalledWith(handler, "duid1", "app_start_program", { cmd_ids: cmdIds });
	});

	it("uses complete scene cmd_ids directly when they are already present", async () => {
		const cmdIds = [
			{ id: 11, cmd_id: "sound", value: "code_mode_process_9" },
			{ id: 12, cmd_id: "arm_out" }
		];
		const sceneParam = JSON.stringify({
			action: {
				items: [{
					id: "scene-item-1",
					type: "CMD",
					entityId: "duid1",
					param: JSON.stringify({
						method: "app_start_program",
						params: { program_id: 7, cmd_ids: cmdIds }
					})
				}]
			}
		});
		const sendRequest = vi.fn().mockResolvedValue({ result: { program_id: 7, cmd_ids: [] } });
		const commandSpy = vi.fn().mockResolvedValue(undefined);
		const { adapter, handler } = await createSceneAdapter(sceneParam, sendRequest, commandSpy);

		await adapter.executeSceneLocal("duid1", 23);

		expect(sendRequest).not.toHaveBeenCalled();
		expect(commandSpy).toHaveBeenCalledWith(handler, "duid1", "app_start_program", { cmd_ids: cmdIds });
	});

	it("batches multi-step do_scenes_segments scene actions into one robot request", async () => {
		const tasks = [
			{ tid: "1780688479002", segs: [{ sid: 1 }], map_flag: 0, fan_power: 108, water_box_mode: 200, mop_mode: 303, repeat: 1 },
			{ tid: "1780688480859", segs: [{ sid: 2 }], map_flag: 0, fan_power: 108, water_box_mode: 200, mop_mode: 303, repeat: 2 },
			{ tid: "1780688482671", segs: [{ sid: 1 }], map_flag: 0, fan_power: 105, water_box_mode: 250, mop_mode: 303, repeat: 1 },
			{ tid: "1780688484498", segs: [{ sid: 2 }], map_flag: 0, fan_power: 105, water_box_mode: 250, mop_mode: 303, repeat: 2 }
		];
		const sceneParam = JSON.stringify({
			action: {
				items: tasks.map((task, index) => ({
					id: `scene-item-${index}`,
					type: "CMD",
					entityId: "duid1",
					param: JSON.stringify({
						method: "do_scenes_segments",
						params: { data: [task], source: 101 }
					})
				}))
			}
		});
		const sendRequest = vi.fn().mockResolvedValue({});
		const commandSpy = vi.fn().mockResolvedValue(undefined);
		const { adapter, handler } = await createSceneAdapter(sceneParam, sendRequest, commandSpy);

		await adapter.executeSceneLocal("duid1", 23);

		expect(commandSpy).toHaveBeenCalledTimes(1);
		expect(commandSpy).toHaveBeenCalledWith(handler, "duid1", "do_scenes_segments", {
			data: tasks,
			source: 101
		});
		expect(sendRequest).not.toHaveBeenCalled();
	});

	it("does not batch do_scenes_segments scene actions with different metadata", async () => {
		const sceneParam = JSON.stringify({
			action: {
				items: [101, 102].map((source, index) => ({
					id: `scene-item-${index}`,
					type: "CMD",
					entityId: "duid1",
					param: JSON.stringify({
						method: "do_scenes_segments",
						params: {
							data: [{ tid: `task-${index}`, segs: [{ sid: index + 1 }] }],
							source
						}
					})
				}))
			}
		});
		const sendRequest = vi.fn().mockResolvedValue({});
		const commandSpy = vi.fn().mockResolvedValue(undefined);
		const { adapter, handler } = await createSceneAdapter(sceneParam, sendRequest, commandSpy);

		await adapter.executeSceneLocal("duid1", 23);

		expect(commandSpy).toHaveBeenCalledTimes(2);
		expect(commandSpy).toHaveBeenNthCalledWith(1, handler, "duid1", "do_scenes_segments", {
			data: [{ tid: "task-0", segs: [{ sid: 1 }] }],
			source: 101
		});
		expect(commandSpy).toHaveBeenNthCalledWith(2, handler, "duid1", "do_scenes_segments", {
			data: [{ tid: "task-1", segs: [{ sid: 2 }] }],
			source: 102
		});
	});

	it("does not start scene programs with a raw program_id when cmd_ids cannot be resolved", async () => {
		const sceneParam = JSON.stringify({
			action: {
				items: [{
					id: "scene-item-1",
					type: "CMD",
					entityId: "duid1",
					param: JSON.stringify({
						method: "app_start_program",
						params: { program_id: 7 }
					})
				}]
			}
		});
		const sendRequest = vi.fn().mockResolvedValue({ result: { program_id: 7 } });
		const commandSpy = vi.fn().mockResolvedValue(undefined);
		const { adapter } = await createSceneAdapter(sceneParam, sendRequest, commandSpy);

		await adapter.executeSceneLocal("duid1", 23);

		expect(sendRequest).toHaveBeenCalledWith("duid1", "app_get_program", { program_id: 7 });
		expect(commandSpy).not.toHaveBeenCalled();
	});
});
