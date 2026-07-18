export interface ApkContractEvidence {
	file: string;
	line: number;
	sha256: string;
}

export interface ApkReactMethodContract {
	name: string;
	returnType: string;
	parameters: string;
	blockingSynchronous: boolean;
	line: number;
}

export interface ApkExportedConstantContract {
	name: string;
	valueExpression: string;
	methodName: string;
	evidence: ApkContractEvidence;
}

export interface ApkNativeModuleContract {
	javaClass: string;
	moduleName: string;
	installedByHost: boolean;
	hostPackageIndices: number[];
	canOverrideExistingModule: boolean;
	methods: ApkReactMethodContract[];
	events: string[];
	exportedConstants: ApkExportedConstantContract[];
	evidence: ApkContractEvidence;
}

export interface ApkNativePropContract {
	name: string;
	type: string;
	evidence: ApkContractEvidence;
}

export interface ApkBubblingEventContract {
	topLevelName: string;
	bubbled: string;
	captured: string;
	skipBubbling: boolean;
	evidence: ApkContractEvidence;
}

export interface ApkDirectEventContract {
	topLevelName: string;
	registrationName: string;
	evidence: ApkContractEvidence;
}

export interface ApkViewManagerCommandContract {
	name: string;
	value: number;
	evidence: ApkContractEvidence;
}

export type ApkViewManagerConstantValue =
	| string
	| number
	| boolean
	| null
	| ApkViewManagerConstantValue[]
	| { [name: string]: ApkViewManagerConstantValue };

export interface ApkViewManagerConstantContract {
	name: string;
	value: ApkViewManagerConstantValue;
	evidence: ApkContractEvidence;
}

export interface ApkViewManagerContract {
	javaClass: string;
	viewName: string;
	installedByHost: boolean;
	hostPackageIndices: number[];
	nativeViewClasses: string[];
	props: string[];
	nativeProps: ApkNativePropContract[];
	bubblingEventTypes: ApkBubblingEventContract[];
	directEventTypes: ApkDirectEventContract[];
	commands: ApkViewManagerCommandContract[];
	viewConstantsStatus: "none" | "parsed" | "unparsed";
	viewConstants: ApkViewManagerConstantContract[];
	nativeMethods: string[];
	evidence: ApkContractEvidence;
}

export interface ApkReactPackageContract {
	expression: string;
	javaClass: string;
	variant: number | null;
	nativeModuleClasses: string[];
	viewManagerClasses: string[];
	evidence: ApkContractEvidence;
}

