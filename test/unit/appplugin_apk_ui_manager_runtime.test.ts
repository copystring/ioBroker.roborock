import { describe, expect, it, vi } from "vitest";

import contractJson from "../../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import {
	ApkAppearanceRuntime,
	ApkAppSysRuntime,
	ApkI18nManagerRuntime,
	ApkUiManagerRuntime,
	createApkDefaultEventTypes,
	createApkUiManagerConstants,
	type ApkAppPluginHostContract,
} from "../../src/apppluginHost";

const contract = contractJson as ApkAppPluginHostContract;

describe("APK Appearance runtime", () => {
	it("follows the APK request/configuration-change split", () => {
		const requestColorScheme = vi.fn();
		const emitDeviceEvent = vi.fn();
		const appearance = new ApkAppearanceRuntime({
			initialColorScheme: "light",
			requestColorScheme,
			emitDeviceEvent,
		});

		expect(appearance.getColorScheme()).toBe("light");
		appearance.setColorScheme("dark");
		expect(requestColorScheme).toHaveBeenCalledWith(2);
		expect(appearance.getColorScheme()).toBe("light");

		appearance.onConfigurationChanged("dark");
		expect(appearance.getColorScheme()).toBe("dark");
		expect(emitDeviceEvent).toHaveBeenCalledWith("appearanceChanged", { colorScheme: "dark" });

		appearance.setColorScheme("light");
		appearance.setColorScheme("unspecified");
		appearance.setColorScheme("invalid");
		expect(requestColorScheme.mock.calls).toEqual([[2], [1], [-1]]);
	});
});

describe("APK host utility modules", () => {
	it("persists I18n preferences like the APK module", () => {
		const i18n = new ApkI18nManagerRuntime({
			allowRTL: true,
			forceRTL: false,
			doLeftAndRightSwapInRTL: true,
		});
		i18n.allowRTL(false);
		i18n.forceRTL(true);
		i18n.swapLeftAndRightInRTL(false);
		expect(i18n.snapshot()).toEqual({
			allowRTL: false,
			forceRTL: true,
			doLeftAndRightSwapInRTL: false,
		});
	});

	it("returns the APK build config and host reachability", () => {
		const writeLog = vi.fn();
		const appSys = new ApkAppSysRuntime({
			networkReachable: () => true,
			writeLog,
		});
		expect(appSys.getAppBuildConfig()).toEqual({
			versionName: "4.54.02",
			versionCode: "100820",
			testMode: false,
		});
		expect(appSys.getNetworkReachable()).toEqual({ isReachable: true });
		appSys.info("AppPlugin", "gestartet");
		expect(writeLog).toHaveBeenCalledWith({
			level: "info",
			tag: "AppPlugin",
			message: "gestartet",
		});
	});
});

