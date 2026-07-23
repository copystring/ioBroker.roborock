import { describe, expect, it, vi } from "vitest";

import type {
	ApkAppPluginModelRuntime,
	ApkAppPluginModelRuntimeLease,
	ApkAppPluginRootLease,
	ApkJsonDeviceIngressObservation,
	ApkJsonDeviceIngressObserver,
} from "../../src/apppluginHost";
import {
	IoBrokerReadOnlyAppPluginService,
	type IoBrokerReadOnlyAppPluginServiceRuntime,
} from "../../src/lib/appplugin/IoBrokerReadOnlyAppPluginService";

function rootOptions() {
	return {
		density: 1,
		fontScale: 1,
		height: 800,
		initialProps: { colorMode: "light" },
		width: 1_200,
	};
}

function ingress() {
	let observer: ApkJsonDeviceIngressObserver | undefined;
	const subscribeJson = vi.fn((value: ApkJsonDeviceIngressObserver) => {
		observer = value;
		return vi.fn(() => {
			observer = undefined;
		});
	});
	return {
		emit(value: Readonly<ApkJsonDeviceIngressObservation>) {
			observer?.(value);
		},
		subscribeJson,
	};
}

function statusObservation(
	deviceId: string,
	activeTime: number,
	serializedDps = JSON.stringify({ 102: '{"battery":100}' }),
): ApkJsonDeviceIngressObservation {
	return {
		activeTime,
		deviceId,
		protocolVersion: "B01",
		result: {
			blobAccepted: false,
			rpcAccepted: true,
			rpcId: 7,
			rpcMethod: "get_status",
			rpcParameters: [],
		},
		serializedDps,
	};
}

function harness(timeoutMilliseconds = 200) {
	const events: string[] = [];
	const roots = new Map<string, {
		openRoot: ReturnType<typeof vi.fn>;
		releaseModel: ReturnType<typeof vi.fn>;
		releaseRoot: ReturnType<typeof vi.fn>;
	}>();
	const openDevice = vi.fn(async request => {
		const activeTime = request.targetDuid === "device-1" ? 10 : 20;
		const releaseRoot = vi.fn(async () => {
			events.push(`root-release:${request.targetDuid}`);
		});
		const rootLease = {
			pointerInput: {},
			release: releaseRoot,
			rootTag: activeTime + 1,
			textInput: {},
			uiExecution: {},
			uiManager: {},
		} as unknown as ApkAppPluginRootLease;
		const openRoot = vi.fn(async () => rootLease);
		const releaseModel = vi.fn(async () => {
			events.push(`model-release:${request.targetDuid}`);
		});
		roots.set(request.targetDuid, { openRoot, releaseModel, releaseRoot });
		return {
			activeTime,
			deviceId: request.targetDuid,
			model: "roborock.vacuum.same",
			release: releaseModel,
			runtime: { openRoot } as unknown as ApkAppPluginModelRuntime,
		} satisfies ApkAppPluginModelRuntimeLease<ApkAppPluginModelRuntime>;
	});
	const invalidateModel = vi.fn(async model => {
		events.push(`invalidate:${model}`);
	});
	const shutdown = vi.fn(async () => {
		events.push("runtime-shutdown");
	});
	const runtime: IoBrokerReadOnlyAppPluginServiceRuntime = {
		invalidateModel,
		openDevice,
		shutdown,
		status: () => [],
	};
	const router = ingress();
	const service = new IoBrokerReadOnlyAppPluginService(runtime, router, {
		root: rootOptions(),
		timeoutMilliseconds,
	});
	return { events, invalidateModel, openDevice, roots, router, runtime, service, shutdown };
}

