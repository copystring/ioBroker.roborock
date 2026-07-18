import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import * as path from "node:path";

export type ApkAsyncStorageCallback = (...arguments_: unknown[]) => void;

interface PersistedAsyncStorage {
	version: 1;
	values: Record<string, string>;
}

function errorPayload(error: unknown): Readonly<{ message: string }> {
	return {
		message: error instanceof Error ? error.message : String(error),
	};
}

function assertString(value: unknown, label: string): asserts value is string {
	if (typeof value !== "string") throw new Error(`${label} muss ein String sein`);
}

function stringPairs(values: unknown): ReadonlyArray<readonly [string, string]> {
	if (!Array.isArray(values)) throw new Error("AsyncStorage erwartet ein Array aus Schlüssel-Wert-Paaren");
	return values.map((entry, index) => {
		if (!Array.isArray(entry) || entry.length !== 2) {
			throw new Error(`AsyncStorage-Paar ${index} muss genau zwei Einträge enthalten`);
		}
		assertString(entry[0], `AsyncStorage-Schlüssel ${index}`);
		assertString(entry[1], `AsyncStorage-Wert ${index}`);
		return [entry[0], entry[1]] as const;
	});
}

function stringKeys(values: unknown): readonly string[] {
	if (!Array.isArray(values)) throw new Error("AsyncStorage erwartet ein Array aus Schlüsseln");
	return values.map((value, index) => {
		assertString(value, `AsyncStorage-Schlüssel ${index}`);
		return value;
	});
}

function isJsonObject(value: unknown): value is Record<string, unknown> {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Mirrors AsyncStorage's JSONObject merge: nested objects are merged
 * recursively; every other incoming value replaces the stored value.
 */
function mergeJsonObjects(stored: Record<string, unknown>, incoming: Record<string, unknown>): void {
	for (const [key, incomingValue] of Object.entries(incoming)) {
		const storedValue = stored[key];
		if (isJsonObject(storedValue) && isJsonObject(incomingValue)) {
			mergeJsonObjects(storedValue, incomingValue);
		} else {
			stored[key] = incomingValue;
		}
	}
}

function mergeJsonStrings(stored: string, incoming: string): string {
	const storedValue: unknown = JSON.parse(stored);
	const incomingValue: unknown = JSON.parse(incoming);
	if (!isJsonObject(storedValue) || !isJsonObject(incomingValue)) {
		throw new Error("AsyncStorage.multiMerge benötigt JSON-Objekte");
	}
	mergeJsonObjects(storedValue, incomingValue);
	return JSON.stringify(storedValue);
}

function parsePersistedStorage(contents: string): Map<string, string> {
	const parsed: unknown = JSON.parse(contents);
	if (!isJsonObject(parsed) || parsed.version !== 1 || !isJsonObject(parsed.values)) {
		throw new Error("Ungültiges persistentes APK-AsyncStorage-Format");
	}
	const values = new Map<string, string>();
	for (const [key, value] of Object.entries(parsed.values)) {
		assertString(value, `Persistenter AsyncStorage-Wert ${key}`);
		values.set(key, value);
	}
	return values;
}

/**
 * APK-faithful host implementation of com.reactnativecommunity.asyncstorage.
 *
 * The Android app installs one application-wide RKStorage database. The host
 * therefore receives an application-wide file path rather than a model-specific
 * path. Operations are serialized and writes are committed as one transaction.
 */
export class ApkAsyncStorageRuntime {
	readonly #storageFilePath: string;
	#values = new Map<string, string>();
	#operations = Promise.resolve();
	readonly #ready: Promise<void>;

	public constructor(storageFilePath: string) {
		if (storageFilePath.length === 0) throw new Error("storageFilePath darf nicht leer sein");
		this.#storageFilePath = path.resolve(storageFilePath);
		this.#ready = this.#load();
	}

	public clear(callback: ApkAsyncStorageCallback): void {
		this.#enqueue(
			async () => this.#commit(values => values.clear()),
			() => callback(),
			error => callback(errorPayload(error)),
		);
	}

	public getAllKeys(callback: ApkAsyncStorageCallback): void {
		this.#enqueue(
			() => [...this.#values.keys()],
			keys => callback(null, keys),
			error => callback(errorPayload(error)),
		);
	}

	public multiGet(keys: unknown, callback: ApkAsyncStorageCallback): void {
		this.#enqueue(
			() => stringKeys(keys).map(key => [key, this.#values.get(key) ?? null] as const),
			values => callback(null, values),
			error => callback([errorPayload(error)], null),
		);
	}

	public multiMerge(entries: unknown, callback: ApkAsyncStorageCallback): void {
		this.#enqueue(
			async () => {
				const pairs = stringPairs(entries);
				await this.#commit(values => {
					for (const [key, incoming] of pairs) {
						const stored = values.get(key);
						values.set(key, stored === undefined ? incoming : mergeJsonStrings(stored, incoming));
					}
				});
			},
			() => callback(),
			error => callback([errorPayload(error)]),
		);
	}

	public multiRemove(keys: unknown, callback: ApkAsyncStorageCallback): void {
		this.#enqueue(
			async () => {
				const resolvedKeys = stringKeys(keys);
				await this.#commit(values => {
					for (const key of resolvedKeys) values.delete(key);
				});
			},
			() => callback(),
			error => callback([errorPayload(error)]),
		);
	}

	public multiSet(entries: unknown, callback: ApkAsyncStorageCallback): void {
		this.#enqueue(
			async () => {
				const pairs = stringPairs(entries);
				await this.#commit(values => {
					for (const [key, value] of pairs) values.set(key, value);
				});
			},
			() => callback(),
			error => callback([errorPayload(error)]),
		);
	}

	#enqueue<Result>(
		operation: () => Result | Promise<Result>,
		onSuccess: (result: Result) => void,
		onFailure: (error: unknown) => void,
	): void {
		this.#operations = this.#operations.then(async () => {
			try {
				await this.#ready;
				onSuccess(await operation());
			} catch (error) {
				onFailure(error);
			}
		});
	}

	async #load(): Promise<void> {
		try {
			this.#values = parsePersistedStorage(await readFile(this.#storageFilePath, "utf8"));
		} catch (error) {
			if ((error as NodeJS.ErrnoException).code === "ENOENT") return;
			throw error;
		}
	}

	async #commit(mutator: (values: Map<string, string>) => void): Promise<void> {
		const previous = new Map(this.#values);
		try {
			mutator(this.#values);
			await this.#persist();
		} catch (error) {
			this.#values = previous;
			throw error;
		}
	}

	async #persist(): Promise<void> {
		const payload: PersistedAsyncStorage = {
			version: 1,
			values: Object.fromEntries(this.#values),
		};
		await mkdir(path.dirname(this.#storageFilePath), { recursive: true });
		const temporaryPath = `${this.#storageFilePath}.${process.pid}.tmp`;
		await writeFile(temporaryPath, `${JSON.stringify(payload)}\n`, "utf8");
		await rename(temporaryPath, this.#storageFilePath);
	}
}
