import { readFileSync } from "node:fs";
import * as path from "node:path";

export interface ApkDeviceReplayDpsEvent {
	kind: "dps";
	dps: Readonly<Record<string, unknown>>;
	waitBeforeMs: number;
	waitAfterMs: number;
}

export interface ApkDeviceReplayB01FrameEvent {
	kind: "b01-frame";
	framePath: string;
	waitBeforeMs: number;
	waitAfterMs: number;
}

export interface ApkDeviceReplayBlobEvent {
	kind: "blob";
	blobPath: string;
	waitBeforeMs: number;
	waitAfterMs: number;
}

export type ApkDeviceReplayEvent =
	| ApkDeviceReplayDpsEvent
	| ApkDeviceReplayB01FrameEvent
	| ApkDeviceReplayBlobEvent;

export interface ApkDeviceReplayPublishMatch {
	dpsKey: string;
	payload: Readonly<Record<string, unknown>>;
}

export interface ApkDeviceReplayPublishResponse {
	match: ApkDeviceReplayPublishMatch;
	events: ApkDeviceReplayEvent[];
	maximumMatches: number;
}

export interface ApkDeviceReplayDeviceContext {
	firmwareVersion: string;
}

export interface ApkDeviceReplayManifest {
	version: 1;
	manifestPath: string;
	deviceContext?: ApkDeviceReplayDeviceContext;
	shadowDps: Readonly<Record<string, unknown>>;
	events: ApkDeviceReplayEvent[];
	publishResponses: ApkDeviceReplayPublishResponse[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}

function waitMs(value: unknown, eventIndex: number, property: "waitAfterMs" | "waitBeforeMs"): number {
	if (value === undefined) return 0;
	if (!Number.isSafeInteger(value) || (value as number) < 0 || (value as number) > 10_000) {
		throw new Error(`Replay-Ereignis ${eventIndex}: ${property} muss zwischen 0 und 10000 liegen`);
	}
	return value as number;
}

function maximumMatches(value: unknown, responseIndex: number): number {
	if (value === undefined) return 1;
	if (!Number.isSafeInteger(value) || (value as number) < 1 || (value as number) > 100) {
		throw new Error(`Publish-Antwort ${responseIndex}: maximumMatches muss zwischen 1 und 100 liegen`);
	}
	return value as number;
}

function parseReplayEvent(
	value: unknown,
	eventIndex: number,
	manifestDirectory: string,
	context = "Replay-Ereignis",
): ApkDeviceReplayEvent {
	if (!isRecord(value)) throw new Error(`${context} ${eventIndex} muss ein Objekt sein`);
	const waitBeforeMs = waitMs(value.waitBeforeMs, eventIndex, "waitBeforeMs");
	const waitAfterMs = waitMs(value.waitAfterMs, eventIndex, "waitAfterMs");
	if (value.kind === "dps") {
		if (!isRecord(value.dps)) throw new Error(`${context} ${eventIndex}: dps muss ein Objekt sein`);
		return { kind: "dps", dps: structuredClone(value.dps), waitBeforeMs, waitAfterMs };
	}
	if (value.kind === "b01-frame") {
		if (typeof value.framePath !== "string" || value.framePath.length === 0) {
			throw new Error(`${context} ${eventIndex}: framePath fehlt`);
		}
		return {
			kind: "b01-frame",
			framePath: path.resolve(manifestDirectory, value.framePath),
			waitBeforeMs,
			waitAfterMs,
		};
	}
	if (value.kind === "blob") {
		if (typeof value.blobPath !== "string" || value.blobPath.length === 0) {
			throw new Error(`${context} ${eventIndex}: blobPath fehlt`);
		}
		return {
			kind: "blob",
			blobPath: path.resolve(manifestDirectory, value.blobPath),
			waitBeforeMs,
			waitAfterMs,
		};
	}
	throw new Error(`${context} ${eventIndex}: unbekannte Art ${String(value.kind)}`);
}

function payloadValue(value: unknown): unknown {
	if (typeof value !== "string") return value;
	try {
		return JSON.parse(value) as unknown;
	} catch {
		return value;
	}
}

function containsPayload(actual: unknown, expected: unknown): boolean {
	if (Array.isArray(expected)) {
		return Array.isArray(actual)
			&& actual.length === expected.length
			&& expected.every((value, index) => containsPayload(actual[index], value));
	}
	if (isRecord(expected)) {
		return isRecord(actual)
			&& Object.entries(expected).every(([key, value]) => containsPayload(actual[key], value));
	}
	return Object.is(actual, expected);
}

export function matchesApkDeviceReplayPublish(
	response: ApkDeviceReplayPublishResponse,
	dps: Readonly<Record<string, unknown>>,
): boolean {
	return Object.hasOwn(dps, response.match.dpsKey)
		&& containsPayload(payloadValue(dps[response.match.dpsKey]), response.match.payload);
}

export function resolveApkDeviceReplayFirmwareVersion(
	manifest: ApkDeviceReplayManifest,
	requestedFirmwareVersion?: string,
): string {
	const manifestFirmwareVersion = manifest.deviceContext?.firmwareVersion;
	if (manifestFirmwareVersion && requestedFirmwareVersion
		&& manifestFirmwareVersion !== requestedFirmwareVersion) {
		throw new Error(
			`Firmware-Konflikt: Replay benötigt ${manifestFirmwareVersion}, CLI liefert ${requestedFirmwareVersion}`,
		);
	}
	const resolved = manifestFirmwareVersion ?? requestedFirmwareVersion;
	if (!resolved) {
		throw new Error("Gerätelauf benötigt eine Firmware aus deviceContext oder --firmware-version");
	}
	return resolved;
}

/**
 * Loads a deterministic device-event sequence for the APK host probe.
 *
 * The manifest contains transport inputs only. It never interprets map bytes,
 * changes blob type bytes or contains AppPlugin-specific parsing logic.
 */
export function loadApkDeviceReplayManifest(manifestPath: string): ApkDeviceReplayManifest {
	const absoluteManifestPath = path.resolve(manifestPath);
	const parsed = JSON.parse(readFileSync(absoluteManifestPath, "utf8")) as unknown;
	if (!isRecord(parsed) || parsed.version !== 1) {
		throw new Error("Replay-Manifest benötigt version: 1");
	}
	const shadowDps = parsed.shadowDps ?? {};
	if (!isRecord(shadowDps)) throw new Error("Replay-Manifest shadowDps muss ein Objekt sein");
	if (!Array.isArray(parsed.events)) throw new Error("Replay-Manifest events muss ein Array sein");
	let deviceContext: ApkDeviceReplayDeviceContext | undefined;
	if (parsed.deviceContext !== undefined) {
		if (!isRecord(parsed.deviceContext)) {
			throw new Error("Replay-Manifest deviceContext muss ein Objekt sein");
		}
		const firmwareVersion = parsed.deviceContext.firmwareVersion;
		if (typeof firmwareVersion !== "string" || firmwareVersion.length === 0
			|| firmwareVersion !== firmwareVersion.trim() || firmwareVersion.length > 128) {
			throw new Error("Replay-Manifest deviceContext.firmwareVersion ist ungültig");
		}
		deviceContext = { firmwareVersion };
	}

	const manifestDirectory = path.dirname(absoluteManifestPath);
	const events = parsed.events.map((value, index) => parseReplayEvent(value, index, manifestDirectory));
	const publishResponsesValue = parsed.publishResponses ?? [];
	if (!Array.isArray(publishResponsesValue)) {
		throw new Error("Replay-Manifest publishResponses muss ein Array sein");
	}
	const publishResponses = publishResponsesValue.map((value, responseIndex): ApkDeviceReplayPublishResponse => {
		if (!isRecord(value)) throw new Error(`Publish-Antwort ${responseIndex} muss ein Objekt sein`);
		if (!isRecord(value.match)) throw new Error(`Publish-Antwort ${responseIndex}: match muss ein Objekt sein`);
		if (typeof value.match.dpsKey !== "string" || value.match.dpsKey.length === 0) {
			throw new Error(`Publish-Antwort ${responseIndex}: match.dpsKey fehlt`);
		}
		if (!isRecord(value.match.payload)) {
			throw new Error(`Publish-Antwort ${responseIndex}: match.payload muss ein Objekt sein`);
		}
		if (!Array.isArray(value.events) || value.events.length === 0) {
			throw new Error(`Publish-Antwort ${responseIndex}: events muss ein nicht-leeres Array sein`);
		}
		return {
			match: {
				dpsKey: value.match.dpsKey,
				payload: structuredClone(value.match.payload),
			},
			events: value.events.map((event, eventIndex) =>
				parseReplayEvent(event, eventIndex, manifestDirectory, `Publish-Antwort ${responseIndex}, Ereignis`)),
			maximumMatches: maximumMatches(value.maximumMatches, responseIndex),
		};
	});
	const containsB01Frame = [
		...events,
		...publishResponses.flatMap(response => response.events),
	].some(event => event.kind === "b01-frame");
	if (containsB01Frame && !deviceContext) {
		throw new Error("Replay mit B01-Frame benötigt deviceContext.firmwareVersion");
	}

	return {
		version: 1,
		manifestPath: absoluteManifestPath,
		deviceContext,
		shadowDps: structuredClone(shadowDps),
		events,
		publishResponses,
	};
}
