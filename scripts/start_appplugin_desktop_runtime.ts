import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import { build } from "esbuild";

import { Q10_FIXTURE_DEFAULTS } from "../test/unit/q10FixtureDefaults";
import {
	readAppPluginDesktopSessionState,
	writeAppPluginDesktopSessionState,
} from "./lib/appPluginDesktopSessionState";
import {
	APPPLUGIN_DESKTOP_PROFILE_DEFINITIONS,
	APPPLUGIN_DESKTOP_PROFILES,
	clearAppPluginDesktopProfileSwitch,
	consumeAppPluginDesktopProfileSwitch,
	decideAppPluginDesktopSupervisorAction,
	type AppPluginDesktopProfile,
} from "./lib/appPluginDesktopProfiles";

interface LauncherOptions {
	profile: AppPluginDesktopProfile;
}

interface JsonRecord {
	[key: string]: unknown;
}

interface Q7FixtureIdentity {
	deviceSn: string;
	duid: string;
	firmwareVersion: string;
}

const Q7_MAP_ID = 1_766_745_097;
const APPPLUGIN_DESKTOP_PORT = 4_173;
const APPPLUGIN_DESKTOP_DISPLAY = Object.freeze({
	width: 1_080,
	height: 2_400,
	scale: 3,
	densityDpi: 480,
});

function parseArgs(args: readonly string[]): LauncherOptions {
	let profile: AppPluginDesktopProfile = "q7";
	for (let index = 0; index < args.length; index += 1) {
		const option = args[index];
		const value = args[index + 1];
		if (option === "--profile" && (value === "q7" || value === "q7-m5" || value === "q10")) {
			profile = value;
			index += 1;
		} else {
			throw new Error(`Unbekannte oder unvollständige Option: ${option}`);
		}
	}
	return { profile };
}

function requireFile(filePath: string, description: string): string {
	if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
		throw new Error(`${description} fehlt: ${filePath}`);
	}
	return filePath;
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

function loadQ7FixtureIdentity(repositoryRoot: string): Q7FixtureIdentity {
	const profilePath = path.join(repositoryRoot, "artifacts", "appplugin-poc", "runtime-probes", "desktop-q7-local-profile.json");
	const legacyResultPath = path.join(repositoryRoot, "artifacts", "appplugin-poc", "runtime-probes", "q7-full-scene-real-v36-result.json");
	let identity: Partial<Q7FixtureIdentity>;
	if (fs.existsSync(profilePath)) {
		identity = JSON.parse(fs.readFileSync(profilePath, "utf8")) as Partial<Q7FixtureIdentity>;
	} else if (fs.existsSync(legacyResultPath)) {
		const legacyResult = JSON.parse(fs.readFileSync(legacyResultPath, "utf8")) as JsonRecord;
		identity = (legacyResult.runtimeProfile as Partial<Q7FixtureIdentity> | undefined) ?? {};
		fs.writeFileSync(profilePath, `${JSON.stringify(identity, null, 2)}\n`, "utf8");
	} else {
		throw new Error(`Lokale Q7-Fixture-Identität fehlt: ${profilePath}`);
	}
	if (typeof identity.deviceSn !== "string" || identity.deviceSn.length === 0
		|| typeof identity.duid !== "string" || identity.duid.length === 0
		|| typeof identity.firmwareVersion !== "string" || identity.firmwareVersion.length === 0) {
		throw new Error(`Lokale Q7-Fixture-Identität ist unvollständig: ${profilePath}`);
	}
	return identity as Q7FixtureIdentity;
}

function createQ7ReplayManifest(repositoryRoot: string, profile: "q7" | "q7-m5"): string {
	const realMapPath = requireFile(
		path.join(repositoryRoot, "artifacts", "appplugin-poc", "q7-l5-sc01-live-map.blob"),
		"Echte lokale Q7-Kartenaufnahme",
	);
	const templatePath = requireFile(
		path.join(repositoryRoot, "test", "fixtures", "appplugin", "q7-l5-full-scene-replay.json"),
		"Q7-APK-Replayvertrag",
	);
	const manifest = JSON.parse(fs.readFileSync(templatePath, "utf8")) as JsonRecord;
	const rewriteEvent = (event: JsonRecord): void => {
		if (event.kind === "blob") event.blobPath = realMapPath;
		if (event.kind !== "dps" || !event.dps || typeof event.dps !== "object") return;
		const dps = event.dps as JsonRecord;
		const rawPayload = dps["10001"];
		if (typeof rawPayload !== "string") return;
		const payload = JSON.parse(rawPayload) as JsonRecord;
		if (!payload.data || typeof payload.data !== "object") return;
		const data = payload.data as JsonRecord;
		if (payload.method === "prop.get") {
			data.current_map_id = Q7_MAP_ID;
			data.map_num = 1;
			data.multi_floor = 0;
		}
		if (payload.method === "service.upload_by_maptype") data.map_id = Q7_MAP_ID;
		dps["10001"] = JSON.stringify(payload);
	};
	for (const event of (manifest.events as JsonRecord[] | undefined) ?? []) rewriteEvent(event);
	for (const response of (manifest.publishResponses as JsonRecord[] | undefined) ?? []) {
		for (const event of (response.events as JsonRecord[] | undefined) ?? []) rewriteEvent(event);
	}
	const outputPath = path.join(
		repositoryRoot,
		"artifacts",
		"appplugin-poc",
		"runtime-probes",
		`desktop-${profile}-live-replay.json`,
	);
	fs.mkdirSync(path.dirname(outputPath), { recursive: true });
	fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
	return outputPath;
}

