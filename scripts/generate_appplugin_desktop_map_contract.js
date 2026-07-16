#!/usr/bin/env node

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { createCanvas, Path2D } = require("@napi-rs/canvas");
const { fileURLToPath } = require("node:url");

const repositoryRoot = path.resolve(__dirname, "..");
const defaultRuntimeLog = path.join(
	repositoryRoot,
	"artifacts",
	"appplugin-poc",
	"q7-l5-hermes-runtime-live-map-v10-original-ui-png.log",
);
const defaultOutput = path.join(repositoryRoot, "www", "q7-original-map-contract.json");


function apkNumericColorToCss(color) {
	if (typeof color !== "number") return null;
	const value = color >>> 0;
	const alpha = (value >>> 24) & 0xff;
	const red = (value >>> 16) & 0xff;
	const green = (value >>> 8) & 0xff;
	const blue = value & 0xff;
	return `rgb(${red} ${green} ${blue} / ${(alpha / 255).toFixed(6)})`;
}

function apkColorToCss(brush) {
	return apkNumericColorToCss(brush?.payload);
}

function applyUiOperations(operations) {
	const views = new Map();
	const children = new Map();

	for (const operation of operations) {
		const args = operation.arguments ?? [];
		if (operation.method === "createView") {
			views.set(args[0], { tag: args[0], viewName: args[1], props: args[3] ?? {} });
			if (!children.has(args[0])) children.set(args[0], []);
			continue;
		}
		if (operation.method === "updateView") {
			const view = views.get(args[0]);
			if (view) view.props = { ...view.props, ...(args[2] ?? {}) };
			continue;
		}
		if (operation.method === "setChildren") {
			children.set(args[0], [...(args[1] ?? [])]);
			continue;
		}
		if (operation.method !== "manageChildren") continue;

		const [parentTag, moveFrom = [], moveTo = [], addTags = [], addAt = [], removeAt = []] = args;
		const current = [...(children.get(parentTag) ?? [])];
		const moved = moveFrom.map(index => current[index]);
		const removed = [...new Set([...moveFrom, ...removeAt])].sort((left, right) => right - left);
		for (const index of removed) current.splice(index, 1);
		const insertions = [
			...moved.map((tag, index) => ({ tag, index: moveTo[index] })),
			...addTags.map((tag, index) => ({ tag, index: addAt[index] })),
		].sort((left, right) => left.index - right.index);
		for (const insertion of insertions) current.splice(insertion.index, 0, insertion.tag);
		children.set(parentTag, current);
	}

	const parents = new Map();
	for (const [parent, childTags] of children) {
		for (const child of childTags) parents.set(child, parent);
	}
	return { views, children, parents };
}

function descendants(tag, tree) {
	const result = [];
	const pending = [...(tree.children.get(tag) ?? [])];
	while (pending.length) {
		const child = pending.shift();
		result.push(child);
		pending.unshift(...(tree.children.get(child) ?? []));
	}
	return result;
}

function ancestors(tag, tree) {
	const result = [];
	let current = tree.parents.get(tag);
	while (current !== undefined) {
		result.push(current);
		current = tree.parents.get(current);
	}
	return result;
}

function readAssetDataUri(view, name) {
	const source = view?.props?.src?.find(candidate => typeof candidate?.uri === "string");
	if (!source) throw new Error(`Originales AppPlugin-Asset fehlt im Laufvertrag: ${name}`);
	const filePath = fileURLToPath(source.uri);
	const extension = path.extname(filePath).slice(1).toLowerCase();
	const mime = extension === "jpg" || extension === "jpeg" ? "image/jpeg" : `image/${extension || "png"}`;
	return `data:${mime};base64,${fs.readFileSync(filePath).toString("base64")}`;
}

function findViewsByAsset(tree, fragment) {
	return [...tree.views.values()].filter(view => view.props?.src?.some(source => source?.uri?.includes(fragment)));
}

function findViewByAsset(tree, fragment) {
	return findViewsByAsset(tree, fragment)[0];
}

function originalRoomProfiles(tree) {
	const roots = new Map();
	for (const iconView of findViewsByAsset(tree, "maproom_select_other.png")) {
		const root = findPositionedAncestor(iconView.tag, tree, props => props.zIndex === 1001 && props.position === "absolute");
		if (!root) continue;
		const texts = [...new Set(descendants(root.tag, tree)
			.map(tag => tree.views.get(tag))
			.filter(view => view?.viewName === "RCTRawText" && typeof view.props?.text === "string")
			.map(view => view.props.text))];
		if (texts.length !== 1) {
			throw new Error("Das AppPlugin lieferte für Raumprofil " + root.tag + " nicht genau einen Raumnamen");
		}
		const markerView = tree.views.get(tree.parents.get(iconView.tag));
		if (!markerView) throw new Error("Der originale Raumindikator fehlt im React-Native-Baum");
		roots.set(root.tag, { root, markerView, name: texts[0] });
	}
	return [...roots.values()].sort((left, right) => left.root.tag - right.root.tag);
}

