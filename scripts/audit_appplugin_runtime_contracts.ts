import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

type JsonRecord = Record<string, unknown>;

interface BundleCandidate {
	bundlePath: string;
	relativePath: string;
	label: string;
	sha256: string;
	model: string;
	modelSource: "package-metadata" | "known-fixture" | "audit-fallback";
}

interface AuditResult {
	relativePath: string;
	label: string;
	sha256: string;
	model: string;
	modelSource: BundleCandidate["modelSource"];
	status: "completed" | "failed" | "timeout";
	bundleKind?: string;
	runtimeStatus?: string;
	readinessStatus?: string;
	readinessReasons?: unknown[];
	rootChildCount?: number;
	nativeInvocationCount?: number;
	demandedNativeCalls?: string[];
	missingNativeCalls?: unknown[];
	unavailableHostServices?: unknown[];
	unexpectedNativeRejections?: unknown[];
	usedViewManagers?: unknown[];
	reportedExceptions?: unknown[];
	error?: string;
}

const repositoryRoot = process.cwd();
const appPluginRoot = path.join(repositoryRoot, ".AppPlugins");
const probePath = path.join(
	repositoryRoot,
	"artifacts",
	"appplugin-poc",
	"appplugin_hermes_runtime_probe-contract-audit.cjs",
);
const hostPath = path.join(
	repositoryRoot,
	"tools",
	"hermes-appplugin-host",
	".build-mingw-cmake3",
	"roborock-hermes-appplugin-host.exe",
);
const outputPath = path.join(
	repositoryRoot,
	"artifacts",
	"appplugin-poc",
	"runtime-probes",
	"all-appplugins-contract-audit.json",
);
const timeoutMs = 45_000;

function isRecord(value: unknown): value is JsonRecord {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function sha256(filePath: string): string {
	return createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function findBundles(root: string): string[] {
	const bundles: string[] = [];
	const pending = [root];
	while (pending.length > 0) {
		const directory = pending.pop()!;
		for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
			const entryPath = path.join(directory, entry.name);
			if (entry.isDirectory()) pending.push(entryPath);
			else if (entry.isFile() && entry.name === "index.android.bundle") bundles.push(entryPath);
		}
	}
	return bundles.sort();
}

function projectModel(pluginRoot: string): string | undefined {
	const pending = [pluginRoot];
	let visitedFiles = 0;
	while (pending.length > 0 && visitedFiles < 16_384) {
		const directory = pending.pop()!;
		for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
			const entryPath = path.join(directory, entry.name);
			if (entry.isDirectory()) {
				if (!["metro_bundle_split", "extracted"].includes(entry.name)) pending.push(entryPath);
				continue;
			}
			visitedFiles += 1;
			if (!/(?:^|_)project\.json$/iu.test(entry.name)) continue;
			try {
				const value = JSON.parse(fs.readFileSync(entryPath, "utf8")) as unknown;
				if (!isRecord(value) || typeof value.models !== "string") continue;
				const model = value.models.split(/[,\s]+/u).find(Boolean);
				if (model) return model;
			} catch {
				// Assets can contain unrelated project.json files.
			}
		}
	}
	return undefined;
}

function modelFor(label: string, pluginRoot: string): Pick<BundleCandidate, "model" | "modelSource"> {
	const metadataModel = projectModel(pluginRoot);
	if (metadataModel) return { model: metadataModel, modelSource: "package-metadata" };
	if (/^Q7 /u.test(label)) return { model: "roborock.vacuum.sc01", modelSource: "known-fixture" };
	if (/Q10/u.test(label)) return { model: "roborock.vacuum.ss09", modelSource: "known-fixture" };
	return { model: "roborock.vacuum.audit", modelSource: "audit-fallback" };
}

function candidates(): BundleCandidate[] {
	const unique = new Map<string, BundleCandidate>();
	for (const bundlePath of findBundles(appPluginRoot)) {
		const relativePath = path.relative(appPluginRoot, bundlePath);
		const label = relativePath.split(path.sep)[0];
		const bundleHash = sha256(bundlePath);
		if (unique.has(bundleHash)) continue;
		const pluginRoot = path.dirname(bundlePath);
		unique.set(bundleHash, {
			bundlePath,
			relativePath,
			label,
			sha256: bundleHash,
			...modelFor(label, pluginRoot),
		});
	}
	return [...unique.values()].sort((left, right) => left.relativePath.localeCompare(right.relativePath));
}

