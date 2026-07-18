const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

class MissingMetroModuleError extends Error {
	constructor(moduleId, reason, loadStack) {
		super(`Metro module ${moduleId} is unavailable: ${reason}. Load stack: ${loadStack.join(" -> ") || "<entry>"}`);
		this.name = "MissingMetroModuleError";
		this.moduleId = moduleId;
		this.loadStack = [...loadStack];
	}
}

class MetroSplitRuntime {
	constructor(options) {
		if (!options?.splitDir) {
			throw new Error("splitDir is required");
		}

		this.splitDir = fs.realpathSync.native(path.resolve(options.splitDir));
		this.moduleDir = fs.realpathSync.native(path.join(this.splitDir, "modules"));
		this.timeoutMs = options.timeoutMs ?? 1_000;
		this.maxModuleSourceBytes = options.maxModuleSourceBytes ?? 16 * 1024 * 1024;
		if (!Number.isSafeInteger(this.timeoutMs) || this.timeoutMs <= 0) {
			throw new Error("timeoutMs must be a positive integer");
		}
		if (!Number.isSafeInteger(this.maxModuleSourceBytes) || this.maxModuleSourceBytes <= 0) {
			throw new Error("maxModuleSourceBytes must be a positive integer");
		}
		this.overrides = new Map(options.overrides ?? []);
		this.cache = new Map();
		this.loadStack = [];
		this.trace = [];

		const manifestPath = path.join(this.splitDir, "modules.json");
		if (!fs.existsSync(manifestPath)) {
			throw new Error(`Metro manifest not found: ${manifestPath}`);
		}

		const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
		if (!Array.isArray(manifest) || manifest.length > 100_000) {
			throw new Error("Metro manifest must be an array with at most 100000 entries");
		}
		this.manifest = new Map();
		for (const entry of manifest) {
			if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
				throw new Error("Metro manifest entries must be objects");
			}
			const moduleId = Number(entry.moduleId);
			if (!Number.isSafeInteger(moduleId) || moduleId < 0) {
				throw new Error(`Metro manifest contains an invalid module id: ${String(entry.moduleId)}`);
			}
			if (this.manifest.has(moduleId)) {
				throw new Error(`Metro manifest contains duplicate module id ${moduleId}`);
			}
			if (!Array.isArray(entry.deps)
				|| entry.deps.some(dependency => !Number.isSafeInteger(Number(dependency)) || Number(dependency) < 0)) {
				throw new Error(`Metro manifest module ${moduleId} contains invalid dependencies`);
			}
			this.manifest.set(moduleId, entry);
		}
		this.context = vm.createContext(this.#createSandbox(options.globals ?? {}), {
			name: `appplugin:${path.basename(path.dirname(this.splitDir))}`
		});
	}

	#createSandbox(globals) {
		const sandbox = {
			Buffer,
			Promise,
			TextDecoder,
			TextEncoder,
			URL,
			URLSearchParams,
			clearInterval,
			clearTimeout,
			console,
			queueMicrotask,
			setInterval,
			setTimeout,
			...globals
		};
		sandbox.global = sandbox;
		sandbox.self = sandbox;
		return sandbox;
	}

	setOverride(moduleId, exportsValue) {
		this.overrides.set(Number(moduleId), exportsValue);
		this.cache.delete(Number(moduleId));
	}

	require(moduleId) {
		const normalizedId = Number(moduleId);
		if (!Number.isInteger(normalizedId)) {
			throw new TypeError(`Metro module id must be an integer, got ${String(moduleId)}`);
		}

		if (this.overrides.has(normalizedId)) {
			this.trace.push({ type: "override", moduleId: normalizedId });
			return this.overrides.get(normalizedId);
		}

		const cached = this.cache.get(normalizedId);
		if (cached) {
			return cached.exports;
		}

		const entry = this.manifest.get(normalizedId);
		if (!entry) {
			throw new MissingMetroModuleError(normalizedId, "not listed in modules.json", this.loadStack);
		}

		if (typeof entry.file !== "string" || entry.file.length === 0) {
			throw new MissingMetroModuleError(normalizedId, "manifest entry has no valid file", this.loadStack);
		}
		const candidatePath = path.resolve(this.moduleDir, entry.file);
		const candidateRelative = path.relative(this.moduleDir, candidatePath);
		if (candidateRelative === ".." || candidateRelative.startsWith(`..${path.sep}`) || path.isAbsolute(candidateRelative)) {
			throw new MissingMetroModuleError(normalizedId, "manifest file leaves the module directory", this.loadStack);
		}
		const modulePath = fs.existsSync(candidatePath) ? fs.realpathSync.native(candidatePath) : candidatePath;
		const realRelative = path.relative(this.moduleDir, modulePath);
		if (realRelative === ".." || realRelative.startsWith(`..${path.sep}`) || path.isAbsolute(realRelative)) {
			throw new MissingMetroModuleError(normalizedId, "manifest file resolves outside the module directory", this.loadStack);
		}
		if (!fs.existsSync(modulePath)) {
			throw new MissingMetroModuleError(normalizedId, `host module file is missing (${entry.file})`, this.loadStack);
		}
		const stats = fs.statSync(modulePath);
		if (!stats.isFile()) {
			throw new MissingMetroModuleError(normalizedId, `host module path is not a file (${entry.file})`, this.loadStack);
		}
		if (stats.size > this.maxModuleSourceBytes) {
			throw new MissingMetroModuleError(
				normalizedId,
				`host module file exceeds ${this.maxModuleSourceBytes} bytes (${entry.file})`,
				this.loadStack
			);
		}

		const module = { exports: {} };
		this.cache.set(normalizedId, module);
		this.loadStack.push(normalizedId);

		try {
			const source = fs.readFileSync(modulePath, "utf8");
			const factory = new vm.Script(source, { filename: modulePath }).runInContext(this.context, {
				timeout: this.timeoutMs
			});
			if (typeof factory !== "function") {
				throw new Error(`Metro module ${normalizedId} did not evaluate to a factory function`);
			}

			const metroRequire = (dependencyId) => this.require(dependencyId);
			const importDefault = (dependencyId) => {
				const dependency = this.require(dependencyId);
				return dependency?.__esModule ? dependency.default : dependency;
			};
			const importAll = (dependencyId) => this.require(dependencyId);

			this.context.__metroFactory = factory;
			this.context.__metroArgs = [
				this.context,
				metroRequire,
				importDefault,
				importAll,
				module,
				module.exports,
				entry.deps
			];
			new vm.Script("__metroFactory(...__metroArgs)", { filename: `${modulePath}:invoke` }).runInContext(this.context, {
				timeout: this.timeoutMs
			});
			this.trace.push({ type: "module", moduleId: normalizedId, file: entry.file });
			return module.exports;
		} catch (error) {
			this.cache.delete(normalizedId);
			throw error;
		} finally {
			delete this.context.__metroFactory;
			delete this.context.__metroArgs;
			this.loadStack.pop();
		}
	}
}

module.exports = {
	MetroSplitRuntime,
	MissingMetroModuleError
};
