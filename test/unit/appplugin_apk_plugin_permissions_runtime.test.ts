import { describe, expect, it, vi } from "vitest";

import { ApkPluginPermissionsRuntime } from "../../src/apppluginHost/apkPluginPermissionsRuntime";

describe("APK RRPluginPermissions runtime", () => {
	it("queries only the three system services recognized by the APK", async () => {
		const isBluetoothEnabled = vi.fn(() => false);
		const isLocationEnabled = vi.fn(() => true);
		const isWifiEnabled = vi.fn(() => true);
		const runtime = new ApkPluginPermissionsRuntime({
			isBluetoothEnabled,
			isLocationEnabled,
			isWifiEnabled,
		});

		await expect(runtime.isSystemServiceEnabled("bluetooth")).resolves.toBe(false);
		await expect(runtime.isSystemServiceEnabled("location")).resolves.toBe(true);
		await expect(runtime.isSystemServiceEnabled("wifi")).resolves.toBe(true);
		await expect(runtime.isSystemServiceEnabled("nfc")).resolves.toBe(false);
		await expect(runtime.isSystemServiceEnabled(null)).resolves.toBe(false);
		expect(isBluetoothEnabled).toHaveBeenCalledOnce();
		expect(isLocationEnabled).toHaveBeenCalledOnce();
		expect(isWifiEnabled).toHaveBeenCalledOnce();
	});
});
