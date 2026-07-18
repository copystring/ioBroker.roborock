import * as fs from "node:fs";
import * as path from "node:path";
import { describe, expect, it, vi } from "vitest";

const {
	createCaptureOnlyDeviceModule,
	createReactNativeEventTypes,
	dispatchTouchEvent,
	extractViewCompositionOrder,
	extractViewManagerCandidates,
	probeMetroBundleUiContract,
} = require("../../scripts/lib/appplugin_ui_contract_probe.js");
const { findBundleFiles, inspectBundle } = require("../../scripts/lib/appplugin_bundle_inventory.js");

describe("AppPlugin UI contract discovery host", () => {
	it("discovers native view names without rewriting the bundle", () => {
		const source = Buffer.from("RCTView YXHomeMapContentView RNSkiaModule SkiaPictureView RCTView", "utf8");
		const before = Buffer.from(source);

		expect(extractViewManagerCandidates(source)).toEqual([
			"RCTView",
			"RNSkiaModule",
			"SkiaPictureView",
			"YXHomeMapContentView",
		]);
		expect(source.equals(before)).toBe(true);
	});

	it("reconstructs the original native child order for stacked Skia views", () => {
		const operations = [
			{ kind: "createView", args: [10, "SkiaPictureView", 1, {}] },
			{ kind: "createView", args: [11, "SkiaPictureView", 1, {}] },
			{ kind: "createView", args: [20, "RCTView", 1, {}] },
			{ kind: "setChildren", args: [1, [20]] },
			{ kind: "setChildren", args: [20, [10, 11]] },
		];

		expect(extractViewCompositionOrder(operations)).toEqual([10, 11]);
		operations.push({ kind: "manageChildren", args: [20, [0], [1], [], [], []] });
		expect(extractViewCompositionOrder(operations)).toEqual([11, 10]);
	});

	it("exposes the React Native touch and responder contract used by the original map", () => {
		const eventTypes = createReactNativeEventTypes();

		expect(eventTypes.directEventTypes.topLayout).toEqual({ registrationName: "onLayout" });
		expect(eventTypes.bubblingEventTypes.topTouchStart).toEqual({
			phasedRegistrationNames: {
				captured: "onTouchStartCapture",
				bubbled: "onTouchStart",
			},
		});
		expect(eventTypes.bubblingEventTypes.topTouchMove).toBeDefined();
		expect(eventTypes.bubblingEventTypes.topTouchEnd).toBeDefined();
		expect(eventTypes.bubblingEventTypes.topTouchCancel).toBeDefined();
	});

	it("replays a complete touch through the original RCTEventEmitter boundary", () => {
		const bridgeCalls: unknown[][] = [];
		const runtime = {
			context: {
				__fbBatchedBridge: {
					callFunctionReturnFlushedQueue: (...args: unknown[]) => bridgeCalls.push(args),
				},
			},
		};
		const operations = [{ kind: "createView", args: [41, "SkiaPictureView", 1, {}] }];
		const activeTouches = new Map();

		expect(dispatchTouchEvent(runtime, operations, activeTouches, {
			eventType: "topTouchStart",
			x: 120,
			y: 240,
		})).toMatchObject({ eventType: "topTouchStart", targetTag: 41, x: 120, y: 240 });
		expect(activeTouches.size).toBe(1);
		dispatchTouchEvent(runtime, operations, activeTouches, {
			eventType: "topTouchEnd",
			x: 120,
			y: 240,
		});
		expect(activeTouches.size).toBe(0);
		expect(bridgeCalls).toHaveLength(2);
		expect(bridgeCalls[0]?.slice(0, 2)).toEqual(["RCTEventEmitter", "receiveTouches"]);
		expect(bridgeCalls[0]?.[2]).toMatchObject([
			"topTouchStart",
			[{ identifier: 0, target: 41, pageX: 120, pageY: 240 }],
			[0],
		]);
	});

	it("captures device writes without sending them", async () => {
		const callback = vi.fn();
		const device = createCaptureOnlyDeviceModule({ shadowDps: { 121: 8 } });

		await expect(device.module.loadDps()).resolves.toEqual({ 121: 8 });
		await expect(device.module.publishDps({ 101: { 16: 1 } }, callback)).resolves.toBe(true);
		await vi.waitFor(() => expect(callback).toHaveBeenCalledWith(true));
		expect(device.calls).toContainEqual({ method: "publishDps", args: [{ 101: { 16: 1 } }] });
	});
});

const repositoryRoot = path.resolve(__dirname, "..", "..");
const pluginRoot = path.join(repositoryRoot, ".AppPlugins");
const metroBundles = fs.existsSync(pluginRoot)
	? findBundleFiles(pluginRoot).filter((bundlePath: string) => inspectBundle(bundlePath).format === "metro")
	: [];
const requestedBundleFragment = process.env.APPPLUGIN_TEST_BUNDLE_FILTER;
const selectedMetroBundles = requestedBundleFragment
	? metroBundles.filter((bundlePath: string) => bundlePath.includes(requestedBundleFragment))
	: metroBundles;
const originalMetroIt = selectedMetroBundles.length > 0 ? it : it.skip;

describe("all local Metro AppPlugin UI contracts", () => {
	originalMetroIt("starts every original Metro app tree through the capture-only host", async () => {
		const results = [];
		for (const bundlePath of selectedMetroBundles) {
			results.push(await probeMetroBundleUiContract(bundlePath, { durationMs: 350 }));
		}

		expect(results.length).toBeGreaterThan(0);
		expect(results.every((result: { unchanged: boolean }) => result.unchanged)).toBe(true);
		expect(results.every((result: { appKeys: string[] }) => result.appKeys.includes("App"))).toBe(true);
		const failedRuns = results.filter((result: { runError?: string }) => result.runError);
		const summarizeFailures = (failures: typeof results): unknown => failures.map(result => ({
			bundlePath: result.bundlePath,
			runError: result.runError,
			reportedExceptions: result.reportedExceptions,
			fallbackCapabilities: result.fallbackCapabilities,
			uiOperationCount: result.uiOperationCount,
		}));
		expect(summarizeFailures(failedRuns)).toEqual([]);
		const reportedFailures = results.filter(
			(result: { reportedExceptions: string[] }) => result.reportedExceptions.length > 0,
		);
		expect(summarizeFailures(reportedFailures)).toEqual([]);
		expect(results.every((result: { uiOperationCount: number }) => result.uiOperationCount > 0)).toBe(true);
	}, 120_000);
});
