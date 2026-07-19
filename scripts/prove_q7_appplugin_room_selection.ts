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
	type JsonRecord,
} from "./lib/q7FullSceneEvidence";
import {
	buildQ7RoomSelectionMapEvidence,
	finalQ7RoomSelectionDiagnostic,
	q7RoomPathGeometry,
} from "./lib/q7RoomSelectionEvidence";
import {
	Q7_FULL_SCENE_FIRMWARE,
	Q7_FULL_SCENE_MODEL,
	Q7_FULL_SCENE_SERIAL,
} from "./lib/q7FullSceneFixture";

type SelectionScenarioName = "none" | "one" | "deselected" | "multiple" | "boundary" | "mode-cycle";

interface SelectionScenario {
	name: SelectionScenarioName;
	interactionFileName: string;
	expectedRoomIds: readonly number[];
}

interface ProofOptions {
	repositoryRoot: string;
	probePath: string;
	hostPath: string;
	bundlePath: string;
	replayManifestPath: string;
	fixturePath: string;
	fixtureDirectory: string;
	semanticGoldenPath: string;
	visualGoldenDirectory: string;
	visualGoldenPrefix: string;
	outputPath: string;
	rawOutputDirectory: string;
	runtimeLabel: string;
	timeoutMs: number;
	updateGolden: boolean;
}

interface ScenarioResult {
	scenario: SelectionScenario;
	result: JsonRecord;
	semanticEvidence: JsonRecord;
	pngPath: string;
}

const SCENARIOS: readonly SelectionScenario[] = [
	{ name: "none", interactionFileName: "q7-room-selection-none.json", expectedRoomIds: [] },
	{ name: "one", interactionFileName: "q7-room-selection-one.json", expectedRoomIds: [10] },
	{ name: "deselected", interactionFileName: "q7-room-selection-deselected.json", expectedRoomIds: [] },
	{ name: "multiple", interactionFileName: "q7-room-selection-multiple.json", expectedRoomIds: [10, 11] },
	{ name: "boundary", interactionFileName: "q7-room-selection-boundary.json", expectedRoomIds: [11] },
	{ name: "mode-cycle", interactionFileName: "q7-room-selection-mode-cycle.json", expectedRoomIds: [10] },
];

function parseArgs(args: string[]): ProofOptions {
	const repositoryRoot = process.cwd();
	const fixtureDirectory = path.join(repositoryRoot, "test", "fixtures", "appplugin");
	const runtimeDirectory = path.join(repositoryRoot, "artifacts", "appplugin-poc", "runtime-probes");
	const options: ProofOptions = {
		repositoryRoot,
		probePath: path.join(repositoryRoot, "artifacts", "appplugin-poc", "appplugin_hermes_runtime_probe-full-scene.cjs"),
		hostPath: path.join(
			repositoryRoot,
			"tools",
			"hermes-appplugin-host",
			".build-mingw-cmake3",
			"roborock-hermes-appplugin-host.exe",
		),
		bundlePath: path.join(
			repositoryRoot,
			".AppPlugins",
			"Q7 L5",
			"019a00a9af4b7b8e894080040a2793a5",
			"index.android.bundle",
		),
		replayManifestPath: path.join(fixtureDirectory, "q7-l5-full-scene-replay.json"),
		fixturePath: path.join(fixtureDirectory, "q7-l5-full-scene-synthetic.blob"),
		fixtureDirectory,
		semanticGoldenPath: path.join(fixtureDirectory, "q7-l5-room-selection-golden.json"),
		visualGoldenDirectory: fixtureDirectory,
		visualGoldenPrefix: "q7-l5",
		outputPath: path.join(runtimeDirectory, "q7-l5-room-selection-proof.json"),
		rawOutputDirectory: runtimeDirectory,
		runtimeLabel: "unchanged Q7 L5 Hermes AppPlugin",
		timeoutMs: 180_000,
		updateGolden: false,
	};
	const pathOptions: Readonly<Record<string, keyof ProofOptions>> = {
		"--probe": "probePath",
		"--host": "hostPath",
		"--bundle": "bundlePath",
		"--replay": "replayManifestPath",
		"--fixture": "fixturePath",
		"--fixture-directory": "fixtureDirectory",
		"--semantic-golden": "semanticGoldenPath",
		"--visual-golden-directory": "visualGoldenDirectory",
		"--output": "outputPath",
		"--raw-output-directory": "rawOutputDirectory",
	};
	for (let index = 0; index < args.length; index += 1) {
		const option = args[index];
		if (option === "--update-golden") {
			options.updateGolden = true;
			continue;
		}
		if (option === "--runtime-label" || option === "--visual-golden-prefix") {
			const value = args[++index];
			if (!value) throw new Error(`${option} benötigt einen Wert`);
			if (option === "--runtime-label") options.runtimeLabel = value;
			else options.visualGoldenPrefix = value;
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
		replay: options.replayManifestPath,
		fixture: options.fixturePath,
	})) {
		if (!fs.existsSync(filePath)) throw new Error(`${name}-Datei fehlt: ${filePath}`);
	}
	for (const scenario of SCENARIOS) {
		const interactionPath = path.join(options.fixtureDirectory, scenario.interactionFileName);
		if (!fs.existsSync(interactionPath)) throw new Error(`Interaktionsdatei fehlt: ${interactionPath}`);
	}
	return options;
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
		.slice(-20)
		.join(" | ")
		.slice(0, 8_000);
}

