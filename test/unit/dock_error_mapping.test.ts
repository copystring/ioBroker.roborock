import { describe, expect, it, vi } from "vitest";
import errorCodeDataset from "../../lib/protocols/roborock_error_codes.json";
import { FeatureDependencies } from "../../src/lib/features/baseDeviceFeatures";
import { A62Features } from "../../src/lib/features/vacuum/a62_features";
import { getLocalizedErrorStates } from "../../src/lib/features/vacuum/adapterErrorMapping";

vi.mock("../../src/lib/map/MapManager", () => ({
	MapManager: class {
		processMap = vi.fn().mockResolvedValue({ mapBase64: "base64_map" });
	},
}));

describe("AppPlugin error mapping", () => {
	it("contains the complete extracted AppPlugin union", () => {
		expect(Object.keys(errorCodeDataset.codes)).toHaveLength(107);
		expect(errorCodeDataset.codes["29"].titleKeys).not.toContain("DMM");
		expect(errorCodeDataset.codes["38"]).toMatchObject({
			types: ["ClearWaterboxHoare"],
			labelKeys: ["error_clear_waterbox_hoare_title"],
			fallback: "Check the clean water tank.",
		});
		expect(errorCodeDataset.codes["33"].titleKeys).toContain("collecting_dusk_error33_title");
		expect(errorCodeDataset.codes["159"].detailKeys).toContain("inner_error_desc_159");
	});

	it("resolves states in the configured adapter language", () => {
		const states = getLocalizedErrorStates({
			get: (key, fallback) => key === "error_clear_waterbox_hoare_title"
				? "Bitte den Reinwassertank überprüfen"
				: fallback || key,
		});

		expect(states["38"]).toBe("Bitte den Reinwassertank überprüfen");
		expect(states["33"]).toBe("Auto-Empty Dock fan error");
	});

	it("applies the same localized states to error_code and dock_error_status", async () => {
		const ensureState = vi.fn().mockResolvedValue(undefined);
		const setStateChanged = vi.fn().mockResolvedValue(undefined);
		const adapter = {
			log: { info: vi.fn(), error: vi.fn(), warn: vi.fn(), debug: vi.fn(), silly: vi.fn() },
			setStateChanged,
			requestsHandler: { sendRequest: vi.fn(), command: vi.fn() },
			translationManager: {
				get: (key: string, fallback?: string) => key === "error_clear_waterbox_hoare_title"
					? "Bitte den Reinwassertank überprüfen"
					: fallback || key,
			},
			rLog: vi.fn(),
		} as any;
		const dependencies = {
			adapter,
			ensureState,
			ensureFolder: vi.fn().mockResolvedValue(undefined),
			log: adapter.log,
		} as unknown as FeatureDependencies;
		const vacuum = new A62Features(dependencies, "a62-duid");

		await vacuum.processStatus({ error_code: 0, dock_error_status: 38 });

		const errorObject = ensureState.mock.calls.find(([id]) => id.endsWith("deviceStatus.error_code"));
		const dockErrorObject = ensureState.mock.calls.find(([id]) => id.endsWith("deviceStatus.dock_error_status"));
		expect(errorObject?.[1].states["38"]).toBe("Bitte den Reinwassertank überprüfen");
		expect(dockErrorObject?.[1].states).toEqual(errorObject?.[1].states);
		expect(setStateChanged).toHaveBeenCalledWith("Devices.a62-duid.deviceStatus.dock_error_status", { val: 38, ack: true });
	});
});
