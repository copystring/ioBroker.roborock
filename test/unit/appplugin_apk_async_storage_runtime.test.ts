import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import * as path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { ApkAsyncStorageRuntime, type ApkAsyncStorageCallback } from "../../src/apppluginHost";

const temporaryDirectories: string[] = [];

afterEach(() => {
	for (const directory of temporaryDirectories.splice(0)) {
		rmSync(directory, { recursive: true, force: true });
	}
});

function storagePath(): string {
	const directory = mkdtempSync(path.join(tmpdir(), "roborock-apk-async-storage-"));
	temporaryDirectories.push(directory);
	return path.join(directory, "RKStorage.json");
}

function callbackResult(
	invoke: (callback: ApkAsyncStorageCallback) => void,
): Promise<unknown[]> {
	return new Promise(resolve => invoke((...arguments_) => resolve(arguments_)));
}

describe("ApkAsyncStorageRuntime", () => {
	it("persists the APK-wide key-value database across runtime instances", async () => {
		const filePath = storagePath();
		const first = new ApkAsyncStorageRuntime(filePath);

		expect(await callbackResult(callback => first.multiSet([
			["language", "de"],
			["device", "roborock.vacuum.a102"],
		], callback))).toEqual([]);

		const second = new ApkAsyncStorageRuntime(filePath);
		expect(await callbackResult(callback => second.multiGet([
			"device",
			"missing",
			"language",
		], callback))).toEqual([
			null,
			[
				["device", "roborock.vacuum.a102"],
				["missing", null],
				["language", "de"],
			],
		]);
	});

	it("uses the recursive JSONObject merge semantics from the APK", async () => {
		const runtime = new ApkAsyncStorageRuntime(storagePath());
		await callbackResult(callback => runtime.multiSet([[
			"settings",
			JSON.stringify({
				map: { labels: true, layers: { carpet: true, furniture: false } },
				order: [1, 2],
				mode: "rooms",
			}),
		]], callback));

		expect(await callbackResult(callback => runtime.multiMerge([[
			"settings",
			JSON.stringify({
				map: { layers: { furniture: true }, scale: 1.5 },
				order: [3],
				mode: null,
			}),
		]], callback))).toEqual([]);

		const result = await callbackResult(callback => runtime.multiGet(["settings"], callback));
		const serialized = (result[1] as Array<[string, string]>)[0][1];
		expect(JSON.parse(serialized)).toEqual({
			map: { labels: true, layers: { carpet: true, furniture: true }, scale: 1.5 },
			order: [3],
			mode: null,
		});
	});

	it("keeps a failed multiMerge transactional and reports an APK callback error", async () => {
		const runtime = new ApkAsyncStorageRuntime(storagePath());
		await callbackResult(callback => runtime.multiSet([
			["valid", "{\"before\":true}"],
			["invalid", "not-json"],
		], callback));

		const error = await callbackResult(callback => runtime.multiMerge([
			["valid", "{\"after\":true}"],
			["invalid", "{\"after\":true}"],
		], callback));
		expect(error).toHaveLength(1);
		expect(error[0]).toEqual([expect.objectContaining({ message: expect.any(String) })]);
		expect(await callbackResult(callback => runtime.multiGet(["valid"], callback))).toEqual([
			null,
			[["valid", "{\"before\":true}"]],
		]);
	});

	it("supports getAllKeys, multiRemove and clear with the native callback shapes", async () => {
		const runtime = new ApkAsyncStorageRuntime(storagePath());
		await callbackResult(callback => runtime.multiSet([
			["one", "1"],
			["two", "2"],
		], callback));
		expect(await callbackResult(callback => runtime.getAllKeys(callback))).toEqual([null, ["one", "two"]]);
		expect(await callbackResult(callback => runtime.multiRemove(["one"], callback))).toEqual([]);
		expect(await callbackResult(callback => runtime.getAllKeys(callback))).toEqual([null, ["two"]]);
		expect(await callbackResult(callback => runtime.clear(callback))).toEqual([]);
		expect(await callbackResult(callback => runtime.getAllKeys(callback))).toEqual([null, []]);
	});
});
