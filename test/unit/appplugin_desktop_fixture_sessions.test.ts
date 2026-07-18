import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
	createAppPluginDesktopFixtureSession,
	writeAppPluginDesktopFixtureDescriptor,
} from "../../scripts/lib/appPluginDesktopFixtureSessions";

const temporaryDirectories: string[] = [];

afterEach(() => {
	for (const directory of temporaryDirectories.splice(0)) {
		fs.rmSync(directory, { recursive: true, force: true });
	}
});

describe("AppPlugin desktop fixture session", () => {
	it("keeps fixture labels outside the device-class-neutral runtime descriptor", () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), "appplugin-fixture-"));
		temporaryDirectories.push(root);
		const replayManifestPath = path.join(root, "replay.json");
		fs.writeFileSync(replayManifestPath, "{}");
		const session = createAppPluginDesktopFixtureSession({
			profile: "q7",
			pluginRoot: root,
			model: "roborock.washer.test",
			deviceName: "Waschmaschinen-Fixture",
			deviceId: "washer-1",
			deviceSN: "sn-1",
			firmwareVersion: "1.0",
			deviceExtra: { featuresNew: "test-feature" },
			mapFamily: "v1",
			mapProtocol: "fixture-only",
			label: "Testaufnahme",
			replayManifestPath,
		});
		expect(session.descriptor.device).toMatchObject({
			model: "roborock.washer.test",
			deviceExtra: { featuresNew: "test-feature" },
		});
		expect(session.descriptor).not.toHaveProperty("mapFamily");
		expect(session.descriptor).not.toHaveProperty("mapProtocol");

		const descriptorPath = path.join(root, "session.json");
		writeAppPluginDesktopFixtureDescriptor(descriptorPath, session);
		expect(JSON.parse(fs.readFileSync(descriptorPath, "utf8"))).toEqual(session.descriptor);
	});
});
