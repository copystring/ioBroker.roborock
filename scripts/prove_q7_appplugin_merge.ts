import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
	Q7_FULL_SCENE_FIRMWARE,
	Q7_FULL_SCENE_MAP_ID,
	Q7_FULL_SCENE_MODEL,
	Q7_FULL_SCENE_SERIAL,
} from "./lib/q7FullSceneFixture";

type JsonRecord = Record<string, unknown>;
type MergeScenario =
	| "merge-selection"
	| "merge-success"
	| "merge-multi-success"
	| "merge-non-adjacent"
	| "merge-single-room"
	| "merge-device-error"
	| "merge-device-timeout"
	| "merge-cancel";

interface ProofOptions {
	repositoryRoot: string;
	probePath: string;
	hostPath: string;
	bundlePath: string;
	sourceReplayManifestPath: string;
	interactionManifestPath: string;
	fixturePath: string;
	outputPath: string;
	rawOutputPath: string;
	timeoutMs: number;
	scenario: MergeScenario;
}

function record(value: unknown, context: string): JsonRecord {
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`${context} muss ein Objekt sein`);
	}
	return value as JsonRecord;
}

function array(value: unknown, context: string): unknown[] {
	if (!Array.isArray(value)) throw new Error(`${context} muss ein Array sein`);
	return value;
}

