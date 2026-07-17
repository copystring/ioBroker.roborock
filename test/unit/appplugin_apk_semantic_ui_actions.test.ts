import { describe, expect, it } from "vitest";

import {
	findApkSemanticUiAction,
	publicApkSemanticUiActions,
	resolveApkSemanticUiActions,
	type ApkSemanticUiActionId,
	type ApkUiManagerNodeSnapshot,
} from "../../src/apppluginHost";

function node(
	tag: number,
	viewName: string,
	props: Readonly<Record<string, unknown>> = {},
	children: ApkUiManagerNodeSnapshot[] = [],
): ApkUiManagerNodeSnapshot {
	return { tag, viewName, rootTag: 1, props, children };
}

function text(tag: number, value: string, selected = false): ApkUiManagerNodeSnapshot {
	return node(tag, "RCTText", { fontWeight: selected ? "600" : "400" }, [
		node(tag + 1, "RCTRawText", { text: value }),
	]);
}

function pressable(
	tag: number,
	value: string,
	options: Readonly<{ selected?: boolean; disabled?: boolean }> = {},
): ApkUiManagerNodeSnapshot {
	return node(tag, "RCTView", {
		accessible: true,
		onClick: true,
		onStartShouldSetResponder: true,
		onResponderRelease: true,
		accessibilityState: { disabled: options.disabled === true },
	}, [text(tag + 1, value, options.selected)]);
}

function iconPressable(tag: number): ApkUiManagerNodeSnapshot {
	return node(tag, "RCTView", {
		accessible: true,
		onClick: true,
		onStartShouldSetResponder: true,
		onResponderRelease: true,
	}, [node(tag + 1, "RCTImageView")]);
}

function fixture(labels: readonly [string, string, string, string, string]): {
	root: ApkUiManagerNodeSnapshot;
	measure: (tag: number) => Readonly<{ x: number; y: number; width: number; height: number }> | undefined;
} {
	const root = node(1, "Root", {}, [
		node(10, "RCTView", {}, [
			node(20, "RCTView", {}, [
				pressable(21, "Bearbeiten"),
				pressable(25, "Einstellungen"),
			]),
			node(100, "RCTView", {}, [
				node(110, "RCTView", { flexDirection: "row" }, [
					pressable(111, labels[0]),
					pressable(115, labels[1], { selected: true }),
					pressable(119, labels[2]),
				]),
				node(130, "RCTView", { flexDirection: "row" }, [
					pressable(131, labels[3]),
					pressable(135, labels[4]),
				]),
				iconPressable(139),
			]),
		]),
	]);
	const boxes = new Map<number, Readonly<{ x: number; y: number; width: number; height: number }>>([
		[21, { x: 232, y: 56, width: 48, height: 48 }],
		[25, { x: 296, y: 56, width: 48, height: 48 }],
		[111, { x: 20, y: 614, width: 119, height: 40 }],
		[115, { x: 139, y: 614, width: 80, height: 40 }],
		[119, { x: 219, y: 614, width: 119, height: 40 }],
		[131, { x: 21, y: 670, width: 118, height: 81 }],
		[135, { x: 219, y: 670, width: 118, height: 81 }],
		[139, { x: 128, y: 661, width: 104, height: 104 }],
	]);
	return { root, measure: tag => boxes.get(tag) };
}

describe("APK/AppPlugin semantic UI actions", () => {
	it("resolves SCMap actions from structure, current bundle labels, state and APK layout", () => {
		const { root, measure } = fixture(["Voll", "Räume", "Zonen", "Saugen", "Dockingstation"]);
		const actions = resolveApkSemanticUiActions(root, measure);

		expect(publicApkSemanticUiActions(actions)).toEqual([
			{
				id: "map.mode.full",
				label: "Voll",
				enabled: true,
				selected: false,
				owner: "unchanged-appplugin-ui",
				contract: "scmap-bottom-control-panel-v2",
			},
			{
				id: "map.mode.rooms",
				label: "Räume",
				enabled: true,
				selected: true,
				owner: "unchanged-appplugin-ui",
				contract: "scmap-bottom-control-panel-v2",
			},
			{
				id: "map.mode.zones",
				label: "Zonen",
				enabled: true,
				selected: false,
				owner: "unchanged-appplugin-ui",
				contract: "scmap-bottom-control-panel-v2",
			},
			{
				id: "clean.panel",
				label: "Saugen",
				enabled: true,
				selected: false,
				owner: "unchanged-appplugin-ui",
				contract: "scmap-bottom-control-panel-v2",
			},
			{
				id: "dock.panel",
				label: "Dockingstation",
				enabled: true,
				selected: false,
				owner: "unchanged-appplugin-ui",
				contract: "scmap-bottom-control-panel-v2",
			},
			{
				id: "clean.start",
				label: "Saugen",
				enabled: true,
				selected: false,
				owner: "unchanged-appplugin-ui",
				contract: "scmap-bottom-control-panel-v2",
			},
		]);
		expect(findApkSemanticUiAction(actions, "map.mode.rooms")).toMatchObject({
			reactTag: 115,
			center: { x: 179, y: 634 },
		});
		expect(findApkSemanticUiAction(actions, "clean.start")).toMatchObject({
			reactTag: 139,
			center: { x: 180, y: 713 },
		});
		expect(JSON.stringify(publicApkSemanticUiActions(actions))).not.toMatch(/reactTag|center|"x"|"y"/u);
	});

	it("keeps action IDs stable while all user-visible labels come from another AppPlugin locale", () => {
		const { root, measure } = fixture(["كامل", "غرف", "مناطق", "تنظيف", "قاعدة الشحن"]);
		const actions = publicApkSemanticUiActions(resolveApkSemanticUiActions(root, measure));

		expect(actions.map(action => action.id)).toEqual<ApkSemanticUiActionId[]>([
			"map.mode.full",
			"map.mode.rooms",
			"map.mode.zones",
			"clean.panel",
			"dock.panel",
			"clean.start",
		]);
		expect(actions.map(action => action.label)).toEqual([
			"كامل",
			"غرف",
			"مناطق",
			"تنظيف",
			"قاعدة الشحن",
			"تنظيف",
		]);
	});

	it("does not guess a contract when the AppPlugin control-panel structure is absent", () => {
		const root = node(1, "Root", {}, [pressable(10, "Einzelaktion")]);
		expect(resolveApkSemanticUiActions(root, () => undefined)).toEqual([]);
		expect(() => findApkSemanticUiAction([], "clean.start")).toThrow(
			"Die laufende AppPlugin-UI bietet die semantische Aktion clean.start nicht an",
		);
	});
});
