import { describe, expect, it } from "vitest";
import { buildMowerButton, buildMowerInfoRequest, buildMowerRainfallRequest, buildMowerSettingsRequest, parseMowerRainfallSetting, isSourceSupportedMower } from "../../src/lib/mower/mowerContract";
import { MowerStatusStore } from "../../src/lib/mower/MowerStatusStore";

describe("original mower RemoteMsg JSON contract", () => {
	it.each([0, 3, 8] as const)("builds atomic rainfall configuration with source delay %s hours", delayHours => {
		expect(buildMowerRainfallRequest({ enable: true, delayHours }, 123)).toEqual({ id: "123", type: "SET_RAINFALL", rainfall_config: { enable: true, delay_time: delayHours } });
		expect(buildMowerSettingsRequest(124)).toEqual({ id: "124", type: "GET_USER_MODE_CONFIG" });
	});
	it.each([null, {}, { enable: true }, { enable: "true", delayHours: 3 }, { enable: false, delayHours: 4 }, { enable: true, delayHours: 3, extra: 1 }])("rejects incomplete or unsupported rainfall input %j", value => {
		expect(() => parseMowerRainfallSetting(value)).toThrow("Rainfall setting");
	});
	it.each([
		["start", "MOW_GLOBAL"], ["pause", "MOW_PAUSE"], ["resume", "MOW_RESUME"], ["stop", "MOW_END"], ["charge", "CHARGE"],
	] as const)("encodes %s using string enums and a decimal string id, without defaults", (command, button) => {
		expect(buildMowerButton(command, 1700000000123)).toEqual({ id: "1700000000123", type: "APP_BUTTON", app_button: button });
	});

	it("keeps GET_ROBOT_INFO separate from button requests", () => {
		expect(buildMowerInfoRequest(1700000000123)).toEqual({ id: "1700000000123", type: "GET_ROBOT_INFO" });
		expect(() => buildMowerButton("get_status" as never, 1700000000123)).toThrow("Unsupported");
	});

	it.each([0, -1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1])("rejects invalid protobuf ids: %s", id => {
		expect(() => buildMowerInfoRequest(id)).toThrow("Invalid");
	});

	it("requires the actual source model mapping and honors conflicting categories", () => {
		expect(isSourceSupportedMower("roborock.mower.a266", "roborock.mower")).toBe(true);
		expect(isSourceSupportedMower("roborock.mower.a266", null)).toBe(true);
		expect(isSourceSupportedMower("roborock.mower.a266", "robot.vacuum.cleaner")).toBe(false);
		expect(isSourceSupportedMower("roborock.mower.new", "roborock.mower")).toBe(false);
		expect(isSourceSupportedMower("roborock.vacuum.a266", "roborock.mower")).toBe(false);
	});
});

