import type { ApkNativeMeasuredBox, ApkUiManagerNodeSnapshot } from "./apkUiManagerRuntime";

export const APK_SEMANTIC_UI_ACTION_IDS = [
	"map.mode.full",
	"map.mode.rooms",
	"map.mode.zones",
	"clean.panel",
	"dock.panel",
	"clean.start",
] as const;

export type ApkSemanticUiActionId = (typeof APK_SEMANTIC_UI_ACTION_IDS)[number];

export interface ApkSemanticUiAction {
	id: ApkSemanticUiActionId;
	label: string;
	enabled: boolean;
	selected: boolean;
	owner: "unchanged-appplugin-ui";
	contract: "scmap-bottom-control-panel-v2";
}

export interface ApkResolvedSemanticUiAction extends ApkSemanticUiAction {
	reactTag: number;
	center: Readonly<{ x: number; y: number }>;
}

interface NodePath {
	node: ApkUiManagerNodeSnapshot;
	path: readonly ApkUiManagerNodeSnapshot[];
}

interface PressableGroup extends NodePath {
	buttons: readonly ApkUiManagerNodeSnapshot[];
}

const modeActionIds = [
	"map.mode.full",
	"map.mode.rooms",
	"map.mode.zones",
] as const satisfies readonly ApkSemanticUiActionId[];

const panelActionIds = [
	"clean.panel",
	"dock.panel",
] as const satisfies readonly ApkSemanticUiActionId[];

function rawText(node: ApkUiManagerNodeSnapshot): string {
	if (node.viewName === "RCTRawText") {
		return typeof node.props.text === "string" ? node.props.text : "";
	}
	return node.children.map(rawText).join("");
}

function isPressable(node: ApkUiManagerNodeSnapshot): boolean {
	return node.props.accessible === true
		&& node.props.onClick === true
		&& node.props.onStartShouldSetResponder === true
		&& node.props.onResponderRelease === true;
}

function isDisabled(node: ApkUiManagerNodeSnapshot): boolean {
	const accessibilityState = node.props.accessibilityState;
	return node.props.display === "none"
		|| node.props.opacity === 0
		|| (
			typeof accessibilityState === "object"
			&& accessibilityState !== null
			&& !Array.isArray(accessibilityState)
			&& (accessibilityState as Readonly<Record<string, unknown>>).disabled === true
		);
}

function selectedByAppPlugin(node: ApkUiManagerNodeSnapshot): boolean {
	if (node.viewName === "RCTText") {
		const weight = node.props.fontWeight;
		if (weight === "bold" || weight === "600" || weight === "700") return true;
		if (typeof weight === "number" && weight >= 600) return true;
	}
	return node.children.some(selectedByAppPlugin);
}

function collectGroups(root: ApkUiManagerNodeSnapshot, buttonCount: number): PressableGroup[] {
	const result: PressableGroup[] = [];
	const visit = (
		node: ApkUiManagerNodeSnapshot,
		path: readonly ApkUiManagerNodeSnapshot[],
	): void => {
		const buttons = node.children.filter(child => isPressable(child) && rawText(child).length > 0);
		if (buttons.length === buttonCount) result.push({ node, path: [...path, node], buttons });
		for (const child of node.children) visit(child, [...path, node]);
	};
	visit(root, []);
	return result;
}

function commonPathLength(
	left: readonly ApkUiManagerNodeSnapshot[],
	right: readonly ApkUiManagerNodeSnapshot[],
): number {
	const maximum = Math.min(left.length, right.length);
	let length = 0;
	while (length < maximum && left[length].tag === right[length].tag) length += 1;
	return length;
}

function measuredGroupCenterY(
	group: PressableGroup,
	measure: (tag: number) => Readonly<ApkNativeMeasuredBox> | undefined,
): number | undefined {
	const boxes = group.buttons.map(button => measure(button.tag));
	if (boxes.some(box => box === undefined)) return undefined;
	return boxes.reduce((sum, box) => sum + box!.y + box!.height / 2, 0) / boxes.length;
}

function selectScMapControlGroups(
	root: ApkUiManagerNodeSnapshot,
	measure: (tag: number) => Readonly<ApkNativeMeasuredBox> | undefined,
): Readonly<{
	panel: ApkUiManagerNodeSnapshot;
	modes: PressableGroup;
	primary: PressableGroup;
}> | undefined {
	const candidates = collectGroups(root, 3).flatMap(modes =>
		collectGroups(root, 2).flatMap(primary => {
			const commonDepth = commonPathLength(modes.path, primary.path);
			const modesY = measuredGroupCenterY(modes, measure);
			const primaryY = measuredGroupCenterY(primary, measure);
			if (commonDepth < 2 || modesY === undefined || primaryY === undefined || modesY >= primaryY) return [];
			return [{ modes, primary, commonDepth, verticalGap: primaryY - modesY }];
		}),
	);
	candidates.sort((left, right) =>
		right.commonDepth - left.commonDepth
		|| left.verticalGap - right.verticalGap
		|| left.modes.node.tag - right.modes.node.tag,
	);
	const selected = candidates[0];
	if (!selected) return undefined;
	return {
		panel: selected.modes.path[selected.commonDepth - 1],
		modes: selected.modes,
		primary: selected.primary,
	};
}