async function runProbe(
	options: ProofOptions,
	scenario: SelectionScenario,
	temporaryDirectory: string,
): Promise<JsonRecord> {
	const scenarioDirectory = path.join(temporaryDirectory, scenario.name);
	const bootstrapPath = path.join(scenarioDirectory, "q7-room-selection-ipc-bridge.js");
	const deviceStoragePath = path.join(scenarioDirectory, "device-data", Q7_FULL_SCENE_MODEL);
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
		"--duid", `q7-room-selection-${scenario.name}-synthetic-device`,
		"--device-sn", Q7_FULL_SCENE_SERIAL,
		"--firmware-version", Q7_FULL_SCENE_FIRMWARE,
		"--run-application",
		"--react-state-probe",
		"--replay-manifest", options.replayManifestPath,
		"--interaction-replay", path.join(options.fixtureDirectory, scenario.interactionFileName),
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
			finish(() => reject(new Error(
				`Q7-Raumauswahl-Probe ${scenario.name} überschritt ${options.timeoutMs} ms`,
			)));
		}, options.timeoutMs);
		child.stdout.on("data", (chunk: Buffer) => {
			output += chunk.toString("utf8");
			if (Buffer.byteLength(output, "utf8") > 128 * 1024 * 1024) {
				child.kill();
				finish(() => reject(new Error(`Q7-Raumauswahl-Probe ${scenario.name} überschritt das Ausgabelimit`)));
			}
		});
		child.stderr.on("data", (chunk: Buffer) => {
			diagnostic = `${diagnostic}${chunk.toString("utf8")}`.slice(-64 * 1024);
		});
		child.once("error", error => finish(() => reject(error)));
		child.once("close", code => finish(() => code === 0
			? resolve(output)
			: reject(new Error(
				`Q7-Raumauswahl-Probe ${scenario.name} endete mit Code ${code ?? "null"}: `
				+ sanitizeDiagnostic(diagnostic),
			))));
	});
	for (const line of stdout.trim().split(/\r?\n/u).reverse()) {
		try {
			const result = jsonRecord(JSON.parse(line) as unknown, "Probe-Ergebnis");
			if (result.status === "root-mounted") return result;
		} catch {
			// Frühere Statuszeilen sind kein finales Probe-Ergebnis.
		}
	}
	throw new Error(`Q7-Raumauswahl-Probe ${scenario.name} lieferte kein root-mounted-Ergebnis`);
}

function publishedMethods(result: JsonRecord): string[] {
	return jsonArray(result.publishedDps, "publishedDps").flatMap((entryValue, entryIndex) => {
		const entry = jsonRecord(entryValue, `publishedDps[${entryIndex}]`);
		return Object.values(entry).flatMap(rawPayload => {
			try {
				const payload = jsonRecord(
					typeof rawPayload === "string" ? JSON.parse(rawPayload) as unknown : rawPayload,
					`publishedDps[${entryIndex}]-Payload`,
				);
				return typeof payload.method === "string" ? [payload.method] : [];
			} catch {
				return [];
			}
		});
	});
}