function findPositionedAncestor(tag, tree, predicate) {
	return ancestors(tag, tree)
		.map(ancestorTag => tree.views.get(ancestorTag))
		.find(view => view && predicate(view.props));
}

function effectiveRect(props) {
	const width = Number(props.width) || 0;
	const height = Number(props.height) || 0;
	const transforms = Array.isArray(props.transform) ? props.transform : [];
	const scaleX = Number(transforms.find(transform => transform.scaleX !== undefined)?.scaleX ?? transforms.find(transform => transform.scale !== undefined)?.scale ?? 1);
	const scaleY = Number(transforms.find(transform => transform.scaleY !== undefined)?.scaleY ?? transforms.find(transform => transform.scale !== undefined)?.scale ?? 1);
	return {
		x: (Number(props.left) || 0) + width * (1 - scaleX) / 2,
		y: (Number(props.top) || 0) + height * (1 - scaleY) / 2,
		width: width * scaleX,
		height: height * scaleY,
	};
}

function mapLocalRectToSource(rect, placement) {
	return {
		x: (rect.x - placement.x) / placement.scale,
		y: (rect.y - placement.y) / placement.scale,
		width: rect.width / placement.scale,
		height: rect.height / placement.scale,
	};
}

function buildContract(runtimeLogPath = defaultRuntimeLog) {
	const runtime = JSON.parse(fs.readFileSync(runtimeLogPath, "utf8"));
	const tree = applyUiOperations(runtime.uiOperations ?? []);
	const svgCandidates = [...tree.views.values()]
		.filter(view => view.viewName === "RNSVGSvgViewAndroid")
		.map(view => ({
			view,
			pathTags: descendants(view.tag, tree).filter(tag => tree.views.get(tag)?.viewName === "RNSVGPath"),
		}))
		.filter(candidate => candidate.pathTags.length > 1)
		.sort((left, right) => {
			const leftArea = Number(left.view.props.bbWidth) * Number(left.view.props.bbHeight);
			const rightArea = Number(right.view.props.bbWidth) * Number(right.view.props.bbHeight);
			return rightArea - leftArea;
		});
	const mapSvg = svgCandidates[0];
	if (!mapSvg) throw new Error("Der direkte AppPlugin-Lauf enthält keine vollständige SVG-Kartenebene");

	const width = Number(mapSvg.view.props.vbWidth ?? mapSvg.view.props.bbWidth);
	const height = Number(mapSvg.view.props.vbHeight ?? mapSvg.view.props.bbHeight);
	const wrapper = ancestors(mapSvg.view.tag, tree)
		.map(tag => tree.views.get(tag))
		.find(view => view?.props?.position === "relative" && Number(view.props.width) > 0 && Number(view.props.height) > 0);
	if (!wrapper) throw new Error("Die originale Kartenplatzierung konnte nicht aus dem RN-Baum bestimmt werden");
	const placement = {
		x: Number(wrapper.props.left),
		y: Number(wrapper.props.top),
		scale: Number(wrapper.props.width) / width,
	};

	const layers = mapSvg.pathTags.map(tag => {
		const props = tree.views.get(tag).props;
		return {
			tag,
			d: props.d,
			fill: apkColorToCss(props.fill),
			stroke: apkColorToCss(props.stroke),
			strokeWidth: props.strokeWidth ?? 0,
		};
	});

	const roomProfiles = originalRoomProfiles(tree).map(profile => ({
		...profile,
		label: {
			x: (Number(profile.root.props.left) + Number(profile.root.props.width) / 2 - placement.x) / placement.scale,
			y: (Number(profile.root.props.top) + Number(profile.root.props.height) / 2 - placement.y) / placement.scale,
		},
	}));
	if (roomProfiles.length === 0) throw new Error("Das AppPlugin lieferte keine originalen Raumprofile");

	const pathContext = createCanvas(width, height).getContext("2d");
	const rooms = roomProfiles.map((profile, index) => {
		const matchingLayers = layers.filter(layer => {
			if (!layer.fill || !layer.d) return false;
			return pathContext.isPointInPath(new Path2D(layer.d), profile.label.x, profile.label.y);
		});
		if (matchingLayers.length !== 1) {
			throw new Error(
				`Der originale Raummittelpunkt von ${profile.name} traf ${matchingLayers.length} Kartenebenen statt genau einer`,
			);
		}
		const layer = matchingLayers[0];
		return {
			id: index + 1,
			name: profile.name,
			pathTag: layer.tag,
			d: layer.d,
			colors: {
				labelBackground: apkNumericColorToCss(profile.markerView.props.backgroundColor) ?? "transparent",
				labelBorder: apkNumericColorToCss(profile.markerView.props.borderColor) ?? "transparent",
			},
			label: profile.label,
		};
	});

	const robotAssetView = findViewByAsset(tree, "common_robot.png");
	const dockAssetView = findViewByAsset(tree, "common_charge_android.png");
	const roomIconView = findViewByAsset(tree, "maproom_select_other.png");
	const robotRoot = robotAssetView && findPositionedAncestor(robotAssetView.tag, tree, props => props.zIndex === 490);
	const dockRoot = dockAssetView && findPositionedAncestor(dockAssetView.tag, tree, props => props.zIndex === 400);
	if (!robotAssetView || !dockAssetView || !roomIconView || !robotRoot || !dockRoot) {
		throw new Error("Roboter-, Dock- oder Raum-Asset fehlt im direkten AppPlugin-Lauf");
	}

	const cleanPath = [...tree.views.values()].find(view => view.viewName === "RNSVGPath" && Array.isArray(view.props.strokeDasharray));
	const bundlePath = runtime.bundlePath;
	const bundleHash = fs.existsSync(bundlePath)
		? crypto.createHash("sha256").update(fs.readFileSync(bundlePath)).digest("hex")
		: null;

	return {
		schemaVersion: 1,
		provenance: {
			model: "Q7 L5 / SC01",
			bundleKind: runtime.bundleKind,
			bundleSha256: bundleHash,
			runtimeLog: path.relative(repositoryRoot, runtimeLogPath).replaceAll("\\", "/"),
			directBundleStarted: runtime.applicationStarted === true,
		},
		viewBox: { x: 0, y: 0, width, height },
		placement,
		limits: {
			minScale: 1,
			maxScale: 8,
			zoomFactor: 0.015,
			maxCleanZones: 5,
			maxVirtualAreas: 10,
			maxVirtualWalls: 10,
			virtualAreaDefaultSize: 128,
			virtualAreaMinSize: 104,
			virtualWallDefaultWidth: 96,
			virtualWallMinWidth: 60,
		},
		colors: {
			zoneStroke: "#007AFF",
			zoneBorder: "#0000004D",
			zoneFill: "rgba(0, 0, 0, 0.15)",
			virtualStroke: "#FF3B30",
			virtualFill: "#FF3B3033",
			eraseStroke: "#FF9500",
			eraseFill: "#FF95004D",
		},
		layers,
		rooms,
		cleanPath: cleanPath ? {
			d: cleanPath.props.d,
			stroke: apkColorToCss(cleanPath.props.stroke),
			strokeWidth: cleanPath.props.strokeWidth,
			strokeDasharray: cleanPath.props.strokeDasharray,
			localToSource: {
				x: -placement.x / placement.scale,
				y: -placement.y / placement.scale,
				scale: 1 / placement.scale,
			},
		} : null,
		assets: {
			robot: readAssetDataUri(robotAssetView, "Roboter"),
			dock: readAssetDataUri(dockAssetView, "Dock"),
			roomMarker: readAssetDataUri(roomIconView, "Raummarker"),
		},
		objects: {
			robot: mapLocalRectToSource(effectiveRect(robotRoot.props), placement),
			dock: {
				...mapLocalRectToSource(effectiveRect(dockRoot.props), placement),
				rotation: Number(String(dockRoot.props.transform?.find(transform => transform.rotateZ)?.rotateZ ?? "0").replace("deg", "")),
			},
		},
	};
}

function writeContract(runtimeLogPath = defaultRuntimeLog, outputPath = defaultOutput) {
	const contract = buildContract(runtimeLogPath);
	fs.mkdirSync(path.dirname(outputPath), { recursive: true });
	fs.writeFileSync(outputPath, `${JSON.stringify(contract)}\n`, "utf8");
	return contract;
}

function main() {
	const runtimeLogPath = process.argv[2] ? path.resolve(process.argv[2]) : defaultRuntimeLog;
	const outputPath = process.argv[3] ? path.resolve(process.argv[3]) : defaultOutput;
	const contract = writeContract(runtimeLogPath, outputPath);
	console.log(`Generated ${path.relative(repositoryRoot, outputPath)} from original bundle runtime (${contract.rooms.length} rooms, ${contract.layers.length} layers)`);
}

if (require.main === module) main();

module.exports = { buildContract, writeContract };
