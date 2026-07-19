export interface ApkIntentExtra {
	key: string;
	value: string | number | boolean;
}

export interface ApkIntentHostPort {
	initialUrl(): string | null;
	canOpenUrl(url: string): boolean | Promise<boolean>;
	openUrl(url: string): void | Promise<void>;
	openApplicationSettings(): void | Promise<void>;
	canSendIntent(action: string): boolean | Promise<boolean>;
	sendIntent(action: string, extras: readonly ApkIntentExtra[]): void | Promise<void>;
}

function nonEmpty(value: string, name: string): string {
	if (value.length === 0) throw new Error(`${name} darf nicht leer sein`);
	return value;
}

function intentExtras(value: unknown): ApkIntentExtra[] {
	if (value === null || value === undefined) return [];
	if (!Array.isArray(value)) throw new Error("Intent-Extras müssen ein Array sein");
	return value.map((entry, index) => {
		if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
			throw new Error(`Intent-Extra ${index} muss ein Objekt sein`);
		}
		const { key, value: extraValue } = entry as Record<string, unknown>;
		if (typeof key !== "string" || key.length === 0) {
			throw new Error(`Intent-Extra ${index} benötigt einen Schlüssel`);
		}
		if (
			typeof extraValue !== "string"
			&& typeof extraValue !== "number"
			&& typeof extraValue !== "boolean"
		) {
			throw new Error(`Intent-Extra ${key} hat einen von der APK nicht unterstützten Typ`);
		}
		return { key, value: extraValue };
	});
}

/**
 * Reproduces React Native's IntentAndroid surface from the inspected APK while
 * delegating OS navigation to the embedding desktop/ioBroker host.
 */
export class ApkIntentRuntime {
	public constructor(private readonly port: ApkIntentHostPort) {}

	public async canOpenURL(url: string): Promise<boolean> {
		return this.port.canOpenUrl(nonEmpty(url, "URL"));
	}

	public getInitialURL(): string | null {
		return this.port.initialUrl();
	}

	public async openSettings(): Promise<boolean> {
		await this.port.openApplicationSettings();
		return true;
	}

	public async openURL(url: string): Promise<boolean> {
		await this.port.openUrl(nonEmpty(url, "URL"));
		return true;
	}

	public async sendIntent(action: string, extras: unknown): Promise<void> {
		const normalizedAction = nonEmpty(action, "Intent-Aktion");
		if (!(await this.port.canSendIntent(normalizedAction))) {
			throw new Error(`Intent-Aktion ${normalizedAction} kann nicht gestartet werden`);
		}
		await this.port.sendIntent(normalizedAction, intentExtras(extras));
	}
}