function verifyRuntime(
	result: JsonRecord,
	scenario: SelectionScenario,
	fixtureSha256: string,
	fixtureDirectory: string,
): void {
	assert.equal(result.bundleKind, "hermes-bytecode", "Q7-Bundle muss unveränderter Hermes-Bytecode bleiben");
	assert.deepEqual(jsonArray(result.reportedExceptions, "reportedExceptions"), []);
	assert.equal(result.b01Ingress, undefined, "Raumauswahl-Beweis darf keinen B01-/Local-Key-Pfad verwenden");
	for (const ingressValue of jsonArray(result.blobIngresses, "blobIngresses")) {
		const ingress = jsonRecord(ingressValue, "Blob-Eingang");
		assert.equal(ingress.payloadSha256, fixtureSha256);
		assert.deepEqual(ingress.emittedEvents, ["RRDeviceBlobPayloadUpdateEvent"]);
	}
	const pipelineErrors = jsonArray(result.appSysLogs, "appSysLogs")
		.map(value => jsonRecord(value, "AppSys-Log"))
		.filter(log => log.tag === "apk-map-pipeline-error");
	assert.deepEqual(pipelineErrors, [], "AppPlugin-Kartenpipeline meldete einen Fehler");
	const diagnostic = finalQ7RoomSelectionDiagnostic(result.appSysLogs, 4);
	assert.deepEqual(
		diagnostic.selectedRoomIds,
		scenario.expectedRoomIds,
		`AppPlugin-Auswahlzustand ${scenario.name} enthält falsche Raum-IDs`,
	);
	const interaction = jsonRecord(result.interactionReplay, "interactionReplay");
	assert.deepEqual(jsonArray(interaction.activePointerIds, "activePointerIds"), []);
	const manifest = jsonRecord(
		JSON.parse(fs.readFileSync(
			path.join(fixtureDirectory, scenario.interactionFileName),
			"utf8",
		)) as unknown,
		"Interaktionsmanifest",
	);
	assert.equal(
		jsonArray(interaction.events, "interactionReplay.events").length,
		jsonArray(manifest.events, "Interaktionsmanifest.events").length,
	);
	const methods = publishedMethods(result);
	assert.ok(
		!methods.some(method => /clean|segment|zone|start/iu.test(method)),
		`Reine Auswahl ${scenario.name} darf keinen Reinigungsbefehl senden: ${methods.join(", ")}`,
	);
}

function scenarioSemanticEvidence(
	result: JsonRecord,
	scenario: SelectionScenario,
	bundleSha256: string,
	fixtureSha256: string,
): JsonRecord {
	const fullSceneEvidence = buildQ7FullSceneEvidence(result, { bundleSha256, fixtureSha256 });
	const diagnostic = finalQ7RoomSelectionDiagnostic(result.appSysLogs, 4);
	return {
		selection: {
			roomCount: diagnostic.allRoomsCount,
			selectedRoomCount: diagnostic.selectedRoomCount,
			selectedRoomIds: [...diagnostic.selectedRoomIds],
			ownedByAppPlugin: true,
		},
		map: buildQ7RoomSelectionMapEvidence(fullSceneEvidence),
	};
}

function goldenPngPath(options: ProofOptions, scenario: SelectionScenario): string {
	return path.join(
		options.visualGoldenDirectory,
		`${options.visualGoldenPrefix}-room-selection-${scenario.name}-golden.png`,
	);
}

function assertGeometrySubset(
	subsetValue: unknown,
	supersetValue: unknown,
	message: string,
): void {
	const subsetCounts = new Map<string, number>();
	const supersetCounts = new Map<string, number>();
	for (const geometry of q7RoomPathGeometry(subsetValue)) {
		const key = JSON.stringify(geometry);
		subsetCounts.set(key, (subsetCounts.get(key) ?? 0) + 1);
	}
	for (const geometry of q7RoomPathGeometry(supersetValue)) {
		const key = JSON.stringify(geometry);
		supersetCounts.set(key, (supersetCounts.get(key) ?? 0) + 1);
	}
	for (const [key, count] of subsetCounts) {
		assert.ok((supersetCounts.get(key) ?? 0) >= count, `${message}: ${key}`);
	}
}

