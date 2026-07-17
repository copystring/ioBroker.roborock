import * as path from "node:path";

export interface AppPluginDesktopStaticAsset {
	filePath: string;
	contentType: string;
}

const STATIC_ASSETS: Readonly<Record<string, Readonly<{ fileName: string; contentType: string }>>> = {
	"/appplugin-desktop.html": {
		fileName: "appplugin-desktop.html",
		contentType: "text/html; charset=utf-8",
	},
	"/appplugin-desktop.js": {
		fileName: "appplugin-desktop.js",
		contentType: "text/javascript; charset=utf-8",
	},
	"/appplugin-desktop.js.map": {
		fileName: "appplugin-desktop.js.map",
		contentType: "application/json; charset=utf-8",
	},
	"/favicon.ico": {
		fileName: "favicon.ico",
		contentType: "image/x-icon",
	},
};

export function resolveAppPluginDesktopStaticAsset(
	staticRootPath: string,
	urlPath: string,
): AppPluginDesktopStaticAsset | undefined {
	const asset = STATIC_ASSETS[urlPath];
	if (!asset) return undefined;
	return {
		filePath: path.join(staticRootPath, asset.fileName),
		contentType: asset.contentType,
	};
}
