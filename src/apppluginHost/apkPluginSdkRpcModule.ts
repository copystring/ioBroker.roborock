import {
	ApkRpcRequestBroker,
	type ApkReactCallback,
	type ApkRpcRoute,
} from "./apkRpcRequestBroker";

export type ApkPluginSdkRpcArguments = Readonly<Record<string, unknown>> | readonly unknown[];

export interface ApkPluginSdkActivityState {
	hasRnActivity(): boolean;
}

export interface ApkPluginSdkStrategyState {
	isInternetReachable(): boolean;
	isLocalDeviceConnected(): boolean;
	isBluetoothCommunicated(): boolean;
	callBluetoothProtobuf(payload: Uint8Array, callback: ApkReactCallback): void;
}

function callbackActivityNull(callback: ApkReactCallback): void {
	callback(false, { error: "null" });
}

function isReadableMap(value: unknown): value is Readonly<Record<string, unknown>> {
	return value !== null && typeof value === "object" && !Array.isArray(value) && !ArrayBuffer.isView(value);
}

/** Mirrors android.util.Base64.decode(value, Base64.NO_WRAP) for plugin payloads. */
export function decodeApkPluginBase64(value: string): Buffer {
	const compact = value.replace(/[\t\n\f\r ]/g, "");
	if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
		compact.padEnd(compact.length + ((4 - compact.length % 4) % 4), "="),
	)) {
		throw new Error("Invalid APK plugin Base64 payload");
	}
	return Buffer.from(compact, "base64");
}

/**
 * APK-derived RPC slice of the RRPluginSDK React Native module.
 *
 * This class intentionally contains no ioBroker imports or command knowledge.
 * It only reproduces the routing/delegation performed by PluginSDKModule.java;
 * the unchanged appplugin bundle still supplies method names and payloads.
 */
export class ApkPluginSdkRpcModule {
	public readonly name = "RRPluginSDK";

	public constructor(
		private readonly broker: ApkRpcRequestBroker,
		private readonly activityState: ApkPluginSdkActivityState,
		private readonly strategyState?: ApkPluginSdkStrategyState,
	) {}

	public callMethod(
		method: string,
		arguments_: unknown,
		_unused: unknown,
		callback: ApkReactCallback,
	): void {
		this.#callMethod(method, arguments_, "automatic", callback);
	}

	public callMethodFromCloud(
		method: string,
		arguments_: unknown,
		_unused: unknown,
		callback: ApkReactCallback,
	): void {
		this.#callMethod(method, arguments_, "cloud", callback);
	}

	public callMethodFromLocal(
		method: string,
		arguments_: unknown,
		_unused: unknown,
		callback: ApkReactCallback,
	): void {
		this.#callMethod(method, arguments_, "local", callback);
	}

	public callMethodPb(methodBase64: string, callback: ApkReactCallback): void {
		this.#callMethodPb(methodBase64, "automatic", callback);
	}

	public callMethodPbFromCloud(methodBase64: string, callback: ApkReactCallback): void {
		this.#callMethodPb(methodBase64, "cloud", callback);
	}

	public callMethodPbFromCloudV2(
		methodBase64: string,
		_protocol: string,
		callback: ApkReactCallback,
	): void {
		this.#callMethodPb(methodBase64, "cloud", callback);
	}

	public callMethodPbFromLocal(methodBase64: string, callback: ApkReactCallback): void {
		this.#callMethodPb(methodBase64, "local", callback);
	}

	public callMethodPbFromLocalV2(
		methodBase64: string,
		_protocol: string,
		callback: ApkReactCallback,
	): void {
		this.#callMethodPb(methodBase64, "local", callback);
	}

	public callMethodPbV2(methodBase64: string, _protocol: string, callback: ApkReactCallback): void {
		this.#callMethodPb(methodBase64, "automatic", callback);
	}

