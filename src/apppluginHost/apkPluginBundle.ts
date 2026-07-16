import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";

export interface ApkPluginBundle {
	root: string;
	bundlePath: string;
	bytes: Buffer;
	sha256: string;
}

export function loadApkPluginBundle(pluginRoot: string): ApkPluginBundle {
	const root = path.resolve(pluginRoot);
	const bundlePath = path.resolve(root, "index.android.bundle");
	const relative = path.relative(root, bundlePath);
	if (relative.startsWith("..") || path.isAbsolute(relative)) {
		throw new Error("Der AppPlugin-Bundlepfad verlässt das Plugin-Verzeichnis.");
	}
	if (!fs.statSync(bundlePath).isFile()) {
		throw new Error(`Das originale AppPlugin-Bundle fehlt: ${bundlePath}`);
	}
	const bytes = fs.readFileSync(bundlePath);
	return {
		root,
		bundlePath,
		bytes,
		sha256: crypto.createHash("sha256").update(bytes).digest("hex"),
	};
}
