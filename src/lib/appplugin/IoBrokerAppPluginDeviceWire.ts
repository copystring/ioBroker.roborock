import type { Roborock } from "../../main";
import type {
	ApkDeviceWireRoute,
	ApkReadOnlyDeviceWirePort,
} from "../../apppluginHost/apkReadOnlyDeviceRepository";

export interface IoBrokerAppPluginDeviceWireOptions {
	readonly adapter: Roborock;
	readonly deviceId: string;
	readonly connectLocalDeviceIfNeeded?: (timeoutSeconds: number) => void;
	readonly loadShadowDps?: () => Promise<string | null>;
	readonly now?: () => number;
}

function lengthPrefixed(frame: Buffer): Buffer {
	const length = Buffer.allocUnsafe(4);
	length.writeUInt32BE(frame.length, 0);
	return Buffer.concat([length, frame]);
}

/**
 * Raw ioBroker wire port for APK-generated JSON DPS.
 * It frames and encrypts the already complete dps.101 request but never parses
 * its method, parameters or product model.
 */
export class IoBrokerAppPluginDeviceWire implements ApkReadOnlyDeviceWirePort {
	readonly #adapter: Roborock;
	readonly #deviceId: string;
	readonly #now: () => number;

	public constructor(private readonly options: Readonly<IoBrokerAppPluginDeviceWireOptions>) {
		this.#adapter = options.adapter;
		this.#deviceId = options.deviceId.trim();
		this.#now = options.now ?? Date.now;
		if (this.#deviceId.length === 0) throw new Error("AppPlugin-Wire-Geräte-ID darf nicht leer sein");
	}

	public connectLocalDeviceIfNeeded(timeoutSeconds: number): number {
		if (this.isLocalConnected()) return 1;
		this.options.connectLocalDeviceIfNeeded?.(timeoutSeconds);
		return 0;
	}

	public async deviceOnline(): Promise<boolean> {
		return this.#adapter.http_api.getDevices().find(device => device.duid === this.#deviceId)?.online === true;
	}

	public isCloudConnected(): boolean {
		return this.#adapter.mqtt_api.isConnected();
	}

	public isLocalConnected(): boolean {
		return this.#adapter.local_api.isConnected(this.#deviceId);
	}

	public loadShadowDps(): Promise<string | null> {
		return this.options.loadShadowDps?.() ?? Promise.resolve(null);
	}

	public async sendJsonDps(
		route: ApkDeviceWireRoute,
		dps: Readonly<Record<string, unknown>>,
	): Promise<void> {
		const timestamp = Math.floor(this.#now() / 1_000);
		const protocol = route === "local" ? 4 : 101;
		const cloudVersion = await this.#adapter.getDeviceProtocolVersion(this.#deviceId);
		const version = route === "local"
			? this.#adapter.local_api.localDevices[this.#deviceId]?.version ?? cloudVersion
			: cloudVersion;
		const payload = JSON.stringify({ dps: structuredClone(dps), t: timestamp });
		const frame = await this.#adapter.requestsHandler.messageParser.buildRoborockMessage(
			this.#deviceId,
			protocol,
			timestamp,
			payload,
			version,
		);
		if (frame === false) throw new Error(`Lokaler Schlüssel für AppPlugin-Gerät ${this.#deviceId} fehlt`);

		if (route === "local") {
			await this.#adapter.local_api.sendMessageChecked(this.#deviceId, lengthPrefixed(frame));
			return;
		}
		await this.#adapter.mqtt_api.sendMessageChecked(this.#deviceId, frame);
	}
}
