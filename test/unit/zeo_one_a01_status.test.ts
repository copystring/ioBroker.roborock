import { describe, expect, it, vi } from "vitest";
import { DeviceManager } from "../../src/lib/deviceManager";

vi.mock("@iobroker/adapter-core", () => ({
    Adapter: class MockAdapter {},
}));

vi.mock("go2rtc-static", () => ({
    default: "",
}));

describe("Zeo One incremental A01 status", () => {
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

    it("clears a previous program time when a new DP 222 arrives without DP 239", async () => {
        const values = new Map<string, unknown>();
        const adapter = {
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