function createQ10ReplayManifest(repositoryRoot: string): string {
	const sourcePath = requireFile(
		path.join(repositoryRoot, "artifacts", "appplugin-poc", "runtime-probes", "q10-history-replay.json"),
		"Q10-Historien-Replayvertrag",
	);
	const manifest = JSON.parse(fs.readFileSync(sourcePath, "utf8")) as JsonRecord;
	manifest.deviceContext = { firmwareVersion: "02.24.90" };
	const outputPath = path.join(
		repositoryRoot,
		"artifacts",
		"appplugin-poc",
		"runtime-probes",
		"desktop-q10-history-replay.json",
	);
	fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
	return outputPath;
}

function createProfileArguments(
	repositoryRoot: string,
	profile: AppPluginDesktopProfile,
	q10LocalKeyFilePath: string,
): string[] {
	const isQ7Profile = profile === "q7" || profile === "q7-m5";
	if (isQ7Profile) {
		const identity = loadQ7FixtureIdentity(repositoryRoot);
		return [
			"--bundle", profile === "q7-m5"
				? requireFile(
					path.join(
						repositoryRoot,
						".AppPlugins",
						"Q7 M5",
						"019b4e09d7ce7c6abedbb789d2be681d",
						"index.android.bundle",
					),
					"Q7-M5-AppPlugin",
				)
				: requireFile(
					path.join(
						repositoryRoot,
						".AppPlugins",
						"Q7 L5",
						"019a00a9af4b7b8e894080040a2793a5",
						"index.android.bundle",
					),
					"Q7-L5-AppPlugin",
				),
			"--device-model", "roborock.vacuum.sc01",
			"--device-name", "Roborock Q7",
			"--device-sn", identity.deviceSn,
			"--firmware-version", identity.firmwareVersion,
			"--duid", identity.duid,
			"--replay-manifest", createQ7ReplayManifest(repositoryRoot, profile),
			"--profile-label", profile === "q7-m5"
				? "Q7 M5 / SC01 · echte lokale Kartenaufnahme"
				: "Q7 L5 / SC01 · echte lokale Kartenaufnahme",
		];
	}
	return [
		"--bundle", requireFile(
			path.join(
				repositoryRoot,
				".AppPlugins",
				"Q10 X5+",
				"019bdf41f583723bb937ccc99bbd7541",
				"index.android.bundle",
			),
			"Q10-X5+-AppPlugin",
		),
		"--device-model", Q10_FIXTURE_DEFAULTS.model,
		"--device-name", "Roborock Q10",
		"--device-sn", Q10_FIXTURE_DEFAULTS.sn,
		"--firmware-version", "02.24.90",
		"--duid", "q10-local-history-device",
		"--replay-manifest", createQ10ReplayManifest(repositoryRoot),
		"--b01-local-key-file", q10LocalKeyFilePath,
		"--profile-label", "Q10 X5+ / B01 · echte lokale Historienaufnahme (Blob 3)",
		"--serve-full-root",
	];
}

