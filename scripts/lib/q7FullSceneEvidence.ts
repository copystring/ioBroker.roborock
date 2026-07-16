import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { createCanvas, loadImage } from "@napi-rs/canvas";

type JsonRecord = Record<string, unknown>;

interface TreeEntry {
	node: JsonRecord;
	ancestors: JsonRecord[];
}

export interface Q7FullSceneEvidenceOptions {
	bundleSha256: string;
	fixtureSha256: string;
}

export interface Q7VisualComparison {
	actualSha256: string;
	expectedSha256: string;
	exactMatch: boolean;
	width: number;
	height: number;
	differingPixelCount: number;
	significantPixelCount: number;
	significantPixelRatio: number;
	meanChannelDelta: number;
	maximumChannelDelta: number;
}

export function jsonRecord(value: unknown, context: string): JsonRecord {
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`${context} muss ein Objekt sein`);
	}
	return value as JsonRecord;
}

export function jsonArray(value: unknown, context: string): unknown[] {
	if (!Array.isArray(value)) throw new Error(`${context} muss ein Array sein`);
	return value;
}

export function sha256File(filePath: string): string {
	return createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function sortedRecord(entries: Iterable<readonly [string, unknown]>): JsonRecord {
	return Object.fromEntries([...entries].sort(([left], [right]) => left.localeCompare(right)));
}

function collectTree(root: JsonRecord): TreeEntry[] {
	const entries: TreeEntry[] = [];
	const visit = (node: JsonRecord, ancestors: JsonRecord[]): void => {
		entries.push({ node, ancestors });
		for (const child of jsonArray(node.children, `Kinder von UI-Knoten ${String(node.tag)}`)) {
			visit(jsonRecord(child, "UI-Kind"), [...ancestors, node]);
		}
	};
	visit(root, []);
	return entries;
}

function findTreeNode(root: JsonRecord, tag: number): JsonRecord {
	const entry = collectTree(root).find(candidate => candidate.node.tag === tag);
	if (!entry) throw new Error(`Interaktive AppPlugin-Fläche ${tag} fehlt im UI-Baum`);
	return entry.node;
}

function rawText(root: JsonRecord): string[] {
	return collectTree(root).flatMap(({ node }) => {
		if (node.viewName !== "RCTRawText") return [];
		const props = jsonRecord(node.props, "RCTRawText-Props");
		return typeof props.text === "string" && props.text.length > 0 ? [props.text] : [];
	});
}

function basenameFromAssetUri(uri: unknown): string | undefined {
	if (typeof uri !== "string" || uri.length === 0) return undefined;
	const normalized = decodeURIComponent(uri).replaceAll("\\", "/");
	return path.posix.basename(normalized);
}

function imageAsset(node: JsonRecord): string | undefined {
	const props = jsonRecord(node.props, "Bild-Props");
	if (!Array.isArray(props.src) || props.src.length === 0) return undefined;
	return basenameFromAssetUri(jsonRecord(props.src[0], "Bildquelle").uri);
}

function numericPaintPayload(value: unknown): number | null {
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;
	const payload = (value as JsonRecord).payload;
	return typeof payload === "number" ? payload : null;
}

function nearestZLayer(entry: TreeEntry): JsonRecord | undefined {
	return [...entry.ancestors].reverse().find(ancestor => {
		const props = jsonRecord(ancestor.props, "Layer-Props");
		return typeof props.zIndex === "number";
	});
}

function actorEvidence(entries: TreeEntry[], asset: string): JsonRecord {
	const image = entries.find(entry => entry.node.viewName === "RCTImageView" && imageAsset(entry.node) === asset);
	if (!image) throw new Error(`AppPlugin-Akteur ${asset} fehlt`);
	const imageProps = jsonRecord(image.node.props, `${asset}-Bildprops`);
	const layer = nearestZLayer(image);
	if (!layer) throw new Error(`AppPlugin-Akteur ${asset} besitzt keinen Z-Layer`);
	const layerProps = jsonRecord(layer.props, `${asset}-Layerprops`);
	return {
		asset,
		imageWidth: imageProps.width,
		imageHeight: imageProps.height,
		layerZIndex: layerProps.zIndex,
		layerWidth: layerProps.width,
		layerHeight: layerProps.height,
	};
}

function summarizeSceneInventory(result: JsonRecord): JsonRecord {
	const logs = jsonArray(result.appSysLogs, "appSysLogs").map(value => jsonRecord(value, "AppSys-Log"));
	const sceneLog = logs.find(log => log.tag === "apk-map-scene-probe");
	if (!sceneLog || typeof sceneLog.message !== "string") {
		throw new Error("AppPlugin lieferte keine vollständige Karteninventur");
	}
	const scene = jsonRecord(JSON.parse(sceneLog.message) as unknown, "Karteninventur");
	return {
		allDataKeys: jsonArray(scene.allDataKeys, "allDataKeys"),
		arrayCounts: jsonRecord(scene.arrayCounts, "arrayCounts"),
		nestedArrayCounts: jsonRecord(scene.nestedArrayCounts, "nestedArrayCounts"),
		mapPixelCount: scene.mapPixelCount,
		mapPixelHistogram: jsonRecord(scene.mapPixelHistogram, "mapPixelHistogram"),
		roomChains: jsonArray(scene.roomChains, "roomChains"),
		roomMatrixValues: jsonArray(scene.roomMatrixValues, "roomMatrixValues"),
	};
}

function summarizeWorker(result: JsonRecord): JsonRecord {
	const diagnostics = jsonArray(result.workerDiagnostics, "workerDiagnostics")
		.map(value => jsonRecord(value, "Worker-Diagnose"));
	const start = diagnostics.find(diagnostic => diagnostic.kind === "start" && diagnostic.success === true);
	const call = diagnostics.find(diagnostic => diagnostic.kind === "call"
		&& diagnostic.functionName === "transform"
		&& diagnostic.success === true);
	if (!start || typeof start.sha256 !== "string") throw new Error("Originaler Q7-Worker wurde nicht gestartet");
	if (!call) throw new Error("Originaler Q7-Worker transform war nicht erfolgreich");
	const summary = jsonRecord(call.resultSummary, "Worker-Ergebnis");
	const fields = jsonRecord(summary.fields, "Worker-Ergebnisfelder");
	const transformedMap = jsonRecord(fields.result, "Worker-Kartenergebnis");
	return {
		asset: basenameFromAssetUri(start.workerPath),
		sha256: start.sha256,
		functionName: call.functionName,
		resultLength: transformedMap.length,
	};
}

function summarizeMapSurface(result: JsonRecord): JsonRecord {
	const uiTree = jsonRecord(result.uiTree, "uiTree");
	const surface = jsonRecord(result.interactiveSurface, "interactiveSurface");
	if (typeof surface.tag !== "number") throw new Error("Interaktive Kartenfläche besitzt kein Tag");
	const root = findTreeNode(uiTree, surface.tag);
	const entries = collectTree(root);
	const viewCounts = new Map<string, number>();
	for (const { node } of entries) {
		const viewName = String(node.viewName);
		viewCounts.set(viewName, (viewCounts.get(viewName) ?? 0) + 1);
	}
	const textCounts = new Map<string, number>();
	for (const text of rawText(root)) textCounts.set(text, (textCounts.get(text) ?? 0) + 1);
	const imageCounts = new Map<string, JsonRecord>();
	for (const { node } of entries.filter(entry => entry.node.viewName === "RCTImageView")) {
		const asset = imageAsset(node);
		if (!asset) continue;
		const props = jsonRecord(node.props, `${asset}-Props`);
		const key = JSON.stringify([asset, props.width, props.height]);
		const current = imageCounts.get(key);
		imageCounts.set(key, {
			asset,
			width: props.width,
			height: props.height,
			count: typeof current?.count === "number" ? current.count + 1 : 1,
		});
	}
	const paths = entries
		.filter(entry => entry.node.viewName === "RNSVGPath")
		.map(({ node }) => {
			const props = jsonRecord(node.props, "RNSVGPath-Props");
			const data = typeof props.d === "string" ? props.d : "";
			return {
				fill: numericPaintPayload(props.fill),
				stroke: numericPaintPayload(props.stroke),
				strokeWidth: typeof props.strokeWidth === "number" ? props.strokeWidth : null,
				dataLength: data.length,
				dataSha256: createHash("sha256").update(data).digest("hex"),
			};
		});
	const pag = entries.find(entry => entry.node.viewName === "RRPAGAnimationView");
	if (!pag) throw new Error("AppPlugin-Roboteranimation fehlt");
	const pagProps = jsonRecord(pag.node.props, "PAG-Props");
	const robot = actorEvidence(entries, "src_sc_components_resource_images_common_robot.png");
	const dock = actorEvidence(entries, "src_sc_components_resource_images_common_charge_android.png");
	const artifact = jsonRecord(result.apkInteractiveSurfacePng, "Karten-PNG");
	return {
		viewCounts: sortedRecord(viewCounts),
		textCounts: sortedRecord(textCounts),
		images: [...imageCounts.values()].sort((left, right) => String(left.asset).localeCompare(String(right.asset))),
		paths,
		filledPathCount: paths.filter(item => item.fill !== null).length,
		strokedPathCount: paths.filter(item => item.stroke !== null).length,
		robot,
		dock,
		robotAboveDock: Number(robot.layerZIndex) > Number(dock.layerZIndex),
		robotAnimation: {
			asset: basenameFromAssetUri(pagProps.filePath),
			width: pagProps.width,
			height: pagProps.height,
			autoPlay: pagProps.autoPlay,
			loop: pagProps.loop,
		},
		render: {
			width: artifact.width,
			height: artifact.height,
			contentBounds: artifact.contentBounds,
			renderedNativeViews: artifact.renderedNativeViews,
			svgViews: artifact.svgViews,
			svgGroups: artifact.svgGroups,
			svgPaths: artifact.svgPaths,
			embeddedImages: artifact.embeddedImages,
			textNodes: artifact.textNodes,
		},
	};
}

export function buildQ7FullSceneEvidence(
	resultValue: unknown,
	options: Q7FullSceneEvidenceOptions,
): JsonRecord {
	const result = jsonRecord(resultValue, "Probe-Ergebnis");
	return {
		version: 1,
		runtime: {
			bundleKind: result.bundleKind,
			bundleSha256: options.bundleSha256,
			fixtureSha256: options.fixtureSha256,
			worker: summarizeWorker(result),
		},
		scene: summarizeSceneInventory(result),
		map: summarizeMapSurface(result),
	};
}

export async function compareQ7FullScenePng(
	actualPath: string,
	expectedPath: string,
): Promise<Q7VisualComparison> {
	const [actualImage, expectedImage] = await Promise.all([loadImage(actualPath), loadImage(expectedPath)]);
	if (actualImage.width !== expectedImage.width || actualImage.height !== expectedImage.height) {
		throw new Error(
			`Karten-Golden hat andere Maße: ${actualImage.width}x${actualImage.height} statt `
			+ `${expectedImage.width}x${expectedImage.height}`,
		);
	}
	const readPixels = (image: typeof actualImage): Uint8ClampedArray => {
		const canvas = createCanvas(image.width, image.height);
		const context = canvas.getContext("2d");
		context.drawImage(image, 0, 0);
		return context.getImageData(0, 0, image.width, image.height).data;
	};
	const actual = readPixels(actualImage);
	const expected = readPixels(expectedImage);
	let differingPixelCount = 0;
	let significantPixelCount = 0;
	let totalChannelDelta = 0;
	let maximumChannelDelta = 0;
	for (let offset = 0; offset < actual.length; offset += 4) {
		let pixelMaximum = 0;
		for (let channel = 0; channel < 4; channel += 1) {
			const delta = Math.abs(actual[offset + channel] - expected[offset + channel]);
			totalChannelDelta += delta;
			pixelMaximum = Math.max(pixelMaximum, delta);
			maximumChannelDelta = Math.max(maximumChannelDelta, delta);
		}
		if (pixelMaximum > 0) differingPixelCount += 1;
		if (pixelMaximum > 12) significantPixelCount += 1;
	}
	const pixelCount = actualImage.width * actualImage.height;
	return {
		actualSha256: sha256File(actualPath),
		expectedSha256: sha256File(expectedPath),
		exactMatch: Buffer.compare(fs.readFileSync(actualPath), fs.readFileSync(expectedPath)) === 0,
		width: actualImage.width,
		height: actualImage.height,
		differingPixelCount,
		significantPixelCount,
		significantPixelRatio: significantPixelCount / pixelCount,
		meanChannelDelta: totalChannelDelta / actual.length,
		maximumChannelDelta,
	};
}
