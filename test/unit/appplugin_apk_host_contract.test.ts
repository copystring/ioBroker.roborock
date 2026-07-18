import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import contractJson from "../../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import {
	assertApkAppPluginHostContract,
	loadApkPluginBundle,
	MissingApkNativeMethodError,
	MissingApkNativeModuleError,
	resolveEffectiveApkNativeModules,
	StrictApkNativeModuleRegistry,
	type ApkAppPluginHostContract,
} from "../../src/apppluginHost";

const repositoryRoot = path.resolve(__dirname, "..", "..");
const contract = contractJson as ApkAppPluginHostContract;

function hashFile(filePath: string): string {
	return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function walkFiles(root: string): string[] {
	return fs.readdirSync(root, { withFileTypes: true }).flatMap(entry => {
		const fullPath = path.join(root, entry.name);
		return entry.isDirectory() ? walkFiles(fullPath) : [fullPath];
	});
}

describe("APK-derived AppPlugin host contract", () => {
	it("derives the runtime and complete package list from the APK host", () => {
		expect(() => assertApkAppPluginHostContract(contract)).not.toThrow();
		expect(contract.runtime).toEqual({
			engine: "HERMES",
			bundlePathPattern: "<filesDir>/plugin_v3/<model>/index.android.bundle",
			mainModuleName: "index",
			lifecycleState: "BEFORE_CREATE",
		});
		expect(contract.host.javaClass).toBe("com.roborock.smart.react.OooO");
		expect(contract.host.packages).toHaveLength(24);
		expect(contract.host.packages.map(item => item.expression)).toContain(
			"<ReactInstanceManager:CoreModulesPackage>",
		);
		expect(contract.host.packages.map(item => item.javaClass)).toContain("com.shopify.reactnative.skia.RNSkiaPackage");
		expect(contract.nativeModules.find(module => module.moduleName === "UIManager")?.installedByHost).toBe(true);
		expect(contract.nativeModules.find(module => module.moduleName === "ExceptionsManager")?.installedByHost).toBe(true);
		const installedViewManagerClasses = new Set(
			contract.host.packages.flatMap(item => item.viewManagerClasses),
		);
		expect(new Set(
			contract.viewManagers.filter(view => view.installedByHost).map(view => view.javaClass),
		)).toEqual(installedViewManagerClasses);
		expect(contract.viewManagers.find(view => view.viewName === "RCTView")?.javaClass)
			.toBe("com.facebook.react.views.view.ReactViewManager");

		const svgPackage = contract.host.packages.find(item => item.javaClass === "com.horcrux.svg.SvgPackage");
		const expectedSvgViewManagers = new Set([
			"RNSVGCircle",
			"RNSVGClipPath",
			"RNSVGDefs",
			"RNSVGEllipse",
			"RNSVGForeignObject",
			"RNSVGGroup",
			"RNSVGImage",
			"RNSVGLine",
			"RNSVGLinearGradient",
			"RNSVGMarker",
			"RNSVGMask",
			"RNSVGPath",
			"RNSVGPattern",
			"RNSVGRadialGradient",
			"RNSVGRect",
			"RNSVGSvgViewAndroid",
			"RNSVGSymbol",
			"RNSVGTSpan",
			"RNSVGText",
			"RNSVGTextPath",
			"RNSVGUse",
		]);
		expect(svgPackage?.viewManagerClasses).toHaveLength(expectedSvgViewManagers.size);
		expect(new Set(
			contract.viewManagers
				.filter(view => view.installedByHost && view.viewName.startsWith("RNSVG"))
				.map(view => view.viewName),
		)).toEqual(expectedSvgViewManagers);
		expect(contract.viewManagers.find(view => view.viewName === "RNSVGRect")?.nativeProps)
			.toEqual(expect.arrayContaining([
				expect.objectContaining({ name: "fill", type: "mixed" }),
				expect.objectContaining({ name: "height", type: "mixed" }),
				expect.objectContaining({ name: "width", type: "mixed" }),
				expect.objectContaining({ name: "x", type: "mixed" }),
				expect.objectContaining({ name: "y", type: "mixed" }),
			]));
		expect(contract.viewManagers.find(view => view.viewName === "RNSVGLinearGradient")?.nativeProps)
			.toEqual(expect.arrayContaining([
				expect.objectContaining({ name: "gradient", type: "Array" }),
				expect.objectContaining({ name: "x1", type: "mixed" }),
				expect.objectContaining({ name: "y2", type: "mixed" }),
			]));
		expect(contract.viewManagers.filter(view => view.viewConstantsStatus === "unparsed")).toEqual([]);
		expect(contract.viewManagers.find(view => view.viewName === "AndroidTextInput")?.viewConstants)
			.toEqual([expect.objectContaining({
				name: "AutoCapitalizationType",
				value: {
					none: 0,
					characters: 0x1000,
					words: 0x2000,
					sentences: 0x4000,
				},
			})]);
		expect(contract.viewManagers.find(view => view.viewName === "AndroidDrawerLayout")?.viewConstants)
			.toEqual([expect.objectContaining({
				name: "DrawerPosition",
				value: { Left: 0x800003, Right: 0x800005 },
			})]);
		expect(contract.viewManagers.find(view => view.viewName === "AndroidSwipeRefreshLayout")?.viewConstants)
			.toEqual([expect.objectContaining({
				name: "SIZE",
				value: { DEFAULT: 1, LARGE: 0 },
			})]);
		expect(contract.viewManagers.find(view => view.viewName === "RCTVideo")?.viewConstants)
			.toEqual(expect.arrayContaining([
				expect.objectContaining({ name: "ScaleNone", value: "5" }),
				expect.objectContaining({ name: "ScaleAspectFill", value: "18" }),
			]));
	});

	it("captures inherited methods, callback events and native Skia touch entrypoints", () => {
		const device = contract.nativeModules.find(module => module.moduleName === "RRPluginDevice" && module.installedByHost);
		expect(device?.methods.map(method => method.name)).toEqual([
			"addListener",
			"connectDeviceByLANIfNeeded",
			"getDeviceOnlineStatus",
			"loadDps",
			"publishDps",
			"removeListeners",
		]);
		expect(device?.events).toContain("RRDeviceBlobPayloadUpdateEvent");
		expect(device?.events).toContain("RRDeviceDpsUpdateEvent");

		const stateSync = contract.nativeModules.find(module =>
			module.javaClass.endsWith(".RRPluginStateSyncTurboModule") && module.installedByHost,
		);
		expect(stateSync?.methods.map(method => method.name)).toContain("triggerLogin");
		expect(stateSync?.methods.map(method => method.name)).toContain("loadFeatureCache");

		const skiaModule = contract.nativeModules.find(module => module.moduleName === "RNSkiaModule");
		expect(skiaModule?.methods).toContainEqual(expect.objectContaining({
			name: "install",
			blockingSynchronous: true,
		}));
		const pictureView = contract.viewManagers.find(view => view.viewName === "SkiaPictureView");
		expect(pictureView?.nativeViewClasses).toContain("com.shopify.reactnative.skia.SkiaPictureView");
		expect(pictureView?.nativeMethods).toContain("updateTouchPoints");
		expect(pictureView?.nativeMethods).toContain("surfaceAvailable");
	});


	it("captures the exact RRPluginSDK constant contract from the APK", () => {
		const pluginSdk = contract.nativeModules.find(module =>
			module.moduleName === "RRPluginSDK" && module.installedByHost,
		);
		expect(pluginSdk?.exportedConstants.map(constant => constant.name)).toEqual([
			"userId",
			"apiLevel",
			"basePath",
			"deviceExtra",
			"deviceId",
			"deviceSN",
			"ownerId",
			"deviceModel",
			"systemInfo",
			"devMode",
			"mobileModel",
			"deviceName",
			"storageBasePath",
			"deviceNameChangedEvent",
			"audioPlayerDidFinishPlayingEvent",
			"activeTime",
			"robotTimeZone",
			"iotType",
			"appVersion",
			"userScope",
			"deviceCategory",
			"memory",
			"iotOriginDevId",
			"clientID",
		]);
		expect(pluginSdk?.exportedConstants).toContainEqual(expect.objectContaining({
			name: "apiLevel",
			valueExpression: "10042",
			methodName: "getConstants",
		}));
		expect(pluginSdk?.exportedConstants).toContainEqual(expect.objectContaining({
			name: "appVersion",
			valueExpression: '"4.54.02"',
		}));
		const safeArea = contract.nativeModules.find(module =>
			module.moduleName === "RNCSafeAreaContext" && module.installedByHost,
		);
		expect(safeArea?.exportedConstants).toEqual([
			expect.objectContaining({
				name: "initialWindowMetrics",
				methodName: "getTypedExportedConstants",
				valueExpression: "this.getInitialWindowMetrics()",
			}),
		]);
		expect(new Set(pluginSdk?.exportedConstants.map(constant => constant.name)).size)
			.toBe(pluginSdk?.exportedConstants.length);
	});

	it("rejects incomplete evidence, duplicate constants and inconsistent view metadata", () => {
		const invalidEvidence = structuredClone(contract) as ApkAppPluginHostContract;
		invalidEvidence.host.evidence.sha256 = "not-a-sha256";
		expect(() => assertApkAppPluginHostContract(invalidEvidence)).toThrow("sichere APK-Evidenz");

		const duplicateConstant = structuredClone(contract) as ApkAppPluginHostContract;
		const sdk = duplicateConstant.nativeModules.find(module => module.moduleName === "RRPluginSDK")!;
		sdk.exportedConstants.push(structuredClone(sdk.exportedConstants[0]));
		expect(() => assertApkAppPluginHostContract(duplicateConstant)).toThrow(
			"exportedConstants enthält Duplikate",
		);

		const inconsistentProps = structuredClone(contract) as ApkAppPluginHostContract;
		inconsistentProps.viewManagers.find(view => view.nativeProps.length > 0)!.props = [];
		expect(() => assertApkAppPluginHostContract(inconsistentProps)).toThrow("widerspricht nativeProps");

		const installedWithoutPackage = structuredClone(contract) as ApkAppPluginHostContract;
		installedWithoutPackage.nativeModules.find(module => module.installedByHost)!.hostPackageIndices = [];
		expect(() => assertApkAppPluginHostContract(installedWithoutPackage)).toThrow(
			"ungültige Host-Paketindizes",
		);
	});

	it("reproduces the APK module override order instead of accepting arbitrary fallbacks", () => {
		const effective = resolveEffectiveApkNativeModules(contract);
		const dialog = effective.find(module => module.moduleName === "DialogManagerAndroid");
		expect(dialog?.javaClass).toBe("com.facebook.react.modules.dialog.DialogModuleProxy");
		expect(dialog?.canOverrideExistingModule).toBe(true);

		const device = effective.find(module => module.moduleName === "RRPluginDevice")!;
		const registry = new StrictApkNativeModuleRegistry(contract);
		expect(() => registry.get("RRPluginDevice")).toThrow(MissingApkNativeModuleError);
		registry.register(device.javaClass, Object.fromEntries(device.methods.map(method => [method.name, () => undefined])));
		expect(() => registry.assertImplements(["RRPluginDevice"])).not.toThrow();

		const incomplete = new StrictApkNativeModuleRegistry(contract);
		incomplete.register(device.javaClass, {});
		expect(() => incomplete.assertImplements(["RRPluginDevice"])).toThrow(MissingApkNativeMethodError);
	});

	it("keeps every generated evidence hash tied to the current decompiled APK", () => {
		const evidence = [
			contract.host.evidence,
			...contract.host.packages.flatMap(item => item.evidence ? [item.evidence] : []),
			...contract.nativeModules.map(item => item.evidence),
			...contract.nativeModules.flatMap(item => item.exportedConstants.map(constant => constant.evidence)),
			...contract.viewManagers.map(item => item.evidence),
			...contract.viewManagers.flatMap(item => item.nativeProps.map(prop => prop.evidence)),
			...contract.viewManagers.flatMap(item => item.bubblingEventTypes.map(event => event.evidence)),
			...contract.viewManagers.flatMap(item => item.directEventTypes.map(event => event.evidence)),
			...contract.viewManagers.flatMap(item => item.commands.map(command => command.evidence)),
			...contract.viewManagers.flatMap(item => item.viewConstants.map(constant => constant.evidence)),
		];
		const hashByFile = new Map<string, string>();
		for (const item of evidence) {
			const actualHash = hashByFile.get(item.file)
				?? hashFile(path.join(repositoryRoot, item.file));
			hashByFile.set(item.file, actualHash);
			expect(actualHash, item.file).toBe(item.sha256);
		}
	});

	it("loads the original bundle directly without transforming or extracting it", () => {
		const root = path.join(
			repositoryRoot,
			".AppPlugins",
			"Q10 X5+",
			"019bdf41f583723bb937ccc99bbd7541",
		);
		const bundle = loadApkPluginBundle(root);
		expect(bundle.bundlePath).toBe(path.join(root, "index.android.bundle"));
		expect(bundle.sha256).toBe(hashFile(bundle.bundlePath));
		expect(bundle.bytes.equals(fs.readFileSync(bundle.bundlePath))).toBe(true);
	});

	it("enforces an APK-only source boundary with no adapter map or protocol imports", () => {
		const hostRoot = path.join(repositoryRoot, "src", "apppluginHost");
		for (const filePath of walkFiles(hostRoot).filter(file => file.endsWith(".ts"))) {
			const source = fs.readFileSync(filePath, "utf8");
			expect(source, filePath).not.toMatch(/MapDecryptor|MapParser|Q10MapCreator|src[\\/]lib|lib[\\/]map/u);
			for (const match of source.matchAll(/(?:from\s+|import\s*\(\s*)["']([^"']+)["']/gu)) {
				if (!match[1].startsWith(".")) continue;
				const resolved = path.resolve(path.dirname(filePath), match[1]);
				expect(resolved.startsWith(hostRoot), `${filePath}: ${match[1]}`).toBe(true);
			}
		}
	});
});
