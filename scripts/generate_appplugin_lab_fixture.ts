import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import { MapParser } from "../src/lib/map/b01/MapParser";
import { Q10MapCreator } from "../src/lib/map/q10/Q10MapCreator";
import { Q10_PRIMARY_SAMPLE } from "../test/unit/q10RepresentativeFixture";
import { Q10_FIXTURE_DEFAULTS } from "../test/unit/q10FixtureDefaults";

const repositoryRoot = process.cwd();
const outputPath = path.join(repositoryRoot, "src", "www", "apppluginLab", "q10-original-scene.json");
const rasterPath = path.join(repositoryRoot, "artifacts", "appplugin-poc", "q10-original-map.png");
const originalRenderPath = path.join(repositoryRoot, "artifacts", "appplugin-poc", "q10-original-full-scene.png");
const duid = "q10-appplugin-lab";
const adapter = {
	name: "roborock.0",
	http_api: {
		getMatchedLocalKeys: () => new Map([[duid, Q10_FIXTURE_DEFAULTS.localKey]]),
		getRobotModel: () => Q10_FIXTURE_DEFAULTS.model,
		getDevices: () => [{ duid, sn: Q10_FIXTURE_DEFAULTS.sn, model: Q10_FIXTURE_DEFAULTS.model }]
	},
	log: {
		debug: (_message: string) => undefined,
		warn: (_message: string) => undefined,
		error: (_message: string) => undefined
	},
	rLog: () => undefined,
	getStateAsync: async () => null,
	setTimeout,
	clearTimeout,
	errorMessage: (error: unknown) => error instanceof Error ? error.message : String(error)
};
const parser = new MapParser(adapter as never);
const parsed = parser.parse(
	Buffer.from(Q10_PRIMARY_SAMPLE),
	Q10_FIXTURE_DEFAULTS.sn,
	Q10_FIXTURE_DEFAULTS.model,
	duid,
	"B01"
);

if (!parsed) throw new Error("The representative Q10 fixture could not be parsed");
const created = new Q10MapCreator().create(parsed);
const source = created.q10SourceData;
const scene = created.q10CreatorData;
if (!source || !scene) throw new Error("The representative Q10 fixture did not produce Q10 scene data");
if (!fs.existsSync(rasterPath)) throw new Error(`Original Q10 raster is missing: ${rasterPath}`);
if (!fs.existsSync(originalRenderPath)) throw new Error(`Original Q10 full-scene render is missing: ${originalRenderPath}`);
const originalRender = fs.readFileSync(originalRenderPath);

const output = {
	schemaVersion: 1,
	id: "q10-original-representative",
	label: "Q10 Original-Fixture",
	source: "original-appplugin-fixture",
	model: Q10_FIXTURE_DEFAULTS.model,
	mapId: source.mapId,
	width: scene.mapWidth,
	height: scene.mapHeight,
	resolution: source.resolution,
	rasterDataUrl: `data:image/png;base64,${fs.readFileSync(rasterPath).toString("base64")}`,
	originalRender: {
		width: 360,
		height: 640,
		rasterDataUrl: `data:image/png;base64,${originalRender.toString("base64")}`,
		sha256: crypto.createHash("sha256").update(originalRender).digest("hex")
	},
	rooms: scene.roomModels,
	materialPaths: scene.materialPaths,
	roomMaterialRoomIds: scene.roomMaterialRoomIds,
	path: scene.pathPixels,
	robot: scene.robotPixel ?? null,
	dock: scene.chargerPixel ?? null,
	obstacles: scene.obstaclePixels,
	skipped: scene.skipPixels,
	suspected: scene.suspectedPoints,
	autoCarpets: scene.selfIdentifiedCarpets.map(carpet => ({
		id: carpet.id,
		carpetID: carpet.carpetID,
		left: carpet.left,
		top: carpet.top,
		right: carpet.right,
		bottom: carpet.bottom,
		width: carpet.width,
		height: carpet.height
	})),
	manualCarpets: scene.carpetAreas,
	forbidAreas: scene.forbidAreas,
	mopAreas: scene.mopAreas,
	thresholdAreas: scene.thresholdAreas,
	eraseAreas: scene.eraseAreas,
	virtualWalls: scene.virtualWalls,
	roomTangentInfo: scene.roomTangentInfo,
	verification: created.q10Verification,
	provenance: {
		bundleFamily: "yx-skia",
		fixture: "test/unit/q10RepresentativeFixture.ts",
		raster: "artifacts/appplugin-poc/q10-original-map.png",
		fullScene: "artifacts/appplugin-poc/q10-original-full-scene.png",
		generator: "scripts/generate_appplugin_lab_fixture.ts"
	}
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`Generated ${path.relative(repositoryRoot, outputPath)}`);
