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
	type ApkAgreementAndPolicy,
	type ApkAssembledBlobPayload,
	type ApkDeviceIngress,
	type ApkDeviceIngressResult,
	type ApkHermesNativeInvocationRejection,
	type ApkUiManagerNodeSnapshot,
	type ApkV8WorkerDiagnostic,
} from "../../src/apppluginHost";
import { createCanvasKitSkiaHost } from "../../src/lib/appplugin/CanvasKitSkiaHost";

const contract = contractJson as ApkAppPluginHostContract;

export interface AppPluginProductHostProofOptions {
	readonly agreementAndPolicy?: Readonly<ApkAgreementAndPolicy>;
	readonly descriptor: ApkAppPluginSessionDescriptor;
	readonly instanceDataDirectory: string;
	readonly nativeRootPath?: string;
	readonly pluginAgreements?: readonly unknown[];
	readonly pluginAgreementsV2?: readonly unknown[];
	readonly publishResponses?: readonly AppPluginProductHostPublishResponse[];
	readonly replayEvents?: readonly AppPluginProductHostReplayEvent[];
	readonly settleMilliseconds?: number;
	readonly shadowDps?: Readonly<Record<string, unknown>>;
}

interface AppPluginProductHostReplayTiming {
	readonly waitBeforeMilliseconds?: number;
	readonly waitAfterMilliseconds?: number;
}

export type AppPluginProductHostReplayEvent =
	| Readonly<AppPluginProductHostReplayTiming & {
		kind: "dps";
		protocolVersion: string;
		dps: Readonly<Record<string, unknown>>;
	}>
	| Readonly<AppPluginProductHostReplayTiming & {
		kind: "blob";
		protocolVersion: string;
		payload: Uint8Array;
		nonce?: number;
	}>
	| Readonly<AppPluginProductHostReplayTiming & {
		kind: "blob-payload";
		payload: Uint8Array;
	}>;

export type AppPluginProductHostReplayResult =
	| Readonly<{
		kind: "dps";
		ingress: Readonly<ApkDeviceIngressResult>;
	}>
	| Readonly<{
		kind: "blob";
		assembled?: Readonly<ApkAssembledBlobPayload>;
	}>
	| Readonly<{
		kind: "blob-payload";
		ingress: Readonly<ApkDeviceIngressResult>;
	}>;

export interface AppPluginProductHostPublishResponse {
	readonly match: Readonly<{
		dpsKey: string;
		payload: Readonly<Record<string, unknown>>;
	}>;
	readonly maximumMatches?: number;
	readonly replayEvents: readonly AppPluginProductHostReplayEvent[];
}

export interface AppPluginProductHostPublishResponseMatch {
	readonly dpsKey: string;
	readonly matchCount: number;
	readonly maximumMatches: number;
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
	readonly rootRawTexts: readonly string[];
	readonly rootViewNames: readonly string[];
	readonly operationCount: number;
	readonly nativeInvocationCount: number;
	readonly nativeModules: readonly string[];
	readonly nativeInvocations: readonly Readonly<{
		moduleName: string;
		methodName: string;
		argumentCount: number;
	}>[];
	readonly publishedDps: readonly Readonly<Record<string, unknown>>[];
	readonly rpcTransmissions: readonly Readonly<Record<string, unknown>>[];
	readonly hostErrors: readonly string[];
	readonly invocationRejections: readonly Readonly<ApkHermesNativeInvocationRejection>[];
	readonly replayResults: readonly AppPluginProductHostReplayResult[];
	readonly publishResponseMatches: readonly AppPluginProductHostPublishResponseMatch[];
	readonly workerDiagnostics: readonly Readonly<ApkV8WorkerDiagnostic>[];
	readonly cleanupComplete: boolean;
}

