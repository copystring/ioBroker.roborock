import { createHash, randomUUID } from "node:crypto";
import {
	lstatSync,
	mkdirSync,
	realpathSync,
	rmSync,
} from "node:fs";
import * as path from "node:path";

import {
	createApkCanvasKitTextLayoutBackend,
} from "./apkCanvasKitTextLayoutBackend";
import type { ApkAndroidTextLayoutBackend } from "./apkAndroidTextMeasureRuntime";
import type { ApkAppPluginDeviceModelContext } from "./apkAppPluginDeviceSessionRuntime";
import type {
	ApkAppPluginDeviceNativeRuntimeInitialState,
	ApkAppPluginDeviceNativeRuntimePorts,
} from "./apkAppPluginDeviceNativeRuntimeEnvironment";
import type {
	ApkAppPluginDeviceHostCompositionOptions,
	ApkAppPluginDeviceRuntimeHostLease,
	ApkAppPluginDeviceRuntimeHostLeaseFactory,
} from "./apkAppPluginDeviceRuntimeHostProvider";
import type { ApkAppPluginModelRuntimeRequest } from "./apkAppPluginSessionSupervisor";
import type { ApkHermesHostArtifact } from "./apkHermesHostArtifact";
import {
	ApkSkiaHostRuntime,
	type ApkHermesSkiaRuntime,
} from "./apkSkiaHostRuntime";

export type ApkAppPluginAdapterDeviceRuntimePorts = Omit<
	ApkAppPluginDeviceNativeRuntimePorts,
	"installSkia"
>;

export interface ApkAppPluginAdapterDeviceHostLease {
	readonly initialState: ApkAppPluginDeviceNativeRuntimeInitialState;
	readonly ports: ApkAppPluginAdapterDeviceRuntimePorts;
	release(): void | Promise<void>;
}

export type ApkAppPluginAdapterDeviceHostLeaseFactory = (
	request: Readonly<ApkAppPluginModelRuntimeRequest<ApkAppPluginDeviceModelContext>>,
	artifact: Readonly<ApkHermesHostArtifact>,
) => Readonly<ApkAppPluginAdapterDeviceHostLease>
	| Promise<Readonly<ApkAppPluginAdapterDeviceHostLease>>;

export type ApkAppPluginAdapterCompositionPolicy = Pick<
	ApkAppPluginDeviceHostCompositionOptions,
	| "maxHeapMegabytes"
	| "maxProtocolLineBytes"
	| "maxStderrBytes"
	| "onInvocationRejection"
	| "onNativeInvocation"
	| "shutdownTimeoutMs"
	| "startupTimeoutMs"
>;

export interface ApkAppPluginAdapterSkiaHostOptions {
	readonly bundleRoot: string;
	readonly width: number;
	readonly height: number;
	readonly fontPaths?: readonly string[];
}

export interface ApkAppPluginAdapterSkiaHost {
	readonly api: Record<string, unknown>;
	readonly viewApi: Record<string, unknown>;
	dispose(): void;
}

export interface ApkAppPluginAdapterHostLeaseFactoryOptions {
	readonly instanceDataDirectory: string;
	readonly acquireDeviceHost: ApkAppPluginAdapterDeviceHostLeaseFactory;
	readonly composition?: Readonly<ApkAppPluginAdapterCompositionPolicy>;
	readonly fontPaths?: readonly string[];
	readonly createLeaseId?: () => string;
	readonly createSkiaHost: (
		options: Readonly<ApkAppPluginAdapterSkiaHostOptions>,
	) => Promise<ApkAppPluginAdapterSkiaHost>;
	readonly createSkiaRuntime?: (host: Readonly<ApkAppPluginAdapterSkiaHost>) => ApkHermesSkiaRuntime;
	readonly createTextLayoutBackend?: (
		canvasKitApi: Readonly<Record<string, unknown>>,
	) => ApkAndroidTextLayoutBackend;
}

interface AdapterRuntimeDirectories {
	readonly sessions: string;
	readonly state: string;
}

