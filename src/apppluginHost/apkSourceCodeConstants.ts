import type { ApkNativeModuleConstants } from "./apkBridgeBootstrap";

/**
 * Reproduces SourceCodeModule.getTypedExportedConstants() from React Native.
 * Unchanged AppPlugin bundles resolve packaged assets relative to this URL.
 */
export function createApkSourceCodeConstants(scriptUrl: string): ApkNativeModuleConstants {
	if (scriptUrl.length === 0) throw new Error("scriptUrl darf nicht leer sein");
	let url: URL;
	try {
		url = new URL(scriptUrl);
	} catch {
		throw new Error("scriptUrl muss eine absolute URL sein");
	}
	if (url.protocol !== "file:" && url.protocol !== "http:" && url.protocol !== "https:") {
		throw new Error(`Nicht unterstütztes SourceCode-Protokoll: ${url.protocol}`);
	}
	return { SourceCode: { scriptURL: scriptUrl } };
}
