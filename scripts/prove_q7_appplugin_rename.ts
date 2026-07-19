import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

type JsonRecord = Record<string, unknown>;
type ProofScenario =
	| "rename-success"
	| "empty-room-name-blocked"
	| "appplugin-max-length-filtered"
	| "predefined-room-name"
	| "rename-device-error"
	| "rename-device-error-retry-success"
	| "rename-device-timeout"
	| "duplicate-room-name-blocked";

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
	scenario: ProofScenario;
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
	const runtimeDirectory = path.join(repositoryRoot, "artifacts", "appplugin-poc", "runtime-probes");
	const fixtureDirectory = path.join(repositoryRoot, "test", "fixtures", "appplugin");
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
		interactionManifestPath: path.join(fixtureDirectory, "q7-l5-room-rename-success.json"),
		sourceReplayManifestPath: path.join(runtimeDirectory, "q7-l5-map-with-prop-response.json"),
		localKeyFilePath: path.join(runtimeDirectory, ".q7-local.key"),
		outputPath: path.join(runtimeDirectory, "q7-l5-room-rename-proof.json"),
		timeoutMs: 180_000,
		scenario: "rename-success",
		runtimeLabel: "unchanged Q7 L5 Hermes AppPlugin"
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
			options.scenario = "empty-room-name-blocked";
			continue;
		}
		if (option === "--scenario") {
			const scenario = args[++index];
			if (scenario !== "rename-success"
				&& scenario !== "empty-room-name-blocked"
				&& scenario !== "appplugin-max-length-filtered"
				&& scenario !== "predefined-room-name"
				&& scenario !== "rename-device-error"
				&& scenario !== "rename-device-error-retry-success"
				&& scenario !== "rename-device-timeout"
				&& scenario !== "duplicate-room-name-blocked") {
				throw new Error(`Unbekanntes Q7-Rename-Szenario: ${scenario ?? "<fehlt>"}`);
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

function mapChangeEvent(result: 3 | 6 | 1000): JsonRecord {
	return {
		kind: "dps",
		dps: {
			"10001": JSON.stringify({
				method: "event.map_change.post",
				params: { result },
			}),
		},
		waitAfterMs: 100,
	};
}

function prepareReplayManifest(sourcePath: string, targetPath: string, scenario: ProofScenario): void {
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
	const publishResponses = manifest.publishResponses as unknown[];
	if (scenario === "rename-device-error-retry-success") {
		publishResponses.push({
			match: {
				dpsKey: "10000",
				payload: { method: "service.rename_room", params: { room_name: "Büro" } },
			},
			events: [mapChangeEvent(6)],
			maximumMatches: 1,
		}, {
			match: {
				dpsKey: "10000",
				payload: { method: "service.rename_room", params: { room_name: "Studio" } },
			},
			events: [mapChangeEvent(3)],
			maximumMatches: 1,
		});
	} else {
		const mapChangeResult = scenario === "rename-device-error"
			? 6
			: scenario === "rename-device-timeout"
				? 1000
				: undefined;
		if (mapChangeResult !== undefined) {
			publishResponses.push({
				match: {
					dpsKey: "10000",
					payload: { method: "service.rename_room" },
				},
				events: [mapChangeEvent(mapChangeResult)],
				maximumMatches: 1,
			});
		}
	}
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
	const joined = relevantLines.slice(-6).join(" | ");
	if (joined.length === 0) return "keine sanitisierten Fehlerzeilen";
	if (joined.length <= 2_000) return joined;
	return `${joined.slice(0, 1_000)} … ${joined.slice(-999)}`;
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
			if (result.status === "root-mounted") return result;
		} catch {
			// Andere Statuszeilen sind für den sanitisierten Beweis nicht relevant.
		}
	}
	throw new Error("Q7-Rename-Probe lieferte kein root-mounted-Ergebnis");
}

