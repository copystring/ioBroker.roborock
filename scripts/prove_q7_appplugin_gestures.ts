import * as fs from "node:fs";
import * as path from "node:path";

import { createAppPluginPinchZoomPointers } from "../src/www/apppluginLab/live-appplugin-map-surface";
import { ensureAppPluginDesktopProfile } from "./lib/appPluginDesktopClient";

type JsonRecord = Record<string, unknown>;
type GoldenProfile = "q7-l5" | "q7-m5";

interface Affine {
	a: number;
	b: number;
	c: number;
	d: number;
	tx: number;
	ty: number;
}

interface LayoutBox {
	x: number;
	y: number;
	width: number;
	height: number;
	transform?: Affine;
}

interface RuntimeHealth {
	status: "appplugin-session-ready";
	profileLabel: string;
	deviceModel: string;
	bundleKind: string;
	bundleSha256: string;
	productFallbackAllowed: false;
	viewport: { width: number; height: number };
}

interface UiState {
	nativeHierarchy: {
		root: JsonRecord;
		layouts: Array<{ tag: number; box: LayoutBox }>;
	};
}

interface Pointer {
	kind: "down" | "move" | "up" | "cancel";
	pointerId?: number;
	x?: number;
	y?: number;
}

interface PointerResponse {
	error?: string;
	frameChanged: boolean;
	activePointerIds: number[];
	dispatches: unknown[];
}

const ROBOT_ASSET = "src_sc_components_resource_images_common_robot.png";
const identity: Affine = { a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 };

function parseArgs(args: readonly string[]): {
	baseUrl: string;
	goldenProfile: GoldenProfile;
	updateGolden: boolean;
} {
	let baseUrl = "http://127.0.0.1:4173";
	let goldenProfile: GoldenProfile = "q7-l5";
	let updateGolden = false;
	for (let index = 0; index < args.length; index += 1) {
		if (args[index] === "--base-url" && args[index + 1]) baseUrl = args[++index];
		else if (args[index] === "--golden-profile"
			&& (args[index + 1] === "q7-l5" || args[index + 1] === "q7-m5")) {
			goldenProfile = args[++index] as GoldenProfile;
		}
		else if (args[index] === "--update-golden") updateGolden = true;
		else throw new Error(`Unbekannte oder unvollständige Option: ${args[index]}`);
	}
	return { baseUrl: baseUrl.replace(/\/$/u, ""), goldenProfile, updateGolden };
}

