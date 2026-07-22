import { describe, expect, it, vi } from "vitest";

import type { ApkDeviceIngress } from "../../src/apppluginHost/apkDeviceIngress";
import { ApkDeviceIngressRouter } from "../../src/apppluginHost/apkDeviceIngressRouter";

function ingress() {
	return {
		acceptBlobSegment: vi.fn(segment => ({ kind: "segment", segment })),
		acceptJsonDps: vi.fn(() => ({ eventEmitted: true, rpcAccepted: true })),
		acceptProtobufDps: vi.fn(() => ({ eventEmitted: true, rpcAccepted: false })),
	} as unknown as ApkDeviceIngress;
}

describe("APK device ingress router", () => {
	it("routes each wire payload only to the active generation for its device", () => {
		const router = new ApkDeviceIngressRouter();
		const deviceIngress = ingress();
		const release = router.register({
			activeTime: 17,
			deviceId: "device-1",
			ingress: deviceIngress,
		});

		expect(router.acceptJsonDps("other-device", "1.0", "{}")).toBeUndefined();
		expect(router.acceptJsonEnvelope("device-1", "1.0", {
			dps: { "102": "{\"id\":1}" },
		})).toEqual({ eventEmitted: true, rpcAccepted: true });
		expect(vi.mocked(deviceIngress.acceptJsonDps)).toHaveBeenCalledWith(
			"device-1",
			"1.0",
			JSON.stringify({ "102": "{\"id\":1}" }),
		);
		expect(router.acceptJsonDps("device-1", "1.0", "{\"102\":{\"id\":1}}")).toEqual({
			eventEmitted: true,
			rpcAccepted: true,
		});
		expect(router.acceptProtobufDps("device-1", "1.0", Buffer.from("pb"))).toEqual({
			eventEmitted: true,
			rpcAccepted: false,
		});
		expect(router.acceptBlobSegment({
			data: Buffer.from("blob"),
			duid: "device-1",
			isFirst: true,
			isLast: true,
			nonce: 1,
			pv: "B01",
			sequenceId: 1,
		})).toMatchObject({ kind: "segment" });

		release();
		release();
		expect(router.activeDeviceCount).toBe(0);
		expect(router.acceptJsonDps("device-1", "1.0", "{}")).toBeUndefined();
	});

	it("rejects two simultaneous bundle generations for one wire identity", () => {
		const router = new ApkDeviceIngressRouter();
		const release = router.register({ activeTime: 1, deviceId: "device-1", ingress: ingress() });

		expect(() => router.register({
			activeTime: 2,
			deviceId: "device-1",
			ingress: ingress(),
		})).toThrow(/bereits ein AppPlugin-Ingress aktiv/u);

		release();
		expect(() => router.register({
			activeTime: 2,
			deviceId: "device-1",
			ingress: ingress(),
		})).not.toThrow();
	});

	it("observes only traffic accepted by an active generation without affecting routing", () => {
		const router = new ApkDeviceIngressRouter();
		const observations: unknown[] = [];
		const unsubscribe = router.subscribeJson(observation => observations.push(observation));
		const throwingObserver = router.subscribeJson(() => { throw new Error("diagnostic failed"); });
		const release = router.register({ activeTime: 9, deviceId: "device-1", ingress: ingress() });

		expect(router.acceptJsonDps("other-device", "1.0", "{}"))
			.toBeUndefined();
		expect(router.acceptJsonDps("device-1", "1.0", "{\"102\":{\"id\":7}}"))
			.toEqual({ eventEmitted: true, rpcAccepted: true });
		expect(observations).toEqual([{
			activeTime: 9,
			deviceId: "device-1",
			protocolVersion: "1.0",
			result: { eventEmitted: true, rpcAccepted: true },
			serializedDps: "{\"102\":{\"id\":7}}",
		}]);

		unsubscribe();
		throwingObserver();
		router.acceptJsonDps("device-1", "1.0", "{}");
		expect(observations).toHaveLength(1);
		release();
	});
});
