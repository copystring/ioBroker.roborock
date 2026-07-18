import { describe, expect, it } from "vitest";

import { composeApkNativeModuleImplementation } from "../../src/apppluginHost/apkNativeModuleComposition";

class EnvironmentSlice {
	public constructor(private readonly firmware: string) {}

	public getFirmwareVersion(): string {
		return this.firmware;
	}
}

class RpcSlice {
	public constructor(private readonly route: string) {}

	public callMethod(): string {
		return this.route;
	}
}

describe("APK Native Module composition", () => {
	it("binds independent APK module slices without losing their instance state", () => {
		const module = composeApkNativeModuleImplementation(
			new EnvironmentSlice("4.3.5"),
			new RpcSlice("automatic"),
		);
		expect(module.getFirmwareVersion()).toBe("4.3.5");
		expect(module.callMethod()).toBe("automatic");
	});

	it("fails closed when two slices claim the same APK method", () => {
		expect(() => composeApkNativeModuleImplementation(
			new RpcSlice("automatic"),
			new RpcSlice("cloud"),
		)).toThrow(/callMethod/u);
	});
});
