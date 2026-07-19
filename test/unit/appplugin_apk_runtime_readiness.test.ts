import { describe, expect, it } from "vitest";

import {
	evaluateApkRuntimeReadiness,
	type ApkRuntimeReadinessObservation,
} from "../../src/apppluginHost/apkRuntimeReadiness";

function observation(
	overrides: Partial<ApkRuntimeReadinessObservation> = {},
): ApkRuntimeReadinessObservation {
	return {
		applicationStarted: true,
		rootChildCount: 1,
		hostInteractionTargetCount: 1,
		fatalRuntimeExceptionCount: 0,
		missingNativeCalls: [],
		unavailableHostServices: [],
		unexpectedNativeRejections: [],
		...overrides,
	};
}

describe("APK AppPlugin runtime readiness", () => {
	it("accepts only the exact observed slice when no invoked host contract is unresolved", () => {
		expect(evaluateApkRuntimeReadiness(observation())).toEqual({
			status: "observed-slice-ready",
			observedSliceReady: true,
			reasons: [],
			evidence: { rootChildCount: 1, hostInteractionTargetCount: 1 },
		});
	});

	it("does not confuse a mounted shell with an observed interactive slice", () => {
		expect(evaluateApkRuntimeReadiness(observation({
			rootChildCount: 2,
			hostInteractionTargetCount: 0,
		}))).toMatchObject({
			status: "loading",
			observedSliceReady: false,
			reasons: [{ code: "host-interaction-target-not-observed" }],
		});
	});

	it("reports unresolved APK services before UI shape", () => {
		expect(evaluateApkRuntimeReadiness(observation({
			hostInteractionTargetCount: 0,
			unavailableHostServices: [
				"RRPluginSDK.getUserRole",
				"RRPluginHttpTurboModule.iotGet",
				"RRPluginSDK.getUserRole",
			],
		}))).toEqual({
			status: "blocked",
			observedSliceReady: false,
			reasons: [{
				code: "unavailable-host-service",
				details: [
					"RRPluginHttpTurboModule.iotGet",
					"RRPluginSDK.getUserRole",
				],
			}],
			evidence: { rootChildCount: 1, hostInteractionTargetCount: 0 },
		});
	});

	it("fails closed on fatal runtime exceptions", () => {
		expect(evaluateApkRuntimeReadiness(observation({
			fatalRuntimeExceptionCount: 1,
			missingNativeCalls: ["Orientation.lockToPortrait"],
		}))).toMatchObject({
			status: "failed",
			observedSliceReady: false,
			reasons: [{ code: "fatal-runtime-exception", details: ["1"] }],
		});
	});
});
