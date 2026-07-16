import fs from "node:fs";
import path from "node:path";

export type ApkPointerReplayEvent =
	| {
		kind: "down" | "move" | "up";
		pointerId: number;
		x: number;
		y: number;
		timeMs: number;
		waitAfterMs: number;
	}
	| {
		kind: "cancel";
		timeMs: number;
		waitAfterMs: number;
	};

export interface ApkPointerReplayManifest {
	version: 1;
	manifestPath: string;
	events: readonly Readonly<ApkPointerReplayEvent>[];
}

export function parseApkPointerReplayEvent(rawEvent: unknown, index: number): ApkPointerReplayEvent {
	if (!rawEvent || typeof rawEvent !== "object" || Array.isArray(rawEvent)) {
		throw new Error(`Pointer-Replay event[${index}] muss ein Objekt sein`);
	}
	const event = rawEvent as Readonly<Record<string, unknown>>;
	const kind = event.kind;
	if (!["down", "move", "up", "cancel"].includes(String(kind))) {
		throw new Error(`Pointer-Replay event[${index}].kind ist ungültig`);
	}
	const timeMs = nonNegative(event.timeMs, `event[${index}].timeMs`);
	const waitAfterMs = event.waitAfterMs === undefined
		? 0
		: nonNegative(event.waitAfterMs, `event[${index}].waitAfterMs`);
	if (kind === "cancel") return Object.freeze({ kind, timeMs, waitAfterMs });
	const pointerId = nonNegative(event.pointerId, `event[${index}].pointerId`);
	if (!Number.isSafeInteger(pointerId)) {
		throw new Error(`event[${index}].pointerId muss eine ganze Zahl sein`);
	}
	return Object.freeze({
		kind: kind as "down" | "move" | "up",
		pointerId,
		x: finiteNumber(event.x, `event[${index}].x`),
		y: finiteNumber(event.y, `event[${index}].y`),
		timeMs,
		waitAfterMs,
	});
}

function finiteNumber(value: unknown, context: string): number {
	if (typeof value !== "number" || !Number.isFinite(value)) {
		throw new Error(`${context} muss eine endliche Zahl sein`);
	}
	return value;
}

function nonNegative(value: unknown, context: string): number {
	const number = finiteNumber(value, context);
	if (number < 0) throw new Error(`${context} darf nicht negativ sein`);
	return number;
}

export function loadApkPointerReplayManifest(filePath: string): ApkPointerReplayManifest {
	const absolutePath = path.resolve(filePath);
	const parsed = JSON.parse(fs.readFileSync(absolutePath, "utf8")) as unknown;
	if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
		throw new Error("Pointer-Replay-Manifest muss ein Objekt sein");
	}
	const record = parsed as Readonly<Record<string, unknown>>;
	if (record.version !== 1) throw new Error("Pointer-Replay-Manifest benötigt Version 1");
	if (!Array.isArray(record.events)) throw new Error("Pointer-Replay-Manifest benötigt events");
	const events = record.events.map(parseApkPointerReplayEvent);

	return Object.freeze({
		version: 1,
		manifestPath: absolutePath,
		events: Object.freeze(events),
	});
}