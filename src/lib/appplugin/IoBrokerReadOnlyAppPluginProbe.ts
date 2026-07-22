import contractJson from "../../apppluginHost/generated/apk-appplugin-host-contract.json";
import {
	ApkAppPluginAdapterRuntimeService,
	ApkAppPluginManagedDeviceRuntimeHostProvider,
	createApkAppPluginAdapterHostLeaseFactory,
	runApkReadOnlyProbeSession,
	type ApkAppPluginAuthenticatedAccountRuntime,
	type ApkAppPluginHostContract,
	type ApkAppPluginPackageRuntime,
	type ApkDeviceIngressRouter,
	type ApkReadOnlyProbeResult,
} from "../../apppluginHost";
import type { Roborock } from "../../main";
import { createCanvasKitSkiaHost } from "./CanvasKitSkiaHost";
import {
	createIoBrokerReadOnlyAppPluginDeviceHostLeaseFactory,
} from "./IoBrokerReadOnlyAppPluginDeviceHost";

const contract = contractJson as ApkAppPluginHostContract;

export interface IoBrokerReadOnlyAppPluginProbeOptions {
	readonly account: ApkAppPluginAuthenticatedAccountRuntime;
	readonly adapter: Roborock;
	readonly allowedMethods: ReadonlySet<string> | readonly string[];
	readonly clientId: string;
	readonly deviceProperties: Readonly<Record<string, unknown>>;
	readonly ingressRouter: ApkDeviceIngressRouter;
	readonly instanceDataDirectory: string;
	readonly language?: string;
	readonly localeIdentifier?: string;
	readonly packages: ApkAppPluginPackageRuntime;
	readonly signal?: AbortSignal;
	readonly targetDuid: string;
	readonly timeoutMilliseconds?: number;
}

const DISPLAY = Object.freeze({
	densityDpi: 96,
	fontScale: 1,
	height: 800,
	scale: 1,
	width: 1_200,
});

/**
 * Composes and runs one real, bounded ioBroker AppPlugin read probe. Package
 * selection, UI mount and RPC construction remain owned by the unchanged
 * signed bundle. This function never downloads a package and never broadens
 * the caller-supplied read allow-list.
 */
export async function runIoBrokerReadOnlyAppPluginProbe(
	options: Readonly<IoBrokerReadOnlyAppPluginProbeOptions>,
): Promise<ApkReadOnlyProbeResult> {
	const acquireDeviceHost = createIoBrokerReadOnlyAppPluginDeviceHostLeaseFactory({
		adapter: options.adapter,
		allowedMethods: options.allowedMethods,
		display: DISPLAY,
		ingressRouter: options.ingressRouter,
		language: options.language,
		localeIdentifier: options.localeIdentifier,
	});
	const hostProvider = new ApkAppPluginManagedDeviceRuntimeHostProvider(
		createApkAppPluginAdapterHostLeaseFactory({
			instanceDataDirectory: options.instanceDataDirectory,
			acquireDeviceHost,
			composition: {
				maxHeapMegabytes: 256,
				shutdownTimeoutMs: 5_000,
				startupTimeoutMs: 15_000,
			},
			createSkiaHost: skiaOptions => createCanvasKitSkiaHost({
				...skiaOptions,
				fontPaths: skiaOptions.fontPaths ? [...skiaOptions.fontPaths] : undefined,
			}),
		}),
	);
	const session = new ApkAppPluginAdapterRuntimeService({
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

	return runApkReadOnlyProbeSession(session, options.ingressRouter, {
		deviceProperties: options.deviceProperties,
		root: {
			androidApiLevel: 35,
			density: DISPLAY.scale,
			direction: /^(?:ar|fa|he|ur)(?:_|-|$)/iu.test(options.localeIdentifier ?? "de_DE")
				? "rtl"
				: "ltr",
			doLeftAndRightSwapInRTL: true,
			fontScale: DISPLAY.fontScale,
			height: DISPLAY.height,
			initialProps: {
				colorMode: "light",
				concurrentRoot: true,
			},
			safeAreaInsets: { top: 0, right: 0, bottom: 0, left: 0 },
			width: DISPLAY.width,
		},
		signal: options.signal,
		targetDuid: options.targetDuid,
		timeoutMilliseconds: options.timeoutMilliseconds,
	});
}
