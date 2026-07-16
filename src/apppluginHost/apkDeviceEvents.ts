export interface ApkPluginDeviceEventMap {
	RRDeviceAppClientConnectEvent: {
		groupMainDid: string;
		connectStatus: boolean;
	};
	RRDeviceBlobPayloadUpdateEvent: {
		blob: string;
	};
	RRDeviceBlueOfflineEvent: {
		did: string;
		offline: boolean;
	};
	RRDeviceBlueStatusEvent: {
		status: boolean;
	};
	RRDeviceDpsPbUpdateEvent: string;
	RRDeviceDpsUpdateEvent: {
		dps: string;
	};
	RRDeviceOnlineChangeEvent: {
		online: boolean;
	};
}

export type ApkPluginDeviceEventName = keyof ApkPluginDeviceEventMap;

export type ApkPluginDeviceEventListener<Name extends ApkPluginDeviceEventName> = (
	payload: ApkPluginDeviceEventMap[Name],
) => void;

/**
 * APK-equivalent event surface of RRPluginDevice.
 *
 * Payload parsing deliberately does not happen here. RRDeviceModule only
 * converts the native payload into the exact React-Native event shape; the
 * loaded AppPlugin owns all higher-level interpretation.
 */
export class ApkPluginDeviceEventBridge {
	readonly #listeners = new Map<ApkPluginDeviceEventName, Set<(payload: never) => void>>();

	public addListener<Name extends ApkPluginDeviceEventName>(
		name: Name,
		listener: ApkPluginDeviceEventListener<Name>,
	): () => void {
		const listeners = this.#listeners.get(name) ?? new Set<(payload: never) => void>();
		listeners.add(listener as (payload: never) => void);
		this.#listeners.set(name, listeners);
		return () => {
			listeners.delete(listener as (payload: never) => void);
			if (listeners.size === 0) this.#listeners.delete(name);
		};
	}

	public emit<Name extends ApkPluginDeviceEventName>(name: Name, payload: ApkPluginDeviceEventMap[Name]): void {
		for (const listener of this.#listeners.get(name) ?? []) {
			listener(payload as never);
		}
	}

	public emitBlobPayload(payload: Uint8Array): void {
		this.emit("RRDeviceBlobPayloadUpdateEvent", { blob: Buffer.from(payload).toString("base64") });
	}

	public emitDpsPayload(serializedDps: string): void {
		this.emit("RRDeviceDpsUpdateEvent", { dps: serializedDps });
	}

	public emitProtobufPayload(payload: Uint8Array): void {
		this.emit("RRDeviceDpsPbUpdateEvent", Buffer.from(payload).toString("base64"));
	}
}