function toolchainPath(): string | undefined {
	if (process.platform !== "win32") return undefined;
	const root = path.join(
		repositoryRoot,
		"tools",
		"hermes-appplugin-host",
		".cache",
		"toolchains",
		"llvm-mingw",
	);
	if (!fs.existsSync(root)) return undefined;
	return fs.readdirSync(root)
		.map(name => path.join(root, name, "bin"))
		.filter(candidate => fs.existsSync(candidate))
		.sort()
		.at(-1);
}

function boundedDiagnostic(value: string): string {
	const lines = value.split(/\r?\n/u).map(line => line.trim()).filter(Boolean);
	const errors = lines.filter(line => /(?:Error|Exception|RangeError|TypeError):/u.test(line));
	return [...new Set([
		...lines.slice(0, 5),
		...errors.slice(0, 4),
		...errors.slice(-4),
		...lines.slice(-8),
	])].join(" | ").slice(0, 4_000);
}

function completedResult(
	candidate: BundleCandidate,
	stdout: string,
	processError?: string,
): AuditResult {
	const output = JSON.parse(stdout) as unknown;
	if (!isRecord(output)) throw new Error("Probe-Ausgabe ist kein Objekt");
	const readiness = isRecord(output.runtimeReadiness) ? output.runtimeReadiness : {};
	const nativeUsage = isRecord(output.runtimeNativeUsage) ? output.runtimeNativeUsage : {};
	const viewUsage = isRecord(output.runtimeViewManagerUsage) ? output.runtimeViewManagerUsage : {};
	const uiTree = isRecord(output.uiTree) ? output.uiTree : {};
	const demandedNativeCalls = [...new Set(
		(Array.isArray(output.nativeInvocations) ? output.nativeInvocations : [])
			.filter(isRecord)
			.map(invocation =>
				typeof invocation.moduleName === "string" && typeof invocation.methodName === "string"
					? `${invocation.moduleName}.${invocation.methodName}`
					: undefined,
			)
			.filter((call): call is string => call !== undefined),
	)].sort();
	return {
		relativePath: candidate.relativePath,
		label: candidate.label,
		sha256: candidate.sha256,
		model: candidate.model,
		modelSource: candidate.modelSource,
		status: "completed",
		bundleKind: typeof output.bundleKind === "string" ? output.bundleKind : undefined,
		runtimeStatus: typeof output.status === "string" ? output.status : undefined,
		readinessStatus: typeof readiness.status === "string" ? readiness.status : undefined,
		readinessReasons: Array.isArray(readiness.reasons) ? readiness.reasons : [],
		rootChildCount: Array.isArray(uiTree.children) ? uiTree.children.length : 0,
		nativeInvocationCount: typeof nativeUsage.invocationCount === "number"
			? nativeUsage.invocationCount
			: undefined,
		demandedNativeCalls,
		missingNativeCalls: Array.isArray(nativeUsage.missingNativeCalls)
			? nativeUsage.missingNativeCalls
			: [],
		unavailableHostServices: Array.isArray(nativeUsage.unavailableHostServices)
			? nativeUsage.unavailableHostServices
			: [],
		unexpectedNativeRejections: Array.isArray(nativeUsage.unexpectedRejections)
			? nativeUsage.unexpectedRejections
			: [],
		usedViewManagers: Array.isArray(viewUsage.viewManagers) ? viewUsage.viewManagers : [],
		reportedExceptions: Array.isArray(output.reportedExceptions) ? output.reportedExceptions : [],
		error: processError,
	};
}

