import { describe, expect, it, vi } from "vitest";
import { MowerSession } from "../../src/lib/mower/MowerSession";
import { MowerRpcTransport, type MowerRpcEnvelope } from "../../src/lib/mower/MowerRpcTransport";
import { createMowerCloudTransport } from "../../src/lib/mower/mowerCloudTransport";

describe("mower session command / ACK / semantic status lifecycle", () => {
	it("validates changed schedule heights against fresh device bounds before publishing", async () => {
		const plan = { id: 11, type: 2, status: 2, start: "1609495200", end: "1609498800", days: [{ type: 1 }], mode: 1, config: { mode: 1, global: { height: 56 } }, fsm_state: 18 };
		const request = vi.fn(async (_duid: string, params: any) => {
			if (params.type === "GET_MOW_PREFERENCE_CONFIG") return { id: 1, result: { type: 24, preference_config: { global: { height: 50, mow_times: 2 }, mode: 1 } } };
			if (params.type === "GET_HEIGHT_MOTOR_PARAMETER") return { id: 1, result: { type: 30, height_motor_parameter: { min: 30, max: 70, step: 5 } } };
			return { id: 1, result: { type: 34, mow_schedule: { plans: [] } } };
		});
		const session = new MowerSession("s108", "roborock.mower.a266", null, { request });
		await expect(session.mutateSchedule("create", plan)).rejects.toThrow("range or step");
		expect(request.mock.calls.map(call => call[1].type)).toEqual(["GET_MOW_SCHEDULE", "GET_MOW_PREFERENCE_CONFIG", "GET_HEIGHT_MOTOR_PARAMETER"]);
		await session.mutateSchedule("create", { ...plan, config: { mode: 1, global: { height: 55 } } });
		expect(request.mock.calls.find(call => call[1].type === "CREATE_MOWING_PLAN")?.[1].mowing_plan.config.global).toEqual({ height: 55, mow_times: 2 });
		session.close();
	});
	it("uses fresh schedule data for collision and overlap checks and re-reads after a successful create", async () => {
		const plan = { id: 11, type: 2, status: 1, start: "1609495200", end: "1609498800", days: [{ type: 1 }], mode: 1, config: { mode: 1, global: { height: 50 } }, fsm_state: 18 };
		let created = false;
		const request = vi.fn(async (_duid: string, params: any) => {
			if (params.type === "CREATE_MOWING_PLAN") { created = true; return { id: 1, result: "ok" }; }
			if (params.type === "GET_MOW_PREFERENCE_CONFIG") return { id: 1, result: { type: "MOW_PREFERENCE_CONFIG", preference_config: { global: { height: 50, mow_times: 2, effective: 1 }, mode: 1 } } };
			return { id: 1, result: { type: "MOW_SCHEDULE", mow_schedule: { plans: created ? [plan] : [], time_zone: "UTC" } } };
		});
		const session = new MowerSession("s108", "roborock.mower.a266", null, { request });
		// This cached ID must not override the fresh device list returned for this operation.
		session.acceptRobotMessage({ type: "MOW_SCHEDULE", mow_schedule: { plans: [plan] } });
		await session.mutateSchedule("create", plan);
		expect(request.mock.calls.map(call => call[1].type)).toEqual(["GET_MOW_SCHEDULE", "GET_MOW_PREFERENCE_CONFIG", "CREATE_MOWING_PLAN", "GET_MOW_SCHEDULE"]);
		expect(request.mock.calls.find(call => call[1].type === "CREATE_MOWING_PLAN")?.[1].mowing_plan.config.global).toEqual({ height: 50, mow_times: 2, effective: 1 });
		expect(session.getSchedules()?.plans).toHaveLength(1);
		await expect(session.mutateSchedule("create", plan)).rejects.toThrow("already exists");
		const second = { ...plan, id: 12 };
		await expect(session.mutateSchedule("create", second)).rejects.toThrow("overlaps");
		expect(request.mock.calls.filter(call => call[1].type === "CREATE_MOWING_PLAN")).toHaveLength(1);
		session.close();
	});

	it("cancels a schedule readback after its ACK on connection loss and never sends the queued mutation", async () => {
		const request = vi.fn(async () => ({ id: 1, result: "ok" }));
		const session = new MowerSession("s108", "roborock.mower.a266", null, { request });
		const pending = session.mutateSchedule("delete", { id: 11 });
		const rejected = expect(pending).rejects.toThrow("cancelled");
		await vi.waitFor(() => expect(request).toHaveBeenCalledOnce());
		session.cancelReadbacks();
		await rejected;
		expect(request.mock.calls).toHaveLength(1);
		session.close();
	});
	it("sets height only over BLE and retains the previous preference until actual readback", async () => {
		const request = vi.fn(async () => ({ id: 1, result: "ok" }));
		const ble = { isConnected: () => true, callMethod: vi.fn(async () => ({})) };
		const session = new MowerSession("s108", "roborock.mower.a266", null, { request }, () => 100, { ble });
		session.acceptRobotMessage({ type: 30, height_motor_parameter: { min: 30, max: 70, step: 5 } });
		session.acceptRobotMessage({ type: 24, preference_config: { global: { height: 50 } } });
		await session.setCuttingHeight(55);
		expect(ble.callMethod.mock.calls[0][1]).toEqual({ id: "100", type: "REMOTE_CMD", remote_cmd: { type: "MAIN_CUTTER_HEIGHT", main_cutter_height: 55 } });
		expect(request.mock.calls.map(call => call[1].type)).toEqual(["GET_MOW_PREFERENCE_CONFIG"]);
		expect(session.getStatus()?.cuttingHeight).toBe(50);
		session.acceptRobotMessage({ type: 24, preference_config: { global: { height: 55 } } });
		expect(session.getStatus()?.cuttingHeight).toBe(55);
		session.acceptRobotMessage({ type: 24, preference_config: { custom: [{ area_id: 7, height: 45 }] } });
		expect(session.getStatus()?.cuttingHeight).toBeNull();
		expect(session.getStatus()?.areaCuttingHeights).toBe('[{"areaId":7,"height":45}]');
		session.close();
	});

	it("cancels a selected-area request during asynchronous frame encoding when its map changes", async () => {
		let release = () => {};
		const encode = new Promise<void>(resolve => { release = resolve; });
		const publishFrame = vi.fn(async () => {});
		const buildFrame = vi.fn(async () => { await encode; return Buffer.from("encoded"); });
		const transport = createMowerCloudTransport({
			getModel: () => "roborock.mower.a266", getCategory: () => "roborock.mower", getProtocol: async () => "L01",
			isConnected: () => true, isDeviceOnline: () => true, buildFrame, publishFrame,
		});
		const maps = { isAvailable: () => true, readCurrentMap: async () => ({ mapName: "current", navMap: { name: "current", boundaries: [{ id: 7, name: "Lawn" }] } }) };
		const session = new MowerSession("s108", "roborock.mower.a266", null, transport, Date.now, { maps });
		try {
			const pending = session.mowAreas({ mapName: "current", boundaryIds: [7] }, "area");
			const rejected = expect(pending).rejects.toThrow("cancelled");
			await vi.waitFor(() => expect(buildFrame).toHaveBeenCalledOnce());
			await session.refreshMap();
			await rejected;
			release();
			await Promise.resolve();
			await Promise.resolve();
			expect(publishFrame).not.toHaveBeenCalled();
		} finally { release(); session.close(); transport.stop(); }
	});
	it("runs the source command through RPC without creating an optimistic device state", async () => {
		const sent: Array<{ duid: string; rpc: MowerRpcEnvelope }> = [];
		const rpc = new MowerRpcTransport({ publish: async (duid, envelope) => { sent.push({ duid, rpc: envelope }); } });
		const session = new MowerSession("s108", "roborock.mower.a266", "roborock.mower", rpc, () => 1700000000000);
		const command = session.command("start");
		expect(sent).toEqual([{ duid: "s108", rpc: { id: 1, method: "remote_pb", params: { id: "1700000000000", type: "APP_BUTTON", app_button: "MOW_GLOBAL" } } }]);
		expect(session.getStatus()).toBeUndefined();
		rpc.acceptDps("s108", { "102": { id: 1, result: "ok" } });
		await expect(command).resolves.toEqual({ id: 1, result: "ok" });
		expect(session.getStatus()).toBeUndefined();
		expect(session.acceptRobotMessage({ id: "1700000000001", type: "ROBOT_STATUS_UPDATE", hardware: { battery: { percent: 85 } } })).toBe(true);
		expect(session.getStatus()).toEqual({ messageId: "1700000000001", battery: 85 });
		const statusRequest = session.requestStatus();
		expect(sent[1].rpc.params).toEqual({ id: "1700000000001", type: "GET_ROBOT_INFO" });
		rpc.acceptDps("s108", { "102": { id: 2, result: "ok" } });
		await statusRequest;
		expect(session.getStatus()?.battery).toBe(85);
	});

	it("uses distinct protobuf ids for rapid commands and a backwards clock", async () => {
		const request = vi.fn(async () => ({ id: 1, result: "ok" }));
		const now = vi.fn().mockReturnValueOnce(100).mockReturnValueOnce(100).mockReturnValueOnce(99);
		const session = new MowerSession("s108", "roborock.mower.a266", null, { request }, now);
		await session.command("pause");
		await session.command("resume");
		await session.command("stop");
		expect(request.mock.calls.map(call => call[1].id)).toEqual(["100", "101", "102"]);
	});

	it("rejects unknown models and invalid clocks before sending", () => {
		const request = vi.fn(async () => ({ id: 1 }));
		expect(() => new MowerSession("unknown", "roborock.mower.unknown", "roborock.mower", { request })).toThrow("Unsupported");
		const session = new MowerSession("s108", "roborock.mower.a266", null, { request }, () => NaN);
		expect(() => session.requestStatus()).toThrow("clock");
		expect(request).not.toHaveBeenCalled();
	});

	it("rejects commands and ignores incoming status after closing a session", async () => {
		const request = vi.fn(async () => ({ id: 1 }));
		const session = new MowerSession("s108", "roborock.mower.a266", null, { request });
		session.close();
		expect(() => session.command("charge")).toThrow("closed");
		expect(session.acceptRobotMessage({ id: 1, type: 38 })).toBe(false);
		expect(request).not.toHaveBeenCalled();
	});

	it("cancels a pending request when its session closes and ignores its late ACK", async () => {
		const rpc = new MowerRpcTransport({ publish: async () => {} });
		const session = new MowerSession("s108", "roborock.mower.a266", null, rpc);
		const pending = session.command("start");
		const rejected = expect(pending).rejects.toThrow("cancelled");
		session.close();
		await rejected;
		expect(rpc.acceptDps("s108", { "102": { id: 1, result: "ok" } })).toBe(false);
	});
});
