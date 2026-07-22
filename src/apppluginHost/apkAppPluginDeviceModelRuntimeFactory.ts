import {
	resolveApkHermesHostArtifact,
	type ApkHermesHostArtifact,
} from "./apkHermesHostArtifact";
import type { ApkAppPluginDeviceModelContext } from "./apkAppPluginDeviceSessionRuntime";
import type { ApkAppPluginDeviceNativeRuntimeEnvironment } from "./apkAppPluginDeviceNativeRuntimeEnvironment";
import { ApkAppPluginModelRuntime } from "./apkAppPluginModelRuntime";
import {
	createApkAppPluginNativeModelRuntimeComposition,
	type ApkAppPluginNativeModelRuntimeCompositionOptions,
} from "./apkAppPluginNativeRuntimeComposition";
import {
	createApkAppPluginSharedNativeModuleBindings,
} from "./apkAppPluginSharedNativeModules";
import type {
	ApkAppPluginManagedModelRuntimeFactory,
	ApkAppPluginModelRuntimeRequest,
} from "./apkAppPluginSessionSupervisor";
import type { ApkAppPluginHostContract } from "./apkContract";

type DeviceNativeCompositionOptions = Omit<
	ApkAppPluginNativeModelRuntimeCompositionOptions,
	| "bundlePath"
	| "constantSources"
	| "contract"
	| "createModules"
	| "hostExecutablePath"
> & {
	readonly nativeRuntime: ApkAppPluginDeviceNativeRuntimeEnvironment;
};

export interface ApkAppPluginDeviceModelRuntimeFactoryOptions {
	readonly contract: ApkAppPluginHostContract;
	readonly createCompositionOptions: (
		request: Readonly<ApkAppPluginModelRuntimeRequest<ApkAppPluginDeviceModelContext>>,
		artifact: Readonly<ApkHermesHostArtifact>,
	) => Readonly<DeviceNativeCompositionOptions>;
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
		const compositionOptions = options.createCompositionOptions(request, artifact);
		const {
			nativeRuntime,
			onCompositionCreated,
			dispose,
			...nativeOptions
		} = compositionOptions;
		const disposeComposition = async (): Promise<void> => {
			const results = await Promise.allSettled([
				nativeRuntime.dispose(),
				Promise.resolve().then(() => dispose?.()),
			]);
			const errors = results
				.filter((result): result is PromiseRejectedResult => result.status === "rejected")
				.map(result => result.reason);
			if (errors.length > 0) {
				throw new AggregateError(errors, "APK-Modellkomposition konnte nicht sauber beendet werden");
			}
		};
		try {
			return new ApkAppPluginModelRuntime(createApkAppPluginNativeModelRuntimeComposition({
				...nativeOptions,
				bundlePath: request.context.session.bundle.bundlePath,
				constantSources: nativeRuntime.constantSources(),
				contract: options.contract,
				createModules: uiManager => createApkAppPluginSharedNativeModuleBindings(
					nativeRuntime.createSharedNativeModules(uiManager),
				),
				dispose: disposeComposition,
				hostExecutablePath: artifact.executablePath,
				onCompositionCreated: composition => {
					nativeRuntime.attachComposition(composition);
					onCompositionCreated?.(composition);
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