function secureRuntimeDirectories(instanceDataDirectoryValue: string): AdapterRuntimeDirectories {
	if (!path.isAbsolute(instanceDataDirectoryValue)) {
		throw new Error("ioBroker-Instanzdatenverzeichnis für AppPlugins muss absolut sein");
	}
	const instanceDataDirectory = path.resolve(instanceDataDirectoryValue);
	mkdirSync(instanceDataDirectory, { recursive: true });
	const instanceStats = lstatSync(instanceDataDirectory);
	if (!instanceStats.isDirectory() || instanceStats.isSymbolicLink()) {
		throw new Error("ioBroker-Instanzdatenverzeichnis für AppPlugins muss ein reguläres Verzeichnis sein");
	}
	const runtimeRoot = path.join(instanceDataDirectory, "appplugin-runtime");
	const sessions = path.join(runtimeRoot, "sessions");
	const state = path.join(runtimeRoot, "state");
	mkdirSync(runtimeRoot, { recursive: true });
	const runtimeStats = lstatSync(runtimeRoot);
	if (!runtimeStats.isDirectory() || runtimeStats.isSymbolicLink()) {
		throw new Error("AppPlugin-Laufzeitdaten müssen ein reguläres Verzeichnis sein");
	}
	mkdirSync(sessions, { recursive: true });
	mkdirSync(state, { recursive: true });
	for (const [label, candidate] of [
		["Sitzungen", sessions],
		["Zustand", state],
	] as const) {
		const stats = lstatSync(candidate);
		if (!stats.isDirectory() || stats.isSymbolicLink()) {
			throw new Error(`AppPlugin-${label} müssen ein reguläres Verzeichnis sein`);
		}
	}
	const realRuntimeRoot = realpathSync(runtimeRoot);
	const realSessions = realpathSync(sessions);
	const realState = realpathSync(state);
	for (const [label, candidate] of [["Sitzungen", realSessions], ["Zustand", realState]] as const) {
		const relative = path.relative(realRuntimeRoot, candidate);
		if (relative.length === 0 || path.isAbsolute(relative) || relative.startsWith(`..${path.sep}`)) {
			throw new Error(`AppPlugin-${label} verlassen das Instanzdatenverzeichnis`);
		}
	}
	return Object.freeze({ sessions: realSessions, state: realState });
}

function safeLeaseId(value: string): string {
	if (!/^[a-zA-Z0-9_-]{1,128}$/u.test(value)) {
		throw new Error("AppPlugin-Host-Lease-ID enthält nicht erlaubte Zeichen");
	}
	return value;
}

function sessionDirectory(
	directories: Readonly<AdapterRuntimeDirectories>,
	request: Readonly<ApkAppPluginModelRuntimeRequest<ApkAppPluginDeviceModelContext>>,
	leaseId: string,
): string {
	const key = createHash("sha256")
		.update(`${request.model}\0${request.deviceId}\0${request.activeTime}`)
		.digest("hex");
	const directory = path.join(directories.sessions, key, safeLeaseId(leaseId));
	mkdirSync(directory, { recursive: true });
	const realDirectory = realpathSync(directory);
	const relative = path.relative(directories.sessions, realDirectory);
	if (relative.length === 0 || path.isAbsolute(relative) || relative.startsWith(`..${path.sep}`)) {
		throw new Error("AppPlugin-Sitzungsverzeichnis verlässt die Laufzeitdatenwurzel");
	}
	return realDirectory;
}

function positiveMetric(value: number, label: string): number {
	if (!Number.isFinite(value) || value <= 0) {
		throw new Error(`${label} muss eine positive endliche Zahl sein`);
	}
	return value;
}

function cloneInitialState(
	state: Readonly<ApkAppPluginDeviceNativeRuntimeInitialState>,
): ApkAppPluginDeviceNativeRuntimeInitialState {
	for (const [label, metrics] of [
		["Fenster", state.windowMetrics],
		["Bildschirm", state.screenMetrics],
	] as const) {
		positiveMetric(metrics.width, `AppPlugin-${label}breite`);
		positiveMetric(metrics.height, `AppPlugin-${label}höhe`);
		positiveMetric(metrics.scale, `AppPlugin-${label}skalierung`);
		positiveMetric(metrics.fontScale, `AppPlugin-${label}-Schriftfaktor`);
		positiveMetric(metrics.densityDpi, `AppPlugin-${label}-DPI`);
	}
	return structuredClone(state);
}

