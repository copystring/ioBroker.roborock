import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import * as path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
	type ApkAppPluginSessionDescriptor,
} from "../../src/apppluginHost";
import {
	runAppPluginProductHostProof,
	type AppPluginProductHostReplayEvent,
} from "../../scripts/lib/appPluginProductHostProof";
import {
	buildQ7FullSceneFixture,
	Q7_FULL_SCENE_FIRMWARE,
	Q7_FULL_SCENE_MODEL,
	Q7_FULL_SCENE_SERIAL,
} from "../../scripts/lib/q7FullSceneFixture";

const repositoryRoot = path.resolve(__dirname, "..", "..");
const pluginRoot = path.join(
	repositoryRoot,
	".AppPlugins",
	"Q7 L5",
	"019a00a9af4b7b8e894080040a2793a5",
);
const bundlePath = path.join(pluginRoot, "index.android.bundle");
const q7It = existsSync(bundlePath) ? it : it.skip;
const temporaryDirectories: string[] = [];

afterEach(() => {
	for (const directory of temporaryDirectories.splice(0)) {
		rmSync(directory, { force: true, recursive: true });
	}
});

function descriptor(deviceId: string): ApkAppPluginSessionDescriptor {
	return {
		version: 1,
		pluginRoot,
		package: {
			models: [Q7_FULL_SCENE_MODEL],
			versionCode: 0,
		},
		device: {
			userId: "",
			ownerId: "",
			deviceId,
			deviceSN: Q7_FULL_SCENE_SERIAL,
			model: Q7_FULL_SCENE_MODEL,
			name: "Q7 Produktpfad-Replay",
			firmwareVersion: Q7_FULL_SCENE_FIRMWARE,
			protocolVersion: "1.0",
			deviceProperties: {},
			activeTime: 1,
			robotTimeZone: 2,
			iotType: 2,
		},
		host: {
			mobileModel: "ioBroker AppPlugin Host",
			androidRelease: "15",
			clientId: "q7-product-replay-test",
			memoryMiB: 512,
			iotOriginDevId: "q7-product-host",
		},
		account: { countryCode: "DE", serverCode: "eu" },
		homeData: { deviceJsonStrings: [], productJsonStrings: [] },
		installation: { mainPluginDownloadVersions: { [Q7_FULL_SCENE_MODEL]: 0 } },
		productRepository: { agreementsByModel: {}, userRoles: [] },
	};
}

function seedGuideState(instanceDataDirectory: string, deviceId: string): void {
	const key = createHash("sha256").update(`${Q7_FULL_SCENE_MODEL}\0${deviceId}`).digest("hex");
	const filesDirectory = path.join(
		instanceDataDirectory,
		"appplugin-runtime",
		"state",
		"devices",
		key,
		"files",
	);
	mkdirSync(filesDirectory, { recursive: true });
	writeFileSync(path.join(filesDirectory, "GuideConfigFilePath"), '{"showGuidePage":true}\n', "utf8");
}

describe("Q7 unchanged AppPlugin through productive host composition", () => {
	q7It("requests and renders its map through the productive device ingress", async () => {
		const deviceId = "q7-product-replay-test";
		const instanceDataDirectory = mkdtempSync(path.join(tmpdir(), "q7-product-replay-"));
		temporaryDirectories.push(instanceDataDirectory);
		seedGuideState(instanceDataDirectory, deviceId);
		const fixture = buildQ7FullSceneFixture();
		const manifest = fixture.replayManifest as {
			shadowDps: Readonly<Record<string, unknown>>;
			events: readonly Readonly<{
				kind: "dps";
				dps: Readonly<Record<string, unknown>>;
				waitAfterMs: number;
			}>[];
			publishResponses: readonly Readonly<{
				match: Readonly<{
					dpsKey: string;
					payload: Readonly<Record<string, unknown>>;
				}>;
				maximumMatches: number;
			}>[];
		};
		const replayEvents: readonly AppPluginProductHostReplayEvent[] = manifest.events.map(event => ({
			kind: "dps",
			protocolVersion: "1.0",
			dps: event.dps,
			waitAfterMilliseconds: event.waitAfterMs,
		}));
		const report = await runAppPluginProductHostProof({
			agreementAndPolicy: {
				privacyProtocol: { version: "1", langUrl: "" },
				userAgreement: { version: "1", langUrl: "" },
			},
			descriptor: descriptor(deviceId),
			instanceDataDirectory,
			pluginAgreements: [
				{ type: "USER_AGREEMENT", version: 1, url: "" },
				{ type: "PRIVACY_POLICY", version: 1, url: "" },
			],
			publishResponses: [{
				match: manifest.publishResponses[0].match,
				maximumMatches: manifest.publishResponses[0].maximumMatches,
				replayEvents: [{
					kind: "blob-payload",
					payload: fixture.blob,
					waitBeforeMilliseconds: 750,
					waitAfterMilliseconds: 1_500,
				}],
			}],
			replayEvents,
			settleMilliseconds: 1_000,
			shadowDps: manifest.shadowDps,
		});

		expect(report).toMatchObject({
			pipeline: "productive-device-model-runtime",
			model: Q7_FULL_SCENE_MODEL,
			bundleKind: "hermes-bytecode",
			bundleUnchanged: true,
			cleanupComplete: true,
		});
		expect(
			report.publishResponseMatches,
			JSON.stringify({
				publishedDps: report.publishedDps,
				rpcTransmissions: report.rpcTransmissions,
				nativeModules: report.nativeModules,
				nativeInvocations: report.nativeInvocations,
				workerDiagnostics: report.workerDiagnostics,
				hostErrors: report.hostErrors,
				invocationRejections: report.invocationRejections,
				rootRawTexts: report.rootRawTexts,
				rootViewNames: report.rootViewNames,
			}),
		).toEqual([{
			dpsKey: "10000",
			matchCount: 1,
			maximumMatches: 10,
		}]);
		expect(report.replayResults.map(result => result.kind)).toEqual([
			"dps",
			"dps",
			"blob-payload",
		]);
		expect(report.replayResults.at(-1)).toMatchObject({
			kind: "blob-payload",
			ingress: { eventEmitted: true, rpcAccepted: false },
		});
		expect(report.publishedDps.map(published => {
			const payload = published["10000"] as Readonly<{ method?: unknown }> | undefined;
			return payload?.method;
		})).toEqual([
			"prop.get",
			"service.get_map_list",
			"service.upload_by_maptype",
			"prop.set",
		]);
		const transform = report.workerDiagnostics.find(diagnostic =>
			diagnostic.kind === "call" && diagnostic.functionName === "transform"
		);
		expect(transform).toMatchObject({
			kind: "call",
			functionName: "transform",
			success: true,
			resultSummary: {
				type: "Object",
				fields: {
					result: {
						type: "Array",
						length: 96_000,
					},
				},
			},
		});
		expect(report.workerDiagnostics.filter(diagnostic => !diagnostic.success)).toEqual([]);
		expect(report.rootChildCount).toBeGreaterThan(0);
		expect(report.nodeCount).toBeGreaterThan(1);
		expect(report.operationCount).toBeGreaterThan(0);
		expect(report.hostErrors).toEqual([]);
		expect(report.invocationRejections).toEqual([{
			moduleName: "RRPluginSDK",
			methodName: "getFirmwareUpdateState",
			bridge: "turbo",
			callType: "promise",
			error: {
				name: "Error",
				message: "data is null",
			},
		}]);
	}, 45_000);
});
