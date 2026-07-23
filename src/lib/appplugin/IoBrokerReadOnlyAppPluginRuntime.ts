import contractJson from "../../apppluginHost/generated/apk-appplugin-host-contract.json";
import {
	ApkAppPluginAdapterRuntimeService,
	ApkAppPluginManagedDeviceRuntimeHostProvider,
	createApkAppPluginAdapterHostLeaseFactory,
	parseApkUserPluginAgreementsResponse,
	selectApkPluginAgreementsForDevice,
	selectApkPluginAgreementsV2ForDevice,
	type ApkAgreementDiagnostic,
	type ApkAppPluginAdapterCompositionPolicy,
	type ApkAppPluginAuthenticatedAccountRuntime,
	type ApkAppPluginHostContract,
	type ApkAppPluginPackageRuntime,
	type ApkDeviceIngressResult,
	type ApkDeviceIngressRouter,
	type ApkReadOnlyProbeRootOptions,
	type ApkReadOnlyDeviceTransportObserver,
	type ApkTimingDiagnostic,
	type ApkV8WorkerDiagnostic,
} from "../../apppluginHost";
import type { Roborock } from "../../main";
import { createCanvasKitSkiaHost } from "./CanvasKitSkiaHost";
import {
	createIoBrokerReadOnlyAppPluginDeviceHostLeaseFactory,
	type IoBrokerReadOnlyAppPluginDisplayOptions,
} from "./IoBrokerReadOnlyAppPluginDeviceHost";

const contract = contractJson as ApkAppPluginHostContract;

export const IOBROKER_APPPLUGIN_DISPLAY = Object.freeze({
	densityDpi: 96,
	fontScale: 1,
	height: 800,
	scale: 1,
	width: 1_200,
});

export const IOBROKER_APPPLUGIN_STATUS_READ_METHODS = Object.freeze([
	"app_get_init_status",
	"app_get_status",
	"get_prop",
	"get_serial_number",
	"get_status",
]);

export function createIoBrokerReadOnlyAppPluginRootOptions(
	localeIdentifier = "de_DE",
	colorMode: "dark" | "light" = "light",
): Readonly<ApkReadOnlyProbeRootOptions> {
	return Object.freeze({
		androidApiLevel: 35,
		density: IOBROKER_APPPLUGIN_DISPLAY.scale,
		direction: /^(?:ar|fa|he|ur)(?:_|-|$)/iu.test(localeIdentifier)
			? "rtl"
			: "ltr",
		doLeftAndRightSwapInRTL: true,
		fontScale: IOBROKER_APPPLUGIN_DISPLAY.fontScale,
		height: IOBROKER_APPPLUGIN_DISPLAY.height,
		initialProps: Object.freeze({ colorMode }),
		safeAreaInsets: Object.freeze({ top: 0, right: 0, bottom: 0, left: 0 }),
		width: IOBROKER_APPPLUGIN_DISPLAY.width,
	});
}

export interface IoBrokerReadOnlyAppPluginRuntimeOptions {
	readonly account: ApkAppPluginAuthenticatedAccountRuntime;
	readonly adapter: Roborock;
	readonly allowedMethods: ReadonlySet<string> | readonly string[];
	readonly clientId: string;
	readonly display?: Readonly<IoBrokerReadOnlyAppPluginDisplayOptions>;
	readonly ingressRouter: ApkDeviceIngressRouter;
	readonly instanceDataDirectory: string;
	readonly language?: string;
	readonly localeIdentifier?: string;
	readonly onAgreementDiagnostic?: (diagnostic: Readonly<ApkAgreementDiagnostic>) => void;
	readonly onAgreementCount?: (
		deviceId: string,
		version: "v1" | "v2",
		count: number,
	) => void;
	readonly onNativeInvocation?: NonNullable<
		ApkAppPluginAdapterCompositionPolicy["onNativeInvocation"]
	>;
	readonly onTimingDiagnostic?: (diagnostic: Readonly<ApkTimingDiagnostic>) => void;
	readonly onTransportObservation?: ApkReadOnlyDeviceTransportObserver;
	readonly onWorkerDiagnostic?: (diagnostic: ApkV8WorkerDiagnostic) => void;
	readonly packages: ApkAppPluginPackageRuntime;
}

export function isIoBrokerAppPluginStatusResponse(
	result: Readonly<ApkDeviceIngressResult>,
): boolean {
	return result.rpcMethod === "app_get_status"
		|| result.rpcMethod === "get_status"
		|| (
			result.rpcMethod === "get_prop"
			&& Array.isArray(result.rpcParameters)
			&& result.rpcParameters.includes("get_status")
		);
}

/**
 * Builds the one ioBroker composition used by both bounded probes and the
 * opt-in persistent service. APK services, device routing and the original
 * bundle therefore cannot drift between the two execution modes.
 */
export function createIoBrokerReadOnlyAppPluginRuntime(
	options: Readonly<IoBrokerReadOnlyAppPluginRuntimeOptions>,
): ApkAppPluginAdapterRuntimeService {
	let rawPluginAgreementsPromise: Promise<readonly unknown[]> | undefined;
	const loadRawPluginAgreements = (): Promise<readonly unknown[]> => {
		rawPluginAgreementsPromise ??= options.account.authenticatedHttpPorts().user
			.get("/api/v1/checkAppAgreement", null)
			.then(parseApkUserPluginAgreementsResponse);
		return rawPluginAgreementsPromise;
	};
	const display = Object.freeze({
		...IOBROKER_APPPLUGIN_DISPLAY,
		...options.display,
	});
	const acquireDeviceHost = createIoBrokerReadOnlyAppPluginDeviceHostLeaseFactory({
		adapter: options.adapter,
		allowedMethods: options.allowedMethods,
		display,
		ingressRouter: options.ingressRouter,
		language: options.language,
		localeIdentifier: options.localeIdentifier,
		loadPluginAgreements: async deviceId => {
			const agreements = selectApkPluginAgreementsForDevice(
				await loadRawPluginAgreements(),
				deviceId,
			);
			options.onAgreementCount?.(deviceId, "v1", agreements.length);
			return agreements;
		},
		loadPluginAgreementsV2: async deviceId => {
			const agreements = selectApkPluginAgreementsV2ForDevice(
				await loadRawPluginAgreements(),
				deviceId,
			);
			options.onAgreementCount?.(deviceId, "v2", agreements.length);
			return agreements;
		},
		observeAgreements: options.onAgreementDiagnostic,
		observeTiming: options.onTimingDiagnostic,
		observeTransport: options.onTransportObservation,
		observeWorker: options.onWorkerDiagnostic,
	});
	const hostProvider = new ApkAppPluginManagedDeviceRuntimeHostProvider(
		createApkAppPluginAdapterHostLeaseFactory({
			instanceDataDirectory: options.instanceDataDirectory,
			acquireDeviceHost,
			composition: {
				maxHeapMegabytes: 256,
				onNativeInvocation: options.onNativeInvocation,
				shutdownTimeoutMs: 5_000,
				startupTimeoutMs: 15_000,
			},
			createSkiaHost: skiaOptions => createCanvasKitSkiaHost({
				...skiaOptions,
				fontPaths: skiaOptions.fontPaths ? [...skiaOptions.fontPaths] : undefined,
			}),
		}),
	);

	return new ApkAppPluginAdapterRuntimeService({
		account: options.account,
		contract,
		host: {
			androidRelease: "15",
			clientId: options.clientId,
			memoryMiB: 512,
			mobileModel: "ioBroker AppPlugin Host",
		},
		hostProvider,
		packages: options.packages,
	});
}
