import { describe, expect, it, vi } from "vitest";
import "../../deviceManager";
import { BaseDeviceFeatures } from "../baseDeviceFeatures";
import { ZeoOneFeatures } from "./ZeoOneFeatures";

describe("Zeo One read-only status query", () => {
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
			217, 213, 218, 219, 220, 221, 222, 223, 224, 226,
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
