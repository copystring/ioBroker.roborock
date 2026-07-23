import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { resolveApkHermesHostArtifact } from "../src/apppluginHost";
import {
	aggregateAppPluginProcessTreeResources,
	captureAppPluginProcessSnapshot,
	startWindowsAppPluginProcessCounterSampler,
	type AppPluginProcessCounterSampler,
	type AppPluginProcessResourceEntry,
} from "../src/lib/appplugin/IoBrokerAppPluginProcessTreeResources";
import {
	Q7_FULL_SCENE_FIRMWARE,
	Q7_FULL_SCENE_MODEL,
	Q7_FULL_SCENE_SERIAL,
} from "./lib/q7FullSceneFixture";

const RESOURCE_PHASE_PREFIX = "APPPLUGIN_RESOURCE_PHASE:";
const MAX_STDOUT_BYTES = 128 * 1024 * 1024;
const MAX_STDERR_BYTES = 64 * 1024;

interface BenchmarkOptions {
	readonly repositoryRoot: string;
	readonly probePath: string;
	readonly bundlePath: string;
	readonly replayManifestPath: string;
	readonly interactionReplayPath: string;
	readonly outputPath: string;
	readonly sampleIntervalMs: number;
	readonly timeoutMs: number;
	readonly runCount: number;
}

interface ResourceSample {
	readonly offsetMs: number;
	readonly phase: string;
	readonly processCount: number;
	readonly residentSetBytes: number;
	readonly cpuDeltaMicroseconds: number;
	readonly processNames: readonly string[];
}

interface PhaseTransition {
	readonly phase: string;
	readonly offsetMs: number;
}

interface NumericRunSummary {
	readonly minimum: number;
	readonly median: number;
	readonly average: number;
	readonly maximum: number;
}

function parsePositiveInteger(value: string | undefined, option: string): number {
	const parsed = Number(value);
	if (!Number.isSafeInteger(parsed) || parsed < 1) {
		throw new Error(`${option} benötigt eine positive ganze Zahl`);
	}
	return parsed;
}

function parseArgs(args: readonly string[]): BenchmarkOptions {
	const repositoryRoot = process.cwd();
	const fixtureRoot = path.join(repositoryRoot, "test", "fixtures", "appplugin");
	const defaults = {
		repositoryRoot,
		probePath: path.join(
			repositoryRoot,
			"artifacts",
			"appplugin-poc",
			"appplugin_hermes_runtime_probe-resource-benchmark.cjs",
		),
		bundlePath: path.join(
			repositoryRoot,
			".AppPlugins",
			"Q7 L5",
			"019a00a9af4b7b8e894080040a2793a5",
			"index.android.bundle",
		),
		replayManifestPath: path.join(fixtureRoot, "q7-l5-full-scene-replay.json"),
		interactionReplayPath: path.join(fixtureRoot, "q7-room-selection-one.json"),
		outputPath: path.join(
			repositoryRoot,
			"artifacts",
			"appplugin-poc",
			"runtime-probes",
			"q7-l5-process-tree-resources.json",
		),
		sampleIntervalMs: 250,
		timeoutMs: 30_000,
		runCount: 3,
	};
	const mutable = { ...defaults };
	const paths: Readonly<Record<string, keyof Pick<
		BenchmarkOptions,
		"probePath" | "bundlePath" | "replayManifestPath" | "interactionReplayPath" | "outputPath"
	>>> = {
		"--probe": "probePath",
		"--bundle": "bundlePath",
		"--replay": "replayManifestPath",
		"--interaction-replay": "interactionReplayPath",
		"--output": "outputPath",
	};
	for (let index = 0; index < args.length; index += 1) {
		const option = args[index];
		if (option === "--sample-ms") {
			mutable.sampleIntervalMs = parsePositiveInteger(args[++index], option);
			continue;
		}
		if (option === "--timeout-ms") {
			mutable.timeoutMs = parsePositiveInteger(args[++index], option);
			continue;
		}
		if (option === "--runs") {
			mutable.runCount = parsePositiveInteger(args[++index], option);
			continue;
		}
		const property = paths[option];
		const value = args[++index];
		if (!property || !value) throw new Error(`Unbekannte oder unvollständige Option: ${option}`);
		mutable[property] = path.resolve(value);
	}
	if (mutable.sampleIntervalMs < 100 || mutable.sampleIntervalMs > 5_000) {
		throw new Error("--sample-ms muss zwischen 100 und 5000 liegen");
	}
	if (mutable.runCount > 5) {
		throw new Error("--runs darf höchstens 5 sein");
	}
	for (const [label, filePath] of Object.entries({
		Probe: mutable.probePath,
		Bundle: mutable.bundlePath,
		Replay: mutable.replayManifestPath,
		InteraktionsReplay: mutable.interactionReplayPath,
	})) {
		if (!fs.statSync(filePath).isFile()) throw new Error(`${label}-Datei fehlt: ${filePath}`);
	}
	return Object.freeze(mutable);
}