	/**
	 * Mirrors PluginSDKModule$callMethodPbWithStrategy$1 from the APK.
	 *
	 * The strategy owns only transport selection. Protobuf payload construction
	 * and response correlation remain in the shared APK RPC broker.
	 */
	public callMethodPbWithStrategy(
		strategy: string,
		methodBase64: string,
		_protocol: string,
		callback: ApkReactCallback,
	): void {
		if (!this.activityState.hasRnActivity()) {
			callbackActivityNull(callback);
			return;
		}
		const payload = decodeApkPluginBase64(methodBase64);
		const state = this.strategyState;
		if (!state) {
			callback(false, { error: "strategy transport unavailable" });
			return;
		}
		switch (strategy) {
			case "BLUETOOTH_ONLY":
				state.callBluetoothProtobuf(payload, callback);
				return;
			case "BLUETOOTH_FIRST":
				if (!state.isBluetoothCommunicated()) {
					state.callBluetoothProtobuf(payload, callback);
					return;
				}
				this.broker.callProtobuf(payload, "automatic", callback);
				return;
			case "NETWORK_ONLY":
				this.broker.callProtobuf(payload, "automatic", callback);
				return;
			case "NETWORK_FIRST":
			case "NONE":
				if (state.isInternetReachable() || state.isLocalDeviceConnected()) {
					this.broker.callProtobuf(payload, "automatic", callback);
					return;
				}
				state.callBluetoothProtobuf(payload, callback);
				return;
			case "LAN_BLE_FIRST":
				if (state.isLocalDeviceConnected()) {
					this.broker.callProtobuf(payload, "local", callback);
					return;
				}
				if (!state.isBluetoothCommunicated()) {
					state.callBluetoothProtobuf(payload, callback);
					return;
				}
				this.broker.callProtobuf(payload, "cloud", callback);
				return;
			default:
				// CallMethodStrategy.Companion maps unknown strings to NONE.
				if (state.isInternetReachable() || state.isLocalDeviceConnected()) {
					this.broker.callProtobuf(payload, "automatic", callback);
					return;
				}
				state.callBluetoothProtobuf(payload, callback);
		}
	}

	public async blueIsConnected(_unused?: string): Promise<boolean> {
		if (!this.activityState.hasRnActivity()) throw new Error("no activity");
		if (!this.strategyState) throw new Error("bluetooth transport unavailable");
		return this.strategyState.isBluetoothCommunicated();
	}

	public getMapData(
		method: string,
		arguments_: Readonly<Record<string, unknown>>,
		callback: ApkReactCallback,
	): void {
		this.#getRobotData(method, arguments_, callback);
	}

	public getRobotData(
		method: string,
		arguments_: Readonly<Record<string, unknown>>,
		callback: ApkReactCallback,
	): void {
		this.#getRobotData(method, arguments_, callback);
	}

	public getMapDataByPb(methodBase64: string, callback: ApkReactCallback): void {
		this.#getBlobByPb(methodBase64, callback);
	}

	public getMapDataByPbV2(methodBase64: string, _protocol: string, callback: ApkReactCallback): void {
		this.#getBlobByPb(methodBase64, callback);
	}

	public getRobotBlobByPb(methodBase64: string, callback: ApkReactCallback): void {
		this.#getBlobByPb(methodBase64, callback);
	}

	public getRobotBlobByPbV2(methodBase64: string, _protocol: string, callback: ApkReactCallback): void {
		this.#getBlobByPb(methodBase64, callback);
	}

	#callMethod(method: string, arguments_: unknown, route: ApkRpcRoute, callback: ApkReactCallback): void {
		if (!this.activityState.hasRnActivity()) {
			callbackActivityNull(callback);
			return;
		}
		if (Array.isArray(arguments_)) {
			this.broker.callJson(method, arguments_, route, callback);
			return;
		}
		if (isReadableMap(arguments_)) {
			this.broker.callJson(method, arguments_, route, callback);
			return;
		}
		callback(false);
	}

	#callMethodPb(methodBase64: string, route: ApkRpcRoute, callback: ApkReactCallback): void {
		if (!this.activityState.hasRnActivity()) {
			callbackActivityNull(callback);
			return;
		}
		this.broker.callProtobuf(decodeApkPluginBase64(methodBase64), route, callback);
	}

	#getRobotData(
		method: string,
		arguments_: Readonly<Record<string, unknown>>,
		callback: ApkReactCallback,
	): void {
		if (!this.activityState.hasRnActivity()) {
			callbackActivityNull(callback);
			return;
		}
		this.broker.callBlobJson(method, arguments_, "automatic", callback);
	}

	#getBlobByPb(methodBase64: string, callback: ApkReactCallback): void {
		if (!this.activityState.hasRnActivity()) {
			callbackActivityNull(callback);
			return;
		}
		this.broker.callBlobProtobuf(decodeApkPluginBase64(methodBase64), "cloud", callback);
	}
}
