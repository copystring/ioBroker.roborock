import type { ApkBlobTransferSegment } from "./apkBlobTransferAssembler";
import {
	type ApkDeviceIngressResult,
	ApkDeviceIngress,
} from "./apkDeviceIngress";

export interface ApkDeviceIngressRegistration {
	readonly activeTime: number;
	readonly deviceId: string;
	readonly ingress: ApkDeviceIngress;
}

export interface ApkJsonDeviceIngressObservation {
	readonly activeTime: number;
	readonly deviceId: string;
	readonly protocolVersion: string;
	readonly result: ApkDeviceIngressResult;
	readonly serializedDps: string;
}

export type ApkJsonDeviceIngressObserver = (
	observation: Readonly<ApkJsonDeviceIngressObservation>,
) => void;

interface ActiveIngress extends ApkDeviceIngressRegistration {
	readonly token: symbol;
}

/**
 * Routes decoded device traffic to exactly one active AppPlugin generation.
 * The wire protocols do not carry activeTime, so duplicate generations for
 * one device are rejected instead of guessing which bundle should receive a
 * response.
 */
export class ApkDeviceIngressRouter {
	readonly #active = new Map<string, ActiveIngress>();
	readonly #jsonObservers = new Set<ApkJsonDeviceIngressObserver>();

	public get activeDeviceCount(): number {
		return this.#active.size;
	}

	public register(registration: Readonly<ApkDeviceIngressRegistration>): () => void {
		const deviceId = registration.deviceId.trim();
		if (deviceId.length === 0) throw new Error("AppPlugin-Ingress-Geräte-ID darf nicht leer sein");
		if (!Number.isFinite(registration.activeTime) || registration.activeTime < 0) {
			throw new Error("AppPlugin-Ingress-Aktivierungszeit muss eine nichtnegative Zahl sein");
		}
		if (this.#active.has(deviceId)) {
			throw new Error(`Für Gerät ${deviceId} ist bereits ein AppPlugin-Ingress aktiv`);
		}

		const token = Symbol(deviceId);
		this.#active.set(deviceId, Object.freeze({
			activeTime: registration.activeTime,
			deviceId,
			ingress: registration.ingress,
			token,
		}));
		let released = false;
		return () => {
			if (released) return;
			released = true;
			if (this.#active.get(deviceId)?.token === token) this.#active.delete(deviceId);
		};
	}

	public subscribeJson(observer: ApkJsonDeviceIngressObserver): () => void {
		this.#jsonObservers.add(observer);
		let released = false;
		return () => {
			if (released) return;
			released = true;
			this.#jsonObservers.delete(observer);
		};
	}

	public acceptJsonDps(
		deviceId: string,
		protocolVersion: string,
		serializedDps: string,
	): ApkDeviceIngressResult | undefined {
		const active = this.#active.get(deviceId);
		if (!active) return undefined;
		const result = active.ingress.acceptJsonDps(
			deviceId,
			protocolVersion,
			serializedDps,
		);
		const observation = Object.freeze({
			activeTime: active.activeTime,
			deviceId,
			protocolVersion,
			result,
			serializedDps,
		});
		for (const observer of this.#jsonObservers) {
			try {
				observer(observation);
			} catch {
				// Diagnostics must never alter the APK response path.
			}
		}
		return result;
	}

	public acceptJsonEnvelope(
		deviceId: string,
		protocolVersion: string,
		envelope: unknown,
	): ApkDeviceIngressResult | undefined {
		if (envelope === null || typeof envelope !== "object" || Array.isArray(envelope)) return undefined;
		const dps = (envelope as Record<string, unknown>).dps;
		if (dps === null || typeof dps !== "object" || Array.isArray(dps)) return undefined;
		return this.acceptJsonDps(deviceId, protocolVersion, JSON.stringify(dps));
	}

	public acceptProtobufDps(
		deviceId: string,
		protocolVersion: string,
		serializedMessage: Uint8Array,
	): ApkDeviceIngressResult | undefined {
		return this.#active.get(deviceId)?.ingress.acceptProtobufDps(
			deviceId,
			protocolVersion,
			serializedMessage,
		);
	}

	public acceptBlobSegment(segment: ApkBlobTransferSegment) {
		return this.#active.get(segment.duid)?.ingress.acceptBlobSegment(segment);
	}
}
