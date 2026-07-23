import contractJson from "../../apppluginHost/generated/apk-appplugin-host-contract.json";
import {
	ApkAppPluginAdapterRuntimeService,
	ApkAppPluginManagedDeviceRuntimeHostProvider,
	createApkAppPluginAdapterHostLeaseFactory,
	parseApkUserPluginAgreementsResponse,
	selectApkPluginAgreementsForDevice,
	selectApkPluginAgreementsV2ForDevice,
	runApkReadOnlyProbeSession,
	type ApkAgreementDiagnostic,
	type ApkAppPluginAuthenticatedAccountRuntime,
	type ApkAppPluginHostContract,
	type ApkAppPluginPackageRuntime,
	type ApkDeviceIngressRouter,
	type ApkReadOnlyDeviceTransportObservation,
	type ApkReadOnlyProbeResult,
	type ApkTimingDiagnostic,
	type ApkV8WorkerDiagnostic,
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
	const observations: ApkReadOnlyDeviceTransportObservation[] = [];
	const nativeInvocations = new Map<string, number>();
	const nativeInvocationDetails = new Set<string>();
	const agreementDiagnostics: Readonly<ApkAgreementDiagnostic>[] = [];
	const timingDiagnostics: Readonly<ApkTimingDiagnostic>[] = [];
	const workerDiagnostics: ApkV8WorkerDiagnostic[] = [];
	let pluginAgreementCount: number | undefined;
	let pluginAgreementV2Count: number | undefined;
	let rawPluginAgreementsPromise: Promise<readonly unknown[]> | undefined;
	const loadRawPluginAgreements = (): Promise<readonly unknown[]> => {
		rawPluginAgreementsPromise ??= options.account.authenticatedHttpPorts().user
			.get("/api/v1/checkAppAgreement", null)
			.then(parseApkUserPluginAgreementsResponse);
		return rawPluginAgreementsPromise;
	};
	const acquireDeviceHost = createIoBrokerReadOnlyAppPluginDeviceHostLeaseFactory({
		adapter: options.adapter,
		allowedMethods: options.allowedMethods,
		display: DISPLAY,
		ingressRouter: options.ingressRouter,
		language: options.language,
		localeIdentifier: options.localeIdentifier,
		loadPluginAgreements: async () => {
			const agreements = selectApkPluginAgreementsForDevice(
				await loadRawPluginAgreements(),
				options.targetDuid,
			);
			pluginAgreementCount = agreements.length;
			return agreements;
		},
		loadPluginAgreementsV2: async () => {
			const agreements = selectApkPluginAgreementsV2ForDevice(
				await loadRawPluginAgreements(),
				options.targetDuid,
			);
			pluginAgreementV2Count = agreements.length;
			return agreements;
		},
		observeAgreements: diagnostic => agreementDiagnostics.push(structuredClone(diagnostic)),
		observeTransport: observation => observations.push(structuredClone(observation)),
		observeTiming: diagnostic => timingDiagnostics.push(structuredClone(diagnostic)),
		observeWorker: diagnostic => workerDiagnostics.push(structuredClone(diagnostic)),
	});
	const hostProvider = new ApkAppPluginManagedDeviceRuntimeHostProvider(
		createApkAppPluginAdapterHostLeaseFactory({
			instanceDataDirectory: options.instanceDataDirectory,
			acquireDeviceHost,
			composition: {
				maxHeapMegabytes: 256,
				onNativeInvocation: (moduleName, methodName, arguments_) => {
					const key = `${moduleName}.${methodName}`;
					nativeInvocations.set(key, (nativeInvocations.get(key) ?? 0) + 1);
					if (key === "Timing.createTimer") {
						const [, duration, , repeats] = arguments_;
						nativeInvocationDetails.add(
							`Timing.createTimer(Dauer=${String(duration)}ms,wiederholt=${String(repeats)})`,
						);
					} else if (key === "UIManager.createView") {
						const [, viewName] = arguments_;
						if (typeof viewName === "string") {
							nativeInvocationDetails.add(`UIManager.createView(${viewName})`);
						}
					} else if (key === "RRPluginSDK.getValue") {
						const [preferenceKey] = arguments_;
						if (typeof preferenceKey === "string") {
							nativeInvocationDetails.add(`RRPluginSDK.getValue(${preferenceKey})`);
						}
					} else if (key === "RRPluginSDK.readFileListAtPath") {
						const [directory] = arguments_;
						if (typeof directory === "string") {
							const leaf = directory.replace(/[\\/]+$/u, "").split(/[\\/]/u).at(-1) ?? "";
							nativeInvocationDetails.add(`RRPluginSDK.readFileListAtPath(${leaf || "leer"})`);
						}
					} else if (key === "RRPluginSDK.callJsExecutorWithArray") {
						const [, functionName, workerArguments] = arguments_;
						if (typeof functionName === "string") {
							nativeInvocationDetails.add(
								`RRPluginSDK.callJsExecutorWithArray(${functionName},Argumente=${
									Array.isArray(workerArguments) ? workerArguments.length : "kein Array"
								})`,
							);
						}
					} else if (
						key === "RRPluginSDK.getPluginAgreements"
						|| key === "RRPluginSDK.getPluginAgreementsV2"
						|| key === "RRPluginSDK.getProductAgreements"
					) {
						nativeInvocationDetails.add(key);
					}
				},
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
		acceptRpcResponse: result =>
			result.rpcMethod === "app_get_status"
			|| result.rpcMethod === "get_status"
			|| (
				result.rpcMethod === "get_prop"
				&& Array.isArray(result.rpcParameters)
				&& result.rpcParameters.includes("get_status")
			),
		describeDiagnostics: () => {
			const deviceOperations = observations.length === 0
				? "keine RRPluginDevice-Transportoperation beobachtet"
				: observations.map(observation => {
					switch (observation.operation) {
						case "connect-local":
							return `connect-local(status=${observation.status})`;
						case "device-online":
							return `device-online(${observation.online})`;
						case "load-shadow":
							return `load-shadow(${observation.available ? "vorhanden" : "leer"})`;
						case "json-rpc":
							return `json-rpc(${observation.method},${observation.route},${observation.outcome})`;
						case "protobuf-rpc":
							return `protobuf-rpc(${observation.route},blockiert)`;
					}
				}).join(", ");
			const nativeOperations = nativeInvocations.size === 0
				? "keine Native-Module-Aufrufe beobachtet"
				: [...nativeInvocations]
					.sort(([left], [right]) => left.localeCompare(right))
					.map(([key, count]) => `${key}x${count}`)
					.join(", ");
			const nativeDetails = nativeInvocationDetails.size === 0
				? "keine ausgewählten Aufrufdetails"
				: [...nativeInvocationDetails].sort().join(", ");
			const timers = timingDiagnostics.length === 0
				? "keine Timer-Rückwegdiagnose"
				: timingDiagnostics.map(diagnostic =>
					`${diagnostic.phase}(${diagnostic.timerIds.join(",")})${
						diagnostic.error ? `:${diagnostic.error}` : ""
					}`)
					.join(", ");
			const workers = workerDiagnostics.length === 0
				? "keine Worker-Diagnose"
				: workerDiagnostics.map(diagnostic => [
					diagnostic.kind,
					diagnostic.functionName,
					diagnostic.success ? "ok" : `fehlgeschlagen:${diagnostic.error ?? "unbekannt"}`,
					diagnostic.resultSummary ? JSON.stringify(diagnostic.resultSummary) : undefined,
				].filter(Boolean).join("/"))
					.join(", ");
			const agreements = agreementDiagnostics.length === 0
				? "keine Agreement-Rückgabediagnose"
				: agreementDiagnostics.map(diagnostic => {
					const shape = [
						diagnostic.value.kind,
						diagnostic.value.count === undefined ? undefined : `Anzahl=${diagnostic.value.count}`,
						diagnostic.value.keys?.length
							? `Schlüssel=${diagnostic.value.keys.join("|")}`
							: undefined,
					].filter(Boolean).join(",");
					return `${diagnostic.method}(${diagnostic.outcome},${shape})`;
				}).join(", ");
			return `${deviceOperations}; Native: ${nativeOperations}; Details: ${nativeDetails}; Timer: ${timers}; `
				+ `Worker: ${workers}; `
				+ `Agreements: ${agreements}; `
				+ `Geräte-Einwilligungen: V1=${pluginAgreementCount ?? "nicht geladen"}, `
				+ `V2=${pluginAgreementV2Count ?? "nicht geladen"}`;
		},
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
			},
			safeAreaInsets: { top: 0, right: 0, bottom: 0, left: 0 },
			width: DISPLAY.width,
		},
		signal: options.signal,
		targetDuid: options.targetDuid,
		timeoutMilliseconds: options.timeoutMilliseconds,
	});
}
