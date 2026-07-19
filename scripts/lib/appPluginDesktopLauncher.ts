import * as path from "node:path";

import {
	parseAppPluginDesktopFixtureProfile,
	type AppPluginDesktopFixtureProfile,
} from "./appPluginDesktopProfiles";

interface AppPluginDesktopLauncherSharedOptions {
	hostPath?: string;
	runtimeLibraryDirectory?: string;
}

export interface AppPluginDesktopFixtureLauncherOptions extends AppPluginDesktopLauncherSharedOptions {
	mode: "fixture";
	profile: AppPluginDesktopFixtureProfile;
}

export interface AppPluginDesktopSessionLauncherOptions extends AppPluginDesktopLauncherSharedOptions {
	mode: "session";
	sessionDescriptorPath?: string;
	sessionDescriptorStdin: boolean;
	replayManifestPath?: string;
	b01LocalKeyFilePath?: string;
	label?: string;
	serveFullRoot: boolean;
}

export type AppPluginDesktopLauncherOptions =
	| AppPluginDesktopFixtureLauncherOptions
	| AppPluginDesktopSessionLauncherOptions;

function nextValue(args: readonly string[], index: number, option: string): string {
	const value = args[index + 1];
	if (!value || value.startsWith("--")) {
		throw new Error(`Option ${option} benötigt einen Wert`);
	}
	return value;
}

function resolveOptionalPath(value: string | undefined, workingDirectory: string): string | undefined {
	return value ? path.resolve(workingDirectory, value) : undefined;
}

/**
 * The APK starts a device AppPlugin from a resolved device session. Q7/Q10 are
 * retained only as local replay fixtures and must never become product routing.
 */
export function parseAppPluginDesktopLauncherArgs(
	args: readonly string[],
	workingDirectory = process.cwd(),
): AppPluginDesktopLauncherOptions {
	let profile: AppPluginDesktopFixtureProfile | undefined;
	let sessionDescriptorPath: string | undefined;
	let sessionDescriptorStdin = false;
	let replayManifestPath: string | undefined;
	let b01LocalKeyFilePath: string | undefined;
	let label: string | undefined;
	let serveFullRoot = false;
	let hostPath: string | undefined;
	let runtimeLibraryDirectory: string | undefined;

	for (let index = 0; index < args.length; index += 1) {
		const option = args[index];
		if (option === "--serve-full-root") {
			serveFullRoot = true;
			continue;
		}
		if (option === "--session-descriptor-stdin") {
			if (sessionDescriptorStdin) {
				throw new Error("--session-descriptor-stdin darf nur einmal angegeben werden");
			}
			sessionDescriptorStdin = true;
			continue;
		}
		const value = nextValue(args, index, option);
		index += 1;
		if (option === "--profile") {
			profile = parseAppPluginDesktopFixtureProfile(value);
			if (!profile) throw new Error(`Unbekanntes AppPlugin-Fixture-Profil: ${value}`);
		} else if (option === "--session-descriptor") {
			sessionDescriptorPath = value;
		} else if (option === "--replay-manifest") {
			replayManifestPath = value;
		} else if (option === "--b01-local-key-file") {
			b01LocalKeyFilePath = value;
		} else if (option === "--label") {
			label = value;
		} else if (option === "--host") {
			hostPath = value;
		} else if (option === "--runtime-library-directory") {
			runtimeLibraryDirectory = value;
		} else {
			throw new Error(`Unbekannte Option: ${option}`);
		}
	}

	const sessionOnlyOptions = [
		replayManifestPath ? "--replay-manifest" : undefined,
		b01LocalKeyFilePath ? "--b01-local-key-file" : undefined,
		label ? "--label" : undefined,
		serveFullRoot ? "--serve-full-root" : undefined,
	].filter((option): option is string => option !== undefined);
	if (sessionDescriptorPath && sessionDescriptorStdin) {
		throw new Error(
			"--session-descriptor und --session-descriptor-stdin dürfen nicht kombiniert werden",
		);
	}
	const hasSessionDescriptor = Boolean(sessionDescriptorPath) || sessionDescriptorStdin;
	if (profile && hasSessionDescriptor) {
		throw new Error("--profile und ein Sitzungsdeskriptor dürfen nicht kombiniert werden");
	}
	if (!hasSessionDescriptor && sessionOnlyOptions.length > 0) {
		throw new Error(
			`${sessionOnlyOptions.join(", ")} benötigt --session-descriptor oder --session-descriptor-stdin`,
		);
	}

	const shared = {
		hostPath: resolveOptionalPath(hostPath, workingDirectory),
		runtimeLibraryDirectory: resolveOptionalPath(runtimeLibraryDirectory, workingDirectory),
	};
	if (hasSessionDescriptor) {
		return {
			mode: "session",
			sessionDescriptorPath: sessionDescriptorPath
				? path.resolve(workingDirectory, sessionDescriptorPath)
				: undefined,
			sessionDescriptorStdin,
			replayManifestPath: resolveOptionalPath(replayManifestPath, workingDirectory),
			b01LocalKeyFilePath: resolveOptionalPath(b01LocalKeyFilePath, workingDirectory),
			label,
			serveFullRoot,
			...shared,
		};
	}
	return {
		mode: "fixture",
		profile: profile ?? "q7",
		...shared,
	};
}