function buildSanitizedProof(
	result: JsonRecord,
	interactionManifestPath: string,
	bundleHashBefore: string,
	bundleHashAfter: string,
	scenario: ProofScenario,
	runtimeLabel: string
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
	const manifestEvents = expectedEvents.map(event => record(event, "Interaktionsmanifest-Ereignis"));
	const assertedRawText = manifestEvents.flatMap(event =>
		event.kind === "assert"
			? [event.rawTextIncludes, event.rawTextObservedIncludes].flatMap(values =>
				Array.isArray(values) ? values.filter(value => typeof value === "string") as string[] : [])
			: [],
	);
	const textInputManifestEvents = manifestEvents.filter(event => event.kind === "text-input");
	const requestedInputText = textInputManifestEvents.at(-1)?.text;
	const assertedInputTexts = manifestEvents.flatMap(event => {
		if (event.kind !== "assert" || !Array.isArray(event.activeTextInputTextsInclude)) return [];
		return event.activeTextInputTextsInclude.filter(value => typeof value === "string") as string[];
	});
	const assertedInputText = assertedInputTexts.at(-1);
	const textInputReplayEvents = replayEvents
		.map(event => record(event, "Interaktionsreplay-Ereignis"))
		.filter(event => event.kind === "text-input");
	const textInputDispatch = textInputReplayEvents.length > 0
		? textInputReplayEvents.at(-1)
		: undefined;
	let publishedIntent: JsonRecord | undefined;
	let validation: JsonRecord | undefined;
	if (scenario === "empty-room-name-blocked" || scenario === "duplicate-room-name-blocked") {
		if (renameIntents.length !== 0) {
			throw new Error(`Blockierter Raumname erzeugte unerwartet ${renameIntents.length} Rename-Absichten`);
		}
		if (typeof requestedInputText !== "string" || !textInputDispatch) {
			throw new Error("Blockierungsbeweis benötigt ein TextInput-Ereignis samt Dispatch");
		}
		const duplicateNameVisible = manifestEvents.some(event =>
			event.kind === "assert"
			&& Array.isArray(event.rawTextIncludes)
			&& event.rawTextIncludes.includes(requestedInputText)
		);
		if (scenario === "empty-room-name-blocked" && requestedInputText !== "") {
			throw new Error("Leereingabe-Beweis benötigt eine leere TextInput-Fixture");
		}
		if (scenario === "duplicate-room-name-blocked"
			&& (requestedInputText.length === 0 || !duplicateNameVisible)) {
			throw new Error("Duplikat-Beweis benötigt einen bereits sichtbaren, nichtleeren Raumnamen");
		}
		const activeTextInputs = array(interactionReplay.activeTextInputs, "interactionReplay.activeTextInputs");
		const activeInput =
			activeTextInputs.length === 1 ? record(activeTextInputs[0], "Aktiver TextInput") : undefined;
		if (!activeInput || activeInput.text !== requestedInputText) {
			throw new Error("Das AppPlugin hielt den blockierten Umbenennungsdialog nicht offen");
		}
		validation = {
			inputText: requestedInputText,
			reason: scenario === "empty-room-name-blocked" ? "empty" : "duplicate",
			renameIntentCount: 0,
			activeTextInputCount: 1,
			dialogRemainedOpen: true,
			...(scenario === "duplicate-room-name-blocked" ? { existingNameVisibleInOriginalUi: true } : {}),
		};
	} else {
		const expectedRenameIntentCount = scenario === "rename-device-error-retry-success"
			? 2
			: 1;
		if (renameIntents.length !== expectedRenameIntentCount) {
			throw new Error(`Erwartete ${expectedRenameIntentCount} Rename-Absichten, erhalten: ${renameIntents.length}`);
		}
		const effectiveRenameIntent = renameIntents.at(-1);
		if (!effectiveRenameIntent) throw new Error("Rename-Absicht fehlt");
		const params = record(effectiveRenameIntent.params, "Rename-Parameter");
		const parameterKeys = Object.keys(params).sort();
		const expectedParameterKeys = ["map_id", "room_id", "room_name", "type_id"];
		if (JSON.stringify(parameterKeys) !== JSON.stringify(expectedParameterKeys)) {
			throw new Error(`Unerwartetes Rename-Parameterschema: ${parameterKeys.join(",")}`);
		}
		let expectedRoomName: string;
		if (scenario === "predefined-room-name") {
			if (textInputManifestEvents.length !== 0 || textInputReplayEvents.length !== 0
				|| typeof assertedInputText !== "string" || assertedInputText.length === 0) {
				throw new Error("Vordefinierter Name muss ausschließlich über die originale AppPlugin-UI gewählt werden");
			}
			const localizedOptionVisible = manifestEvents.some(event =>
				event.kind === "assert"
				&& Array.isArray(event.rawTextIncludes)
				&& event.rawTextIncludes.includes(assertedInputText)
			);
			if (!localizedOptionVisible) {
				throw new Error("Vordefinierter Name war nicht als lokalisierte AppPlugin-Option sichtbar");
			}
			expectedRoomName = assertedInputText;
			validation = {
				localizedName: assertedInputText,
				selectedByOriginalAppPluginUi: true,
				hostTextInputEventCount: 0,
				typeIdProvidedByAppPlugin: Object.prototype.hasOwnProperty.call(params, "type_id"),
			};
		} else {
			if (typeof requestedInputText !== "string" || !textInputDispatch) {
				throw new Error("Freitext-Rename-Beweis benötigt ein TextInput-Ereignis samt Dispatch");
			}
			expectedRoomName = requestedInputText;
			if (scenario === "appplugin-max-length-filtered") {
				if (typeof assertedInputText !== "string") {
					throw new Error("AppPlugin-Längenbeweis benötigt einen erwarteten Text nach onChangeText");
				}
				expectedRoomName = assertedInputText;
				if (expectedRoomName === requestedInputText
					|| requestedInputText.slice(0, expectedRoomName.length) !== expectedRoomName) {
					throw new Error("AppPlugin-Längenfixture weist keine Präfix-Kürzung nach");
				}
				if (textInputDispatch.maxLength !== undefined
					|| textInputDispatch.truncated !== false
					|| textInputDispatch.requestedTextLength !== requestedInputText.length
					|| textInputDispatch.textLength !== requestedInputText.length) {
					throw new Error("Der Text wurde entgegen dem Q7-Vertrag bereits im APK-Host gekürzt");
				}
				validation = {
					requestedLength: requestedInputText.length,
					effectiveLength: expectedRoomName.length,
					nativeMaxLengthPresent: false,
					truncatedByNativeHost: false,
					truncatedByAppPlugin: true,
					payloadMatchesFilteredText: params.room_name === expectedRoomName,
				};
			} else if (textInputDispatch.truncated !== false) {
				throw new Error("Normaler Rename-Beweis wurde unerwartet durch maxLength gekürzt");
			}
		}
		if (params.room_name !== expectedRoomName) {
			throw new Error("Das AppPlugin übernahm nicht den erwarteten Raumnamen");
		}
		publishedIntent = {
			method: "service.rename_room",
			parameterKeys,
			roomName: params.room_name,
			typeId: params.type_id,
			mapIdPresent: Object.prototype.hasOwnProperty.call(params, "map_id"),
			roomIdPresent: Object.prototype.hasOwnProperty.call(params, "room_id"),
			typeIdPresent: Object.prototype.hasOwnProperty.call(params, "type_id"),
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
	const expectedMapChangeResult = scenario === "rename-device-error"
		? 6
		: scenario === "rename-device-timeout"
			? 1000
			: undefined;
	let deviceLifecycle: JsonRecord | undefined;
	if (expectedMapChangeResult !== undefined) {
		const renameResponse = responseMatches
			.map(match => record(match, "Publish-Response-Match"))
			.find(match => record(match.payload, "Publish-Response-Payload").method === "service.rename_room");
		if (!renameResponse || renameResponse.matchCount !== 1) {
			throw new Error("Die Rename-Absicht löste nicht genau ein APK-konformes Geräteereignis aus");
		}
		const expectedMessage = expectedMapChangeResult === 6
			? "Benennen fehlgeschlagen"
			: "Zeitüberschreitung bei Vorgang";
		if (!assertedRawText.includes(expectedMessage)) {
			throw new Error(`Der AppPlugin-eigene Ergebnisdialog wurde nicht semantisch geprüft: ${expectedMessage}`);
		}
		const attemptedRoomName = publishedIntent?.roomName;
		const outcomeAssertion = manifestEvents.find(event =>
			event.kind === "assert"
			&& Array.isArray(event.rawTextIncludes)
			&& event.rawTextIncludes.includes(expectedMessage)
		);
		const retainedInputTexts = outcomeAssertion && Array.isArray(outcomeAssertion.activeTextInputTextsInclude)
			? outcomeAssertion.activeTextInputTextsInclude
			: [];
		if (typeof attemptedRoomName !== "string" || !assertedRawText.includes(attemptedRoomName)
			|| outcomeAssertion?.activeTextInputCount !== 1 || !retainedInputTexts.includes(attemptedRoomName)) {
			throw new Error("Der Fehlerlauf belegt nicht den AppPlugin-eigenen optimistischen Kartennamen");
		}
		deviceLifecycle = {
			transportAccepted: true,
			appPluginEvent: "event.map_change.post",
			result: expectedMapChangeResult,
			messageFromAppPluginTranslation: expectedMessage,
			optimisticRoomNameRetainedInUiTree: true,
			renameDialogRemainedOpen: true,
			hostRollbackPerformed: false,
			resultHandledByAppPlugin: true,
		};
	}
	if (scenario === "rename-device-error-retry-success") {
		const retryRoomNames = renameIntents
			.map(intent => record(intent.params, "Retry-Rename-Parameter").room_name)
			.filter((value): value is string => typeof value === "string");
		if (JSON.stringify(retryRoomNames) !== JSON.stringify(["Büro", "Studio"])) {
			throw new Error(`Unerwartete Retry-Reihenfolge: ${retryRoomNames.join(" -> ")}`);
		}
		const renameResponses = responseMatches
			.map(match => record(match, "Publish-Response-Match"))
			.filter(match => record(match.payload, "Publish-Response-Payload").method === "service.rename_room");
		const matchedRetryResponses = renameResponses
			.map(response => ({
				roomName: record(record(response.payload, "Retry-Payload").params, "Retry-Payload-Parameter").room_name,
				matchCount: response.matchCount,
			}));
		const retryResponsesComplete = ["Büro", "Studio"].every(roomName =>
			matchedRetryResponses.some(response => response.roomName === roomName && response.matchCount === 1)
		);
		if (!retryResponsesComplete) {
			throw new Error("Fehler- und Erfolgsantwort wurden nicht eindeutig den beiden Rename-Absichten zugeordnet");
		}
		const failureAssertion = manifestEvents.find(event =>
			event.kind === "assert"
			&& Array.isArray(event.rawTextIncludes)
			&& event.rawTextIncludes.includes("Benennen fehlgeschlagen")
		);
		const successAssertion = manifestEvents.find(event =>
			event.kind === "assert"
			&& [event.rawTextIncludes, event.rawTextObservedIncludes].some(values =>
				Array.isArray(values) && values.includes("Erfolgreich benannt"))
		);
		const failureInputTexts = failureAssertion && Array.isArray(failureAssertion.activeTextInputTextsInclude)
			? failureAssertion.activeTextInputTextsInclude
			: [];
		if (failureAssertion?.activeTextInputCount !== 1 || !failureInputTexts.includes("Büro")
			|| successAssertion?.activeTextInputCount !== 0
			|| !assertedRawText.includes("Benennen fehlgeschlagen") || !assertedRawText.includes("Erfolgreich benannt")) {
			throw new Error("Der Retry-Lauf belegt nicht den AppPlugin-eigenen Übergang von Fehler zu Erfolg");
		}
		if (typeof uploadResponse.matchCount !== "number" || uploadResponse.matchCount < 2) {
			throw new Error("Das AppPlugin forderte nach erfolgreichem Retry keinen erneuten Kartenabruf an");
		}
		deviceLifecycle = {
			transportAccepted: true,
			appPluginEvent: "event.map_change.post",
			results: [6, 3],
			messagesFromAppPluginTranslations: ["Benennen fehlgeschlagen", "Erfolgreich benannt"],
			firstAttemptRoomName: "Büro",
			retryRoomName: "Studio",
			renameDialogRemainedOpenAfterFailure: true,
			hostRollbackPerformed: false,
			mapReloadRequestedByAppPlugin: true,
			mapReloadResponseMatchCount: uploadResponse.matchCount,
			resultHandledByAppPlugin: true,
		};
	}
	return {
		version: 1,
		status: "passed",
		generatedAt: new Date().toISOString(),
		scenario,
		runtime: runtimeLabel,
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
		...(publishedIntent === undefined ? {} : { publishedIntent }),
		...(validation === undefined ? {} : { validation }),
		...(deviceLifecycle === undefined ? {} : { deviceLifecycle }),
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
		prepareReplayManifest(options.sourceReplayManifestPath, replayManifestPath, options.scenario);
		const bundleHashBefore = sha256(options.bundlePath);
		const result = await runProbe(options, replayManifestPath, options.interactionManifestPath, deviceContext);
		const proof = buildSanitizedProof(
			result,
			options.interactionManifestPath,
			bundleHashBefore,
			sha256(options.bundlePath),
			options.scenario,
			options.runtimeLabel
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
