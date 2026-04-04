import { describe, expect, it, vi } from "vitest";
import { Roborock } from "../../src/main";

describe("deviceInfo.online", () => {
	it("is written exactly from HomeData", async () => {
		const writes: Array<{ id: string; val: unknown }> = [];
		const ensured: Array<{ id: string; common: Record<string, unknown> }> = [];
		const adapter = {
			ensureState: vi.fn(async (id: string, common: Record<string, unknown>) => {
				ensured.push({ id, common });
			}),
			setStateChanged: vi.fn(async (id: string, state: { val: unknown }) => {
				writes.push({ id, val: state.val });
			}),
			formatRoborockDate: Roborock.prototype.formatRoborockDate,
		};

		await Roborock.prototype.updateDeviceInfo.call(adapter, "duid-1", [
			{ duid: "duid-1", online: false, name: "Test Device", activeTime: 1775248456, createTime: 1775200000 } as any,
		]);

		expect(writes.find((entry) => entry.id === "Devices.duid-1.deviceInfo.online")?.val).toBe(false);
		expect(ensured.find((entry) => entry.id === "Devices.duid-1.deviceInfo.activeTime")?.common?.name).toBe("Last Activity");
		expect(ensured.find((entry) => entry.id === "Devices.duid-1.deviceInfo.createTime")?.common?.name).toBe("Created At");
	});
});
