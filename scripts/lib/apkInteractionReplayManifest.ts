import fs from "node:fs";
import path from "node:path";

import { parseApkPointerReplayEvent, type ApkPointerReplayEvent } from "./apkPointerReplayManifest";

export type ApkInteractionReplayEvent = ApkPointerReplayEvent | {
	kind: "text-input";
	text: string;
	tag?: number;
	waitAfterMs: number;
} | {
	kind: "assert";
	rawTextIncludes: readonly string[];
	activeTextInputCount?: number;
	activeTextInputTextsInclude: readonly string[];
	activeTextInputMaxLengthsInclude: readonly number[];
	waitAfterMs: number;
};

export interface ApkInteractionReplayManifest {
	version: 1;
	manifestPath: string;
	viewport: Readonly<{ width: number; height: number }>;
	events: readonly Readonly<ApkInteractionReplayEvent>[];
}

function positiveNumber(value: unknown, context: string): number {
	if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
		throw new Error(`${context} muss eine positive endliche Zahl sein`);
	}
	return value;
}

function nonNegativeNumber(value: unknown, context: string): number {
	if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
		throw new Error(`${context} muss eine nichtnegative endliche Zahl sein`);
	}
	return value;
}

export function loadApkInteractionReplayManifest(filePath: string): ApkInteractionReplayManifest {
	const absolutePath = path.resolve(filePath);
	const parsed = JSON.parse(fs.readFileSync(absolutePath, "utf8")) as unknown;
	if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
		throw new Error("Interaktions-Replay-Manifest muss ein Objekt sein");
	}
	const record = parsed as Readonly<Record<string, unknown>>;
	if (record.version !== 1) throw new Error("Interaktions-Replay-Manifest benötigt Version 1");
	if (!record.viewport || typeof record.viewport !== "object" || Array.isArray(record.viewport)) {
		throw new Error("Interaktions-Replay-Manifest benötigt einen Fixture-Viewport");
	}
	const viewport = record.viewport as Readonly<Record<string, unknown>>;
	if (!Array.isArray(record.events)) throw new Error("Interaktions-Replay-Manifest benötigt events");
	const events = record.events.map((rawEvent, index): ApkInteractionReplayEvent => {
		if (!rawEvent || typeof rawEvent !== "object" || Array.isArray(rawEvent)) {
			throw new Error(`Interaktions-Replay event[${index}] muss ein Objekt sein`);
		}
		const event = rawEvent as Readonly<Record<string, unknown>>;
		if (event.kind === "assert") {
			const rawTextIncludes = event.rawTextIncludes === undefined ? [] : event.rawTextIncludes;
			if (!Array.isArray(rawTextIncludes) || rawTextIncludes.some(value => typeof value !== "string")) {
				throw new Error(`event[${index}].rawTextIncludes muss ein Zeichenfolgen-Array sein`);
			}
			const activeTextInputTextsInclude = event.activeTextInputTextsInclude === undefined
				? []
				: event.activeTextInputTextsInclude;
			if (!Array.isArray(activeTextInputTextsInclude)
				|| activeTextInputTextsInclude.some(value => typeof value !== "string")) {
				throw new Error(`event[${index}].activeTextInputTextsInclude muss ein Zeichenfolgen-Array sein`);
			}
			const activeTextInputMaxLengthsInclude = event.activeTextInputMaxLengthsInclude === undefined
				? []
				: event.activeTextInputMaxLengthsInclude;
			if (!Array.isArray(activeTextInputMaxLengthsInclude)
				|| activeTextInputMaxLengthsInclude.some(value =>
					typeof value !== "number" || !Number.isSafeInteger(value) || value < 0)) {
				throw new Error(`event[${index}].activeTextInputMaxLengthsInclude muss ein Array nichtnegativer Ganzzahlen sein`);
			}
			const activeTextInputCount = event.activeTextInputCount === undefined
				? undefined
				: nonNegativeNumber(event.activeTextInputCount, `event[${index}].activeTextInputCount`);
			if (activeTextInputCount !== undefined && !Number.isSafeInteger(activeTextInputCount)) {
				throw new Error(`event[${index}].activeTextInputCount muss eine ganze Zahl sein`);
			}
			if (rawTextIncludes.length === 0
				&& activeTextInputCount === undefined
				&& activeTextInputTextsInclude.length === 0
				&& activeTextInputMaxLengthsInclude.length === 0) {
				throw new Error(`event[${index}] benötigt mindestens eine Assertion`);
			}
			return Object.freeze({
				kind: "assert",
				rawTextIncludes: Object.freeze([...rawTextIncludes] as string[]),
				activeTextInputTextsInclude: Object.freeze([...activeTextInputTextsInclude] as string[]),
				activeTextInputMaxLengthsInclude: Object.freeze([...activeTextInputMaxLengthsInclude] as number[]),
				...(activeTextInputCount === undefined ? {} : { activeTextInputCount }),
				waitAfterMs: event.waitAfterMs === undefined
					? 0
					: nonNegativeNumber(event.waitAfterMs, `event[${index}].waitAfterMs`),
			});
		}
		if (event.kind !== "text-input") return parseApkPointerReplayEvent(rawEvent, index);
		if (typeof event.text !== "string") {
			throw new Error(`event[${index}].text muss eine Zeichenfolge sein`);
		}
		const tag = event.tag === undefined ? undefined : nonNegativeNumber(event.tag, `event[${index}].tag`);
		if (tag !== undefined && !Number.isSafeInteger(tag)) {
			throw new Error(`event[${index}].tag muss eine ganze Zahl sein`);
		}
		return Object.freeze({
			kind: "text-input",
			text: event.text,
			...(tag === undefined ? {} : { tag }),
			waitAfterMs: event.waitAfterMs === undefined
				? 0
				: nonNegativeNumber(event.waitAfterMs, `event[${index}].waitAfterMs`),
		});
	});
	return Object.freeze({
		version: 1,
		manifestPath: absolutePath,
		viewport: Object.freeze({
			width: positiveNumber(viewport.width, "viewport.width"),
			height: positiveNumber(viewport.height, "viewport.height"),
		}),
		events: Object.freeze(events),
	});
}
