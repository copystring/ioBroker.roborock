import { describe, expect, it, vi } from "vitest";

import { ApkPluginAnalyticsRuntime } from "../../src/apppluginHost";

describe("APK PluginSDK analytics runtime", () => {
	it("adds the APK common parameters and preserves method-specific data", () => {
		const emit = vi.fn();
		const runtime = new ApkPluginAnalyticsRuntime({
			firmwareVersion: "02.16.18",
			pluginVersion: 42,
			productModel: "roborock.vacuum.sc01",
			emit,
		});

		runtime.eventCommonWithEventIDDict("map_zoom", { source: "map", firmwareV: "wrong" });
		runtime.eventCommonV2WithEventIDDict("clean", "start", null);
		runtime.eventRecordView("main", "settings", 1500, { tab: "map" });
		runtime.eventStatusWithParamDic({ status: 8 });

		expect(emit).toHaveBeenNthCalledWith(1, {
			method: "eventCommonWithEventIDDict",
			eventId: "map_zoom",
			parameters: {
				source: "map",
				firmwareV: "02.16.18",
				pluginV: "42",
				productModel: "roborock.vacuum.sc01",
			},
		});
		expect(emit).toHaveBeenNthCalledWith(2, expect.objectContaining({
			method: "eventCommonV2WithEventIDDict",
			eventId: "clean",
			eventProp: "start",
		}));
		expect(emit).toHaveBeenNthCalledWith(3, expect.objectContaining({
			method: "eventRecordView",
			fromView: "main",
			toView: "settings",
			stayMillisecond: 1500,
		}));
		expect(emit).toHaveBeenNthCalledWith(4, expect.objectContaining({
			method: "eventStatusWithParamDic",
			parameters: expect.objectContaining({ status: 8 }),
		}));
	});

	it("uses the APK's unKnown fallback for an empty firmware", () => {
		const emit = vi.fn();
		const runtime = new ApkPluginAnalyticsRuntime({
			pluginVersion: "7",
			productModel: "roborock.vacuum.test",
			emit,
		});
		runtime.eventStatusWithParamDic(null);
		expect(emit).toHaveBeenCalledWith(expect.objectContaining({
			parameters: expect.objectContaining({ firmwareV: "unKnown" }),
		}));
	});
});
