import * as fs from "node:fs";
import * as path from "node:path";
import { describe, expect, it } from "vitest";
import {
	APPPLUGIN_LAB_MODES,
	APPPLUGIN_MAP_LAYER_IDS,
	APPPLUGIN_MAP_LAYERS
} from "../../src/www/apppluginLab/contract";

const repositoryRoot = path.resolve(__dirname, "..", "..");
const scenePath = path.join(repositoryRoot, "src", "www", "apppluginLab", "q10-original-scene.json");
const pagePath = path.join(repositoryRoot, "www", "appplugin-lab.html");
const packagePath = path.join(repositoryRoot, "package.json");

type LabSceneFixture = {
	schemaVersion: number;
	source: string;
	model: string;
	width: number;
	height: number;
	rasterDataUrl: string;
	originalRender?: {
		width: number;
		height: number;
		rasterDataUrl: string;
		sha256: string;
	};
	rooms: unknown[];
	path: unknown[];
	obstacles: unknown[];
	autoCarpets: unknown[];
	virtualWalls: unknown[];
	robot: unknown;
	dock: unknown;
};

describe("AppPlugin map laboratory contract", () => {
	it("accounts for every Q10 layer once and preserves its original layer name", () => {
		const ids = APPPLUGIN_MAP_LAYERS.map(layer => layer.id);
		expect(ids).toEqual([...APPPLUGIN_MAP_LAYER_IDS]);
		expect(new Set(ids).size).toBe(APPPLUGIN_MAP_LAYER_IDS.length);
		expect(APPPLUGIN_MAP_LAYERS.map(layer => layer.originalLayer)).toEqual([
			"map",
			"caizhi",
			"zishibieditan",
			"shoudongditan",
			"jinqu",
			"menkan",
			"huaqu",
			"jiasao",
			"lujing",
			"dianyuan",
			"jiqiren",
			"zhangaiwu",
			"tiaoGuo",
			"yisi",
			"fangjian",
			"mochu",
			"fenge",
			"tanos-native",
			"navigation"
		]);
		expect(new Set(APPPLUGIN_MAP_LAYERS.map(layer => layer.evidence))).toEqual(
			new Set(["original-fixture", "catalog-demo", "native-contract-pending"])
		);
	});

	it("offers every interaction mode needed by the laboratory", () => {
		expect(APPPLUGIN_LAB_MODES.map(mode => mode.id)).toEqual([
			"view",
			"rooms",
			"zones",
			"noGo",
			"noMop",
			"virtualWall",
			"pin"
		]);
	});

	it("ships a reproducible original Q10 scene rather than a hand-written map", () => {
		const scene = JSON.parse(fs.readFileSync(scenePath, "utf8")) as LabSceneFixture;
		expect(scene).toMatchObject({
			schemaVersion: 1,
			source: "original-appplugin-fixture",
			model: "roborock.vacuum.ss09",
			width: 124,
			height: 238
		});
		expect(scene.rasterDataUrl.startsWith("data:image/png;base64,")).toBe(true);
		expect(scene.originalRender).toMatchObject({
			width: 360,
			height: 640
		});
		expect(scene.originalRender?.rasterDataUrl.startsWith("data:image/png;base64,")).toBe(true);
		expect(scene.originalRender?.sha256).toMatch(/^[a-f0-9]{64}$/);
		expect(scene.rooms).toHaveLength(5);
		expect(scene.path).toHaveLength(2103);
		expect(scene.obstacles).toHaveLength(9);
		expect(scene.autoCarpets).toHaveLength(2);
		expect(scene.virtualWalls).toHaveLength(2);
		expect(scene.robot).toBeTruthy();
		expect(scene.dock).toBeTruthy();
	});

	it("keeps the original render separate from the interaction catalog and never exposes a send action", () => {
		const html = fs.readFileSync(pagePath, "utf8");
		for (const id of ["labMap", "labScene", "modeBar", "layerList", "fixtureInput", "eventLog"]) {
			expect(html).toContain(`id="${id}"`);
		}
		expect(html).toContain("Original-AppPlugin");
		expect(html).toContain("Interaktionskatalog");
		expect(html).toContain("Interaktionskatalog bleibt ausdrücklich eigener");
		expect(html).toContain("noch nicht pixelparitätischer Code");
		expect(html).toContain("Befehlsabsichten werden nur protokolliert");
		expect(html).toContain("Kein MQTT, HTTP, ioBroker-State oder Roboter wird beschrieben");
		expect(html).not.toMatch(/id="(?:send|execute|startCleaning)"/);
		expect(html).toContain("./appplugin-lab.js");
	});

	it("builds both the existing UI and the isolated laboratory", () => {
		const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8")) as {
			scripts: Record<string, string>;
		};
		expect(packageJson.scripts["build:www"]).toContain("src/www/map.ts");
		expect(packageJson.scripts["build:www"]).toContain("src/www/appplugin-lab.ts");
		expect(packageJson.scripts["poc:appplugin-lab:fixture"]).toContain("scripts/generate_appplugin_lab_fixture.ts");
	});
});