function sha256(path: string): string {
	return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function nodeCount(node: Readonly<ApkUiManagerNodeSnapshot>): number {
	return 1 + node.children.reduce((sum, child) => sum + nodeCount(child), 0);
}

function rootSummary(node: Readonly<ApkUiManagerNodeSnapshot>): Readonly<{
	rawTexts: readonly string[];
	viewNames: readonly string[];
}> {
	const rawTexts: string[] = [];
	const viewNames = new Set<string>();
	const visit = (current: Readonly<ApkUiManagerNodeSnapshot>): void => {
		viewNames.add(current.viewName);
		if (current.viewName === "RCTRawText" && typeof current.props.text === "string") {
			rawTexts.push(current.props.text);
		}
		for (const child of current.children) visit(child);
	};
	visit(node);
	return {
		rawTexts: Object.freeze(rawTexts.slice(0, 256)),
		viewNames: Object.freeze([...viewNames].sort()),
	};
}

async function waitReplayDelay(value: number | undefined, label: string): Promise<void> {
	if (value === undefined || value === 0) return;
	if (!Number.isSafeInteger(value) || value < 0 || value > 10_000) {
		throw new Error(`${label} muss zwischen 0 und 10000 Millisekunden liegen`);
	}
	await new Promise(resolve => setTimeout(resolve, value));
}

function readableRecord(value: unknown): value is Readonly<Record<string, unknown>> {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}

function parseJsonValue(value: unknown): unknown {
	if (typeof value !== "string") return value;
	try {
		return JSON.parse(value) as unknown;
	} catch {
		return value;
	}
}

function matchesSubset(actual: unknown, expected: unknown): boolean {
	const normalizedActual = parseJsonValue(actual);
	if (Array.isArray(expected)) {
		return Array.isArray(normalizedActual)
			&& expected.length === normalizedActual.length
			&& expected.every((item, index) => matchesSubset(normalizedActual[index], item));
	}
	if (readableRecord(expected)) {
		if (!readableRecord(normalizedActual)) return false;
		return Object.entries(expected).every(([key, value]) =>
			Object.hasOwn(normalizedActual, key) && matchesSubset(normalizedActual[key], value)
		);
	}
	return Object.is(normalizedActual, expected);
}

function matchesPublishedDps(
	dps: Readonly<Record<string, unknown>>,
	match: Readonly<AppPluginProductHostPublishResponse["match"]>,
): boolean {
	return Object.hasOwn(dps, match.dpsKey) && matchesSubset(dps[match.dpsKey], match.payload);
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
	const replayResults: AppPluginProductHostReplayResult[] = [];
	const workerDiagnostics: ApkV8WorkerDiagnostic[] = [];
	const publishResponseStates = (options.publishResponses ?? []).map(response => {
		const maximumMatches = response.maximumMatches ?? 1;
		if (!Number.isSafeInteger(maximumMatches) || maximumMatches < 1 || maximumMatches > 100) {
			throw new Error("Maximale Publish-Replay-Trefferzahl muss zwischen 1 und 100 liegen");
		}
		return { response, maximumMatches, matchCount: 0 };
	});
	const nativeModules = new Set<string>();
	const nativeInvocations: Array<Readonly<{
		moduleName: string;
		methodName: string;
		argumentCount: number;
	}>> = [];
	let nativeInvocationCount = 0;
	let nextBlobNonce = 1;
	let active = true;
	let deviceIngress: ApkDeviceIngress | undefined;
	let rootLease: Readonly<ApkAppPluginRootLease> | undefined;
	let runtime: Awaited<ReturnType<ReturnType<typeof createApkAppPluginDeviceModelRuntimeFactory>>>
		| undefined;
	let cleanupComplete = false;
	let replayFailure: unknown;
	let replayQueue: Promise<void> = Promise.resolve();

	const emitReplayEvent = async (event: Readonly<AppPluginProductHostReplayEvent>): Promise<void> => {
		const ingress = deviceIngress;
		const activeRuntime = runtime;
		if (!ingress || !activeRuntime) {
			throw new Error("Produktiver AppPlugin-Host stellte noch keinen Geräte-Ingress bereit");
		}
		await waitReplayDelay(event.waitBeforeMilliseconds, "Replay-Wartezeit vor dem Ereignis");
		if (event.kind === "dps") {
			replayResults.push({
				kind: "dps",
				ingress: structuredClone(ingress.acceptJsonDps(
					options.descriptor.device.deviceId,
					event.protocolVersion,
					JSON.stringify(event.dps),
				)),
			});
		} else if (event.kind === "blob-payload") {
			replayResults.push({
				kind: "blob-payload",
				ingress: structuredClone(ingress.acceptBlobPayload(
					options.descriptor.device.deviceId,
					event.payload,
				)),
			});
		} else {
			const assembled = ingress.acceptBlobSegment({
				duid: options.descriptor.device.deviceId,
				pv: event.protocolVersion,
				nonce: event.nonce ?? nextBlobNonce++,
				sequenceId: 1,
				isFirst: true,
				isLast: true,
				data: Buffer.from(event.payload),
			});
			replayResults.push({
				kind: "blob",
				...(assembled ? { assembled: structuredClone(assembled) } : {}),
			});
		}
		await activeRuntime.session.waitForRuntimeBoundaryIdle(128);
		if (rootLease) await rootLease.uiExecution.stabilize();
		await waitReplayDelay(event.waitAfterMilliseconds, "Replay-Wartezeit nach dem Ereignis");
	};
	const enqueueReplayEvents = (events: readonly AppPluginProductHostReplayEvent[]): void => {
		replayQueue = replayQueue
			.then(async () => {
				for (const event of events) await emitReplayEvent(event);
			})
			.catch(error => {
				replayFailure ??= error;
			});
	};
	const drainReplayQueue = async (): Promise<void> => {
		await replayQueue;
		if (replayFailure !== undefined) throw replayFailure;
	};

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
			loadShadowDps: async () => JSON.stringify(options.shadowDps ?? {}),
			publishDps: async dps => {
				publishedDps.push(structuredClone(dps));
				for (const state of publishResponseStates) {
					if (state.matchCount >= state.maximumMatches) continue;
					if (!matchesPublishedDps(dps, state.response.match)) continue;
					state.matchCount += 1;
					enqueueReplayEvents(state.response.replayEvents);
				}
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
			loadAgreementAndPolicy: async () => options.agreementAndPolicy ?? ({
				privacyProtocol: { version: null, langUrl: null },
				userAgreement: { version: null, langUrl: null },
			}),
			loadPluginAgreements: async () => options.pluginAgreements ?? [],
			loadPluginAgreementsV2: async () => options.pluginAgreementsV2 ?? [],
		},
		onWorkerDiagnostic: diagnostic => {
			workerDiagnostics.push(structuredClone(diagnostic));
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
				attachDeviceIngress: ingress => {
					if (deviceIngress && deviceIngress !== ingress) {
						throw new Error("Produktiver Hostnachweis erhielt mehr als einen Geräte-Ingress");
					}
					deviceIngress = ingress;
					return () => {
						if (deviceIngress === ingress) deviceIngress = undefined;
					};
				},
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
				onNativeInvocation: (moduleName, methodName, arguments_) => {
					nativeInvocationCount += 1;
					nativeModules.add(moduleName);
					if (nativeInvocations.length < 512) {
						nativeInvocations.push({
							moduleName,
							methodName,
							argumentCount: arguments_.length,
						});
					}
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
		for (const event of options.replayEvents ?? []) await emitReplayEvent(event);
		await drainReplayQueue();
		await new Promise(resolve => setTimeout(resolve, options.settleMilliseconds ?? 350));
		await drainReplayQueue();
		await runtime.session.waitForRuntimeBoundaryIdle(128);
		await rootLease.uiExecution.stabilize();
		await runtime.session.waitForRuntimeBoundaryIdle(128);
		const snapshot = rootLease.uiManager.snapshot();
		const summary = rootSummary(snapshot);
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
			rootRawTexts: summary.rawTexts,
			rootViewNames: summary.viewNames,
			operationCount: rootLease.uiManager.operationCount(),
			nativeInvocationCount: 0,
			nativeModules: [],
			nativeInvocations: [],
			publishedDps,
			rpcTransmissions,
			hostErrors,
			invocationRejections,
			replayResults,
			publishResponseMatches: publishResponseStates.map(state => ({
				dpsKey: state.response.match.dpsKey,
				matchCount: state.matchCount,
				maximumMatches: state.maximumMatches,
			})),
			workerDiagnostics,
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
		nativeInvocations: Object.freeze([...nativeInvocations]),
		publishedDps: Object.freeze([...publishedDps]),
		rpcTransmissions: Object.freeze([...rpcTransmissions]),
		hostErrors: Object.freeze([...hostErrors]),
		invocationRejections: Object.freeze([...invocationRejections]),
		replayResults: Object.freeze([...replayResults]),
		publishResponseMatches: Object.freeze(publishResponseStates.map(state => Object.freeze({
			dpsKey: state.response.match.dpsKey,
			matchCount: state.matchCount,
			maximumMatches: state.maximumMatches,
		}))),
		workerDiagnostics: Object.freeze([...workerDiagnostics]),
		cleanupComplete,
	});
}
