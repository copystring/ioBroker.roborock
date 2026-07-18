import * as path from "node:path";
import { describe, expect, it } from "vitest";

import { parseAppPluginDesktopLauncherArgs } from "../../scripts/lib/appPluginDesktopLauncher";

const workingDirectory = path.resolve("C:/appplugin-tests");

describe("generic AppPlugin desktop launcher", () => {
	it("keeps the no-argument Q7 path as an explicit fixture adapter", () => {
		expect(parseAppPluginDesktopLauncherArgs([], workingDirectory)).toEqual({
			mode: "fixture",
			profile: "q7",
			hostPath: undefined,
			runtimeLibraryDirectory: undefined,
		});
	});

	it("starts an arbitrary APK-style device session without assigning a vacuum profile", () => {
		expect(parseAppPluginDesktopLauncherArgs([
			"--session-descriptor", "sessions/mower.json",
			"--replay-manifest", "replays/mower.json",
			"--label", "RockMow Z1",
			"--serve-full-root",
			"--host", "host/appplugin-host.exe",
			"--runtime-library-directory", "host/bin",
		], workingDirectory)).toEqual({
			mode: "session",
			sessionDescriptorPath: path.join(workingDirectory, "sessions", "mower.json"),
			replayManifestPath: path.join(workingDirectory, "replays", "mower.json"),
			b01LocalKeyFilePath: undefined,
			label: "RockMow Z1",
			serveFullRoot: true,
			hostPath: path.join(workingDirectory, "host", "appplugin-host.exe"),
			runtimeLibraryDirectory: path.join(workingDirectory, "host", "bin"),
		});
	});

	it("rejects fixture routing and fixture replay data on a generic device session boundary", () => {
		expect(() => parseAppPluginDesktopLauncherArgs([
			"--profile", "q10",
			"--session-descriptor", "session.json",
		], workingDirectory)).toThrow("--profile und --session-descriptor");
		expect(() => parseAppPluginDesktopLauncherArgs([
			"--replay-manifest", "replay.json",
		], workingDirectory)).toThrow("benötigt --session-descriptor");
	});
});
