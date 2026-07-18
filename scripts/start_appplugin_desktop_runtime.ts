import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import { build } from "esbuild";

import { parseApkAppPluginSessionDescriptor } from "../src/apppluginHost";
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
import {
	parseAppPluginDesktopLauncherArgs,
	type AppPluginDesktopLauncherOptions,
	type AppPluginDesktopSessionLauncherOptions,
} from "./lib/appPluginDesktopLauncher";
import {
	createAppPluginDesktopFixtureSession,
	writeAppPluginDesktopFixtureDescriptor,
	type AppPluginDesktopFixtureSession,
} from "./lib/appPluginDesktopFixtureSessions";

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

function resolveRuntimeLibraryDirectory(
	repositoryRoot: string,
	options: AppPluginDesktopLauncherOptions,
): string | undefined {
	if (options.runtimeLibraryDirectory) {
		if (!fs.existsSync(options.runtimeLibraryDirectory)
			|| !fs.statSync(options.runtimeLibraryDirectory).isDirectory()) {
			throw new Error(`Hermes-Laufzeitbibliotheksverzeichnis fehlt: ${options.runtimeLibraryDirectory}`);
		}
		return options.runtimeLibraryDirectory;
	}
	return resolveToolchainBin(repositoryRoot);
}

function loadGenericSession(
	options: AppPluginDesktopSessionLauncherOptions,
): Readonly<{
	descriptorPath: string;
	replayManifestPath?: string;
	b01LocalKeyFilePath?: string;
	label: string;
	serveFullRoot: boolean;
}> {
	const descriptorPath = requireFile(options.sessionDescriptorPath, "APK-AppPlugin-Sitzungsdeskriptor");
	const descriptor = parseApkAppPluginSessionDescriptor(
		JSON.parse(fs.readFileSync(descriptorPath, "utf8")) as unknown,
		path.dirname(descriptorPath),
	);
	return {
		descriptorPath,
		replayManifestPath: options.replayManifestPath
			? requireFile(options.replayManifestPath, "Geräte-Replayvertrag")
			: undefined,
		b01LocalKeyFilePath: options.b01LocalKeyFilePath
			? requireFile(options.b01LocalKeyFilePath, "B01-Replay-Schlüssel")
			: undefined,
		label: options.label ?? descriptor.device.name ?? descriptor.device.model,
		serveFullRoot: options.serveFullRoot,
	};
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
): AppPluginDesktopFixtureSession {
	const isQ7Profile = profile === "q7" || profile === "q7-m5";
	if (isQ7Profile) {
		const identity = loadQ7FixtureIdentity(repositoryRoot);
		const pluginRoot = profile === "q7-m5"
			? path.join(
				repositoryRoot,
				".AppPlugins",
				"Q7 M5",
				"019b4e09d7ce7c6abedbb789d2be681d",
			)
			: path.join(
				repositoryRoot,
				".AppPlugins",
				"Q7 L5",
				"019a00a9af4b7b8e894080040a2793a5",
			);
		requireFile(path.join(pluginRoot, "index.android.bundle"), "Q7-AppPlugin");
		return createAppPluginDesktopFixtureSession({
			profile,
			pluginRoot,
			model: "roborock.vacuum.sc01",
			deviceName: "Roborock Q7",
			deviceSN: identity.deviceSn,
			deviceId: identity.duid,
			firmwareVersion: identity.firmwareVersion,
			mapFamily: APPPLUGIN_DESKTOP_PROFILE_DEFINITIONS[profile].mapFamily,
			mapProtocol: APPPLUGIN_DESKTOP_PROFILE_DEFINITIONS[profile].mapProtocol,
			replayManifestPath: createQ7ReplayManifest(repositoryRoot, profile),
			label: profile === "q7-m5"
				? "Q7 M5 / SC01 · echte lokale Kartenaufnahme"
				: "Q7 L5 / SC01 · echte lokale Kartenaufnahme",
		});
	}
	const pluginRoot = path.join(
		repositoryRoot,
		".AppPlugins",
		"Q10 X5+",
		"019bdf41f583723bb937ccc99bbd7541",
	);
	requireFile(path.join(pluginRoot, "index.android.bundle"), "Q10-X5+-AppPlugin");
	return createAppPluginDesktopFixtureSession({
		profile,
		pluginRoot,
		model: Q10_FIXTURE_DEFAULTS.model,
		deviceName: "Roborock Q10",
		deviceSN: Q10_FIXTURE_DEFAULTS.sn,
		deviceId: "q10-local-history-device",
		firmwareVersion: "02.24.90",
		mapFamily: APPPLUGIN_DESKTOP_PROFILE_DEFINITIONS[profile].mapFamily,
		mapProtocol: APPPLUGIN_DESKTOP_PROFILE_DEFINITIONS[profile].mapProtocol,
		replayManifestPath: createQ10ReplayManifest(repositoryRoot),
		b01LocalKeyFilePath: q10LocalKeyFilePath,
		label: "Q10 X5+ / B01 · echte lokale Historienaufnahme (Blob 3)",
		serveFullRoot: true,
	});
}

