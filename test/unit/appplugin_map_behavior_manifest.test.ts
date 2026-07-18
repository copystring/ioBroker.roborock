import * as fs from "node:fs";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

type FamilyGate = {
	id: string;
	fixtureStatus: "available" | "history-only" | "missing";
	directBundleMapDataFlowVerified: boolean;
	nativeRenderEndpointReached: boolean;
	originalMapRasterVerified: boolean;
	pngGoldenVerified: boolean;
	directBundleRenderingVerified: boolean;
	fullSceneParityVerified: boolean;
	roomSelectionParityVerified: boolean;
	zoneEditingParityVerified: boolean;
	gestureParityVerified: boolean;
	ownUiBridgeVerified: boolean;
	evidence: string[];
	missing: string[];
};

type BehaviorManifest = {
	schemaVersion: number;
	families: FamilyGate[];
};

const { buildMapInventory } = require("../../scripts/lib/appplugin_map_inventory.js");
const repositoryRoot = path.resolve(__dirname, "..", "..");
const manifestPath = path.join(repositoryRoot, "test", "fixtures", "appplugin_map_behavior_manifest.json");

function loadManifest(): BehaviorManifest {
	return JSON.parse(fs.readFileSync(manifestPath, "utf8")) as BehaviorManifest;
}

describe("AppPlugin map behavior gates", () => {
	it("keeps full-family rendering closed while recording only the Q10 history proof", () => {
		const manifest = loadManifest();
		expect(manifest.schemaVersion).toBe(2);
		expect(manifest.families.map(family => family.id)).toEqual([
			"yx-skia",
			"scmap-skia",
			"tanos-native",
			"tanos-native-skia",
		]);
		expect(manifest.families.every(family => family.directBundleRenderingVerified === false)).toBe(true);
		expect(manifest.families.every(family => family.missing.includes("direct-original-bundle-render"))).toBe(true);
		for (const family of manifest.families) {
			expect(family.fullSceneParityVerified).toBe(false);
			expect(family.roomSelectionParityVerified).toBe(false);
			expect(family.zoneEditingParityVerified).toBe(false);
			expect(family.gestureParityVerified).toBe(false);
			expect(family.ownUiBridgeVerified).toBe(false);
			expect(family.missing).toEqual(expect.arrayContaining([
				"full-object-scene-parity",
				"room-selection-parity",
				"zone-editing-parity",
				"gesture-parity",
				"own-ui-map-engine-bridge",
			]));
		}

		const yx = manifest.families.find(family => family.id === "yx-skia");
		expect(yx).toMatchObject({
			fixtureStatus: "history-only",
			directBundleMapDataFlowVerified: true,
			nativeRenderEndpointReached: false,
			originalMapRasterVerified: false,
			pngGoldenVerified: false,
			directBundleRenderingVerified: false,
			fullSceneParityVerified: false,
			roomSelectionParityVerified: false,
			zoneEditingParityVerified: false,
			gestureParityVerified: false,
			ownUiBridgeVerified: false,
		});
		expect(yx?.missing).toContain("full-skia-picture-composition");
		expect(yx?.missing).toContain("room-selection-callback");
		expect(yx?.missing).toContain("real-type-1-live-map-payload");
		expect(yx?.missing).toContain("matching-device-dps-sequence");
		expect(yx?.missing).toContain("matching-original-android-reference");
	});

	it("points every declared evidence entry at a local file", () => {
		const manifest = loadManifest();
		for (const family of manifest.families) {
			for (const evidence of family.evidence) {
				expect(fs.existsSync(path.join(repositoryRoot, evidence)), `${family.id}: ${evidence}`).toBe(true);
			}
		}
	});
});

describe("local AppPlugin families have behavior gates", () => {
	it("declares every family discovered in the complete local bundle inventory", async () => {
		const manifest = loadManifest();
		const declared = new Set(manifest.families.map(family => family.id));
		const inventory = await buildMapInventory(path.join(repositoryRoot, ".AppPlugins"), {
			runRuntime: false,
			inspectArchives: false,
		});
		const discovered = new Set(inventory.uniqueBundles.map(
			(bundle: { classification: { id: string } }) => bundle.classification.id,
		));
		expect([...discovered].sort()).toEqual([...declared].sort());
	});
});
