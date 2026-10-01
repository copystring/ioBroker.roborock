import { describe, expect, it } from "vitest";
import { buildMowerButton, buildMowerInfoRequest, buildMowerRainfallRequest, buildMowerSettingsRequest } from "../../src/lib/mower/mowerContract";
import { decodeMowerPbPush, decodeMowerRobotMessage, encodeMowerRemoteMessage } from "../../src/lib/mower/mowerProtobuf";
import { MowerStatusStore } from "../../src/lib/mower/MowerStatusStore";

describe("source-derived mower protobuf wire fields", () => {
	it("decodes progress float fields and navigation fallback independently from fixed source-tag fixtures", () => {
		const store = new MowerStatusStore();
		const primary = decodeMowerRobotMessage(Buffer.from("087b1026ea010f4d0000c84355000016445d0000c841", "hex"));
		expect(primary).toMatchObject({ mow_progress: { mow_all_area: 400, expected_time: 600, cur_mow_progress: 25 } });
		store.acceptRobotMessage(primary);
		expect(store.getSnapshot()).toMatchObject({ mowingProgress: 25, totalArea: 400, expectedDuration: 600, mowedArea: 100, remainingTime: 450 });
		const fallback = decodeMowerRobotMessage(Buffer.from("087c1026620e7a0c182825000048433d00009643", "hex"));
		expect(fallback).toMatchObject({ navigation: { nav_task_progress: { percent: 40, area: 200, expected_time: 300 } } });
		store.acceptRobotMessage(fallback);
		expect(store.getSnapshot()).toMatchObject({ mowingProgress: 25, navigationProgress: 40, totalArea: 200, expectedDuration: 300, mowedArea: null, remainingTime: null });
	});
	it("encodes source rainfall float hours and settings request without unrelated defaults", () => {
		expect(encodeMowerRemoteMessage(buildMowerRainfallRequest({ enable: true, delayHours: 3 }, 123)).toString("hex")).toBe("087b101c92010710011d00004040");
		expect(encodeMowerRemoteMessage(buildMowerSettingsRequest(123)).toString("hex")).toBe("087b101d");
	});
	it("decodes USER_MODE_CONFIG rainfall from RobotMsg field 34 and UserModeConfig field 1", () => {
		const decoded = decodeMowerRobotMessage(Buffer.from("087b10199202090a0710011d00004040", "hex"));
		expect(decoded).toEqual({ id: "123", type: 25, user_mode_config: { rainfall_config: { enable: true, delay_time: 3 } } });
		const store = new MowerStatusStore();
		store.acceptRobotMessage(decoded);
		expect(store.getSnapshot()).toEqual({ rainEnabled: true, rainDelayHours: 3 });
	});
	it("matches RemoteMsg tags 1/2/5 and enum values independently of JSON enum strings", () => {
		// Source encoder: uint64(8).id, int32(16).type, int32(40).app_button.
		expect(encodeMowerRemoteMessage(buildMowerButton("start", 123)).toString("hex")).toBe("087b1006280e");
		expect(encodeMowerRemoteMessage(buildMowerInfoRequest(123)).toString("hex")).toBe("087b1042");
	});

	it("decodes RobotMsg hardware(13), HardwareMsg battery(1), Battery percent(2)", () => {
		const decoded = decodeMowerRobotMessage(Buffer.from("087b10266a040a021055", "hex"));
		expect(decoded).toEqual({ id: "123", type: 38, hardware: { battery: { percent: 85 } } });
		const store = new MowerStatusStore();
		expect(store.acceptRobotMessage(decoded)).toBe(true);
		expect(store.getSnapshot()).toEqual({ messageId: "123", battery: 85 });
	});

	it("skips unknown nested fields and keeps absent fields absent", () => {
		expect(decodeMowerRobotMessage(Buffer.from("087b10266a070a051055980601", "hex"))).toEqual({ id: "123", type: 38, hardware: { battery: { percent: 85 } } });
		expect(decodeMowerRobotMessage(Buffer.from("087b1026", "hex"))).toEqual({ id: "123", type: 38 });
	});

	it("rejects truncated input and invalid or overflowing request ids", () => {
		expect(() => decodeMowerRobotMessage(Buffer.from("087b10266a040a02", "hex"))).toThrow();
		expect(() => encodeMowerRemoteMessage({ id: "18446744073709551616", type: "GET_ROBOT_INFO" })).toThrow("id");
		expect(() => encodeMowerRemoteMessage({ id: "bad", type: "GET_ROBOT_INFO" })).toThrow("id");
	});

	it("uses only envelope.result as RobotMsg, never envelope RPC id/type", () => {
		const raw = "087b10266a040a021055";
		// PB + envelope id=999/type=RPC + result(field5), followed by RobotMsg id=123/type=38.
		expect(decodeMowerPbPush(Buffer.from(`504218e70720012a0a${raw}`, "hex"))).toEqual({ id: "123", type: 38, hardware: { battery: { percent: 85 } } });
		expect(decodeMowerPbPush(Buffer.from(`504218e70720022a0a${raw}`, "hex"))?.id).toBe("123");
		expect(decodeMowerPbPush(Buffer.from("504218e7072001", "hex"))).toBeUndefined();
		expect(decodeMowerPbPush(Buffer.from("50432a00", "hex"))).toBeUndefined();
	});

	it("decodes mower task, separate charge state and categorized packed error fields", () => {
		// Source tags: chargeState=152, fsmErrors=370, userErrors=418, RobotTask=570.
		const decoded = decodeMowerRobotMessage(Buffer.from("087b1026980104f20205120301ac02a203020708ba040408121037", "hex"));
		expect(decoded).toEqual({ id: "123", type: 38, fsm_charge_state: 4, fsm_errors: { recoverable: [1, 300] }, user_errors: [7, 8], robot_task: { working_state: 18, robot_detail_state: 55 } });
		const store = new MowerStatusStore();
		store.acceptRobotMessage(decoded);
		expect(store.getSnapshot()).toEqual({ messageId: "123", chargeState: 4, detailState: 55, workingState: 18, fsmErrors: '{"recoverable":[1,300]}', userErrors: '[7,8]' });
	});
});
