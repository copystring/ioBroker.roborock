import * as fs from "node:fs";
import * as path from "node:path";

import { createAppPluginPinchZoomPointers } from "../src/www/apppluginLab/live-appplugin-map-surface";
import { renderAppPluginSvgPng, sha256 } from "./lib/appPluginBrowserGolden";

type JsonRecord = Record<string, unknown>;

interface LayoutBox {
	x: number;
	y: number;
	width: number;
	height: number;
	transform?: Affine;
}

interface Affine {
	a: number;
	b: number;
	c: number;
	d: number;
	tx: number;
	ty: number;
}

interface RuntimeHealth {
	status: "appplugin-session-ready";
	sessionId: string;
	deviceModel: string;
	profileLabel: string;
	bundleKind: string;
	bundleSha256: string;
	productFallbackAllowed: false;
	colorModel: "dark" | "default" | "light";
	colorScheme: "dark" | "light";
	systemColorScheme: "dark" | "light";
	viewport: { width: number; height: number };
}

interface RuntimeState {
	rawText: unknown[];
	publishReplayEventsCount: number;
	publishReplayResponseErrors: string[];
	publishResponseMatches: Array<{ matchCount: number; payload: JsonRecord }>;
}

interface UiState {
	uiTree: JsonRecord;
	nativeHierarchy: {
		root: JsonRecord;
		layouts: Array<{ tag: number; box: LayoutBox }>;
	};
}

interface ActorGeometry {
	asset: string;
	imageTag: number;
	layerTag: number;
	layerZIndex: number;
	layerScaleX: number;
	layerScaleY: number;
	imageScaleX: number;
	imageScaleY: number;
	bounds: { x: number; y: number; width: number; height: number };
	center: { x: number; y: number };
}

interface SceneGeometry {
	mapScaleX: number;
	mapScaleY: number;
	robotAboveStation: boolean;
	centerDistance: number;
	robot: ActorGeometry;
	station: ActorGeometry;
}

const ROBOT_ASSET = "src_sc_components_resource_images_common_robot.png";
const STATION_ASSET = "src_sc_components_resource_images_common_charge_android.png";
const identity: Affine = { a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 };

function parseArgs(args: readonly string[]): { baseUrl: string; updateGolden: boolean } {
	let baseUrl = "http://127.0.0.1:4174";
	let updateGolden = false;
	for (let index = 0; index < args.length; index += 1) {
		if (args[index] === "--base-url" && args[index + 1]) baseUrl = args[++index];
		else if (args[index] === "--update-golden") updateGolden = true;
		else throw new Error(`Unbekannte oder unvollständige Option: ${args[index]}`);
	}
	return { baseUrl: baseUrl.replace(/\/$/u, ""), updateGolden };
}

