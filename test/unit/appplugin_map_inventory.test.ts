import * as fs from "node:fs";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import { IOBROKER_APPPLUGIN_OPERATING_POLICY } from "../../src/lib/appplugin/IoBrokerAppPluginOperatingPolicy";

const {
	buildMapInventory,
	classifyMapFamily,
	inspectBundleBuffer,
} = require("../../scripts/lib/appplugin_map_inventory.js");

function markers(enabled: string[]): Record<string, boolean> {
	return Object.fromEntries([
		"yxHomeMapContentView",
		"yxMapModel",
		"yxDrawMapImage",
		"yxRgbaImage",
		"roomPalette",
		"skiaNativeModule",
		"canvasKit",
		"scMapProtobuf",
		"tanos",
		"rrArMapView",
		"rr3dMapView",
		"mapControlOperation",
	].map(name => [name, enabled.includes(name)]));
}

describe("AppPlugin map-family classifier", () => {
	it("keeps distinct YX, SCMap and native Tanos host contracts", () => {
		expect(classifyMapFamily(markers(["yxHomeMapContentView", "skiaNativeModule"])).id).toBe("yx-skia");
		expect(classifyMapFamily(markers(["scMapProtobuf", "skiaNativeModule"])).id).toBe("scmap-skia");
		expect(classifyMapFamily(markers(["tanos", "rrArMapView", "rr3dMapView"])).id).toBe("tanos-native");
		expect(classifyMapFamily(markers(["tanos", "rrArMapView", "rr3dMapView", "skiaNativeModule"])).id).toBe("tanos-native-skia");
	});

	it("inspects markers without rewriting or splitting a Metro bundle", () => {
		const bundle = Buffer.from("var x = 'YXHomeMapContentView RNSkiaModule DrawMapImg';", "utf8");
		const before = Buffer.from(bundle);
		const result = inspectBundleBuffer(bundle);

		expect(result.format).toBe("metro");
		expect(result.classification.id).toBe("yx-skia");
		expect(bundle.equals(before)).toBe(true);
	});
});

const pluginRoot = path.resolve(__dirname, "..", "..", ".AppPlugins");
const originalPluginsIt = fs.existsSync(pluginRoot) ? it : it.skip;

describe("all locally available AppPlugin map sources", () => {
	originalPluginsIt("accounts for every ZIP and extracted bundle and reports provenance gaps", async () => {
		const inventory = await buildMapInventory(pluginRoot, { runRuntime: false });
		const failedSources = inventory.sources.filter((source: { status: string }) => source.status === "failed");
		const unresolvedBundles = inventory.uniqueBundles.filter((bundle: { classification: { id: string } }) =>
			bundle.classification.id.endsWith("unresolved") || bundle.classification.id === "unresolved");
		const incompletePackages = inventory.packages.filter((plugin: { coverageStatus: string }) =>
			plugin.coverageStatus === "incomplete");

		expect(inventory.summary.topLevelPackages).toBeGreaterThan(0);
		expect(inventory.summary.archiveFiles).toBeGreaterThan(0);
		expect(inventory.summary.extractedBundlePaths).toBeGreaterThan(0);
		expect(failedSources).toEqual([]);
		expect(unresolvedBundles).toEqual([]);
		expect(inventory.packages.every((plugin: { archives: string[]; extractedBundles: string[] }) =>
			plugin.archives.length + plugin.extractedBundles.length > 0)).toBe(true);
		expect(incompletePackages).toHaveLength(inventory.summary.unmatchedArchiveSources);
		expect(inventory.uniqueBundles.every((bundle: { mapBehaviorStatus: string }) =>
			bundle.mapBehaviorStatus === "not-tested")).toBe(true);
		expect(inventory.summary.largestArchiveBytes)
			.toBeLessThanOrEqual(IOBROKER_APPPLUGIN_OPERATING_POLICY.package.maxArchiveBytes);
		expect(inventory.summary.largestArchiveBytes)
			.toBeLessThanOrEqual(IOBROKER_APPPLUGIN_OPERATING_POLICY.package.maxDownloadBytes);
		expect(inventory.summary.largestArchiveEntryCount)
			.toBeLessThanOrEqual(IOBROKER_APPPLUGIN_OPERATING_POLICY.package.maxEntries);
		expect(inventory.summary.largestArchiveEntryBytes)
			.toBeLessThanOrEqual(IOBROKER_APPPLUGIN_OPERATING_POLICY.package.maxEntryBytes);
		expect(inventory.summary.largestArchiveUncompressedBytes)
			.toBeLessThanOrEqual(IOBROKER_APPPLUGIN_OPERATING_POLICY.package.maxExtractedBytes);
	}, 120_000);
});