function record(value: unknown, context: string): JsonRecord {
	if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${context} muss ein Objekt sein`);
	return value as JsonRecord;
}

function children(node: JsonRecord): JsonRecord[] {
	if (!Array.isArray(node.children)) throw new Error(`Kinder von React-Tag ${String(node.tag)} fehlen`);
	return node.children.map(value => record(value, "UI-Kind"));
}

function numericTag(node: JsonRecord): number {
	if (!Number.isSafeInteger(node.tag)) throw new Error("UI-Knoten besitzt keinen gültigen React-Tag");
	return node.tag as number;
}

function numericProp(node: JsonRecord, property: string): number | undefined {
	const value = record(node.props, `Props von ${String(node.tag)}`)[property];
	return typeof value === "number" && Number.isFinite(value) ? value : undefined;
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

function inversePoint(matrix: Affine, point: Readonly<{ x: number; y: number }>): { x: number; y: number } {
	const determinant = matrix.a * matrix.d - matrix.b * matrix.c;
	if (Math.abs(determinant) < 1e-12) throw new Error("AppPlugin-Kartenmatrix ist nicht invertierbar");
	const x = point.x - matrix.tx;
	const y = point.y - matrix.ty;
	return {
		x: (matrix.d * x - matrix.c * y) / determinant,
		y: (-matrix.b * x + matrix.a * y) / determinant,
	};
}

function fixedScreenPoint(before: Affine, after: Affine): { x: number; y: number } {
	const a = before.a - after.a;
	const b = before.c - after.c;
	const c = before.b - after.b;
	const d = before.d - after.d;
	const rightX = after.tx - before.tx;
	const rightY = after.ty - before.ty;
	const determinant = a * d - b * c;
	if (Math.abs(determinant) < 1e-12) throw new Error("AppPlugin-Zoom besitzt keinen eindeutigen Bildschirmanker");
	const mapX = (d * rightX - b * rightY) / determinant;
	const mapY = (-c * rightX + a * rightY) / determinant;
	return {
		x: before.a * mapX + before.c * mapY + before.tx,
		y: before.b * mapX + before.d * mapY + before.ty,
	};
}

function round(value: number): number {
	return Number(value.toFixed(6));
}

function roundedMatrix(matrix: Affine): Affine {
	return {
		a: round(matrix.a),
		b: round(matrix.b),
		c: round(matrix.c),
		d: round(matrix.d),
		tx: round(matrix.tx),
		ty: round(matrix.ty),
	};
}

function scale(matrix: Affine): number {
	return Math.hypot(matrix.a, matrix.b);
}

function matrixDistance(left: Affine, right: Affine): number {
	return Math.max(
		Math.abs(left.a - right.a),
		Math.abs(left.b - right.b),
		Math.abs(left.c - right.c),
		Math.abs(left.d - right.d),
		Math.abs(left.tx - right.tx),
		Math.abs(left.ty - right.ty),
	);
}

async function readJson<T>(url: string): Promise<T> {
	const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(10_000) });
	if (!response.ok) throw new Error(`${url} antwortet mit HTTP ${response.status}`);
	return response.json() as Promise<T>;
}

async function restartProfile(baseUrl: string, profile: GoldenProfile): Promise<void> {
	const target = profile === "q7-m5" ? "q7-m5" : "q7";
	const reset = profile === "q7-m5" ? "q7" : "q7-m5";
	await ensureAppPluginDesktopProfile(baseUrl, reset);
	await ensureAppPluginDesktopProfile(baseUrl, target);
}

async function mapTransform(baseUrl: string): Promise<Affine> {
	const ui = await readJson<UiState>(`${baseUrl}/ui-state?view=map`);
	const layouts = new Map(ui.nativeHierarchy.layouts.map(entry => [entry.tag, entry.box]));
	const robotPath = findAssetPath(ui.nativeHierarchy.root, ROBOT_ASSET);
	const mapLayerIndex = robotPath.findIndex(node => numericProp(node, "zIndex") === 100);
	if (mapLayerIndex < 0) throw new Error("Originaler Q7-Kartencontainer mit Z-Layer 100 fehlt");
	let world = { ...identity };
	for (const node of robotPath.slice(0, mapLayerIndex + 1)) {
		const box = layouts.get(numericTag(node));
		if (!box) throw new Error(`Native Layoutbox für React-Tag ${String(node.tag)} fehlt`);
		world = multiply(world, localMatrix(box));
	}
	return world;
}

async function sendPointers(
	baseUrl: string,
	pointers: readonly Readonly<Pointer>[],
	pointerOffset: number,
): Promise<PointerResponse> {
	const timeMs = Date.now();
	const response = await fetch(`${baseUrl}/pointer-sequence?view=map`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		signal: AbortSignal.timeout(10_000),
		body: JSON.stringify({
			pointers: pointers.map((pointer, index) => ({
				...pointer,
				...(pointer.pointerId === undefined ? {} : { pointerId: pointer.pointerId + pointerOffset }),
				timeMs: timeMs + index,
			})),
		}),
	});
	const payload = await response.json() as PointerResponse;
	if (!response.ok || payload.error) throw new Error(payload.error ?? `Pointerfolge antwortet mit HTTP ${response.status}`);
	if (payload.activePointerIds.length !== 0) throw new Error("APK-Pointerfolge hinterließ aktive Pointer");
	return payload;
}

function centeredPinch(width: number, height: number, delta: number): readonly Readonly<Pointer>[] {
	return createAppPluginPinchZoomPointers(width, height, delta);
}

function focusedPinch(
	viewport: Readonly<{ width: number; height: number }>,
	focus: Readonly<{ x: number; y: number }>,
): readonly Readonly<Pointer>[] {
	const offsetX = focus.x - viewport.width / 2;
	const offsetY = focus.y - viewport.height / 2;
	return centeredPinch(viewport.width, viewport.height, 1).map(pointer => ({
		...pointer,
		x: pointer.x === undefined ? undefined : pointer.x + offsetX,
		y: pointer.y === undefined ? undefined : pointer.y + offsetY,
	}));
}

function dragGesture(start: Readonly<{ x: number; y: number }>, dx: number, dy: number): readonly Readonly<Pointer>[] {
	return [
		{ kind: "down", pointerId: 31, x: start.x, y: start.y },
		{ kind: "move", pointerId: 31, x: start.x + 1, y: start.y + 1 },
		{ kind: "move", pointerId: 31, x: start.x + dx, y: start.y + dy },
		{ kind: "up", pointerId: 31, x: start.x + dx, y: start.y + dy },
	];
}

function cancelledPinch(focus: Readonly<{ x: number; y: number }>): readonly Readonly<Pointer>[] {
	return [
		{ kind: "down", pointerId: 41, x: focus.x + 40, y: focus.y },
		{ kind: "down", pointerId: 42, x: focus.x - 40, y: focus.y },
		{ kind: "move", pointerId: 41, x: focus.x + 41, y: focus.y },
		{ kind: "move", pointerId: 42, x: focus.x - 55, y: focus.y },
		{ kind: "cancel" },
	];
}

async function reachScaleBoundary(
	baseUrl: string,
	viewport: Readonly<{ width: number; height: number }>,
	direction: -1 | 1,
	pointerOffset: number,
): Promise<{ matrix: Affine; attempts: number }> {
	let before = await mapTransform(baseUrl);
	for (let attempt = 1; attempt <= 20; attempt += 1) {
		await sendPointers(baseUrl, centeredPinch(viewport.width, viewport.height, direction), pointerOffset + attempt * 100);
		const after = await mapTransform(baseUrl);
		if (matrixDistance(before, after) < 1e-6) return { matrix: after, attempts: attempt };
		before = after;
	}
	throw new Error(`AppPlugin-${direction > 0 ? "Maximal-" : "Minimal-"}zoom wurde nach 20 Gesten nicht stabil`);
}

async function runProof(options: ReturnType<typeof parseArgs>): Promise<void> {
	const health = await readJson<RuntimeHealth>(`${options.baseUrl}/health?view=map`);
	if (health.status !== "appplugin-session-ready"
		|| health.productFallbackAllowed !== false
		|| health.bundleKind !== "hermes-bytecode"
		|| health.deviceModel !== "roborock.vacuum.sc01") {
		throw new Error("Gesten-Gate benötigt eine unveränderte Q7-AppPlugin-Sitzung");
	}
	const viewport = health.viewport;
	const initial = await mapTransform(options.baseUrl);
	await sendPointers(options.baseUrl, centeredPinch(viewport.width, viewport.height, 1), 1_000);
	const zoomedIn = await mapTransform(options.baseUrl);
	await sendPointers(options.baseUrl, centeredPinch(viewport.width, viewport.height, -1), 2_000);
	const inverse = await mapTransform(options.baseUrl);
	if (scale(zoomedIn) <= scale(initial) || matrixDistance(initial, inverse) > 1e-5) {
		throw new Error("Inverse AppPlugin-Pinch-Gesten stellen den Ausgangszustand nicht wieder her");
	}

	const minimum = await reachScaleBoundary(options.baseUrl, viewport, -1, 10_000);
	const maximum = await reachScaleBoundary(options.baseUrl, viewport, 1, 20_000);
	const minimumAgain = await reachScaleBoundary(options.baseUrl, viewport, -1, 30_000);
	if (Math.abs(scale(minimum.matrix) - scale(minimumAgain.matrix)) > 1e-6
		|| scale(maximum.matrix) <= scale(minimum.matrix)) {
		throw new Error("AppPlugin-Zoomgrenzen sind nicht deterministisch");
	}

	const focus = { x: viewport.width * 0.68, y: viewport.height * 0.43 };
	const focusBeforeMatrix = await mapTransform(options.baseUrl);
	await sendPointers(options.baseUrl, focusedPinch(viewport, focus), 40_000);
	const focusAfterMatrix = await mapTransform(options.baseUrl);
	const originalZoomAnchor = fixedScreenPoint(focusBeforeMatrix, focusAfterMatrix);
	const mapPointBefore = inversePoint(focusBeforeMatrix, originalZoomAnchor);
	const mapPointAfter = inversePoint(focusAfterMatrix, originalZoomAnchor);
	const focusDrift = Math.hypot(mapPointAfter.x - mapPointBefore.x, mapPointAfter.y - mapPointBefore.y);
	if (scale(focusAfterMatrix) <= scale(focusBeforeMatrix)
		|| !Number.isFinite(originalZoomAnchor.x)
		|| !Number.isFinite(originalZoomAnchor.y)
		|| focusDrift > 1e-6) {
		throw new Error(`AppPlugin-Pinch besitzt keinen stabilen originalen Zoomanker; Drift=${focusDrift}`);
	}

	const dragBefore = await mapTransform(options.baseUrl);
	await sendPointers(options.baseUrl, dragGesture({ x: viewport.width / 2, y: viewport.height * 0.45 }, 36, 24), 50_000);
	const dragAfter = await mapTransform(options.baseUrl);
	const dragTranslation = {
		x: dragAfter.tx - dragBefore.tx,
		y: dragAfter.ty - dragBefore.ty,
	};
	if (Math.hypot(dragTranslation.x, dragTranslation.y) < 1) {
		throw new Error("Originaler Einfinger-Drag verschob die AppPlugin-Karte nicht");
	}

	const cancelBefore = await mapTransform(options.baseUrl);
	const cancelResponse = await sendPointers(
		options.baseUrl,
		cancelledPinch({ x: viewport.width / 2, y: viewport.height * 0.45 }),
		60_000,
	);
	const cancelAfter = await mapTransform(options.baseUrl);
	await sendPointers(options.baseUrl, centeredPinch(viewport.width, viewport.height, 1), 70_000);
	const afterCancelFollowUp = await mapTransform(options.baseUrl);
	if (scale(afterCancelFollowUp) <= scale(cancelAfter)) {
		throw new Error("Nach APK-CANCEL verarbeitet das AppPlugin keine neue Geste");
	}

	const evidence = {
		schemaVersion: 1,
		source: `unchanged-${options.goldenProfile}-appplugin-session`,
		profileLabel: health.profileLabel,
		deviceModel: health.deviceModel,
		bundleKind: health.bundleKind,
		bundleSha256: health.bundleSha256,
		productFallbackAllowed: health.productFallbackAllowed,
		pointerOwnership: "apk-touch-dispatch-to-unchanged-appplugin",
		centerPinch: {
			initialScale: round(scale(initial)),
			zoomedScale: round(scale(zoomedIn)),
			restoredScale: round(scale(inverse)),
			inverseMatrixDelta: round(matrixDistance(initial, inverse)),
		},
		boundaries: {
			minScale: round(scale(minimum.matrix)),
			maxScale: round(scale(maximum.matrix)),
			minScaleAfterRoundTrip: round(scale(minimumAgain.matrix)),
			minAttempts: minimum.attempts,
			maxAttempts: maximum.attempts,
			minRoundTripAttempts: minimumAgain.attempts,
		},
		focus: {
			requestedTouchCenter: { x: round(focus.x), y: round(focus.y) },
			originalZoomAnchor: { x: round(originalZoomAnchor.x), y: round(originalZoomAnchor.y) },
			mapPointBefore: { x: round(mapPointBefore.x), y: round(mapPointBefore.y) },
			mapPointAfter: { x: round(mapPointAfter.x), y: round(mapPointAfter.y) },
			drift: round(focusDrift),
		},
		drag: {
			requestedDelta: { x: 36, y: 24 },
			observedTranslationDelta: { x: round(dragTranslation.x), y: round(dragTranslation.y) },
		},
		cancel: {
			frameChangedBeforeCancel: cancelResponse.frameChanged,
			matrixBefore: roundedMatrix(cancelBefore),
			matrixAfter: roundedMatrix(cancelAfter),
			activePointerIdsAfterCancel: cancelResponse.activePointerIds,
			followUpGestureAccepted: true,
		},
	};
	const fixtureDirectory = path.join(process.cwd(), "test", "fixtures", "appplugin");
	const goldenPath = path.join(fixtureDirectory, `${options.goldenProfile}-gesture-golden.json`);
	if (options.updateGolden) {
		fs.writeFileSync(goldenPath, `${JSON.stringify(evidence, null, 2)}\n`, "utf8");
		process.stdout.write(`${JSON.stringify({ status: "gesture-golden-updated", goldenPath })}\n`);
		return;
	}
	const expected = JSON.parse(fs.readFileSync(goldenPath, "utf8")) as typeof evidence;
	if (JSON.stringify(expected) !== JSON.stringify(evidence)) {
		const diagnosticDirectory = path.join(
			process.cwd(),
			"artifacts",
			"appplugin-poc",
			`${options.goldenProfile}-gesture-golden-mismatch`,
		);
		fs.mkdirSync(diagnosticDirectory, { recursive: true });
		fs.writeFileSync(path.join(diagnosticDirectory, "expected.json"), `${JSON.stringify(expected, null, 2)}\n`, "utf8");
		fs.writeFileSync(path.join(diagnosticDirectory, "actual.json"), `${JSON.stringify(evidence, null, 2)}\n`, "utf8");
		throw new Error(`Gesten-Golden weicht ab; Diagnose: ${diagnosticDirectory}`);
	}
	process.stdout.write(`${JSON.stringify({
		status: "gesture-proof-passed",
		goldenProfile: options.goldenProfile,
		bundleSha256: health.bundleSha256,
	})}\n`);
}

async function main(): Promise<void> {
	const options = parseArgs(process.argv.slice(2));
	await restartProfile(options.baseUrl, options.goldenProfile);
	try {
		await runProof(options);
	} finally {
		await restartProfile(options.baseUrl, options.goldenProfile);
	}
}

void main().catch(error => {
	process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
	process.exitCode = 1;
});
