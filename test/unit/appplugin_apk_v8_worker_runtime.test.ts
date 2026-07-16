import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import * as path from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it, vi } from "vitest";

import {
	ApkV8WorkerRuntime,
	type ApkV8WorkerDiagnostic,
} from "../../src/apppluginHost/apkV8WorkerRuntime";

function start(runtime: ApkV8WorkerRuntime, workerPath: string): string {
	let executorId: unknown;
	runtime.startBackgroundJsExecutor(pathToFileURL(workerPath).href, value => {
		executorId = value;
	});
	if (typeof executorId !== "string") throw new Error("Worker-Callback wurde nicht aufgerufen");
	return executorId;
}

describe("APK V8 worker runtime", () => {
	it("loads the unchanged source and spreads array arguments like the APK executor", async () => {
		const root = mkdtempSync(path.join(tmpdir(), "apk-worker-"));
		const workerPath = path.join(root, "original.jx");
		const source = "function combine(left, right) { return { sum: left + right, bytes: new Uint8Array([1, 2]) }; }";
		writeFileSync(workerPath, source);
		const diagnostics: ApkV8WorkerDiagnostic[] = [];
		const runtime = new ApkV8WorkerRuntime({
			pluginRootPath: root,
			onDiagnostic: diagnostic => diagnostics.push(diagnostic),
		});
		const executorId = start(runtime, workerPath);
		const callback = vi.fn();

		runtime.callJsExecutorWithArray(executorId, "combine", [3, 5], callback);
		await vi.waitFor(() => expect(callback).toHaveBeenCalled());

		expect(callback).toHaveBeenCalledWith(true, { sum: 8, bytes: new Uint8Array([1, 2]) });
		expect(readFileSync(workerPath, "utf8")).toBe(source);
		expect(diagnostics.map(diagnostic => [diagnostic.kind, diagnostic.success])).toEqual([
			["start", true],
			["call", true],
		]);
		expect(diagnostics[1]?.resultSummary).toMatchObject({
			type: "Object",
			fields: {
				sum: { type: "number", value: 8 },
				bytes: { type: "Uint8Array", length: 2 },
			},
		});
	});

	it("isolates executors and preserves the APK false callback on missing calls", async () => {
		const root = mkdtempSync(path.join(tmpdir(), "apk-worker-"));
		const workerPath = path.join(root, "state.jx");
		writeFileSync(workerPath, "let count = 0; function increment() { return ++count; }");
		const runtime = new ApkV8WorkerRuntime({ pluginRootPath: root });
		const first = start(runtime, workerPath);
		const second = start(runtime, workerPath);
		const firstCallback = vi.fn();
		const secondCallback = vi.fn();

		runtime.callJsExecutor(first, "increment", null, firstCallback);
		runtime.callJsExecutor(second, "increment", null, secondCallback);
		await vi.waitFor(() => expect(secondCallback).toHaveBeenCalled());
		expect(firstCallback).toHaveBeenCalledWith(true, 1);
		expect(secondCallback).toHaveBeenCalledWith(true, 1);

		runtime.stopBackground(first);
		const stoppedCallback = vi.fn();
		runtime.callJsExecutor(first, "increment", null, stoppedCallback);
		await vi.waitFor(() => expect(stoppedCallback).toHaveBeenCalled());
		expect(stoppedCallback).toHaveBeenCalledWith(false);
	});

	it("rejects worker paths outside the current AppPlugin root", () => {
		const root = mkdtempSync(path.join(tmpdir(), "apk-worker-root-"));
		const outside = mkdtempSync(path.join(tmpdir(), "apk-worker-outside-"));
		const outsideWorker = path.join(outside, "worker.jx");
		writeFileSync(outsideWorker, "function test() { return true; }");
		const runtime = new ApkV8WorkerRuntime({ pluginRootPath: root });

		expect(start(runtime, outsideWorker)).toBe("");
		expect(runtime.activeExecutorIds()).toEqual([]);
	});
});
