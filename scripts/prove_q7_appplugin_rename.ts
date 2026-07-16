import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

type JsonRecord = Record<string, unknown>;

interface ProofOptions {
	repositoryRoot: string;
	probePath: string;
	hostPath: string;
	bundlePath: string;
	interactionManifestPath: string;
	sourceReplayManifestPath: string;
	localKeyFilePath: string;
	outputPath: string;
	timeoutMs: number;
	expectBlocked: boolean;
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
	const runtimeDirectory = path.join(repositoryRoot, "artifacts", "appplugin-poc", "runtime-probes");
	const options: ProofOptions = {
		repositoryRoot,
		probePath: path.join(repositoryRoot, "artifacts", "appplugin-poc", "appplugin_hermes_runtime_probe-v33.cjs"),
		hostPath: path.join(
			repositoryRoot,
			"tools",
			"hermes-appplugin-host",
			".build-mingw-cmake3",
			"roborock-hermes-appplugin-host.exe"
		),
		bundlePath: path.join(
			repositoryRoot,
			".AppPlugins",
			"Q7 L5",
			"019a00a9af4b7b8e894080040a2793a5",
			"index.android.bundle"
		),
		interactionManifestPath: path.join(runtimeDirectory, "q7-l5-room-rename-interaction.json"),
		sourceReplayManifestPath: path.join(runtimeDirectory, "q7-l5-map-with-prop-response.json"),
		localKeyFilePath: path.join(runtimeDirectory, ".q7-local.key"),
		outputPath: path.join(runtimeDirectory, "q7-l5-room-rename-proof.json"),
		timeoutMs: 180_000,
		expectBlocked: false
	};
	const pathOptions: Readonly<Record<string, keyof ProofOptions>> = {
		"--probe": "probePath",
		"--host": "hostPath",
		"--bundle": "bundlePath",
		"--interaction": "interactionManifestPath",
		"--source-replay": "sourceReplayManifestPath",
		"--key-file": "localKeyFilePath",
		"--output": "outputPath"
	};
	for (let index = 0; index < args.length; index += 1) {
		const option = args[index];
		if (option === "--expect-blocked") {
			options.expectBlocked = true;
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
		if (property === "repositoryRoot" || property === "timeoutMs")
			throw new Error(`Ungültige Pfadoption: ${option}`);
		options[property] = path.resolve(value) as never;
	}
	for (const [name, filePath] of Object.entries({
		probe: options.probePath,
		host: options.hostPath,
		bundle: options.bundlePath,
		interaction: options.interactionManifestPath,
		sourceReplay: options.sourceReplayManifestPath,
		localKey: options.localKeyFilePath
	})) {
		if (!fs.existsSync(filePath)) throw new Error(`${name}-Datei fehlt: ${filePath}`);
	}
	return options;
}

function fixtureValue(source: string, name: "duid" | "sn" | "model"): string {
	const match = source.match(new RegExp(`${name}:\\s*"([^"]+)"`, "u"));
	if (!match) throw new Error(`Lokale B01-Fixture enthält kein ${name}`);
	return match[1];
}

function resolveReplayEventPaths(rawEvent: unknown, sourceDirectory: string): JsonRecord {
	const event = { ...record(rawEvent, "Replay-Ereignis") };
	if (typeof event.framePath === "string") event.framePath = path.resolve(sourceDirectory, event.framePath);
	if (typeof event.blobPath === "string") event.blobPath = path.resolve(sourceDirectory, event.blobPath);
	return event;
}

function prepareReplayManifest(sourcePath: string, targetPath: string): void {
	const sourceDirectory = path.dirname(sourcePath);
	const manifest = record(JSON.parse(fs.readFileSync(sourcePath, "utf8")) as unknown, "Geräte-Replay");
	const events = array(manifest.events, "Geräte-Replay events");
	if (events.length !== 2) throw new Error("Q7-Quellreplay benötigt genau Prop- und Kartenereignis");
	const propEvent = resolveReplayEventPaths(events[0], sourceDirectory);
	const mapEvent = resolveReplayEventPaths(events[1], sourceDirectory);
	if (propEvent.kind !== "dps" || mapEvent.kind !== "b01-frame") {
		throw new Error("Q7-Quellreplay besitzt nicht den erwarteten Prop-/B01-Ablauf");
	}
	const dps = record(propEvent.dps, "Q7-Prop-DPS");
	const propPayload = record(JSON.parse(String(dps["10001"])) as unknown, "Q7-Prop-Payload");
	const propData = record(propPayload.data, "Q7-Prop-Daten");
	const mapId = propData.current_map_id;
	if (typeof mapId !== "number" || !Number.isFinite(mapId)) {
		throw new Error("Q7-Prop-Replay enthält keine aktuelle Karten-ID");
	}
	const uploadNotification = {
		kind: "dps",
		dps: {
			"10001": JSON.stringify({
				method: "service.upload_by_maptype",
				data: { map_id: mapId, map_type: 0 }
			})
		},
		waitAfterMs: 50
	};
	manifest.events = [propEvent, uploadNotification, mapEvent];
	manifest.publishResponses = array(manifest.publishResponses, "Geräte-Replay publishResponses").map(rawResponse => {
		const response = { ...record(rawResponse, "Publish-Response") };
		response.events = array(response.events, "Publish-Response events").map(event =>
			resolveReplayEventPaths(event, sourceDirectory)
		);
		return response;
	});
	fs.writeFileSync(targetPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

function resolveToolchainBin(repositoryRoot: string): string | undefined {
	if (process.platform !== "win32") return undefined;
	const toolchainsRoot = path.join(
		repositoryRoot,
		"tools",
		"hermes-appplugin-host",
		".cache",
		"toolchains",
		"llvm-mingw"
	);
	if (!fs.existsSync(toolchainsRoot)) return undefined;
	return fs
		.readdirSync(toolchainsRoot)
		.map(name => path.join(toolchainsRoot, name, "bin"))
		.filter(candidate => fs.existsSync(candidate))
		.sort()
		.at(-1);
}

function sanitizeDiagnostic(value: string, secrets: readonly string[]): string {
	let sanitized = value;
	for (const secret of secrets.filter(Boolean)) sanitized = sanitized.replaceAll(secret, "<redacted>");
	const relevantLines = sanitized
		.split(/\r?\n/u)
		.map(line => line.trim())
		.filter(line => line.length > 0)
		.filter(line => /error|exception|failed|replay|textinput|interaktion|pointer/iu.test(line));
	return relevantLines.slice(-6).join(" | ").slice(-2_000) || "keine sanitisierten Fehlerzeilen";
}

async function runProbe(
	options: ProofOptions,
	replayManifestPath: string,
	interactionManifestPath: string,
	deviceContext: Readonly<{
		duid: string;
		sn: string;
		model: string;
	}>
): Promise<JsonRecord> {
	const bootstrapPath = path.join(path.dirname(options.outputPath), "q7-rename-proof-ipc-bridge.js");
	const probeArgs = [
		options.probePath,
		"--bundle",
		options.bundlePath,
		"--host",
		options.hostPath,
		"--bootstrap-output",
		bootstrapPath,
		"--device-model",
		deviceContext.model,
		"--duid",
		deviceContext.duid,
		"--device-sn",
		deviceContext.sn,
		"--run-application",
		"--react-state-probe",
		"--replay-manifest",
		replayManifestPath,
		"--interaction-replay",
		interactionManifestPath,
		"--b01-local-key-file",
		options.localKeyFilePath
	];
	const toolchainBin = resolveToolchainBin(options.repositoryRoot);
	const env = {
		...process.env,
		PATH: toolchainBin ? `${toolchainBin}${path.delimiter}${process.env.PATH ?? ""}` : process.env.PATH
	};
	const diagnosticSecrets = [
		deviceContext.duid,
		deviceContext.sn,
		deviceContext.model,
		fs.readFileSync(options.localKeyFilePath, "utf8").trim()
	];
	const stdout = await new Promise<string>((resolve, reject) => {
		const child = spawn(process.execPath, probeArgs, {
			cwd: options.repositoryRoot,
			env,
			stdio: ["ignore", "pipe", "pipe"],
			windowsHide: true
		});
		let output = "";
		let diagnostic = "";
		let settled = false;
		const finish = (callback: () => void): void => {
			if (settled) return;
			settled = true;
			clearTimeout(timeout);
			callback();
		};
		const timeout = setTimeout(() => {
			child.kill();
			finish(() => reject(new Error(`Q7-Rename-Probe überschritt ${options.timeoutMs} ms`)));
		}, options.timeoutMs);
		child.stdout.on("data", (chunk: Buffer) => {
			output += chunk.toString("utf8");
			if (Buffer.byteLength(output, "utf8") > 128 * 1024 * 1024) {
				child.kill();
				finish(() => reject(new Error("Q7-Rename-Probe überschritt das Ausgabelimit")));
			}
		});
		child.stderr.on("data", (chunk: Buffer) => {
			diagnostic = `${diagnostic}${chunk.toString("utf8")}`.slice(-64 * 1024);
		});
		child.once("error", error => finish(() => reject(error)));
		child.once("close", code =>
			finish(() =>
				code === 0
					? resolve(output)
					: reject(
							new Error(
								`Q7-Rename-Probe endete mit Code ${code ?? "null"}: ${sanitizeDiagnostic(diagnostic, diagnosticSecrets)}`
							)
						)
			)
		);
	});
	const lines = stdout.trim().split(/\r?\n/u);
	for (let index = lines.length - 1; index >= 0; index -= 1) {
		try {
			const result = record(JSON.parse(lines[index]) as unknown, "Probe-Ergebnis");
			if (result.status === "render-started") return result;
		} catch {
			// Andere Statuszeilen sind für den sanitisierten Beweis nicht relevant.
		}
	}
	throw new Error("Q7-Rename-Probe lieferte kein render-started-Ergebnis");
}

function buildSanitizedProof(
	result: JsonRecord,
	interactionManifestPath: string,
	bundleHashBefore: string,
	bundleHashAfter: string,
	expectBlocked: boolean
): JsonRecord {
	if (bundleHashBefore !== bundleHashAfter)
		throw new Error("Das AppPlugin-Bundle wurde während des Beweislaufs verändert");
	const reportedExceptions = array(result.reportedExceptions, "reportedExceptions");
	if (reportedExceptions.length !== 0)
		throw new Error(`AppPlugin meldete ${reportedExceptions.length} Runtime-Ausnahmen`);
	const nativeInvocationRejections = array(result.nativeInvocationRejections, "nativeInvocationRejections").map(
		rejectionValue => record(rejectionValue, "Native-Ablehnung")
	);
	const nativeContractFailures = nativeInvocationRejections.filter(rejection => rejection.callType !== "promise");
	if (nativeContractFailures.length !== 0) {
		const failures = nativeContractFailures.map(failure => {
			const error = record(failure.error, "Native-Fehlerdetails");
			return `${String(failure.moduleName)}.${String(failure.methodName)}: ${String(error.message)}`;
		});
		throw new Error(`Native APK-Vertragsaufrufe fehlgeschlagen: ${failures.join(" | ")}`);
	}
	const nativePromiseRejections = nativeInvocationRejections.filter(rejection => rejection.callType === "promise");
	const expectedPromiseRejections = nativePromiseRejections.filter(rejection => {
		const error = record(rejection.error, "Native-Promise-Ablehnung");
		return (
			rejection.bridge === "turbo" &&
			rejection.moduleName === "RRPluginSDK" &&
			rejection.methodName === "getFirmwareUpdateState" &&
			error.message === "data is null"
		);
	});
	if (expectedPromiseRejections.length !== 1 || nativePromiseRejections.length !== 1) {
		throw new Error(
			`Unerwartete native Promise-Ablehnungen: erwartet 1 OTA-Leerzustand, erhalten ${nativePromiseRejections.length}`
		);
	}
	const interactionReplay = record(result.interactionReplay, "interactionReplay");
	const replayEvents = array(interactionReplay.events, "interactionReplay.events");
	const expectedEvents = array(
		record(JSON.parse(fs.readFileSync(interactionManifestPath, "utf8")) as unknown, "Interaktionsmanifest").events,
		"Interaktionsmanifest events"
	);
	if (replayEvents.length !== expectedEvents.length) {
		throw new Error(`Interaktionsreplay unvollständig: ${replayEvents.length}/${expectedEvents.length}`);
	}
	if (array(interactionReplay.activePointerIds, "activePointerIds").length !== 0) {
		throw new Error("Interaktionsreplay hinterließ aktive Pointer");
	}
	const publishedDps = array(result.publishedDps, "publishedDps");
	const renameIntents = publishedDps.flatMap(entryValue => {
		const entry = record(entryValue, "publishDps-Eintrag");
		const rawPayload = entry["10000"];
		if (rawPayload === undefined) return [];
		const payload = record(typeof rawPayload === "string" ? JSON.parse(rawPayload) : rawPayload, "DPS 10000");
		return payload.method === "service.rename_room" ? [payload] : [];
	});
	let publishedIntent: JsonRecord | undefined;
	let validation: JsonRecord | undefined;
	if (expectBlocked) {
		if (renameIntents.length !== 0) {
			throw new Error(`Leerer Raumname erzeugte unerwartet ${renameIntents.length} Rename-Absichten`);
		}
		const textInputEvents = expectedEvents
			.map(event => record(event, "Interaktionsmanifest-Ereignis"))
			.filter(event => event.kind === "text-input");
		const expectedInputText = textInputEvents.at(-1)?.text;
		if (expectedInputText !== "") throw new Error("Blockierungsbeweis benötigt eine leere TextInput-Fixture");
		const activeTextInputs = array(interactionReplay.activeTextInputs, "interactionReplay.activeTextInputs");
		const activeInput =
			activeTextInputs.length === 1 ? record(activeTextInputs[0], "Aktiver TextInput") : undefined;
		if (!activeInput || activeInput.text !== expectedInputText) {
			throw new Error("Das AppPlugin hielt den leeren Umbenennungsdialog nicht offen");
		}
		validation = {
			inputText: expectedInputText,
			renameIntentCount: 0,
			activeTextInputCount: 1,
			dialogRemainedOpen: true
		};
	} else {
		if (renameIntents.length !== 1) {
			throw new Error(`Erwartete genau eine Rename-Absicht, erhalten: ${renameIntents.length}`);
		}
		const params = record(renameIntents[0].params, "Rename-Parameter");
		const parameterKeys = Object.keys(params).sort();
		const expectedParameterKeys = ["map_id", "room_id", "room_name", "type_id"];
		if (JSON.stringify(parameterKeys) !== JSON.stringify(expectedParameterKeys)) {
			throw new Error(`Unerwartetes Rename-Parameterschema: ${parameterKeys.join(",")}`);
		}
		if (params.room_name !== "Büro") throw new Error("Das AppPlugin übernahm den Test-Raumnamen nicht");
		publishedIntent = {
			method: "service.rename_room",
			parameterKeys,
			roomName: params.room_name,
			mapIdPresent: Object.prototype.hasOwnProperty.call(params, "map_id"),
			roomIdPresent: Object.prototype.hasOwnProperty.call(params, "room_id"),
			typeIdPresent: Object.prototype.hasOwnProperty.call(params, "type_id")
		};
	}
	const deviceReplay = record(result.deviceReplay, "deviceReplay");
	const responseErrors = array(deviceReplay.publishReplayResponseErrors, "publishReplayResponseErrors");
	if (responseErrors.length !== 0) throw new Error("Geräteantwort-Replay meldete Fehler");
	const responseMatches = array(deviceReplay.publishResponseMatches, "publishResponseMatches");
	const uploadResponse = responseMatches
		.map(match => record(match, "Publish-Response-Match"))
		.find(match => record(match.payload, "Publish-Response-Payload").method === "service.upload_by_maptype");
	if (!uploadResponse || typeof uploadResponse.matchCount !== "number" || uploadResponse.matchCount < 1) {
		throw new Error("Der originale Karten-Reload nach dem Edit-Einstieg wurde nicht beantwortet");
	}
	return {
		version: 1,
		status: "passed",
		generatedAt: new Date().toISOString(),
		scenario: expectBlocked ? "empty-room-name-blocked" : "rename-success",
		runtime: "unchanged Q7 L5 Hermes AppPlugin",
		captureOnly: true,
		bundle: {
			kind: result.bundleKind,
			sha256: bundleHashBefore,
			unchanged: true
		},
		interaction: {
			manifestSha256: sha256(interactionManifestPath),
			viewport: interactionReplay.viewport,
			eventCount: replayEvents.length,
			pointerEventCount: replayEvents.filter(event => {
				const kind = record(event, "Replay-Ereignis").kind;
				return kind !== "text-input" && kind !== "assert";
			}).length,
			textInputEventCount: replayEvents.filter(event => record(event, "Replay-Ereignis").kind === "text-input")
				.length,
			assertionCount: replayEvents.filter(event => record(event, "Replay-Ereignis").kind === "assert").length,
			activePointerCount: 0
		},
		...(expectBlocked ? { validation } : { publishedIntent }),
		publishResponseMatchCount: uploadResponse.matchCount,
		reportedExceptionCount: 0,
		nativeContractFailureCount: 0,
		nativePromiseRejectionCount: nativePromiseRejections.length,
		unexpectedNativePromiseRejectionCount: 0
	};
}

async function main(): Promise<void> {
	const options = parseArgs(process.argv.slice(2));
	const fixtureSource = fs.readFileSync(
		path.join(options.repositoryRoot, "test", "unit", "b01_map_specification.test.ts"),
		"utf8"
	);
	const deviceContext = {
		duid: fixtureValue(fixtureSource, "duid"),
		sn: fixtureValue(fixtureSource, "sn"),
		model: fixtureValue(fixtureSource, "model")
	};
	const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "q7-appplugin-rename-proof-"));
	try {
		const replayManifestPath = path.join(temporaryDirectory, "device-replay.json");
		prepareReplayManifest(options.sourceReplayManifestPath, replayManifestPath);
		const bundleHashBefore = sha256(options.bundlePath);
		const result = await runProbe(options, replayManifestPath, options.interactionManifestPath, deviceContext);
		const proof = buildSanitizedProof(
			result,
			options.interactionManifestPath,
			bundleHashBefore,
			sha256(options.bundlePath),
			options.expectBlocked
		);
		fs.mkdirSync(path.dirname(options.outputPath), { recursive: true });
		fs.writeFileSync(options.outputPath, `${JSON.stringify(proof, null, 2)}\n`, "utf8");
		process.stdout.write(`${JSON.stringify(proof)}\n`);
	} finally {
		fs.rmSync(temporaryDirectory, { recursive: true, force: true });
	}
}

void main().catch(error => {
	process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
	process.exitCode = 1;
});
