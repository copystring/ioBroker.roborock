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
	hitTargetAt: (x: number, y: number) => number | undefined;
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
	return {
		root,
		measure: tag => boxes.get(tag),
		hitTargetAt: (x, y) => {
			for (const tag of [111, 115, 119, 131, 135, 139]) {
				const box = boxes.get(tag)!;
				if (x >= box.x && x < box.x + box.width && y >= box.y && y < box.y + box.height) {
					return tag + 1;
				}
			}
			return 1;
		},
	};
}

function nestedSideActionFixture(): ReturnType<typeof fixture> {
	const labels = ["ممتلئ", "الغرف", "المناطق", "المكنسة والممسحة", "قاعدة الشحن"] as const;
	const root = node(1, "Root", {}, [
		node(100, "RCTView", {}, [
			node(110, "RCTView", {}, [
				pressable(111, labels[0], { selected: true }),
				pressable(115, labels[1]),
				pressable(119, labels[2]),
			]),
			node(130, "RCTView", {}, [
				node(131, "RCTView", {}, [pressable(132, labels[3])]),
				node(140, "RCTView", {}, [pressable(141, labels[4])]),
			]),
			iconPressable(150),
		]),
	]);
	const boxes = new Map<number, Readonly<{ x: number; y: number; width: number; height: number }>>([
		[111, { x: 200, y: 621, width: 119, height: 20 }],
		[115, { x: 120, y: 621, width: 80, height: 20 }],
		[119, { x: 1, y: 621, width: 119, height: 20 }],
		[132, { x: 206, y: 685, width: 107, height: 67 }],
		[141, { x: 7, y: 685, width: 107, height: 67 }],
		[150, { x: 111, y: 646, width: 104, height: 104 }],
	]);
	return {
		root,
		measure: tag => boxes.get(tag),
		hitTargetAt: (x, y) => {
			for (const tag of [111, 115, 119, 132, 141, 150]) {
				const box = boxes.get(tag)!;
				if (x >= box.x && x < box.x + box.width && y >= box.y && y < box.y + box.height) {
					return tag + 1;
				}
			}
			return 1;
		},
	};
}

describe("APK/AppPlugin semantic UI actions", () => {
	it("resolves SCMap actions from structure, current bundle labels, state and APK layout", () => {
		const { root, measure, hitTargetAt } = fixture(["Voll", "Räume", "Zonen", "Saugen", "Dockingstation"]);
		const actions = resolveApkSemanticUiActions(root, measure, hitTargetAt);

		expect(publicApkSemanticUiActions(actions)).toEqual([
			{
				id: "map.mode.full",
				label: "Voll",
				enabled: true,
				selected: false,
				owner: "desktop-host-adapter",
				provenance: "host-heuristic-from-appplugin-tree",
				contract: "host-map-bottom-control-panel-v3",
			},
			{
				id: "map.mode.rooms",
				label: "Räume",
				enabled: true,
				selected: true,
				owner: "desktop-host-adapter",
				provenance: "host-heuristic-from-appplugin-tree",
				contract: "host-map-bottom-control-panel-v3",
			},
			{
				id: "map.mode.zones",
				label: "Zonen",
				enabled: true,
				selected: false,
				owner: "desktop-host-adapter",
				provenance: "host-heuristic-from-appplugin-tree",
				contract: "host-map-bottom-control-panel-v3",
			},
			{
				id: "clean.panel",
				label: "Saugen",
				enabled: true,
				selected: false,
				owner: "desktop-host-adapter",
				provenance: "host-heuristic-from-appplugin-tree",
				contract: "host-map-bottom-control-panel-v3",
			},
			{
				id: "dock.panel",
				label: "Dockingstation",
				enabled: true,
				selected: false,
				owner: "desktop-host-adapter",
				provenance: "host-heuristic-from-appplugin-tree",
				contract: "host-map-bottom-control-panel-v3",
			},
			{
				id: "clean.start",
				label: "Saugen",
				enabled: true,
				selected: false,
				owner: "desktop-host-adapter",
				provenance: "host-heuristic-from-appplugin-tree",
				contract: "host-map-bottom-control-panel-v3",
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

	it("resolves the same host actions when a Q10-style bundle wraps both side buttons", () => {
		const { root, measure, hitTargetAt } = nestedSideActionFixture();
		const actions = resolveApkSemanticUiActions(root, measure, hitTargetAt);

		expect(actions.map(action => action.id)).toEqual([
			"map.mode.full",
			"map.mode.rooms",
			"map.mode.zones",
			"clean.panel",
			"dock.panel",
			"clean.start",
		]);
		expect(findApkSemanticUiAction(actions, "clean.panel")).toMatchObject({
			reactTag: 132,
			center: { x: 259.5, y: 718.5 },
		});
		expect(findApkSemanticUiAction(actions, "clean.start")).toMatchObject({
			reactTag: 150,
			center: { x: 163, y: 698 },
		});
	});

	it("keeps action IDs stable while all user-visible labels come from another AppPlugin locale", () => {
		const { root, measure, hitTargetAt } = fixture(["كامل", "غرف", "مناطق", "تنظيف", "قاعدة الشحن"]);
		const actions = publicApkSemanticUiActions(resolveApkSemanticUiActions(root, measure, hitTargetAt));

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

	it("fails closed when an APK modal or foreground page owns an action center", () => {
		const { root, measure } = fixture(["Voll", "Räume", "Zonen", "Saugen", "Dockingstation"]);

		expect(resolveApkSemanticUiActions(root, measure, () => 999)).toEqual([]);
	});

	it("does not guess a contract when the AppPlugin control-panel structure is absent", () => {
		const root = node(1, "Root", {}, [pressable(10, "Einzelaktion")]);
		expect(resolveApkSemanticUiActions(root, () => undefined, () => 1)).toEqual([]);
		expect(() => findApkSemanticUiAction([], "clean.start")).toThrow(
			"Die laufende AppPlugin-UI bietet die semantische Aktion clean.start nicht an",
		);
	});
});
