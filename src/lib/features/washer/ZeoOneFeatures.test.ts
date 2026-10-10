import { describe, expect, it, vi } from "vitest";
import "../../deviceManager";
import { BaseDeviceFeatures } from "../baseDeviceFeatures";
import { ZeoOneFeatures } from "./ZeoOneFeatures";

describe("Zeo One status query", () => {
	const makeFeatures = () => {
		const sendRequest = vi.fn().mockResolvedValue(null);
		const adapter = { requestsHandler: { sendRequest } };
		const features = new ZeoOneFeatures({ adapter } as any, "device");
		features.protocolVersion = "A01";
		return { features, sendRequest };
	};

	it("registers only the a102 model and initializes with QueryDP", async () => {
		expect(BaseDeviceFeatures.getRegisteredModelClass("roborock.wm.a102")).toBe(ZeoOneFeatures);
		const { features, sendRequest } = makeFeatures();
		await features.initializeDeviceData();
		expect(sendRequest).toHaveBeenCalledTimes(1);
		const [duid, method, params] = sendRequest.mock.calls[0];
		expect(duid).toBe("device");
		expect(method).toBe("10000");
		expect(JSON.parse(params)).toEqual([
			200, 201, 203, 202, 204, 205, 206, 207, 208, 209, 210, 211,
			217, 213, 218, 219, 220, 221, 222, 223, 224, 225, 226, 212, 214, 227, 10005,
		]);
	});

	it("uses QueryDP for later status polls and propagates an offline error", async () => {
		const { features, sendRequest } = makeFeatures();
		sendRequest.mockRejectedValue(new Error("MQTT connection not available for publish."));
		await expect(features.updateStatus()).rejects.toThrow("MQTT connection not available");
		expect(sendRequest).toHaveBeenCalledTimes(1);
		expect(sendRequest.mock.calls[0][1]).toBe("10000");
	});

	it("does not send a Zeo One query over another protocol", async () => {
		const { features, sendRequest } = makeFeatures();
		features.protocolVersion = "1.0";
		await expect(features.updateStatus()).rejects.toThrow("requires A01");
		expect(sendRequest).not.toHaveBeenCalled();
	});
});

