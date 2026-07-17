import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

type MergeProfile = "l5" | "m5";
type MergeScenario =
	| "merge-selection"
	| "merge-success"
	| "merge-multi-success"
	| "merge-non-adjacent"
	| "merge-single-room"
	| "merge-device-error"
	| "merge-device-timeout"
	| "merge-cancel";

interface SuiteOptions {
	repositoryRoot: string;
	profile: MergeProfile;
	timeoutMs: number;
	scenario?: MergeScenario;
}

interface ProfileConfig {
	bundlePath: string;
	runtimeLabel: string;
	outputPrefix: string;
}

interface ScenarioConfig {
	scenario: MergeScenario;
	fixtureSuffix: string;
}

const SCENARIOS: readonly ScenarioConfig[] = [
	{ scenario: "merge-selection", fixtureSuffix: "selection" },
	{ scenario: "merge-success", fixtureSuffix: "success" },
	{ scenario: "merge-multi-success", fixtureSuffix: "multi-success" },
	{ scenario: "merge-non-adjacent", fixtureSuffix: "non-adjacent" },
	{ scenario: "merge-single-room", fixtureSuffix: "single-room" },
	{ scenario: "merge-device-error", fixtureSuffix: "device-error" },
	{ scenario: "merge-device-timeout", fixtureSuffix: "device-timeout" },
	{ scenario: "merge-cancel", fixtureSuffix: "cancel" },
];

function parseArgs(args: string[]): SuiteOptions {
	const options: SuiteOptions = {
		repositoryRoot: process.cwd(),
		profile: "l5",
		timeoutMs: 60_000,
	};
	for (let index = 0; index < args.length; index += 1) {
		const option = args[index];
		if (option === "--profile") {
			const profile = args[++index];
			if (profile !== "l5" && profile !== "m5") {
				throw new Error(`Unbekanntes Q7-Merge-Profil: ${profile ?? "<fehlt>"}`);
			}
			options.profile = profile;
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
		if (option === "--scenario") {
			const scenario = args[++index] as MergeScenario | undefined;
			if (!scenario || !SCENARIOS.some(candidate => candidate.scenario === scenario)) {
				throw new Error(`Unbekanntes Q7-Merge-Szenario: ${scenario ?? "<fehlt>"}`);
			}
			options.scenario = scenario;
			continue;
		}
		throw new Error(`Unbekannte Q7-Merge-Suite-Option: ${option}`);
	}
	return options;
}

function profileConfig(options: SuiteOptions): ProfileConfig {
	if (options.profile === "m5") {
		return {
			bundlePath: path.join(
				options.repositoryRoot,
				".AppPlugins",
				"Q7 M5",
				"019b4e09d7ce7c6abedbb789d2be681d",
				"index.android.bundle",
			),
			runtimeLabel: "unchanged Q7 M5 Hermes AppPlugin",
			outputPrefix: "q7-m5",
		};
	}
	return {
		bundlePath: path.join(
			options.repositoryRoot,
			".AppPlugins",
			"Q7 L5",
			"019a00a9af4b7b8e894080040a2793a5",
			"index.android.bundle",
		),
		runtimeLabel: "unchanged Q7 L5 Hermes AppPlugin",
		outputPrefix: "q7-l5",
	};
}

async function runScenario(
	options: SuiteOptions,
	profile: ProfileConfig,
	scenario: ScenarioConfig,
): Promise<Record<string, unknown>> {
	const runnerPath = path.join(
		options.repositoryRoot,
		"artifacts",
		"appplugin-poc",
		"prove_q7_appplugin_merge.cjs",
	);
	const fixtureDirectory = path.join(options.repositoryRoot, "test", "fixtures", "appplugin");
	const outputDirectory = path.join(options.repositoryRoot, "artifacts", "appplugin-poc", "runtime-probes");
	const baseName = `${profile.outputPrefix}-room-${scenario.scenario}`;
	const args = [
		runnerPath,
		"--bundle", profile.bundlePath,
		"--runtime-label", profile.runtimeLabel,
		"--scenario", scenario.scenario,
		"--interaction", path.join(fixtureDirectory, `q7-l5-room-merge-${scenario.fixtureSuffix}.json`),
		"--output", path.join(outputDirectory, `${baseName}-proof.json`),
		"--raw-output", path.join(outputDirectory, `${baseName}-raw.json`),
		"--timeout-ms", String(options.timeoutMs),
	];
	const stdout = await new Promise<string>((resolve, reject) => {
		const child = spawn(process.execPath, args, {
			cwd: options.repositoryRoot,
			stdio: ["ignore", "pipe", "pipe"],
			windowsHide: true,
		});
		let output = "";
		let diagnostic = "";
		const timeout = setTimeout(() => {
			child.kill();
			reject(new Error(`${scenario.scenario} überschritt ${options.timeoutMs + 5_000} ms`));
		}, options.timeoutMs + 5_000);
		child.stdout.on("data", (chunk: Buffer) => {
			output = `${output}${chunk.toString("utf8")}`.slice(-256 * 1024);
		});
		child.stderr.on("data", (chunk: Buffer) => {
			diagnostic = `${diagnostic}${chunk.toString("utf8")}`.slice(-64 * 1024);
		});
		child.once("error", error => {
			clearTimeout(timeout);
			reject(error);
		});
		child.once("exit", code => {
			clearTimeout(timeout);
			if (code === 0) resolve(output);
			else reject(new Error(`${scenario.scenario} endete mit ${code}: ${diagnostic}`));
		});
	});
	const proofLine = stdout.trim().split(/\r?\n/u).at(-1);
	if (!proofLine) throw new Error(`${scenario.scenario} lieferte keinen Beweis`);
	const proof = JSON.parse(proofLine) as unknown;
	if (!proof || typeof proof !== "object" || Array.isArray(proof)) {
		throw new Error(`${scenario.scenario} lieferte keinen JSON-Beweis`);
	}
	return proof as Record<string, unknown>;
}

async function main(): Promise<void> {
	const options = parseArgs(process.argv.slice(2));
	const profile = profileConfig(options);
	for (const [label, filePath] of Object.entries({
		bundle: profile.bundlePath,
		runner: path.join(options.repositoryRoot, "artifacts", "appplugin-poc", "prove_q7_appplugin_merge.cjs"),
	})) {
		if (!fs.existsSync(filePath)) throw new Error(`${label}-Datei fehlt: ${filePath}`);
	}
	const selectedScenarios = options.scenario
		? SCENARIOS.filter(scenario => scenario.scenario === options.scenario)
		: SCENARIOS;
	const proofs: Record<string, unknown>[] = [];
	for (const scenario of selectedScenarios) {
		proofs.push(await runScenario(options, profile, scenario));
	}
	process.stdout.write(`${JSON.stringify({
		version: 1,
		status: "passed",
		profile: options.profile,
		runtime: profile.runtimeLabel,
		scenarioCount: proofs.length,
		scenarios: proofs.map(proof => proof.scenario),
		appPluginFirst: proofs.every(proof => proof.appPluginFirst === true),
		captureOnly: proofs.every(proof => proof.captureOnly === true),
	})}\n`);
}

void main().catch(error => {
	process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
	process.exitCode = 1;
});
