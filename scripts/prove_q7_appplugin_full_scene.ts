import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
	buildQ7FullSceneEvidence,
	compareQ7FullScenePng,
	jsonArray,
	jsonRecord,
	sha256File,
} from "./lib/q7FullSceneEvidence";
import {
	Q7_FULL_SCENE_FIRMWARE,
	Q7_FULL_SCENE_MODEL,
	Q7_FULL_SCENE_SERIAL,
} from "./lib/q7FullSceneFixture";

type JsonRecord = Record<string, unknown>;

interface ProofOptions {
	repositoryRoot: string;
	probePath: string;
	hostPath: string;
	bundlePath: string;
	replayManifestPath: string;
	fixturePath: string;
	semanticGoldenPath: string;
	visualGoldenPath: string;
	outputPath: string;
	runtimeLabel: string;
	timeoutMs: number;
	updateGolden: boolean;
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
		replayManifestPath: path.join(fixtureDirectory, "q7-l5-full-scene-replay.json"),
		fixturePath: path.join(fixtureDirectory, "q7-l5-full-scene-synthetic.blob"),
		semanticGoldenPath: path.join(fixtureDirectory, "q7-l5-full-scene-golden.json"),
		visualGoldenPath: path.join(fixtureDirectory, "q7-l5-full-scene-golden.png"),
		outputPath: path.join(runtimeDirectory, "q7-l5-full-scene-proof.json"),
		runtimeLabel: "unchanged Q7 L5 Hermes AppPlugin",
		timeoutMs: 180_000,
		updateGolden: false,
	};
	const pathOptions: Readonly<Record<string, keyof ProofOptions>> = {
		"--probe": "probePath", "--host": "hostPath", "--bundle": "bundlePath",
		"--replay": "replayManifestPath", "--fixture": "fixturePath",
		"--semantic-golden": "semanticGoldenPath", "--visual-golden": "visualGoldenPath", "--output": "outputPath",
	};
	for (let index = 0; index < args.length; index += 1) {
		const option = args[index];
		if (option === "--update-golden") { options.updateGolden = true; continue; }
		if (option === "--runtime-label") {
			const runtimeLabel = args[++index];
			if (!runtimeLabel) throw new Error("--runtime-label benötigt einen Wert");
			options.runtimeLabel = runtimeLabel;
			continue;
		}
		if (option === "--timeout-ms") {
			const timeoutMs = Number(args[++index]);
			if (!Number.isSafeInteger(timeoutMs) || timeoutMs <= 0) throw new Error("--timeout-ms benötigt eine positive Ganzzahl");
			options.timeoutMs = timeoutMs;
			continue;
		}
		const property = pathOptions[option];
		const value = args[++index];
		if (!property || !value) throw new Error(`Unbekannte oder unvollständige Option: ${option}`);
		options[property] = path.resolve(value) as never;
	}
	for (const [name, filePath] of Object.entries({ probe: options.probePath, host: options.hostPath, bundle: options.bundlePath, replay: options.replayManifestPath, fixture: options.fixturePath })) {
		if (!fs.existsSync(filePath)) throw new Error(`${name}-Datei fehlt: ${filePath}`);
	}
	if (!options.updateGolden) {
		for (const [name, filePath] of Object.entries({ semanticGolden: options.semanticGoldenPath, visualGolden: options.visualGoldenPath })) {
			if (!fs.existsSync(filePath)) throw new Error(`${name}-Datei fehlt: ${filePath}`);
		}
	}
	return options;
}

function resolveToolchainBin(repositoryRoot: string): string | undefined {
	if (process.platform !== "win32") return undefined;
	const root = path.join(repositoryRoot, "tools", "hermes-appplugin-host", ".cache", "toolchains", "llvm-mingw");
	if (!fs.existsSync(root)) return undefined;
	return fs.readdirSync(root).map(name => path.join(root, name, "bin")).filter(candidate => fs.existsSync(candidate)).sort().at(-1);
}

function sanitizeDiagnostic(value: string): string {
	return value.replaceAll(Q7_FULL_SCENE_SERIAL, "<synthetic-sn>").split(/\r?\n/u)
		.map(line => line.trim()).filter(line => line.length > 0).slice(-8).join(" | ").slice(0, 3_000);
}

