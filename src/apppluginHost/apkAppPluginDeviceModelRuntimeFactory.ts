import { resolveApkHermesHostArtifact } from "./apkHermesHostArtifact";
import type { ApkAppPluginDeviceModelContext } from "./apkAppPluginDeviceSessionRuntime";
import { ApkAppPluginDeviceNativeRuntimeEnvironment } from "./apkAppPluginDeviceNativeRuntimeEnvironment";
import type {
	ApkAppPluginDeviceRuntimeHostLease,
	ApkAppPluginDeviceRuntimeHostProvider,
} from "./apkAppPluginDeviceRuntimeHostProvider";
import { ApkAppPluginModelRuntime } from "./apkAppPluginModelRuntime";
import { createApkAppPluginNativeModelRuntimeComposition } from "./apkAppPluginNativeRuntimeComposition";
import {
	createApkAppPluginSharedNativeModuleBindings,
} from "./apkAppPluginSharedNativeModules";
import type {
	ApkAppPluginManagedModelRuntimeFactory,
} from "./apkAppPluginSessionSupervisor";
import type { ApkAppPluginHostContract } from "./apkContract";

export interface ApkAppPluginDeviceModelRuntimeFactoryOptions {
	readonly contract: ApkAppPluginHostContract;
	readonly hostProvider: ApkAppPluginDeviceRuntimeHostProvider;
}

async function disposeRuntimeResources(
	nativeRuntime: ApkAppPluginDeviceNativeRuntimeEnvironment | undefined,
	hostLease: Readonly<ApkAppPluginDeviceRuntimeHostLease>,
	detachDeviceIngress: (() => void | Promise<void>) | undefined,
): Promise<void> {
	const errors: unknown[] = [];
	if (detachDeviceIngress) {
		try {
			await detachDeviceIngress();
		} catch (error) {
			errors.push(error);
		}
	}
	const operations = [Promise.resolve().then(() => hostLease.release())];
	if (nativeRuntime) {
		operations.unshift(Promise.resolve().then(() => nativeRuntime.dispose()));
	}
	const results = await Promise.allSettled(operations);
	errors.push(...results
		.filter((result): result is PromiseRejectedResult => result.status === "rejected")
		.map(result => result.reason));
	if (errors.length > 0) {
		throw new AggregateError(errors, "APK-Modellkomposition konnte nicht sauber beendet werden");
	}
}

/**
 * Production composition boundary used directly by the device-session
 * supervisor. The unchanged bundle path comes only from the verified installed
 * package and the native executable only from the packaged host resolver.
 */
export function createApkAppPluginDeviceModelRuntimeFactory(
	options: Readonly<ApkAppPluginDeviceModelRuntimeFactoryOptions>,
): ApkAppPluginManagedModelRuntimeFactory<ApkAppPluginModelRuntime, ApkAppPluginDeviceModelContext> {
	return async request => {
		const descriptor = request.context.session.descriptor.device;
		if (descriptor.deviceId !== request.deviceId
			|| descriptor.model !== request.model
			|| descriptor.activeTime !== request.activeTime) {
			throw new Error("AppPlugin-Modellanforderung stimmt nicht mit dem APK-Gerätekontext überein");
		}
		const artifact = resolveApkHermesHostArtifact();
		const hostLease = await options.hostProvider.acquire(request, artifact);
		let nativeRuntime: ApkAppPluginDeviceNativeRuntimeEnvironment | undefined;
		let detachDeviceIngress: (() => void | Promise<void>) | undefined;
		let disposal: Promise<void> | undefined;
		const disposeComposition = (): Promise<void> => {
			disposal ??= disposeRuntimeResources(nativeRuntime, hostLease, detachDeviceIngress);
			return disposal;
		};
		try {
			const createdNativeRuntime = new ApkAppPluginDeviceNativeRuntimeEnvironment({
				context: request.context,
				contract: options.contract,
				dataDirectory: hostLease.dataDirectory,
				initialState: hostLease.initialState,
				ports: hostLease.ports,
			});
			nativeRuntime = createdNativeRuntime;
			return new ApkAppPluginModelRuntime(createApkAppPluginNativeModelRuntimeComposition({
				...hostLease.composition,
				bundlePath: request.context.session.bundle.bundlePath,
				constantSources: createdNativeRuntime.constantSources(),
				contract: options.contract,
				createModules: uiManager => createApkAppPluginSharedNativeModuleBindings(
					createdNativeRuntime.createSharedNativeModules(uiManager),
				),
				dispose: disposeComposition,
				hostExecutablePath: artifact.executablePath,
				onCompositionCreated: composition => {
					createdNativeRuntime.attachComposition(composition);
					detachDeviceIngress ??= hostLease.attachDeviceIngress?.(
						createdNativeRuntime.deviceIngress(),
					);
				},
			}));
		} catch (error) {
			try {
				await disposeComposition();
			} catch (disposeError) {
				throw new AggregateError(
					[error, disposeError],
					"APK-Modellkomposition ist beim Aufbau und Aufräumen fehlgeschlagen",
				);
			}
			throw error;
		}
	};
}