describe("ioBroker persistent read-only AppPlugin service", () => {
	it("keeps one correlated original-bundle root alive and reuses it", async () => {
		const { openDevice, roots, router, service } = harness();
		const started = service.start({
			deviceProperties: { featureSet: 1 },
			targetDuid: "device-1",
		});
		await vi.waitFor(() => expect(roots.get("device-1")?.openRoot).toHaveBeenCalledOnce());
		router.emit(statusObservation("device-1", 10));

		const first = await started;
		const reused = await service.start({
			deviceProperties: { featureSet: 1 },
			targetDuid: "device-1",
		});

		expect(reused).toBe(first);
		expect(openDevice).toHaveBeenCalledOnce();
		expect(service.status()).toMatchObject({
			active: {
				activeTime: 10,
				deviceId: "device-1",
				model: "roborock.vacuum.same",
				rootTag: 11,
			},
			enabled: true,
			state: "running",
		});
		await service.stop();
		expect(service.status()).toMatchObject({ enabled: false, state: "idle" });
		await service.shutdown();
	});

	it("replaces the active generation on an explicit restart", async () => {
		const { events, openDevice, roots, router, service } = harness();
		const firstStart = service.start({ deviceProperties: {}, targetDuid: "device-1" });
		await vi.waitFor(() => expect(roots.get("device-1")?.openRoot).toHaveBeenCalledOnce());
		router.emit(statusObservation("device-1", 10));
		await firstStart;

		const restarted = service.start({
			deviceProperties: {},
			restart: true,
			targetDuid: "device-1",
		});
		await vi.waitFor(() => {
			expect(openDevice).toHaveBeenCalledTimes(2);
			expect(roots.get("device-1")?.openRoot).toHaveBeenCalledOnce();
		});
		router.emit(statusObservation("device-1", 10));
		await restarted;

		expect(events.slice(0, 3)).toEqual([
			"root-release:device-1",
			"model-release:device-1",
			"invalidate:roborock.vacuum.same",
		]);
		expect(service.status()).toMatchObject({ enabled: true, state: "running" });
		await service.shutdown();
	});

	it("releases and invalidates a same-model runtime before switching devices", async () => {
		const { events, roots, router, service } = harness();
		const firstStart = service.start({ deviceProperties: {}, targetDuid: "device-1" });
		await vi.waitFor(() => expect(roots.get("device-1")?.openRoot).toHaveBeenCalledOnce());
		router.emit(statusObservation("device-1", 10));
		await firstStart;

		const secondStart = service.start({ deviceProperties: {}, targetDuid: "device-2" });
		await vi.waitFor(() => expect(roots.get("device-2")?.openRoot).toHaveBeenCalledOnce());
		router.emit(statusObservation("device-2", 20));
		await secondStart;

		expect(events.slice(0, 3)).toEqual([
			"root-release:device-1",
			"model-release:device-1",
			"invalidate:roborock.vacuum.same",
		]);
		expect(service.status().active?.deviceId).toBe("device-2");
		await service.shutdown();
	});

	it("aborts a pending start and tears all resources down on adapter shutdown", async () => {
		const { events, roots, service, shutdown } = harness();
		const started = service.start({ deviceProperties: {}, targetDuid: "device-1" });
		await vi.waitFor(() => expect(roots.get("device-1")?.openRoot).toHaveBeenCalledOnce());

		const stopped = service.shutdown();
		await expect(started).rejects.toThrow(/Adapter wird beendet/u);
		await stopped;

		expect(events).toEqual([
			"root-release:device-1",
			"model-release:device-1",
			"invalidate:roborock.vacuum.same",
			"runtime-shutdown",
		]);
		expect(shutdown).toHaveBeenCalledOnce();
		expect(service.status()).toMatchObject({ enabled: false, state: "stopped" });
	});

	it("fails closed on timeout and leaves no model lease behind", async () => {
		const { events, roots, service } = harness(20);
		const started = service.start({ deviceProperties: {}, targetDuid: "device-1" });
		await vi.waitFor(() => expect(roots.get("device-1")?.openRoot).toHaveBeenCalledOnce());

		await expect(started).rejects.toThrow(/keine korrelierte Antwort/u);

		expect(events).toEqual([
			"root-release:device-1",
			"model-release:device-1",
			"invalidate:roborock.vacuum.same",
		]);
		expect(service.status()).toMatchObject({ enabled: false, state: "failed" });
		await service.shutdown();
	});
});
