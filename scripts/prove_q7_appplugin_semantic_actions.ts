import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createServer } from "node:net";
import { spawn, type ChildProcessByStdio } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import type { Readable } from "node:stream";

import { finalQ7RoomSelectionDiagnostic } from "./lib/q7RoomSelectionEvidence";
import {
	Q7_FULL_SCENE_FIRMWARE,
	Q7_FULL_SCENE_MODEL,
	Q7_FULL_SCENE_SERIAL,
} from "./lib/q7FullSceneFixture";

interface RuntimeHandle {
	child: ChildProcessByStdio<null, Readable, Readable>;
	baseUrl: string;
	stderr: () => string;
}

interface SemanticAction {
	id: string;
	label: string;
	enabled: boolean;
	selected: boolean;
	owner: string;
	contract: string;
}

type JsonRecord = Record<string, unknown>;

function jsonRecord(value: unknown, context: string): JsonRecord {
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`${context} muss ein JSON-Objekt sein`);
	}
	return value as JsonRecord;
}

function jsonArray(value: unknown, context: string): unknown[] {
	if (!Array.isArray(value)) throw new Error(`${context} muss ein JSON-Array sein`);
	return value;
}

function sha256File(filePath: string): string {
	return createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

async function freePort(): Promise<number> {
	const server = createServer();
	await new Promise<void>((resolve, reject) => {
		server.once("error", reject);
		server.listen(0, "127.0.0.1", resolve);
	});
	const address = server.address();
	if (!address || typeof address === "string") throw new Error("Freier Loopback-Port konnte nicht bestimmt werden");
	await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
	return address.port;
}

function resolveToolchainBin(repositoryRoot: string): string | undefined {
	if (process.platform !== "win32") return undefined;
	const root = path.join(repositoryRoot, "tools", "hermes-appplugin-host", ".cache", "toolchains", "llvm-mingw");
	if (!fs.existsSync(root)) return undefined;
	return fs.readdirSync(root)
		.map(name => path.join(root, name, "bin"))
		.filter(candidate => fs.existsSync(candidate))
		.sort()
		.at(-1);
}

async function startRuntime(repositoryRoot: string, port: number): Promise<RuntimeHandle> {
	const probePath = path.join(
		repositoryRoot,
		"artifacts",
		"appplugin-poc",
		"appplugin_hermes_runtime_probe-semantic-actions.cjs",
	);
	const hostPath = path.join(
		repositoryRoot,
		"tools",
		"hermes-appplugin-host",
		".build-mingw-cmake3",
		"roborock-hermes-appplugin-host.exe",
	);
	const bundlePath = path.join(
		repositoryRoot,
		".AppPlugins",
		"Q7 L5",
		"019a00a9af4b7b8e894080040a2793a5",
		"index.android.bundle",
	);
	const replayPath = path.join(
		repositoryRoot,
		"test",
		"fixtures",
		"appplugin",
		"q7-l5-full-scene-replay.json",
	);
	const bootstrapPath = path.join(
		repositoryRoot,
		"artifacts",
		"appplugin-poc",
		"runtime-probes",
		"q7-semantic-actions-ipc-bridge.js",
	);
	for (const [label, filePath] of Object.entries({ probePath, hostPath, bundlePath, replayPath })) {
		if (!fs.existsSync(filePath)) throw new Error(`${label} fehlt: ${filePath}`);
	}
	const args = [
		probePath,
		"--bundle", bundlePath,
		"--host", hostPath,
		"--bootstrap-output", bootstrapPath,
		"--width", "360",
		"--height", "800",
		"--scale", "1",
		"--device-model", Q7_FULL_SCENE_MODEL,
		"--device-name", "Q7 Semantic Action Proof",
		"--duid", "q7-semantic-actions-synthetic-device",
		"--device-sn", Q7_FULL_SCENE_SERIAL,
		"--firmware-version", Q7_FULL_SCENE_FIRMWARE,
		"--run-application",
		"--react-state-probe",
		"--replay-manifest", replayPath,
		"--serve-port", String(port),
		"--profile-label", "Q7 L5 · semantischer Capture-only-Nachweis",
	];
	const toolchainBin = resolveToolchainBin(repositoryRoot);
	const child = spawn(process.execPath, args, {
		cwd: repositoryRoot,
		env: {
			...process.env,
			PATH: toolchainBin ? `${toolchainBin}${path.delimiter}${process.env.PATH ?? ""}` : process.env.PATH,
		},
		stdio: ["ignore", "pipe", "pipe"],
		windowsHide: true,
	});
	let stderr = "";
	child.stderr.on("data", (chunk: Buffer) => {
		stderr = `${stderr}${chunk.toString("utf8")}`.slice(-64 * 1024);
	});
	const baseUrl = await new Promise<string>((resolve, reject) => {
		let stdout = "";
		const timeout = setTimeout(() => {
			child.kill();
			reject(new Error(`Semantische AppPlugin-Runtime wurde nicht bereit: ${stderr}`));
		}, 90_000);
		child.stdout.on("data", (chunk: Buffer) => {
			stdout += chunk.toString("utf8");
			const lines = stdout.split(/\r?\n/u);
			stdout = lines.pop() ?? "";
			for (const line of lines) {
				try {
					const message = jsonRecord(JSON.parse(line) as unknown, "Runtime-Status");
					if (message.status === "interactive-server-ready" && typeof message.url === "string") {
						clearTimeout(timeout);
						resolve(message.url);
						return;
					}
				} catch {
					// Build- und Diagnoseausgaben sind keine Runtime-Statuszeilen.
				}
			}
		});
		child.once("error", error => {
			clearTimeout(timeout);
			reject(error);
		});
		child.once("exit", code => {
			clearTimeout(timeout);
			reject(new Error(`Semantische AppPlugin-Runtime endete vorzeitig mit ${code}: ${stderr}`));
		});
	});
	return { child, baseUrl, stderr: () => stderr };
}

async function stopRuntime(handle: RuntimeHandle): Promise<void> {
	if (handle.child.exitCode !== null) return;
	handle.child.kill();
	await new Promise<void>(resolve => {
		const timeout = setTimeout(resolve, 5_000);
		handle.child.once("exit", () => {
			clearTimeout(timeout);
			resolve();
		});
	});
}

async function requestJson(
	baseUrl: string,
	pathname: string,
	init?: RequestInit,
): Promise<JsonRecord> {
	const response = await fetch(`${baseUrl}${pathname}`, init);
	const payload = jsonRecord(await response.json() as unknown, pathname);
	if (!response.ok) throw new Error(`${pathname} antwortet mit ${response.status}: ${JSON.stringify(payload)}`);
	return payload;
}

function semanticActions(payload: JsonRecord): SemanticAction[] {
	return jsonArray(payload.semanticActions, "semanticActions").map((value, index) => {
		const action = jsonRecord(value, `semanticActions[${index}]`);
		assert.equal(typeof action.id, "string");
		assert.equal(typeof action.label, "string");
		assert.equal(typeof action.enabled, "boolean");
		assert.equal(typeof action.selected, "boolean");
		assert.equal(action.owner, "unchanged-appplugin-ui");
		assert.equal(action.contract, "scmap-bottom-control-panel-v2");
		assert.ok(!Object.hasOwn(action, "reactTag"));
		assert.ok(!Object.hasOwn(action, "center"));
		return action as unknown as SemanticAction;
	});
}

function selectedMode(actions: readonly SemanticAction[]): string | undefined {
	return actions.find(action => action.id.startsWith("map.mode.") && action.selected)?.id;
}

function publishedMethods(payload: JsonRecord): string[] {
	return jsonArray(payload.publishedDps, "publishedDps").flatMap(value => {
		const publication = jsonRecord(value, "publishedDps[]");
		return Object.values(publication).flatMap(rawPayload => {
			try {
				const message = jsonRecord(
					typeof rawPayload === "string" ? JSON.parse(rawPayload) as unknown : rawPayload,
					"publishedDps-Payload",
				);
				return typeof message.method === "string" ? [message.method] : [];
			} catch {
				return [];
			}
		});
	});
}

async function invokeSemanticAction(
	baseUrl: string,
	id: string,
): Promise<JsonRecord> {
	return requestJson(baseUrl, "/semantic-action?view=map", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id }),
	});
}

