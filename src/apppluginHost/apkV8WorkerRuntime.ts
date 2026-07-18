import { createHash } from "node:crypto";
import { readFileSync, realpathSync, statSync } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { createContext, Script, type Context } from "node:vm";

export type ApkWorkerCallback = (...arguments_: unknown[]) => void;

export interface ApkWorkerValueSummary {
	type: string;
	value?: string | number | boolean;
	length?: number;
	sha256?: string;
	keys?: string[];
	items?: ApkWorkerValueSummary[];
	fields?: Record<string, ApkWorkerValueSummary>;
	truncated?: boolean;
}

export interface ApkV8WorkerDiagnostic {
	kind: "start" | "call" | "stop";
	executorId?: string;
	functionName?: string;
	workerPath?: string;
	sha256?: string;
	success: boolean;
	error?: string;
	resultSummary?: ApkWorkerValueSummary;
}

export interface ApkV8WorkerRuntimeOptions {
	/** Root of one unpacked AppPlugin. Worker assets must remain below it. */
	pluginRootPath: string;
	loadTimeoutMs?: number;
	callTimeoutMs?: number;
	maxSourceBytes?: number;
	onDiagnostic?: (diagnostic: ApkV8WorkerDiagnostic) => void;
}

interface WorkerRecord {
	context: Context;
	sandbox: Record<string, unknown>;
	workerPath: string;
}

const INVOKE_WORKER_FUNCTION = new Script(`(() => {
  const functionName = globalThis.__apkWorkerFunctionName;
  const functionArguments = globalThis.__apkWorkerFunctionArguments;
  const workerFunction = globalThis[functionName];
  if (typeof workerFunction !== "function") {
    throw new Error("Unknown APK worker function " + functionName);
  }
  return workerFunction.apply(undefined, functionArguments);
})()`, { filename: "apk-worker-call.js" });

function positiveInteger(value: number | undefined, fallback: number, name: string): number {
	const resolved = value ?? fallback;
	if (!Number.isSafeInteger(resolved) || resolved <= 0) {
		throw new Error(`${name} muss eine positive Ganzzahl sein`);
	}
	return resolved;
}

function cloneAcrossRuntime<T>(value: T): T {
	return structuredClone(value);
}

function errorMessage(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}

const WORKER_SUMMARY_MAX_DEPTH = 3;
const WORKER_SUMMARY_MAX_ITEMS = 4;
const WORKER_SUMMARY_MAX_KEYS = 20;
const WORKER_SUMMARY_MAX_NODES = 160;
const WORKER_SUMMARY_MAX_STRING_LENGTH = 160;

interface WorkerSummaryBudget {
	remainingNodes: number;
}

function workerSummaryPriority(value: unknown): number {
	if (value === null || value === undefined) return 0;
	const type = typeof value;
	if (type === "boolean" || type === "number") return 0;
	if (type === "string") return (value as string).length <= WORKER_SUMMARY_MAX_STRING_LENGTH ? 1 : 2;
	if (value instanceof Uint8Array) return 3;
	return 4;
}