function sha256File(filePath: string): string {
	const hash = createHash("sha256");
	hash.update(fs.readFileSync(filePath));
	return hash.digest("hex");
}

function createLineSink(
	maxBytes: number,
	onLine: (line: string) => void,
): Readonly<{ push(chunk: Buffer): void; finish(): void }> {
	let pending = "";
	return Object.freeze({
		push(chunk: Buffer): void {
			pending += chunk.toString("utf8");
			if (Buffer.byteLength(pending, "utf8") > maxBytes) {
				throw new Error(`Benchmark-Prozesszeile überschreitet ${maxBytes} Bytes`);
			}
			for (;;) {
				const newline = pending.indexOf("\n");
				if (newline < 0) break;
				onLine(pending.slice(0, newline).replace(/\r$/u, ""));
				pending = pending.slice(newline + 1);
			}
		},
		finish(): void {
			if (pending.length > 0) onLine(pending.replace(/\r$/u, ""));
			pending = "";
		},
	});
}

function delay(milliseconds: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function processCpuMicroseconds(entry: Readonly<AppPluginProcessResourceEntry>): number {
	return entry.cpuUserMicroseconds + entry.cpuKernelMicroseconds;
}

async function runBenchmark(options: Readonly<BenchmarkOptions>): Promise<Readonly<Record<string, unknown>>> {
	const artifact = resolveApkHermesHostArtifact({
		nativeRootPath: path.join(options.repositoryRoot, "src", "apppluginHost", "native"),
	});
	const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "appplugin-resource-benchmark-"));
	const bootstrapPath = path.join(temporaryDirectory, "ipc-bridge.js");
	const storagePath = path.join(temporaryDirectory, "device-data", Q7_FULL_SCENE_MODEL);
	fs.mkdirSync(storagePath, { recursive: true });
	fs.writeFileSync(path.join(storagePath, "GuideConfigFilePath"), '{"showGuidePage":true}\n', "utf8");
	const collectorErrors: string[] = [];
	let counterSampler: AppPluginProcessCounterSampler | undefined;
	let handleCounterSnapshot = (snapshot: readonly AppPluginProcessResourceEntry[]): void => {
		void snapshot;
	};

	try {
	if (process.platform === "win32") {
		counterSampler = startWindowsAppPluginProcessCounterSampler({
			sampleIntervalMs: options.sampleIntervalMs,
			targetFilePath: path.join(temporaryDirectory, "process-counter-targets.json"),
			onSnapshot: snapshot => handleCounterSnapshot(snapshot),
			onError: error => collectorErrors.push(error.message),
		});
		await counterSampler.ready;
	}
	const startedAt = Date.now();
	let phase = "startup";
	const transitions: PhaseTransition[] = [{ phase, offsetMs: 0 }];
	const samples: ResourceSample[] = [];
	const knownProcessIdentities = new Map<number, Readonly<{
		readonly name: string;
		readonly startedAtEpochMs?: number;
	}>>();
	const lastCpuByPid = new Map<number, number>();
	const processNames = new Set<string>();
	let finalProbeStatus: string | undefined;
	let stderr = "";
	let closed = false;
	let timedOut = false;
	let exitOffsetMs: number | undefined;
	let rootStartedAtEpochMs: number | undefined;
	let counterSnapshotCount = 0;
	let counterRootMissingCount = 0;
	const counterRootNames = new Set<string>();

	const args = [
		options.probePath,
		"--bundle", options.bundlePath,
		"--host", artifact.executablePath,
		"--bootstrap-output", bootstrapPath,
		"--width", "360",
		"--height", "800",
		"--scale", "1",
		"--device-model", Q7_FULL_SCENE_MODEL,
		"--duid", "q7-resource-benchmark-device",
		"--device-sn", Q7_FULL_SCENE_SERIAL,
		"--firmware-version", Q7_FULL_SCENE_FIRMWARE,
		"--run-application",
		"--react-state-probe",
		"--settle-startup-animations",
		"--replay-manifest", options.replayManifestPath,
		"--interaction-replay", options.interactionReplayPath,
		"--resource-phase-markers",
		"--resource-idle-hold-ms", "1500",
	];
	const child = spawn(process.execPath, args, {
		cwd: options.repositoryRoot,
		env: process.env,
		stdio: ["ignore", "pipe", "pipe"],
		windowsHide: true,
		shell: false,
	});
	if (!child.pid) throw new Error("Benchmark-Prozess besitzt keine PID");
	const rootPid = child.pid;
	const expectedRootName = path.basename(process.execPath);

	const stdoutSink = createLineSink(MAX_STDOUT_BYTES, line => {
		try {
			const parsed = JSON.parse(line) as unknown;
			if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
				const status = (parsed as Record<string, unknown>).status;
				if (typeof status === "string") finalProbeStatus = status;
			}
		} catch {
			// Diagnosezeilen vor dem finalen JSON sind für die Ressourcenmessung unerheblich.
		}
	});
	const stderrSink = createLineSink(MAX_STDERR_BYTES, line => {
		if (line.startsWith(RESOURCE_PHASE_PREFIX)) {
			const nextPhase = line.slice(RESOURCE_PHASE_PREFIX.length);
			if (nextPhase.length > 0 && nextPhase !== phase) {
				phase = nextPhase;
				transitions.push({ phase, offsetMs: Date.now() - startedAt });
			}
			return;
		}
		stderr = `${stderr}${line}\n`.slice(-MAX_STDERR_BYTES);
	});
	child.stdout.on("data", (chunk: Buffer) => {
		try {
			stdoutSink.push(chunk);
		} catch (error) {
			stderr = `${stderr}${error instanceof Error ? error.message : String(error)}\n`.slice(-MAX_STDERR_BYTES);
			child.kill();
		}
	});
	child.stderr.on("data", (chunk: Buffer) => {
		try {
			stderrSink.push(chunk);
		} catch (error) {
			stderr = `${stderr}${error instanceof Error ? error.message : String(error)}\n`.slice(-MAX_STDERR_BYTES);
			child.kill();
		}
	});

	const exitPromise = new Promise<{ code: number | null; signal: NodeJS.Signals | null }>((resolve, reject) => {
		child.once("error", reject);
		child.once("close", (code, signal) => {
			closed = true;
			exitOffsetMs = Date.now() - startedAt;
			stdoutSink.finish();
			stderrSink.finish();
			resolve({ code, signal });
		});
	});
	const timeout = setTimeout(() => {
		timedOut = true;
		child.kill();
	}, options.timeoutMs);
	timeout.unref();

	const recordSnapshot = (
		snapshot: readonly AppPluginProcessResourceEntry[],
		samplePhase: string = phase,
	): void => {
		const aggregate = aggregateAppPluginProcessTreeResources(rootPid, snapshot);
		const rootEntry = aggregate.entries.find(entry => entry.pid === rootPid);
		if (!rootEntry || rootEntry.name.toLowerCase() !== expectedRootName.toLowerCase()) return;
		if (
			rootStartedAtEpochMs !== undefined
			&& rootEntry.startedAtEpochMs !== undefined
			&& rootEntry.startedAtEpochMs !== rootStartedAtEpochMs
		) {
			return;
		}
		rootStartedAtEpochMs ??= rootEntry.startedAtEpochMs;
		let cpuDeltaMicroseconds = 0;
		for (const entry of aggregate.entries) {
			knownProcessIdentities.set(entry.pid, {
				name: entry.name,
				startedAtEpochMs: entry.startedAtEpochMs,
			});
			if (entry.name.length > 0) processNames.add(entry.name);
			const currentCpu = processCpuMicroseconds(entry);
			const previousCpu = lastCpuByPid.get(entry.pid);
			cpuDeltaMicroseconds += previousCpu === undefined
				? currentCpu
				: Math.max(0, currentCpu - previousCpu);
			lastCpuByPid.set(entry.pid, currentCpu);
		}
		samples.push(Object.freeze({
			offsetMs: Date.now() - startedAt,
			phase: samplePhase,
			processCount: aggregate.processCount,
			residentSetBytes: aggregate.residentSetBytes,
			cpuDeltaMicroseconds,
			processNames: aggregate.processNames,
		}));
	};
	if (counterSampler) {
		handleCounterSnapshot = snapshot => {
				counterSnapshotCount += 1;
				const rootEntry = snapshot.find(entry => entry.pid === rootPid);
				if (rootEntry) counterRootNames.add(rootEntry.name);
				else counterRootMissingCount += 1;
				recordSnapshot(snapshot);
			};
		counterSampler.updateTargets([{
			pid: rootPid,
			parentPid: 0,
			name: expectedRootName,
			residentSetBytes: 0,
			cpuUserMicroseconds: 0,
			cpuKernelMicroseconds: 0,
		}]);
	}
	const topologyIntervalMs = Math.max(1_000, options.sampleIntervalMs * 4);
	const collectTopology = async (): Promise<void> => {
		try {
			const samplePhase = phase;
			const snapshot = await captureAppPluginProcessSnapshot();
			const aggregate = aggregateAppPluginProcessTreeResources(rootPid, snapshot);
			const rootEntry = aggregate.entries.find(entry => entry.pid === rootPid);
			if (!rootEntry || rootEntry.name.toLowerCase() !== expectedRootName.toLowerCase()) return;
			if (
				rootStartedAtEpochMs !== undefined
				&& rootEntry.startedAtEpochMs !== undefined
				&& rootEntry.startedAtEpochMs !== rootStartedAtEpochMs
			) {
				return;
			}
			rootStartedAtEpochMs ??= rootEntry.startedAtEpochMs;
			if (counterSampler) {
				counterSampler.updateTargets(aggregate.entries);
			} else {
				recordSnapshot(snapshot, samplePhase);
			}
		} catch (error) {
			collectorErrors.push(error instanceof Error ? error.message : String(error));
		}
	};
	const monitor = (async (): Promise<void> => {
		while (!closed) {
			const refreshStartedAt = Date.now();
			await collectTopology();
			if (!closed) {
				const interval = counterSampler ? topologyIntervalMs : options.sampleIntervalMs;
				await delay(Math.max(1, interval - (Date.now() - refreshStartedAt)));
			}
		}
	})();

	let exit: { code: number | null; signal: NodeJS.Signals | null };
	try {
		exit = await exitPromise;
	} finally {
		clearTimeout(timeout);
		await monitor;
		await counterSampler?.stop();
	}
	await delay(Math.min(500, options.sampleIntervalMs));
	const finalSnapshot = await captureAppPluginProcessSnapshot();
	const leakedProcesses = finalSnapshot
		.filter(entry => {
			const identity = knownProcessIdentities.get(entry.pid);
			if (!identity || identity.name !== entry.name) return false;
			return identity.startedAtEpochMs === undefined
				|| entry.startedAtEpochMs === undefined
				|| identity.startedAtEpochMs === entry.startedAtEpochMs;
		})
		.map(entry => ({ pid: entry.pid, name: entry.name }));

	if (timedOut) throw new Error(`AppPlugin-Ressourcenbenchmark überschritt ${options.timeoutMs} ms`);
	if (exit.code !== 0 || exit.signal !== null) {
		throw new Error(
			`AppPlugin-Ressourcenbenchmark endete mit Code ${exit.code ?? "null"} `
			+ `und Signal ${exit.signal ?? "null"}: ${stderr.trim()}`,
		);
	}
	if (finalProbeStatus !== "root-mounted") {
		throw new Error(`AppPlugin-Probe endete mit unerwartetem Status ${finalProbeStatus ?? "ohne Status"}`);
	}
	if (collectorErrors.length > 0) {
		throw new Error(`Ressourcensammlung meldete Fehler: ${collectorErrors.join(" | ")}`);
	}
	if (samples.length === 0 || samples.every(sample => sample.processCount < 2)) {
		throw new Error(
			"Ressourcenbenchmark erfasste den Node-/Hermes-Prozessbaum nicht gemeinsam: "
			+ `${samples.length} gültige Samples, ${counterSnapshotCount} Zähler-Snapshots, `
			+ `${counterRootMissingCount} ohne Root, Root-Namen ${JSON.stringify([...counterRootNames])}, `
			+ `maximal ${Math.max(0, ...samples.map(sample => sample.processCount))} Prozesse`,
		);
	}
	if (leakedProcesses.length > 0) {
		throw new Error(`AppPlugin-Prozesse blieben nach Cleanup aktiv: ${JSON.stringify(leakedProcesses)}`);
	}

	const phaseNames = [...new Set(transitions.map(transition => transition.phase))];
	const phases = phaseNames.map(phaseName => {
		const phaseSamples = samples.filter(sample => sample.phase === phaseName);
		return {
			phase: phaseName,
			sampleCount: phaseSamples.length,
			peakResidentSetBytes: Math.max(0, ...phaseSamples.map(sample => sample.residentSetBytes)),
			cpuMicroseconds: phaseSamples.reduce((sum, sample) => sum + sample.cpuDeltaMicroseconds, 0),
			peakProcessCount: Math.max(0, ...phaseSamples.map(sample => sample.processCount)),
		};
	});
	const cleanupTransition = transitions.find(transition =>
		transition.phase === "cleanup" || transition.phase === "cleanup-after-error"
	);
	const hermesStoppedTransition = transitions.find(transition =>
		transition.phase === "hermes-stopped" || transition.phase === "hermes-stopped-after-error"
	);
	const sampleGaps = samples.slice(1).map((sample, index) =>
		sample.offsetMs - samples[index].offsetMs
	);
	return Object.freeze({
		schemaVersion: 1,
		status: "passed",
		generatedAt: new Date().toISOString(),
		platform: process.platform,
		architecture: process.arch,
		nodeVersion: process.version,
		runtime: "unchanged Q7 L5 Hermes AppPlugin with synthetic full-scene and room-selection replay",
		bundle: {
			kind: "hermes-bytecode",
			sha256: sha256File(options.bundlePath),
			unchanged: true,
		},
		measurement: {
			rootProcess: "node",
			descendantProcessesIncluded: true,
			collectorProcessExcluded: true,
			counterSampler: counterSampler
				? "persistent-targeted-windows-process-counter"
				: "full-process-snapshot",
			topologyRefreshIntervalMs: counterSampler ? topologyIntervalMs : options.sampleIntervalMs,
			sampleIntervalMs: options.sampleIntervalMs,
			sampleCount: samples.length,
			effectiveAverageSampleIntervalMs: sampleGaps.length > 0
				? Math.round(sampleGaps.reduce((sum, gap) => sum + gap, 0) / sampleGaps.length)
				: undefined,
			maximumSampleGapMs: sampleGaps.length > 0 ? Math.max(...sampleGaps) : undefined,
			durationMs: Date.now() - startedAt,
			peakResidentSetBytes: Math.max(...samples.map(sample => sample.residentSetBytes)),
			cpuMicroseconds: samples.reduce((sum, sample) => sum + sample.cpuDeltaMicroseconds, 0),
			peakProcessCount: Math.max(...samples.map(sample => sample.processCount)),
			processNames: [...processNames].sort(),
			hermesCleanupDurationMs: cleanupTransition && hermesStoppedTransition
				? hermesStoppedTransition.offsetMs - cleanupTransition.offsetMs
				: undefined,
			processTreeCleanupDurationMs: cleanupTransition && exitOffsetMs !== undefined
				? exitOffsetMs - cleanupTransition.offsetMs
				: undefined,
			leakedProcessCount: leakedProcesses.length,
		},
		transitions,
		phases,
	});
	} finally {
		await counterSampler?.stop();
		fs.rmSync(temporaryDirectory, { recursive: true, force: true });
	}
}

