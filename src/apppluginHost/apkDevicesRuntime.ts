import { ApkHostServiceUnavailableError } from "./apkPluginSdkEnvironmentRuntime";
import type { ApkPluginSdkRpcModule } from "./apkPluginSdkRpcModule";
import type { ApkReactCallback } from "./apkRpcRequestBroker";

export interface ApkDevicesHomeDataContext {
	readonly deviceJsonStrings: readonly string[];
	readonly productJsonStrings: readonly string[];
}

export interface ApkDevicesInstallationContext {
	readonly mainPluginDownloadVersions: Readonly<Record<string, number>>;
}

export interface ApkDevicesRuntimeOptions {
	readonly hasActivity: () => boolean;
	readonly homeData?: ApkDevicesHomeDataContext;
	readonly installation?: ApkDevicesInstallationContext;
	readonly resolveRpc: (did: string) => ApkPluginSdkRpcModule | undefined;
	readonly publishDps?: (
		did: string,
		dps: Readonly<Record<string, unknown>>,
	) => Promise<void>;
}

function isReadableMap(value: unknown): value is Readonly<Record<string, unknown>> {
	return value !== null && typeof value === "object" && !Array.isArray(value) && !ArrayBuffer.isView(value);
}

function callbackActivityNull(callback: ApkReactCallback | undefined): void {
	callback?.(false, { error: "null" });
}

/**
 * APK-derived RRDevicesModule.
 *
 * This is the generic multi-device bridge used by newer AppPlugins. The APK
 * exposes raw HomeData device/product JSON strings instead of rebuilding a
 * device-class-specific feature catalog in React Native.
 */
export class ApkDevicesRuntime {
	public readonly name = "RRDevicesModule";

	public constructor(private readonly options: ApkDevicesRuntimeOptions) {}

	public addListener(_eventName?: string): void {}

	public removeListeners(_count?: number): void {}

	public callMethod(
		did: string,
		method: string,
		arguments_: unknown,
		callback: ApkReactCallback,
	): void {
		this.#callMethod(did, method, arguments_, "automatic", callback);
	}

	public callMethodFromCloud(
		did: string,
		method: string,
		arguments_: unknown,
		callback: ApkReactCallback,
	): void {
		this.#callMethod(did, method, arguments_, "cloud", callback);
	}

	public callMethodFromLocal(
		did: string,
		method: string,
		arguments_: unknown,
		callback: ApkReactCallback,
	): void {
		this.#callMethod(did, method, arguments_, "local", callback);
	}

	public async getDeviceListInfo(): Promise<readonly string[]> {
		return [...this.#homeData().deviceJsonStrings];
	}

	public async getAllDeviceProductRaw(): Promise<readonly string[]> {
		return [...this.#homeData().productJsonStrings];
	}

	/**
	 * APK 4.54.02 delegates this method to the same raw-product path as
	 * getAllDeviceProductRaw. Keep that observed behavior until a newer APK or
	 * an independent runtime capture proves a different contract.
	 */
	public async getConnectedRawProductModels(): Promise<readonly string[]> {
		return [...this.#homeData().productJsonStrings];
	}

	public async getDeviceMainPluginDownloadVersion(model: string): Promise<number> {
		return this.options.installation?.mainPluginDownloadVersions[model] ?? 0;
	}

	public publishDps(
		did: string | null | undefined,
		dps: unknown,
		callback?: ApkReactCallback,
	): void {
		if (!this.options.hasActivity() || !did || !isReadableMap(dps)) {
			callbackActivityNull(callback);
			return;
		}
		if (!this.options.publishDps) throw new ApkHostServiceUnavailableError("multi-device-dps");
		void this.options.publishDps(did, structuredClone(dps)).then(
			() => callback?.(true),
			() => callback?.(false),
		);
	}

	#homeData(): ApkDevicesHomeDataContext {
		if (!this.options.homeData) throw new ApkHostServiceUnavailableError("home-data");
		return this.options.homeData;
	}

	#callMethod(
		did: string,
		method: string,
		arguments_: unknown,
		route: "automatic" | "cloud" | "local",
		callback: ApkReactCallback,
	): void {
		if (!this.options.hasActivity()) {
			callbackActivityNull(callback);
			return;
		}
		const rpc = this.options.resolveRpc(did);
		if (!rpc) return;
		switch (route) {
			case "automatic":
				rpc.callMethod(method, arguments_, undefined, callback);
				return;
			case "cloud":
				rpc.callMethodFromCloud(method, arguments_, undefined, callback);
				return;
			case "local":
				rpc.callMethodFromLocal(method, arguments_, undefined, callback);
		}
	}
}
