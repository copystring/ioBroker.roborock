import { describe, expect, it } from "vitest";
import { buildMowerButton, buildMowerInfoRequest, isSourceSupportedMower } from "../../src/lib/mower/mowerContract";
import { MowerStatusStore } from "../../src/lib/mower/MowerStatusStore";

describe("original mower RemoteMsg JSON contract", () => {
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