function numericRunSummary(values: readonly number[]): NumericRunSummary {
	if (values.length === 0) throw new Error("Messwertreihe darf nicht leer sein");
	const sorted = [...values].sort((left, right) => left - right);
	const middle = Math.floor(sorted.length / 2);
	const median = sorted.length % 2 === 0
		? Math.round((sorted[middle - 1] + sorted[middle]) / 2)
		: sorted[middle];
	return Object.freeze({
		minimum: sorted[0],
		median,
		average: Math.round(sorted.reduce((sum, value) => sum + value, 0) / sorted.length),
		maximum: sorted.at(-1)!,
	});
}

function measurementFromReport(report: Readonly<Record<string, unknown>>): Readonly<Record<string, unknown>> {
	const measurement = report.measurement;
	if (measurement === null || typeof measurement !== "object" || Array.isArray(measurement)) {
		throw new Error("Benchmarklauf enthält keine Messung");
	}
	return measurement as Readonly<Record<string, unknown>>;
}

function numericMeasurement(
	measurement: Readonly<Record<string, unknown>>,
	property: string,
): number {
	const value = measurement[property];
	if (typeof value !== "number" || !Number.isFinite(value)) {
		throw new Error(`Benchmarkmessung enthält keinen Zahlenwert ${property}`);
	}
	return value;
}

