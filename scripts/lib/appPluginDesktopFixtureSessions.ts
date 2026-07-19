import * as path from "node:path";

import type { ApkAppPluginSessionDescriptor } from "../../src/apppluginHost";
import type {
	AppPluginDesktopFixtureProfile,
	AppPluginMapFamily,
} from "./appPluginDesktopProfiles";

export interface AppPluginDesktopFixtureSessionInput {
	profile: AppPluginDesktopFixtureProfile;
	pluginRoot: string;
	model: string;
	deviceName: string;
	deviceId: string;
	deviceSN: string;
	firmwareVersion: string;
	deviceProperties?: Readonly<Record<string, unknown>>;
	mapFamily: AppPluginMapFamily;
	mapProtocol: string;
	label: string;
	replayManifestPath: string;
	b01LocalKeyFilePath?: string;
	serveFullRoot?: boolean;
}

export interface AppPluginDesktopFixtureSession {
	profile: AppPluginDesktopFixtureProfile;
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
				protocolVersion: input.mapProtocol,
				deviceProperties: { ...input.deviceProperties },
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
