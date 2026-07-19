import { randomUUID } from "node:crypto";
import {
	mkdir,
	open,
	readFile,
	rename,
	rm,
	stat,
} from "node:fs/promises";
import * as path from "node:path";

import {
	ApkMainPluginInstallationStore,
	type ApkMainPluginInstallationPersistence,
	type ApkMainPluginInstallationSnapshot,
} from "./apkPluginInstallationStore";

const STORE_SCHEMA_VERSION = 1;
const DEFAULT_MAX_STORE_BYTES = 1024 * 1024;

interface SerializedInstallationStore {
	readonly schemaVersion: typeof STORE_SCHEMA_VERSION;
	readonly installations: ApkMainPluginInstallationSnapshot;
}

function positiveInteger(value: number, name: string): number {
	if (!Number.isSafeInteger(value) || value <= 0) {
		throw new Error(`${name} muss eine positive ganze Zahl sein`);
	}
	return value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseSnapshot(value: unknown): ApkMainPluginInstallationSnapshot {
	if (!isRecord(value)) {
		throw new Error("Der persistierte AppPlugin-Installationsstand ist ungültig");
	}
	const candidate = Object.fromEntries(
		Object.entries(value).map(([model, installation]) => {
			if (!isRecord(installation)) {
				throw new Error(`Der persistierte AppPlugin-Eintrag für ${model} ist ungültig`);
			}
			return [
				model,
				{
					downloadVersion: installation.downloadVersion,
					pluginLevel: installation.pluginLevel,
				},
			];
		}),
	) as Record<string, {
		readonly downloadVersion: number;
		readonly pluginLevel: number;
	}>;
	// Reuse the state holder's validation so disk and runtime accept exactly the
	// same model keys and numeric ranges.
	return new ApkMainPluginInstallationStore(candidate).toSnapshot();
}

/**
 * Credential-free, atomic persistence for visible AppPlugin versions.
 *
 * Only model, download version and plugin level are stored. Tokens, signed
 * URLs, HomeData and device secrets never cross this boundary.
 */
export class ApkJsonMainPluginInstallationPersistence
implements ApkMainPluginInstallationPersistence {
	readonly #filePath: string;
	readonly #maxStoreBytes: number;

	public constructor(
		filePath: string,
		options: { readonly maxStoreBytes?: number } = {},
	) {
		if (typeof filePath !== "string" || filePath.trim().length === 0) {
			throw new Error("Der Pfad des AppPlugin-Installationsstands darf nicht leer sein");
		}
		this.#filePath = path.resolve(filePath);
		this.#maxStoreBytes = positiveInteger(
			options.maxStoreBytes ?? DEFAULT_MAX_STORE_BYTES,
			"Maximale Größe des AppPlugin-Installationsstands",
		);
	}

	public async load(): Promise<ApkMainPluginInstallationSnapshot> {
		const fileStats = await stat(this.#filePath).catch(error => {
			if ((error as NodeJS.ErrnoException).code === "ENOENT") {
				return undefined;
			}
			throw error;
		});
		if (!fileStats) {
			return {};
		}
		if (!fileStats.isFile() || fileStats.size > this.#maxStoreBytes) {
			throw new Error("Der persistierte AppPlugin-Installationsstand ist keine gültige Datei");
		}
		const serialized = await readFile(this.#filePath, "utf8");
		let parsed: unknown;
		try {
			parsed = JSON.parse(serialized);
		} catch {
			throw new Error("Der persistierte AppPlugin-Installationsstand ist kein gültiges JSON");
		}
		if (
			!isRecord(parsed)
			|| parsed.schemaVersion !== STORE_SCHEMA_VERSION
		) {
			throw new Error("Die Version des AppPlugin-Installationsstands wird nicht unterstützt");
		}
		return parseSnapshot(parsed.installations);
	}

	public async loadStore(): Promise<ApkMainPluginInstallationStore> {
		return new ApkMainPluginInstallationStore(await this.load());
	}

	public async save(snapshot: ApkMainPluginInstallationSnapshot): Promise<void> {
		const validated = new ApkMainPluginInstallationStore(snapshot).toSnapshot();
		const payload: SerializedInstallationStore = {
			schemaVersion: STORE_SCHEMA_VERSION,
			installations: validated,
		};
		const serialized = `${JSON.stringify(payload, null, 2)}\n`;
		if (Buffer.byteLength(serialized) > this.#maxStoreBytes) {
			throw new Error("Der AppPlugin-Installationsstand überschreitet die Größenbegrenzung");
		}
		await mkdir(path.dirname(this.#filePath), { recursive: true });
		const temporaryPath = `${this.#filePath}.${process.pid}.${randomUUID()}.tmp`;
		let handle: Awaited<ReturnType<typeof open>> | undefined;
		try {
			handle = await open(temporaryPath, "wx", 0o600);
			await handle.writeFile(serialized, "utf8");
			await handle.sync();
			await handle.close();
			handle = undefined;
			await rename(temporaryPath, this.#filePath);
		} finally {
			await handle?.close().catch(() => undefined);
			await rm(temporaryPath, { force: true }).catch(() => undefined);
		}
	}
}
