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
type SplitScenario =
	| "split-line-visible"
	| "split-success"
	| "split-small-area"
	| "split-device-error"
	| "split-device-timeout"
	| "split-invalid-line"
	| "split-cancel";

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
	scenario: SplitScenario;
	runtimeLabel: string;
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
		interactionManifestPath: path.join(fixtureDirectory, "q7-l5-room-split-success.json"),
		fixturePath: path.join(fixtureDirectory, "q7-l5-full-scene-synthetic.blob"),
		outputPath: path.join(runtimeDirectory, "q7-l5-room-split-success-proof.json"),
		rawOutputPath: path.join(runtimeDirectory, "q7-l5-room-split-success-raw.json"),
		timeoutMs: 180_000,
		scenario: "split-success",
		runtimeLabel: "unchanged Q7 L5 Hermes AppPlugin",
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
	const scenarios: readonly SplitScenario[] = [
		"split-line-visible",
		"split-success",
		"split-small-area",
		"split-device-error",
		"split-device-timeout",
		"split-invalid-line",
		"split-cancel",
	];
	for (let index = 0; index < args.length; index += 1) {
		const option = args[index];
		if (option === "--scenario") {
			const scenario = args[++index] as SplitScenario | undefined;
			if (!scenario || !scenarios.includes(scenario)) {
				throw new Error(`Unbekanntes Q7-Split-Szenario: ${scenario ?? "<fehlt>"}`);
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
		if (option === "--runtime-label") {
			const runtimeLabel = args[++index];
			if (!runtimeLabel) throw new Error("--runtime-label benötigt einen Wert");
			options.runtimeLabel = runtimeLabel;
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

function mapChangeResultForScenario(scenario: SplitScenario): 3 | 4 | 6 | 1000 | undefined {
	if (scenario === "split-success") return 3;
	if (scenario === "split-small-area") return 4;
	if (scenario === "split-device-error") return 6;
	if (scenario === "split-device-timeout") return 1000;
	return undefined;
}

function mapChangeEvent(result: 3 | 4 | 6 | 1000): JsonRecord {
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
			match: { dpsKey: "10000", payload: { method: "service.split_room" } },
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
	const bootstrapPath = path.join(temporaryDirectory, "q7-split-ipc-bridge.js");
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
		"--duid", "q7-split-synthetic-device",
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
			finish(() => reject(new Error(`Q7-Split-Probe überschritt ${options.timeoutMs} ms`)));
		}, options.timeoutMs);
		child.stdout.on("data", (chunk: Buffer) => {
			output += chunk.toString("utf8");
			if (Buffer.byteLength(output, "utf8") > 128 * 1024 * 1024) {
				child.kill();
				finish(() => reject(new Error("Q7-Split-Probe überschritt das Ausgabelimit")));
			}
		});
		child.stderr.on("data", (chunk: Buffer) => {
			diagnostic = `${diagnostic}${chunk.toString("utf8")}`.slice(-64 * 1024);
		});
		child.once("error", error => finish(() => reject(error)));
		child.once("close", code => finish(() => code === 0
			? resolve(output)
			: reject(new Error(`Q7-Split-Probe endete mit Code ${code ?? "null"}: ${sanitizeDiagnostic(diagnostic)}`))));
	});
	for (const line of stdout.trim().split(/\r?\n/u).reverse()) {
		try {
			const result = record(JSON.parse(line) as unknown, "Probe-Ergebnis");
			if (result.status === "render-started") return result;
		} catch {
			// Frühere Statuszeilen sind kein finales Probe-Ergebnis.
		}
	}
	throw new Error("Q7-Split-Probe lieferte kein render-started-Ergebnis");
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

function collectViewNodes(rootValue: unknown, viewName: string): JsonRecord[] {
	const matches: JsonRecord[] = [];
	const visit = (value: unknown): void => {
		const node = record(value, "UI-Knoten");
		if (node.viewName === viewName) matches.push(node);
		for (const child of array(node.children, `Kinder von UI-Knoten ${String(node.tag)}`)) visit(child);
	};
	visit(rootValue);
	return matches;
}

function finiteProperty(props: JsonRecord, property: string, context: string): number {
	const value = props[property];
	assert.equal(typeof value, "number", `${context}.${property} muss numerisch sein`);
	assert.ok(Number.isFinite(value), `${context}.${property} muss endlich sein`);
	return value as number;
}

function brushPayload(props: JsonRecord, property: string, context: string): number {
	const brush = record(props[property], `${context}.${property}`);
	assert.equal(brush.type, 0, `${context}.${property} muss eine AppPlugin-Solid-Color sein`);
	return finiteProperty(brush, "payload", `${context}.${property}`);
}

function inspectSplitGraphics(result: JsonRecord, scenario: SplitScenario): JsonRecord {
	const lines = collectViewNodes(result.uiTree, "RNSVGLine");
	const circles = collectViewNodes(result.uiTree, "RNSVGCircle");
	const expectedVisible = scenario !== "split-success" && scenario !== "split-cancel";
	assert.equal(lines.length, expectedVisible ? 3 : 0, "Unerwartete Anzahl originaler AppPlugin-Splitlinien");
	assert.equal(circles.length, expectedVisible ? 2 : 0, "Unerwartete Anzahl originaler AppPlugin-Splitgriffe");
	if (!expectedVisible) {
		return { visible: false, lineCount: 0, handleCount: 0, ownedByAppPlugin: true };
	}

	const lineProps = lines.map((line, index) => record(line.props, `RNSVGLine ${index} props`));
	const solidLines = lineProps.filter(props => props.strokeDasharray === undefined);
	const dashedLines = lineProps.filter(props => props.strokeDasharray !== undefined);
	assert.equal(solidLines.length, 1, "Das AppPlugin muss genau eine solide Trennlinie liefern");
	assert.equal(dashedLines.length, 2, "Das AppPlugin muss genau zwei gestrichelte Wandsegmente liefern");
	const solid = solidLines[0];
	assert.equal(brushPayload(solid, "stroke", "solide Splitlinie"), -65536);
	assert.equal(finiteProperty(solid, "strokeWidth", "solide Splitlinie"), 1.5);
	for (const [index, dashed] of dashedLines.entries()) {
		assert.equal(brushPayload(dashed, "stroke", `gestrichelte Splitlinie ${index}`), -65536);
		assert.equal(finiteProperty(dashed, "strokeWidth", `gestrichelte Splitlinie ${index}`), 0.75);
		assert.deepEqual(dashed.strokeDasharray, ["0.5", "0.5"]);
	}

	const endpoints = [
		{ x: finiteProperty(solid, "x1", "solide Splitlinie"), y: finiteProperty(solid, "y1", "solide Splitlinie") },
		{ x: finiteProperty(solid, "x2", "solide Splitlinie"), y: finiteProperty(solid, "y2", "solide Splitlinie") },
	];
	const handles = circles.map((circle, index) => {
		const props = record(circle.props, `RNSVGCircle ${index} props`);
		assert.equal(brushPayload(props, "fill", `Splitgriff ${index}`), -16745729);
		assert.equal(brushPayload(props, "stroke", `Splitgriff ${index}`), -1);
		assert.equal(finiteProperty(props, "strokeWidth", `Splitgriff ${index}`), 1.5);
		assert.equal(finiteProperty(props, "r", `Splitgriff ${index}`), 4);
		return { x: finiteProperty(props, "cx", `Splitgriff ${index}`), y: finiteProperty(props, "cy", `Splitgriff ${index}`) };
	});
	for (const endpoint of endpoints) {
		assert.ok(handles.some(handle => handle.x === endpoint.x && handle.y === endpoint.y), "Splitgriff liegt nicht auf einem Linienende");
	}
	if (scenario === "split-line-visible") {
		assert.deepEqual(endpoints, [{ x: 65, y: 163 }, { x: 155, y: 163 }], "AppPlugin-Defaultgeometrie hat sich geändert");
	}
	return {
		visible: true,
		lineCount: lines.length,
		handleCount: circles.length,
		endpoints,
		handleRadius: 4,
		ownedByAppPlugin: true,
	};
}
function expectedOutcomeMessage(scenario: SplitScenario): string | undefined {
	if (scenario === "split-small-area") return "Teilen fehlgeschlagen. Geteilte Bereiche zu klein.";
	if (scenario === "split-device-error") return "Unterteilung fehlgeschlagen";
	if (scenario === "split-device-timeout") return "Zeitüberschreitung bei Vorgang";
	if (scenario === "split-invalid-line") {
		return "Die beiden Enden der Trennlinie sollten möglichst nahe an den Wänden des Raums sein.";
	}
	return undefined;
}

function verifyRuntime(result: JsonRecord, options: ProofOptions, fixtureSha256: string): void {
	assert.equal(result.bundleKind, "hermes-bytecode", "Q7-Bundle muss unveränderter Hermes-Bytecode bleiben");
	assert.deepEqual(array(result.reportedExceptions, "reportedExceptions"), []);
	assert.equal(result.b01Ingress, undefined, "Split-Beweis darf keinen B01-/Local-Key-Pfad verwenden");
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
	const splitIntents = publishedPayloads.filter(payload => payload.method === "service.split_room");
	const expectsIntent = mapChangeResultForScenario(options.scenario) !== undefined;
	assert.equal(splitIntents.length, expectsIntent ? 1 : 0, "Unerwartete Anzahl von service.split_room-Absichten");
	let publishedIntent: JsonRecord | undefined;
	if (expectsIntent) {
		const intent = splitIntents[0];
		const params = record(intent.params, "Split-Parameter");
		const parameterKeys = Object.keys(params).sort();
		assert.deepEqual(parameterKeys, ["lang", "map_id", "room_id", "split_points"]);
		assert.equal(params.map_id, Q7_FULL_SCENE_MAP_ID);
		assert.ok([10, 11, 12, 13].includes(Number(params.room_id)), "AppPlugin lieferte keine gültige Raum-ID");
		const points = array(params.split_points, "split_points");
		assert.equal(points.length, 4);
		assert.ok(points.every(value => typeof value === "number" && Number.isFinite(value)), "split_points müssen endlich sein");
		assert.ok(
			typeof params.lang === "string" && params.lang.length > 0
			|| typeof params.lang === "number" && Number.isFinite(params.lang),
			"AppPlugin muss die Sprache selbst liefern",
		);
		publishedIntent = {
			method: intent.method,
			parameterKeys,
			mapId: params.map_id,
			roomId: params.room_id,
			splitPoints: points,
			language: params.lang,
			ownedByAppPlugin: true,
		};
	}
	const splitGraphics = inspectSplitGraphics(result, options.scenario);
	const deviceReplay = record(result.deviceReplay, "deviceReplay");
	assert.deepEqual(array(deviceReplay.publishReplayResponseErrors, "publishReplayResponseErrors"), []);
	const responseMatches = array(deviceReplay.publishResponseMatches, "publishResponseMatches")
		.map(value => record(value, "Publish-Response-Match"));
	const splitResponse = responseMatches.find(match => record(match.payload, "Match-Payload").method === "service.split_room");
	if (expectsIntent) assert.equal(splitResponse?.matchCount, 1, "Split-Geräteergebnis wurde nicht genau einmal zugeordnet");
	else assert.equal(splitResponse, undefined, "Lokales Szenario darf keine Split-Geräteantwort konfigurieren");
	const uploadResponse = responseMatches.find(match => record(match.payload, "Match-Payload").method === "service.upload_by_maptype");
	const uploadMatchCount = Number(uploadResponse?.matchCount ?? 0);
	assert.ok(Number.isSafeInteger(uploadMatchCount) && uploadMatchCount >= 1, "Initialer AppPlugin-Kartenabruf fehlt");
	if (options.scenario === "split-success") {
		assert.ok(uploadMatchCount >= 2, "Das AppPlugin hat die Karte nach erfolgreicher Teilung nicht neu geladen");
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
		runtime: options.runtimeLabel,
		appPluginFirst: true,
		captureOnly: true,
		bundle: {
			kind: result.bundleKind,
			path: path.relative(options.repositoryRoot, options.bundlePath).replaceAll(path.sep, "/"),
			sha256: bundleSha256,
			unchanged: true,
		},
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
		splitGraphics,
		deviceLifecycle: {
			configuredMapChangeResult: mapChangeResultForScenario(options.scenario) ?? null,
			responseMatched: expectsIntent,
			resultHandledByAppPlugin: expectsIntent,
			discardHandledByAppPlugin: options.scenario === "split-cancel",
			mapUploadMatchCount: uploadMatchCount,
			messageFromAppPluginTranslation: expectedMessage ?? null,
			hostGeometryImplemented: false,
			hostPayloadImplemented: false,
		},
		reportedExceptionCount: 0,
	};
}

async function main(): Promise<void> {
	const options = parseArgs(process.argv.slice(2));
	const bundleSha256Before = sha256(options.bundlePath);
	const fixtureSha256 = sha256(options.fixturePath);
	const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "q7-appplugin-split-"));
	try {
		const replayManifestPath = path.join(temporaryDirectory, "q7-split-device-replay.json");
		prepareReplayManifest(options, replayManifestPath);
		const result = await runProbe(options, temporaryDirectory, replayManifestPath);
		if (sha256(options.bundlePath) !== bundleSha256Before) {
			throw new Error("Das AppPlugin-Bundle wurde während des Split-Beweises verändert");
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
