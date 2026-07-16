const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function summarize(value, depth = 0) {
	if (value === null || value === undefined) return value;
	if (["string", "number", "boolean"].includes(typeof value)) {
		return typeof value === "string" && value.length > 160
			? `${value.slice(0, 157)}...`
			: value;
	}
	if (depth >= 2) return Array.isArray(value) ? `[array:${value.length}]` : "[object]";
	if (Array.isArray(value)) return value.slice(0, 12).map(item => summarize(item, depth + 1));
	if (ArrayBuffer.isView(value)) return `[${value.constructor.name}:${value.byteLength}]`;
	const result = {};
	for (const [key, item] of Object.entries(value).slice(0, 30)) {
		result[key] = summarize(item, depth + 1);
	}
	return result;
}

function cloneAcrossVm(value) {
	try {
		return structuredClone(value);
	} catch {
		return JSON.parse(JSON.stringify(value));
	}
}

function resolveWorkerPath(bundlePath, jsFile) {
	const bundleDirectory = path.dirname(path.resolve(bundlePath));
	const source = typeof jsFile === "string" ? jsFile : jsFile?.uri;
	if (typeof source !== "string" || source.length === 0) {
		throw new Error("Background worker asset does not contain a URI");
	}

	let relativePath = source;
	if (relativePath.startsWith("file://")) relativePath = relativePath.slice("file://".length);
	if (path.isAbsolute(relativePath)) {
		const relativeToBundle = path.relative(bundleDirectory, relativePath);
		relativePath = relativeToBundle;
	}

	const workerPath = path.resolve(bundleDirectory, relativePath);
	const relative = path.relative(bundleDirectory, workerPath);
	if (relative.startsWith("..") || path.isAbsolute(relative)) {
		throw new Error(`Background worker must stay inside the AppPlugin directory: ${source}`);
	}
	if (path.extname(workerPath).toLowerCase() !== ".jx") {
		throw new Error(`Background worker must be a .jx asset: ${source}`);
	}
	if (!fs.statSync(workerPath).isFile()) throw new Error(`Background worker asset is not a file: ${source}`);
	return workerPath;
}

class DirectJxWorkerHost {
	constructor(options) {
		if (!options?.bundlePath) throw new Error("bundlePath is required");
		this.bundlePath = path.resolve(options.bundlePath);
		this.loadTimeoutMs = options.loadTimeoutMs ?? 5_000;
		this.callTimeoutMs = options.callTimeoutMs ?? 10_000;
		this.calls = [];
		this.errors = [];
		this.executors = new Map();
		this.nextExecutorId = 1;
	}

	#createContext(workerPath) {
		const workerLogs = [];
		const consoleBridge = {};
		for (const level of ["debug", "error", "info", "log", "warn"]) {
			consoleBridge[level] = (...args) => workerLogs.push({ level, args: args.map(value => summarize(value)) });
		}
		const sandbox = {
			ArrayBuffer,
			BigInt64Array,
			BigUint64Array,
			DataView,
			Float32Array,
			Float64Array,
			Int8Array,
			Int16Array,
			Int32Array,
			TextDecoder,
			TextEncoder,
			Uint8Array,
			Uint8ClampedArray,
			Uint16Array,
			Uint32Array,
			console: consoleBridge
		};
		sandbox.global = sandbox;
		sandbox.self = sandbox;
		const context = vm.createContext(sandbox, {
			codeGeneration: { strings: false, wasm: false },
			name: `direct-appplugin-worker:${path.basename(workerPath)}`
		});
		return { context, workerLogs };
	}

	startBackgroundJsExecutor(jsFile, callback) {
		let executorId = null;
		try {
			const workerPath = resolveWorkerPath(this.bundlePath, jsFile);
			const source = fs.readFileSync(workerPath, "utf8");
			const beforeHash = require("node:crypto").createHash("sha256").update(source).digest("hex");
			const { context, workerLogs } = this.#createContext(workerPath);
			new vm.Script(source, { filename: workerPath }).runInContext(context, {
				timeout: this.loadTimeoutMs
			});
			const afterHash = require("node:crypto").createHash("sha256").update(fs.readFileSync(workerPath)).digest("hex");
			if (beforeHash !== afterHash) throw new Error("Background worker changed while it was being executed");

			executorId = `direct-jx-${this.nextExecutorId++}`;
			this.executors.set(executorId, { context, workerLogs, workerPath });
			this.calls.push({
				kind: "start",
				executorId,
				workerPath,
				sha256: beforeHash
			});
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			this.errors.push({ kind: "start", message });
		}
		queueMicrotask(() => callback?.(executorId));
		return executorId;
	}

	callJsExecutorWithArray(executorId, functionName, args, callback) {
		const executor = this.executors.get(executorId);
		if (!executor) {
			const message = `Unknown background worker executor: ${executorId}`;
			this.errors.push({ kind: "call", functionName, message });
			queueMicrotask(() => callback?.(false, null));
			return;
		}
		if (!/^[A-Za-z_$][A-Za-z0-9_$]*$/u.test(functionName)) {
			const message = `Invalid background worker function name: ${functionName}`;
			this.errors.push({ kind: "call", functionName, message });
			queueMicrotask(() => callback?.(false, null));
			return;
		}

		try {
			executor.context.__phase0WorkerArguments = cloneAcrossVm(Array.isArray(args) ? args : []);
			const result = new vm.Script(`${functionName}(...__phase0WorkerArguments)`, {
				filename: `${executor.workerPath}#${functionName}`
			}).runInContext(executor.context, { timeout: this.callTimeoutMs });
			delete executor.context.__phase0WorkerArguments;
			const clonedResult = cloneAcrossVm(result);
			this.calls.push({
				kind: "call",
				executorId,
				functionName,
				args: summarize(args),
				result: summarize(clonedResult)
			});
			queueMicrotask(() => callback?.(true, clonedResult));
		} catch (error) {
			delete executor.context.__phase0WorkerArguments;
			const message = error instanceof Error ? error.message : String(error);
			this.errors.push({ kind: "call", executorId, functionName, message });
			queueMicrotask(() => callback?.(false, null));
		}
	}

	stopBackground(executorId) {
		const stopped = this.executors.delete(executorId);
		this.calls.push({ kind: "stop", executorId, stopped });
	}

	stopAll() {
		for (const executorId of [...this.executors.keys()]) this.stopBackground(executorId);
	}

	get sdk() {
		return {
			startBackgroundJsExecutor: this.startBackgroundJsExecutor.bind(this),
			callJsExecutorWithArray: this.callJsExecutorWithArray.bind(this),
			stopBackground: this.stopBackground.bind(this)
		};
	}
}

module.exports = {
	DirectJxWorkerHost,
	resolveWorkerPath
};
