import { createHash, randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import * as path from "node:path";

import contractJson from "../../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import {
	ApkAppPluginManagedDeviceRuntimeHostProvider,
	createApkAppPluginAdapterHostLeaseFactory,
	createApkAppPluginDeviceModelRuntimeFactory,
	resolveApkAppPluginSession,
	resolveApkHermesHostArtifact,
	type ApkAppPluginAdapterDeviceRuntimePorts,
	type ApkAppPluginDeviceModelContext,
	type ApkAppPluginDeviceNativeRuntimeInitialState,
	type ApkAppPluginHostContract,
	type ApkAppPluginSessionDescriptor,
	type ApkAppPluginRootLease,
	type ApkHermesNativeInvocationRejection,
	type ApkUiManagerNodeSnapshot,
} from "../../src/apppluginHost";
import { createCanvasKitSkiaHost } from "../../src/lib/appplugin/CanvasKitSkiaHost";

const contract = contractJson as ApkAppPluginHostContract;

export interface AppPluginProductHostProofOptions {
	readonly descriptor: ApkAppPluginSessionDescriptor;
	readonly instanceDataDirectory: string;
	readonly nativeRootPath?: string;
	readonly settleMilliseconds?: number;
}

export interface AppPluginProductHostProofReport {
	readonly schemaVersion: 1;
	readonly pipeline: "productive-device-model-runtime";
	readonly model: string;
	readonly bundleKind: "hermes-bytecode" | "javascript-source";
	readonly bundleSha256Before: string;
	readonly bundleSha256After: string;
	readonly bundleUnchanged: boolean;
	readonly rootTag: number;
	readonly rootChildCount: number;
	readonly nodeCount: number;
	readonly operationCount: number;
	readonly nativeInvocationCount: number;
	readonly nativeModules: readonly string[];
	readonly publishedDps: readonly Readonly<Record<string, unknown>>[];
	readonly rpcTransmissions: readonly Readonly<Record<string, unknown>>[];
	readonly hostErrors: readonly string[];
	readonly invocationRejections: readonly Readonly<ApkHermesNativeInvocationRejection>[];
	readonly cleanupComplete: boolean;
}

