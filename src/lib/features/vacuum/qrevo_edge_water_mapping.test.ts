import { describe, expect, it, vi } from "vitest";
import { FeatureDependencies } from "../baseDeviceFeatures";
import { A187Features } from "./a187_features";

function createDeps(): FeatureDependencies {
	const adapter: any = {
		namespace: "roborock.0",
		log: { info: vi.fn(), error: vi.fn(), warn: vi.fn(), debug: vi.fn(), silly: vi.fn() },
		translations: {},
		rLog: vi.fn(),
		setStateChanged: vi.fn().mockResolvedValue(undefined),
		extendObject: vi.fn().mockResolvedValue(undefined),
		getDeviceProtocolVersion: vi.fn().mockResolvedValue("1.0"),
		http_api: {
			getDevices: vi.fn().mockReturnValue([]),
			getFwFeaturesResult: vi.fn(),
			storeFwFeaturesResult: vi.fn()
		},
		requestsHandler: { sendRequest: vi.fn().mockResolvedValue({}) },
		translationManager: { get: vi.fn().mockImplementation((key, def) => def || key) }
	};

	return {
		adapter,
		http_api: adapter.http_api,
		ensureState: vi.fn().mockResolvedValue(undefined),
		ensureFolder: vi.fn().mockResolvedValue(undefined),
		log: adapter.log,
		config: { staticFeatures: [] }
	} as unknown as FeatureDependencies;
}

describe("Qrevo Edge 2 water mapping", () => {
	it("uses the Edge 2 custom water range for a187", async () => {
		const vacuum = new A187Features(createDeps(), "duid1") as any;

		await vacuum.setupProtocolFeatures();

		expect(vacuum.commands.set_water_box_custom_mode.states).toMatchObject({
			200: "Off",
			221: "Very Light",
			235: "Medium",
			250: "Extreme"
		});
		expect(Object.keys(vacuum.commands.set_water_box_custom_mode.states).map(Number)).toEqual([
			200,
			221,
			222,
			223,
			224,
			225,
			226,
			227,
			228,
			229,
			230,
			231,
			232,
			233,
			234,
			235,
			236,
			237,
			238,
			239,
			240,
			241,
			242,
			243,
			244,
			245,
			246,
			247,
			248,
			249,
			250
		]);
	});
});
