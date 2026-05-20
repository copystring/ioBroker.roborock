import { describe, expect, it, vi } from "vitest";
import { BaseDeviceFeatures, type FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";
import "./index";

describe("registered vacuum model features", () => {
	function createDependencies(): FeatureDependencies {
		const requestsHandlerMock = {
			sendRequest: vi.fn().mockResolvedValue({}),
			command: vi.fn().mockResolvedValue(undefined),
			mapParser: { parsedata: vi.fn().mockResolvedValue({}) },
			mapCreator: { canvasMap: vi.fn().mockResolvedValue(["", "", ""]) }
		};

		const adapterMock = {
			namespace: "roborock.0",
			log: { info: vi.fn(), error: vi.fn(), warn: vi.fn(), debug: vi.fn(), silly: vi.fn() },
			setStateChanged: vi.fn().mockResolvedValue(undefined),
			setState: vi.fn(),
			ensureState: vi.fn().mockResolvedValue(undefined),
			ensureFolder: vi.fn().mockResolvedValue(undefined),
			getStateAsync: vi.fn().mockResolvedValue(undefined),
			getStatesAsync: vi.fn().mockResolvedValue({}),
			getObjectAsync: vi.fn().mockResolvedValue(undefined),
			extendObject: vi.fn().mockResolvedValue(undefined),
			setObject: vi.fn().mockResolvedValue(undefined),
			setObjectNotExistsAsync: vi.fn().mockResolvedValue(undefined),
			requestsHandler: requestsHandlerMock,
			getDeviceProtocolVersion: vi.fn().mockResolvedValue("1.0"),
			translations: {},
			http_api: {
				getFwFeaturesResult: vi.fn(),
				storeFwFeaturesResult: vi.fn(),
				getRobotModel: vi.fn().mockReturnValue("roborock.vacuum.a87"),
				getDevices: vi.fn().mockReturnValue([])
			},
			rLog: vi.fn(),
			translationManager: {
				get: vi.fn().mockImplementation((key, def) => def || key)
			},
			errorMessage: (error: unknown) => error instanceof Error ? error.message : String(error)
		};

		return {
			adapter: adapterMock,
			http_api: adapterMock.http_api,
			ensureState: vi.fn().mockResolvedValue(undefined),
			ensureFolder: vi.fn().mockResolvedValue(undefined),
			log: adapterMock.log,
			config: { staticFeatures: [] }
		} as unknown as FeatureDependencies;
	}

	it("exposes the auto-empty command for Qrevo MaxV through the model registry", async () => {
		const ModelClass = BaseDeviceFeatures.getRegisteredModelClass("roborock.vacuum.a87");
		expect(ModelClass).toBeDefined();
		if (!ModelClass) throw new Error("roborock.vacuum.a87 is not registered");

		const vacuum = new ModelClass(createDependencies(), "duid1");
		await vacuum.initialize();

		expect(vacuum.hasStaticFeature(Feature.AutoEmptyDock)).toBe(true);
		expect(vacuum.commands).toHaveProperty("app_start_dust_collection");
	});
});
