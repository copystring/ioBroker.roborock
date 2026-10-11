import { describe, expect, it, vi } from "vitest";
import { DeviceManager } from "../../src/lib/deviceManager";
import { ZeoOneFeatures } from "../../src/lib/features/washer/ZeoOneFeatures";
import { messageParser } from "../../src/lib/messageParser";
import { requestsHandler } from "../../src/lib/requestsHandler";
import { mqtt_api } from "../../src/lib/mqttApi";

vi.mock("@iobroker/adapter-core", () => ({
    Adapter: class MockAdapter {},
}));

vi.mock("go2rtc-static", () => ({
    default: "",
}));

describe("Zeo One incremental A01 status", () => {
    it("writes protocol 102 QueryDP replies and unsolicited changes without a polling pass", async () => {
        const { Roborock } = await import("../../src/main");
        const states = new Map<string, unknown>();
        const adapter = {
            http_api: { getRobotModel: vi.fn().mockReturnValue("roborock.wm.a102") },
            ensureState: vi.fn().mockResolvedValue(undefined),
            setStateChanged: vi.fn(async (id: string, state: { val: unknown }) => { states.set(id, state.val); }),
            tryParseJson: Roborock.prototype.tryParseJson,
            processA01: Roborock.prototype.processA01,
            rLog: vi.fn(),
            setInterval: vi.fn(() => 1),
            clearInterval: vi.fn(),
        };
        (adapter as any).deviceManager = new DeviceManager(adapter as any);
        const api = new mqtt_api(adapter as any);
        const base = "Devices.zeo-one.deviceStatus.";

        // QueryDP response, then the three unsolicited DP 209 changes from the device log.
        for (const dps of [{ "203": 1, "209": 7, "225": 0 }, { "209": 6 }, { "209": 7 }, { "209": 6 }]) {
            await api.handleDecodedMessage("zeo-one", {
                version: "A01", protocol: 102,
                payload: Buffer.from(JSON.stringify({ t: 1791454590, dps })),
            });
            expect(states.get(base + "209")).toBe(dps["209"]);
            expect(states.get(base + "spin_speed_rpm")).toBe(dps["209"] === 6 ? 1200 : 1400);
        }
        expect(states.get(base + "203")).toBe(1);
        expect(states.get(base + "cache_washing_preference")).toBe(false);
        expect(adapter.rLog).not.toHaveBeenCalled();
    });

    it("keeps raw DP 222/239 and refreshes the same decoded program from either update", async () => {
        const { Roborock } = await import("../../src/main");
        const states = new Map<string, unknown>();
        const adapter = {
            language: "de",
            http_api: { getRobotModel: vi.fn().mockReturnValue("roborock.wm.a102") },
            ensureFolder: vi.fn().mockResolvedValue(undefined),
            ensureState: vi.fn().mockResolvedValue(undefined),
            setStateChanged: vi.fn(async (id: string, state: { val: unknown }) => { states.set(id, state.val); }),
            getStateAsync: vi.fn(async (id: string) => states.has(id) ? { val: states.get(id) } : null),
            tryParseJson: Roborock.prototype.tryParseJson,
            rLog: vi.fn(),
        };
        (adapter as any).deviceManager = new DeviceManager(adapter as any);

        await Roborock.prototype.processA01.call(adapter as any, "zeo-one", { dps: { "203": 4, "204": 2, "205": 23, "222": 994818 } });

        expect(states.get("Devices.zeo-one.deviceStatus.203")).toBe(4);
        expect(states.get("Devices.zeo-one.deviceStatus.status_name")).toBe("Washing");
        expect(states.get("Devices.zeo-one.deviceStatus.mode_name")).toBe("WashAndDry");
        expect(states.get("Devices.zeo-one.deviceStatus.program_name")).toBe("CottonOrLinen");
        expect(states.get("Devices.zeo-one.deviceStatus.222")).toBe(994818);
        expect(states.get("Devices.zeo-one.deviceStatus.custom_program.program_name")).toBe("Schnell");
        expect(states.get("Devices.zeo-one.deviceStatus.custom_program.temperature")).toBe(40);

        await Roborock.prototype.processA01.call(adapter as any, "zeo-one", { dps: { "239": 75 } });

        expect(states.get("Devices.zeo-one.deviceStatus.239")).toBe(75);
        expect(states.get("Devices.zeo-one.deviceStatus.custom_program.total_time")).toBeNull();
        expect(adapter.getStateAsync).not.toHaveBeenCalled();

        await Roborock.prototype.processA01.call(adapter as any, "zeo-one", { dps: { "203": 10, "204": 3, "205": 39 } });
        expect(states.get("Devices.zeo-one.deviceStatus.status_name")).toBe("Complete");
        expect(states.get("Devices.zeo-one.deviceStatus.mode_name")).toBe("Dry");
        expect(states.get("Devices.zeo-one.deviceStatus.program_name")).toBe("Mixing");
    });

    it("accepts a numeric-string DP 222 through the A01 parser while retaining the raw string", async () => {
        const { Roborock } = await import("../../src/main");
        const stateTypes = new Map<string, unknown>();
        const values = new Map<string, unknown>();
        const adapter = {
            language: "de",
            http_api: { getRobotModel: vi.fn().mockReturnValue("roborock.wm.a102") },
            ensureFolder: vi.fn().mockResolvedValue(undefined),
            ensureState: vi.fn(async (id: string, common: { type?: unknown }) => { stateTypes.set(id, common.type); }),
            setStateChanged: vi.fn(async (id: string, state: { val: unknown }) => { values.set(id, state.val); }),
            tryParseJson: Roborock.prototype.tryParseJson,
            rLog: vi.fn(),
        };
        (adapter as any).deviceManager = new DeviceManager(adapter as any);

        await Roborock.prototype.processA01.call(adapter as any, "zeo-one", { dps: { "222": "994818" } });

        expect(values.get("Devices.zeo-one.deviceStatus.222")).toBe("994818");
        expect(stateTypes.get("Devices.zeo-one.deviceStatus.222")).toBe("string");
        expect(values.get("Devices.zeo-one.deviceStatus.custom_program.temperature")).toBe(40);
    });

    it("derives supported read-only settings without changing A01 raw values", async () => {
        const { Roborock } = await import("../../src/main");
        const values = new Map<string, unknown>();
        const common = new Map<string, Record<string, unknown>>();
        const adapter = {
            http_api: { getRobotModel: vi.fn().mockReturnValue("roborock.wm.a102") },
            ensureState: vi.fn(async (id: string, state: Record<string, unknown>) => { common.set(id, state); }),
            setStateChanged: vi.fn(async (id: string, state: { val: unknown }) => { values.set(id, state.val); }),
            tryParseJson: Roborock.prototype.tryParseJson,
            rLog: vi.fn(),
        };
        (adapter as any).deviceManager = new DeviceManager(adapter as any);
        const status = { "206": 1, "207": 3, "208": 2, "209": 6, "210": 2, "211": 0, "212": 1,
            "217": 90, "218": 47, "223": 0, "224": 31, "225": 1, "226": 1, "227": 0, "232": 1 };

        await Roborock.prototype.processA01.call(adapter as any, "zeo-one", { dps: status });

        const base = "Devices.zeo-one.deviceStatus.";
        for (const [dp, raw] of Object.entries(status)) expect(values.get(base + dp)).toBe(raw);
        expect(values.get(base + "temperature_celsius")).toBe(40);
        expect(common.get(base + "temperature_celsius")).toMatchObject({ type: "number", unit: "°C", read: true, write: false });
        expect(values.get(base + "rinse_cycles")).toBe(2);
        expect(values.get(base + "spin_speed_rpm")).toBe(1200);
        expect(values.get(base + "drying_mode_name")).toBe("Iron");
        expect(values.get(base + "preset_minutes")).toBe(90);
        expect(values.get(base + "time_left_minutes")).toBe(47);
        expect(values.get(base + "self_clean_times")).toBe(31);
        expect(values.get(base + "child_lock")).toBe(true);
        expect(values.get(base + "auto_detergent")).toBe(false);
        expect(values.get(base + "auto_softener")).toBe(true);
        expect(values.get(base + "sound")).toBe(false);
        expect(values.get(base + "cache_washing_preference")).toBe(true);
        expect(common.get(base + "cache_washing_preference")).toMatchObject({ type: "boolean", read: true, write: false });
        expect(values.get(base + "detergent_empty")).toBe(true);
        expect(values.get(base + "softener_empty")).toBe(false);
        expect(values.get(base + "remote_control_authorized")).toBe(true);
        expect(common.get(base + "remote_control_authorized")).toMatchObject({ type: "boolean", read: true, write: false });

        await Roborock.prototype.processA01.call(adapter as any, "zeo-one", { dps: { "207": 1, "209": 9, "206": 2, "210": 9, "225": 0, "237": 1 } });
        expect(values.get(base + "temperature_celsius")).toBeNull();
        expect(values.get(base + "spin_speed_rpm")).toBeNull();
        expect(values.get(base + "child_lock")).toBeNull();
        expect(values.get(base + "drying_mode_name")).toBeNull();
        expect(values.get(base + "cache_washing_preference")).toBe(false);
        expect(values.get(base + "237")).toBe(1);
    });

    it("clears a previous program time when a new DP 222 arrives without DP 239", async () => {
        const values = new Map<string, unknown>();
        const adapter = {
            language: "de",
            http_api: { getRobotModel: vi.fn().mockReturnValue("roborock.wm.a102") },
            ensureFolder: vi.fn().mockResolvedValue(undefined),
            ensureState: vi.fn().mockResolvedValue(undefined),
            setStateChanged: vi.fn(async (id: string, state: { val: unknown }) => { values.set(id, state.val); }),
        };
        const manager = new DeviceManager(adapter as any);
        const timePath = "Devices.zeo-one.deviceStatus.custom_program.total_time";

        await manager.updateZeoOneStatus("zeo-one", { "222": 994818, "239": 75 });
        expect(values.get(timePath)).toBe(75);
        await manager.updateZeoOneStatus("zeo-one", { "222": 1003031 });
        expect(values.get(timePath)).toBeNull();
        expect(values.get("Devices.zeo-one.deviceStatus.custom_program.program_name")).toBe("Baumwolle");
    });

    it("uses the plugin program enum for custom programs beyond the two localized names", async () => {
        const values = new Map<string, unknown>();
        const adapter = {
            language: "de",
            http_api: { getRobotModel: vi.fn().mockReturnValue("roborock.wm.a102") },
            ensureFolder: vi.fn().mockResolvedValue(undefined),
            ensureState: vi.fn().mockResolvedValue(undefined),
            setStateChanged: vi.fn(async (id: string, state: { val: unknown }) => { values.set(id, state.val); }),
        };
        await new DeviceManager(adapter as any).updateZeoOneStatus("zeo-one", { "222": 33 });
        expect(values.get("Devices.zeo-one.deviceStatus.custom_program.program_name")).toBe("Eco");
    });

    it("retains raw A01 data for another model without Zeo One interpretations", async () => {
        const { Roborock } = await import("../../src/main");
        const writes = new Map<string, unknown>();
        const adapter = {
            http_api: { getRobotModel: vi.fn().mockReturnValue("roborock.wm.other") },
            ensureState: vi.fn().mockResolvedValue(undefined),
            setStateChanged: vi.fn(async (id: string, state: { val: unknown }) => { writes.set(id, state.val); }),
            tryParseJson: Roborock.prototype.tryParseJson,
            rLog: vi.fn(),
        };
        (adapter as any).deviceManager = new DeviceManager(adapter as any);

        await Roborock.prototype.processA01.call(adapter as any, "other", { dps: { "222": 994818 } });

        expect(writes.get("Devices.other.deviceStatus.222")).toBe(994818);
        expect([...writes.keys()].some((id) => id.includes("custom_program"))).toBe(false);
        expect([...writes.keys()].some((id) => id.endsWith("status_name"))).toBe(false);
    });
});

