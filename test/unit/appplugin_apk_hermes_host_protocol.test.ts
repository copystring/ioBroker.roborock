import * as fs from "node:fs";
import * as path from "node:path";

import { describe, expect, it, vi } from "vitest";

import { createApkRemoteModuleDefinitions } from "../../src/apppluginHost/apkBridgeBootstrap";
import type { ApkAppPluginHostContract } from "../../src/apppluginHost/apkContract";
import {
	ApkHermesHostProtocolController,
	fromApkHermesWireValue,
	parseApkHermesNativeMessage,
	toApkHermesWireValue,
	type ApkHermesHostMessage,
	type ApkHermesInvokeMessage,
	type ApkHermesNativeInvocationRejection,
} from "../../src/apppluginHost/apkHermesHostProtocol";
import { ApkNativeModuleDispatcher } from "../../src/apppluginHost/apkNativeModuleDispatcher";
import { StrictApkNativeModuleRegistry } from "../../src/apppluginHost/strictNativeModuleRegistry";

function loadContract(): ApkAppPluginHostContract {
	return JSON.parse(fs.readFileSync(
		path.resolve(__dirname, "../../src/apppluginHost/generated/apk-appplugin-host-contract.json"),
		"utf8",
	)) as ApkAppPluginHostContract;
}

function createController(implementation: Record<string, unknown>) {
	const contract = loadContract();
	const definitions = createApkRemoteModuleDefinitions(contract);
	const registry = new StrictApkNativeModuleRegistry(contract);
	const pluginSdk = contract.nativeModules.find(module =>
		module.installedByHost && module.moduleName === "RRPluginSDK"
	);
	if (!pluginSdk) throw new Error("RRPluginSDK fehlt im APK-Vertrag");
	registry.register(pluginSdk.javaClass, implementation);
	const messages: ApkHermesHostMessage[] = [];
	const rejections: ApkHermesNativeInvocationRejection[] = [];
	const controller = new ApkHermesHostProtocolController(
		definitions,
		new ApkNativeModuleDispatcher(contract, registry),
		message => messages.push(message),
		undefined,
		rejection => rejections.push(rejection),
	);
	return { controller, definitions, messages, rejections };
}

function invokeMessage(overrides: Partial<ApkHermesInvokeMessage> = {}): ApkHermesInvokeMessage {
	return {
		protocol: "roborock-appplugin-host",
		version: 1,
		type: "invoke",
		requestId: 7,
		moduleName: "RRPluginSDK",
		methodName: "callMethod",
		callType: "async",
		arguments: ["get_status", [], null, { $apkType: "callback", id: 41 }],
		...overrides,
	};
}