async function main(): Promise<void> {
	const repositoryRoot = process.cwd();
	const bundlePath = path.join(
		repositoryRoot,
		".AppPlugins",
		"Q7 L5",
		"019a00a9af4b7b8e894080040a2793a5",
		"index.android.bundle",
	);
	const bundleSha256Before = sha256File(bundlePath);
	const handle = await startRuntime(repositoryRoot, await freePort());
	try {
		const initialHealth = await requestJson(handle.baseUrl, "/health?view=map");
		const initialActions = semanticActions(initialHealth);
		assert.deepEqual(
			initialActions.map(action => action.id),
			["map.mode.full", "map.mode.rooms", "map.mode.zones", "clean.panel", "dock.panel", "clean.start"],
		);
		assert.equal(selectedMode(initialActions), "map.mode.full");

		const roomsResponse = await invokeSemanticAction(handle.baseUrl, "map.mode.rooms");
		assert.equal(selectedMode(semanticActions(roomsResponse)), "map.mode.rooms");
		assert.deepEqual(jsonArray(roomsResponse.activePointerIds, "rooms.activePointerIds"), []);

		const roomTapResponse = await requestJson(handle.baseUrl, "/pointer-sequence?view=map", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				pointers: [
					{ kind: "down", pointerId: 7, x: 108, y: 463, timeMs: 10_000 },
					{ kind: "up", pointerId: 7, x: 108, y: 463, timeMs: 10_040 },
				],
			}),
		});
		assert.deepEqual(jsonArray(roomTapResponse.activePointerIds, "roomTap.activePointerIds"), []);
		const stateAfterSelection = await requestJson(handle.baseUrl, "/state");
		assert.deepEqual(
			finalQ7RoomSelectionDiagnostic(stateAfterSelection.appSysLogs, 4).selectedRoomIds,
			[10],
		);

		const beforeCleanCount = Number(roomTapResponse.publishedDpsCount);
		assert.ok(Number.isSafeInteger(beforeCleanCount) && beforeCleanCount >= 0);
		const cleanResponse = await invokeSemanticAction(handle.baseUrl, "clean.start");
		assert.deepEqual(jsonArray(cleanResponse.activePointerIds, "clean.activePointerIds"), []);
		assert.ok(Number(cleanResponse.publishedDpsCount) > beforeCleanCount);
		const publications = await requestJson(
			handle.baseUrl,
			`/published-dps?after=${beforeCleanCount}`,
		);
		const methods = publishedMethods(publications);
		assert.ok(
			methods.includes("service.set_room_clean"),
			`Originales AppPlugin erzeugte nach dem Startklick kein service.set_room_clean: ${methods.join(", ")}`,
		);
		assert.equal(sha256File(bundlePath), bundleSha256Before);

		process.stdout.write(`${JSON.stringify({
			version: 1,
			status: "passed",
			appPluginFirst: true,
			captureOnly: true,
			bundle: {
				kind: initialHealth.bundleKind,
				sha256: bundleSha256Before,
				unchanged: true,
			},
			semanticUi: {
				contract: "scmap-bottom-control-panel-v2",
				actionIds: initialActions.map(action => action.id),
				labels: initialActions.map(action => action.label),
				initialMode: "map.mode.full",
				modeAfterDesktopAction: "map.mode.rooms",
				selectedRoomIdsOwnedByAppPlugin: [10],
				cleanActionOwnedByAppPlugin: true,
				hostCoordinatesExposed: false,
				hostCommandPayloadImplemented: false,
			},
			publication: {
				method: "service.set_room_clean",
				capturedOnly: true,
				deviceWritePerformed: false,
			},
		})}\n`);
	} finally {
		await stopRuntime(handle);
	}
}

void main().catch(error => {
	process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
	process.exitCode = 1;
});
