import { EventEmitter } from "node:events";
import { PassThrough } from "node:stream";

import { beforeEach, describe, expect, it, vi } from "vitest";

import contractJson from "../../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import {
	ApkAppPluginModelRuntime,
	type ApkAndroidTextLayoutBackend,
	type ApkAppPluginHostContract,
} from "../../src/apppluginHost";
import type { ApkHermesHostMessage } from "../../src/apppluginHost/apkHermesHostProtocol";
import type { ApkNativeModuleDispatcher } from "../../src/apppluginHost/apkNativeModuleDispatcher";

const { spawnMock } = vi.hoisted(() => ({ spawnMock: vi.fn() }));

vi.mock("node:child_process", async importOriginal => ({
	...await importOriginal<typeof import("node:child_process")>(),
	spawn: spawnMock,
}));

import { ApkHermesHostSession, ApkHermesJsonLineDecoder } from "../../src/apppluginHost/apkHermesHostSession";

interface FakeHermesHost {
	readonly child: EventEmitter & {
		killed: boolean;
		kill: ReturnType<typeof vi.fn>;
		readonly stderr: PassThrough;
		readonly stdin: PassThrough;
		readonly stdout: PassThrough;
	};
	readonly commands: ApkHermesHostMessage[];
}

function protocolMessage(fields: Record<string, unknown>): string {
	return `${JSON.stringify({
		protocol: "roborock-appplugin-host",
		version: 1,
		...fields,
	})}\n`;
}

function createFakeHermesHost(): FakeHermesHost {
	const stdin = new PassThrough();
	const stdout = new PassThrough();
	const stderr = new PassThrough();
	const child = Object.assign(new EventEmitter(), {
		killed: false,
		kill: vi.fn(),
		stderr,
		stdin,
		stdout,
	});
	child.kill.mockImplementation(() => {
		child.killed = true;
		queueMicrotask(() => child.emit("close", null, "SIGTERM"));
		return true;
	});
	const commands: ApkHermesHostMessage[] = [];
	let pending = "";
	stdin.on("data", (chunk: Buffer) => {
		pending += chunk.toString("utf8");
		for (;;) {
			const newline = pending.indexOf("\n");
			if (newline < 0) break;
			const line = pending.slice(0, newline);
			pending = pending.slice(newline + 1);
			const command = JSON.parse(line) as ApkHermesHostMessage;
			commands.push(command);
			if (command.type === "runApplication") {
				const parameters = command.parameters as { rootTag: number };
				stdout.write(protocolMessage({
					type: "applicationStarted",
					appKey: command.appKey,
					rootTag: parameters.rootTag,
				}));
			} else if (command.type === "unmountApplication") {
				stdout.write(protocolMessage({ type: "applicationUnmounted", rootTag: command.rootTag }));
			} else if (command.type === "shutdown") {
				stdout.write(protocolMessage({ type: "stopped" }));
				queueMicrotask(() => child.emit("close", 0, null));
			}
		}
	});
	queueMicrotask(() => {
		stdout.write(protocolMessage({ type: "ready" }));
		stdout.write(protocolMessage({
			type: "bundleEvaluated",
			bundleKind: "hermes-bytecode",
			probe: { appKeys: ["App"] },
		}));
	});
	return { child, commands };
}

let fakeHost: FakeHermesHost;

beforeEach(() => {
	fakeHost = createFakeHermesHost();
	spawnMock.mockReset();
	spawnMock.mockReturnValue(fakeHost.child);
});

describe("APK Hermes host session framing", () => {
	it("preserves UTF-8 and JSONL boundaries across arbitrary chunks", () => {
		const decoder = new ApkHermesJsonLineDecoder(1024);
		const encoded = Buffer.from('{"text":"Küche"}\r\n{"value":2}\n', "utf8");
		const split = encoded.indexOf(Buffer.from("ü")) + 1;

		expect(decoder.push(encoded.subarray(0, split))).toEqual([]);
		expect(decoder.push(encoded.subarray(split))).toEqual([
			'{"text":"Küche"}',
			'{"value":2}',
		]);
		expect(decoder.finish()).toEqual([]);
	});

	it("rejects an oversized protocol line even when it arrives in chunks", () => {
		const decoder = new ApkHermesJsonLineDecoder(5);
		expect(decoder.push(Buffer.from("123"))).toEqual([]);
		expect(() => decoder.push(Buffer.from("456"))).toThrow(/überschreitet 5 Bytes/u);
	});

	it("returns a final non-empty line when the stream closes without LF", () => {
		const decoder = new ApkHermesJsonLineDecoder(32);
		decoder.push(Buffer.from("final"));
		expect(decoder.finish()).toEqual(["final"]);
	});
});

describe("APK Hermes application roots", () => {
	it("mounts independent root tags, unmounts them and permits reuse only after confirmation", async () => {
		const session = new ApkHermesHostSession({
			bootstrapPath: process.execPath,
			bundlePath: process.execPath,
			definitions: [],
			dispatcher: {} as ApkNativeModuleDispatcher,
			hostExecutablePath: process.execPath,
			shutdownTimeoutMs: 100,
			startupTimeoutMs: 100,
		});
		await session.start();

		await Promise.all([
			session.runApplication("App", { rootTag: 1, initialProps: { duid: "one" } }),
			session.runApplication("App", { rootTag: 11, initialProps: { duid: "two" } }),
		]);
		await expect(session.runApplication("App", { rootTag: 1 })).rejects.toThrow(/bereits belegt/u);

		await session.unmountApplication(1);
		await expect(session.unmountApplication(1)).rejects.toThrow(/nicht eingehängt/u);
		await session.runApplication("App", { rootTag: 1, initialProps: { duid: "three" } });
		await Promise.all([
			session.unmountApplication(1),
			session.unmountApplication(11),
		]);
		await session.stop();

		expect(session.state).toBe("stopped");
		expect(fakeHost.commands.map(command => command.type)).toEqual([
			"runApplication",
			"runApplication",
			"unmountApplication",
			"runApplication",
			"unmountApplication",
			"unmountApplication",
			"shutdown",
		]);
	});

	it("connects the production model root lease to confirmed Hermes mount and unmount", async () => {
		const textLayoutBackend: ApkAndroidTextLayoutBackend = {
			intrinsicWidth: () => { throw new Error("Kein Text erwartet"); },
			layout: () => { throw new Error("Kein Text erwartet"); },
		};
		const runtime = new ApkAppPluginModelRuntime({
			contract: contractJson as ApkAppPluginHostContract,
			textLayoutBackend,
			createSession: () => new ApkHermesHostSession({
				bootstrapPath: process.execPath,
				bundlePath: process.execPath,
				definitions: [],
				dispatcher: {} as ApkNativeModuleDispatcher,
				hostExecutablePath: process.execPath,
				shutdownTimeoutMs: 100,
				startupTimeoutMs: 100,
			}),
		});
		await runtime.start();
		const root = await runtime.openRoot({
			initialProps: { colorMode: "light" },
			width: 360,
			height: 800,
			density: 3,
			fontScale: 1,
		});

		expect(root.rootTag).toBe(1);
		await root.release();
		await runtime.stop();

		expect(fakeHost.commands.map(command => command.type)).toEqual([
			"runApplication",
			"unmountApplication",
			"shutdown",
		]);
	});
});
