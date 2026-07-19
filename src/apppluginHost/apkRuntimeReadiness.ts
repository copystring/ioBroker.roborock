export type ApkRuntimeReadinessStatus = "observed-slice-ready" | "loading" | "blocked" | "failed";

export type ApkRuntimeReadinessReasonCode =
	| "application-not-started"
	| "fatal-runtime-exception"
	| "missing-native-call"
	| "unavailable-host-service"
	| "unexpected-native-rejection"
	| "root-not-mounted"
	| "host-interaction-target-not-observed";

export interface ApkRuntimeReadinessObservation {
	readonly applicationStarted: boolean;
	readonly rootChildCount: number;
	readonly hostInteractionTargetCount: number;
	readonly fatalRuntimeExceptionCount: number;
	readonly missingNativeCalls: readonly string[];
	readonly unavailableHostServices: readonly string[];
	readonly unexpectedNativeRejections: readonly string[];
}

export interface ApkRuntimeReadinessReason {
	readonly code: ApkRuntimeReadinessReasonCode;
	readonly details: readonly string[];
}

export interface ApkRuntimeReadiness {
	readonly status: ApkRuntimeReadinessStatus;
	readonly observedSliceReady: boolean;
	readonly reasons: readonly ApkRuntimeReadinessReason[];
	readonly evidence: {
		readonly rootChildCount: number;
		readonly hostInteractionTargetCount: number;
	};
}

function uniqueSorted(values: readonly string[]): string[] {
	return [...new Set(values)].sort();
}

/**
 * A running process and a mounted React root are transport/lifecycle evidence,
 * not proof of product, device-family, behavioral or visual compatibility.
 * This gate only classifies the exact observed runtime slice. Its interaction
 * count is derived by the host from the current AppPlugin tree and therefore is
 * diagnostic evidence, not an APK-declared product capability.
 */
export function evaluateApkRuntimeReadiness(
	observation: ApkRuntimeReadinessObservation,
): ApkRuntimeReadiness {
	const failedReasons: ApkRuntimeReadinessReason[] = [];
	if (!observation.applicationStarted) {
		failedReasons.push({ code: "application-not-started", details: [] });
	}
	if (observation.fatalRuntimeExceptionCount > 0) {
		failedReasons.push({
			code: "fatal-runtime-exception",
			details: [String(observation.fatalRuntimeExceptionCount)],
		});
	}
	if (failedReasons.length > 0) {
		return {
			status: "failed",
			observedSliceReady: false,
			reasons: failedReasons,
			evidence: {
				rootChildCount: observation.rootChildCount,
				hostInteractionTargetCount: observation.hostInteractionTargetCount,
			},
		};
	}

	const blockedReasons: ApkRuntimeReadinessReason[] = [];
	const missingNativeCalls = uniqueSorted(observation.missingNativeCalls);
	if (missingNativeCalls.length > 0) {
		blockedReasons.push({ code: "missing-native-call", details: missingNativeCalls });
	}
	const unavailableHostServices = uniqueSorted(observation.unavailableHostServices);
	if (unavailableHostServices.length > 0) {
		blockedReasons.push({
			code: "unavailable-host-service",
			details: unavailableHostServices,
		});
	}
	const unexpectedNativeRejections = uniqueSorted(observation.unexpectedNativeRejections);
	if (unexpectedNativeRejections.length > 0) {
		blockedReasons.push({
			code: "unexpected-native-rejection",
			details: unexpectedNativeRejections,
		});
	}
	if (blockedReasons.length > 0) {
		return {
			status: "blocked",
			observedSliceReady: false,
			reasons: blockedReasons,
			evidence: {
				rootChildCount: observation.rootChildCount,
				hostInteractionTargetCount: observation.hostInteractionTargetCount,
			},
		};
	}

	const loadingReasons: ApkRuntimeReadinessReason[] = [];
	if (observation.rootChildCount === 0) {
		loadingReasons.push({ code: "root-not-mounted", details: [] });
	} else if (observation.hostInteractionTargetCount === 0) {
		loadingReasons.push({ code: "host-interaction-target-not-observed", details: [] });
	}
	if (loadingReasons.length > 0) {
		return {
			status: "loading",
			observedSliceReady: false,
			reasons: loadingReasons,
			evidence: {
				rootChildCount: observation.rootChildCount,
				hostInteractionTargetCount: observation.hostInteractionTargetCount,
			},
		};
	}

	return {
		status: "observed-slice-ready",
		observedSliceReady: true,
		reasons: [],
		evidence: {
			rootChildCount: observation.rootChildCount,
			hostInteractionTargetCount: observation.hostInteractionTargetCount,
		},
	};
}
