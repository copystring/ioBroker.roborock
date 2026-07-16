import type { ApkAppPluginHostContract } from "./apkContract";
import {
	MissingApkNativeMethodError,
	resolveEffectiveApkNativeModules,
	StrictApkNativeModuleRegistry,
} from "./strictNativeModuleRegistry";

export class ApkNativeModuleDispatcher {
	readonly #methodsByModule: Map<string, Set<string>>;

	public constructor(
		contract: ApkAppPluginHostContract,
		private readonly registry: StrictApkNativeModuleRegistry,
		private readonly onInvoke?: (moduleName: string, methodName: string, arguments_: readonly unknown[]) => void,
	) {
		this.#methodsByModule = new Map(resolveEffectiveApkNativeModules(contract).map(module => [
			module.moduleName,
			new Set(module.methods.map(method => method.name)),
		]));
	}

	public invoke(moduleName: string, methodName: string, arguments_: readonly unknown[]): unknown {
		this.onInvoke?.(moduleName, methodName, arguments_);
		if (!this.#methodsByModule.get(moduleName)?.has(methodName)) {
			throw new MissingApkNativeMethodError(moduleName, methodName);
		}
		const implementation = this.registry.get(moduleName);
		const method = implementation[methodName];
		if (typeof method !== "function") throw new MissingApkNativeMethodError(moduleName, methodName);
		return Reflect.apply(method, implementation, arguments_);
	}
}
