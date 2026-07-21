import { describe, expect, it, vi } from "vitest";

import contractJson from "../../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import {
	ApkUiExecutionRuntime,
	ApkUiManagerRuntime,
	type ApkAndroidTextLayoutBackend,
	type ApkAppPluginHostContract,
} from "../../src/apppluginHost";

const contract = contractJson as ApkAppPluginHostContract;

describe("APK UI execution runtime", () => {
	it("executes concurrent React roots without consuming another root's UI work", async () => {
		const uiManager = new ApkUiManagerRuntime(contract);
		const firstRootTag = uiManager.addRootView();
		const secondRootTag = uiManager.addRootView();
		uiManager.createView(2, "RCTView", firstRootTag, { width: 100, height: 50, collapsable: false });
		uiManager.createView(12, "RCTView", secondRootTag, { width: 80, height: 40, collapsable: false });
		uiManager.setChildren(firstRootTag, [2]);
		uiManager.setChildren(secondRootTag, [12]);
		const firstMeasurement = vi.fn();
		const secondMeasurement = vi.fn();
		uiManager.measure(2, firstMeasurement);
		uiManager.measure(12, secondMeasurement);
		const backend: ApkAndroidTextLayoutBackend = {
			intrinsicWidth: () => { throw new Error("Kein Text erwartet"); },
			layout: () => { throw new Error("Kein Text erwartet"); },
		};
		const firstRuntime = new ApkUiExecutionRuntime({
			uiManager: uiManager.root(firstRootTag),
			jsModuleCaller: { callJsFunction: vi.fn(async () => undefined) },
			textLayoutBackend: backend,
			width: 360,
			height: 800,
			density: 3,
			fontScale: 1,
		});
		const secondRuntime = new ApkUiExecutionRuntime({
			uiManager: uiManager.root(secondRootTag),
			jsModuleCaller: { callJsFunction: vi.fn(async () => undefined) },
			textLayoutBackend: backend,
			width: 420,
			height: 900,
			density: 3,
			fontScale: 1,
		});

		const first = await firstRuntime.stabilize();
		expect(first.nativeHierarchy.root.tag).toBe(firstRootTag);
		expect(first.nativeHierarchy.layouts.map(layout => layout.tag)).toEqual([2, firstRootTag]);
		expect(firstMeasurement).toHaveBeenCalledTimes(1);
		expect(secondMeasurement).not.toHaveBeenCalled();
		expect(uiManager.root(secondRootTag).pendingNativeMeasurementCount()).toBe(1);

		const second = await secondRuntime.stabilize();
		expect(second.nativeHierarchy.root.tag).toBe(secondRootTag);
		expect(second.nativeHierarchy.layouts.map(layout => layout.tag)).toEqual([12, secondRootTag]);
		expect(secondMeasurement).toHaveBeenCalledTimes(1);
	});

	it("repeats physical Yoga and topLayout until React stops mutating the shadow tree", async () => {
		const uiManager = new ApkUiManagerRuntime(contract, 1);
		uiManager.createView(2, "RCTView", 1, { width: 100, height: 50, onLayout: true });
		uiManager.setChildren(1, [2]);
		let changed = false;
		const callJsFunction = vi.fn(async (_module: string, _method: string, arguments_: readonly unknown[]) => {
			const payload = arguments_[2] as { target?: number } | undefined;
			if (!changed && payload?.target === 2) {
				changed = true;
				uiManager.updateView(2, "RCTView", { height: 60 });
			}
		});
		const backend: ApkAndroidTextLayoutBackend = {
			intrinsicWidth: () => { throw new Error("Kein Text erwartet"); },
			layout: () => { throw new Error("Kein Text erwartet"); },
		};
		const afterLayoutEvents = vi.fn(async () => undefined);
		const runtime = new ApkUiExecutionRuntime({
			uiManager,
			jsModuleCaller: { callJsFunction },
			textLayoutBackend: backend,
			width: 360,
			height: 800,
			density: 3,
			fontScale: 1,
			afterLayoutEvents,
		});

		const result = await runtime.stabilize();

		expect(result.stable).toBe(true);
		expect(result.rounds).toHaveLength(3);
		expect(result.rounds.map(round => round.layoutEvents.length)).toEqual([1, 1, 0]);
		expect(result.layouts.find(layout => layout.tag === 2)?.box.height).toBe(60);
		expect(callJsFunction).toHaveBeenCalledTimes(2);
		expect(afterLayoutEvents).toHaveBeenCalledTimes(2);
		expect(result.nativeHierarchy.root.tag).toBe(1);
		expect(runtime.hitTestRuntime().findTouchTarget(10, 10).target).toBe(2);
	});

	it("flushes UIManager.measure callbacks queued by an earlier measurement before declaring layout stable", async () => {
		const uiManager = new ApkUiManagerRuntime(contract, 1);
		uiManager.createView(2, "RCTView", 1, { width: 100, height: 50, collapsable: false });
		uiManager.setChildren(1, [2]);
		const measurements: unknown[][] = [];
		uiManager.measure(2, (...arguments_: unknown[]) => {
			measurements.push(arguments_);
			uiManager.measure(2, (...nextArguments: unknown[]) => measurements.push(nextArguments));
		});
		const backend: ApkAndroidTextLayoutBackend = {
			intrinsicWidth: () => { throw new Error("Kein Text erwartet"); },
			layout: () => { throw new Error("Kein Text erwartet"); },
		};
		const afterLayoutEvents = vi.fn(async () => undefined);
		const runtime = new ApkUiExecutionRuntime({
			uiManager,
			jsModuleCaller: { callJsFunction: vi.fn(async () => undefined) },
			textLayoutBackend: backend,
			width: 360,
			height: 800,
			density: 3,
			fontScale: 1,
			afterLayoutEvents,
		});

		const result = await runtime.stabilize();

		expect(result.rounds).toHaveLength(2);
		expect(measurements).toEqual([
			[0, 0, 100, 50, 0, 0],
			[0, 0, 100, 50, 0, 0],
		]);
		expect(afterLayoutEvents).toHaveBeenCalledTimes(2);
		expect(uiManager.pendingNativeMeasurementCount()).toBe(0);
	});

	it("emits the APK safe-area provider lifecycle event and lets React continue rendering", async () => {
		const uiManager = new ApkUiManagerRuntime(contract, 1);
		uiManager.createView(2, "RNCSafeAreaProvider", 1, { flex: 1 });
		uiManager.setChildren(1, [2]);
		let childCreated = false;
		const callJsFunction = vi.fn(async (_module: string, _method: string, arguments_: readonly unknown[]) => {
			if (arguments_[0] !== 2 || arguments_[1] !== "topInsetsChange" || childCreated) return;
			childCreated = true;
			uiManager.createView(3, "RCTView", 1, { flex: 1 });
			uiManager.setChildren(2, [3]);
		});
		const backend: ApkAndroidTextLayoutBackend = {
			intrinsicWidth: () => { throw new Error("Kein Text erwartet"); },
			layout: () => { throw new Error("Kein Text erwartet"); },
		};
		const runtime = new ApkUiExecutionRuntime({
			uiManager,
			jsModuleCaller: { callJsFunction },
			textLayoutBackend: backend,
			width: 360,
			height: 800,
			density: 3,
			fontScale: 1,
			safeAreaInsets: { top: 8, right: 0, bottom: 12, left: 0 },
			afterLayoutEvents: async () => undefined,
		});

		const result = await runtime.stabilize();

		expect(result.rounds.map(round => round.safeAreaEvents.length)).toEqual([1, 0]);
		expect(callJsFunction).toHaveBeenCalledWith("RCTEventEmitter", "receiveEvent", [
			2,
			"topInsetsChange",
			{
				insets: { top: 8, right: 0, bottom: 12, left: 0 },
				frame: { x: 0, y: 0, width: 360, height: 800 },
			},
		]);
		expect(uiManager.snapshot().children[0].children[0].tag).toBe(3);
	});
});