function summarizeWorkerValue(
	value: unknown,
	depth = 0,
	budget: WorkerSummaryBudget = { remainingNodes: WORKER_SUMMARY_MAX_NODES },
): ApkWorkerValueSummary {
	if (budget.remainingNodes <= 0) return { type: "truncated", truncated: true };
	budget.remainingNodes -= 1;
	if (value === null) return { type: "null" };
	if (value === undefined) return { type: "undefined" };

	const valueType = typeof value;
	if (valueType === "boolean" || valueType === "number") {
		return { type: valueType, value: value as boolean | number };
	}
	if (valueType === "string") {
		const stringValue = value as string;
		return {
			type: "string",
			value: stringValue.slice(0, WORKER_SUMMARY_MAX_STRING_LENGTH),
			length: stringValue.length,
			truncated: stringValue.length > WORKER_SUMMARY_MAX_STRING_LENGTH || undefined,
		};
	}
	if (value instanceof Uint8Array) {
		return {
			type: value.constructor.name,
			length: value.byteLength,
			sha256: createHash("sha256").update(value).digest("hex"),
		};
	}
	if (Array.isArray(value)) {
		if (depth >= WORKER_SUMMARY_MAX_DEPTH) {
			return { type: "Array", length: value.length, truncated: value.length > 0 || undefined };
		}
		return {
			type: "Array",
			length: value.length,
			items: value
				.slice(0, WORKER_SUMMARY_MAX_ITEMS)
				.map(item => summarizeWorkerValue(item, depth + 1, budget)),
			truncated: value.length > WORKER_SUMMARY_MAX_ITEMS || undefined,
		};
	}
	if (valueType === "object") {
		const record = value as Record<string, unknown>;
		const keys = Object.keys(record);
		const selectedKeys = [...keys]
			.sort((left, right) =>
				workerSummaryPriority(record[left]) - workerSummaryPriority(record[right])
				|| left.localeCompare(right))
			.slice(0, WORKER_SUMMARY_MAX_KEYS);
		if (depth >= WORKER_SUMMARY_MAX_DEPTH) {
			return {
				type: value.constructor?.name ?? "Object",
				keys: selectedKeys,
				truncated: keys.length > WORKER_SUMMARY_MAX_KEYS || selectedKeys.length > 0 || undefined,
			};
		}
		const fields: Record<string, ApkWorkerValueSummary> = {};
		for (const key of selectedKeys) fields[key] = summarizeWorkerValue(record[key], depth + 1, budget);
		return {
			type: value.constructor?.name ?? "Object",
			keys: selectedKeys,
			fields,
			truncated: keys.length > WORKER_SUMMARY_MAX_KEYS || undefined,
		};
	}
	return { type: valueType };
}

/**
 * TypeScript recreation of the APK's V8 background-JS executor boundary.
 * It loads the AppPlugin worker source unchanged and only supplies the APK's
 * start/call/stop lifecycle. No command, feature or map-parser logic lives here.
 */
export class ApkV8WorkerRuntime {
	readonly #pluginRootPath: string;
	readonly #loadTimeoutMs: number;
	readonly #callTimeoutMs: number;
	readonly #maxSourceBytes: number;
	readonly #onDiagnostic?: (diagnostic: ApkV8WorkerDiagnostic) => void;
	readonly #workers = new Map<string, WorkerRecord>();
	#nextExecutorId = 1;

	public constructor(options: ApkV8WorkerRuntimeOptions) {
		this.#pluginRootPath = realpathSync.native(path.resolve(options.pluginRootPath));
		this.#loadTimeoutMs = positiveInteger(options.loadTimeoutMs, 5_000, "loadTimeoutMs");
		this.#callTimeoutMs = positiveInteger(options.callTimeoutMs, 10_000, "callTimeoutMs");
		this.#maxSourceBytes = positiveInteger(options.maxSourceBytes, 8 * 1024 * 1024, "maxSourceBytes");
		this.#onDiagnostic = options.onDiagnostic;
	}