describe("per-device mower RobotMsg status", () => {
	it("preserves partial progress values without deriving across tasks and honors primary source priority", () => {
		const store = new MowerStatusStore();
		store.acceptRobotMessage({ id: 1, type: 38, mow_progress: { cur_mow_progress: 25, mow_all_area: 400, expected_time: 600 } });
		store.acceptRobotMessage({ id: 2, type: 38, mow_progress: { cur_mow_progress: 50 } });
		expect(store.getSnapshot()).toMatchObject({ mowingProgress: 50, totalArea: 400, expectedDuration: 600, mowedArea: null, remainingTime: null });
		store.acceptRobotMessage({ id: 3, type: 38, mow_progress: { cur_mow_progress: 101, mow_all_area: -1, expected_time: NaN } });
		expect(store.getSnapshot()).toMatchObject({ mowingProgress: 50, totalArea: 400, expectedDuration: 600 });
		store.acceptRobotMessage({ id: 4, type: 38, mow_progress: { cur_mow_progress: 0, mow_all_area: 0, expected_time: 0 }, navigation: { nav_task_progress: { percentage: 20, percent: 50, area: 600, expected_time: 1000 } } });
		expect(store.getSnapshot()).toMatchObject({ mowingProgress: 0, totalArea: 0, expectedDuration: 0, mowedArea: 0, remainingTime: 0 });
	});
	it("applies RainFall defaults only to a present source container, independently of status IDs", () => {
		const store = new MowerStatusStore();
		expect(store.acceptRobotMessage({ type: 25, user_mode_config: {} })).toBe(false);
		store.acceptRobotMessage({ id: 100, type: 38 });
		store.acceptRobotMessage({ id: 1, type: "USER_MODE_CONFIG", user_mode_config: { rainfall_config: { enable: true, delay_time: 3 } } });
		expect(store.getSnapshot()).toEqual({ messageId: "100", rainEnabled: true, rainDelayHours: 3 });
		expect(store.acceptRobotMessage({ type: 25, user_mode_config: { rainfall_config: { enable: "false", delay_time: -1 } } })).toBe(false);
		store.acceptRobotMessage({ type: 25, user_mode_config: { rainfall_config: {} } });
		expect(store.getSnapshot()).toEqual({ messageId: "100", rainEnabled: false, rainDelayHours: 0 });
	});
	it("keeps sideband battery independent of ordered regular status and accepts it before the first status", () => {
		const store = new MowerStatusStore();
		expect(store.acceptRobotMessage({ type: "BATTERY_PERCENT", hardware: { battery: { percent: 85 } } })).toBe(true);
		expect(store.getSnapshot()).toEqual({ batteryBroadcast: 85 });
		store.acceptRobotMessage({ id: 100, type: 38, hardware: { battery: { percent: 80 } } });
		store.acceptRobotMessage({ id: 1, type: 79, hardware: { battery: { percent: 90 } } });
		expect(store.getSnapshot()).toEqual({ messageId: "100", battery: 80, batteryBroadcast: 90 });
		expect(store.acceptRobotMessage({ id: 99, type: 38, hardware: { battery: { percent: 0 } } })).toBe(false);
		expect(store.acceptRobotMessage({ type: 79, hardware: { battery: { percent: "100" } } })).toBe(false);
		expect(store.acceptRobotMessage({ type: 79, battery: { percent: 100 } })).toBe(false);
		expect(store.getSnapshot()).toEqual({ messageId: "100", battery: 80, batteryBroadcast: 90 });
	});

	it("normalizes source JSON enums and preserves unknown numeric states independently of charge", () => {
		const store = new MowerStatusStore();
		store.acceptRobotMessage({ id: 1, type: 38, robot_task: { robot_detail_state: "MOW_ZIG_ZAG", working_state: "MOW_GLOBAL" }, fsm_charge_state: "CHARGING" });
		expect(store.getSnapshot()).toEqual({ messageId: "1", detailState: 55, workingState: 18, chargeState: 4 });
		store.acceptRobotMessage({ id: 2, type: 38, robot_task: { robot_detail_state: 999 }, fsm_charge_state: null });
		expect(store.getSnapshot()).toEqual({ messageId: "2", detailState: 999, workingState: 18, chargeState: 4 });
	});

	it("keeps error categories separate, preserves incomplete fields and accepts explicit clearing", () => {
		const store = new MowerStatusStore();
		store.acceptRobotMessage({ id: 1, type: 38, fsm_errors: { recoverable: [300], critical: ["SOME_ERROR"] }, charge_errors: { ignorable: [1] }, user_errors: [7, 8] });
		const before = store.getSnapshot();
		store.acceptRobotMessage({ id: 2, type: 38, fsm_errors: { recoverable: "invalid" }, user_errors: null });
		expect(store.getSnapshot()).toEqual({ ...before, messageId: "2" });
		store.acceptRobotMessage({ id: 3, type: 38, fsm_errors: {}, user_errors: [] });
		expect(store.getSnapshot()).toMatchObject({ fsmErrors: "{}", userErrors: "[]", chargeErrors: '{"ignorable":[1]}' });
	});
	it("uses hardware.battery.percent and rejects older or duplicate status updates", () => {
		const store = new MowerStatusStore();
		expect(store.acceptRobotMessage({ id: "1700000000123", type: "ROBOT_STATUS_UPDATE", hardware: { battery: { percent: 81 } } })).toBe(true);
		expect(store.acceptRobotMessage({ id: 1700000000122, type: 38, hardware: { battery: { percent: 10 } } })).toBe(false);
		expect(store.acceptRobotMessage({ id: 1700000000123, type: 38, hardware: { battery: { percent: 0 } } })).toBe(false);
		expect(store.getSnapshot()).toEqual({ messageId: "1700000000123", battery: 81 });
	});

	it("does not treat a transport ACK or HomeData vacuum fields as mower status", () => {
		const store = new MowerStatusStore();
		expect(store.acceptRobotMessage({ id: 1, result: "ok" })).toBe(false);
		expect(store.acceptRobotMessage({ "122": 75, "125": 90 })).toBe(false);
		expect(store.acceptRobotMessage({ id: 2, type: "ROBOT_STATUS_UPDATE", battery: 75 })).toBe(true);
		expect(store.getSnapshot()).toEqual({ messageId: "2" });
	});

	it.each([undefined, null, "80", -1, 101, 1.5, NaN])("preserves previous battery when a partial status has invalid battery %s", battery => {
		const store = new MowerStatusStore();
		store.acceptRobotMessage({ id: 1, type: 38, hardware: { battery: { percent: 80 } } });
		store.acceptRobotMessage({ id: 2, type: 38, hardware: { battery: { percent: battery } } });
		expect(store.getSnapshot()).toEqual({ messageId: "2", battery: 80 });
		store.acceptRobotMessage({ id: 3, type: 38, hardware: { battery: { percent: 0 } } });
		expect(store.getSnapshot()?.battery).toBe(0);
	});

	it("isolates devices and returns an immutable copy of the status", () => {
		const first = new MowerStatusStore();
		const second = new MowerStatusStore();
		first.acceptRobotMessage({ id: "9007199254740993", type: 38, hardware: { battery: { percent: 50 } } });
		first.acceptRobotMessage({ id: "9007199254740992", type: 38, hardware: { battery: { percent: 0 } } });
		second.acceptRobotMessage({ id: "1", type: 38, hardware: { battery: { percent: 20 } } });
		first.getSnapshot()!.battery = 0;
		expect(first.getSnapshot()?.battery).toBe(50);
		expect(second.getSnapshot()?.battery).toBe(20);
	});

	it.each([undefined, "bad", "-1", "0", "1.0", Number.MAX_SAFE_INTEGER + 1])("rejects invalid status ids %s", id => {
		const store = new MowerStatusStore();
		expect(store.acceptRobotMessage({ id, type: 38 })).toBe(false);
		expect(store.getSnapshot()).toBeUndefined();
	});
});
