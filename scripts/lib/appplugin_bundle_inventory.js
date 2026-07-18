const childProcess = require("node:child_process");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const HERMES_MAGIC = Buffer.from([0xc6, 0x1f, 0xbc, 0x03]);
const DEFAULT_HERMES_BOOTSTRAP = path.resolve(__dirname, "..", "..", "tools", "hermes-appplugin-host", "bridge_bootstrap.js");
const DEFAULT_APK_HOST_CONTRACT = path.resolve(
	__dirname,
	"..",
	"..",
	"src",
	"apppluginHost",
	"generated",
	"apk-appplugin-host-contract.json",
);
const HERMES_TIMEOUT_MS = 15_000;
const apkContractNamesCache = new Map();

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

function installedApkContractNames(contractPath = DEFAULT_APK_HOST_CONTRACT) {
	const absolutePath = path.resolve(contractPath);
	const cached = apkContractNamesCache.get(absolutePath);
	if (cached) return cached;
	const contract = JSON.parse(fs.readFileSync(absolutePath, "utf8"));
	const nativeModules = contract.nativeModules
		.filter(module => module.installedByHost)
		.map(module => module.moduleName);
	const viewManagers = contract.viewManagers
		.filter(view => view.installedByHost)
		.map(view => view.viewName);
	const installed = {
		apkIdentity: contract.apk.identity,
		names: new Set([...nativeModules, ...viewManagers]),
	};
	apkContractNamesCache.set(absolutePath, installed);
	return installed;
}

function inspectApkContractCoverage(requestedNativeModules, contractPath = DEFAULT_APK_HOST_CONTRACT) {
	const installed = installedApkContractNames(contractPath);
	const requested = [...new Set(requestedNativeModules)].sort();
	const unresolved = requested.filter(name => !installed.names.has(name));
	return {
		apkIdentity: installed.apkIdentity,
		status: unresolved.length === 0 ? "complete" : "incomplete",
		requestedCount: requested.length,
		unresolved,
	};
}

function classifyHermesHostFailure(execution, hostResult, output) {
	const windowsStatus = execution.status === null ? undefined : execution.status >>> 0;
	if (execution.error || windowsStatus === 0xc0000135 || (!hostResult && output.length === 0)) {
		return {
			status: "host-unavailable",
			error: execution.error?.message
				?? (windowsStatus === 0xc0000135
					? "Hermes-Host konnte nicht gestartet werden; eine Windows-Laufzeitbibliothek fehlt"
					: "Hermes-Host lieferte kein Protokollergebnis"),
		};
	}
	const hostError = String(hostResult?.error ?? output);
	if (hostError.includes("APK host hook __apkNativeInvoke is missing")
		|| hostError.includes("APK host hook __apkNativeFlushQueue is missing")) {
		return {
			status: "host-incompatible",
			error: "Hermes-Host-Binary und generierter APK-Bridge-Bootstrap besitzen unterschiedliche Versionen",
		};
	}
	if (hostError.includes("APK native invocation requires --ipc")
		|| hostError.includes("APK native invocation requires the Hermes host --ipc mode")
		|| hostError.includes("Cannot read property 'mobileModel' of undefined")
		|| hostError.includes("RRPluginSDK.deviceModel- undefined")) {
		return {
			status: "device-session-required",
			error: "Das AppPlugin wurde unverändert geladen und benötigt für die Ausführung eine APK-Gerätesitzung",
		};
	}
	return {
		status: "runtime-failed",
		error: execution.error?.message ?? hostResult?.error ?? (hostResult ? undefined : output),
	};
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

function createHermesHostEnvironment(runtimeLibraryDirectory, baseEnvironment = process.env) {
	if (!runtimeLibraryDirectory) return { ...baseEnvironment };
	return {
		...baseEnvironment,
		PATH: `${path.resolve(runtimeLibraryDirectory)}${path.delimiter}${baseEnvironment.PATH ?? ""}`,
	};
}

function runHermesHostConformance(
	identity,
	hermesHostExecutable,
	bootstrapPath = DEFAULT_HERMES_BOOTSTRAP,
	runtimeLibraryDirectory,
) {
	const execution = childProcess.spawnSync(
		path.resolve(hermesHostExecutable),
		["--bundle", identity.bundlePath, "--bootstrap", path.resolve(bootstrapPath)],
		{
			encoding: "utf8",
			env: createHermesHostEnvironment(runtimeLibraryDirectory),
			windowsHide: true,
			timeout: HERMES_TIMEOUT_MS,
		},
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
	const failure = passed ? undefined : classifyHermesHostFailure(execution, hostResult, output);
	return {
		...identity,
		status: passed ? "passed" : failure.status,
		bytecodeAccepted: hostResult?.bytecodeAccepted,
		bridgeConfigured: hostResult?.probe?.bridgeConfigured,
		appKeys,
		registryKind: hostResult?.probe?.registryKind,
		unchanged,
		reportedExceptions,
		capturedNativeQueueCount: hostResult?.probe?.capturedNativeQueueCount,
		exitCode: execution.status,
		error: failure?.error,
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
	if ((identity.format === "metro" || identity.format === "hermes") && options.hermesHostExecutable) {
		return runHermesHostConformance(
			identity,
			options.hermesHostExecutable,
			options.hermesBootstrapPath,
			options.runtimeLibraryDirectory,
		);
	}
	if (identity.format === "metro") {
		return {
			...identity,
			status: "bridge-host-required",
			bytecodeAccepted: undefined,
			error: "Metro-Quellbundles benötigen denselben nativen APK-Host wie Hermes-Bundles",
		};
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
			hostUnavailable: results.filter(result => result.status === "host-unavailable").length,
			hostIncompatible: results.filter(result => result.status === "host-incompatible").length,
			deviceSessionRequired: results.filter(result => result.status === "device-session-required").length,
			runtimeFailed: results.filter(result => result.status === "runtime-failed").length,
			contractIncomplete: results.filter(result =>
				result.apkContractCoverage?.status === "incomplete",
			).length,
			failed: results.filter(result => result.status === "failed").length,
		},
		results
	};
}

module.exports = {
	HERMES_MAGIC,
	DEFAULT_HERMES_BOOTSTRAP,
	DEFAULT_APK_HOST_CONTRACT,
	HERMES_TIMEOUT_MS,
	classifyHermesHostFailure,
	createHermesHostEnvironment,
	findBundleFiles,
	inspectApkContractCoverage,
	inspectBundle,
	parseHostOutput,
	runBundleConformance,
	runBundleMatrix
};
