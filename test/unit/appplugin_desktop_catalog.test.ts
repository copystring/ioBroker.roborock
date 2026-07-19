import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import JSZip from "jszip";
import { afterEach, describe, expect, it } from "vitest";

import {
	appPluginDesktopCatalogId,
	discoverAppPluginDesktopBundles,
	parseAppPluginDesktopCatalog,
	withAppPluginDeviceModel,
} from "../../scripts/lib/appPluginDesktopCatalog";

const temporaryRoots: string[] = [];

function temporaryRoot(): string {
	const root = fs.mkdtempSync(path.join(os.tmpdir(), "appplugin-catalog-"));
	temporaryRoots.push(root);
	return root;
}

function writeBundle(root: string, packageName: string, version: string, bytes: Buffer): string {
	const pluginRoot = path.join(root, packageName, version);
	fs.mkdirSync(pluginRoot, { recursive: true });
	fs.writeFileSync(path.join(pluginRoot, "index.android.bundle"), bytes);
	return pluginRoot;
}

describe("generischer AppPlugin-Desktop-Katalog", () => {
	afterEach(() => {
		for (const root of temporaryRoots.splice(0)) {
			fs.rmSync(root, { recursive: true, force: true });
		}
	});

	it("dedupliziert identische Bundles, übernimmt Originalmodelle und entpackt ZIP-only-Pakete", async () => {
		const repositoryRoot = temporaryRoot();
		const appPluginRoot = path.join(repositoryRoot, "App Plugins");
		const metro = Buffer.from("var __bundle = 1;\n", "utf8");
		const firstRoot = writeBundle(appPluginRoot, "Qrevo A", "version-a", metro);
		writeBundle(appPluginRoot, "Qrevo Alias", "version-b", metro);
		const rawRoot = path.join(firstRoot, "raw");
		fs.mkdirSync(rawRoot, { recursive: true });
		fs.writeFileSync(
			path.join(rawRoot, "projects_comroborocktanos_project.json"),
			JSON.stringify({
				models: "roborock.vacuum.t4v2",
				developer_id: "258089735",
				version_code: 2145,
				min_sdk_api_level: 10010,
				package_path: "com.roborock.tanos",
			}),
		);

		const hermes = Buffer.alloc(16);
		Buffer.from([0xc6, 0x1f, 0xbc, 0x03]).copy(hermes);
		const archive = new JSZip();
		archive.file("index.android.bundle", hermes);
		const zipRoot = path.join(appPluginRoot, "S8 ZIP");
		fs.mkdirSync(zipRoot, { recursive: true });
		fs.writeFileSync(
			path.join(zipRoot, "only.zip"),
			await archive.generateAsync({ type: "nodebuffer" }),
		);

		const bundles = await discoverAppPluginDesktopBundles({ repositoryRoot, appPluginRoot });

		expect(bundles).toHaveLength(2);
		expect(bundles[0]).toMatchObject({
			aliases: ["Qrevo A", "Qrevo Alias"],
			bundleKind: "javascript-source",
			sourceKind: "extracted",
			packageMetadata: {
				models: ["roborock.vacuum.t4v2"],
				versionCode: 2145,
			},
		});
		expect(bundles[1]).toMatchObject({
			aliases: ["S8 ZIP"],
			bundleKind: "hermes-bytecode",
			sourceKind: "archive-cache",
		});
		expect(fs.existsSync(path.join(bundles[1].pluginRoot, "index.android.bundle"))).toBe(true);
	});

	it("akzeptiert nur sichere, eindeutige und vollständig belegte Katalogeinträge", () => {
		const hash = "a".repeat(64);
		const id = appPluginDesktopCatalogId(hash);
		expect(id).toBe("plugin-aaaaaaaaaaaaaaaa");
		expect(parseAppPluginDesktopCatalog({
			version: 1,
			entries: [{
				id,
				label: "Saros",
				aliases: ["Saros"],
				bundleKind: "hermes-bytecode",
				bundleSha256: hash,
				runtimeMode: "bundle-audit",
				modelSource: "apk-home-data",
				availability: "available",
				warning: "Keine HomeData",
			}],
		})).toHaveLength(1);
		expect(() => parseAppPluginDesktopCatalog({
			version: 1,
			entries: [{
				id: "../saros",
				label: "Saros",
				aliases: ["Saros"],
				bundleKind: "hermes-bytecode",
				bundleSha256: hash,
				runtimeMode: "bundle-audit",
				modelSource: "audit-placeholder",
				availability: "available",
			}],
		})).toThrow("id ist ungültig");
	});

	it("behält interne Paketmodelle und ergänzt das konkrete APK-HomeData-Modell", () => {
		expect(withAppPluginDeviceModel({
			models: ["roborock.vacuum.t4v2"],
			versionCode: 2_145,
		}, "roborock.vacuum.a27")).toEqual({
			models: ["roborock.vacuum.t4v2", "roborock.vacuum.a27"],
			versionCode: 2_145,
		});
		expect(withAppPluginDeviceModel(undefined, "roborock.vacuum.a27")).toEqual({
			models: ["roborock.vacuum.a27"],
		});
	});
});
