import { mkdirSync, writeFileSync } from "node:fs";
import * as path from "node:path";

import type { ApkAndroidTextLayoutBackend } from "./apkAndroidTextMeasureRuntime";
import type { ApkAppPluginModelRuntimeComposition } from "./apkAppPluginModelRuntime";
import {
	createApkBridgeBootstrap,
	createApkRemoteModuleDefinitions,
	type ApkNativeModuleConstants,
	type ApkRemoteModuleDefinition,
} from "./apkBridgeBootstrap";
import type { ApkAppPluginHostContract } from "./apkContract";
import { mergeApkNativeModuleConstants } from "./apkCoreRuntimeConstants";
import {
	ApkHermesHostSession,
	type ApkHermesHostSessionOptions,
} from "./apkHermesHostSession";
import { ApkNativeModuleDispatcher } from "./apkNativeModuleDispatcher";
import type { ApkUiManagerRuntime } from "./apkUiManagerRuntime";
import {
	resolveEffectiveApkNativeModules,
	StrictApkNativeModuleRegistry,
	type ApkNativeModuleImplementation,
	type ApkNativeModuleImplementationCoverage,
} from "./strictNativeModuleRegistry";

export interface ApkNativeModuleBinding {
	readonly moduleName: string;
	readonly implementation: ApkNativeModuleImplementation;
}

/** Collects named APK modules without leaking decompiled Java class names into callers. */
export class ApkNativeModuleBindingBuilder {
	readonly #bindings = new Map<string, ApkNativeModuleImplementation>();

	public register(moduleName: string, implementation: ApkNativeModuleImplementation): void {
		if (typeof moduleName !== "string" || moduleName.length === 0) {
			throw new Error("Native APK-Modulname darf nicht leer sein");
		}
		if (moduleName === "UIManager") {
			throw new Error("UIManager wird ausschließlich von der Modell-Runtime gebunden");
		}
		if (this.#bindings.has(moduleName)) {
			throw new Error(`Native APK-Modulbindung ${moduleName} ist doppelt vorhanden`);
		}
		this.#bindings.set(moduleName, implementation);
	}

	public bindings(): readonly Readonly<ApkNativeModuleBinding>[] {
		return Object.freeze([...this.#bindings.entries()].map(([moduleName, implementation]) =>
			Object.freeze({ moduleName, implementation })
		));
	}
}

export interface ApkAppPluginNativeRuntimeCompositionOptions extends Omit<
	ApkHermesHostSessionOptions,
	"definitions" | "dispatcher"
> {
	contract: ApkAppPluginHostContract;
	constantSources: readonly ApkNativeModuleConstants[];
	uiManager: ApkUiManagerRuntime;
	modules: readonly Readonly<ApkNativeModuleBinding>[];
	bootstrapSuffix?: string;
	onNativeInvocation?: (
		moduleName: string,
		methodName: string,
		arguments_: readonly unknown[],
	) => void;
}

export interface ApkAppPluginNativeRuntimeComposition {
	readonly bootstrapSource: string;
	readonly definitions: readonly Readonly<ApkRemoteModuleDefinition>[];
	readonly implementationCoverage: Readonly<ApkNativeModuleImplementationCoverage>;
	readonly registry: StrictApkNativeModuleRegistry;
	readonly dispatcher: ApkNativeModuleDispatcher;
	readonly session: ApkHermesHostSession;
}

function registerNativeModules(
	contract: ApkAppPluginHostContract,
	uiManager: ApkUiManagerRuntime,
	bindings: readonly Readonly<ApkNativeModuleBinding>[],
): StrictApkNativeModuleRegistry {
	const effectiveByName = new Map(resolveEffectiveApkNativeModules(contract).map(module => [
		module.moduleName,
		module,
	] as const));
	const uiManagerContract = effectiveByName.get("UIManager");
	if (!uiManagerContract) {
		throw new Error("Der APK-Hostvertrag enthält kein effektives UIManager-Modul");
	}
	const registry = new StrictApkNativeModuleRegistry(contract);
	registry.register(
		uiManagerContract.javaClass,
		uiManager as unknown as ApkNativeModuleImplementation,
	);
	const seen = new Set<string>(["UIManager"]);
	for (const binding of bindings) {
		if (seen.has(binding.moduleName)) {
			throw new Error(`Native APK-Modulbindung ${binding.moduleName} ist doppelt vorhanden`);
		}
		seen.add(binding.moduleName);
		const module = effectiveByName.get(binding.moduleName);
		if (!module) {
			throw new Error(`${binding.moduleName} ist kein effektives Native Module des APK-Hosts`);
		}
		registry.register(module.javaClass, binding.implementation);
	}
	return registry;
}

/**
 * Single composition root for the unchanged bundle's constants, native
 * modules, Skia bridge and Hermes process. It contains no product semantics.
 */
export function createApkAppPluginNativeRuntimeComposition(
	options: Readonly<ApkAppPluginNativeRuntimeCompositionOptions>,
): Readonly<ApkAppPluginNativeRuntimeComposition> {
	const {
		contract,
		constantSources,
		uiManager,
		modules,
		bootstrapSuffix = "",
		onNativeInvocation,
		...sessionOptions
	} = options;
	const constants = mergeApkNativeModuleConstants(...constantSources);
	const registry = registerNativeModules(contract, uiManager, modules);
	const definitions = createApkRemoteModuleDefinitions(contract, constants);
	const bootstrapSource = createApkBridgeBootstrap(contract, constants) + bootstrapSuffix;
	mkdirSync(path.dirname(sessionOptions.bootstrapPath), { recursive: true });
	writeFileSync(sessionOptions.bootstrapPath, bootstrapSource, "utf8");
	const dispatcher = new ApkNativeModuleDispatcher(
		contract,
		registry,
		onNativeInvocation,
	);
	const session = new ApkHermesHostSession({
		...sessionOptions,
		definitions,
		dispatcher,
	});
	return Object.freeze({
		bootstrapSource,
		definitions: Object.freeze(definitions),
		implementationCoverage: Object.freeze(registry.implementationCoverage()),
		registry,
		dispatcher,
		session,
	});
}

export interface ApkAppPluginNativeModelRuntimeCompositionOptions extends Omit<
	ApkAppPluginNativeRuntimeCompositionOptions,
	"uiManager" | "modules"
> {
	textLayoutBackend: ApkAndroidTextLayoutBackend;
	createModules(uiManager: ApkUiManagerRuntime): readonly Readonly<ApkNativeModuleBinding>[];
	onCompositionCreated?: (
		composition: Readonly<ApkAppPluginNativeRuntimeComposition>,
	) => void;
	prepareStop?(): void | Promise<void>;
	dispose?(): void | Promise<void>;
}

/** Adapts the native composition root to ApkAppPluginModelRuntime. */
export function createApkAppPluginNativeModelRuntimeComposition(
	options: Readonly<ApkAppPluginNativeModelRuntimeCompositionOptions>,
): Readonly<ApkAppPluginModelRuntimeComposition> {
	const {
		textLayoutBackend,
		createModules,
		onCompositionCreated,
		prepareStop,
		dispose,
		...nativeOptions
	} = options;
	return Object.freeze({
		contract: nativeOptions.contract,
		textLayoutBackend,
		createSession: (uiManager: ApkUiManagerRuntime) => {
			const composition = createApkAppPluginNativeRuntimeComposition({
				...nativeOptions,
				uiManager,
				modules: createModules(uiManager),
			});
			onCompositionCreated?.(composition);
			return composition.session;
		},
		prepareStop,
		dispose,
	});
}