function aggregateBenchmarkRuns(
	reports: readonly Readonly<Record<string, unknown>>[],
): Readonly<Record<string, unknown>> {
	if (reports.length === 0) throw new Error("Benchmark benötigt mindestens einen Lauf");
	const measurements = reports.map(measurementFromReport);
	const summarize = (property: string): NumericRunSummary =>
		numericRunSummary(measurements.map(measurement => numericMeasurement(measurement, property)));
	const processNames = new Set<string>();
	for (const measurement of measurements) {
		const names = measurement.processNames;
		if (!Array.isArray(names) || names.some(name => typeof name !== "string")) {
			throw new Error("Benchmarkmessung enthält ungültige Prozessnamen");
		}
		for (const name of names as string[]) processNames.add(name);
	}
	const first = reports[0];
	return Object.freeze({
		schemaVersion: 2,
		status: "passed",
		generatedAt: new Date().toISOString(),
		platform: first.platform,
		architecture: first.architecture,
		nodeVersion: first.nodeVersion,
		runtime: first.runtime,
		bundle: first.bundle,
		runCount: reports.length,
		summary: {
			requestedSampleIntervalMs: numericMeasurement(measurements[0], "sampleIntervalMs"),
			sampleCount: summarize("sampleCount"),
			effectiveAverageSampleIntervalMs: summarize("effectiveAverageSampleIntervalMs"),
			maximumSampleGapMs: summarize("maximumSampleGapMs"),
			durationMs: summarize("durationMs"),
			peakResidentSetBytes: summarize("peakResidentSetBytes"),
			cpuMicroseconds: summarize("cpuMicroseconds"),
			peakProcessCount: summarize("peakProcessCount"),
			processTreeCleanupDurationMs: summarize("processTreeCleanupDurationMs"),
			leakedProcessCount: measurements.reduce(
				(sum, measurement) => sum + numericMeasurement(measurement, "leakedProcessCount"),
				0,
			),
			processNames: [...processNames].sort(),
		},
		runs: reports,
	});
}

async function main(): Promise<void> {
	const options = parseArgs(process.argv.slice(2));
	const reports: Readonly<Record<string, unknown>>[] = [];
	for (let run = 0; run < options.runCount; run += 1) {
		reports.push(await runBenchmark(options));
		if (run + 1 < options.runCount) await delay(500);
	}
	const report = aggregateBenchmarkRuns(reports);
	fs.mkdirSync(path.dirname(options.outputPath), { recursive: true });
	fs.writeFileSync(options.outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
	process.stdout.write(`${JSON.stringify(report)}\n`);
}

void main().catch(error => {
	process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
	process.exitCode = 1;
});
