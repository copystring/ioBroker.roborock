import * as fs from "node:fs";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

const { createAppRegistryFacade } = require("../../scripts/lib/direct_metro_bundle_runtime.js");
const { DEFAULT_HERMES_BOOTSTRAP, HERMES_TIMEOUT_MS, findBundleFiles, parseHostOutput, runBundleMatrix } = require("../../scripts/lib/appplugin_bundle_inventory.js");

describe("AppPlugin host contract", () => {
	it("normalizes direct and BatchedBridge AppRegistry implementations", () => {
		const direct = createAppRegistryFacade({
			RN$AppRegistry: {
				getAppKeys: () => ["App"],
				runApplication: (...args: unknown[]) => args,
			},
		});
		expect(direct.kind).toBe("direct");
		expect(direct.getAppKeys()).toEqual(["App"]);
		expect(direct.runApplication("App", { rootTag: 1 }, "visible")).toEqual(["App", { rootTag: 1 }, "visible"]);

		const calls: unknown[][] = [];
		const classic = createAppRegistryFacade({
			__fbBatchedBridge: {
				callFunctionReturnResultAndFlushedQueue: (module: string, method: string, args: unknown[]) => {
					calls.push([module, method, args]);
					return [method === "getAppKeys" ? ["App"] : true, null];
				},
			},
		});
		expect(classic.kind).toBe("batched-bridge");
		expect(classic.getAppKeys()).toEqual(["App"]);
		expect(classic.runApplication("App", { rootTag: 1 })).toBe(true);
		expect(calls).toContainEqual(["AppRegistry", "runApplication", ["App", { rootTag: 1 }, undefined]]);
	});
});

describe("Hermes bridge host contract", () => {
	it("uses the generated strict APK bridge without invented native behavior", () => {
		const source = fs.readFileSync(DEFAULT_HERMES_BOOTSTRAP, "utf8");
		expect(source).toContain("GENERATED from the APK host contract");
		expect(source).toContain("__apkNativeInvoke");
		expect(source).toContain("__apkNativeFlushQueue");
		expect(source).toContain("RRPluginSDK");
		expect(source).not.toContain("phase0-owner");
		expect(source).not.toContain("capturedFallbackCall");
		expect(HERMES_TIMEOUT_MS).toBe(15_000);
	});

	it("parses the versioned one-line native host protocol", () => {
		expect(parseHostOutput("diagnostic\n{\"hostProtocol\":1,\"bytecodeAccepted\":true}\n")).toEqual({
			hostProtocol: 1,
			bytecodeAccepted: true,
		});
	});
});

const pluginRoot = path.resolve(__dirname, "..", "..", ".AppPlugins");
const originalBundlesIt = findBundleFiles(pluginRoot).length > 0 ? it : it.skip;
const hermesHostExecutable = process.env.HERMES_HOST_EXECUTABLE;
const originalHermesHostIt = hermesHostExecutable && fs.existsSync(hermesHostExecutable) ? it : it.skip;

describe("all locally available original AppPlugins", () => {
	originalBundlesIt("loads every Metro bundle unchanged through the generic host contract", () => {
		const matrix = runBundleMatrix(pluginRoot);
		const metro = matrix.results.filter((result: { format: string }) => result.format === "metro");
		const hermes = matrix.results.filter((result: { format: string }) => result.format === "hermes");

		expect(metro.length).toBeGreaterThan(0);
		expect(metro.every((result: { status: string }) => result.status === "passed")).toBe(true);
		expect(metro.every((result: { unchanged: boolean }) => result.unchanged)).toBe(true);
		expect(metro.every((result: { appKeys: string[] }) => result.appKeys.includes("App"))).toBe(true);
		expect(metro.every((result: { reportedExceptions: unknown[] }) => result.reportedExceptions.length === 0)).toBe(true);
		expect(new Set(metro.map((result: { registryKind: string }) => result.registryKind))).toEqual(new Set(["direct", "batched-bridge"]));
		expect(new Set(hermes.map((result: { bytecodeVersion: number }) => result.bytecodeVersion))).toEqual(new Set([96]));
		expect(matrix.summary.failed).toBe(0);
	});

	originalHermesHostIt("loads every Hermes bundle unchanged without reported exceptions", () => {
		const matrix = runBundleMatrix(pluginRoot, { hermesHostExecutable });
		const hermes = matrix.results.filter((result: { format: string }) => result.format === "hermes");

		expect(hermes.length).toBeGreaterThan(0);
		expect(hermes.every((result: { status: string }) => result.status === "passed")).toBe(true);
		expect(hermes.every((result: { unchanged: boolean }) => result.unchanged)).toBe(true);
		expect(hermes.every((result: { appKeys: string[] }) => result.appKeys.includes("App"))).toBe(true);
		expect(hermes.every((result: { reportedExceptions: unknown[] }) => result.reportedExceptions.length === 0)).toBe(true);
		expect(new Set(hermes.map((result: { bytecodeVersion: number }) => result.bytecodeVersion))).toEqual(new Set([96]));
		expect(matrix.summary.failed).toBe(0);
	});
});