async function main(): Promise<void> {
	let options = parseAppPluginDesktopLauncherArgs(process.argv.slice(2));
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
		options.hostPath ?? path.join(
			repositoryRoot,
			"tools",
			"hermes-appplugin-host",
			".build-mingw-cmake3",
			"roborock-hermes-appplugin-host.exe",
		),
		"Hermes-AppPlugin-Host",
	);
	const staticRootPath = path.join(repositoryRoot, "www");
	const fixtureMode = options.mode === "fixture";
	const profileSwitchPath = fixtureMode
		? path.join(
			repositoryRoot,
			"artifacts",
			"appplugin-poc",
			"runtime-probes",
			"desktop-profile-switch.json",
		)
		: undefined;
	const sessionStatePath = path.join(
		repositoryRoot,
		"artifacts",
		"appplugin-poc",
		"runtime-probes",
		"desktop-apk-session-state.json",
	);
	if (!fs.existsSync(sessionStatePath)) {
		const legacyProfileStatePath = fixtureMode
			? path.join(
				repositoryRoot,
				"artifacts",
				"appplugin-poc",
				"runtime-probes",
				`desktop-${options.profile}-session-state.json`,
			)
			: "";
		writeAppPluginDesktopSessionState(
			sessionStatePath,
			legacyProfileStatePath
				? readAppPluginDesktopSessionState(legacyProfileStatePath)
				: readAppPluginDesktopSessionState(sessionStatePath),
		);
	}
	if (profileSwitchPath) clearAppPluginDesktopProfileSwitch(profileSwitchPath);
	const runtimeLibraryDirectory = resolveRuntimeLibraryDirectory(repositoryRoot, options);
	const secretDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "roborock-appplugin-"));
	const q10LocalKeyFilePath = path.join(secretDirectory, "b01-local-key");
	const httpSessionTokenFilePath = path.join(secretDirectory, "http-session-token");
	if (fixtureMode) {
		fs.writeFileSync(q10LocalKeyFilePath, Q10_FIXTURE_DEFAULTS.localKey, {
			encoding: "utf8",
			mode: 0o600,
		});
	}
	fs.writeFileSync(httpSessionTokenFilePath, randomBytes(32).toString("base64url"), {
		encoding: "utf8",
		mode: 0o600,
	});
	let consecutiveUnexpectedFailures = 0;
	try {
		for (;;) {
			const profile = options.mode === "fixture" ? options.profile : undefined;
			const bootstrapPath = path.join(
				repositoryRoot,
				"artifacts",
				"appplugin-poc",
				"runtime-probes",
				`desktop-${profile ?? "device-session"}-ipc-bridge.js`,
			);
			const fixtureSession = profile
				? createProfileArguments(repositoryRoot, profile, q10LocalKeyFilePath)
				: undefined;
			const genericSession = options.mode === "session"
				? loadGenericSession(options)
				: undefined;
			const descriptorPath = fixtureSession
				? path.join(
					repositoryRoot,
					"artifacts",
					"appplugin-poc",
					"runtime-probes",
					`desktop-${profile}-device-session.json`,
				)
				: genericSession!.descriptorPath;
			if (fixtureSession) writeAppPluginDesktopFixtureDescriptor(descriptorPath, fixtureSession);
			const replayManifestPath = fixtureSession?.replayManifestPath ?? genericSession?.replayManifestPath;
			const b01LocalKeyFilePath = fixtureSession?.b01LocalKeyFilePath ?? genericSession?.b01LocalKeyFilePath;
			const profileLabel = fixtureSession?.label ?? genericSession!.label;
			const serveFullRoot = fixtureSession?.serveFullRoot ?? genericSession!.serveFullRoot;
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
				"--session-state", sessionStatePath,
				"--session-descriptor", descriptorPath,
				"--profile-label", profileLabel,
				...(fixtureSession && profileSwitchPath
					? [
						"--profile-id", fixtureSession.profile,
						"--fixture-map-family", fixtureSession.mapFamily,
						"--available-profiles", APPPLUGIN_DESKTOP_PROFILES.join(","),
						"--profile-switch-file", profileSwitchPath,
					]
					: []),
				...(replayManifestPath ? ["--replay-manifest", replayManifestPath] : []),
				...(b01LocalKeyFilePath
					? ["--b01-local-key-file", b01LocalKeyFilePath]
					: []),
				...(serveFullRoot ? ["--serve-full-root"] : [])];
			process.stdout.write(
				`Starte ${profileLabel} (${state.language}) als ${fixtureSession ? "lokale Test-Fixture" : "APK-Gerätesitzung"} `
				+ `auf der einzigen Adresse http://127.0.0.1:${APPPLUGIN_DESKTOP_PORT}/\n`,
			);
			const childStartedAt = Date.now();
			const child = spawn(process.execPath, args, {
				cwd: repositoryRoot,
				env: {
					...process.env,
					PATH: runtimeLibraryDirectory
						? `${runtimeLibraryDirectory}${path.delimiter}${process.env.PATH ?? ""}`
						: process.env.PATH,
				},
				stdio: "inherit",
				windowsHide: true,
			});
			const exitCode = await new Promise<number>((resolve, reject) => {
				child.once("error", reject);
				child.once("exit", code => resolve(code ?? 1));
			});
			const nextProfile = profileSwitchPath
				? consumeAppPluginDesktopProfileSwitch(profileSwitchPath)
				: undefined;
			const nextState = readAppPluginDesktopSessionState(sessionStatePath);
			const decision = decideAppPluginDesktopSupervisorAction({
				exitCode,
				nextProfile,
				restartRequested: nextState.restartRequested,
				runDurationMs: Date.now() - childStartedAt,
				consecutiveUnexpectedFailures,
			});
			if (decision.action === "switch") {
				if (options.mode !== "fixture") {
					throw new Error("Generische APK-Gerätesitzung darf kein Fixture-Profil anfordern");
				}
				options = { ...options, profile: decision.profile };
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
