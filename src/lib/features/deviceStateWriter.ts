import type { FeatureDependencies } from "./baseDeviceFeatures";

export class DeviceStateWriter {
	constructor(
		private readonly deps: FeatureDependencies,
		private readonly duid: string
	) {}

	public path(relativePath = ""): string {
		return relativePath ? `Devices.${this.duid}.${relativePath}` : `Devices.${this.duid}`;
	}

	public async ensureFolder(relativePath: string, name?: string): Promise<void> {
		await this.deps.ensureFolder(this.path(relativePath), name);
	}

	public async ensureState(
		relativePath: string,
		common: Partial<ioBroker.StateCommon>,
		native: Record<string, any> = {}
	): Promise<void> {
		await this.deps.ensureState(this.path(relativePath), common as ioBroker.StateCommon, native);
	}

	public async setState(relativePath: string, value: ioBroker.StateValue): Promise<void> {
		await this.deps.adapter.setStateChanged(this.path(relativePath), { val: value, ack: true });
	}

	public async ensureAndSetState(
		relativePath: string,
		common: Partial<ioBroker.StateCommon>,
		value: ioBroker.StateValue,
		native: Record<string, any> = {}
	): Promise<void> {
		await this.ensureState(relativePath, common, native);
		await this.setState(relativePath, value);
	}

	public async ensureAndSetValueState(
		relativePath: string,
		common: Partial<ioBroker.StateCommon>,
		value: ioBroker.StateValue,
		native: Record<string, any> = {}
	): Promise<void> {
		await this.ensureAndSetState(relativePath, {
			role: "value",
			read: true,
			write: false,
			...common
		}, value, native);
	}
}