	public startBackgroundJsExecutor(jsFile: string, callback: ApkWorkerCallback): void {
		let workerPath: string | undefined;
		try {
			workerPath = this.#resolveWorkerPath(jsFile);
			const stats = statSync(workerPath);
			if (!stats.isFile()) throw new Error(`APK-Worker ist keine Datei: ${jsFile}`);
			if (stats.size > this.#maxSourceBytes) {
				throw new Error(`APK-Worker überschreitet ${this.#maxSourceBytes} Bytes: ${jsFile}`);
			}
			const source = readFileSync(workerPath, "utf8");
			const sha256 = createHash("sha256").update(source).digest("hex");
			const sandbox = this.#createSandbox(workerPath);
			const context = createContext(sandbox, {
				codeGeneration: { strings: false, wasm: false },
				name: `apk-appplugin-worker:${path.basename(workerPath)}`,
			});
			new Script(source, { filename: workerPath }).runInContext(context, {
				timeout: this.#loadTimeoutMs,
			});
			const executorId = String(this.#nextExecutorId++);
			this.#workers.set(executorId, { context, sandbox, workerPath });
			this.#onDiagnostic?.({
				kind: "start",
				executorId,
				workerPath,
				sha256,
				success: true,
			});
			callback(executorId);
		} catch (error) {
			this.#onDiagnostic?.({
				kind: "start",
				workerPath,
				success: false,
				error: errorMessage(error),
			});
			callback("");
		}
	}

	public callJsExecutor(
		executorId: string,
		functionName: string,
		argument: unknown,
		callback: ApkWorkerCallback,
	): void {
		queueMicrotask(() => this.#call(executorId, functionName, argument, callback));
	}

	public callJsExecutorWithArray(
		executorId: string,
		functionName: string,
		arguments_: unknown,
		callback: ApkWorkerCallback,
	): void {
		this.callJsExecutor(executorId, functionName, arguments_, callback);
	}

	public stopBackground(executorId: string): void {
		const success = this.#workers.delete(executorId);
		this.#onDiagnostic?.({ kind: "stop", executorId, success });
	}

	public stopAll(): void {
		for (const executorId of [...this.#workers.keys()]) this.stopBackground(executorId);
	}

	public activeExecutorIds(): string[] {
		return [...this.#workers.keys()];
	}

	#call(
		executorId: string,
		functionName: string,
		argument: unknown,
		callback: ApkWorkerCallback,
	): void {
		const worker = this.#workers.get(executorId);
		if (!worker || functionName.length === 0) {
			this.#onDiagnostic?.({ kind: "call", executorId, functionName, success: false });
			callback(false);
			return;
		}
		try {
			worker.sandbox.__apkWorkerFunctionName = functionName;
			worker.sandbox.__apkWorkerFunctionArguments = cloneAcrossRuntime(
				Array.isArray(argument) ? argument : [argument],
			);
			const result = INVOKE_WORKER_FUNCTION.runInContext(worker.context, {
				timeout: this.#callTimeoutMs,
			});
			const clonedResult = cloneAcrossRuntime(result);
			this.#onDiagnostic?.({
				kind: "call",
				executorId,
				functionName,
				success: true,
				resultSummary: summarizeWorkerValue(clonedResult),
			});
			callback(true, clonedResult);
		} catch (error) {
			this.#onDiagnostic?.({
				kind: "call",
				executorId,
				functionName,
				success: false,
				error: errorMessage(error),
			});
			callback(false);
		} finally {
			delete worker.sandbox.__apkWorkerFunctionName;
			delete worker.sandbox.__apkWorkerFunctionArguments;
		}
	}

	#resolveWorkerPath(jsFile: string): string {
		if (jsFile.length === 0) throw new Error("jsFile darf nicht leer sein");
		let workerPath: string;
		if (jsFile.startsWith("file:")) {
			workerPath = fileURLToPath(jsFile);
		} else if (path.isAbsolute(jsFile)) {
			workerPath = jsFile;
		} else {
			workerPath = path.resolve(this.#pluginRootPath, jsFile);
		}
		workerPath = realpathSync.native(path.resolve(workerPath));
		const relative = path.relative(this.#pluginRootPath, workerPath);
		if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
			throw new Error(`APK-Worker verlässt das AppPlugin-Verzeichnis: ${jsFile}`);
		}
		return workerPath;
	}

	#createSandbox(workerPath: string): Record<string, unknown> {
		const consoleBridge = Object.freeze({
			debug: (..._arguments: unknown[]) => undefined,
			error: (..._arguments: unknown[]) => undefined,
			info: (..._arguments: unknown[]) => undefined,
			log: (..._arguments: unknown[]) => undefined,
			warn: (..._arguments: unknown[]) => undefined,
		});
		const sandbox: Record<string, unknown> = {
			console: consoleBridge,
			TextDecoder,
			TextEncoder,
			__filename: workerPath,
		};
		sandbox.global = sandbox;
		sandbox.self = sandbox;
		return sandbox;
	}
}