async function runProbe(options: ProofOptions, temporaryDirectory: string): Promise<JsonRecord> {
	const bootstrapPath = path.join(temporaryDirectory, "q7-full-scene-ipc-bridge.js");
	const deviceStoragePath = path.join(temporaryDirectory, "device-data", Q7_FULL_SCENE_MODEL);
	fs.mkdirSync(deviceStoragePath, { recursive: true });
	fs.writeFileSync(path.join(deviceStoragePath, "GuideConfigFilePath"), '{"showGuidePage":true}\n', "utf8");

	const args = [options.probePath,
		"--bundle", options.bundlePath, "--host", options.hostPath, "--bootstrap-output", bootstrapPath,
		"--width", "360", "--height", "800", "--scale", "1", "--device-model", Q7_FULL_SCENE_MODEL,
		"--duid", "q7-full-scene-synthetic-device", "--device-sn", Q7_FULL_SCENE_SERIAL,
		"--firmware-version", Q7_FULL_SCENE_FIRMWARE, "--run-application", "--react-state-probe",
		"--replay-manifest", options.replayManifestPath];
	const toolchainBin = resolveToolchainBin(options.repositoryRoot);
	const output = await new Promise<string>((resolve, reject) => {
		const child = spawn(process.execPath, args, { cwd: options.repositoryRoot,
			env: { ...process.env, PATH: toolchainBin ? `${toolchainBin}${path.delimiter}${process.env.PATH ?? ""}` : process.env.PATH },
			stdio: ["ignore", "pipe", "pipe"], windowsHide: true });
		let stdout = ""; let stderr = ""; let settled = false;
		const finish = (action: () => void): void => { if (settled) return; settled = true; clearTimeout(timeout); action(); };
		const timeout = setTimeout(() => { child.kill(); finish(() => reject(new Error(`Q7-Full-Scene-Probe überschritt ${options.timeoutMs} ms`))); }, options.timeoutMs);
		child.stdout.on("data", (chunk: Buffer) => {
			stdout += chunk.toString("utf8");
			if (Buffer.byteLength(stdout, "utf8") > 128 * 1024 * 1024) { child.kill(); finish(() => reject(new Error("Q7-Full-Scene-Probe überschritt das Ausgabelimit"))); }
		});
		child.stderr.on("data", (chunk: Buffer) => { stderr = `${stderr}${chunk.toString("utf8")}`.slice(-64 * 1024); });
		child.once("error", error => finish(() => reject(error)));
		child.once("close", code => finish(() => code === 0 ? resolve(stdout) : reject(new Error(`Q7-Full-Scene-Probe endete mit Code ${code ?? "null"}: ${sanitizeDiagnostic(stderr)}`))));
	});
	for (const line of output.trim().split(/\r?\n/u).reverse()) {
		try { const result = jsonRecord(JSON.parse(line) as unknown, "Probe-Ergebnis"); if (result.status === "root-mounted") return result; }
		catch { /* Vorherige Statuszeilen gehören nicht zum finalen Beweisobjekt. */ }
	}
	throw new Error("Q7-Full-Scene-Probe lieferte kein root-mounted-Ergebnis");
}

function verifyRuntime(result: JsonRecord, fixtureSha256: string): void {
	assert.equal(result.bundleKind, "hermes-bytecode", "Q7-Bundle muss unveränderter Hermes-Bytecode bleiben");
	const readiness = jsonRecord(result.runtimeReadiness, "runtimeReadiness");
	assert.equal(
		readiness.status,
		"observed-slice-ready",
		"Der konkrete Q7-Lauf muss einen beobachteten interaktiven Ausschnitt ohne offenen aufgerufenen Hostvertrag erreichen",
	);
	assert.equal(readiness.observedSliceReady, true);
	const coverage = jsonRecord(result.nativeModuleImplementationCoverage, "nativeModuleImplementationCoverage");
	assert.ok(
		jsonArray(coverage.implementedModules, "implementedModules").includes("RRDevicesModule"),
		"Die APK-abgeleitete RRDevicesModule-Brücke muss vollständig registriert sein",
	);
	assert.deepEqual(jsonArray(result.reportedExceptions, "reportedExceptions"), []);
	assert.equal(result.b01Ingress, undefined, "Synthetischer Beweis darf keinen B01-/Local-Key-Pfad verwenden");
	const blobIngresses = jsonArray(result.blobIngresses, "blobIngresses").map(value => jsonRecord(value, "Blob-Eingang"));
	assert.equal(blobIngresses.length, 1, "Genau ein direkter Blob-Eingang wird erwartet");
	assert.equal(blobIngresses[0].source, "blob-replay");
	assert.equal(blobIngresses[0].payloadSha256, fixtureSha256);
	assert.deepEqual(blobIngresses[0].emittedEvents, ["RRDeviceBlobPayloadUpdateEvent"]);
	const replay = jsonRecord(result.deviceReplay, "deviceReplay");
	assert.deepEqual(replay.shadowDpsKeys, ["10001"], "Initialer Gerätezustand muss vor dem AppPlugin-Mount verfügbar sein");
	assert.deepEqual(jsonArray(replay.events, "deviceReplay.events").map(value => jsonRecord(value, "Replay-Ereignis").kind), ["dps", "dps"]);
	const publishEvents = jsonArray(replay.publishReplayEvents, "publishReplayEvents")
		.map(value => jsonRecord(value, "Publish-Replay-Ereignis"));
	assert.deepEqual(publishEvents.map(event => [event.source, event.kind]), [["publish-response", "blob"]]);
	const publishMatches = jsonArray(replay.publishResponseMatches, "publishResponseMatches")
		.map(value => jsonRecord(value, "Publish-Response-Match"));
	assert.equal(publishMatches.length, 1);
	assert.equal(publishMatches[0].matchCount, 1, "Die Kartenanfrage darf genau eine Antwort erhalten");
	assert.deepEqual(jsonArray(replay.publishReplayResponseErrors, "publishReplayResponseErrors"), []);
	const pipelineErrors = jsonArray(result.appSysLogs, "appSysLogs").map(value => jsonRecord(value, "AppSys-Log")).filter(log => log.tag === "apk-map-pipeline-error");
	assert.deepEqual(pipelineErrors, [], "AppPlugin-Kartenpipeline meldete einen Fehler");
	const rejections = jsonArray(result.nativeInvocationRejections, "nativeInvocationRejections").map(value => jsonRecord(value, "Native Ablehnung"));
	assert.ok(rejections.length <= 1, "Höchstens der optionale OTA-Leerzustand darf abgelehnt werden");
	for (const rejection of rejections) {
		assert.equal(rejection.moduleName, "RRPluginSDK");
		assert.equal(rejection.methodName, "getFirmwareUpdateState");
		assert.equal(rejection.callType, "promise");
		assert.equal(jsonRecord(rejection.error, "OTA-Leerzustand").message, "data is null");
	}
}