describe("Zeo One original AppPlugin settings", () => {
	const makeFeatures = () => {
		const publishA01Dp = vi.fn().mockResolvedValue(undefined);
		const adapter = {
			requestsHandler: { publishA01Dp },
			setTimeout: (callback: () => void, ms: number) => setTimeout(callback, ms),
			clearTimeout: (timer: ReturnType<typeof setTimeout>) => clearTimeout(timer),
			setStateChanged: vi.fn().mockResolvedValue(undefined),
			rLog: vi.fn(),
		};
		const features = new ZeoOneFeatures({ adapter } as any, "device");
		features.protocolVersion = "A01";
		return { features, adapter, publishA01Dp };
	};

	it.each([["sound", "223"], ["child_lock", "206"], ["cache_washing_preference", "225"]])(
		"sends numeric off for %s and waits for a device echo", async (name, dp) => {
			const { features, adapter, publishA01Dp } = makeFeatures();
			await features.onDeviceStatus({ [dp]: 1 });
			adapter.setStateChanged.mockClear();
			let completed = false;
			const write = features.executeDeviceCommand(name, 0).then(() => {
				completed = true;
			});
			await Promise.resolve();
			expect(publishA01Dp).toHaveBeenCalledWith("device", { [dp]: 0 });
			expect(completed).toBe(false);
			expect(adapter.setStateChanged).not.toHaveBeenCalled();
			await features.onDeviceStatus({ "209": 6 });
			expect(completed).toBe(false);
			await features.onDeviceStatus({ [dp]: 0 });
			await write;
			expect(adapter.setStateChanged).toHaveBeenCalledWith(`Devices.device.commands.${name}`, { val: 0, ack: true });
		});

	it.each([["detergent_level", "211", "213"], ["softener_level", "212", "214"]])(
		"sends %s as one coupled DP batch and confirms both DPs", async (name, autoDp, typeDp) => {
			const { features, adapter, publishA01Dp } = makeFeatures();
			await features.onDeviceStatus({ "203": 1, "201": 0, "202": 0, [autoDp]: 1, [typeDp]: 3 });
			adapter.setStateChanged.mockClear();
			let completed = false;
			const write = features.executeDeviceCommand(name, 3).then(() => {
				completed = true;
			});
			expect(publishA01Dp).toHaveBeenCalledWith("device", { [autoDp]: 1, [typeDp]: 3 });
			await features.onDeviceStatus({ [autoDp]: 1 });
			expect(completed).toBe(false);
			expect(adapter.setStateChanged).not.toHaveBeenCalled();
			await features.onDeviceStatus({ [typeDp]: 3 });
			await write;
			const off = features.executeDeviceCommand(name, 0);
			expect(publishA01Dp).toHaveBeenLastCalledWith("device", { [autoDp]: 0, [typeDp]: 0 });
			await features.onDeviceStatus({ [autoDp]: 0, [typeDp]: 0 });
			await off;
		});

	it("does not write dosage while washing, paused, updating or before status arrives", async () => {
		const { features, publishA01Dp } = makeFeatures();
		await expect(features.executeDeviceCommand("detergent_level", 1)).rejects.toThrow("not been received");
		for (const status of [{ "203": 4, "201": 0, "202": 0 }, { "203": 1, "201": 1 }, { "203": 11, "202": 1 }]) {
			await features.onDeviceStatus(status);
			await expect(features.executeDeviceCommand("detergent_level", 1)).rejects.toThrow();
		}
		expect(publishA01Dp).not.toHaveBeenCalled();
	});

	it("rejects bad values and another protocol before publishing", async () => {
		const { features, publishA01Dp } = makeFeatures();
		for (const value of [true, "1", -1, 2, 0.5]) await expect(features.executeDeviceCommand("sound", value)).rejects.toThrow("integer");
		features.protocolVersion = "1.0";
		await expect(features.executeDeviceCommand("sound", 1)).rejects.toThrow("A01");
		expect(publishA01Dp).not.toHaveBeenCalled();
		await expect(features.executeDeviceCommand("vacuum_command", 1)).resolves.toBe(false);
	});

	it("restores reported state on broker errors and permits a retry", async () => {
		const { features, adapter, publishA01Dp } = makeFeatures();
		await features.onDeviceStatus({ "223": 1 });
		publishA01Dp.mockRejectedValueOnce(new Error("offline"));
		await expect(features.executeDeviceCommand("sound", 0)).rejects.toThrow("offline");
		expect(adapter.setStateChanged).toHaveBeenLastCalledWith("Devices.device.commands.sound", { val: 1, ack: true });
		const retry = features.executeDeviceCommand("sound", 0);
		await expect(features.executeDeviceCommand("sound", 1)).rejects.toThrow("awaiting");
		await features.onDeviceStatus({ "223": 0 });
		await retry;
	});

	it("rejects conflicting device values and a missing device echo", async () => {
		vi.useFakeTimers();
		try {
			const { features } = makeFeatures();
			const conflict = features.executeDeviceCommand("sound", 0);
			const rejected = expect(conflict).rejects.toThrow("instead of 0");
			await features.onDeviceStatus({ "223": 1 });
			await rejected;
			const timeout = expect(features.executeDeviceCommand("sound", 0)).rejects.toThrow("10 seconds");
			await vi.advanceTimersByTimeAsync(10000);
			await timeout;
			expect(vi.getTimerCount()).toBe(0);
		} finally {
			vi.useRealTimers();
		}
	});
	it("cannot confirm a new command using an earlier status packet delayed by a state write", async () => {
		const { features, adapter } = makeFeatures();
		let release: () => void = () => undefined;
		adapter.setStateChanged.mockImplementationOnce(() => new Promise<void>((resolve) => {
			release = resolve;
		}));
		const oldStatus = features.onDeviceStatus({ "223": 0 });
		let completed = false;
		const write = features.executeDeviceCommand("sound", 0).then(() => {
			completed = true;
		});
		release();
		await oldStatus;
		await Promise.resolve();
		expect(completed).toBe(false);
		await features.onDeviceStatus({ "223": 0 });
		await write;
	});
	it("rejects a malformed packed program even when its masked configuration bits match", async () => {
		const { features, adapter } = makeFeatures();
		await features.onDeviceStatus({ "203": 1 });
		const write = expect(features.executeDeviceCommand("save_program", { mode: 1, program: 1 })).rejects.toThrow("device reported");
		const packed = 1 | (1 << 8) | (2 << 10) | (2 << 13) | (5 << 16);
		await features.onDeviceStatus({ "222": packed - 0x10000000 });
		await write;
		expect(adapter.setStateChanged).not.toHaveBeenCalledWith("Devices.device.commands.save_program", expect.anything());
	});

	it("rejects saving a program outside standby before publishing", async () => {
		const { features, publishA01Dp } = makeFeatures();
		for (const status of [undefined, 4, 10, 11]) {
			if (status !== undefined) await features.onDeviceStatus({ "203": status });
			await expect(features.executeDeviceCommand("save_program", { mode: 1, program: 1 })).rejects.toThrow("standby");
		}
		expect(publishA01Dp).not.toHaveBeenCalled();
	});

	it("expires and releases an outstanding write even when the broker callback stalls", async () => {
		vi.useFakeTimers();
		try {
			const { features, publishA01Dp } = makeFeatures();
			publishA01Dp.mockImplementationOnce(() => new Promise(() => undefined));
			const timedOut = expect(features.executeDeviceCommand("sound", 0)).rejects.toThrow("10 seconds");
			await vi.advanceTimersByTimeAsync(10000);
			await timedOut;
			const retry = features.executeDeviceCommand("sound", 0);
			await features.onDeviceStatus({ "223": 0 });
			await retry;
		} finally {
			vi.useRealTimers();
		}
	});
});