export interface ApkAppPluginHostContract {
	schemaVersion: 1;
	apk: {
		decompiledRoot: string;
		identity: string;
	};
	runtime: {
		engine: "HERMES";
		bundlePathPattern: string;
		mainModuleName: string;
		lifecycleState: "BEFORE_CREATE";
	};
	host: {
		javaClass: string;
		packages: ApkReactPackageContract[];
		evidence: ApkContractEvidence;
	};
	nativeModules: ApkNativeModuleContract[];
	viewManagers: ApkViewManagerContract[];
	skia: {
		library: "rnskia";
		moduleName: "RNSkiaModule";
		managerClass: string;
		pictureView: string;
		domView: string;
	};
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function isApkViewManagerConstantValue(value: unknown): value is ApkViewManagerConstantValue {
	if (value === null || ["string", "number", "boolean"].includes(typeof value)) return true;
	if (Array.isArray(value)) return value.every(isApkViewManagerConstantValue);
	return isRecord(value) && Object.values(value).every(isApkViewManagerConstantValue);
}

function invalidContract(detail: string): never {
	throw new Error(`Ungültiger APK-AppPlugin-Hostvertrag: ${detail}.`);
}

function isNonEmptyString(value: unknown): value is string {
	return typeof value === "string" && value.trim().length > 0;
}

function assertEvidence(value: unknown, context: string): asserts value is ApkContractEvidence {
	if (!isRecord(value)
		|| !isNonEmptyString(value.file)
		|| /^(?:[A-Za-z]:|[\\/])/u.test(value.file)
		|| value.file.split(/[\\/]/u).includes("..")
		|| !Number.isSafeInteger(value.line)
		|| Number(value.line) < 1
		|| typeof value.sha256 !== "string"
		|| !/^[a-f0-9]{64}$/u.test(value.sha256)) {
		invalidContract(`${context} besitzt keine sichere APK-Evidenz`);
	}
}

function assertStringArray(value: unknown, context: string): asserts value is string[] {
	if (!Array.isArray(value) || value.some(item => !isNonEmptyString(item))) {
		invalidContract(`${context} muss eine Liste nichtleerer Strings sein`);
	}
}

function assertUnique(values: readonly string[], context: string): void {
	if (new Set(values).size !== values.length) invalidContract(`${context} enthält Duplikate`);
}

function assertPackageIndices(
	value: unknown,
	packageCount: number,
	installedByHost: boolean,
	context: string,
): asserts value is number[] {
	if (!Array.isArray(value)
		|| value.some(index => !Number.isSafeInteger(index) || index < 0 || index >= packageCount)
		|| new Set(value).size !== value.length
		|| installedByHost && value.length === 0) {
		invalidContract(`${context} besitzt ungültige Host-Paketindizes`);
	}
}

export function assertApkAppPluginHostContract(value: unknown): asserts value is ApkAppPluginHostContract {
	if (!isRecord(value) || value.schemaVersion !== 1) {
		invalidContract("schemaVersion fehlt");
	}
	if (!isRecord(value.apk)
		|| !isNonEmptyString(value.apk.decompiledRoot)
		|| !isNonEmptyString(value.apk.identity)) {
		invalidContract("APK-Identität fehlt");
	}
	if (!isRecord(value.runtime)
		|| value.runtime.engine !== "HERMES"
		|| !isNonEmptyString(value.runtime.bundlePathPattern)
		|| !isNonEmptyString(value.runtime.mainModuleName)
		|| value.runtime.lifecycleState !== "BEFORE_CREATE") {
		invalidContract("Hermes-Laufzeitvertrag ist unvollständig");
	}
	if (!isRecord(value.host)
		|| !isNonEmptyString(value.host.javaClass)
		|| !Array.isArray(value.host.packages)
		|| value.host.packages.length === 0) {
		invalidContract("React-Pakete fehlen");
	}
	assertEvidence(value.host.evidence, "Host");
	for (const [index, packageItem] of value.host.packages.entries()) {
		if (!isRecord(packageItem)
			|| !isNonEmptyString(packageItem.expression)
			|| !isNonEmptyString(packageItem.javaClass)
			|| packageItem.variant !== null && !Number.isSafeInteger(packageItem.variant)) {
			invalidContract(`React-Paket ${index} ist unvollständig`);
		}
		assertStringArray(packageItem.nativeModuleClasses, `React-Paket ${index}.nativeModuleClasses`);
		assertStringArray(packageItem.viewManagerClasses, `React-Paket ${index}.viewManagerClasses`);
		assertUnique(packageItem.nativeModuleClasses, `React-Paket ${index}.nativeModuleClasses`);
		assertUnique(packageItem.viewManagerClasses, `React-Paket ${index}.viewManagerClasses`);
		assertEvidence(packageItem.evidence, `React-Paket ${index}`);
	}
	if (!Array.isArray(value.nativeModules) || !Array.isArray(value.viewManagers)) {
		invalidContract("Module oder View-Manager fehlen");
	}
	const moduleClasses: string[] = [];
	for (const [index, module] of value.nativeModules.entries()) {
		if (!isRecord(module)
			|| !isNonEmptyString(module.javaClass)
			|| !isNonEmptyString(module.moduleName)
			|| typeof module.installedByHost !== "boolean"
			|| typeof module.canOverrideExistingModule !== "boolean"
			|| !Array.isArray(module.methods)
			|| !Array.isArray(module.exportedConstants)) {
			invalidContract(`Native Module ${index} ist unvollständig`);
		}
		moduleClasses.push(module.javaClass);
		assertPackageIndices(
			module.hostPackageIndices,
			value.host.packages.length,
			module.installedByHost,
			`Native Module ${module.moduleName}`,
		);
		assertStringArray(module.events, `Native Module ${module.moduleName}.events`);
		assertUnique(module.events, `Native Module ${module.moduleName}.events`);
		assertEvidence(module.evidence, `Native Module ${module.moduleName}`);
		const methodNames: string[] = [];
		for (const method of module.methods) {
			if (!isRecord(method)
				|| !isNonEmptyString(method.name)
				|| !isNonEmptyString(method.returnType)
				|| typeof method.parameters !== "string"
				|| typeof method.blockingSynchronous !== "boolean"
				|| !Number.isSafeInteger(method.line)
				|| Number(method.line) < 1) {
				invalidContract(`Native Module ${module.moduleName} enthält eine ungültige React-Methode`);
			}
			methodNames.push(method.name);
		}
		assertUnique(methodNames, `Native Module ${module.moduleName}.methods`);
		const constantNames: string[] = [];
		for (const constant of module.exportedConstants) {
			if (!isRecord(constant)
				|| !isNonEmptyString(constant.name)
				|| typeof constant.valueExpression !== "string"
				|| !isNonEmptyString(constant.methodName)) {
				invalidContract(`Native Module ${module.moduleName} enthält eine ungültige exportierte Konstante`);
			}
			constantNames.push(constant.name);
			assertEvidence(constant.evidence, `Native Module ${module.moduleName}.${constant.name}`);
		}
		assertUnique(constantNames, `Native Module ${module.moduleName}.exportedConstants`);
	}
	assertUnique(moduleClasses, "nativeModules.javaClass");

	const viewClasses: string[] = [];
	for (const [index, view] of value.viewManagers.entries()) {
		if (!isRecord(view)
			|| !isNonEmptyString(view.javaClass)
			|| !isNonEmptyString(view.viewName)
			|| typeof view.installedByHost !== "boolean"
			|| !Array.isArray(view.nativeProps)
			|| !Array.isArray(view.bubblingEventTypes)
			|| !Array.isArray(view.directEventTypes)
			|| !Array.isArray(view.commands)
			|| !Array.isArray(view.viewConstants)
			|| !["none", "parsed", "unparsed"].includes(String(view.viewConstantsStatus))) {
			invalidContract(`View-Manager ${index} ist unvollständig`);
		}
		viewClasses.push(view.javaClass);
		assertPackageIndices(
			view.hostPackageIndices,
			value.host.packages.length,
			view.installedByHost,
			`View-Manager ${view.viewName}`,
		);
		assertStringArray(view.nativeViewClasses, `View-Manager ${view.viewName}.nativeViewClasses`);
		assertStringArray(view.props, `View-Manager ${view.viewName}.props`);
		assertStringArray(view.nativeMethods, `View-Manager ${view.viewName}.nativeMethods`);
		assertUnique(view.nativeViewClasses, `View-Manager ${view.viewName}.nativeViewClasses`);
		assertUnique(view.props, `View-Manager ${view.viewName}.props`);
		assertUnique(view.nativeMethods, `View-Manager ${view.viewName}.nativeMethods`);
		assertEvidence(view.evidence, `View-Manager ${view.viewName}`);

		const propNames: string[] = [];
		for (const prop of view.nativeProps) {
			if (!isRecord(prop) || !isNonEmptyString(prop.name) || !isNonEmptyString(prop.type)) {
				invalidContract(`View-Manager ${view.viewName} enthält eine ungültige NativeProp`);
			}
			propNames.push(prop.name);
			assertEvidence(prop.evidence, `View-Manager ${view.viewName}.${prop.name}`);
		}
		assertUnique(propNames, `View-Manager ${view.viewName}.nativeProps`);
		if (JSON.stringify(propNames) !== JSON.stringify(view.props)) {
			invalidContract(`View-Manager ${view.viewName}.props widerspricht nativeProps`);
		}
		for (const event of view.bubblingEventTypes) {
			if (!isRecord(event)
				|| !isNonEmptyString(event.topLevelName)
				|| !isNonEmptyString(event.bubbled)
				|| !isNonEmptyString(event.captured)
				|| typeof event.skipBubbling !== "boolean") {
				invalidContract(`View-Manager ${view.viewName} enthält ein ungültiges Bubbling-Event`);
			}
			assertEvidence(event.evidence, `View-Manager ${view.viewName}.${event.topLevelName}`);
		}
		assertUnique(
			view.bubblingEventTypes.map(event => (event as Record<string, unknown>).topLevelName as string),
			`View-Manager ${view.viewName}.bubblingEventTypes`,
		);
		for (const event of view.directEventTypes) {
			if (!isRecord(event)
				|| !isNonEmptyString(event.topLevelName)
				|| !isNonEmptyString(event.registrationName)) {
				invalidContract(`View-Manager ${view.viewName} enthält ein ungültiges direktes Event`);
			}
			assertEvidence(event.evidence, `View-Manager ${view.viewName}.${event.topLevelName}`);
		}
		assertUnique(
			view.directEventTypes.map(event => (event as Record<string, unknown>).topLevelName as string),
			`View-Manager ${view.viewName}.directEventTypes`,
		);
		const commandNames: string[] = [];
		for (const command of view.commands) {
			if (!isRecord(command) || !isNonEmptyString(command.name) || !Number.isSafeInteger(command.value)) {
				invalidContract(`View-Manager ${view.viewName} enthält ein ungültiges Command`);
			}
			commandNames.push(command.name);
			assertEvidence(command.evidence, `View-Manager ${view.viewName}.${command.name}`);
		}
		assertUnique(commandNames, `View-Manager ${view.viewName}.commands`);
		const constantNames: string[] = [];
		for (const constant of view.viewConstants) {
			if (!isRecord(constant)
				|| !isNonEmptyString(constant.name)
				|| !isApkViewManagerConstantValue(constant.value)) {
				invalidContract(`View-Manager ${view.viewName} enthält eine ungültige Konstante`);
			}
			constantNames.push(constant.name);
			assertEvidence(constant.evidence, `View-Manager ${view.viewName}.${constant.name}`);
		}
		assertUnique(constantNames, `View-Manager ${view.viewName}.viewConstants`);
		if ((view.viewConstantsStatus === "none") !== (view.viewConstants.length === 0)
			|| view.viewConstantsStatus === "unparsed") {
			invalidContract(`View-Manager ${view.viewName} besitzt einen inkonsistenten Konstantenstatus`);
		}
	}
	assertUnique(viewClasses, "viewManagers.javaClass");

	if (!isRecord(value.skia)
		|| value.skia.library !== "rnskia"
		|| value.skia.moduleName !== "RNSkiaModule"
		|| !isNonEmptyString(value.skia.managerClass)
		|| !isNonEmptyString(value.skia.pictureView)
		|| !isNonEmptyString(value.skia.domView)) {
		invalidContract("Skia-Vertrag ist unvollständig");
	}
}