describe("Zeo One decoder guards", () => {
    it.each(["994818x", -1, 0x10000000, 1.5, Number.NaN])(
        "keeps invalid DP 222 as raw data without interpreting %s",
        async (raw) => {
            const writes: string[] = [];
            const adapter = {
                http_api: { getRobotModel: vi.fn().mockReturnValue("roborock.wm.a102") },
                setStateChanged: vi.fn(async (id: string) => { writes.push(id); }),
                ensureFolder: vi.fn().mockResolvedValue(undefined),
                ensureState: vi.fn().mockResolvedValue(undefined),
                getStateAsync: vi.fn().mockResolvedValue(null),
            };
            const manager = new DeviceManager(adapter as any);

            await manager.updateZeoOneStatus("zeo-one", { "222": raw });

            expect(writes).toEqual([]);
        },
    );

    it("does not invent a program from DP 239 when no raw DP 222 exists", async () => {
        const adapter = {
            http_api: { getRobotModel: vi.fn().mockReturnValue("roborock.wm.a102") },
            getStateAsync: vi.fn().mockResolvedValue(null),
            ensureFolder: vi.fn(),
        };
        const manager = new DeviceManager(adapter as any);

        await manager.updateZeoOneStatus("zeo-one", { "239": 75 });

        expect(adapter.getStateAsync).not.toHaveBeenCalled();
        expect(adapter.ensureFolder).not.toHaveBeenCalled();
    });

    it("marks an unmapped temperature as a raw level without a Celsius unit", async () => {
        const commonByPath = new Map<string, Record<string, unknown>>();
        const values = new Map<string, unknown>();
        const adapter = {
            language: "de",
            http_api: { getRobotModel: vi.fn().mockReturnValue("roborock.wm.a102") },
            ensureFolder: vi.fn().mockResolvedValue(undefined),
            ensureState: vi.fn(async (id: string, common: Record<string, unknown>) => { commonByPath.set(id, common); }),
            setStateChanged: vi.fn(async (id: string, state: { val: unknown }) => { values.set(id, state.val); }),
            getStateAsync: vi.fn().mockResolvedValue(null),
        };
        const manager = new DeviceManager(adapter as any);
        const rawProgram = (994818 & ~0x1c00) | (7 << 10);

        await manager.updateZeoOneStatus("zeo-one", { "222": rawProgram });

        const path = "Devices.zeo-one.deviceStatus.custom_program.temperature";
        expect(values.get(path)).toBe(7);
        expect(commonByPath.get(path)).toMatchObject({ name: { en: "Temperature level", de: "Temperaturstufe" } });
        expect(commonByPath.get(path)?.unit).toBeUndefined();
    });
});