async function main(): Promise<void> {
	const options = parseArgs(process.argv.slice(2));
	const bundleSha256Before = sha256File(options.bundlePath);
	const fixtureSha256 = sha256File(options.fixturePath);
	const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "q7-appplugin-full-scene-"));
	try {
		const result = await runProbe(options, temporaryDirectory);
		if (sha256File(options.bundlePath) !== bundleSha256Before) throw new Error("Das AppPlugin-Bundle wurde während des Full-Scene-Beweises verändert");
		verifyRuntime(result, fixtureSha256);
		const evidence = buildQ7FullSceneEvidence(result, { bundleSha256: bundleSha256Before, fixtureSha256 });
		const mapArtifact = jsonRecord(result.apkInteractiveSurfacePng, "Karten-PNG");
		if (typeof mapArtifact.outputPath !== "string" || !fs.existsSync(mapArtifact.outputPath)) throw new Error("AppPlugin-Karten-PNG wurde nicht erzeugt");
		if (options.updateGolden) {
			fs.mkdirSync(path.dirname(options.semanticGoldenPath), { recursive: true });
			fs.writeFileSync(options.semanticGoldenPath, `${JSON.stringify(evidence, null, 2)}\n`, "utf8");
			fs.copyFileSync(mapArtifact.outputPath, options.visualGoldenPath);
		}
		const expectedEvidence = JSON.parse(fs.readFileSync(options.semanticGoldenPath, "utf8")) as unknown;
		assert.deepStrictEqual(evidence, expectedEvidence, "Semantisches Q7-Full-Scene-Golden weicht ab");
		const visual = await compareQ7FullScenePng(mapArtifact.outputPath, options.visualGoldenPath);
		if (visual.significantPixelRatio > 0.005 || visual.meanChannelDelta > 1) throw new Error(`Visuelles Q7-Golden weicht ab: signifikant=${visual.significantPixelRatio}, mittlere Kanalabweichung=${visual.meanChannelDelta}`);
		const runtimeEvidence = jsonRecord(evidence.runtime, "Evidence-Runtime");
		const sceneEvidence = jsonRecord(evidence.scene, "Evidence-Szene");
		const proof = { version: 1, status: "passed", generatedAt: new Date().toISOString(),
			runtime: options.runtimeLabel, appPluginFirst: true,
			bundle: { kind: "hermes-bytecode", sha256: bundleSha256Before, unchanged: true },
			transport: {
				fixtureSha256,
				directBlobReplay: false,
				requestResponseBlobReplay: true,
				b01FrameUsed: false,
				localKeyUsed: false,
			},
			worker: jsonRecord(runtimeEvidence.worker, "Evidence-Worker"),
			scene: { roomCount: jsonArray(sceneEvidence.roomChains, "Raumketten").length, mapPixelCount: sceneEvidence.mapPixelCount, semanticGoldenSha256: sha256File(options.semanticGoldenPath) },
			runtimeObservation: result.runtimeReadiness,
			hostCoverage: result.nativeModuleImplementationCoverage,
			visual, reportedExceptionCount: 0, pipelineErrorCount: 0, unexpectedNativeRejectionCount: 0 };
		fs.mkdirSync(path.dirname(options.outputPath), { recursive: true });
		fs.writeFileSync(options.outputPath, `${JSON.stringify(proof, null, 2)}\n`, "utf8");
		process.stdout.write(`${JSON.stringify(proof)}\n`);
	} finally { fs.rmSync(temporaryDirectory, { recursive: true, force: true }); }
}

void main().catch(error => { process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`); process.exitCode = 1; });