async function main(): Promise<void> {
	const options = parseArgs(process.argv.slice(2));
	const bundleSha256Before = sha256File(options.bundlePath);
	const fixtureSha256 = sha256File(options.fixturePath);
	const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "q7-appplugin-room-selection-"));
	try {
		const scenarioResults: ScenarioResult[] = [];
		for (const scenario of SCENARIOS) {
			const result = await runProbe(options, scenario, temporaryDirectory);
			if (sha256File(options.bundlePath) !== bundleSha256Before) {
				throw new Error(`Das AppPlugin-Bundle wurde während ${scenario.name} verändert`);
			}
			verifyRuntime(result, scenario, fixtureSha256, options.fixtureDirectory);
			const mapArtifact = jsonRecord(result.apkInteractiveSurfacePng, `${scenario.name}-Karten-PNG`);
			if (typeof mapArtifact.outputPath !== "string" || !fs.existsSync(mapArtifact.outputPath)) {
				throw new Error(`AppPlugin-Karten-PNG für ${scenario.name} wurde nicht erzeugt`);
			}
			fs.mkdirSync(options.rawOutputDirectory, { recursive: true });
			fs.writeFileSync(
				path.join(options.rawOutputDirectory, `${options.visualGoldenPrefix}-room-selection-${scenario.name}-raw.json`),
				`${JSON.stringify(result)}\n`,
				"utf8",
			);
			scenarioResults.push({
				scenario,
				result,
				semanticEvidence: scenarioSemanticEvidence(
					result,
					scenario,
					bundleSha256Before,
					fixtureSha256,
				),
				pngPath: mapArtifact.outputPath,
			});
		}
		const semanticGolden = {
			version: 1,
			bundleSha256: bundleSha256Before,
			fixtureSha256,
			states: Object.fromEntries(
				scenarioResults.map(({ scenario, semanticEvidence }) => [scenario.name, semanticEvidence]),
			),
		};
		const byName = Object.fromEntries(
			scenarioResults.map(result => [result.scenario.name, result]),
		) as Record<SelectionScenarioName, ScenarioResult>;
		const noneMap = jsonRecord(byName.none.semanticEvidence.map, "none.map");
		const oneMap = jsonRecord(byName.one.semanticEvidence.map, "one.map");
		const deselectedMap = jsonRecord(byName.deselected.semanticEvidence.map, "deselected.map");
		const multipleMap = jsonRecord(byName.multiple.semanticEvidence.map, "multiple.map");
		const boundaryMap = jsonRecord(byName.boundary.semanticEvidence.map, "boundary.map");
		const modeCycleMap = jsonRecord(byName["mode-cycle"].semanticEvidence.map, "mode-cycle.map");
		assertGeometrySubset(
			noneMap,
			oneMap,
			"Einzelauswahl muss die vollständige AppPlugin-Basisgeometrie erhalten",
		);
		assert.deepStrictEqual(q7RoomPathGeometry(noneMap), q7RoomPathGeometry(deselectedMap));
		assertGeometrySubset(
			noneMap,
			multipleMap,
			"Mehrfachauswahl muss die vollständige AppPlugin-Basisgeometrie erhalten",
		);
		assertGeometrySubset(
			noneMap,
			boundaryMap,
			"Grenzpunktauswahl muss die vollständige AppPlugin-Basisgeometrie erhalten",
		);
		assertGeometrySubset(
			noneMap,
			modeCycleMap,
			"Der Moduszyklus muss die vollständige AppPlugin-Basisgeometrie erhalten",
		);
		assertGeometrySubset(
			modeCycleMap,
			oneMap,
			"Der Moduszyklus darf keine Hostgeometrie außerhalb der AppPlugin-Einzelauswahl erfinden",
		);
		assert.notDeepStrictEqual(noneMap.paths, oneMap.paths, "Einzelauswahl muss AppPlugin-Pfadfarben ändern");
		assert.deepStrictEqual(noneMap.paths, deselectedMap.paths, "Abwahl muss AppPlugin-Pfadfarben zurücksetzen");
		assert.notDeepStrictEqual(oneMap.paths, multipleMap.paths, "Mehrfachauswahl muss weitere AppPlugin-Pfadfarben ändern");
		assert.notDeepStrictEqual(
			oneMap.paths,
			boundaryMap.paths,
			"Der AppPlugin-Grenzpunkt muss den benachbarten Raum sichtbar auswählen",
		);
		assert.notDeepStrictEqual(
			noneMap.paths,
			modeCycleMap.paths,
			"Der AppPlugin-Moduszyklus muss die erhaltene Auswahl weiterhin sichtbar darstellen",
		);
		if (options.updateGolden) {
			fs.mkdirSync(path.dirname(options.semanticGoldenPath), { recursive: true });
			fs.writeFileSync(options.semanticGoldenPath, `${JSON.stringify(semanticGolden, null, 2)}\n`, "utf8");
			fs.mkdirSync(options.visualGoldenDirectory, { recursive: true });
			for (const result of scenarioResults) {
				fs.copyFileSync(result.pngPath, goldenPngPath(options, result.scenario));
			}
		}
		const expectedSemantic = JSON.parse(fs.readFileSync(options.semanticGoldenPath, "utf8")) as unknown;
		assert.deepStrictEqual(semanticGolden, expectedSemantic, "Semantisches Raumauswahl-Golden weicht ab");
		const visualGoldens: Record<string, unknown> = {};
		for (const result of scenarioResults) {
			const comparison = await compareQ7FullScenePng(
				result.pngPath,
				goldenPngPath(options, result.scenario),
			);
			if (comparison.significantPixelRatio > 0.005 || comparison.meanChannelDelta > 1) {
				throw new Error(
					`Visuelles Raumauswahl-Golden ${result.scenario.name} weicht ab: `
					+ `signifikant=${comparison.significantPixelRatio}, mittel=${comparison.meanChannelDelta}`,
				);
			}
			visualGoldens[result.scenario.name] = comparison;
		}
		const deselectionComparison = await compareQ7FullScenePng(byName.none.pngPath, byName.deselected.pngPath);
		const oneSelectionComparison = await compareQ7FullScenePng(byName.none.pngPath, byName.one.pngPath);
		const multipleSelectionComparison = await compareQ7FullScenePng(byName.one.pngPath, byName.multiple.pngPath);
		const boundarySelectionComparison = await compareQ7FullScenePng(
			byName.one.pngPath,
			byName.boundary.pngPath,
		);
		const modeCycleComparison = await compareQ7FullScenePng(
			byName.one.pngPath,
			byName["mode-cycle"].pngPath,
		);
		const modeCycleBaseComparison = await compareQ7FullScenePng(
			byName.none.pngPath,
			byName["mode-cycle"].pngPath,
		);
		assert.equal(
			deselectionComparison.significantPixelCount,
			0,
			"Abwahl muss visuell exakt zum unausgewählten AppPlugin-Zustand zurückkehren",
		);
		assert.ok(
			oneSelectionComparison.significantPixelCount > 0,
			"Einzelauswahl muss das AppPlugin-Kartenbild sichtbar verändern",
		);
		assert.ok(
			multipleSelectionComparison.significantPixelCount > 0,
			"Mehrfachauswahl muss das AppPlugin-Kartenbild zusätzlich verändern",
		);
		assert.ok(
			boundarySelectionComparison.significantPixelCount > 0,
			"Der Grenzpunkt muss den AppPlugin-eigenen Nachbarraum sichtbar auswählen",
		);
		assert.ok(
			modeCycleComparison.significantPixelCount > 0,
			"Der Moduszyklus muss sein AppPlugin-eigenes Remount-Overlay reproduzierbar abbilden",
		);
		assert.ok(
			modeCycleBaseComparison.significantPixelCount > 0,
			"Der Moduszyklus darf die sichtbar erhaltene AppPlugin-Auswahl nicht verlieren",
		);
		const proof = {
			version: 1,
			status: "passed",
			generatedAt: new Date().toISOString(),
			runtime: options.runtimeLabel,
			appPluginFirst: true,
			captureOnly: true,
			bundle: { kind: "hermes-bytecode", sha256: bundleSha256Before, unchanged: true },
			transport: {
				fixtureSha256,
				syntheticMap: true,
				b01FrameUsed: false,
				localKeyUsed: false,
				deviceWritePerformed: false,
			},
			selection: {
				stateOrder: SCENARIOS.map(scenario => scenario.name),
				roomIds: SCENARIOS.map(scenario => [...scenario.expectedRoomIds]),
				stateOwnedByAppPlugin: true,
				hitTestingOwnedByAppPlugin: true,
				colorsOwnedByAppPlugin: true,
				hostRoomHitTestingImplemented: false,
				hostRoomColorsImplemented: false,
			},
			visual: {
				goldens: visualGoldens,
				deselectionComparison,
				oneSelectionComparison,
				multipleSelectionComparison,
				boundarySelectionComparison,
				modeCycleComparison,
				modeCycleBaseComparison,
			},
			semanticGoldenSha256: sha256File(options.semanticGoldenPath),
			reportedExceptionCount: 0,
			pipelineErrorCount: 0,
		};
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