async function main(): Promise<void> {
	let options = parseArgs(process.argv.slice(2));
	const repositoryRoot = path.resolve(__dirname, "..", "..");
	const runtimeProbePath = path.join(repositoryRoot, "artifacts", "appplugin-poc", "appplugin_hermes_runtime_probe-live.cjs");
	await build({
		entryPoints: [path.join(repositoryRoot, "scripts", "appplugin_hermes_runtime_probe.ts")],
		bundle: true,
		platform: "node",
		format: "cjs",
		packages: "external",
		outfile: runtimeProbePath,
	});

	const hostPath = requireFile(
		path.join(repositoryRoot, "tools", "hermes-appplugin-host", ".build-mingw-cmake3", "roborock-hermes-appplugin-host.exe"),
		"Hermes-AppPlugin-Host",
	);
	const staticRootPath = path.join(repositoryRoot, "www");
	const profileSwitchPath = path.join(
		repositoryRoot,
		"artifacts",
		"appplugin-poc",
		"runtime-probes",
		"desktop-profile-switch.json",
	);
	const sessionStatePath = path.join(
		repositoryRoot,
		"artifacts",
		"appplugin-poc",
		"runtime-probes",
		"desktop-apk-session-state.json",
	);
	if (!fs.existsSync(sessionStatePath)) {
		const legacyProfileStatePath = path.join(
			repositoryRoot,
			"artifacts",
			"appplugin-poc",
			"runtime-probes",
			`desktop-${options.profile}-session-state.json`,
		);
		writeAppPluginDesktopSessionState(
			sessionStatePath,
			readAppPluginDesktopSessionState(legacyProfileStatePath),
		);
	}
	clearAppPluginDesktopProfileSwitch(profileSwitchPath);
	const toolchainBin = resolveToolchainBin(repositoryRoot);
	const secretDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "roborock-appplugin-"));
	const q10LocalKeyFilePath = path.join(secretDirectory, "b01-local-key");
	const httpSessionTokenFilePath = path.join(secretDirectory, "http-session-token");
	fs.writeFileSync(q10LocalKeyFilePath, Q10_FIXTURE_DEFAULTS.localKey, {
		encoding: "utf8",
		mode: 0o600,
	});
	fs.writeFileSync(httpSessionTokenFilePath, randomBytes(32).toString("base64url"), {
		encoding: "utf8",
		mode: 0o600,
	});
	let consecutiveUnexpectedFailures = 0;
	try {
	for (;;) {
		const profile = options.profile;
		const bootstrapPath = path.join(
			repositoryRoot,
			"artifacts",
			"appplugin-poc",
			"runtime-probes",
			`desktop-${profile}-ipc-bridge.js`,
		);
		const profileArguments = createProfileArguments(repositoryRoot, profile, q10LocalKeyFilePath);
		const state = readAppPluginDesktopSessionState(sessionStatePath);
		writeAppPluginDesktopSessionState(sessionStatePath, { ...state, restartRequested: false });
		const args = [runtimeProbePath,
			"--host", hostPath,
			"--bootstrap-output", bootstrapPath,
			"--width", String(APPPLUGIN_DESKTOP_DISPLAY.width),
			"--height", String(APPPLUGIN_DESKTOP_DISPLAY.height),
			"--scale", String(APPPLUGIN_DESKTOP_DISPLAY.scale),
			"--density-dpi", String(APPPLUGIN_DESKTOP_DISPLAY.densityDpi),
			"--language", state.language,
			"--locale", state.localeIdentifier,
			"--system-locale", state.systemLocaleIdentifier,
			"--color-model", state.colorModel,
			"--system-color-scheme", state.systemColorScheme,
			"--card-style", String(state.cardStyle),
			"--allow-rtl", String(state.allowRTL),
			"--force-rtl", String(state.forceRTL),
			"--swap-left-right-in-rtl", String(state.doLeftAndRightSwapInRTL),
			"--font-scale", String(state.fontScale),
			"--run-application", "--react-state-probe",
			"--serve-port", String(APPPLUGIN_DESKTOP_PORT),
			"--static-root", staticRootPath,
			"--http-session-token-file", httpSessionTokenFilePath,
			"--profile-id", profile,
			"--map-family", APPPLUGIN_DESKTOP_PROFILE_DEFINITIONS[profile].mapFamily,
			"--available-profiles", APPPLUGIN_DESKTOP_PROFILES.join(","),
			"--profile-switch-file", profileSwitchPath,
			"--session-state", sessionStatePath,
			...profileArguments];
		process.stdout.write(
			`Starte ${profile.toUpperCase()} (${state.language}) mit echter lokaler Kartenaufnahme `
			+ `auf der einzigen Adresse http://127.0.0.1:${APPPLUGIN_DESKTOP_PORT}/\n`,
		);
		const childStartedAt = Date.now();
		const child = spawn(process.execPath, args, {
			cwd: repositoryRoot,
			env: {
				...process.env,
				PATH: toolchainBin ? `${toolchainBin}${path.delimiter}${process.env.PATH ?? ""}` : process.env.PATH,
			},
			stdio: "inherit",
			windowsHide: true,
		});
		const exitCode = await new Promise<number>((resolve, reject) => {
			child.once("error", reject);
			child.once("exit", code => resolve(code ?? 1));
		});
		const nextProfile = consumeAppPluginDesktopProfileSwitch(profileSwitchPath);
		const nextState = readAppPluginDesktopSessionState(sessionStatePath);
		const decision = decideAppPluginDesktopSupervisorAction({
			exitCode,
			nextProfile,
			restartRequested: nextState.restartRequested,
			runDurationMs: Date.now() - childStartedAt,
			consecutiveUnexpectedFailures,
		});
		if (decision.action === "switch") {
			options = { profile: decision.profile };
			consecutiveUnexpectedFailures = 0;
			continue;
		}
		if (decision.action === "restart") {
			consecutiveUnexpectedFailures = decision.consecutiveUnexpectedFailures;
			if (decision.delayMs > 0) {
				process.stderr.write(
					`AppPlugin-Sitzung endete unerwartet (${exitCode}); `
					+ `Neustart ${consecutiveUnexpectedFailures}/3 nach ${decision.delayMs} ms.\n`,
				);
				await new Promise(resolve => setTimeout(resolve, decision.delayMs));
			}
			continue;
		}
		process.exitCode = decision.exitCode;
		break;
	}
	} finally {
		fs.rmSync(secretDirectory, { force: true, recursive: true });
	}
}

void main().catch(error => {
	process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
	process.exitCode = 1;
});