describe("Zeo One source labels", () => {
    it("marks an unmapped numeric status explicitly and clears a nonnumeric status", async () => {
        const values = new Map<string, unknown>();
        const adapter = {
            http_api: { getRobotModel: vi.fn().mockReturnValue("roborock.wm.a102") },
            ensureState: vi.fn().mockResolvedValue(undefined),
            setStateChanged: vi.fn(async (id: string, state: { val: unknown }) => { values.set(id, state.val); }),
        };
        const manager = new DeviceManager(adapter as any);
        const path = "Devices.zeo-one.deviceStatus.status_name";

        await manager.updateZeoOneStatus("zeo-one", { "203": 99 });
        expect(values.get(path)).toBe("Unknown (99)");
        await manager.updateZeoOneStatus("zeo-one", { "203": "invalid" });
        expect(values.get(path)).toBeNull();
    });
});


describe("Zeo One writable commands through MQTT", () => {
    it("sends off and saves a program without starting, acknowledging only actual A01 device reports", async () => {
        const { Roborock } = await import("../../src/main");
        const states = new Map<string, { val: unknown; ack: boolean }>();
        const adapter = Object.assign(Object.create(Roborock.prototype), {
            language: "de",
            http_api: {
                getRobotModel: vi.fn().mockReturnValue("roborock.wm.a102"),
                getMatchedLocalKeys: () => new Map([["zeo-one", "0011223344556677"]]),
            },
            ensureFolder: vi.fn().mockResolvedValue(undefined),
            ensureState: vi.fn().mockResolvedValue(undefined),
            setStateChanged: vi.fn(async (id: string, state: { val: unknown; ack: boolean }) => { states.set(id, state); }),
            setTimeout: (callback: () => void, ms: number) => setTimeout(callback, ms),
            clearTimeout: (timer: ReturnType<typeof setTimeout>) => clearTimeout(timer),
            setInterval: vi.fn(() => 1), clearInterval: vi.fn(),
            rLog: vi.fn(),
        });
        adapter.deviceManager = new DeviceManager(adapter);
        const parser = new messageParser(adapter);
        adapter.mqtt_api = new mqtt_api(adapter);
        const broker = vi.spyOn(adapter.mqtt_api, "sendMessage").mockResolvedValue(undefined);
        adapter.requestsHandler = Object.assign(Object.create(requestsHandler.prototype), { adapter, messageParser: parser });
        const features = new ZeoOneFeatures({ adapter } as any, "zeo-one");
        features.protocolVersion = "A01";
        await features.setupProtocolFeatures();
        expect(Object.keys(features.commands).sort()).toEqual([
            "cache_washing_preference", "child_lock", "detergent_level", "save_program", "softener_level", "sound",
        ]);
        adapter.deviceFeatureHandlers = new Map([["zeo-one", features]]);
        const receive = (dps: Record<string, unknown>) => adapter.mqtt_api.handleDecodedMessage("zeo-one", {
            version: "A01", protocol: 102, payload: Buffer.from(JSON.stringify({ dps })),
        });
        await receive({ "203": 1, "223": 1, "10005": JSON.stringify({ oba: { location: "de" } }) });
        expect(states.get("Devices.zeo-one.deviceStatus.program_options")?.ack).toBe(true);
        states.set("Devices.zeo-one.commands.sound", { val: 0, ack: false });
        const off = (adapter as any).executeCommand(features, "zeo-one", "sound", { val: 0 }, features.getCommandSpec("commands", "sound"));
        await Promise.resolve();
        await Promise.resolve();
        const offFrame = parser.decodeMsg(broker.mock.calls[0][1], "zeo-one")[0];
        expect(JSON.parse(offFrame.payload.toString()).dps).toEqual({ "223": 0 });
        expect(states.get("Devices.zeo-one.commands.sound")?.ack).toBe(false);
        await receive({ "223": 0 });
        await off;
        expect(states.get("Devices.zeo-one.commands.sound")).toEqual({ val: 0, ack: true });

        const input = { mode: 2, program: 2, temperatureLevel: 3, rinse: 1, spinLevel: 7, dryingLevel: 2 };
        const value = JSON.stringify(input);
        states.set("Devices.zeo-one.commands.save_program", { val: value, ack: false });
        const save = (adapter as any).executeCommand(features, "zeo-one", "save_program", { val: value }, features.getCommandSpec("commands", "save_program"));
        await Promise.resolve();
        await Promise.resolve();
        const saveFrame = parser.decodeMsg(broker.mock.calls[1][1], "zeo-one")[0];
        expect(JSON.parse(saveFrame.payload.toString()).dps).toEqual({
            "204": 2, "205": 2, "207": 3, "208": 1, "209": 7, "210": 1, "221": 1,
        });
        expect(JSON.parse(saveFrame.payload.toString()).dps).not.toHaveProperty("200");
        await receive({ "204": 2, "221": 1 });
        expect(states.get("Devices.zeo-one.commands.save_program")?.ack).toBe(false);
        // Dominik's original "Schnell 40" example decoded from the official customMode bit fields.
        await receive({ "222": "994818" });
        await save;
        expect(states.get("Devices.zeo-one.commands.save_program")).toEqual({ val: value, ack: true });
        expect(states.get("Devices.zeo-one.deviceStatus.custom_program.temperature")?.val).toBe(40);
        expect(states.get("Devices.zeo-one.deviceStatus.custom_program.spin_speed")?.val).toBe(1400);
    });
});
