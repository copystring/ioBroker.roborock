import type { ApkHermesWireValue } from "./apkHermesHostProtocol";

export type ApkSkiaHostOperation = "get" | "set" | "apply";

interface SkiaReference {
	$apkType: "skiaRef";
	id: number;
}

interface HandleEntry {
	value: object | ((...arguments_: unknown[]) => unknown);
	receiver?: object;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isSkiaReference(value: unknown): value is SkiaReference {
	return isRecord(value) && value.$apkType === "skiaRef" && Number.isSafeInteger(value.id) && Number(value.id) > 0;
}

function isPlainDataObject(value: object): value is Record<string, unknown> {
	const prototype = Object.getPrototypeOf(value);
	if (prototype !== Object.prototype && prototype !== null) return false;
	return Object.values(value).every(item => typeof item !== "function");
}

/**
 * Owns the cross-process object identity behind the APK's SkiaApi and
 * SkiaViewApi JSI globals. Drawing and map semantics stay in the unchanged
 * AppPlugin; this class only forwards property access and calls to the
 * platform-neutral Skia implementation supplied by the host.
 */
export class ApkSkiaHostRuntime {
	readonly #handles = new Map<number, HandleEntry>();
	readonly #objectHandles = new WeakMap<object, number>();
	#nextHandleId = 3;

	public constructor(skiaApi: Record<string, unknown>, skiaViewApi: Record<string, unknown>) {
		this.#storeFixedHandle(1, skiaApi);
		this.#storeFixedHandle(2, skiaViewApi);
	}

	public rootReferences(): { skiaApi: SkiaReference; skiaViewApi: SkiaReference } {
		return {
			skiaApi: { $apkType: "skiaRef", id: 1 },
			skiaViewApi: { $apkType: "skiaRef", id: 2 },
		};
	}

	public async invoke(
		operation: ApkSkiaHostOperation,
		targetId: number,
		property: string,
		arguments_: readonly unknown[],
	): Promise<unknown> {
		const entry = this.#requireHandle(targetId);
		if (operation === "get") {
			if (property.length === 0) throw new Error("Skia-Property darf nicht leer sein");
			const value = Reflect.get(entry.value, property, entry.value);
			return this.#encode(value, entry.value);
		}
		if (operation === "set") {
			if (property.length === 0 || arguments_.length !== 1) {
				throw new Error("Skia-Property-Set benötigt Name und genau einen Wert");
			}
			const success = Reflect.set(entry.value, property, this.#decode(arguments_[0]), entry.value);
			if (!success) throw new Error(`Skia-Property ${property} konnte nicht gesetzt werden`);
			return true;
		}
		if (operation === "apply") {
			if (typeof entry.value !== "function") throw new Error(`Skia-Handle ${targetId} ist nicht aufrufbar`);
			const callable = entry.value as (...arguments_: unknown[]) => unknown;
			const result = await callable.apply(entry.receiver, arguments_.map(argument => this.#decode(argument)));
			return this.#encode(result);
		}
		throw new Error(`Unbekannte Skia-Hostoperation: ${String(operation)}`);
	}

	#storeFixedHandle(id: number, value: object): void {
		this.#handles.set(id, { value });
		this.#objectHandles.set(value, id);
	}

	#requireHandle(id: number): HandleEntry {
		if (!Number.isSafeInteger(id) || id < 1) throw new Error(`Ungültige Skia-Handle-ID: ${id}`);
		const entry = this.#handles.get(id);
		if (!entry) throw new Error(`Unbekannte Skia-Handle-ID: ${id}`);
		return entry;
	}

	#storeHandle(value: object | ((...arguments_: unknown[]) => unknown), receiver?: object): SkiaReference {
		if (typeof value === "object") {
			const existing = this.#objectHandles.get(value);
			if (existing !== undefined) return { $apkType: "skiaRef", id: existing };
		}
		const id = this.#nextHandleId++;
		this.#handles.set(id, { value, receiver });
		if (typeof value === "object") this.#objectHandles.set(value, id);
		return { $apkType: "skiaRef", id };
	}

	#encode(value: unknown, receiver?: object): unknown {
		if (value === undefined || value === null || typeof value === "boolean"
			|| typeof value === "number" || typeof value === "string") {
			return value;
		}
		if (Buffer.isBuffer(value) || value instanceof Uint8Array) return Buffer.from(value);
		if (value instanceof ArrayBuffer) return Buffer.from(value);
		if (Array.isArray(value)) return value.map(item => this.#encode(item));
		if (typeof value === "function") return this.#storeHandle(value, receiver);
		if (typeof value === "object") {
			if (isPlainDataObject(value)) {
				return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, this.#encode(item)]));
			}
			return this.#storeHandle(value);
		}
		throw new Error(`Nicht unterstützter Skia-Rückgabewert: ${typeof value}`);
	}

	#decode(value: unknown): unknown {
		if (isSkiaReference(value)) return this.#requireHandle(value.id).value;
		if (Array.isArray(value)) return value.map(item => this.#decode(item));
		if (isRecord(value)) {
			if (value.$apkType === "bytes" && typeof value.base64 === "string") {
				return Buffer.from(value.base64, "base64");
			}
			if (value.$apkType === "undefined") return undefined;
			return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, this.#decode(item)]));
		}
		return value;
	}
}

export interface ApkHermesSkiaRuntime {
	invoke(
		operation: ApkSkiaHostOperation,
		targetId: number,
		property: string,
		arguments_: readonly unknown[],
	): Promise<unknown> | unknown;
}

export function isApkSkiaWireReference(value: ApkHermesWireValue): boolean {
	return isSkiaReference(value);
}