async function cleanupResources(
	deviceHost: Readonly<ApkAppPluginAdapterDeviceHostLease> | undefined,
	skiaHost: Readonly<ApkAppPluginAdapterSkiaHost> | undefined,
	leaseDirectory: string | undefined,
): Promise<void> {
	const operations: Array<() => void | Promise<void>> = [];
	if (skiaHost) operations.push(() => skiaHost.dispose());
	if (deviceHost) operations.push(() => deviceHost.release());
	if (leaseDirectory) operations.push(() => rmSync(leaseDirectory, { force: true, recursive: true }));
	const results = await Promise.allSettled(operations.map(operation =>
		Promise.resolve().then(operation)
	));
	const errors = results
		.filter((result): result is PromiseRejectedResult => result.status === "rejected")
		.map(result => result.reason);
	if (errors.length > 0) {
		throw new AggregateError(errors, "AppPlugin-Adapter-Hostlease konnte nicht sauber freigegeben werden");
	}
}

/**
 * Creates the concrete ioBroker-owned half of a verified AppPlugin model
 * runtime. Filesystem, CanvasKit/Skia and Hermes process policy are owned here;
 * device/account/platform effects remain explicit adapter ports and contain no
 * product-specific command or feature mapping.
 */
export function createApkAppPluginAdapterHostLeaseFactory(
	options: Readonly<ApkAppPluginAdapterHostLeaseFactoryOptions>,
): ApkAppPluginDeviceRuntimeHostLeaseFactory {
	const directories = secureRuntimeDirectories(options.instanceDataDirectory);
	const createLeaseId = options.createLeaseId ?? randomUUID;
	const createSkiaRuntime = options.createSkiaRuntime
		?? (host => new ApkSkiaHostRuntime(host.api, host.viewApi));
	const createTextLayoutBackend = options.createTextLayoutBackend
		?? createApkCanvasKitTextLayoutBackend;

	return async (request, artifact): Promise<Readonly<ApkAppPluginDeviceRuntimeHostLease>> => {
		let deviceHost: Readonly<ApkAppPluginAdapterDeviceHostLease> | undefined;
		let skiaHost: Readonly<ApkAppPluginAdapterSkiaHost> | undefined;
		let leaseDirectory: string | undefined;
		try {
			deviceHost = await options.acquireDeviceHost(request, artifact);
			const initialState = cloneInitialState(deviceHost.initialState);
			leaseDirectory = sessionDirectory(directories, request, createLeaseId());
			skiaHost = await options.createSkiaHost({
				bundleRoot: path.dirname(request.context.session.bundle.bundlePath),
				fontPaths: options.fontPaths ? [...options.fontPaths] : undefined,
				height: Math.max(1, Math.round(initialState.windowMetrics.height)),
				width: Math.max(1, Math.round(initialState.windowMetrics.width)),
			});
			const composition = Object.freeze({
				maxHeapMegabytes: options.composition?.maxHeapMegabytes,
				maxProtocolLineBytes: options.composition?.maxProtocolLineBytes,
				maxStderrBytes: options.composition?.maxStderrBytes,
				onInvocationRejection: options.composition?.onInvocationRejection,
				onNativeInvocation: options.composition?.onNativeInvocation,
				shutdownTimeoutMs: options.composition?.shutdownTimeoutMs,
				startupTimeoutMs: options.composition?.startupTimeoutMs,
				bootstrapPath: path.join(leaseDirectory, "bridge-bootstrap.js"),
				skiaRuntime: createSkiaRuntime(skiaHost),
				textLayoutBackend: createTextLayoutBackend(skiaHost.api),
			});
			const ports = Object.freeze({
				...deviceHost.ports,
				installSkia: () => true,
			});
			let release: Promise<void> | undefined;
			return Object.freeze({
				composition,
				dataDirectory: directories.state,
				initialState,
				ports,
				release: (): Promise<void> => release ??= cleanupResources(
					deviceHost,
					skiaHost,
					leaseDirectory,
				),
			});
		} catch (error) {
			try {
				await cleanupResources(deviceHost, skiaHost, leaseDirectory);
			} catch (cleanupError) {
				throw new AggregateError(
					[error, cleanupError],
					"AppPlugin-Adapter-Hostlease ist beim Aufbau und Aufräumen fehlgeschlagen",
				);
			}
			throw error;
		}
	};
}
