import * as fs from "node:fs";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

const { createAppRegistryFacade } = require("../../scripts/lib/direct_metro_bundle_runtime.js");
const {
	DEFAULT_HERMES_BOOTSTRAP,
	HERMES_TIMEOUT_MS,
	classifyHermesHostFailure,
	createHermesHostEnvironment,
	findBundleFiles,
	inspectApkContractCoverage,
	parseHostOutput,
	runBundleMatrix,
} = require("../../scripts/lib/appplugin_bundle_inventory.js");

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
		expect(source).toContain('"deviceModel":"conformance.model"');
		expect(source).toContain('"mobileModel":"ioBroker AppPlugin Conformance Host"');
		expect(source).toContain('"Dimensions":{"windowPhysicalPixels"');
		expect(source).toContain('"localeIdentifier":"en-US"');
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

	it("does not attribute a missing DLL or stale bridge binary to an AppPlugin", () => {
		expect(classifyHermesHostFailure(
			{ status: 0xc0000135, error: undefined },
			undefined,
			"",
		)).toMatchObject({ status: "host-unavailable" });
		expect(classifyHermesHostFailure(
			{ status: 1, error: undefined },
			{ error: "APK host hook __apkNativeInvoke is missing" },
			"APK host hook __apkNativeInvoke is missing",
		)).toMatchObject({ status: "host-incompatible" });
	});

	it("classifies an unchanged bundle that reaches native APK calls as session-dependent", () => {
		expect(classifyHermesHostFailure(
			{ status: 1, error: undefined },
			{ error: "APK native invocation requires the Hermes host --ipc mode" },
			"APK native invocation requires the Hermes host --ipc mode",
		)).toMatchObject({
			status: "device-session-required",
		});
		expect(classifyHermesHostFailure(
			{ status: 1, error: undefined },
			{ error: "Cannot read property 'mobileModel' of undefined" },
			"Cannot read property 'mobileModel' of undefined",
		)).toMatchObject({
			status: "device-session-required",
		});
	});

	it("passes an explicit native runtime directory only to the Hermes host process", () => {
		const environment = createHermesHostEnvironment("C:\\runtime-libs", {
			PATH: "C:\\Windows\\System32",
			SAFE_VALUE: "unchanged",
		});
		expect(environment).toEqual({
			PATH: `C:\\runtime-libs${path.delimiter}C:\\Windows\\System32`,
			SAFE_VALUE: "unchanged",
		});
	});

	it("keeps bundle requests separate from the modules installed by the inspected APK", () => {
		expect(inspectApkContractCoverage(["RRPluginSDK", "RNCAsyncStorage"]))
			.toMatchObject({ status: "complete", unresolved: [] });
		expect(inspectApkContractCoverage(["RRPluginSDK", "AsyncSQLiteDBStorage"]))
			.toMatchObject({
				status: "incomplete",
				unresolved: ["AsyncSQLiteDBStorage"],
			});
	});
});

const pluginRoot = path.resolve(__dirname, "..", "..", ".AppPlugins");
const originalBundlesIt = findBundleFiles(pluginRoot).length > 0 ? it : it.skip;
const hermesHostExecutable = process.env.HERMES_HOST_EXECUTABLE;
const originalHermesHostIt = hermesHostExecutable && fs.existsSync(hermesHostExecutable) ? it : it.skip;

describe("all locally available original AppPlugins", () => {
	originalBundlesIt("requires the native APK host for every source and bytecode bundle", () => {
		const matrix = runBundleMatrix(pluginRoot);
		const metro = matrix.results.filter((result: { format: string }) => result.format === "metro");
		const hermes = matrix.results.filter((result: { format: string }) => result.format === "hermes");

		expect(metro.length).toBeGreaterThan(0);
		expect(metro.every((result: { status: string }) => result.status === "bridge-host-required")).toBe(true);
		expect(hermes.every((result: { status: string }) => result.status === "bridge-host-required")).toBe(true);
		expect(new Set(hermes.map((result: { bytecodeVersion: number }) => result.bytecodeVersion))).toEqual(new Set([96]));
		expect(matrix.summary.failed).toBe(0);
	}, 15_000);

	originalHermesHostIt("loads every source and Hermes bundle unchanged through one native APK host", () => {
		const matrix = runBundleMatrix(pluginRoot, {
			hermesHostExecutable,
			runtimeLibraryDirectory: process.env.HERMES_RUNTIME_LIBRARY_DIRECTORY,
		});
		const supported = matrix.results.filter((result: { format: string }) =>
			result.format === "metro" || result.format === "hermes",
		);

		expect(supported.length).toBeGreaterThan(0);
		expect(supported.every((result: { status: string }) =>
			result.status === "passed" || result.status === "device-session-required",
		)).toBe(true);
		expect(supported.every((result: { unchanged: boolean }) => result.unchanged)).toBe(true);
		expect(supported
			.filter((result: { status: string }) => result.status === "passed")
			.every((result: { appKeys: string[] }) => result.appKeys.includes("App"))).toBe(true);
		expect(supported.every((result: { reportedExceptions: unknown[] }) =>
			result.reportedExceptions.length === 0,
		)).toBe(true);
		const hermes = supported.filter((result: { format: string }) => result.format === "hermes");
		expect(new Set(hermes.map((result: { bytecodeVersion: number }) => result.bytecodeVersion)))
			.toEqual(new Set([96]));
		expect(matrix.summary.runtimeFailed).toBe(0);
		expect(matrix.summary.hostUnavailable).toBe(0);
		expect(matrix.summary.failed).toBe(0);
	}, 60_000);
});