describe("APK Hermes host protocol", () => {
	it("round-trips binary and undefined wire values without JSON ambiguity", () => {
		const wire = toApkHermesWireValue({ bytes: Buffer.from([0, 1, 255]), missing: undefined });
		expect(wire).toEqual({
			bytes: { $apkType: "bytes", base64: "AAH/" },
			missing: { $apkType: "undefined" },
		});
		expect(fromApkHermesWireValue(wire)).toEqual({
			bytes: Buffer.from([0, 1, 255]),
			missing: undefined,
		});
		expect(() => toApkHermesWireValue(Number.NaN)).toThrow(/endliche Zahlen/u);
	});

	it("parses only the versioned native protocol envelope", () => {
		expect(parseApkHermesNativeMessage(JSON.stringify(invokeMessage()))).toMatchObject({
			type: "invoke",
			requestId: 7,
		});
		expect(() => parseApkHermesNativeMessage('{"type":"invoke"}')).toThrow(/Ungültige/u);
		expect(parseApkHermesNativeMessage(JSON.stringify({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "fatal",
			error: { name: "Error", message: "bundle failed" },
		}))).toMatchObject({ type: "fatal", error: { message: "bundle failed" } });
		expect(parseApkHermesNativeMessage(JSON.stringify({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "bundleEvaluated",
			bundleKind: "javascript-source",
			probe: { appKeys: ["App"] },
		}))).toMatchObject({
			type: "bundleEvaluated",
			bundleKind: "javascript-source",
			probe: { appKeys: ["App"] },
		});
		expect(parseApkHermesNativeMessage(JSON.stringify({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "applicationStarted",
			appKey: "App",
			rootTag: 1,
		}))).toMatchObject({ type: "applicationStarted", appKey: "App", rootTag: 1 });
		expect(parseApkHermesNativeMessage(JSON.stringify({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "applicationUnmounted",
			rootTag: 1,
		}))).toMatchObject({ type: "applicationUnmounted", rootTag: 1 });
		expect(() => parseApkHermesNativeMessage(JSON.stringify({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "applicationUnmounted",
			rootTag: 1.5,
		}))).toThrow(/Application-Unmount/u);
		expect(parseApkHermesNativeMessage(JSON.stringify({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "runtimeBarrierReached",
			barrierId: 3,
		}))).toMatchObject({ type: "runtimeBarrierReached", barrierId: 3 });
		expect(() => parseApkHermesNativeMessage(JSON.stringify({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "runtimeBarrierReached",
			barrierId: 0,
		}))).toThrow(/Laufzeitbarriere/u);
		expect(() => parseApkHermesNativeMessage("TypeError: raw stdout")).toThrow(/raw stdout/u);
		expect(() => parseApkHermesNativeMessage(JSON.stringify({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "invented",
		}))).toThrow(/Unbekannte/u);
	});

	it("dispatches TurboModule calls and turns callback handles back into host commands", async () => {
		const callMethod = vi.fn((method: string, _args: unknown, _unused: unknown, callback: (...args: unknown[]) => void) => {
			callback(true, { method });
		});
		const { controller, messages } = createController({ callMethod });

		await controller.handle(invokeMessage());

		expect(callMethod).toHaveBeenCalledOnce();
		expect(messages).toContainEqual({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "invokeCallback",
			target: "turbo",
			callbackId: 41,
			arguments: [true, { method: "get_status" }],
		});
		expect(messages).toContainEqual({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "invokeResult",
			requestId: 7,
			ok: true,
			value: { $apkType: "undefined" },
		});
	});

	it("keeps asynchronous native callback groups pending until their Hermes command is sent", async () => {
		let complete: ((...arguments_: unknown[]) => void) | undefined;
		const callMethod = vi.fn((
			_method: string,
			_args: unknown,
			_unused: unknown,
			callback: (...arguments_: unknown[]) => void,
		) => {
			complete = callback;
		});
		const { controller, messages } = createController({ callMethod });

		await controller.handle(invokeMessage());
		expect(controller.pendingNativeCallbackCount).toBe(1);
		expect(controller.nativeCallbackActivityRevision).toBe(0);
		const settled = controller.waitForPendingNativeCallbacks();
		complete?.(true, { source: "worker" });
		await settled;

		expect(controller.pendingNativeCallbackCount).toBe(0);
		expect(controller.nativeCallbackActivityRevision).toBe(1);
		expect(messages).toContainEqual({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "invokeCallback",
			target: "turbo",
			callbackId: 41,
			arguments: [true, { source: "worker" }],
		});
	});

	it("closes pending callback groups before shutdown and ignores callbacks arriving afterwards", async () => {
		let complete: ((...arguments_: unknown[]) => void) | undefined;
		const callMethod = vi.fn((
			_method: string,
			_args: unknown,
			_unused: unknown,
			callback: (...arguments_: unknown[]) => void,
		) => {
			complete = callback;
		});
		const { controller, messages } = createController({ callMethod });

		await controller.handle(invokeMessage());
		expect(controller.pendingNativeCallbackCount).toBe(1);
		const callbacksSettled = controller.waitForPendingNativeCallbacks();

		await controller.shutdown();
		await callbacksSettled;
		expect(controller.pendingNativeCallbackCount).toBe(0);
		const messageCountAfterShutdown = messages.length;

		complete?.(true, { source: "late-worker" });
		await Promise.resolve();
		await controller.shutdown();

		expect(messages).toHaveLength(messageCountAfterShutdown);
		expect(messages).not.toContainEqual(expect.objectContaining({
			type: "invokeCallback",
			callbackId: 41,
		}));
		expect(messages.filter(message => message.type === "shutdown")).toHaveLength(1);
	});

	it("dispatches classic BatchedBridge callbacks by APK module and method index", async () => {
		const callMethod = vi.fn((_method: string, _args: unknown, _unused: unknown, callback: (...args: unknown[]) => void) => {
			callback(false, { error: "null" });
		});
		const { controller, definitions, messages } = createController({ callMethod });
		const moduleId = definitions.findIndex(definition => definition.moduleName === "RRPluginSDK");
		const methodId = definitions[moduleId].methods.indexOf("callMethod");

		await controller.handle({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "flushQueue",
			queue: [[moduleId], [methodId], [["get_status", [], null, 77]], 1],
		});

		expect(callMethod).toHaveBeenCalledOnce();
		expect(messages).toContainEqual({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "invokeCallback",
			target: "batched",
			callbackId: 77,
			arguments: [false, { error: "null" }],
		});
	});

	it("maps Promise queues to their success and failure callback IDs", async () => {
		const getRoomList = vi.fn(async () => [{ id: 16 }]);
		const { controller, definitions, messages } = createController({ getRoomList });
		const moduleId = definitions.findIndex(definition => definition.moduleName === "RRPluginSDK");
		const methodId = definitions[moduleId].methods.indexOf("getRoomList");
		expect(definitions[moduleId].promiseMethodIndices).toContain(methodId);

		await controller.handle({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "flushQueue",
			queue: [[moduleId], [methodId], [[88, 89]], 2],
		});

		expect(messages).toContainEqual({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "invokeCallback",
			target: "batched",
			callbackId: 89,
			arguments: [[{ id: 16 }]],
		});
	});

	it("classifies APK Promise rejections separately from bridge contract failures", async () => {
		const getRoomList = vi.fn(async () => {
			throw new Error("data is null");
		});
		const { controller, definitions, messages, rejections } = createController({ getRoomList });

		await controller.handle(invokeMessage({
			methodName: "getRoomList",
			callType: "promise",
			arguments: [],
		}));
		const moduleId = definitions.findIndex(definition => definition.moduleName === "RRPluginSDK");
		const methodId = definitions[moduleId].methods.indexOf("getRoomList");
		await controller.handle({
			protocol: "roborock-appplugin-host",
			version: 1,
			type: "flushQueue",
			queue: [[moduleId], [methodId], [[88, 89]], 2],
		});

		expect(messages).toContainEqual(expect.objectContaining({
			type: "invokeResult",
			requestId: 7,
			ok: false,
		}));
		expect(messages).toContainEqual(expect.objectContaining({
			type: "invokeCallback",
			target: "batched",
			callbackId: 88,
		}));
		expect(rejections).toEqual([
			expect.objectContaining({ bridge: "turbo", callType: "promise", methodName: "getRoomList" }),
			expect.objectContaining({ bridge: "batched", callType: "promise", methodName: "getRoomList" }),
		]);
	});

	it("returns explicit invocation errors instead of inventing native behavior", async () => {
		const { controller, messages } = createController({ callMethod: vi.fn() });
		await controller.handle(invokeMessage({ methodName: "inventedMethod" }));

		expect(messages).toEqual([expect.objectContaining({
			type: "invokeResult",
			requestId: 7,
			ok: false,
			error: expect.objectContaining({ message: expect.stringContaining("inventedMethod") }),
		})]);
	});

	it("rejects call types that contradict the APK-derived method contract", async () => {
		const callMethod = vi.fn();
		const { controller, messages } = createController({ callMethod });
		await controller.handle(invokeMessage({ callType: "sync" }));

		expect(callMethod).not.toHaveBeenCalled();
		expect(messages).toEqual([expect.objectContaining({
			type: "invokeResult",
			ok: false,
			error: expect.objectContaining({ message: expect.stringContaining("ist async, nicht sync") }),
		})]);
	});
});
