import { createCanvas, loadImage } from "@napi-rs/canvas";
import type { B01DeviceStatus } from "../../src/lib/map/b01/types";
import { Q10_FIXTURE_DEFAULTS, type Q10FixtureCredentials } from "./q10FixtureDefaults";

export const Q10_TEST_DEVICE_STATUS: B01DeviceStatus = {
	deviceState: 2,
	deviceWorkMode: 2,
	deviceCleanMode: 0,
	isDustCollect: false,
	deviceFault: 0
};

export interface Q10MockAdapterOptions extends Partial<Q10FixtureCredentials> {
	duid: string;
	assetErrorMessage?: string;
}

export function createQ10MockAdapter(options: Q10MockAdapterOptions) {
	const credentials = resolveQ10TestCredentials(options);
	const { duid, assetErrorMessage = "asset not available" } = options;
	return {
		name: "roborock.0",
		http_api: {
			getMatchedLocalKeys: () => new Map([[duid, credentials.localKey]]),
			getRobotModel: () => credentials.model,
			getDevices: () => [{ duid, sn: credentials.sn, model: credentials.model }]
		},
		log: {
			debug: (_message: string) => undefined,
			warn: (_message: string) => undefined,
			error: (_message: string) => undefined
		},
		rLog: (
			_source: string,
			_duid: string | null,
			_level: string,
			_protocol?: string,
			_messageId?: number | string,
			_message?: string,
			_logLevel?: string
		) => undefined,
		readDirAsync: async () => [],
		fileExistsAsync: async () => false,
		readFileAsync: async () => {
			throw new Error(assetErrorMessage);
		},
		getStateAsync: async () => null,
		setTimeout,
		clearTimeout,
		errorMessage: (error: unknown) => error instanceof Error ? error.message : String(error)
	};
}

export function resolveQ10TestCredentials(
	overrides: Partial<Q10FixtureCredentials> = {}
): Q10FixtureCredentials {
	return {
		localKey: overrides.localKey ?? Q10_FIXTURE_DEFAULTS.localKey,
		model: overrides.model ?? Q10_FIXTURE_DEFAULTS.model,
		sn: overrides.sn ?? Q10_FIXTURE_DEFAULTS.sn
	};
}

export async function decodePngRgba(buffer: Buffer): Promise<{ width: number; height: number; rgba: Buffer }> {
	const image = await loadImage(buffer);
	const canvas = createCanvas(image.width, image.height);
	const ctx = canvas.getContext("2d");
	ctx.drawImage(image as any, 0, 0);
	const imageData = ctx.getImageData(0, 0, image.width, image.height);
	return {
		width: image.width,
		height: image.height,
		rgba: Buffer.from(imageData.data)
	};
}