function record(value: unknown, context: string): JsonRecord {
	if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${context} muss ein Objekt sein`);
	return value as JsonRecord;
}

function children(node: JsonRecord): JsonRecord[] {
	if (!Array.isArray(node.children)) throw new Error(`Kinder von React-Tag ${String(node.tag)} fehlen`);
	return node.children.map(value => record(value, "UI-Kind"));
}

function multiply(left: Affine, right: Affine): Affine {
	return {
		a: left.a * right.a + left.c * right.b,
		b: left.b * right.a + left.d * right.b,
		c: left.a * right.c + left.c * right.d,
		d: left.b * right.c + left.d * right.d,
		tx: left.a * right.tx + left.c * right.ty + left.tx,
		ty: left.b * right.tx + left.d * right.ty + left.ty,
	};
}

function localMatrix(box: LayoutBox): Affine {
	const transform = box.transform ?? identity;
	return { ...transform, tx: box.x + transform.tx, ty: box.y + transform.ty };
}

function scaleX(matrix: Affine): number {
	return Math.hypot(matrix.a, matrix.b);
}

function scaleY(matrix: Affine): number {
	return Math.hypot(matrix.c, matrix.d);
}

function transformedBounds(
	matrix: Affine,
	width: number,
	height: number,
): { x: number; y: number; width: number; height: number } {
	const points = [
		[0, 0], [width, 0], [0, height], [width, height],
	].map(([x, y]) => ({ x: matrix.a * x + matrix.c * y + matrix.tx, y: matrix.b * x + matrix.d * y + matrix.ty }));
	const left = Math.min(...points.map(point => point.x));
	const right = Math.max(...points.map(point => point.x));
	const top = Math.min(...points.map(point => point.y));
	const bottom = Math.max(...points.map(point => point.y));
	return { x: left, y: top, width: right - left, height: bottom - top };
}

function assetName(node: JsonRecord): string | undefined {
	if (node.viewName !== "RCTImageView") return undefined;
	const props = record(node.props, "Bildprops");
	if (!Array.isArray(props.src) || props.src.length === 0) return undefined;
	const uri = record(props.src[0], "Bildquelle").uri;
	if (typeof uri !== "string") return undefined;
	return path.posix.basename(decodeURIComponent(uri).replaceAll("\\", "/"));
}

function findAssetPath(root: JsonRecord, asset: string): JsonRecord[] {
	const visit = (node: JsonRecord, ancestors: JsonRecord[]): JsonRecord[] | undefined => {
		const current = [...ancestors, node];
		if (assetName(node) === asset) return current;
		for (const child of children(node)) {
			const found = visit(child, current);
			if (found) return found;
		}
		return undefined;
	};
	const result = visit(root, []);
	if (!result) throw new Error(`Unverändertes AppPlugin-Asset ${asset} fehlt`);
	return result;
}

function numericTag(node: JsonRecord): number {
	if (!Number.isSafeInteger(node.tag)) throw new Error("UI-Knoten besitzt keinen gültigen React-Tag");
	return node.tag as number;
}

function numericProp(node: JsonRecord, property: string): number | undefined {
	const value = record(node.props, `Props von ${String(node.tag)}`)[property];
	return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function actorGeometry(
	root: JsonRecord,
	layouts: ReadonlyMap<number, LayoutBox>,
	asset: string,
	expectedZIndex: number,
): ActorGeometry {
	const actorPath = findAssetPath(root, asset);
	const image = actorPath.at(-1)!;
	const layer = [...actorPath].reverse().find(node => numericProp(node, "zIndex") === expectedZIndex);
	if (!layer) throw new Error(`${asset} besitzt nicht den originalen Z-Layer ${expectedZIndex}`);
	const layerIndex = actorPath.indexOf(layer);
	let world = { ...identity };
	for (const node of actorPath) {
		const box = layouts.get(numericTag(node));
		if (!box) throw new Error(`Native Layoutbox für React-Tag ${String(node.tag)} fehlt`);
		world = multiply(world, localMatrix(box));
	}
	const imageBox = layouts.get(numericTag(image))!;
	const layerBox = layouts.get(numericTag(layer))!;
	const bounds = transformedBounds(world, imageBox.width, imageBox.height);
	const imageTransform = imageBox.transform ?? identity;
	const layerTransform = layerBox.transform ?? identity;
	return {
		asset,
		imageTag: numericTag(image),
		layerTag: numericTag(layer),
		layerZIndex: expectedZIndex,
		layerScaleX: scaleX(layerTransform),
		layerScaleY: scaleY(layerTransform),
		imageScaleX: scaleX(imageTransform),
		imageScaleY: scaleY(imageTransform),
		bounds,
		center: { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 },
	};
}

function round(value: number): number {
	return Number(value.toFixed(6));
}

function roundedActor(actor: ActorGeometry): ActorGeometry {
	return {
		...actor,
		layerScaleX: round(actor.layerScaleX),
		layerScaleY: round(actor.layerScaleY),
		imageScaleX: round(actor.imageScaleX),
		imageScaleY: round(actor.imageScaleY),
		bounds: Object.fromEntries(Object.entries(actor.bounds).map(([key, value]) => [key, round(value)])) as ActorGeometry["bounds"],
		center: { x: round(actor.center.x), y: round(actor.center.y) },
	};
}

async function readJson<T>(url: string): Promise<T> {
	const response = await fetch(url, { cache: "no-store" });
	if (!response.ok) throw new Error(`${url} antwortet mit HTTP ${response.status}`);
	return response.json() as Promise<T>;
}

async function setTheme(
	baseUrl: string,
	mode: "dark" | "light" | "system",
	systemColorScheme: "dark" | "light",
): Promise<void> {
	const response = await fetch(`${baseUrl}/theme?view=map`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ mode, systemColorScheme }),
	});
	if (!response.ok) throw new Error(`Theme-Bridge antwortet mit HTTP ${response.status}`);
}

async function sceneGeometry(baseUrl: string): Promise<SceneGeometry> {
	const ui = await readJson<UiState>(`${baseUrl}/ui-state`);
	const layouts = new Map(ui.nativeHierarchy.layouts.map(entry => [entry.tag, entry.box]));
	const robotPath = findAssetPath(ui.nativeHierarchy.root, ROBOT_ASSET);
	const mapLayer = [...robotPath].reverse().find(node => numericProp(node, "zIndex") === 100);
	if (!mapLayer) throw new Error("Originaler Q7-Kartencontainer mit Z-Layer 100 fehlt");
	const mapTransform = layouts.get(numericTag(mapLayer))?.transform;
	if (!mapTransform) throw new Error("Originaler Q7-Kartencontainer besitzt keine native Transformmatrix");
	const robot = actorGeometry(ui.nativeHierarchy.root, layouts, ROBOT_ASSET, 490);
	const station = actorGeometry(ui.nativeHierarchy.root, layouts, STATION_ASSET, 400);
	const centerDistance = Math.hypot(robot.center.x - station.center.x, robot.center.y - station.center.y);
	return {
		mapScaleX: scaleX(mapTransform),
		mapScaleY: scaleY(mapTransform),
		robotAboveStation: robot.layerZIndex > station.layerZIndex,
		centerDistance,
		robot,
		station,
	};
}

function assertClose(value: number, expected: number, context: string, tolerance = 1e-9): void {
	if (Math.abs(value - expected) > tolerance) throw new Error(`${context} ist ${value} statt ${expected}`);
}

function assertActorInvariants(scene: SceneGeometry): void {
	if (!scene.robotAboveStation) throw new Error("Roboter liegt nicht über der Station");
	assertClose(scene.robot.layerScaleX, 0.16, "Roboter-Layerscale X");
	assertClose(scene.robot.layerScaleY, 0.16, "Roboter-Layerscale Y");
	assertClose(scene.robot.imageScaleX, 0.32 / 0.18, "Roboter-Bildscale X");
	assertClose(scene.robot.imageScaleY, 0.32 / 0.18, "Roboter-Bildscale Y");
	assertClose(scene.station.layerScaleX, 0.32, "Stationsscale X");
	assertClose(scene.station.layerScaleY, 0.32, "Stationsscale Y");
	if (scene.centerDistance > 1) throw new Error(`Gedockter Roboter und Station liegen ${scene.centerDistance}px auseinander`);
	const robotSize = Math.max(scene.robot.bounds.width, scene.robot.bounds.height);
	const stationSize = Math.max(scene.station.bounds.width, scene.station.bounds.height);
	const ratio = robotSize / stationSize;
	if (robotSize < 8 || robotSize > 50 || stationSize < 8 || stationSize > 50 || ratio < 0.75 || ratio > 1.35) {
		throw new Error(`AppPlugin-Akteurgrößen sind unplausibel: Roboter ${robotSize}px, Station ${stationSize}px`);
	}
}

async function pinch(baseUrl: string, delta: number, pointerOffset: number): Promise<void> {
	const pointers = createAppPluginPinchZoomPointers(360, 800, delta);
	const timeMs = Date.now();
	const response = await fetch(`${baseUrl}/pointer-sequence?view=map`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			pointers: pointers.map((pointer, index) => ({
				...pointer,
				pointerId: pointer.pointerId + pointerOffset,
				timeMs: timeMs + index,
			})),
		}),
	});
	const payload = await response.json() as { error?: string; frameChanged?: boolean; activePointerIds?: number[] };
	if (!response.ok || payload.error || payload.frameChanged !== true || payload.activePointerIds?.length !== 0) {
		throw new Error(payload.error ?? "APK-Pinch wurde nicht vollständig verarbeitet");
	}
}

async function main(): Promise<void> {
	const options = parseArgs(process.argv.slice(2));
	const fixtureDirectory = path.join(process.cwd(), "test", "fixtures", "appplugin");
	const manifestPath = path.join(fixtureDirectory, "q7-l5-actor-scaling-golden.json");
	const pngPath = path.join(fixtureDirectory, "q7-l5-actor-scaling-golden.png");
	const initialHealth = await readJson<RuntimeHealth>(`${options.baseUrl}/health?view=map`);
	const initialState = await readJson<RuntimeState>(`${options.baseUrl}/state`);
	if (initialHealth.status !== "appplugin-session-ready"
		|| initialHealth.productFallbackAllowed !== false
		|| initialHealth.bundleKind !== "hermes-bytecode"
		|| initialHealth.deviceModel !== "roborock.vacuum.sc01"
		|| !initialState.rawText.map(String).includes("Roborock Q7")) {
		throw new Error("Akteur-Skalierung benötigt eine frische unveränderte Q7-L5-AppPlugin-Sitzung");
	}
	const mapResponse = initialState.publishResponseMatches.find(match =>
		match.payload.method === "service.upload_by_maptype");
	if (!mapResponse || mapResponse.matchCount < 1
		|| initialState.publishReplayEventsCount < 1
		|| initialState.publishReplayResponseErrors.length > 0) {
		throw new Error("Der vor RunApplication verbundene APK-Gerätetransport hat die originale Kartenanfrage nicht beantwortet");
	}
	const initialMode = initialHealth.colorModel === "default" ? "system" : initialHealth.colorModel;
	let initial: SceneGeometry;
	let zoomIn: SceneGeometry;
	let zoomOut: SceneGeometry;
	let png: Buffer;
	try {
		await setTheme(options.baseUrl, "light", "light");
		initial = await sceneGeometry(options.baseUrl);
		assertActorInvariants(initial);
		const frameResponse = await fetch(`${options.baseUrl}/frame.svg?view=map&scale=initial`, { cache: "no-store" });
		if (!frameResponse.ok) throw new Error(`Initialer Kartenframe antwortet mit HTTP ${frameResponse.status}`);
		png = await renderAppPluginSvgPng(
			await frameResponse.text(),
			Math.round(initialHealth.viewport.width),
			Math.round(initialHealth.viewport.height),
			"actor-scaling",
		);
		await pinch(options.baseUrl, 1, 1_000);
		zoomIn = await sceneGeometry(options.baseUrl);
		assertActorInvariants(zoomIn);
		await pinch(options.baseUrl, -1, 2_000);
		zoomOut = await sceneGeometry(options.baseUrl);
		assertActorInvariants(zoomOut);
	} finally {
		await setTheme(options.baseUrl, initialMode, initialHealth.systemColorScheme);
	}
	if (zoomIn!.mapScaleX <= initial!.mapScaleX
		|| zoomIn!.robot.bounds.width <= initial!.robot.bounds.width
		|| zoomIn!.station.bounds.height <= initial!.station.bounds.height) {
		throw new Error("Desktop-Plus vergrößert Karte, Roboter und Station nicht gemeinsam über das AppPlugin");
	}
	if (zoomOut!.mapScaleX >= zoomIn!.mapScaleX
		|| zoomOut!.robot.bounds.width >= zoomIn!.robot.bounds.width
		|| zoomOut!.station.bounds.height >= zoomIn!.station.bounds.height) {
		throw new Error("Desktop-Minus verkleinert Karte, Roboter und Station nicht gemeinsam über das AppPlugin");
	}
	const evidence = {
		schemaVersion: 1,
		source: "unchanged-q7-l5-appplugin-session",
		profileLabel: initialHealth.profileLabel,
		deviceModel: initialHealth.deviceModel,
		bundleKind: initialHealth.bundleKind,
		bundleSha256: initialHealth.bundleSha256,
		productFallbackAllowed: initialHealth.productFallbackAllowed,
		renderer: "chromium-headless",
		apkTransportConnectedBeforeRunApplication: true,
		mapRequestMatchCount: mapResponse.matchCount,
		originalConstants: {
			mapChildScale: 0.32,
			robotOuterMultiplier: 0.5,
			robotImageDivisor: 0.18,
			robotZIndex: 490,
			stationZIndex: 400,
		},
		initial: {
			...initial!,
			mapScaleX: round(initial!.mapScaleX),
			mapScaleY: round(initial!.mapScaleY),
			centerDistance: round(initial!.centerDistance),
			robot: roundedActor(initial!.robot),
			station: roundedActor(initial!.station),
		},
		zoomIn: {
			...zoomIn!,
			mapScaleX: round(zoomIn!.mapScaleX),
			mapScaleY: round(zoomIn!.mapScaleY),
			centerDistance: round(zoomIn!.centerDistance),
			robot: roundedActor(zoomIn!.robot),
			station: roundedActor(zoomIn!.station),
		},
		zoomOut: {
			...zoomOut!,
			mapScaleX: round(zoomOut!.mapScaleX),
			mapScaleY: round(zoomOut!.mapScaleY),
			centerDistance: round(zoomOut!.centerDistance),
			robot: roundedActor(zoomOut!.robot),
			station: roundedActor(zoomOut!.station),
		},
		pngSha256: sha256(png!),
		pngFile: path.posix.join("test", "fixtures", "appplugin", path.basename(pngPath)),
	};
	if (options.updateGolden) {
		fs.mkdirSync(fixtureDirectory, { recursive: true });
		fs.writeFileSync(pngPath, png!);
		fs.writeFileSync(manifestPath, `${JSON.stringify(evidence, null, 2)}\n`, "utf8");
		process.stdout.write(`${JSON.stringify({ status: "actor-scaling-golden-updated", manifestPath, pngPath })}\n`);
		return;
	}
	const expected = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as typeof evidence;
	if (JSON.stringify(expected) !== JSON.stringify(evidence) || !fs.readFileSync(pngPath).equals(png!)) {
		const directory = path.join(process.cwd(), "artifacts", "appplugin-poc", "actor-scaling-golden-mismatch");
		fs.mkdirSync(directory, { recursive: true });
		fs.writeFileSync(path.join(directory, "expected.json"), `${JSON.stringify(expected, null, 2)}\n`, "utf8");
		fs.writeFileSync(path.join(directory, "actual.json"), `${JSON.stringify(evidence, null, 2)}\n`, "utf8");
		fs.writeFileSync(path.join(directory, "actual.png"), png!);
		throw new Error(`Akteur-Skalierungs-Golden weicht ab; Diagnose: ${directory}`);
	}
	process.stdout.write(`${JSON.stringify({ status: "actor-scaling-golden-match" })}\n`);
}

void main().catch(error => {
	process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
	process.exitCode = 1;
});
