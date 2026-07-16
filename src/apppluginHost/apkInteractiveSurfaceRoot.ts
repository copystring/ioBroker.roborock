import type { ApkNativeViewHierarchySnapshot } from "./apkNativeViewHierarchyRuntime";
import type { ApkUiManagerNodeSnapshot } from "./apkUiManagerRuntime";

export interface ApkInteractiveSurfaceRoot {
	tag: number;
	viewName: string;
	width: number;
	height: number;
	area: number;
	responderContractCount: number;
}

export interface ApkServedSurfaceOptions {
	fullRootTag: number | undefined;
	fallbackWidth: number;
	fallbackHeight: number;
}

const RESPONDER_CONTRACTS = Object.freeze([
	"onStartShouldSetResponder",
	"onMoveShouldSetResponder",
	"onResponderGrant",
	"onResponderMove",
	"onResponderRelease",
] as const);

function walk(
	node: ApkUiManagerNodeSnapshot,
	visit: (node: ApkUiManagerNodeSnapshot) => void,
): void {
	visit(node);
	for (const child of node.children) walk(child, visit);
}

/**
 * Finds the dominant interactive surface exposed by the unchanged React Native
 * AppPlugin. Selection is based only on APK host contracts (native layout,
 * clipping and responder callbacks), never on Roborock map semantics or tags.
 */
export function findApkInteractiveSurfaceRoot(
	hierarchy: Readonly<ApkNativeViewHierarchySnapshot>,
): Readonly<ApkInteractiveSurfaceRoot> {
	const layouts = new Map(hierarchy.layouts.map(entry => [entry.tag, entry.box] as const));
	const candidates: ApkInteractiveSurfaceRoot[] = [];
	walk(hierarchy.root, node => {
		const layout = layouts.get(node.tag);
		if (!layout || layout.width <= 0 || layout.height <= 0) return;
		const responderContractCount = RESPONDER_CONTRACTS.reduce(
			(count, contract) => count + (node.props[contract] === true ? 1 : 0),
			0,
		);
		if (responderContractCount < 4 || node.props.overflow !== "hidden") return;
		candidates.push({
			tag: node.tag,
			viewName: node.viewName,
			width: layout.width,
			height: layout.height,
			area: layout.width * layout.height,
			responderContractCount,
		});
	});
	const selected = candidates.sort((left, right) =>
		right.area - left.area
		|| right.responderContractCount - left.responderContractCount
		|| left.tag - right.tag,
	)[0];
	if (!selected) {
		throw new Error("Das unveränderte AppPlugin stellte keine native interaktive Hauptfläche bereit");
	}
	return Object.freeze(selected);
}

/**
 * Selects the exact native surface exposed by the probe server. An explicit
 * full-root request always wins over automatic map-surface discovery so frame
 * rendering and pointer coordinates share the same coordinate space.
 */
export function selectApkServedSurfaceRoot(
	hierarchy: Readonly<ApkNativeViewHierarchySnapshot>,
	options: Readonly<ApkServedSurfaceOptions>,
): Readonly<ApkInteractiveSurfaceRoot> {
	if (options.fullRootTag === undefined) return findApkInteractiveSurfaceRoot(hierarchy);
	let root: ApkUiManagerNodeSnapshot | undefined;
	walk(hierarchy.root, node => {
		if (node.tag === options.fullRootTag) root = node;
	});
	if (!root) throw new Error("APK-Vollansicht-Root " + options.fullRootTag + " fehlt");
	const layout = hierarchy.layouts.find(entry => entry.tag === options.fullRootTag)?.box;
	const width = layout?.width ?? options.fallbackWidth;
	const height = layout?.height ?? options.fallbackHeight;
	return Object.freeze({
		tag: root.tag,
		viewName: root.viewName,
		width,
		height,
		area: width * height,
		responderContractCount: 0,
	});
}