describe("APK UIManager runtime", () => {
	it("exports the APK lazy ViewManager constants and default event types", () => {
		const constants = createApkUiManagerConstants(contract);
		expect(constants.UIManager.LazyViewManagersEnabled).toBe(true);
		expect(constants.UIManager.ViewManagerNames).toContain("RCTView");
		expect(constants.UIManager.ViewManagerNames).toContain("SkiaPictureView");
		expect(createApkDefaultEventTypes()).toEqual({
			bubblingEventTypes: expect.objectContaining({
				topTouchStart: {
					phasedRegistrationNames: {
						bubbled: "onTouchStart",
						captured: "onTouchStartCapture",
					},
				},
			}),
			directEventTypes: expect.objectContaining({
				topLayout: { registrationName: "onLayout" },
				topMomentumScrollEnd: { registrationName: "onMomentumScrollEnd" },
			}),
		});
	});

	it("builds lazy configs from APK NativeProps, events and commands", () => {
		const runtime = new ApkUiManagerRuntime(contract, 1);
		const masked = runtime.getConstantsForViewManager("RNCMaskedView");
		expect(masked).toEqual(expect.objectContaining({
			NativeProps: expect.objectContaining({
				androidRenderingMode: "String",
				backgroundColor: "Color",
				flexDirection: "String",
				onLayout: "boolean",
			}),
			bubblingEventTypes: expect.objectContaining({
				topPointerDown: {
					phasedRegistrationNames: {
						bubbled: "onPointerDown",
						captured: "onPointerDownCapture",
					},
				},
			}),
			directEventTypes: {
				topAccessibilityAction: { registrationName: "onAccessibilityAction" },
			},
		}));

		const header = runtime.getConstantsForViewManager("RNSScreenStackHeaderConfig");
		expect(header?.directEventTypes).toEqual({
			topAttached: { registrationName: "onAttached" },
			topDetached: { registrationName: "onDetached" },
		});
		expect(header?.NativeProps).toEqual(expect.objectContaining({
			title: "String",
			titleColor: "Color",
			topInsetEnabled: "boolean",
		}));

		const lottie = runtime.getConstantsForViewManager("LottieAnimationView");
		expect(lottie?.Constants).toEqual({ VERSION: 1 });

		const view = runtime.getConstantsForViewManager("RCTView");
		expect(view?.Commands).toEqual({ hotspotUpdate: 1, setPressed: 2 });
		const textInput = runtime.getConstantsForViewManager("AndroidTextInput");
		expect(textInput).toEqual(expect.objectContaining({
			Constants: {
				AutoCapitalizationType: {
					none: 0,
					characters: 0x1000,
					words: 0x2000,
					sentences: 0x4000,
				},
			},
			Commands: { blurTextInput: 2, focusTextInput: 1 },
			NativeProps: expect.objectContaining({
				autoCapitalize: "mixed",
				text: "String",
			}),
		}));
		expect(runtime.getConstantsForViewManager("UnknownView")).toBeNull();
		expect(runtime.getConstantsForViewManager(null)).toBeNull();
	});

	it("preserves tag identity and parent/child ordering", () => {
		const runtime = new ApkUiManagerRuntime(contract, 1);
		runtime.createView(2, "RCTView", 1, { testID: "container" });
		runtime.createView(3, "RNCMaskedView", 1, { androidRenderingMode: "software" });
		runtime.createView(4, "SkiaPictureView", 1, null);
		runtime.setChildren(2, [3]);
		runtime.setChildren(1, [2, 4]);
		runtime.manageChildren(1, [1], [0], null, null, null);

		expect(runtime.snapshot()).toEqual({
			tag: 1,
			viewName: "Root",
			rootTag: 1,
			props: {},
			children: [
				expect.objectContaining({ tag: 4, viewName: "SkiaPictureView" }),
				expect.objectContaining({
					tag: 2,
					viewName: "RCTView",
					children: [expect.objectContaining({ tag: 3, viewName: "RNCMaskedView" })],
				}),
			],
		});
		expect(runtime.operations().map(operation => operation.method)).toEqual([
			"createView",
			"createView",
			"createView",
			"setChildren",
			"setChildren",
			"manageChildren",
		]);
	});

	it("separates visual mutations from responder bookkeeping", () => {
		const runtime = new ApkUiManagerRuntime(contract, 1);
		runtime.createView(2, "RCTView", 1, { width: 20, height: 20 });
		runtime.setChildren(1, [2]);
		const visualRevision = runtime.visualMutationRevision();

		runtime.setJSResponder(2, true);
		runtime.clearJSResponder();
		expect(runtime.visualMutationRevision()).toBe(visualRevision);

		runtime.updateView(2, "RCTView", { opacity: 0.5 });
		expect(runtime.visualMutationRevision()).toBe(visualRevision + 1);
	});

	it("queues APK native measurement callbacks until the UI operation phase", () => {
		const runtime = new ApkUiManagerRuntime(contract, 1);
		const measure = vi.fn();
		const measureInWindow = vi.fn();
		runtime.measure(7, measure);
		runtime.measureInWindow(8, measureInWindow);

		expect(measure).not.toHaveBeenCalled();
		expect(runtime.flushNativeMeasurements(tag => tag === 7
			? { x: 10, y: 20, width: 30, height: 40 }
			: undefined)).toBe(2);
		expect(measure).toHaveBeenCalledWith(0, 0, 30, 40, 10, 20);
		expect(measureInWindow).toHaveBeenCalledWith();
	});

	it("rejects cycles and leaves failed child transactions completely unchanged", () => {
		const runtime = new ApkUiManagerRuntime(contract, 1);
		runtime.createView(2, "RCTView", 1, {});
		runtime.createView(3, "RCTView", 1, {});
		runtime.createView(4, "RCTView", 1, {});
		runtime.createView(5, "RCTView", 1, {});
		runtime.setChildren(2, [3]);
		expect(() => runtime.setChildren(3, [2])).toThrow(/Zyklus/u);

		runtime.setChildren(1, [2, 4]);
		const before = runtime.snapshot();
		const operationCount = runtime.operationCount();
		expect(() => runtime.manageChildren(1, null, null, [5], [99], null)).toThrow(/Zielindex/u);
		expect(runtime.snapshot()).toBe(before);
		expect(runtime.operationCount()).toBe(operationCount);
		expect(runtime.snapshot().children.map(child => child.tag)).toEqual([2, 4]);
	});

	it("keeps a bounded operation journal while preserving total revisions and snapshot caching", () => {
		const runtime = new ApkUiManagerRuntime(contract, 1);
		runtime.createView(2, "RCTView", 1, { opacity: 1 });
		runtime.setChildren(1, [2]);
		const firstSnapshot = runtime.snapshot();
		expect(runtime.snapshot()).toBe(firstSnapshot);

		for (let index = 0; index < 4_100; index += 1) {
			runtime.updateView(2, "RCTView", { opacity: index % 2 });
		}
		const journal = runtime.operationJournal();
		expect(journal.operations).toHaveLength(4_096);
		expect(journal.total).toBe(4_102);
		expect(journal.offset).toBe(6);
		expect(runtime.snapshot()).not.toBe(firstSnapshot);
		expect(runtime.snapshot()).toBe(runtime.snapshot());
	});
});