function resolveGroup(
	group: PressableGroup,
	ids: readonly ApkSemanticUiActionId[],
	measure: (tag: number) => Readonly<ApkNativeMeasuredBox> | undefined,
): ApkResolvedSemanticUiAction[] {
	return group.buttons.map((button, index) => {
		const box = measure(button.tag);
		if (!box || box.width <= 0 || box.height <= 0) {
			throw new Error(`AppPlugin-Aktion ${ids[index]} besitzt keine positive APK-Messung`);
		}
		const label = rawText(button);
		if (!label) throw new Error(`AppPlugin-Aktion ${ids[index]} besitzt keinen Bundle-Text`);
		return {
			id: ids[index],
			label,
			enabled: !isDisabled(button),
			selected: ids[index].startsWith("map.mode.") && selectedByAppPlugin(button),
			owner: "unchanged-appplugin-ui",
			contract: "scmap-bottom-control-panel-v2",
			reactTag: button.tag,
			center: Object.freeze({
				x: box.x + box.width / 2,
				y: box.y + box.height / 2,
			}),
		};
	});
}

function collectPressables(root: ApkUiManagerNodeSnapshot): ApkUiManagerNodeSnapshot[] {
	const result: ApkUiManagerNodeSnapshot[] = [];
	const visit = (node: ApkUiManagerNodeSnapshot): void => {
		if (isPressable(node)) result.push(node);
		for (const child of node.children) visit(child);
	};
	visit(root);
	return result;
}

function resolvePrimaryExecutionAction(
	panel: ApkUiManagerNodeSnapshot,
	groups: Readonly<{ modes: PressableGroup; primary: PressableGroup }>,
	measure: (tag: number) => Readonly<ApkNativeMeasuredBox> | undefined,
): ApkResolvedSemanticUiAction | undefined {
	const labelledButtonTags = new Set([
		...groups.modes.buttons.map(button => button.tag),
		...groups.primary.buttons.map(button => button.tag),
	]);
	const candidates = collectPressables(panel).filter(button =>
		!labelledButtonTags.has(button.tag)
		&& rawText(button).length === 0
		&& (() => {
			const box = measure(button.tag);
			return box !== undefined && box.width > 0 && box.height > 0;
		})(),
	);
	if (candidates.length !== 1) return undefined;
	const button = candidates[0];
	const box = measure(button.tag)!;
	const label = rawText(groups.primary.buttons[0]);
	if (!label) throw new Error("SCMap-AppPlugin besitzt keinen Bundle-Text für die primäre Reinigungsaktion");
	return {
		id: "clean.start",
		label,
		enabled: !isDisabled(button),
		selected: false,
		owner: "unchanged-appplugin-ui",
		contract: "scmap-bottom-control-panel-v2",
		reactTag: button.tag,
		center: Object.freeze({
			x: box.x + box.width / 2,
			y: box.y + box.height / 2,
		}),
	};
}

/**
 * Resolves the SCMap control panel rendered by the unchanged AppPlugin.
 *
 * The APK/AppPlugin contract is structural: a three-slot map-mode group sits
 * directly above two labelled side actions. The icon-only primary execution
 * action is the sole additional pressable in their nearest common panel. Its
 * user-facing label is inherited from the AppPlugin's cleaning side action.
 * Labels, enabled state, selected state, React tags and coordinates all come
 * from the current native AppPlugin tree. No localized label or model-specific
 * screen coordinate is part of the host contract.
 */
export function resolveApkSemanticUiActions(
	root: ApkUiManagerNodeSnapshot,
	measure: (tag: number) => Readonly<ApkNativeMeasuredBox> | undefined,
): readonly Readonly<ApkResolvedSemanticUiAction>[] {
	const groups = selectScMapControlGroups(root, measure);
	if (!groups) return Object.freeze([]);
	const primaryExecution = resolvePrimaryExecutionAction(groups.panel, groups, measure);
	if (!primaryExecution) return Object.freeze([]);
	const actions = [
		...resolveGroup(groups.modes, modeActionIds, measure),
		...resolveGroup(groups.primary, panelActionIds, measure),
		primaryExecution,
	];
	const selectedModeCount = actions.filter(action =>
		action.id.startsWith("map.mode.") && action.selected,
	).length;
	if (selectedModeCount !== 1) {
		throw new Error(`SCMap-AppPlugin muss genau einen Kartenmodus markieren, gefunden: ${selectedModeCount}`);
	}
	return Object.freeze(actions.map(action => Object.freeze(action)));
}

export function publicApkSemanticUiActions(
	actions: readonly Readonly<ApkResolvedSemanticUiAction>[],
): readonly Readonly<ApkSemanticUiAction>[] {
	return Object.freeze(actions.map(({ reactTag: _reactTag, center: _center, ...action }) =>
		Object.freeze(action),
	));
}

export function findApkSemanticUiAction(
	actions: readonly Readonly<ApkResolvedSemanticUiAction>[],
	id: ApkSemanticUiActionId,
): Readonly<ApkResolvedSemanticUiAction> {
	const action = actions.find(candidate => candidate.id === id);
	if (!action) throw new Error(`Die laufende AppPlugin-UI bietet die semantische Aktion ${id} nicht an`);
	if (!action.enabled) throw new Error(`Die laufende AppPlugin-UI hat die semantische Aktion ${id} deaktiviert`);
	return action;
}
