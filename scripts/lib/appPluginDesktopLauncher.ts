import * as path from "node:path";

import {
	parseAppPluginDesktopProfile,
	type AppPluginDesktopProfile,
} from "./appPluginDesktopProfiles";

interface AppPluginDesktopLauncherSharedOptions {
	hostPath?: string;
	runtimeLibraryDirectory?: string;
}

export interface AppPluginDesktopFixtureLauncherOptions extends AppPluginDesktopLauncherSharedOptions {
	mode: "fixture";
	profile: AppPluginDesktopProfile;
}

export interface AppPluginDesktopSessionLauncherOptions extends AppPluginDesktopLauncherSharedOptions {
	mode: "session";
	sessionDescriptorPath: string;
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
	let profile: AppPluginDesktopProfile | undefined;
	let sessionDescriptorPath: string | undefined;
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
		const value = nextValue(args, index, option);
		index += 1;
		if (option === "--profile") {
			profile = parseAppPluginDesktopProfile(value);
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
	if (profile && sessionDescriptorPath) {
		throw new Error("--profile und --session-descriptor dürfen nicht kombiniert werden");
	}
	if (!sessionDescriptorPath && sessionOnlyOptions.length > 0) {
		throw new Error(`${sessionOnlyOptions.join(", ")} benötigt --session-descriptor`);
	}

	const shared = {
		hostPath: resolveOptionalPath(hostPath, workingDirectory),
		runtimeLibraryDirectory: resolveOptionalPath(runtimeLibraryDirectory, workingDirectory),
	};
	if (sessionDescriptorPath) {
		return {
			mode: "session",
			sessionDescriptorPath: path.resolve(workingDirectory, sessionDescriptorPath),
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
