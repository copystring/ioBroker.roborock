export type AppPluginRuntimeSelectionSource = "explicit" | "first-ready" | "unavailable-default";

export interface AppPluginRuntimeSelection {
	port: number;
	source: AppPluginRuntimeSelectionSource;
}

function assertRuntimePort(port: number): number {
	if (!Number.isSafeInteger(port) || port < 1 || port > 65_535) {
		throw new Error(`Ungültiger lokaler AppPlugin-Runtime-Port: ${port}`);
	}
	return port;
}

export function parseAppPluginRuntimePort(value: string | null): number | null {
	if (value === null) return null;
	return assertRuntimePort(Number(value));
}

export async function chooseAppPluginRuntimePort(
	requestedPort: number | null,
	candidatePorts: readonly number[],
	isReady: (port: number) => Promise<boolean>,
): Promise<AppPluginRuntimeSelection> {
	if (requestedPort !== null) {
		return { port: assertRuntimePort(requestedPort), source: "explicit" };
	}
	if (candidatePorts.length === 0) {
		throw new Error("Mindestens eine lokale AppPlugin-Runtime muss konfiguriert sein");
	}
	const ports = candidatePorts.map(assertRuntimePort);
	const readiness = await Promise.all(ports.map(async port => {
		try {
			return await isReady(port);
		} catch {
			return false;
		}
	}));
	const readyIndex = readiness.findIndex(Boolean);
	if (readyIndex >= 0) return { port: ports[readyIndex], source: "first-ready" };
	return { port: ports[0], source: "unavailable-default" };
}
