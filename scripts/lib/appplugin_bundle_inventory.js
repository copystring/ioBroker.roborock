const childProcess = require("node:child_process");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { DirectMetroBundleRuntime } = require("./direct_metro_bundle_runtime.js");

const HERMES_MAGIC = Buffer.from([0xc6, 0x1f, 0xbc, 0x03]);
const DEFAULT_HERMES_BOOTSTRAP = path.resolve(__dirname, "..", "..", "tools", "hermes-appplugin-host", "bridge_bootstrap.js");
const HERMES_TIMEOUT_MS = 15_000;

function sha256(buffer) {
	return crypto.createHash("sha256").update(buffer).digest("hex");
}

function findBundleFiles(rootDir) {
	const root = path.resolve(rootDir);
	if (!fs.existsSync(root)) return [];
	const result = [];
	const pending = [root];

	while (pending.length > 0) {
		const current = pending.pop();
		for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
			const entryPath = path.join(current, entry.name);
			if (entry.isDirectory()) {
				pending.push(entryPath);
			} else if (entry.isFile() && entry.name === "index.android.bundle") {
				result.push(entryPath);
			}
		}
	}

	return result.sort((left, right) => left.localeCompare(right));
}

function inspectBundle(bundlePath) {
	const absolutePath = path.resolve(bundlePath);
	const content = fs.readFileSync(absolutePath);
	let format = "unknown";
	if (content.subarray(0, HERMES_MAGIC.length).equals(HERMES_MAGIC)) {
		format = "hermes";
	} else if (/^\s*(?:var|global|__d\()/u.test(content.subarray(0, 256).toString("utf8"))) {
		format = "metro";
	}

	return {
		bundlePath: absolutePath,
		format,
		bytes: content.length,
		sha256: sha256(content),
		bytecodeVersion: format === "hermes" && content.length >= 12 ? content.readUInt32LE(8) : undefined
	};
}

function exceptionMessage(exception) {
	if (!exception) return "Unknown exception";
	return exception.originalMessage ?? exception.message ?? String(exception);
}

function runMetroConformance(identity) {
	try {
		const runtime = new DirectMetroBundleRuntime({ bundlePath: identity.bundlePath });
		const result = runtime.load();
		const afterHash = sha256(fs.readFileSync(identity.bundlePath));
		const errors = result.reportedExceptions.map(exceptionMessage);
		const appRegistered = result.appKeys.includes("App");
		const unchanged = identity.sha256 === afterHash;
		return {
			...identity,
			status: appRegistered && unchanged && errors.length === 0 ? "passed" : "failed",
			appKeys: result.appKeys,
			registryKind: result.registryKind,
			unchanged,
			reportedExceptions: errors,
			requestedNativeModules: result.requestedNativeModules,
			fallbackCapabilities: result.fallbackCapabilities
		};
	} catch (error) {
		return {
			...identity,
			status: "failed",
			error: error instanceof Error ? error.message : String(error)
		};
	}
}

function parseHostOutput(output) {
	const lines = output.split(/\r?\n/u).map(line => line.trim()).filter(Boolean);
	for (let index = lines.length - 1; index >= 0; index--) {
		try {
			return JSON.parse(lines[index]);
		} catch {
			// Native build diagnostics may precede the one-line host protocol result.
		}
	}
	return undefined;
}

function runHermesHostConformance(identity, hermesHostExecutable, bootstrapPath = DEFAULT_HERMES_BOOTSTRAP) {
	const execution = childProcess.spawnSync(
		path.resolve(hermesHostExecutable),
		["--bundle", identity.bundlePath, "--bootstrap", path.resolve(bootstrapPath)],
		{ encoding: "utf8", windowsHide: true, timeout: HERMES_TIMEOUT_MS }
	);
	const output = [execution.stdout, execution.stderr].filter(Boolean).join("\n").trim();
	const hostResult = parseHostOutput(output);
	const appKeys = hostResult?.probe?.appKeys ?? [];
	const capturedTurboCalls = hostResult?.probe?.capturedTurboCalls ?? [];
	const reportedExceptions = capturedTurboCalls.filter(call => call.module === "ExceptionsManager");
	const afterHash = sha256(fs.readFileSync(identity.bundlePath));
	const unchanged = identity.sha256 === afterHash;
	const passed = execution.status === 0
		&& hostResult?.hostProtocol === 1
		&& hostResult.bytecodeAccepted === true
		&& hostResult.bootstrapCompleted === true
		&& hostResult.evaluationCompleted === true
		&& appKeys.includes("App")
		&& reportedExceptions.length === 0
		&& unchanged;
	return {
		...identity,
		status: passed ? "passed" : "failed",
		bytecodeAccepted: hostResult?.bytecodeAccepted,
		bridgeConfigured: hostResult?.probe?.bridgeConfigured,
		appKeys,
		registryKind: hostResult?.probe?.registryKind,
		unchanged,
		reportedExceptions,
		capturedNativeQueueCount: hostResult?.probe?.capturedNativeQueueCount,
		exitCode: execution.status,
		error: execution.error?.message ?? hostResult?.error ?? (hostResult ? undefined : output)
	};
}

function runHermesConformance(identity, hermesExecutable) {
	if (!hermesExecutable) {
		return {
			...identity,
			status: "bridge-host-required",
			bytecodeAccepted: undefined,
			error: "No Hermes executable supplied"
		};
	}

	const execution = childProcess.spawnSync(
		path.resolve(hermesExecutable),
		["-b", "-Xes6-promise", "-Xes6-proxy", "-Xmicrotask-queue", identity.bundlePath],
		{ encoding: "utf8", windowsHide: true, timeout: HERMES_TIMEOUT_MS }
	);
	const output = [execution.stdout, execution.stderr].filter(Boolean).join("\n").trim();
	const missingBridge = output.includes("__fbBatchedBridgeConfig is not set");
	return {
		...identity,
		status: execution.status === 0 ? "passed" : missingBridge ? "bridge-host-required" : "failed",
		bytecodeAccepted: execution.status === 0 || missingBridge,
		exitCode: execution.status,
		error: execution.error?.message,
		lastOutputLine: output.split(/\r?\n/u).find(line => line.includes("Uncaught")) ?? output.split(/\r?\n/u).at(-1)
	};
}

function runBundleConformance(bundlePath, options = {}) {
	const identity = inspectBundle(bundlePath);
	if (identity.format === "metro") return runMetroConformance(identity);
	if (identity.format === "hermes" && options.hermesHostExecutable) {
		return runHermesHostConformance(identity, options.hermesHostExecutable, options.hermesBootstrapPath);
	}
	if (identity.format === "hermes") return runHermesConformance(identity, options.hermesExecutable);
	return { ...identity, status: "failed", error: "Unknown bundle format" };
}

function runBundleMatrix(rootDir, options = {}) {
	const root = path.resolve(rootDir);
	const results = findBundleFiles(root).map(bundlePath => runBundleConformance(bundlePath, options));
	const firstByHash = new Map();
	for (const result of results) {
		result.relativePath = path.relative(root, result.bundlePath);
		if (firstByHash.has(result.sha256)) {
			result.duplicateOf = firstByHash.get(result.sha256);
		} else {
			firstByHash.set(result.sha256, result.relativePath);
		}
	}

	return {
		root,
		summary: {
			totalPaths: results.length,
			uniqueBundles: firstByHash.size,
			metro: results.filter(result => result.format === "metro").length,
			hermes: results.filter(result => result.format === "hermes").length,
			passed: results.filter(result => result.status === "passed").length,
			bridgeHostRequired: results.filter(result => result.status === "bridge-host-required").length,
			failed: results.filter(result => result.status === "failed").length
		},
		results
	};
}

module.exports = {
	HERMES_MAGIC,
	DEFAULT_HERMES_BOOTSTRAP,
	HERMES_TIMEOUT_MS,
	findBundleFiles,
	inspectBundle,
	parseHostOutput,
	runBundleConformance,
	runBundleMatrix
};