async function runCandidate(
	candidate: BundleCandidate,
	temporaryRoot: string,
	toolchainBin: string | undefined,
): Promise<AuditResult> {
	const bootstrapPath = path.join(temporaryRoot, `${candidate.sha256}.js`);
	const args = [
		probePath,
		"--bundle", candidate.bundlePath,
		"--host", hostPath,
		"--bootstrap-output", bootstrapPath,
		"--width", "360",
		"--height", "800",
		"--scale", "1",
		"--device-model", candidate.model,
		"--device-sn", `audit-${candidate.sha256.slice(0, 16)}`,
		"--firmware-version", "audit-startup",
		"--run-application",
		"--react-state-probe",
		"--finite-startup-audit",
	];
	return new Promise(resolve => {
		const child = spawn(process.execPath, args, {
			cwd: repositoryRoot,
			env: {
				...process.env,
				PATH: toolchainBin
					? `${toolchainBin}${path.delimiter}${process.env.PATH ?? ""}`
					: process.env.PATH,
			},
			stdio: ["ignore", "pipe", "pipe"],
			windowsHide: true,
		});
		let stdout = "";
		let stderr = "";
		let settled = false;
		const finish = (result: AuditResult): void => {
			if (settled) return;
			settled = true;
			clearTimeout(timeout);
			resolve(result);
		};
		const base = {
			relativePath: candidate.relativePath,
			label: candidate.label,
			sha256: candidate.sha256,
			model: candidate.model,
			modelSource: candidate.modelSource,
		};
		const timeout = setTimeout(() => {
			child.kill();
			finish({ ...base, status: "timeout", error: `Probe überschritt ${timeoutMs} ms` });
		}, timeoutMs);
		child.stdout.on("data", (chunk: Buffer) => {
			stdout += chunk.toString("utf8");
			if (Buffer.byteLength(stdout, "utf8") > 128 * 1024 * 1024) {
				child.kill();
				finish({ ...base, status: "failed", error: "Probe überschritt das Ausgabelimit" });
			}
		});
		child.stderr.on("data", (chunk: Buffer) => {
			stderr = `${stderr}${chunk.toString("utf8")}`.slice(-128 * 1024);
		});
		child.once("error", error => finish({ ...base, status: "failed", error: error.message }));
		child.once("close", code => {
			if (settled) return;
			if (code !== 0) {
				try {
					finish(completedResult(
						candidate,
						stdout,
						`Probe endete mit Code ${code ?? "null"}: ${boundedDiagnostic(stderr)}`,
					));
					return;
				} catch {
					// A failure before the probe report exists remains a failed
					// audit; the original process diagnostic is authoritative.
				}
				finish({
					...base,
					status: "failed",
					error: `Probe endete mit Code ${code ?? "null"}: ${boundedDiagnostic(stderr)}`,
				});
				return;
			}
			try {
				finish(completedResult(candidate, stdout));
			} catch (error) {
				finish({
					...base,
					status: "failed",
					error: error instanceof Error ? error.message : String(error),
				});
			}
		});
	});
}

async function main(): Promise<void> {
	for (const [name, filePath] of Object.entries({
		appPluginRoot,
		probePath,
		hostPath,
	})) {
		if (!fs.existsSync(filePath)) throw new Error(`${name} fehlt: ${filePath}`);
	}
	const bundleCandidates = candidates();
	const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "roborock-appplugin-contract-audit-"));
	try {
		const results: AuditResult[] = [];
		const toolchainBin = toolchainPath();
		for (const candidate of bundleCandidates) {
			results.push(await runCandidate(candidate, temporaryRoot, toolchainBin));
		}
		const demandedViewManagers = [...new Set(results.flatMap(result =>
			(result.usedViewManagers ?? [])
				.filter(isRecord)
				.map(view => typeof view.viewName === "string" ? view.viewName : undefined)
				.filter((viewName): viewName is string => viewName !== undefined),
		))].sort();
		const demandedNativeCalls = [...new Set(results.flatMap(result =>
			result.demandedNativeCalls ?? [],
		))].sort();
		const demandedNativeMethodsByModule: Record<string, string[]> = {};
		for (const call of demandedNativeCalls) {
			const separator = call.indexOf(".");
			const moduleName = call.slice(0, separator);
			const methodName = call.slice(separator + 1);
			(demandedNativeMethodsByModule[moduleName] ??= []).push(methodName);
		}
		const report = {
			schemaVersion: 2,
			generatedAt: new Date().toISOString(),
			scope: "all unique local index.android.bundle files; unchanged bundles; finite startup audit",
			summary: {
				totalPaths: findBundles(appPluginRoot).length,
				uniqueBundles: bundleCandidates.length,
				completed: results.filter(result => result.status === "completed").length,
				rootMounted: results.filter(result => result.runtimeStatus === "root-mounted").length,
				ready: results.filter(result => result.readinessStatus === "ready").length,
				failed: results.filter(result => result.status === "failed").length,
				timedOut: results.filter(result => result.status === "timeout").length,
				withPackageOrKnownFixtureModel:
					results.filter(result => result.modelSource !== "audit-fallback").length,
				demandedNativeCalls,
				demandedNativeMethodsByModule,
				demandedViewManagers,
			},
			results,
		};
		fs.mkdirSync(path.dirname(outputPath), { recursive: true });
		fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
		process.stdout.write(`${JSON.stringify({ outputPath, ...report.summary })}\n`);
	} finally {
		fs.rmSync(temporaryRoot, { recursive: true, force: true });
	}
}

void main();
