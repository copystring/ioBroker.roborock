import * as fs from "node:fs";
import * as path from "node:path";

import type { ApkAppPluginSessionDescriptor } from "../../src/apppluginHost";
import type {
	AppPluginDesktopProfile,
	AppPluginMapFamily,
} from "./appPluginDesktopProfiles";

export interface AppPluginDesktopFixtureSessionInput {
	profile: AppPluginDesktopProfile;
	pluginRoot: string;
	model: string;
	deviceName: string;
	deviceId: string;
	deviceSN: string;
	firmwareVersion: string;
	deviceExtra?: Readonly<Record<string, unknown>>;
	mapFamily: AppPluginMapFamily;
	mapProtocol: string;
	label: string;
	replayManifestPath: string;
	b01LocalKeyFilePath?: string;
	serveFullRoot?: boolean;
}

export interface AppPluginDesktopFixtureSession {
	profile: AppPluginDesktopProfile;
	descriptor: ApkAppPluginSessionDescriptor;
	mapFamily: AppPluginMapFamily;
	mapProtocol: string;
	label: string;
	replayManifestPath: string;
	b01LocalKeyFilePath?: string;
	serveFullRoot: boolean;
}

/**
 * Adapts captured desktop fixtures to the same device-class-neutral descriptor
 * used by a future ioBroker/HomeData bootstrap. No map or command behavior is
 * selected here; family/protocol remain labels for the captured test data.
 */
export function createAppPluginDesktopFixtureSession(
	input: AppPluginDesktopFixtureSessionInput,
): AppPluginDesktopFixtureSession {
	return {
		profile: input.profile,
		descriptor: {
			version: 1,
			pluginRoot: path.resolve(input.pluginRoot),
			package: {
				models: [input.model],
			},
			device: {
				userId: "",
				ownerId: "",
				deviceId: input.deviceId,
				deviceSN: input.deviceSN,
				model: input.model,
				name: input.deviceName,
				firmwareVersion: input.firmwareVersion,
				deviceExtra: { ...input.deviceExtra },
				activeTime: 0,
				robotTimeZone: 0,
				iotType: 2,
			},
			host: {
				mobileModel: "ioBroker AppPlugin Desktop Fixture Host",
				androidRelease: "APK contract",
				clientId: `desktop-fixture:${input.deviceId}`,
				memoryMiB: 4_096,
				iotOriginDevId: "appplugin-desktop-fixture-origin",
			},
		},
		mapFamily: input.mapFamily,
		mapProtocol: input.mapProtocol,
		label: input.label,
		replayManifestPath: path.resolve(input.replayManifestPath),
		b01LocalKeyFilePath: input.b01LocalKeyFilePath
			? path.resolve(input.b01LocalKeyFilePath)
			: undefined,
		serveFullRoot: input.serveFullRoot === true,
	};
}

export function writeAppPluginDesktopFixtureDescriptor(
	filePath: string,
	session: AppPluginDesktopFixtureSession,
): void {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	const temporaryPath = `${filePath}.${process.pid}.tmp`;
	fs.writeFileSync(temporaryPath, `${JSON.stringify(session.descriptor, null, 2)}\n`, "utf8");
	fs.renameSync(temporaryPath, filePath);
}
