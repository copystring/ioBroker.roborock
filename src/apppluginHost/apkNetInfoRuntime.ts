export type ApkNetInfoType = "bluetooth" | "cellular" | "ethernet" | "none" | "other" | "unknown" | "vpn" | "wifi" | "wimax";

export interface ApkNetInfoRuntimeState {
	type: ApkNetInfoType;
	isInternetReachable: boolean;
	isWifiEnabled?: boolean;
	details: Readonly<Record<string, unknown>>;
}

export interface ApkNetInfoSnapshot {
	isWifiEnabled?: boolean;
	type: ApkNetInfoType | string;
	isConnected: boolean;
	isInternetReachable: boolean;
	details: Readonly<Record<string, unknown>>;
}

/** Reproduces the observable RNCNetInfo listener and getCurrentState contract. */
export class ApkNetInfoRuntime {
	#numberOfListeners = 0;

	public constructor(private readonly state: ApkNetInfoRuntimeState) {}

	public addListener(_eventName: string): void {
		this.#numberOfListeners += 1;
	}

	public removeListeners(count: number): void {
		this.#numberOfListeners -= count;
	}

	public getCurrentState(requestedType: string | null): ApkNetInfoSnapshot {
		const type = requestedType ?? this.state.type;
		const matchesRequestedType = requestedType === null || requestedType === this.state.type;
		return {
			...(this.state.isWifiEnabled === undefined ? {} : { isWifiEnabled: this.state.isWifiEnabled }),
			type,
			isConnected: this.state.type !== "none" && this.state.type !== "unknown",
			isInternetReachable: this.state.isInternetReachable && matchesRequestedType,
			details: structuredClone(this.state.details),
		};
	}

	public listenerCount(): number {
		return this.#numberOfListeners;
	}
}
