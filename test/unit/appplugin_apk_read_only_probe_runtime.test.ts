import { describe, expect, it, vi } from "vitest";

import type { ApkAppPluginModelRuntime } from "../../src/apppluginHost/apkAppPluginModelRuntime";
import type { ApkAppPluginModelRuntimeLease } from "../../src/apppluginHost/apkAppPluginSessionSupervisor";
import type { ApkDeviceIngress } from "../../src/apppluginHost/apkDeviceIngress";
import { ApkDeviceIngressRouter } from "../../src/apppluginHost/apkDeviceIngressRouter";
import {
	runApkReadOnlyProbeSession,
	type ApkReadOnlyProbeRequest,
	type ApkReadOnlyProbeSession,
} from "../../src/apppluginHost/apkReadOnlyProbeRuntime";

function request(overrides: Partial<ApkReadOnlyProbeRequest> = {}): ApkReadOnlyProbeRequest {
	return {
		deviceProperties: { featureSet: 1 },
		targetDuid: "device-1",
		timeoutMilliseconds: 100,
		root: {
			density: 1,
			fontScale: 1,
			height: 800,
			initialProps: { colorMode: "light", concurrentRoot: true },
			width: 1_200,
		},
		...overrides,
	};
}

function ingress(rpcAccepted = true): ApkDeviceIngress {
	return {
		acceptJsonDps: vi.fn(() => ({ eventEmitted: true, rpcAccepted })),
	} as unknown as ApkDeviceIngress;
}

function harness(options: {
	readonly cleanupFailure?: boolean;
	readonly emitAcceptedResponse?: boolean;
} = {}) {
	const order: string[] = [];
	const router = new ApkDeviceIngressRouter();
	const releaseIngress = router.register({ activeTime: 17, deviceId: "device-1", ingress: ingress() });
	const rootRelease = vi.fn(async () => {
		order.push("root-release");
		if (options.cleanupFailure) throw new Error("root cleanup failed");
	});
	const modelRelease = vi.fn(async () => { order.push("model-release"); });
	const openRoot = vi.fn(async () => {
		if (options.emitAcceptedResponse !== false) {
			router.acceptJsonDps("device-1", "1.0", "{\"102\":{\"id\":7,\"result\":{\"state\":8}}}");
		}
		return { release: rootRelease };
	});
	const modelLease = {
		activeTime: 17,
		deviceId: "device-1",
		model: "roborock.generic.model",
		runtime: { openRoot } as unknown as ApkAppPluginModelRuntime,
		release: modelRelease,
	} satisfies ApkAppPluginModelRuntimeLease<ApkAppPluginModelRuntime>;
	const session: ApkReadOnlyProbeSession = {
		openDevice: vi.fn(async () => modelLease),
		shutdown: vi.fn(async () => {
			order.push("session-shutdown");
			releaseIngress();
		}),
	};
	return { modelRelease, openRoot, order, rootRelease, router, session };
}

describe("APK read-only probe runtime", () => {
	it("returns only a response correlated by the active APK RPC generation", async () => {
		const fixture = harness();
		const result = await runApkReadOnlyProbeSession(
			fixture.session,
			fixture.router,
			request(),
		);

		expect(result).toMatchObject({
			activeTime: 17,
			deviceId: "device-1",
			model: "roborock.generic.model",
			protocolVersion: "1.0",
			parsedDps: { "102": { id: 7, result: { state: 8 } } },
		});
		expect(fixture.openRoot).toHaveBeenCalledWith(expect.objectContaining({
			initialProps: { colorMode: "light", concurrentRoot: true },
		}));
		expect(fixture.order).toEqual(["root-release", "model-release", "session-shutdown"]);
	});

	it("times out when no AppPlugin request receives a correlated response", async () => {
		const fixture = harness({ emitAcceptedResponse: false });

		await expect(runApkReadOnlyProbeSession(
			fixture.session,
			fixture.router,
			request({ timeoutMilliseconds: 10 }),
		)).rejects.toThrow(/keine korrelierte Antwort/u);
		expect(fixture.order).toEqual(["root-release", "model-release", "session-shutdown"]);
	});

	it("aborts and still closes every acquired resource in order", async () => {
		const fixture = harness({ emitAcceptedResponse: false });
		const controller = new AbortController();
		controller.abort(new Error("adapter unload"));

		await expect(runApkReadOnlyProbeSession(
			fixture.session,
			fixture.router,
			request({ signal: controller.signal }),
		)).rejects.toThrow(/adapter unload/u);
		expect(fixture.order).toEqual(["root-release", "model-release", "session-shutdown"]);
	});

	it("reports the original failure together with cleanup failures", async () => {
		const fixture = harness({ cleanupFailure: true, emitAcceptedResponse: false });

		await expect(runApkReadOnlyProbeSession(
			fixture.session,
			fixture.router,
			request({ timeoutMilliseconds: 10 }),
		)).rejects.toMatchObject({
			message: expect.stringMatching(/Cleanup/u),
			errors: expect.arrayContaining([
				expect.objectContaining({ message: expect.stringMatching(/keine korrelierte Antwort/u) }),
				expect.objectContaining({ message: "root cleanup failed" }),
			]),
		});
		expect(fixture.order).toEqual(["root-release", "model-release", "session-shutdown"]);
	});
});
