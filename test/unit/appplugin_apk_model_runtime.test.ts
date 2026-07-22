import { describe, expect, it, vi } from "vitest";

import contractJson from "../../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import {
	APK_APPPLUGIN_APP_REGISTRY_KEY,
	ApkAppPluginModelRuntime,
	ApkAppPluginSessionSupervisor,
	createApkAppPluginModelRuntimeFactory,
	type ApkAndroidTextLayoutBackend,
	type ApkAppPluginApplicationSession,
	type ApkAppPluginHostContract,
	type ApkUiManagerRuntime,
} from "../../src/apppluginHost";

const contract = contractJson as ApkAppPluginHostContract;
const textLayoutBackend: ApkAndroidTextLayoutBackend = {
	intrinsicWidth: () => { throw new Error("Kein Text erwartet"); },
	layout: () => { throw new Error("Kein Text erwartet"); },
};
const rootOptions = Object.freeze({
	initialProps: Object.freeze({ colorMode: "light" }),
	width: 360,
	height: 800,
	density: 3,
	fontScale: 1,
});

function fakeSession(
	uiManager: ApkUiManagerRuntime,
	options: Readonly<{ failFirstMount?: boolean; removeRootDuringUnmount?: boolean }> = {},
): ApkAppPluginApplicationSession & {
	readonly calls: string[];
	readonly runApplication: ReturnType<typeof vi.fn>;
	readonly unmountApplication: ReturnType<typeof vi.fn>;
	readonly stop: ReturnType<typeof vi.fn>;
} {
	let state = "idle";
	let failFirstMount = options.failFirstMount === true;
	const calls: string[] = [];
	const runApplication = vi.fn(async (_appKey: string, parameters: Readonly<Record<string, unknown>>) => {
		calls.push(`mount:${String(parameters.rootTag)}`);
		if (failFirstMount) {
			failFirstMount = false;
			throw new Error("mount failed");
		}
		const rootTag = parameters.rootTag as number;
		uiManager.createView(rootTag + 1, "RCTView", rootTag, {
			width: rootTag === 1 ? 100 : 80,
			height: 40,
			collapsable: false,
		});
		uiManager.setChildren(rootTag, [rootTag + 1]);
	});
	const unmountApplication = vi.fn(async (rootTag: number) => {
		calls.push(`unmount:${rootTag}`);
		if (options.removeRootDuringUnmount) uiManager.removeRootView(rootTag);
	});
	const stop = vi.fn(async () => {
		calls.push("stop");
		state = "stopped";
	});
	return {
		get state() { return state; },
		calls,
		start: vi.fn(async () => { state = "running"; }),
		stop,
		runApplication,
		unmountApplication,
		waitForRuntimeBoundaryIdle: vi.fn(async () => 1),
		callJsFunction: vi.fn(async () => undefined),
	};
}

describe("APK AppPlugin model runtime", () => {
	it("couples APK root allocation, AppRegistry mount and isolated UI execution", async () => {
		let session!: ReturnType<typeof fakeSession>;
		const runtime = new ApkAppPluginModelRuntime({
			contract,
			textLayoutBackend,
			createSession: uiManager => session = fakeSession(uiManager),
		});
		await runtime.start();

		const first = await runtime.openRoot(rootOptions);
		const second = await runtime.openRoot({
			...rootOptions,
			initialProps: { colorMode: "dark" },
		});

		expect([first.rootTag, second.rootTag]).toEqual([1, 11]);
		expect(session.runApplication.mock.calls).toEqual([
			[APK_APPPLUGIN_APP_REGISTRY_KEY, { rootTag: 1, initialProps: { colorMode: "light" } }],
			[APK_APPPLUGIN_APP_REGISTRY_KEY, { rootTag: 11, initialProps: { colorMode: "dark" } }],
		]);
		expect((await first.uiExecution.stabilize()).nativeHierarchy.root.tag).toBe(1);
		expect((await second.uiExecution.stabilize()).nativeHierarchy.root.tag).toBe(11);

		await first.release();
		await first.release();
		expect(session.unmountApplication).toHaveBeenCalledTimes(1);
		expect(runtime.uiManager.hasRootView(1)).toBe(false);
		expect(runtime.uiManager.hasRootView(11)).toBe(true);

		await runtime.stop();
		expect(session.calls).toEqual(["mount:1", "mount:11", "unmount:1", "unmount:11", "stop"]);
		expect(runtime.state).toBe("stopped");
	});

	it("accepts the bundle-driven UIManager removal before the unmount acknowledgement", async () => {
		const runtime = new ApkAppPluginModelRuntime({
			contract,
			textLayoutBackend,
			createSession: uiManager => fakeSession(uiManager, { removeRootDuringUnmount: true }),
		});
		await runtime.start();
		const root = await runtime.openRoot(rootOptions);

		await root.release();

		expect(runtime.uiManager.hasRootView(root.rootTag)).toBe(false);
		await runtime.stop();
	});

	it("rolls back a failed mount without poisoning the shared model runtime", async () => {
		const runtime = new ApkAppPluginModelRuntime({
			contract,
			textLayoutBackend,
			createSession: uiManager => fakeSession(uiManager, { failFirstMount: true }),
		});
		await runtime.start();

		await expect(runtime.openRoot(rootOptions)).rejects.toThrow("mount failed");
		expect(runtime.uiManager.hasRootView(1)).toBe(false);
		expect(runtime.state).toBe("running");

		const recovered = await runtime.openRoot(rootOptions);
		expect(recovered.rootTag).toBe(11);
		await recovered.release();
		await runtime.stop();
	});

	it("exposes the concrete runtime type through the model supervisor factory", async () => {
		const disposedModels: string[] = [];
		const factory = createApkAppPluginModelRuntimeFactory(async request => ({
			contract,
			textLayoutBackend,
			createSession: uiManager => fakeSession(uiManager),
			dispose: () => { disposedModels.push(request.model); },
		}));
		const supervisor = new ApkAppPluginSessionSupervisor(factory);
		const model = await supervisor.open({
			activeTime: 42,
			context: { targetDuid: "generic-1" },
			deviceId: "generic-1",
			model: "roborock.vacuum.generic",
		});
		const root = await model.runtime.openRoot(rootOptions);

		expect(root.rootTag).toBe(1);
		await root.release();
		await model.release();
		await supervisor.shutdown();

		expect(disposedModels).toEqual(["roborock.vacuum.generic"]);
	});

	it("stops roots before process resources and rejects future roots", async () => {
		let session!: ReturnType<typeof fakeSession>;
		const dispose = vi.fn(() => { session.calls.push("dispose"); });
		const runtime = new ApkAppPluginModelRuntime({
			contract,
			textLayoutBackend,
			createSession: uiManager => session = fakeSession(uiManager),
			dispose,
		});
		await runtime.start();
		await runtime.openRoot(rootOptions);

		await runtime.stop();
		await runtime.stop();

		expect(session.calls).toEqual(["mount:1", "unmount:1", "stop", "dispose"]);
		expect(dispose).toHaveBeenCalledOnce();
		await expect(runtime.openRoot(rootOptions)).rejects.toThrow(/bereits beendet/u);
	});
});
