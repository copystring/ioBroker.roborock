import {
	resolveApkHermesHostArtifact,
	type ApkHermesHostArtifact,
} from "./apkHermesHostArtifact";
import type { ApkAppPluginDeviceModelContext } from "./apkAppPluginDeviceSessionRuntime";
import { ApkAppPluginModelRuntime } from "./apkAppPluginModelRuntime";
import {
	createApkAppPluginNativeModelRuntimeComposition,
	type ApkAppPluginNativeModelRuntimeCompositionOptions,
} from "./apkAppPluginNativeRuntimeComposition";
import {
	createApkAppPluginSharedNativeModuleBindings,
	type ApkAppPluginSharedNativeModuleRuntimes,
} from "./apkAppPluginSharedNativeModules";
import type {
	ApkAppPluginManagedModelRuntimeFactory,
	ApkAppPluginModelRuntimeRequest,
} from "./apkAppPluginSessionSupervisor";
import type { ApkAppPluginHostContract } from "./apkContract";

type DeviceNativeCompositionOptions = Omit<
	ApkAppPluginNativeModelRuntimeCompositionOptions,
	"bundlePath" | "contract" | "createModules" | "hostExecutablePath"
> & {
	readonly createSharedNativeModules: (
		uiManager: Parameters<ApkAppPluginNativeModelRuntimeCompositionOptions["createModules"]>[0],
	) => Readonly<ApkAppPluginSharedNativeModuleRuntimes>;
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
	return request => {
		const artifact = resolveApkHermesHostArtifact();
		const compositionOptions = options.createCompositionOptions(request, artifact);
		const { createSharedNativeModules, ...nativeOptions } = compositionOptions;
		return new ApkAppPluginModelRuntime(createApkAppPluginNativeModelRuntimeComposition({
			...nativeOptions,
			bundlePath: request.context.session.bundle.bundlePath,
			contract: options.contract,
			createModules: uiManager => createApkAppPluginSharedNativeModuleBindings(
				createSharedNativeModules(uiManager),
			),
			hostExecutablePath: artifact.executablePath,
		}));
	};
}
