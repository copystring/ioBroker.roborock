import { describe, expect, it, vi } from "vitest";

import { ApkNativeAnimatedRuntime } from "../../src/apppluginHost/apkNativeAnimatedRuntime";

describe("ApkNativeAnimatedRuntime", () => {
	it("drives APK value -> style -> props graphs with AppPlugin frame curves", () => {
		const scheduled: Array<{ callback: () => void; delayMs: number; cancelled: boolean }> = [];
		const viewProps = new Map<number, Record<string, unknown>>();
		const restored: Array<{ tag: number; names: readonly string[] }> = [];
		const onViewUpdate = vi.fn();
		const runtime = new ApkNativeAnimatedRuntime({
			updateView: (tag, props) => viewProps.set(tag, { ...(viewProps.get(tag) ?? {}), ...props }),
			restoreDefaultViewProps: (tag, names) => {
				const props = { ...(viewProps.get(tag) ?? {}) };
				for (const name of names) delete props[name];
				viewProps.set(tag, props);
				restored.push({ tag, names });
			},
			onViewUpdate,
			schedule: (callback, delayMs) => {
				const task = { callback, delayMs, cancelled: false };
				scheduled.push(task);
				return task;
			},
			cancelScheduled: handle => {
				(handle as { cancelled: boolean }).cancelled = true;
			},
		});

		runtime.startOperationBatch();
		runtime.createAnimatedNode(1, { type: "value", value: 1, offset: 0 });
		runtime.createAnimatedNode(2, { type: "style", style: { opacity: 1 } });
		runtime.createAnimatedNode(3, { type: "props", props: { style: 2 } });
		runtime.connectAnimatedNodes(1, 2);
		runtime.connectAnimatedNodes(2, 3);
		runtime.connectAnimatedNodeToView(3, 39);
		runtime.finishOperationBatch();

		expect(viewProps.get(39)).toEqual({ opacity: 1 });
		const callback = vi.fn();
		expect(runtime.activeAnimationCount()).toBe(0);
		runtime.startAnimatingNode(7, 1, {
			type: "frames",
			frames: [0, 0.5, 1],
			toValue: 0.5,
			iterations: 1,
		}, callback);
		expect(runtime.activeAnimationCount()).toBe(1);
		expect(scheduled.map(task => Math.round(task.delayMs))).toEqual([17, 33, 50]);

		scheduled[0].callback();
		expect(viewProps.get(39)).toEqual({ opacity: 1 });
		expect(runtime.activeAnimationCount()).toBe(1);
		scheduled[1].callback();
		expect(viewProps.get(39)).toEqual({ opacity: 0.75 });
		expect(runtime.activeAnimationCount()).toBe(1);
		scheduled[2].callback();
		expect(viewProps.get(39)).toEqual({ opacity: 0.5 });
		expect(runtime.activeAnimationCount()).toBe(0);
		expect(callback).toHaveBeenCalledOnce();
		expect(callback).toHaveBeenCalledWith({ finished: true, value: 0.5 });

		runtime.restoreDefaultValues(3);
		expect(viewProps.get(39)).toEqual({});
		expect(restored).toEqual([{ tag: 39, names: ["opacity"] }]);
		expect(onViewUpdate).toHaveBeenCalled();
	});

	it("uses the APK animated-event path to update value nodes", () => {
		const updates: Array<Readonly<Record<string, unknown>>> = [];
		const valueEvents: unknown[] = [];
		const runtime = new ApkNativeAnimatedRuntime({
			updateView: (_tag, props) => updates.push(props),
			restoreDefaultViewProps: () => undefined,
			emitDeviceEvent: (_eventName, payload) => valueEvents.push(payload),
		});
		runtime.createAnimatedNode(1, { type: "value", value: 0, offset: 0 });
		runtime.createAnimatedNode(2, { type: "props", props: { opacity: 1 } });
		runtime.connectAnimatedNodes(1, 2);
		runtime.connectAnimatedNodeToView(2, 145);
		runtime.startListeningToAnimatedNodeValue(1);
		runtime.addAnimatedEventToView(145, "onScroll", {
			animatedValueTag: 1,
			nativeEventPath: ["contentOffset", "x"],
		});

		runtime.dispatchAnimatedEvent(145, "topScroll", { contentOffset: { x: 0.4 } });
		expect(updates.at(-1)).toEqual({ opacity: 0.4 });
		expect(valueEvents).toEqual([{ tag: 1, value: 0.4 }]);
	});

	it("evaluates the APK transform node with animated and static entries", () => {
		const updates: Array<Readonly<Record<string, unknown>>> = [];
		const runtime = new ApkNativeAnimatedRuntime({
			updateView: (_tag, props) => updates.push(props),
			restoreDefaultViewProps: () => undefined,
		});
		runtime.createAnimatedNode(1, { type: "value", value: 2, offset: 0 });
		runtime.createAnimatedNode(2, {
			type: "transform",
			transforms: [
				{ type: "animated", property: "scale", nodeTag: 1 },
				{ type: "static", property: "translateX", value: 4 },
			],
		});
		runtime.createAnimatedNode(3, { type: "style", style: { transform: 2 } });
		runtime.createAnimatedNode(4, { type: "props", props: { style: 3 } });
		runtime.connectAnimatedNodes(1, 2);
		runtime.connectAnimatedNodes(2, 3);
		runtime.connectAnimatedNodes(3, 4);
		runtime.connectAnimatedNodeToView(4, 145);

		expect(updates.at(-1)).toEqual({ transform: [{ scale: 2 }, { translateX: 4 }] });
		runtime.setAnimatedNodeValue(1, 3);
		expect(updates.at(-1)).toEqual({ transform: [{ scale: 3 }, { translateX: 4 }] });
	});

	it("fails closed for APK node and batch types that are not reconstructed", () => {
		const runtime = new ApkNativeAnimatedRuntime({
			updateView: () => undefined,
			restoreDefaultViewProps: () => undefined,
		});
		expect(() => runtime.createAnimatedNode(1, { type: "interpolation" })).toThrow(
			"APK-NativeAnimated-Node-Typ interpolation ist noch nicht nachgebildet",
		);
		expect(() => runtime.queueAndExecuteBatchedOperations([])).toThrow(
			"binäre NativeAnimated-Batchpfad",
		);
	});
});
