import * as fs from "node:fs";
import * as path from "node:path";

export type ApkPluginSdkPreferencesCallback = (...arguments_: unknown[]) => void;

function stringArgument(value: unknown, name: string): string {
	if (typeof value !== "string") throw new Error(`${name} muss ein String sein`);
	return value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}

function storedValue(value: unknown): string | undefined {
	if (typeof value === "string") return value;
	if (typeof value === "number" && Number.isFinite(value)) return String(Math.trunc(value));
	if (typeof value === "boolean") return String(value);
	if (Array.isArray(value) || isRecord(value)) return JSON.stringify(value);
	return undefined;
}

/**
 * APK-faithful device SharedPreferences slice of RRPluginSDK.
 *
 * PluginSDKModule selects one preferences namespace from the device serial
 * number and falls back to its device id. The caller resolves that identity;
 * this runtime persists the resulting string map and reproduces the original
 * callback shapes of getValue/removeValue/clearValues.
 */
export class ApkPluginSdkPreferencesRuntime {
	readonly #filePath: string;
	readonly #values = new Map<string, string>();

	public constructor(filePath: string) {
		if (filePath.length === 0) throw new Error("filePath darf nicht leer sein");
		this.#filePath = path.resolve(filePath);
		if (!fs.existsSync(this.#filePath)) return;
		const parsed = JSON.parse(fs.readFileSync(this.#filePath, "utf8")) as unknown;
		if (!isRecord(parsed)) throw new Error("RRPluginSDK-SharedPreferences müssen ein Objekt sein");
		for (const [key, value] of Object.entries(parsed)) {
			if (typeof value !== "string") {
				throw new Error(`RRPluginSDK-SharedPreferences-Wert ${key} muss ein String sein`);
			}
			this.#values.set(key, value);
		}
	}

	public getValue(keyValue: unknown, callback: ApkPluginSdkPreferencesCallback): void {
		const key = stringArgument(keyValue, "key");
		callback(this.#values.get(key) ?? "");
	}

	public setValue(keyValue: unknown, value: unknown): void {
		const key = stringArgument(keyValue, "key");
		this.#values.set(key, stringArgument(value, "value"));
		this.#persist();
	}

	public removeValue(keyValue: unknown, callback: ApkPluginSdkPreferencesCallback): void {
		const key = stringArgument(keyValue, "key");
		this.#values.delete(key);
		this.#persist();
		callback(true);
	}

	public clearValues(callback: ApkPluginSdkPreferencesCallback): void {
		this.#values.clear();
		this.#persist();
		callback(true);
	}

	public saveInfo(value: unknown): void {
		if (value === null || value === undefined) {
			this.#values.clear();
			this.#persist();
			return;
		}
		if (!isRecord(value)) throw new Error("saveInfo benötigt eine Map oder null");
		for (const [key, rawValue] of Object.entries(value)) {
			const converted = storedValue(rawValue);
			if (converted === undefined) this.#values.delete(key);
			else this.#values.set(key, converted);
		}
		this.#persist();
	}

	#persist(): void {
		fs.mkdirSync(path.dirname(this.#filePath), { recursive: true });
		const temporaryPath = `${this.#filePath}.${process.pid}.tmp`;
		fs.writeFileSync(
			temporaryPath,
			`${JSON.stringify(Object.fromEntries(this.#values), null, 2)}\n`,
			"utf8",
		);
		fs.renameSync(temporaryPath, this.#filePath);
	}
}