function sha256(path: string): string {
	return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function nodeCount(node: Readonly<ApkUiManagerNodeSnapshot>): number {
	return 1 + node.children.reduce((sum, child) => sum + nodeCount(child), 0);
}

function initialState(): ApkAppPluginDeviceNativeRuntimeInitialState {
	const metrics = Object.freeze({
		width: 1_200,
		height: 800,
		scale: 1,
		fontScale: 1,
		densityDpi: 96,
	});
	return {
		appState: "active",
		darkMode: {
			storedColorModel: "default",
			systemColorScheme: "light",
			cardStyle: 0,
		},
		localization: {
			language: "de",
			localeIdentifier: "de_DE",
			systemLocaleIdentifier: "de_DE",
			isRTL: false,
			allowRTL: true,
			forceRTL: false,
			doLeftAndRightSwapInRTL: true,
		},
		network: {
			type: "wifi",
			isInternetReachable: false,
			isWifiEnabled: true,
			details: {},
		},
		orientation: {
			current: "LANDSCAPE-LEFT",
			autoRotateEnabled: false,
			device: "LANDSCAPE-LEFT",
		},
		platform: {
			apiLevel: 35,
			serial: "appplugin-product-host-proof",
			fingerprint: "iobroker/roborock/appplugin-product-host-proof",
			manufacturer: "ioBroker",
			brand: "ioBroker",
			isTesting: true,
			uiMode: "desk",
		},
		safeArea: {
			insets: { top: 0, right: 0, bottom: 0, left: 0 },
			frame: { x: 0, y: 0, width: metrics.width, height: metrics.height },
		},
		screenMetrics: metrics,
		windowMetrics: metrics,
	};
}

function offlineHttpService() {
	const response = async (): Promise<string> => JSON.stringify({ code: 0, result: null });
	return {
		delete: response,
		get: response,
		post: response,
		postJson: response,
		put: response,
		putJson: response,
	};
}

/**
 * Starts an unchanged original bundle through the same productive composition
 * classes used by the adapter. The transport remains deliberately offline:
 * this proves the generic host path and root mount, not device behavior.
 */
export async function runAppPluginProductHostProof(
	options: Readonly<AppPluginProductHostProofOptions>,
): Promise<Readonly<AppPluginProductHostProofReport>> {
	const session = resolveApkAppPluginSession(options.descriptor, contract);
	const bundlePath = session.bundle.bundlePath;
	const bundleSha256Before = sha256(bundlePath);
	const publishedDps: Array<Readonly<Record<string, unknown>>> = [];
	const rpcTransmissions: Array<Readonly<Record<string, unknown>>> = [];
	const hostErrors: string[] = [];
	const invocationRejections: ApkHermesNativeInvocationRejection[] = [];
	const nativeModules = new Set<string>();
	let nativeInvocationCount = 0;
	let active = true;
	let rootLease: Readonly<ApkAppPluginRootLease> | undefined;
	let runtime: Awaited<ReturnType<ReturnType<typeof createApkAppPluginDeviceModelRuntimeFactory>>>
		| undefined;
	let cleanupComplete = false;

	const http = offlineHttpService();
	const context: ApkAppPluginDeviceModelContext = Object.freeze({
		authenticatedHttpPorts: Object.freeze({ iot: http, user: http }),
		session,
	});
	const ports: ApkAppPluginAdapterDeviceRuntimePorts = {
		appSys: {
			networkReachable: () => false,
			writeLog: () => undefined,
		},
		deviceTransport: {
			connectLocalDeviceIfNeeded: () => 0,
			deviceOnline: async () => true,
			loadShadowDps: async () => "{}",
			publishDps: async dps => {
				publishedDps.push(structuredClone(dps));
			},
		},
		hasActivity: () => active,
		http: {},
		intent: {
			initialUrl: () => null,
			canOpenUrl: async () => false,
			openUrl: async () => undefined,
			openApplicationSettings: async () => undefined,
			canSendIntent: async () => false,
			sendIntent: async () => undefined,
		},
		permissions: {
			isBluetoothEnabled: () => false,
			isLocationEnabled: () => false,
			isWifiEnabled: () => true,
		},
		platformServices: {
			androidId: options.descriptor.host.clientId,
			readClipboardText: async () => "",
			writeClipboardText: async () => undefined,
			invokeDefaultBackPressHandler: () => undefined,
			showToast: () => undefined,
			vibrate: () => undefined,
		},
		rpc: {
			endpoint: options.descriptor.host.iotOriginDevId ?? "offline-proof-endpoint",
			nonce: randomBytes(16).toString("hex"),
			transport: {
				sendJson: async (request, route) => {
					rpcTransmissions.push(structuredClone({ kind: "json", request, route }));
				},
				sendProtobuf: async (request, route) => {
					rpcTransmissions.push(structuredClone({ kind: "protobuf", request, route }));
				},
			},
		},
		sdkEnvironment: {
			firmwareVersion: options.descriptor.device.firmwareVersion,
			loadOtaInfo: async () => null,
			loadAgreementAndPolicy: async () => ({
				privacyProtocol: { version: null, langUrl: null },
				userAgreement: { version: null, langUrl: null },
			}),
			loadPluginAgreements: async () => [],
			loadPluginAgreementsV2: async () => [],
		},
		emitAnalytics: () => undefined,
		reportException: (method, arguments_) => {
			hostErrors.push(`${method}: ${JSON.stringify(arguments_)}`);
		},
		emitHostError: error => hostErrors.push(error.message),
	};
	const hostProvider = new ApkAppPluginManagedDeviceRuntimeHostProvider(
		createApkAppPluginAdapterHostLeaseFactory({
			instanceDataDirectory: options.instanceDataDirectory,
			acquireDeviceHost: async () => ({
				initialState: initialState(),
				ports,
				release: () => {
					active = false;
				},
			}),
			composition: {
				maxHeapMegabytes: 256,
				shutdownTimeoutMs: 5_000,
				startupTimeoutMs: 15_000,
				onInvocationRejection: rejection => {
					invocationRejections.push(structuredClone(rejection));
				},
				onNativeInvocation: moduleName => {
					nativeInvocationCount += 1;
					nativeModules.add(moduleName);
				},
			},
			createSkiaHost: skiaOptions => createCanvasKitSkiaHost({
				...skiaOptions,
				fontPaths: skiaOptions.fontPaths ? [...skiaOptions.fontPaths] : undefined,
			}),
		}),
	);
	const factory = createApkAppPluginDeviceModelRuntimeFactory({
		contract,
		hostProvider,
		resolveHostArtifact: options.nativeRootPath
			? () => resolveApkHermesHostArtifact({
				nativeRootPath: path.resolve(options.nativeRootPath),
			})
			: undefined,
	});
	let report: AppPluginProductHostProofReport | undefined;
	let primaryError: unknown;
	try {
		runtime = await factory({
			activeTime: options.descriptor.device.activeTime,
			context,
			deviceId: options.descriptor.device.deviceId,
			model: options.descriptor.device.model,
		});
		await runtime.start();
		rootLease = await runtime.openRoot({
			width: 1_200,
			height: 800,
			density: 1,
			fontScale: 1,
			androidApiLevel: 35,
			direction: "ltr",
			doLeftAndRightSwapInRTL: true,
			safeAreaInsets: { top: 0, right: 0, bottom: 0, left: 0 },
			initialProps: {
				colorMode: "light",
				concurrentRoot: true,
			},
		});
		await runtime.session.waitForRuntimeBoundaryIdle(128);
		await new Promise(resolve => setTimeout(resolve, options.settleMilliseconds ?? 350));
		await runtime.session.waitForRuntimeBoundaryIdle(128);
		const snapshot = rootLease.uiManager.snapshot();
		report = {
			schemaVersion: 1,
			pipeline: "productive-device-model-runtime",
			model: options.descriptor.device.model,
			bundleKind: session.compatibility.bundleKind,
			bundleSha256Before,
			bundleSha256After: "",
			bundleUnchanged: false,
			rootTag: rootLease.rootTag,
			rootChildCount: snapshot.children.length,
			nodeCount: nodeCount(snapshot),
			operationCount: rootLease.uiManager.operationCount(),
			nativeInvocationCount: 0,
			nativeModules: [],
			publishedDps,
			rpcTransmissions,
			hostErrors,
			invocationRejections,
			cleanupComplete: false,
		};
		if (report.rootChildCount === 0) {
			throw new Error("Das unveränderte AppPlugin hat im produktiven Host keinen React-Root erzeugt");
		}
	} catch (error) {
		primaryError = error;
	}

	const cleanupErrors: unknown[] = [];
	for (const operation of [
		...(rootLease ? [() => rootLease!.release()] : []),
		...(runtime ? [() => runtime!.stop()] : []),
		() => hostProvider.shutdown(),
	]) {
		try {
			await operation();
		} catch (error) {
			cleanupErrors.push(error);
		}
	}
	cleanupComplete = hostProvider.state === "stopped" && hostProvider.activeLeaseCount === 0;
	if (primaryError !== undefined) {
		if (cleanupErrors.length > 0) {
			throw new AggregateError(
				[primaryError, ...cleanupErrors],
				"Produktiver AppPlugin-Hostnachweis und Cleanup sind fehlgeschlagen",
			);
		}
		throw primaryError;
	}
	if (cleanupErrors.length > 0) {
		throw new AggregateError(cleanupErrors, "Produktiver AppPlugin-Hostnachweis konnte nicht aufräumen");
	}
	if (!report) throw new Error("Produktiver AppPlugin-Hostnachweis endete ohne Bericht");
	const bundleSha256After = sha256(bundlePath);
	return Object.freeze({
		...report,
		bundleSha256After,
		bundleUnchanged: bundleSha256Before === bundleSha256After,
		nativeInvocationCount,
		nativeModules: Object.freeze([...nativeModules].sort()),
		publishedDps: Object.freeze([...publishedDps]),
		rpcTransmissions: Object.freeze([...rpcTransmissions]),
		hostErrors: Object.freeze([...hostErrors]),
		invocationRejections: Object.freeze([...invocationRejections]),
		cleanupComplete,
	});
}
