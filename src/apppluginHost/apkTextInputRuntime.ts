import type { ApkJavaScriptModuleCaller } from "./apkTouchEventRuntime";
import type { ApkUiManagerNodeSnapshot, ApkUiManagerRuntime } from "./apkUiManagerRuntime";

export interface ApkTextInputSnapshot {
	tag: number;
	text: string;
	mostRecentEventCount: number;
	maxLength?: number;
}

export interface ApkTextInputChangeDispatch {
	tag: number;
	previousText: string;
	requestedText: string;
	text: string;
	maxLength?: number;
	truncated: boolean;
	eventCount: number;
	changePayload: Readonly<Record<string, unknown>>;
	textInputPayload: Readonly<Record<string, unknown>>;
}

function maxLength(value: unknown, tag: number): number | undefined {
	if (value === undefined || value === null) return undefined;
	if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) {
		throw new Error(`AndroidTextInput ${tag} besitzt eine ungültige maxLength-Prop`);
	}
	return value;
}

/** Mirrors Android's InputFilter.LengthFilter for a full-field replacement. */
function applyLengthFilter(text: string, limit: number | undefined): string {
	if (limit === undefined || text.length <= limit) return text;
	let end = limit;
	if (end > 0) {
		const lastCodeUnit = text.charCodeAt(end - 1);
		if (lastCodeUnit >= 0xd800 && lastCodeUnit <= 0xdbff) end -= 1;
	}
	return text.slice(0, end);
}

function textInputSnapshots(root: ApkUiManagerNodeSnapshot): ApkTextInputSnapshot[] {
	const result: ApkTextInputSnapshot[] = [];
	const visit = (node: ApkUiManagerNodeSnapshot): void => {
		if (node.viewName === "AndroidTextInput") {
			const count = node.props.mostRecentEventCount;
			const inputMaxLength = maxLength(node.props.maxLength, node.tag);
			result.push({
				tag: node.tag,
				text: typeof node.props.text === "string" ? node.props.text : "",
				mostRecentEventCount: typeof count === "number" && Number.isSafeInteger(count) && count >= 0 ? count : 0,
				...(inputMaxLength === undefined ? {} : { maxLength: inputMaxLength }),
			});
		}
		for (const child of node.children) visit(child);
	};
	visit(root);
	return result;
}

function replacement(previousText: string, text: string): {
	insertedText: string;
	replacedText: string;
	start: number;
	end: number;
} {
	let start = 0;
	while (start < previousText.length && start < text.length && previousText[start] === text[start]) start += 1;
	let previousEnd = previousText.length;
	let nextEnd = text.length;
	while (previousEnd > start && nextEnd > start
		&& previousText[previousEnd - 1] === text[nextEnd - 1]) {
		previousEnd -= 1;
		nextEnd -= 1;
	}
	return {
		insertedText: text.slice(start, nextEnd),
		replacedText: previousText.slice(start, previousEnd),
		start,
		end: previousEnd,
	};
}

/** Mirrors ReactTextInputManager's TextWatcher event sequence from the APK. */
export class ApkTextInputRuntime {
	readonly #eventCounts = new Map<number, number>();

	public constructor(
		private readonly uiManager: Pick<ApkUiManagerRuntime, "snapshot" | "synchronouslyUpdateViewOnUiThread">,
		private readonly jsModuleCaller: ApkJavaScriptModuleCaller,
	) {}

	public activeInputs(): readonly Readonly<ApkTextInputSnapshot>[] {
		return Object.freeze(textInputSnapshots(this.uiManager.snapshot()).map(input => Object.freeze({ ...input })));
	}

	public async replaceText(text: string, requestedTag?: number): Promise<Readonly<ApkTextInputChangeDispatch>> {
		if (typeof text !== "string") throw new Error("TextInput-Text muss eine Zeichenkette sein");
		if (requestedTag !== undefined && (!Number.isSafeInteger(requestedTag) || requestedTag < 1)) {
			throw new Error("TextInput-Tag muss eine positive ganze Zahl sein");
		}
		const inputs = textInputSnapshots(this.uiManager.snapshot());
		const input = requestedTag === undefined
			? inputs.length === 1 ? inputs[0] : undefined
			: inputs.find(candidate => candidate.tag === requestedTag);
		if (!input) {
			throw new Error(requestedTag === undefined
				? "Genau ein aktives AndroidTextInput erwartet, gefunden: " + inputs.length
				: "AndroidTextInput " + requestedTag + " ist nicht aktiv");
		}
		const filteredText = applyLengthFilter(text, input.maxLength);
		const eventCount = Math.max(
			input.mostRecentEventCount,
			this.#eventCounts.get(input.tag) ?? 0,
		) + 1;
		this.#eventCounts.set(input.tag, eventCount);
		const edit = replacement(input.text, filteredText);
		const changePayload = Object.freeze({ text: filteredText, eventCount, target: input.tag });
		const textInputPayload = Object.freeze({
			text: edit.insertedText,
			previousText: edit.replacedText,
			range: Object.freeze({ start: edit.start, end: edit.end }),
			target: input.tag,
		});
		this.uiManager.synchronouslyUpdateViewOnUiThread(input.tag, { text: filteredText });
		await this.jsModuleCaller.callJsFunction("RCTEventEmitter", "receiveEvent", [
			input.tag,
			"topChange",
			changePayload,
		]);
		await this.jsModuleCaller.callJsFunction("RCTEventEmitter", "receiveEvent", [
			input.tag,
			"topTextInput",
			textInputPayload,
		]);
		return Object.freeze({
			tag: input.tag,
			previousText: input.text,
			requestedText: text,
			text: filteredText,
			...(input.maxLength === undefined ? {} : { maxLength: input.maxLength }),
			truncated: filteredText !== text,
			eventCount,
			changePayload,
			textInputPayload,
		});
	}
}
