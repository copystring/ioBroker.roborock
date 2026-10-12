import { describe, expect, it, vi } from "vitest";
import {
	buildMowerCuttingHeightRequest,
	buildMowerHeightParametersRequest,
	buildMowerHeightPreferenceRequest,
	readMowerHeightParameters,
	readMowerHeightPreference,
	sendMowerCuttingHeight,
	validateMowerCuttingHeight,
} from "../../src/lib/mower/mowerCuttingHeight";

describe("source-derived mower cutting height", () => {
	it("keeps cloud readbacks and BLE-only setter as distinct requests", () => {
		expect(buildMowerHeightParametersRequest(101)).toEqual({ id: "101", type: "GET_HEIGHT_MOTOR_PARAMETER" });
		expect(buildMowerHeightPreferenceRequest(102)).toEqual({ id: "102", type: "GET_MOW_PREFERENCE_CONFIG" });
		expect(buildMowerCuttingHeightRequest(40, { min: 20, max: 60, step: 10 }, 103)).toEqual({
			id: "103", type: "REMOTE_CMD", remote_cmd: { type: "MAIN_CUTTER_HEIGHT", main_cutter_height: 40 },
		});
	});

	it("accepts only device-provided range and step, including zero minimum", () => {
		const bounds = { min: 0, max: 60, step: 5 };
		expect(validateMowerCuttingHeight(0, bounds)).toBe(0);
		expect(validateMowerCuttingHeight(60, bounds)).toBe(60);
		for (const value of [-5, 1, 61, 15.5, "15"]) expect(() => validateMowerCuttingHeight(value, bounds)).toThrow();
		expect(() => validateMowerCuttingHeight(30, { min: 0, max: 60, step: 0 })).toThrow();
	});

	it("reads height bounds only from a typed RobotMsg and applies present-container proto3 defaults", () => {
		expect(readMowerHeightParameters({ type: 30 })).toBeUndefined();
		expect(readMowerHeightParameters({ type: 25, height_motor_parameter: { min: 20, max: 60, step: 5 } })).toBeUndefined();
		expect(readMowerHeightParameters({ type: "HEIGHT_MOTOR_PARAMETER", height_motor_parameter: { max: 60, step: 5 } })).toEqual({ min: 0, max: 60, step: 5 });
		expect(readMowerHeightParameters({ type: 30, height_motor_parameter: {} })).toBeUndefined();
	});

	it("reads global and area targets from typed preference response without fabricating an absent container", () => {
		expect(readMowerHeightPreference({ type: 24 })).toBeUndefined();
		expect(readMowerHeightPreference({ type: 30, preference_config: { global: { height: 40 } } })).toBeUndefined();
		expect(readMowerHeightPreference({ type: 24, preference_config: { global: { height: 40 }, custom: [{ area_id: 7, height: 45 }] } })).toEqual({ global: 40, custom: [{ areaId: 7, height: 45 }] });
		expect(readMowerHeightPreference({ type: 24, preference_config: { custom: [] } })).toEqual({ custom: [] });
		expect(readMowerHeightPreference({ type: 24, preference_config: { global: {} } })).toEqual({ global: 0, custom: [] });
		expect(readMowerHeightPreference({ type: 24, preference_config: { custom: [{}] } })).toEqual({ custom: [{ areaId: 0, height: 0 }] });
		expect(readMowerHeightPreference({ type: 24, preference_config: { custom: [{}, { area_id: 0 }] } })).toBeUndefined();
	});

	it("does not invoke cloud or BLE without a connected provider, and honors session abort", async () => {
		const signal = new AbortController();
		const callMethod = vi.fn().mockResolvedValue({});
		const provider = { isConnected: vi.fn().mockReturnValue(false), callMethod };
		await expect(sendMowerCuttingHeight("device", 40, { min: 20, max: 60, step: 10 }, 100, undefined, signal.signal)).rejects.toThrow("BLE connection unavailable");
		await expect(sendMowerCuttingHeight("device", 40, { min: 20, max: 60, step: 10 }, 100, provider, signal.signal)).rejects.toThrow("BLE connection unavailable");
		expect(callMethod).not.toHaveBeenCalled();
		provider.isConnected.mockReturnValue(true);
		await sendMowerCuttingHeight("device", 40, { min: 20, max: 60, step: 10 }, 100, provider, signal.signal);
		expect(callMethod).toHaveBeenCalledWith("device", { id: "100", type: "REMOTE_CMD", remote_cmd: { type: "MAIN_CUTTER_HEIGHT", main_cutter_height: 40 } }, signal.signal);
		signal.abort();
		await expect(sendMowerCuttingHeight("device", 40, { min: 20, max: 60, step: 10 }, 101, provider, signal.signal)).rejects.toThrow("session stopped");
		expect(callMethod).toHaveBeenCalledTimes(1);
	});
});
