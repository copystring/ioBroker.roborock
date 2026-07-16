import { describe, expect, it, vi } from "vitest";

import { ApkTextInputRuntime } from "../../src/apppluginHost/apkTextInputRuntime";
import type { ApkUiManagerNodeSnapshot } from "../../src/apppluginHost/apkUiManagerRuntime";

function rootWithInputs(...inputs: ApkUiManagerNodeSnapshot[]): ApkUiManagerNodeSnapshot {
	return { tag: 1, viewName: "Root", rootTag: 1, props: {}, children: inputs };
}

describe("APK AndroidTextInput runtime", () => {
	it("dispatches the APK topChange and topTextInput sequence with a monotonic event count", async () => {
		const input: ApkUiManagerNodeSnapshot = {
			tag: 9,
			viewName: "AndroidTextInput",
			rootTag: 1,
			props: { text: "Raum1", mostRecentEventCount: 0 },
			children: [],
		};
		const callJsFunction = vi.fn().mockResolvedValue(undefined);
		const synchronouslyUpdateViewOnUiThread = vi.fn((tag: number, props: Readonly<Record<string, unknown>>) => {
			if (tag === input.tag) input.props = { ...input.props, ...props };
		});
		const runtime = new ApkTextInputRuntime({
			snapshot: () => rootWithInputs(input),
			synchronouslyUpdateViewOnUiThread,
		}, { callJsFunction });

		expect(await runtime.replaceText("Arbeitszimmer")).toEqual(expect.objectContaining({
			tag: 9,
			previousText: "Raum1",
			text: "Arbeitszimmer",
			eventCount: 1,
		}));
		expect(callJsFunction.mock.calls).toEqual([
			["RCTEventEmitter", "receiveEvent", [9, "topChange", {
				text: "Arbeitszimmer",
				eventCount: 1,
				target: 9,
			}]],
			["RCTEventEmitter", "receiveEvent", [9, "topTextInput", {
				text: "Arbeitszimmer",
				previousText: "Raum1",
				range: { start: 0, end: 5 },
				target: 9,
			}]],
		]);
		expect(synchronouslyUpdateViewOnUiThread).toHaveBeenCalledWith(9, { text: "Arbeitszimmer" });
		expect(synchronouslyUpdateViewOnUiThread.mock.invocationCallOrder[0]).toBeLessThan(
			callJsFunction.mock.invocationCallOrder[0],
		);

		callJsFunction.mockClear();
		input.props = { text: "Arbeitszimmer", mostRecentEventCount: 1 };
		await runtime.replaceText("Arbeitszimmer 2");
		expect(callJsFunction.mock.calls).toEqual([
			["RCTEventEmitter", "receiveEvent", [9, "topChange", {
				text: "Arbeitszimmer 2",
				eventCount: 2,
				target: 9,
			}]],
			["RCTEventEmitter", "receiveEvent", [9, "topTextInput", {
				text: " 2",
				previousText: "",
				range: { start: 13, end: 13 },
				target: 9,
			}]],
		]);
	});

	it("requires an unambiguous active APK text input unless a tag is supplied", async () => {
		const input = (tag: number): ApkUiManagerNodeSnapshot => ({
			tag,
			viewName: "AndroidTextInput",
			rootTag: 1,
			props: { text: "" },
			children: [],
		});
		const callJsFunction = vi.fn().mockResolvedValue(undefined);
		const runtime = new ApkTextInputRuntime(
			{
				snapshot: () => rootWithInputs(input(9), input(11)),
				synchronouslyUpdateViewOnUiThread: vi.fn(),
			},
			{ callJsFunction },
		);

		await expect(runtime.replaceText("Neu")).rejects.toThrow(/Genau ein aktives/u);
		await expect(runtime.replaceText("Neu", 11)).resolves.toEqual(expect.objectContaining({ tag: 11 }));
		await expect(runtime.replaceText("Neu", 12)).rejects.toThrow(/nicht aktiv/u);
	});
});
