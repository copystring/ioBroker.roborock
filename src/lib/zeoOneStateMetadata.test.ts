import { describe, expect, it, vi } from "vitest";
import { DeviceManager } from "./deviceManager";
import { getZeoOneAppPluginName, getZeoOneAppPluginText } from "./zeoOneAppPluginTranslations";
import { getZeoOneAliasStates, getZeoOneDpMetadata } from "./zeoOneStateMetadata";

vi.mock("@iobroker/adapter-core", () => ({ Adapter: class MockAdapter {} }));
vi.mock("go2rtc-static", () => ({ default: "" }));

describe("original Zeo One display metadata", () => {
	it("uses actual AppPlugin translations and its missing-translation fallback", () => {
		expect(getZeoOneAppPluginName("beep_voice_desc")).toMatchObject({ en: "Sound Prompts", de: "Klangaufforderungen" });
		expect(getZeoOneAppPluginText("device_status_washing", "de")).toBe("Waschen...");
		expect(getZeoOneAppPluginText("device_status_washing", "ru")).toBe("Washing...");
		expect(getZeoOneAppPluginText("beep_voice_desc", "nl")).toBe("Sound Prompts");
		expect(getZeoOneAppPluginText("cache_washing_preference", "de")).toBe("程序记忆模式");
	});

	it("labels raw enum codes and preserves a102 country-specific program names", () => {
		expect(getZeoOneDpMetadata("203", "de").states).toMatchObject({ 4: "Waschen...", 10: "Fertig" });
		expect(getZeoOneDpMetadata("205", "de").states).toMatchObject({ 1: "Gemischt", 23: "Baumwolle" });
		expect(getZeoOneDpMetadata("205", "en", "tw").states).toMatchObject({ 1: "Standard", 23: "Cotton" });
		expect(getZeoOneDpMetadata("210", "de").states).toEqual({ 1: "Schrank", 2: "Bügeln", 3: "Schrank Plus" });
		expect(getZeoOneDpMetadata("207", "de").states).toMatchObject({ 1: "Raumtemp.", 3: "40℃", 6: "20℃" });
		expect(getZeoOneDpMetadata("209", "de").states).toMatchObject({ 7: "1400 U/min" });
	});

	it("labels fault and door-lock codes from the actual UI lookup instead of inventing boolean states", () => {
		const lock = getZeoOneDpMetadata("219", "de").states as Record<string, string>;
		expect(Object.keys(lock)).toEqual(["2", "3", "4"]);
		expect(lock["2"]).toContain("hohen Wasserstands");
		const errors = getZeoOneDpMetadata("220", "de").states as Record<string, string>;
		expect(errors["3"]).toContain("Fehler an Türverriegelung (E3)");
		expect(errors).not.toHaveProperty("0");
		expect(getZeoOneDpMetadata("237", "de")).toEqual({ name: "FeatureBits" });
		expect(getZeoOneDpMetadata("999", "de")).toEqual({ name: "999" });
	});

	it("translates alias display states without changing their existing token or numeric values", () => {
		expect(getZeoOneAliasStates(getZeoOneDpMetadata("203", "de"), { 4: "Washing" })).toEqual({ Washing: "Waschen..." });
		expect(getZeoOneAliasStates(getZeoOneDpMetadata("209", "de"), { 7: 1400 })).toEqual({ 1400: "1400 U/min" });
		expect(getZeoOneAliasStates(getZeoOneDpMetadata("206", "de"), { 0: false, 1: true })).toEqual({
			false: "Kindersicherung aus", true: "Kindersicherung ein",
		});
	});

	it("uses one raw schema for HomeData and MQTT and scopes it to the washer", async () => {
		const { Roborock } = await import("../main");
		const objects = new Map<string, Partial<ioBroker.StateCommon>>();
		const values = new Map<string, unknown>();
		const adapter = {
			language: "de",
			http_api: { getRobotModel: vi.fn().mockReturnValue("roborock.wm.a102") },
			ensureFolder: vi.fn().mockResolvedValue(undefined),
			ensureState: vi.fn(async (id: string, common: Partial<ioBroker.StateCommon>) => {
				objects.set(id, common);
			}),
			setStateChanged: vi.fn(async (id: string, state: { val: unknown }) => {
				values.set(id, state.val);
			}),
			tryParseJson: (Roborock.prototype as any).tryParseJson,
		};
		const manager = new DeviceManager(adapter as any);
		(manager as any).deviceFeatureHandlers.set("washer", {});
		const status = { "205": 23, "209": 7, "237": 1 };
		await manager.updateHomeDataDeviceStatus("washer", [{ duid: "washer", deviceStatus: status }] as any);
		const homeMetadata = objects.get("Devices.washer.deviceStatus.205");
		await Roborock.prototype.processA01.call({ ...adapter, deviceManager: manager } as any, "washer", { dps: status });
		expect(objects.get("Devices.washer.deviceStatus.205")).toEqual(homeMetadata);
		expect(values.get("Devices.washer.deviceStatus.205")).toBe(23);
		expect(values.get("Devices.washer.deviceStatus.program_name")).toBe("CottonOrLinen");
		expect(objects.get("Devices.washer.deviceStatus.program_name")?.states).toMatchObject({ CottonOrLinen: "Baumwolle" });
		expect(values.get("Devices.washer.deviceStatus.spin_speed_rpm")).toBe(1400);
		expect(manager.getRawDeviceStatusCommon("washer", "205", "number", { "10005": { oba: { location: "tw" } } }).states).toMatchObject({ 1: "Standard" });
		adapter.http_api.getRobotModel.mockReturnValue("roborock.vacuum.a179");
		expect(manager.getRawDeviceStatusCommon("vacuum", "205", "number")).toEqual({ name: "205", type: "number", read: true, write: false });
	});

	it("updates existing state objects with labels while retaining IDs, native data and values", async () => {
		const { Roborock } = await import("../main");
		const metadata = getZeoOneDpMetadata("205", "de");
		const old = { type: "state", common: { name: "205", type: "number", role: "value", read: true, write: false }, native: { marker: "keep" } };
		const adapter = Object.assign(Object.create(Roborock.prototype), {
			getObjectAsync: vi.fn().mockResolvedValue(old),
			extendObject: vi.fn().mockResolvedValue(undefined),
			setStateChanged: vi.fn(),
		});
		await adapter.ensureState("Devices.washer.deviceStatus.205", { ...metadata, type: "number", write: false });
		expect(adapter.extendObject).toHaveBeenCalledWith("Devices.washer.deviceStatus.205", {
			common: expect.objectContaining({ name: "Program", states: expect.objectContaining({ 23: "Baumwolle" }), type: "number", write: false }),
		});
		expect(old.native).toEqual({ marker: "keep" });
		expect(adapter.setStateChanged).not.toHaveBeenCalled();
	});
});
