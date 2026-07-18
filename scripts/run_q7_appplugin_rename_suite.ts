import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

type RenameProfile = "l5" | "m5";
type RenameScope = "core" | "failure" | "all";
type RenameScenario =
	| "rename-success"
	| "empty-room-name-blocked"
	| "appplugin-max-length-filtered"
	| "predefined-room-name"
	| "duplicate-room-name-blocked"
	| "rename-device-error"
	| "rename-device-timeout"
	| "rename-device-error-retry-success";

interface SuiteOptions {
	repositoryRoot: string;
	profile: RenameProfile;
	scope: RenameScope;
	timeoutMs: number;
	scenario?: RenameScenario;
}

interface ProfileConfig {
	bundlePath: string;
	runtimeLabel: string;
	outputPrefix: string;
}

interface ScenarioConfig {
	scenario: RenameScenario;
	fixtureSuffix: string;
	scope: Exclude<RenameScope, "all">;
}

const SCENARIOS: readonly ScenarioConfig[] = [
	{ scenario: "rename-success", fixtureSuffix: "success", scope: "core" },
	{ scenario: "empty-room-name-blocked", fixtureSuffix: "empty", scope: "core" },
	{ scenario: "appplugin-max-length-filtered", fixtureSuffix: "max-length", scope: "core" },
	{ scenario: "predefined-room-name", fixtureSuffix: "predefined", scope: "core" },
	{ scenario: "duplicate-room-name-blocked", fixtureSuffix: "duplicate", scope: "core" },
	{ scenario: "rename-device-error", fixtureSuffix: "device-error", scope: "failure" },
	{ scenario: "rename-device-timeout", fixtureSuffix: "device-timeout", scope: "failure" },
	{
		scenario: "rename-device-error-retry-success",
		fixtureSuffix: "device-error-retry-success",
		scope: "failure",
	},
];

function parseArgs(args: string[]): SuiteOptions {
	const options: SuiteOptions = {
		repositoryRoot: process.cwd(),
		profile: "l5",
		scope: "all",
		timeoutMs: 60_000,
	};
	for (let index = 0; index < args.length; index += 1) {
		const option = args[index];
		if (option === "--profile") {
			const profile = args[++index];
			if (profile !== "l5" && profile !== "m5") {
				throw new Error(`Unbekanntes Q7-Rename-Profil: ${profile ?? "<fehlt>"}`);
			}
			options.profile = profile;
			continue;
		}
		if (option === "--scope") {
			const scope = args[++index];
			if (scope !== "core" && scope !== "failure" && scope !== "all") {
				throw new Error(`Unbekannter Q7-Rename-Umfang: ${scope ?? "<fehlt>"}`);
			}
			options.scope = scope;
			continue;
		}
		if (option === "--scenario") {
			const scenario = args[++index] as RenameScenario | undefined;
			if (!scenario || !SCENARIOS.some(candidate => candidate.scenario === scenario)) {
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
		throw new Error(`Unbekannte Q7-Rename-Suite-Option: ${option}`);
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
		"prove_q7_appplugin_rename.cjs",
	);
	const fixtureDirectory = path.join(options.repositoryRoot, "test", "fixtures", "appplugin");
	const outputDirectory = path.join(options.repositoryRoot, "artifacts", "appplugin-poc", "runtime-probes");
	const args = [
		runnerPath,
		"--bundle", profile.bundlePath,
		"--runtime-label", profile.runtimeLabel,
		"--scenario", scenario.scenario,
		"--interaction", path.join(fixtureDirectory, `q7-l5-room-rename-${scenario.fixtureSuffix}.json`),
		"--output", path.join(outputDirectory, `${profile.outputPrefix}-room-rename-${scenario.fixtureSuffix}-proof.json`),
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
	const runnerPath = path.join(
		options.repositoryRoot,
		"artifacts",
		"appplugin-poc",
		"prove_q7_appplugin_rename.cjs",
	);
	for (const [label, filePath] of Object.entries({ bundle: profile.bundlePath, runner: runnerPath })) {
		if (!fs.existsSync(filePath)) throw new Error(`${label}-Datei fehlt: ${filePath}`);
	}
	const selectedScenarios = options.scenario
		? SCENARIOS.filter(scenario => scenario.scenario === options.scenario)
		: SCENARIOS.filter(scenario => options.scope === "all" || scenario.scope === options.scope);
	const proofs: Record<string, unknown>[] = [];
	for (const scenario of selectedScenarios) {
		proofs.push(await runScenario(options, profile, scenario));
	}
	process.stdout.write(`${JSON.stringify({
		version: 1,
		status: "passed",
		profile: options.profile,
		runtime: profile.runtimeLabel,
		scope: options.scope,
		scenarioCount: proofs.length,
		scenarios: proofs.map(proof => proof.scenario),
		captureOnly: proofs.every(proof => proof.captureOnly === true),
		bundleUnchanged: proofs.every(proof =>
			Boolean(proof.bundle)
			&& (proof.bundle as Record<string, unknown>).unchanged === true),
	})}\n`);
}

void main().catch(error => {
	process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
	process.exitCode = 1;
});
