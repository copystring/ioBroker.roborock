export type ApkSystemServiceName = "bluetooth" | "location" | "wifi";

export interface ApkPluginPermissionsRuntimeOptions {
	isBluetoothEnabled(): boolean;
	isLocationEnabled(): boolean;
	isWifiEnabled(): boolean;
}

/**
 * APK-derived RRPluginPermissions system-service slice.
 *
 * The Android implementation only recognizes bluetooth, location and wifi;
 * null and unknown values resolve false. Desktop capability state is supplied
 * by the host and is independent of the AppPlugin's device class.
 */
export class ApkPluginPermissionsRuntime {
	public readonly name = "RRPluginPermissions";

	public constructor(private readonly options: ApkPluginPermissionsRuntimeOptions) {}

	public async isSystemServiceEnabled(service?: string | null): Promise<boolean> {
		switch (service) {
			case "bluetooth":
				return this.options.isBluetoothEnabled();
			case "location":
				return this.options.isLocationEnabled();
			case "wifi":
				return this.options.isWifiEnabled();
			default:
				return false;
		}
	}
}
