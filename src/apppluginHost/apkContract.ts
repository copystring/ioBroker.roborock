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
	evidence: ApkContractEvidence | null;
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

export function assertApkAppPluginHostContract(value: unknown): asserts value is ApkAppPluginHostContract {
	if (!isRecord(value) || value.schemaVersion !== 1) {
		throw new Error("Ungültiger APK-AppPlugin-Hostvertrag: schemaVersion fehlt.");
	}
	if (!isRecord(value.runtime) || value.runtime.engine !== "HERMES") {
		throw new Error("Ungültiger APK-AppPlugin-Hostvertrag: Hermes ist nicht festgeschrieben.");
	}
	if (!isRecord(value.host) || !Array.isArray(value.host.packages) || value.host.packages.length === 0) {
		throw new Error("Ungültiger APK-AppPlugin-Hostvertrag: React-Pakete fehlen.");
	}
	if (!Array.isArray(value.nativeModules) || !Array.isArray(value.viewManagers)) {
		throw new Error("Ungültiger APK-AppPlugin-Hostvertrag: Module oder View-Manager fehlen.");
	}
	if (value.nativeModules.some(module => !isRecord(module) || !Array.isArray(module.exportedConstants))) {
		throw new Error("Ungültiger APK-AppPlugin-Hostvertrag: exportierte Konstanten fehlen.");
	}
	if (value.viewManagers.some(view => !isRecord(view)
		|| typeof view.installedByHost !== "boolean"
		|| !Array.isArray(view.hostPackageIndices)
		|| !Array.isArray(view.nativeProps)
		|| !Array.isArray(view.bubblingEventTypes)
		|| !Array.isArray(view.directEventTypes)
		|| !Array.isArray(view.commands)
		|| !Array.isArray(view.viewConstants)
		|| view.viewConstants.some(constant => !isRecord(constant)
			|| typeof constant.name !== "string"
			|| !isApkViewManagerConstantValue(constant.value))
		|| !["none", "parsed", "unparsed"].includes(String(view.viewConstantsStatus)))) {
		throw new Error("Ungültiger APK-AppPlugin-Hostvertrag: ViewManager-Konfiguration fehlt.");
	}
}
