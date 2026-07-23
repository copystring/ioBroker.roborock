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

function ingress(
	rpcAccepted = true,
	rpcMethods: readonly string[] = [],
	rpcParameters: readonly (Readonly<Record<string, unknown>> | readonly unknown[])[] = [],
): ApkDeviceIngress {
	let responseIndex = 0;
	return {
		acceptJsonDps: vi.fn(() => {
			const rpcMethod = rpcMethods[responseIndex];
			const parameters = rpcParameters[responseIndex];
			responseIndex += 1;
			return {
				eventEmitted: true,
				rpcAccepted,
				...(rpcMethod ? { rpcMethod } : {}),
				...(parameters ? { rpcParameters: parameters } : {}),
			};
		}),
	} as unknown as ApkDeviceIngress;
}

function harness(options: {
	readonly cleanupFailure?: boolean;
	readonly emitAcceptedResponse?: boolean;
	readonly rpcMethods?: readonly string[];
	readonly rpcParameters?: readonly (
		Readonly<Record<string, unknown>> | readonly unknown[]
	)[];
} = {}) {
	const order: string[] = [];
	const router = new ApkDeviceIngressRouter();
	const releaseIngress = router.register({
		activeTime: 17,
		deviceId: "device-1",
		ingress: ingress(true, options.rpcMethods, options.rpcParameters),
	});
	const rootRelease = vi.fn(async () => {
		order.push("root-release");
		if (options.cleanupFailure) throw new Error("root cleanup failed");
	});
	const modelRelease = vi.fn(async () => { order.push("model-release"); });
	const openRoot = vi.fn(async () => {
		if (options.emitAcceptedResponse !== false) {
			for (const [index] of (options.rpcMethods?.length
				? options.rpcMethods
				: [undefined]).entries()) {
				router.acceptJsonDps(
					"device-1",
					"1.0",
					JSON.stringify({ "102": { id: 7 + index, result: { state: 8 } } }),
				);
			}
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

	it("waits through bootstrap reads for the requested AppPlugin status method", async () => {
		const fixture = harness({
			rpcMethods: ["app_get_init_status", "app_get_status"],
		});
		const result = await runApkReadOnlyProbeSession(
			fixture.session,
			fixture.router,
			request({ expectedRpcMethods: ["app_get_status", "get_status"] }),
		);

		expect(result).toMatchObject({
			parsedDps: { "102": { id: 8, result: { state: 8 } } },
			rpcMethod: "app_get_status",
		});
	});

	it("selects get_prop only when the AppPlugin requested get_status", async () => {
		const fixture = harness({
			rpcMethods: ["get_prop", "get_prop"],
			rpcParameters: [["get_dnd_timer"], ["get_status", "get_consumable"]],
		});
		const result = await runApkReadOnlyProbeSession(
			fixture.session,
			fixture.router,
			request({
				acceptRpcResponse: response =>
					response.rpcMethod === "get_prop"
					&& Array.isArray(response.rpcParameters)
					&& response.rpcParameters.includes("get_status"),
			}),
		);

		expect(result).toMatchObject({
			parsedDps: { "102": { id: 8, result: { state: 8 } } },
			rpcMethod: "get_prop",
			rpcParameters: ["get_status", "get_consumable"],
		});
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