function sha256(filePath: string): string {
	return createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function parseArgs(args: string[]): ProofOptions {
	const repositoryRoot = process.cwd();
	const fixtureDirectory = path.join(repositoryRoot, "test", "fixtures", "appplugin");
	const runtimeDirectory = path.join(repositoryRoot, "artifacts", "appplugin-poc", "runtime-probes");
	const options: ProofOptions = {
		repositoryRoot,
		probePath: path.join(repositoryRoot, "artifacts", "appplugin-poc", "appplugin_hermes_runtime_probe-full-scene.cjs"),
		hostPath: path.join(repositoryRoot, "tools", "hermes-appplugin-host", ".build-mingw-cmake3", "roborock-hermes-appplugin-host.exe"),
		bundlePath: path.join(repositoryRoot, ".AppPlugins", "Q7 L5", "019a00a9af4b7b8e894080040a2793a5", "index.android.bundle"),
		sourceReplayManifestPath: path.join(fixtureDirectory, "q7-l5-full-scene-replay.json"),
		interactionManifestPath: path.join(fixtureDirectory, "q7-l5-room-merge-success.json"),
		fixturePath: path.join(fixtureDirectory, "q7-l5-full-scene-synthetic.blob"),
		outputPath: path.join(runtimeDirectory, "q7-l5-room-merge-success-proof.json"),
		rawOutputPath: path.join(runtimeDirectory, "q7-l5-room-merge-success-raw.json"),
		timeoutMs: 180_000,
		scenario: "merge-success",
	};
	const pathOptions: Readonly<Record<string, keyof ProofOptions>> = {
		"--probe": "probePath",
		"--host": "hostPath",
		"--bundle": "bundlePath",
		"--source-replay": "sourceReplayManifestPath",
		"--interaction": "interactionManifestPath",
		"--fixture": "fixturePath",
		"--output": "outputPath",
		"--raw-output": "rawOutputPath",
	};
	const scenarios: readonly MergeScenario[] = [
		"merge-selection",
		"merge-success",
		"merge-multi-success",
		"merge-non-adjacent",
		"merge-single-room",
		"merge-device-error",
		"merge-device-timeout",
		"merge-cancel",
	];
	for (let index = 0; index < args.length; index += 1) {
		const option = args[index];
		if (option === "--scenario") {
			const scenario = args[++index] as MergeScenario | undefined;
			if (!scenario || !scenarios.includes(scenario)) {
				throw new Error(`Unbekanntes Q7-Merge-Szenario: ${scenario ?? "<fehlt>"}`);
			}
			options.scenario = scenario;
			continue;
		}
		if (option === "--timeout-ms") {
			const timeoutMs = Number(args[++index]);
			if (!Number.isSafeInteger(timeoutMs) || timeoutMs <= 0) {
				throw new Error("--timeout-ms benötigt eine positive Ganzzahl");
			}
			options.timeoutMs = timeoutMs;
			continue;
		}
		const property = pathOptions[option];
		const value = args[++index];
		if (!property || !value) throw new Error(`Unbekannte oder unvollständige Option: ${option}`);
		options[property] = path.resolve(value) as never;
	}
	for (const [name, filePath] of Object.entries({
		probe: options.probePath,
		host: options.hostPath,
		bundle: options.bundlePath,
		sourceReplay: options.sourceReplayManifestPath,
		interaction: options.interactionManifestPath,
		fixture: options.fixturePath,
	})) {
		if (!fs.existsSync(filePath)) throw new Error(`${name}-Datei fehlt: ${filePath}`);
	}
	return options;
}

function resolveReplayEvent(rawEvent: unknown, sourceDirectory: string): JsonRecord {
	const event = { ...record(rawEvent, "Replay-Ereignis") };
	if (typeof event.framePath === "string") event.framePath = path.resolve(sourceDirectory, event.framePath);
	if (typeof event.blobPath === "string") event.blobPath = path.resolve(sourceDirectory, event.blobPath);
	return event;
}

function mapChangeResultForScenario(scenario: MergeScenario): 3 | 6 | 1000 | undefined {
	if (scenario === "merge-success" || scenario === "merge-multi-success") return 3;
	if (scenario === "merge-device-error") return 6;
	if (scenario === "merge-device-timeout") return 1000;
	return undefined;
}

function mapChangeEvent(result: 3 | 6 | 1000): JsonRecord {
	return {
		kind: "dps",
		dps: {
			"10001": JSON.stringify({ method: "event.map_change.post", params: { result } }),
		},
		waitAfterMs: 100,
	};
}

function prepareReplayManifest(options: ProofOptions, targetPath: string): void {
	const sourceDirectory = path.dirname(options.sourceReplayManifestPath);
	const manifest = record(
		JSON.parse(fs.readFileSync(options.sourceReplayManifestPath, "utf8")) as unknown,
		"Q7-Full-Scene-Replay",
	);
	manifest.events = array(manifest.events, "Q7-Full-Scene-Replay events")
		.map(event => resolveReplayEvent(event, sourceDirectory));
	const publishResponses = array(manifest.publishResponses, "Q7-Full-Scene-Replay publishResponses")
		.map(rawResponse => {
			const response = { ...record(rawResponse, "Publish-Antwort") };
			response.events = array(response.events, "Publish-Antwort events")
				.map(event => resolveReplayEvent(event, sourceDirectory));
			return response;
		});
	const result = mapChangeResultForScenario(options.scenario);
	if (result !== undefined) {
		publishResponses.push({
			match: { dpsKey: "10000", payload: { method: "service.arrange_room" } },
			events: [mapChangeEvent(result)],
			maximumMatches: 1,
		});
	}
	manifest.publishResponses = publishResponses;
	fs.writeFileSync(targetPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
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

function sanitizeDiagnostic(value: string): string {
	return value.replaceAll(Q7_FULL_SCENE_SERIAL, "<synthetic-sn>")
		.split(/\r?\n/u)
		.map(line => line.trim())
		.filter(line => line.length > 0)
		.slice(-40)
		.join(" | ")
		.slice(0, 12_000);
}

async function runProbe(options: ProofOptions, temporaryDirectory: string, replayManifestPath: string): Promise<JsonRecord> {
	const bootstrapPath = path.join(temporaryDirectory, "q7-merge-ipc-bridge.js");
	const deviceStoragePath = path.join(temporaryDirectory, "device-data", Q7_FULL_SCENE_MODEL);
	fs.mkdirSync(deviceStoragePath, { recursive: true });
	fs.writeFileSync(path.join(deviceStoragePath, "GuideConfigFilePath"), "{\"showGuidePage\":true}\n", "utf8");
	const args = [
		options.probePath,
		"--bundle", options.bundlePath,
		"--host", options.hostPath,
		"--bootstrap-output", bootstrapPath,
		"--width", "360",
		"--height", "800",
		"--scale", "1",
		"--device-model", Q7_FULL_SCENE_MODEL,
		"--duid", "q7-merge-synthetic-device",
		"--device-sn", Q7_FULL_SCENE_SERIAL,
		"--firmware-version", Q7_FULL_SCENE_FIRMWARE,
		"--run-application",
		"--react-state-probe",
		"--replay-manifest", replayManifestPath,
		"--interaction-replay", options.interactionManifestPath,
	];
	const toolchainBin = resolveToolchainBin(options.repositoryRoot);
	const stdout = await new Promise<string>((resolve, reject) => {
		const child = spawn(process.execPath, args, {
			cwd: options.repositoryRoot,
			env: {
				...process.env,
				PATH: toolchainBin ? `${toolchainBin}${path.delimiter}${process.env.PATH ?? ""}` : process.env.PATH,
			},
			stdio: ["ignore", "pipe", "pipe"],
			windowsHide: true,
		});
		let output = "";
		let diagnostic = "";
		let settled = false;
		const finish = (action: () => void): void => {
			if (settled) return;
			settled = true;
			clearTimeout(timeout);
			action();
		};
		const timeout = setTimeout(() => {
			child.kill();
			finish(() => reject(new Error(`Q7-Merge-Probe überschritt ${options.timeoutMs} ms`)));
		}, options.timeoutMs);
		child.stdout.on("data", (chunk: Buffer) => {
			output += chunk.toString("utf8");
			if (Buffer.byteLength(output, "utf8") > 128 * 1024 * 1024) {
				child.kill();
				finish(() => reject(new Error("Q7-Merge-Probe überschritt das Ausgabelimit")));
			}
		});
		child.stderr.on("data", (chunk: Buffer) => {
			diagnostic = `${diagnostic}${chunk.toString("utf8")}`.slice(-64 * 1024);
		});
		child.once("error", error => finish(() => reject(error)));
		child.once("close", code => finish(() => code === 0
			? resolve(output)
			: reject(new Error(`Q7-Merge-Probe endete mit Code ${code ?? "null"}: ${sanitizeDiagnostic(diagnostic)}`))));
	});
	for (const line of stdout.trim().split(/\r?\n/u).reverse()) {
		try {
			const result = record(JSON.parse(line) as unknown, "Probe-Ergebnis");
			if (result.status === "render-started") return result;
		} catch {
			// Frühere Statuszeilen sind kein finales Probe-Ergebnis.
		}
	}
	throw new Error("Q7-Merge-Probe lieferte kein render-started-Ergebnis");
}

function parsePublishedPayload(entryValue: unknown): JsonRecord | undefined {
	const entry = record(entryValue, "publishDps-Eintrag");
	const rawPayload = entry["10000"];
	if (rawPayload === undefined) return undefined;
	return record(typeof rawPayload === "string" ? JSON.parse(rawPayload) : rawPayload, "DPS 10000");
}

function assertedTexts(interactionManifestPath: string): string[] {
	const manifest = record(JSON.parse(fs.readFileSync(interactionManifestPath, "utf8")) as unknown, "Interaktionsmanifest");
	return array(manifest.events, "Interaktionsmanifest events").flatMap(rawEvent => {
		const event = record(rawEvent, "Interaktionsereignis");
		return event.kind === "assert" && Array.isArray(event.rawTextIncludes)
			? event.rawTextIncludes.filter(value => typeof value === "string") as string[]
			: [];
	});
}

function expectedOutcomeMessage(scenario: MergeScenario): string | undefined {
	if (scenario === "merge-non-adjacent") return "Wähle einen benachbarten Bereich aus";
	if (scenario === "merge-single-room") return "Wähle einen benachbarten Bereich aus";
	if (scenario === "merge-device-error") return "Zusammenführen fehlgeschlagen";
	if (scenario === "merge-device-timeout") return "Zeitüberschreitung bei Vorgang";
	return undefined;
}

function expectedRoomIds(scenario: MergeScenario): readonly number[] | undefined {
	if (scenario === "merge-multi-success") return [10, 11, 12];
	if (mapChangeResultForScenario(scenario) !== undefined) return [10, 11];
	return undefined;
}

function verifyRuntime(result: JsonRecord, options: ProofOptions, fixtureSha256: string): void {
	assert.equal(result.bundleKind, "hermes-bytecode", "Q7-Bundle muss unveränderter Hermes-Bytecode bleiben");
	assert.deepEqual(array(result.reportedExceptions, "reportedExceptions"), []);
	assert.equal(result.b01Ingress, undefined, "Merge-Beweis darf keinen B01-/Local-Key-Pfad verwenden");
	const blobIngresses = array(result.blobIngresses, "blobIngresses").map(value => record(value, "Blob-Eingang"));
	assert.ok(blobIngresses.length >= 1, "Mindestens der initiale direkte Blob-Eingang fehlt");
	for (const ingress of blobIngresses) {
		assert.equal(ingress.payloadSha256, fixtureSha256);
		assert.deepEqual(ingress.emittedEvents, ["RRDeviceBlobPayloadUpdateEvent"]);
	}
	const logs = array(result.appSysLogs, "appSysLogs").map(value => record(value, "AppSys-Log"));
	assert.deepEqual(logs.filter(log => log.tag === "apk-map-pipeline-error"), []);
	const rejections = array(result.nativeInvocationRejections, "nativeInvocationRejections")
		.map(value => record(value, "Native Ablehnung"));
	assert.ok(rejections.length <= 1, "Höchstens der optionale OTA-Leerzustand darf abgelehnt werden");
	for (const rejection of rejections) {
		assert.equal(rejection.moduleName, "RRPluginSDK");
		assert.equal(rejection.methodName, "getFirmwareUpdateState");
		assert.equal(rejection.callType, "promise");
		assert.equal(record(rejection.error, "OTA-Leerzustand").message, "data is null");
	}
	const interaction = record(result.interactionReplay, "interactionReplay");
	const replayEvents = array(interaction.events, "interactionReplay.events");
	const manifest = record(JSON.parse(fs.readFileSync(options.interactionManifestPath, "utf8")) as unknown, "Interaktionsmanifest");
	assert.equal(replayEvents.length, array(manifest.events, "Interaktionsmanifest events").length, "Interaktionsreplay unvollständig");
	assert.deepEqual(array(interaction.activePointerIds, "activePointerIds"), []);
}

function buildProof(result: JsonRecord, options: ProofOptions, bundleSha256: string, fixtureSha256: string): JsonRecord {
	const publishedPayloads = array(result.publishedDps, "publishedDps")
		.flatMap(entry => {
			const payload = parsePublishedPayload(entry);
			return payload ? [payload] : [];
		});
	const mergeIntents = publishedPayloads.filter(payload => payload.method === "service.arrange_room");
	const expectedIds = expectedRoomIds(options.scenario);
	const expectsIntent = expectedIds !== undefined;
	assert.equal(mergeIntents.length, expectsIntent ? 1 : 0, "Unerwartete Anzahl von service.arrange_room-Absichten");
	let publishedIntent: JsonRecord | undefined;
	if (expectedIds) {
		const intent = mergeIntents[0];
		const params = record(intent.params, "Merge-Parameter");
		const parameterKeys = Object.keys(params).sort();
		assert.deepEqual(parameterKeys, ["lang", "map_id", "room_ids"]);
		assert.equal(params.map_id, Q7_FULL_SCENE_MAP_ID);
		const roomIds = array(params.room_ids, "room_ids").map(Number);
		assert.deepEqual(roomIds, expectedIds, "Das AppPlugin hat nicht die erwartete zusammenhängende Raumauswahl gesendet");
		assert.ok(
			typeof params.lang === "string" && params.lang.length > 0
			|| typeof params.lang === "number" && Number.isFinite(params.lang),
			"AppPlugin muss die Sprache selbst liefern",
		);
		publishedIntent = {
			method: intent.method,
			parameterKeys,
			mapId: params.map_id,
			roomIds,
			language: params.lang,
			ownedByAppPlugin: true,
		};
	}
	const deviceReplay = record(result.deviceReplay, "deviceReplay");
	assert.deepEqual(array(deviceReplay.publishReplayResponseErrors, "publishReplayResponseErrors"), []);
	const responseMatches = array(deviceReplay.publishResponseMatches, "publishResponseMatches")
		.map(value => record(value, "Publish-Response-Match"));
	const mergeResponse = responseMatches.find(match => record(match.payload, "Match-Payload").method === "service.arrange_room");
	if (expectsIntent) assert.equal(mergeResponse?.matchCount, 1, "Merge-Geräteergebnis wurde nicht genau einmal zugeordnet");
	else assert.equal(mergeResponse, undefined, "Lokales Szenario darf keine Merge-Geräteantwort konfigurieren");
	const uploadResponse = responseMatches.find(match => record(match.payload, "Match-Payload").method === "service.upload_by_maptype");
	const uploadMatchCount = Number(uploadResponse?.matchCount ?? 0);
	assert.ok(Number.isSafeInteger(uploadMatchCount) && uploadMatchCount >= 1, "Initialer AppPlugin-Kartenabruf fehlt");
	if (options.scenario === "merge-success" || options.scenario === "merge-multi-success") {
		assert.ok(uploadMatchCount >= 2, "Das AppPlugin hat die Karte nach erfolgreichem Zusammenführen nicht neu geladen");
	}
	const expectedMessage = expectedOutcomeMessage(options.scenario);
	const asserted = assertedTexts(options.interactionManifestPath);
	if (expectedMessage) assert.ok(asserted.includes(expectedMessage), `Semantische AppPlugin-Assertion fehlt: ${expectedMessage}`);
	const interaction = record(result.interactionReplay, "interactionReplay");
	return {
		version: 1,
		status: "passed",
		generatedAt: new Date().toISOString(),
		scenario: options.scenario,
		runtime: "unchanged Q7 L5 Hermes AppPlugin",
		appPluginFirst: true,
		captureOnly: true,
		bundle: { kind: result.bundleKind, sha256: bundleSha256, unchanged: true },
		transport: {
			fixtureSha256,
			directBlobReplay: true,
			b01FrameUsed: false,
			localKeyUsed: false,
			deviceWritePerformed: false,
		},
		interaction: {
			manifestSha256: sha256(options.interactionManifestPath),
			viewport: interaction.viewport,
			eventCount: array(interaction.events, "interactionReplay.events").length,
			activePointerCount: 0,
			assertedTexts: asserted,
		},
		...(publishedIntent ? { publishedIntent } : {}),
		selection: {
			minimumRoomCount: 2,
			connectedSetRequired: true,
			multipleConnectedRoomsSupported: options.scenario === "merge-multi-success",
			validatedByAppPluginRoomMatrix: true,
		},
		deviceLifecycle: {
			configuredMapChangeResult: mapChangeResultForScenario(options.scenario) ?? null,
			responseMatched: expectsIntent,
			resultHandledByAppPlugin: expectsIntent,
			discardHandledByAppPlugin: options.scenario === "merge-cancel",
			mapUploadMatchCount: uploadMatchCount,
			messageFromAppPluginTranslation: expectedMessage ?? null,
			hostAdjacencyImplemented: false,
			hostPayloadImplemented: false,
		},
		reportedExceptionCount: 0,
	};
}

async function main(): Promise<void> {
	const options = parseArgs(process.argv.slice(2));
	const bundleSha256Before = sha256(options.bundlePath);
	const fixtureSha256 = sha256(options.fixturePath);
	const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "q7-appplugin-merge-"));
	try {
		const replayManifestPath = path.join(temporaryDirectory, "q7-merge-device-replay.json");
		prepareReplayManifest(options, replayManifestPath);
		const result = await runProbe(options, temporaryDirectory, replayManifestPath);
		if (sha256(options.bundlePath) !== bundleSha256Before) {
			throw new Error("Das AppPlugin-Bundle wurde während des Merge-Beweises verändert");
		}
		fs.mkdirSync(path.dirname(options.rawOutputPath), { recursive: true });
		fs.writeFileSync(options.rawOutputPath, `${JSON.stringify(result)}\n`, "utf8");
		verifyRuntime(result, options, fixtureSha256);
		const proof = buildProof(result, options, bundleSha256Before, fixtureSha256);
		fs.mkdirSync(path.dirname(options.outputPath), { recursive: true });
		fs.writeFileSync(options.outputPath, `${JSON.stringify(proof, null, 2)}\n`, "utf8");
		process.stdout.write(`${JSON.stringify(proof)}\n`);
	} finally {
		fs.rmSync(temporaryDirectory, { recursive: true, force: true });
	}
}

void main().catch(error => {
	process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
	process.exitCode = 1;
});
