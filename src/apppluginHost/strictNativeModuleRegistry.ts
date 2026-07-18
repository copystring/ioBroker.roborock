import type {
	ApkAppPluginHostContract,
	ApkNativeModuleContract,
} from "./apkContract";

export type ApkNativeModuleImplementation = Record<string, unknown>;

interface RegisteredModule {
	contract: ApkNativeModuleContract;
	implementation: ApkNativeModuleImplementation;
}

export interface ApkNativeModuleImplementationCoverage {
	status: "complete" | "partial";
	effectiveModuleCount: number;
	registeredModuleCount: number;
	implementedModuleCount: number;
	implementedModules: readonly string[];
	partiallyImplementedModules: readonly Readonly<{
		moduleName: string;
		missingMethods: readonly string[];
	}>[];
	unimplementedModules: readonly string[];
}

export class MissingApkNativeModuleError extends Error {
	public constructor(public readonly moduleName: string) {
		super(`Das vom APK-Vertrag geforderte Native Module ${moduleName} ist nicht implementiert.`);
		this.name = "MissingApkNativeModuleError";
	}
}

export class MissingApkNativeMethodError extends Error {
	public constructor(public readonly moduleName: string, public readonly methodName: string) {
		super(`Die APK-Methode ${moduleName}.${methodName} ist nicht implementiert.`);
		this.name = "MissingApkNativeMethodError";
	}
}

export function resolveEffectiveApkNativeModules(
	contract: ApkAppPluginHostContract,
): ApkNativeModuleContract[] {
	const installed = contract.nativeModules
		.filter(module => module.installedByHost)
		.sort((left, right) =>
			Math.min(...left.hostPackageIndices) - Math.min(...right.hostPackageIndices),
		);
	const effective = new Map<string, ApkNativeModuleContract>();
	for (const module of installed) {
		const existing = effective.get(module.moduleName);
		if (existing && !module.canOverrideExistingModule) {
			throw new Error(
				`Die APK installiert ${module.moduleName} mehrfach, aber ${module.javaClass} erlaubt keinen Override.`,
			);
		}
		effective.set(module.moduleName, module);
	}
	return [...effective.values()];
}

export class StrictApkNativeModuleRegistry {
	private readonly effectiveByClass: Map<string, ApkNativeModuleContract>;
	private readonly effectiveByName: Map<string, ApkNativeModuleContract>;
	private readonly implementations = new Map<string, RegisteredModule>();

	public constructor(contract: ApkAppPluginHostContract) {
		const effective = resolveEffectiveApkNativeModules(contract);
		this.effectiveByClass = new Map(effective.map(module => [module.javaClass, module]));
		this.effectiveByName = new Map(effective.map(module => [module.moduleName, module]));
	}

	public register(javaClass: string, implementation: ApkNativeModuleImplementation): void {
		const module = this.effectiveByClass.get(javaClass);
		if (!module) {
			throw new Error(`Die Klasse ${javaClass} ist kein effektives Native Module des APK-Hosts.`);
		}
		if (this.implementations.has(module.moduleName)) {
			throw new Error(`Das effektive Native Module ${module.moduleName} wurde doppelt registriert.`);
		}
		this.implementations.set(module.moduleName, { contract: module, implementation });
	}

	public get(moduleName: string): ApkNativeModuleImplementation {
		const registered = this.implementations.get(moduleName);
		if (!registered) throw new MissingApkNativeModuleError(moduleName);
		return registered.implementation;
	}

	public assertImplements(requiredModuleNames?: readonly string[]): void {
		const required = requiredModuleNames
			? [...this.effectiveByName.values()].filter(module => requiredModuleNames.includes(module.moduleName))
			: [...this.effectiveByName.values()];
		for (const module of required) this.assertModule(module);
	}

	public registeredModuleNames(): string[] {
		return [...this.implementations.keys()].sort();
	}

	public implementationCoverage(): ApkNativeModuleImplementationCoverage {
		const effectiveModules = [...this.effectiveByName.keys()].sort();
		const registeredModules = this.registeredModuleNames();
		const unimplementedModules = effectiveModules.filter(moduleName =>
			!this.implementations.has(moduleName),
		);
		const partiallyImplementedModules: Array<{
			moduleName: string;
			missingMethods: string[];
		}> = [];
		const implementedModules: string[] = [];
		for (const moduleName of registeredModules) {
			const registered = this.implementations.get(moduleName)!;
			const missingMethods = registered.contract.methods
				.map(method => method.name)
				.filter(methodName => typeof registered.implementation[methodName] !== "function");
			if (missingMethods.length > 0) {
				partiallyImplementedModules.push({ moduleName, missingMethods });
			} else {
				implementedModules.push(moduleName);
			}
		}
		return {
			status: unimplementedModules.length === 0 && partiallyImplementedModules.length === 0
				? "complete"
				: "partial",
			effectiveModuleCount: effectiveModules.length,
			registeredModuleCount: registeredModules.length,
			implementedModuleCount: implementedModules.length,
			implementedModules,
			partiallyImplementedModules,
			unimplementedModules,
		};
	}

	private assertModule(module: ApkNativeModuleContract): void {
		const registered = this.implementations.get(module.moduleName);
		if (!registered) throw new MissingApkNativeModuleError(module.moduleName);
		for (const method of module.methods) {
			if (typeof registered.implementation[method.name] !== "function") {
				throw new MissingApkNativeMethodError(module.moduleName, method.name);
			}
		}
	}
}
